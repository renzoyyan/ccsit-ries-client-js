import { useQuery } from "@tanstack/react-query";
import { FormProvider, useForm } from "react-hook-form";
import { Pagination } from "@mui/material";
import Image from "next/image";
import { useRef } from "react";
import { toast } from "react-hot-toast";

import AdminLayout from "@/components/layouts/admin/AdminLayout";
import Heading from "@/components/elements/Heading";
import SearchBar from "@/components/elements/SearchBar";
import ResearchInnovationTable from "@/components/modules/research/ResearchInnovationTable";
import useResearch from "@/hooks/useResearch";
import Skeleton from "@/components/elements/skeleton/Skeleton";
import ResearchInnovationContent from "@/components/modules/research/ResearchInnovationContent";
import { Roles } from "@/utils/utils";
import { getAuthSession } from "@/utils/auth";
import usePagination from "@/hooks/usePagination";
import StatusDropdown from "@/components/modules/StatusDropdown";
import useDebounce from "@/hooks/useDebounce";
import FilterDate from "@/components/elements/FilterDate";
import ExportButton from "@/components/elements/ExportButton";
import AuthorFilter from "@/components/modules/AuthorFilter";

const defaultValues = {
  status: "all",
  search: null,
  author: null,
};

const ResearchInnovation = () => {
  const pdfRef = useRef();
  const methods = useForm({ defaultValues });
  const [status, search, created_at, author] = methods.watch([
    "status",
    "search",
    "created_at",
    "author",
  ]);

  const debouncedSearch = useDebounce(search, 500);
  const { page, limit, handlePagination } = usePagination();
  const { getAllResearch, exportResearchPDF } = useResearch();

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
    <AdminLayout>
      <div className="mt-20 mb-20 ">
        <Heading
          as="h1"
          title="Research & Innovation"
          className="text-xl font-bold lg:text-2xl"
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-6">
        <FormProvider {...methods}>
          <SearchBar />
          <div className="inline-flex items-center gap-x-6">
            <AuthorFilter />
            <FilterDate name="created_at" />
            <StatusDropdown />
            <ExportButton
              pdfRef={pdfRef}
              exportCallback={() =>
                research?.length > 0
                  ? exportResearchPDF(pdfRef, {
                      date: filters.date === "" ? null : filters.date,
                      status: filters.status,
                    })
                  : toast.error(
                      "There was no data found. PDF cannot be generated."
                    )
              }
            />
          </div>
        </FormProvider>
      </div>

      <ResearchInnovationTable>
        {research?.length > 0 && !isLoading ? (
          research?.map((research, idx) => (
            <ResearchInnovationContent key={research._id} {...research} />
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
