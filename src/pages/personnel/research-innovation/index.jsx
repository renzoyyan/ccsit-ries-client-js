import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

import Heading from "@/components/elements/Heading";
import SearchBar from "@/components/elements/SearchBar";
import ResearchInnovationTable from "@/components/modules/ResearchInnovation/ResearchInnovationTable";
import UserLayout from "@/components/layouts/users/UserLayout";
import { getAuthSession } from "@/utils/auth";
import { Roles } from "@/utils/utils";
import useResearch from "@/hooks/useResearch";
import ResearchInnovationContent from "@/components/modules/ResearchInnovation/ResearchInnovationContent";
import Skeleton from "@/components/elements/skeleton/Skeleton";

const ResearchInnovation = () => {
  const { getAllResearch } = useResearch();

  const { data, isLoading } = useQuery({
    queryKey: ["research"],
    queryFn: () => getAllResearch(),
  });

  const research = data?.docs;

  return (
    <UserLayout>
      <div className="flex items-center justify-between mt-20 mb-20">
        <div className="sm:flex-auto">
          <Heading as="h1" title="Projects" className="text-3xl font-bold" />
        </div>
      </div>

      <SearchBar />
      <ResearchInnovationTable>
        {research?.length > 0 && !isLoading ? (
          research.map((data) => (
            <ResearchInnovationContent key={data._id} {...data} />
          ))
        ) : (
          <Skeleton columns={7} rows={5} isLoading={isLoading} />
        )}
      </ResearchInnovationTable>

      {research?.length === 0 && !isLoading ? (
        <div className="grid mt-10 space-y-6 text-center place-content-center">
          <Image
            src="/assets/no_data.svg"
            alt="No data found"
            width={300}
            height={150}
          />
          <p className="text-sm font-medium text-gray-400">No projects found</p>
        </div>
      ) : null}
    </UserLayout>
  );
};

export default ResearchInnovation;

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
