import Link from "next/link";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import Image from "next/future/image";
import { useQuery } from "@tanstack/react-query";

import Heading from "@/components/elements/Heading";
import SearchBar from "@/components/elements/SearchBar";
import ResearchInnovationTable from "@/components/modules/research/ResearchInnovationTable";
import UserLayout from "@/components/layouts/users/UserLayout";
import { getAuthSession } from "@/utils/auth";
import ResearchInnovationContent from "@/components/modules/research/ResearchInnovationContent";
import Skeleton from "@/components/elements/skeleton/Skeleton";
import { Roles } from "@/utils/utils";
import researchApi from "@/services/research";
import useResearch from "@/hooks/useResearch";

const ResearchInnovation = () => {
  const { getCurrentUserResearchProjects } = useResearch();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["research"],
    queryFn: getCurrentUserResearchProjects,
  });

  const research = data?.docs;

  return (
    <UserLayout>
      <div className="flex flex-wrap items-center justify-between my-10 lg:my-20 gap-y-4">
        <div className="sm:flex-auto">
          <Heading
            as="h1"
            title="Research & Innovation"
            className="text-2xl font-bold"
          />
        </div>
        <Link href="/proponent/research-innovation/new">
          <a className="p-3 btn-primary xs:px-4">
            <span>
              <PlusCircleIcon className="w-5 h-5 text-white" />
            </span>
            <span>Add project</span>
          </a>
        </Link>
      </div>

      <SearchBar />
      <ResearchInnovationTable>
        {research?.length > 0 && !isLoading ? (
          research?.map((research, idx) => (
            <ResearchInnovationContent key={research._id} {...research} />
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
            width={200}
            height={150}
          />
          <p className="text-sm font-medium text-gray-400">No projects found</p>
        </div>
      ) : null}

      {isError && <p>error</p>}
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
