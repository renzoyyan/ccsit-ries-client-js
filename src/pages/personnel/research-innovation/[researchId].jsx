import React from "react";

import SectionHeader from "@/components/elements/SectionHeader";
import Heading from "@/components/elements/Heading";
import Comments from "@/components/modules/comments/Comments";
import ActivityLogs from "@/components/modules/logs/ActivityLogs";
import ResearchInnovationDetails from "@/components/modules/research/ResearchInnovationDetails";
import BackLink from "@/components/elements/links/BackLink";
import UserLayout from "@/components/layouts/users/UserLayout";
import { Roles } from "@/utils/utils";
import { getAuthSession } from "@/utils/auth";
import useResearch from "@/hooks/useResearch";
import useLogs from "@/hooks/useLogs";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import Logs from "@/components/modules/logs/Logs";

const SingleResearchInnovation = () => {
  const { getResearchById } = useResearch();
  const { getResearchLogsById } = useLogs();

  const router = useRouter();
  const research_id = router.query.researchId;

  const { data: research } = useQuery({
    queryKey: ["research", research_id],
    queryFn: () => getResearchById(research_id),
    enabled: !!research_id,
  });

  const { data: logs } = useQuery({
    queryKey: ["logs"],
    queryFn: () => getResearchLogsById(research_id),
    enabled: !!research_id,
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
          title={research?.research_title ?? ""}
        />
        <BackLink href="/personnel/research-innovation" />
      </SectionHeader>

      <div className="grid grid-cols-1 gap-6 mx-auto mt-8 2xl:grid-flow-col-dense 2xl:grid-cols-3">
        <div className="space-y-6 2xl:col-span-2 2xl:col-start-1">
          <ResearchInnovationDetails data={research} />
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
