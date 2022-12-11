import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { FormProvider, useForm } from "react-hook-form";

import Heading from "@/components/elements/Heading";
import SearchBar from "@/components/elements/SearchBar";
import ExtensionServicesTable from "@/components/modules/extension/ExtensionServicesTable";
import UserLayout from "@/components/layouts/users/UserLayout";
import { getAuthSession } from "@/utils/auth";
import { Roles } from "@/utils/utils";
import useExtension from "@/hooks/useExtension";
import ExtensionServicesContent from "@/components/modules/extension/ExtensionServicesContent";
import Skeleton from "@/components/elements/skeleton/Skeleton";
import StatusDropdown from "@/components/modules/StatusDropdown";
import usePagination from "@/hooks/usePagination";
import useDebounce from "@/hooks/useDebounce";
import { Pagination } from "@mui/material";

const defaultValues = {
  status: "all",
  search: null,
};
const ExtensionServices = () => {
  const methods = useForm({ defaultValues });
  const [status, search] = methods.watch(["status", "search"]);

  const { getAllExtension } = useExtension();
  const { page, limit, handlePagination } = usePagination();
  const debouncedSearch = useDebounce(search, 500);

  const filterStatus = status === "all" ? null : status;

  let filters = {
    page,
    limit,
    status: filterStatus,
    search: debouncedSearch,
  };

  const { data, isLoading } = useQuery({
    queryKey: ["extenstion", filters],
    queryFn: () => getAllExtension(filters),
  });

  const extension = data?.docs;

  return (
    <UserLayout>
      <div className="flex items-center justify-between mt-20 mb-20">
        <div className="sm:flex-auto">
          <Heading as="h1" title="Projects" className="text-3xl font-bold" />
        </div>
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
          <Skeleton columns={7} rows={5} isLoading={isLoading} />
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
