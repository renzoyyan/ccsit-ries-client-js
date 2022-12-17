import { useContext, useEffect, useRef } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import SectionHeader from "@/components/elements/SectionHeader";
import AdminLayout from "@/components/layouts/admin/AdminLayout";
import ResearchInnovationDetails from "@/components/modules/research/ResearchInnovationDetails";
import Comments from "@/components/modules/comments/Comments";
import ActivityLogs from "@/components/modules/logs/ActivityLogs";
import Heading from "@/components/elements/Heading";
import BackLink from "@/components/elements/links/BackLink";
import useResearch from "@/hooks/useResearch";
import useModal from "@/hooks/useModal";
import LogModal from "@/components/modules/logs/modal/LogModal";
import Logs from "@/components/modules/logs/Logs";
import { getAuthSession } from "@/utils/auth";
import {
  classNames,
  isFile,
  NOTIFICATION_ACTION_TYPE,
  Roles,
  statusOptions,
} from "@/utils/utils";
import Button from "@/components/elements/Button";
import { Listbox } from "@/components/forms";
import useConfirm from "@/hooks/useConfirm";
import CommentForm from "@/components/modules/comments/CommentForm";
import { useAuth } from "@/context/AuthContext";
import { SocketContext } from "@/context/SocketContext";

const defaultValues = {
  status: "",
};

const SingleResearchInnovation = () => {
  const notificationRef = useRef(null);
  const queryClient = useQueryClient();

  const router = useRouter();
  const research_id = router.query.researchId;

  // context
  const { current_user } = useAuth();
  const { sendNotification } = useContext(SocketContext);

  // hooks
  const { isConfirmed } = useConfirm();
  const {
    getResearchById,
    createComment,
    createResearchLog,
    updateResearchStatus,
  } = useResearch();
  const { isOpen, toggleModal } = useModal();

  const { data } = useQuery({
    queryKey: ["research", research_id],
    queryFn: () => getResearchById(research_id),
    enabled: !!research_id,
  });

  // const { data: comments } = useQuery({
  //   queryKey: ["comments", research_id],
  //   queryFn: () => getComments(research_id),
  //   enabled: !!research_id,
  // });

  const receiverIds = data?.proponents?.map((p) => p._id);

  const methods = useForm({ defaultValues });

  const status = methods.watch("status");

  useEffect(() => {
    if (data) {
      methods.setValue("status", data?.status);
    }
  }, [methods, data]);

  const { mutateAsync: addLog } = useMutation({
    mutationFn: (values) => createResearchLog(research_id, values),

    onSuccess: () => {
      queryClient.invalidateQueries(["research", research_id]);
      toast.success("New log saved", {
        id: notificationRef.current,
      });

      const sendNotif = {
        sender: current_user,
        receiver: receiverIds,
        research_id,
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
    mutationFn: (status) => updateResearchStatus(research_id, status),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["research", research_id] });
      toast.success("Successfully saved", {
        id: notificationRef.current,
      });

      const sendNotif = {
        sender: current_user,
        receiver: receiverIds,
        research_id,
        action_type: NOTIFICATION_ACTION_TYPE.APPROVE,
        isRead: false,
      };

      sendNotification(sendNotif);

      addLog({
        log_title: "Approved proposal",
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
    mutationFn: (status) => updateResearchStatus(research_id, status),

    onSuccess: (values) => {
      queryClient.invalidateQueries({ queryKey: ["research", research_id] });
      toast.success("Successfully saved", {
        id: notificationRef.current,
      });

      const sendNotif = {
        sender: current_user,
        receiver: receiverIds,
        research_id,
        action_type: NOTIFICATION_ACTION_TYPE.CHANGE_STATUS[values.status],
        isRead: false,
      };

      sendNotification(sendNotif);

      addLog({
        log_title: `Change status to ${values.status}`,
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

  const { mutateAsync: sendNewComment } = useMutation({
    mutationFn: (values) => createComment(research_id, values),

    onSuccess: (values) => {
      queryClient.invalidateQueries({
        queryKey: ["research", research_id],
      });
      toast.success("New comment added");

      const sendNotif = {
        sender: current_user,
        receiver: receiverIds,
        research_id,
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

  const handleChangeStatus = async (val) => {
    if (status === val) return;

    const confirm = await isConfirmed(
      "Are you sure you want to update the status?",
      "Change status"
    );

    if (confirm) {
      await updateStatus(val);
    }
  };

  return (
    <AdminLayout>
      <SectionHeader className="items-center justify-between mt-16 mb-8 sm:flex sm:mb-20">
        <Heading
          as="h3"
          className="max-w-xl text-xl font-bold lg:text-2xl text-bc-primary"
          title={data?.research_title ?? ""}
        />
        <div className="space-x-4">
          <BackLink
            href={`/admin/research-innovation`}
            className={classNames(
              status === "pending"
                ? "text-gray-500 bg-transparent shadow-[unset] hover:bg-transparent !px-6 focus:ring-[unset] hover:underline focus:ring-0"
                : ""
            )}
          />
          {status === "pending" ? (
            <Button className="btn-success" onClick={() => handleApproval()}>
              Approve
            </Button>
          ) : null}
        </div>
      </SectionHeader>

      <FormProvider {...methods}>
        <div className="flex items-center gap-x-4">
          <Heading
            as="h4"
            title="Status"
            className="text-sm font-medium text-gray-600"
          />
          <Listbox
            options={statusOptions}
            name="status"
            disabled={status === "pending"}
            withCustomOnChange
            handleChange={handleChangeStatus}
          />
        </div>
      </FormProvider>
      <div className="grid grid-cols-1 gap-6 mx-auto mt-8 2xl:grid-flow-col-dense 2xl:grid-cols-3">
        <div className="space-y-6 2xl:col-span-2 2xl:col-start-1">
          <ResearchInnovationDetails data={data} />
          <Comments research_id={research_id} data={data?.comments}>
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
            />
          </div>

          {/* Activity Feed */}
          <div className="mt-8">
            <Logs logs={data?.logs} />
          </div>
        </ActivityLogs>
      </div>
    </AdminLayout>
  );
};

export default SingleResearchInnovation;

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
