import { useRouter } from "next/router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FormProvider, useForm } from "react-hook-form";
import { useContext, useEffect, useRef } from "react";
import toast from "react-hot-toast";

import AdminLayout from "@/components/layouts/admin/AdminLayout";
import SectionHeader from "@/components/elements/SectionHeader";
import Heading from "@/components/elements/Heading";
import ExtensionServicesDetails from "@/components/modules/extension/ExtensionServicesDetails";
import Comments from "@/components/modules/comments/Comments";
import ActivityLogs from "@/components/modules/logs/ActivityLogs";
import BackLink from "@/components/elements/links/BackLink";
import useExtension from "@/hooks/useExtension";
import useModal from "@/hooks/useModal";
import LogModal from "@/components/modules/logs/modal/LogModal";
import Logs from "@/components/modules/logs/Logs";
import { getAuthSession } from "@/utils/auth";
import {
  classNames,
  isFile,
  NOTIFICATION_ACTION_TYPE,
  Roles,
} from "@/utils/utils";
import Button from "@/components/elements/Button";
import useConfirm from "@/hooks/useConfirm";
import { useAuth } from "@/context/AuthContext";
import { SocketContext } from "@/context/SocketContext";
import CommentForm from "@/components/modules/comments/CommentForm";
import StatusListbox from "@/components/modules/listbox/StatusListbox";
import PublicationStatus from "@/components/modules/listbox/PublicationListbox";
import PresentationStatus from "@/components/modules/listbox/PresentationListbox";

const defaultValues = {
  status: "",
  publication_status: false,
  presentation_status: false,
};
const SingleExtensionServices = () => {
  const notificationRef = useRef(null);
  const queryClient = useQueryClient();

  const router = useRouter();
  const extension_id = router.query.extensionId;

  // context
  const { current_user } = useAuth();
  const { sendNotification } = useContext(SocketContext);

  // hooks
  const { isConfirmed } = useConfirm();
  const { isOpen, toggleModal } = useModal();
  const {
    getExtensionById,
    updateExtensionStatus,
    createExtensionLog,
    getComments,
    createComment,
  } = useExtension();

  const { data: extension } = useQuery({
    queryKey: ["extension", extension_id],
    queryFn: () => getExtensionById(extension_id),
    enabled: !!extension_id,
  });

  const { data: comments } = useQuery({
    queryKey: ["extension-comments", extension_id],
    queryFn: () => getComments(extension_id),
    enabled: !!extension_id,
  });
  const methods = useForm({ defaultValues });

  const [status, publication_status, presentation_status] = methods.watch([
    "status",
    "publication_status",
    "presentation_status",
  ]);
  const receiverIds = extension?.proponents?.map((p) => p._id);

  useEffect(() => {
    if (extension) {
      methods.setValue("status", extension?.status);
      methods.setValue("publication_status", extension?.publication_status);
      methods.setValue("presentation_status", extension?.presentation_status);
    }
  }, [methods, extension]);

  const { mutateAsync: addLog, isSuccess } = useMutation({
    mutationFn: (values) => createExtensionLog(extension_id, values),

    onSuccess: () => {
      queryClient.invalidateQueries(["extension", extension_id]);
      toast.success("New log saved", {
        id: notificationRef.current,
      });

      const sendNotif = {
        sender: current_user,
        receiver: receiverIds,
        extension_id,
        action_type: NOTIFICATION_ACTION_TYPE.LOG.ADDED,
        isRead: false,
      };

      sendNotification(sendNotif);
    },

    onError: (error) => {
      const message = error.response.data.message;
      toast.error(message, {
        id: notificationRef.current,
      });
    },
  });

  const { mutateAsync: approveProposal } = useMutation({
    mutationFn: (status) => updateExtensionStatus(extension_id, status),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["extension", extension_id] });
      toast.success("Successfully saved", {
        id: notificationRef.current,
      });

      const sendNotif = {
        sender: current_user,
        receiver: receiverIds,
        extension_id,
        action_type: NOTIFICATION_ACTION_TYPE.APPROVE,
        isRead: false,
      };

      sendNotification(sendNotif);

      addLog({
        log_title: "Confirmed proposal",
        date_completion: new Date(),
        ongoing: false,
      });
    },
    onError: (error) => {
      const message = error.response.data.message;
      toast.error(message, {
        id: notificationRef.current,
      });
    },
  });

  const { mutateAsync: updateStatus } = useMutation({
    mutationFn: (values) => updateExtensionStatus(extension_id, values),
    onSuccess: (values) => {
      queryClient.invalidateQueries({ queryKey: ["extension", values._id] });
      toast.success("Status changed", {
        id: notificationRef.current,
      });

      const sendNotif = {
        sender: current_user,
        receiver: receiverIds,
        extension_id,
        action_type: NOTIFICATION_ACTION_TYPE.CHANGE_STATUS[values.status],
        isRead: false,
      };

      if (status !== values.status) {
        sendNotification(sendNotif);

        addLog({
          log_title: `Change status to ${values.status}`,
          date_completion: new Date(),
          ongoing: false,
        });
      }
    },

    onError: (error) => {
      const message = error.response.data.message;
      toast.error(message, {
        id: notificationRef.current,
      });
    },
  });

  const { mutateAsync: sendNewComment } = useMutation({
    mutationFn: (values) => createComment(extension_id, values),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["extension-comments", extension_id],
      });
      toast.success("New comment added");

      const sendNotif = {
        sender: current_user,
        receiver: receiverIds,
        extension_id,
        action_type: NOTIFICATION_ACTION_TYPE.COMMENTED,
        isRead: false,
      };

      sendNotification(sendNotif);
    },

    onError: (error) => {
      const message = error.response.data.message;
      toast.error(message);
    },
  });

  const handleLogSubmit = async (values) => {
    notificationRef.current = isFile(values?.file)
      ? toast.loading("Uploading file please wait..")
      : toast.loading("Saving...");

    await addLog(values);
    toggleModal();
  };

  const handleApproval = async () => {
    const confirm = await isConfirmed(
      "Are you sure you want to approve this proposal? Once approved status will be automatically change to proposal.",
      "Proposal Approval"
    );

    if (confirm) {
      const status = "proposal";

      await approveProposal(status);
    }
  };

  const handleChangeProjectStatus = async (val) => {
    if (status === val) return;

    const confirm = await isConfirmed(
      "Are you sure you want to update the status?",
      "Change status"
    );

    if (confirm) {
      let value = { status: val };
      await updateStatus(value);
    }
  };

  const handlePublicationStatus = async (val) => {
    if (publication_status === val) return;

    const confirm = await isConfirmed(
      "Are you sure you want to update the status?",
      "Change status"
    );

    if (confirm) {
      let value = { publication_status: val };
      await updateStatus(value);
    }
  };

  const handlePresentationStatus = async (val) => {
    if (presentation_status === val) return;

    const confirm = await isConfirmed(
      "Are you sure you want to update the status?",
      "Change status"
    );

    if (confirm) {
      let value = { presentation_status: val };
      await updateStatus(value);
    }
  };

  return (
    <AdminLayout>
      <SectionHeader className="flex flex-wrap-reverse items-center justify-between mt-16 mb-8 gap-y-10 sm:mb-20">
        <Heading
          as="h3"
          className="max-w-xl text-xl font-bold lg:text-2xl text-bc-primary"
          title={extension?.extension_title ?? ""}
        />
        <div className="space-x-4">
          <BackLink
            href={`/admin/extension-services`}
            className={classNames(
              status === "pending"
                ? "text-gray-500 bg-transparent shadow-[unset] hover:bg-transparent !px-6 focus:ring-[unset] hover:underline focus:ring-0"
                : ""
            )}
          />
          {status === "pending" ? (
            <Button className="btn-success" onClick={() => handleApproval()}>
              Confirm
            </Button>
          ) : null}
        </div>
      </SectionHeader>

      <FormProvider {...methods}>
        <div className="flex flex-wrap gap-6 mt-24">
          <StatusListbox
            onChange={handleChangeProjectStatus}
            disabled={status === "pending"}
          />

          <PublicationStatus onChange={handlePublicationStatus} />
          <PresentationStatus onChange={handlePresentationStatus} />
        </div>
      </FormProvider>

      <div className="grid grid-cols-1 gap-6 mx-auto mt-8 2xl:grid-flow-col-dense 2xl:grid-cols-3">
        <div className="space-y-6 2xl:col-span-2 2xl:col-start-1">
          <ExtensionServicesDetails data={extension} />
          <Comments extension_id={extension_id} data={comments}>
            <CommentForm onSubmitComment={sendNewComment} />
          </Comments>
        </div>

        <ActivityLogs>
          <div className="flex items-center justify-between">
            <Heading
              as="h2"
              id="project-logs-title"
              className="text-lg font-medium text-gray-900"
              title="Acitivity Logs"
            />

            <LogModal
              onSubmit={handleLogSubmit}
              isOpen={isOpen}
              toggleModal={toggleModal}
              isSuccess={isSuccess}
            />
          </div>

          {/* Activity Logs */}
          <div className="mt-8">
            <Logs logs={extension?.logs} />
          </div>
        </ActivityLogs>
      </div>
    </AdminLayout>
  );
};

export default SingleExtensionServices;

export const getServerSideProps = async (ctx) => {
  const session = await getAuthSession(ctx);
  const role = session?.user?.user_details?.role;

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  if (session && role !== Roles.ADMIN) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};
