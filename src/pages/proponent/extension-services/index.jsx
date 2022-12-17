import Link from "next/link";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { Pagination } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";

import Heading from "@/components/elements/Heading";
import SearchBar from "@/components/elements/SearchBar";
import ExtensionServicesTable from "@/components/modules/extension/ExtensionServicesTable";
import UserLayout from "@/components/layouts/users/UserLayout";
import { filterStatusOptions, Roles } from "@/utils/utils";
import { getAuthSession } from "@/utils/auth";
import ExtensionServicesContent from "@/components/modules/extension/ExtensionServicesContent";
import useExtension from "@/hooks/useExtension";
import Skeleton from "@/components/elements/skeleton/Skeleton";
import usePagination from "@/hooks/usePagination";
import * as Form from "@/components/forms";
import StatusDropdown from "@/components/modules/StatusDropdown";
import useDebounce from "@/hooks/useDebounce";

const defaultValues = {
  status: "all",
  search: null,
};

const ExtensionServices = () => {
  const methods = useForm({ defaultValues });
  const [status, search] = methods.watch(["status", "search"]);

  const debouncedSearch = useDebounce(search, 500);
  const { page, limit, handlePagination } = usePagination();
  const { getCurrentUserExtensionProjects } = useExtension();

  const filterStatus = status === "all" ? null : status;

  let filters = {
    page,
    limit,
    status: filterStatus,
    search: debouncedSearch,
  };

  const { data, isLoading } = useQuery({
    queryKey: ["extension", filters],
    queryFn: () => getCurrentUserExtensionProjects(filters),
  });

  const extension = data?.docs;

  return (
    <UserLayout>
      <div className="flex flex-wrap items-center justify-between my-10 lg:my-20 gap-y-4">
        <div className="sm:flex-auto">
          <Heading
            as="h1"
            title="Extension Services"
            className="text-2xl font-bold"
          />
        </div>
        <>
          <Link href="/proponent/extension-services/new">
            <a className="p-3 btn-primary xs:px-4">
              <span>
                <PlusCircleIcon className="w-5 h-5 text-white" />
              </span>
              <span>Add project</span>
            </a>
          </Link>
        </>
      </div>

      <div className="flex items-center justify-between">
        <FormProvider {...methods}>
          <SearchBar />
          <StatusDropdown />
        </FormProvider>
      </div>

      <ExtensionServicesTable>
        {extension?.length > 0 && !isLoading ? (
          extension?.map((exec, idx) => (
            <ExtensionServicesContent key={exec._id} {...exec} />
          ))
        ) : (
          <Skeleton columns={8} rows={5} isLoading={isLoading} />
        )}
      </ExtensionServicesTable>

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
    </UserLayout>
  );
};

export default ExtensionServices;

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

  if (session && role !== Roles.PROPONENT) {
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
