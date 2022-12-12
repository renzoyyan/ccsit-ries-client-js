import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

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

import Logs from "@/components/modules/logs/Logs";
const SingleExtensionServices = () => {
  const { getExtensionById, getComments } = useExtension();

  const router = useRouter();
  const extension_id = router.query.extensionId;

  const { data: extension } = useQuery({
    queryKey: ["research", extension_id],
    queryFn: () => getExtensionById(extension_id),
    enabled: !!extension_id,
  });

  const { data: comments } = useQuery({
    queryKey: ["comments", research_id],
    queryFn: () => getComments(research_id),
    enabled: !!research_id,
  });

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

      <div className="flex items-center gap-x-4">
        <Heading
          as="h4"
          title="Status"
          className="text-sm font-medium text-gray-600"
        />
        <h3 className="px-5 py-2 font-medium capitalize bg-white rounded-md pointer-events-none sm:text-sm ring-1 ring-gray-300">
          {extension?.status}
        </h3>
      </div>

      <div className="grid grid-cols-1 gap-6 mx-auto mt-8 2xl:grid-flow-col-dense 2xl:grid-cols-3">
        <div className="space-y-6 2xl:col-span-2 2xl:col-start-1">
          <ExtensionServicesDetails data={extension} />
          <Comments isView data={comments} />
        </div>

        <ActivityLogs>
          <Heading
            as="h2"
            id="project-logs-title"
            className="text-lg font-medium text-gray-900"
            title="Acitivity Logs"
          />

          {/* Activity Feed */}
          <div className="mt-8">
            <Logs logs={extension?.logs} />
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
