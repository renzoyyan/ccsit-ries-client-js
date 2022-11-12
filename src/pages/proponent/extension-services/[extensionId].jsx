import { useRouter } from "next/router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";

import SectionHeader from "@/components/elements/SectionHeader";
import Heading from "@/components/elements/Heading";
import ExtensionServicesDetails from "@/components/modules/ExtensionServices/ExtensionServicesDetails";
import Comments from "@/components/modules/Comments";
import BackLink from "@/components/elements/links/BackLink";
import UserLayout from "@/components/layouts/users/UserLayout";
import { getAuthSession } from "@/utils/auth";
import { isFile, Roles, statusOptions } from "@/utils/utils";
import useExtension from "@/hooks/useExtension";
import Logs from "@/components/modules/logs/Logs";
import useLogs from "@/hooks/useLogs";
import { Listbox } from "@/components/forms";
import ActivityLogs from "@/components/modules/logs/ActivityLogs";
import LogModal from "@/components/modules/logs/modal/LogModal";
import useModal from "@/hooks/useModal";
import toast from "react-hot-toast";

const SingleExtensionServices = () => {
  const notificationRef = useRef(null);
  const queryClient = useQueryClient();

  const router = useRouter();
  const extension_id = router.query.extensionId;

  const { isOpen, toggleModal } = useModal();
  const { getExtensionById } = useExtension();
  const { getExtensionLogsById, createExtensionLog } = useLogs();

  const { data: extension, isLoading } = useQuery({
    queryKey: ["extension", extension_id],
    queryFn: () => getExtensionById(extension_id),
    enabled: !!extension_id,
  });

  const { data: logs } = useQuery({
    queryKey: ["logs"],
    queryFn: () => getExtensionLogsById(extension_id),
    enabled: !!extension_id,
  });

  const status = extension?.status;

  const methods = useForm({ defaultValues: { status: "" } });

  useEffect(() => {
    methods.setValue("status", status);
  }, [methods, status]);

  const { mutateAsync } = useMutation({
    mutationFn: (values) => createExtensionLog(extension_id, values),

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
          title={extension?.extension_title ?? ""}
        />
        <BackLink href="/proponent/extension-services" />
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
          <ExtensionServicesDetails data={extension} />
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

          {/* Activity Logs */}
          <div className="mt-8">
            <Logs logs={logs} />
          </div>
        </ActivityLogs>
      </div>
    </UserLayout>
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
