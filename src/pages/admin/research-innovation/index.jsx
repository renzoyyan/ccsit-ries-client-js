import { useQuery } from "@tanstack/react-query";

import AdminLayout from "@/components/layouts/admin/AdminLayout";
import Heading from "@/components/elements/Heading";
import SearchBar from "@/components/elements/SearchBar";
import ResearchInnovationTable from "@/components/modules/research/ResearchInnovationTable";
import useResearch from "@/hooks/useResearch";
import Skeleton from "@/components/elements/skeleton/Skeleton";
import ResearchInnovationContent from "@/components/modules/research/ResearchInnovationContent";
import Image from "next/image";
import { filterStatusOptions, Roles } from "@/utils/utils";
import { getAuthSession } from "@/utils/auth";
import { FormProvider, useForm } from "react-hook-form";
import * as Form from "@/components/forms";

const defaultValues = {
  status: "all",
};

const ResearchInnovation = () => {
  const { getAllResearch } = useResearch();

  const methods = useForm({ defaultValues });

  const [status] = methods.watch(["status"]);

  const filterStatus = status === "all" ? null : status;

  const { data, isLoading } = useQuery({
    queryKey: ["research", status],
    queryFn: () => getAllResearch({ status: filterStatus }),
    keepPreviousData: true,
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
