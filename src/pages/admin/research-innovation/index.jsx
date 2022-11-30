import { useQuery } from "@tanstack/react-query";

import AdminLayout from "@/components/layouts/admin/AdminLayout";
import Heading from "@/components/elements/Heading";
import SearchBar from "@/components/elements/SearchBar";
import ResearchInnovationTable from "@/components/modules/research/ResearchInnovationTable";
import useResearch from "@/hooks/useResearch";
import Skeleton from "@/components/elements/skeleton/Skeleton";
import ResearchInnovationContent from "@/components/modules/research/ResearchInnovationContent";
import Image from "next/image";
import { Roles } from "@/utils/utils";
import { getAuthSession } from "@/utils/auth";
import { useEffect } from "react";

const ResearchInnovation = () => {
  const { getAllResearch } = useResearch();

  const { data, isLoading } = useQuery({
    queryKey: ["research"],
    queryFn: getAllResearch,
  });

  const research = data?.docs;

  return (
    <AdminLayout>
      <div className="mt-20 mb-20 ">
        <Heading
          as="h1"
          title="Research & Innovation"
          className="text-2xl font-bold"
        />
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
    </AdminLayout>
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
