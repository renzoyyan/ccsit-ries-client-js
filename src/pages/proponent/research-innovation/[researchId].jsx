import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { FormProvider, useForm } from "react-hook-form";
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";

import SectionHeader from "@/components/elements/SectionHeader";
import ResearchInnovationDetails from "@/components/modules/ResearchInnovation/ResearchInnovationDetails";
import Comments from "@/components/modules/Comments";
import Heading from "@/components/elements/Heading";
import BackLink from "@/components/elements/links/BackLink";
import UserLayout from "@/components/layouts/users/UserLayout";
import { getAuthSession } from "@/utils/auth";
import Logs from "@/components/modules/logs/Logs";
import { isFile, Roles, statusOptions } from "@/utils/utils";
import useResearch from "@/hooks/useResearch";
import useLogs from "@/hooks/useLogs";
import { Listbox } from "@/components/forms";
import LogModal from "@/components/modules/logs/modal/LogModal";
import ActivityLogs from "@/components/modules/logs/ActivityLogs";
import useModal from "@/hooks/useModal";

const SingleResearchInnovation = () => {
  const notificationRef = useRef(null);
  const queryClient = useQueryClient();

  const { getResearchById } = useResearch();
  const { getResearchLogsById, createResearchLog } = useLogs();
  const { isOpen, toggleModal } = useModal();

  const router = useRouter();
  const research_id = router.query.researchId;

  const methods = useForm({ defaultValues: { status: "" } });

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

  useEffect(() => {
    methods.setValue("status", status);
  }, [methods, status]);

  const { mutateAsync } = useMutation({
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

  const handleLogSubmit = async (values) => {
    notificationRef.current = isFile(values?.file)
      ? toast.loading("Uploading file please wait..")
      : toast.loading("Saving...");

    await mutateAsync(values);
  };

  return (
    <UserLayout>
      <SectionHeader className="items-center justify-between mt-16 mb-8 sm:flex sm:mb-20">
        <Heading
          as="h3"
          className="text-2xl font-bold text-bc-primary"
          title={data?.research_title ?? ""}
        />
        <BackLink href="/proponent/research-innovation" />
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
              disabled={status === "pending"}
            />
          </div>

          {status === "pending" ? (
            <span className="text-xs font-medium text-gray-400">
              Note: You can only add logs once approved.
            </span>
          ) : null}

          {/* Activity Feed */}
          <div className="mt-8">
            <Logs logs={logs} />
          </div>
        </ActivityLogs>
      </div>
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
