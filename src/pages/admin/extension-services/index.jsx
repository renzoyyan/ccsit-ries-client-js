import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { FormProvider, useForm } from "react-hook-form";

import AdminLayout from "@/components/layouts/admin/AdminLayout";
import Heading from "@/components/elements/Heading";
import SearchBar from "@/components/elements/SearchBar";
import ExtensionServicesTable from "@/components/modules/extension/ExtensionServicesTable";
import useExtension from "@/hooks/useExtension";
import ExtensionServicesContent from "@/components/modules/extension/ExtensionServicesContent";
import Skeleton from "@/components/elements/skeleton/Skeleton";
import { getAuthSession } from "@/utils/auth";
import { filterStatusOptions, Roles } from "@/utils/utils";
import * as Form from "@/components/forms";

const defaultValues = {
  status: "all",
};

const ExtensionServicesPage = () => {
  const { getAllExtension } = useExtension();

  const methods = useForm({ defaultValues });

  const [status] = methods.watch(["status"]);

  const filterStatus = status === "all" ? null : status;

  const { data, isLoading } = useQuery({
    queryKey: ["extension", status],
    queryFn: () => getAllExtension({ status: filterStatus }),
    keepPreviousData: true,
  });

  const extension = data?.docs;

  return (
    <AdminLayout>
      <div className="mt-20 mb-20">
        <Heading
          as="h1"
          title="Extension Services"
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
      <ExtensionServicesTable>
        {extension?.length > 0 && !isLoading ? (
          extension?.map((exec, idx) => (
            <ExtensionServicesContent key={exec._id} {...exec} />
          ))
        ) : (
          <Skeleton columns={7} rows={5} isLoading={isLoading} />
        )}
      </ExtensionServicesTable>

      {extension?.length === 0 && !isLoading ? (
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
    </AdminLayout>
  );
};

export default ExtensionServicesPage;

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
