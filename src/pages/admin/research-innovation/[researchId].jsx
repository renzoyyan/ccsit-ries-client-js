import { useEffect, useRef } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/router";

import SectionHeader from "@/components/elements/SectionHeader";
import AdminLayout from "@/components/layouts/admin/AdminLayout";
import ResearchInnovationDetails from "@/components/modules/ResearchInnovation/ResearchInnovationDetails";
import Comments from "@/components/modules/comments/Comments";
import ActivityLogs from "@/components/modules/logs/ActivityLogs";
import Heading from "@/components/elements/Heading";
import BackLink from "@/components/elements/links/BackLink";
import useResearch from "@/hooks/useResearch";
import useLogs from "@/hooks/useLogs";
import useModal from "@/hooks/useModal";
import LogModal from "@/components/modules/logs/modal/LogModal";
import Logs from "@/components/modules/logs/Logs";
import { getAuthSession } from "@/utils/auth";
import { classNames, isFile, Roles, statusOptions } from "@/utils/utils";
import Button from "@/components/elements/Button";
import { FormProvider, useForm } from "react-hook-form";
import { Listbox } from "@/components/forms";
import useConfirm from "@/hooks/useConfirm";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const socket = io.connect("http://localhost:5000");

const SingleResearchInnovation = () => {
  const notificationRef = useRef(null);
  const queryClient = useQueryClient();

  const router = useRouter();
  const research_id = router.query.researchId;

  // hooks
  const { isConfirmed } = useConfirm();
  const { getResearchById, updateResearchStatus } = useResearch();
  const { getResearchLogsById, createResearchLog } = useLogs();
  const { isOpen, toggleModal } = useModal();

  const { data, isLoading } = useQuery({
    queryKey: ["research", research_id],
    queryFn: () => getResearchById(research_id),
    enabled: !!research_id,
  });

  const { data: logs } = useQuery({
    queryKey: ["logs"],
    queryFn: () => getResearchLogsById(research_id),
    enabled: !!research_id,
  });

  const status = data?.status;

  const methods = useForm();

  useEffect(() => {
    socket.emit("join_project", research_id);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    methods.setValue("status", status);
  }, [methods, status]);

  const { mutateAsync: addLog } = useMutation({
    mutationFn: (values) => createResearchLog(research_id, values),

    onSuccess: () => {
      queryClient.invalidateQueries("logs");
      toast.success("New log saved", {
        id: notificationRef.current,
      });
      toggleModal();
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
      toast.success("Successfully saved", {
        id: notificationRef.current,
      });
    },
    onError: (error) => {
      const message = error.response.data.message;
      toast.error(message, {
        id: notificationRef.current,
      });
    },
  });

  const handleLogSubmit = async (values) => {
    notificationRef.current = isFile(values?.file)
      ? toast.loading("Uploading file please wait..")
      : toast.loading("Saving...");

    await addLog(values);
  };

  const handleApproval = async () => {
    const confirm = await isConfirmed(
      "Are you sure you want to approve this proposal? Once approved status will be automatically change to proposal.",
      "Proposal Approval"
    );

    if (confirm) {
      const status = "proposal";

      await updateStatus(status);
    }
  };

  return (
    <AdminLayout>
      <SectionHeader className="items-center justify-between mt-16 mb-8 sm:flex sm:mb-20">
        <Heading
          as="h3"
          className="text-2xl font-bold text-bc-primary"
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
          />
        </div>
      </FormProvider>
      <div className="grid grid-cols-1 gap-6 mx-auto mt-8 2xl:grid-flow-col-dense 2xl:grid-cols-3">
        <div className="space-y-6 2xl:col-span-2 2xl:col-start-1">
          <ResearchInnovationDetails data={data} />
          <Comments isView={false} />
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
            <Logs logs={logs} />
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
