import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { FormProvider, useForm } from "react-hook-form";
import { Pagination } from "@mui/material";

import Heading from "@/components/elements/Heading";
import SearchBar from "@/components/elements/SearchBar";
import ResearchInnovationTable from "@/components/modules/research/ResearchInnovationTable";
import UserLayout from "@/components/layouts/users/UserLayout";
import { getAuthSession } from "@/utils/auth";
import { Roles } from "@/utils/utils";
import useResearch from "@/hooks/useResearch";
import ResearchInnovationContent from "@/components/modules/research/ResearchInnovationContent";
import Skeleton from "@/components/elements/skeleton/Skeleton";
import StatusDropdown from "@/components/modules/StatusDropdown";
import useDebounce from "@/hooks/useDebounce";
import usePagination from "@/hooks/usePagination";
import AuthorFilter from "@/components/modules/AuthorFilter";
import FilterDate from "@/components/elements/FilterDate";

const defaultValues = {
  status: "all",
  search: null,
  author: null,
};

const ResearchInnovation = () => {
  const methods = useForm({ defaultValues });
  const [status, search, created_at, author] = methods.watch([
    "status",
    "search",
    "created_at",
    "author",
  ]);

  const { getAllResearch } = useResearch();
  const { page, limit, handlePagination } = usePagination();
  const debouncedSearch = useDebounce(search, 500);
  const filterStatus = status === "all" ? null : status;

  let filters = {
    page,
    limit,
    author,
    status: filterStatus,
    search: debouncedSearch,
    date: created_at,
  };

  const { data, isLoading } = useQuery({
    queryKey: ["research", filters],
    queryFn: () => getAllResearch(filters),
    keepPreviousData: true,
  });

  const research = data?.docs;

  return (
    <UserLayout>
      <div className="flex items-center justify-between mt-20 mb-20">
        <div className="sm:flex-auto">
          <Heading
            as="h1"
            title="Research & Innovation"
            className="text-2xl font-bold"
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-6">
        <FormProvider {...methods}>
          <SearchBar />
          <div className="inline-flex items-center gap-x-4">
            <AuthorFilter />
            <FilterDate name="created_at" />
            <StatusDropdown />
          </div>
        </FormProvider>
      </div>

      <ResearchInnovationTable>
        {research?.length > 0 && !isLoading ? (
          research.map((data) => (
            <ResearchInnovationContent key={data._id} {...data} />
          ))
        ) : (
          <Skeleton columns={8} rows={5} isLoading={isLoading} />
        )}
      </ResearchInnovationTable>

      {data?.totalPages > 1 && (
        <Pagination
          count={data?.totalPages}
          size="large"
          classes={{
            ul: "justify-center",
            root: "mt-4",
          }}
          onChange={handlePagination}
          showFirstButton
          showLastButton
        />
      )}

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
