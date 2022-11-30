import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { FormProvider, useForm } from "react-hook-form";
import { useContext, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { BeatLoader } from "react-spinners";

import SectionHeader from "@/components/elements/SectionHeader";
import ResearchInnovationDetails from "@/components/modules/research/ResearchInnovationDetails";
import Comments from "@/components/modules/comments/Comments";
import Heading from "@/components/elements/Heading";
import UserLayout from "@/components/layouts/users/UserLayout";
import { getAuthSession } from "@/utils/auth";
import Logs from "@/components/modules/logs/Logs";
import useResearch from "@/hooks/useResearch";
import { Listbox } from "@/components/forms";
import LogModal from "@/components/modules/logs/modal/LogModal";
import ActivityLogs from "@/components/modules/logs/ActivityLogs";
import useModal from "@/hooks/useModal";
import useConfirm from "@/hooks/useConfirm";
import InformationAlert from "@/components/elements/alerts/InformationAlert";
import CommentForm from "@/components/modules/comments/CommentForm";
import Button from "@/components/elements/Button";
import { SocketContext } from "@/context/SocketContext";
import { useAuth } from "@/context/AuthContext";
import {
  isFile,
  NOTIFICATION_ACTION_TYPE,
  Roles,
  statusOptions,
} from "@/utils/utils";

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
  const { isOpen, toggleModal } = useModal();
  const { isConfirmed } = useConfirm();
  const {
    getResearchById,
    getComments,
    createResearchLog,
    updateResearchStatus,
    createComment,
  } = useResearch();

  const methods = useForm({ defaultValues });

  const { data, isLoading } = useQuery({
    queryKey: ["research", research_id],
    queryFn: () => getResearchById(research_id),
    enabled: !!research_id,
  });

  const { data: comments } = useQuery({
    queryKey: ["comments", research_id],
    queryFn: () => getComments(research_id),
    enabled: !!research_id,
  });

  const status = methods.watch("status");
  const receiverIds = data?.proponents
    ?.filter((proponent) => proponent._id !== current_user)
    ?.map((p) => p._id);

  useEffect(() => {
    if (data) {
      methods.setValue("status", data?.status);
    }
  }, [methods, data]);

  // mutations
  const { mutateAsync: addLog } = useMutation({
    mutationFn: (values) => createResearchLog(research_id, values),

    onSuccess: (values) => {
      console.log(values);
      queryClient.invalidateQueries({
        queryKey: ["research", research_id],
      });
      toast.success("New log saved", {
        id: notificationRef.current,
      });
      toggleModal();

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

  const { mutateAsync: updateStatus } = useMutation({
    mutationFn: (status) => updateResearchStatus(research_id, status),
    onSuccess: (values) => {
      queryClient.invalidateQueries({ queryKey: ["research", values._id] });
      toast.success("Status changed", {
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
        queryKey: ["comments", values.research_id],
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
    <UserLayout>
      {isLoading ? (
        <div className="h-[80vh] flex items-center justify-center">
          <BeatLoader loading={isLoading} size={15} color="#053E85" />
        </div>
      ) : (
        <>
          <SectionHeader className="items-center justify-between mt-16 mb-8 sm:flex sm:mb-20">
            <Heading
              as="h3"
              className="text-2xl font-bold text-bc-primary"
              title={data?.research_title ?? ""}
            />
            {/* <BackLink href="/proponent/research-innovation" /> */}
            <Button
              className={"px-12 py-3 btn-primary cursor-pointer"}
              onClick={() => {
                router.push("/proponent/research-innovation");
              }}
            >
              Back
            </Button>
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
              <Comments research_id={research_id} data={comments}>
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
                  disabled={status === "pending"}
                />
              </div>

              {status === "pending" ? <InformationAlert /> : null}

              {/* Activity Feed */}
              <div className="mt-8">
                <Logs logs={data?.logs} />
              </div>
            </ActivityLogs>
          </div>
        </>
      )}
    </UserLayout>
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

  if (session && role !== Roles.PROPONENT) {
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