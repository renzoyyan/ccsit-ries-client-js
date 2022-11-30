import SectionHeader from "@/components/elements/SectionHeader";
import Heading from "@/components/elements/Heading";
import ActivityLogs from "@/components/modules/logs/ActivityLogs";
import Comments from "@/components/modules/comments/Comments";
import BackLink from "@/components/elements/links/BackLink";
import ExtensionServicesDetails from "@/components/modules/extension/ExtensionServicesDetails";
import UserLayout from "@/components/layouts/users/UserLayout";
import { getAuthSession } from "@/utils/auth";
import { Roles } from "@/utils/utils";
import useExtension from "@/hooks/useExtension";
import useLogs from "@/hooks/useLogs";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";

import Logs from "@/components/modules/logs/Logs";
const SingleExtensionServices = () => {
  const { getExtensionById } = useExtension();
  const { getExtensionLogsById } = useLogs();

  const router = useRouter();
  const extension_id = router.query.extensionId;

  const { data: extension } = useQuery({
    queryKey: ["research", extension_id],
    queryFn: () => getExtensionById(extension_id),
    enabled: !!extension_id,
  });

  const { data: logs } = useQuery({
    queryKey: ["logs"],
    queryFn: () => getExtensionLogsById(extension_id),
    enabled: !!extension_id,
  });

  const proposalLogs = logs
    ?.filter((log) => log.status === "proposal")
    .map((val) => val);

  return (
    <UserLayout>
      <SectionHeader className="items-center justify-between mt-16 mb-8 sm:flex sm:mb-20">
        <Heading
          as="h3"
          className="text-2xl font-bold text-bc-primary"
          title={extension?.extension_title ?? ""}
        />
        <BackLink href="/personnel/extension-services" />
      </SectionHeader>

      <div className="grid grid-cols-1 gap-6 mx-auto mt-8 2xl:grid-flow-col-dense 2xl:grid-cols-3">
        <div className="space-y-6 2xl:col-span-2 2xl:col-start-1">
          <ExtensionServicesDetails data={extension} />
          <Comments isView />
        </div>

        <ActivityLogs>
          <Heading
            as="h2"
            id="project-logs-title"
            className="text-lg font-medium text-gray-900"
            title="Acitivity Logs"
          />

          {/* Activity Feed */}
          <div className="flow-root mt-4">
            {proposalLogs?.length > 0 ? <Logs logs={proposalLogs} /> : null}
            {/* <Logs status="ongoing" logs={onGoing} />
            <Logs status="completed" logs={completed} />  */}
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
      props: {},
    };
  }

  if (session && role !== Roles.PERSONNEL) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
      props: {},
    };
  }

  return {
    props: { session },
  };
};
