import Link from "next/link";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import Image from "next/future/image";
import { useQuery } from "@tanstack/react-query";
import { FormProvider, useForm } from "react-hook-form";

import Heading from "@/components/elements/Heading";
import SearchBar from "@/components/elements/SearchBar";
import ResearchInnovationTable from "@/components/modules/research/ResearchInnovationTable";
import UserLayout from "@/components/layouts/users/UserLayout";
import { getAuthSession } from "@/utils/auth";
import ResearchInnovationContent from "@/components/modules/research/ResearchInnovationContent";
import Skeleton from "@/components/elements/skeleton/Skeleton";
import { filterStatusOptions, Roles } from "@/utils/utils";
import useResearch from "@/hooks/useResearch";
import * as Form from "@/components/forms";
import { Pagination } from "@mui/material";
import { useState } from "react";

const defaultValues = {
  status: "all",
};

const ResearchInnovation = () => {
  const [page, setPage] = useState(1);
  const { getCurrentUserResearchProjects } = useResearch();

  const methods = useForm({ defaultValues });

  const [status] = methods.watch(["status"]);
  const filterStatus = status === "all" ? null : status;

  let filters = {
    page,
    limit: 2,
    status: filterStatus,
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["research", filters],
    queryFn: () => getCurrentUserResearchProjects(filters),
  });

  const research = data?.docs;

  const handlePagination = (event, value) => {
    setPage(value);
  };

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

      <div className="flex items-center justify-between">
        <SearchBar />

        <FormProvider {...methods}>
          <Form.Group className="flex items-center gap-x-4 !space-y-0">
            <Heading
              as="h3"
              title="Status"
              className="text-lg font-medium text-gray-700"
            />
            <Form.Listbox options={filterStatusOptions} name="status" />
          </Form.Group>
        </FormProvider>
      </div>
      <ResearchInnovationTable>
        {research?.length > 0 && !isLoading ? (
          research?.map((research, idx) => (
            <ResearchInnovationContent key={research._id} {...research} />
          ))
        ) : (
          <Skeleton columns={7} rows={5} isLoading={isLoading} />
        )}
      </ResearchInnovationTable>

      {data?.totalPages > 1 && (
        <Pagination
          count={totalPages}
          size="large"
          classes={{
            ul: "justify-center",
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
