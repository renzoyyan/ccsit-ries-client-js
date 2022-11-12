import Link from "next/link";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { useQuery } from "@tanstack/react-query";

import Heading from "@/components/elements/Heading";
import SearchBar from "@/components/elements/SearchBar";
import ExtensionServicesTable from "@/components/modules/ExtensionServices/ExtensionServicesTable";
import UserLayout from "@/components/layouts/users/UserLayout";
import { Roles } from "@/utils/utils";
import { getAuthSession } from "@/utils/auth";
import ExtensionServicesContent from "@/components/modules/ExtensionServices/ExtensionServicesContent";
import useExtension from "@/hooks/useExtension";
import Skeleton from "@/components/elements/skeleton/Skeleton";
import Image from "next/image";

const ExtensionServices = () => {
  const { getCurrentUserExtensionProjects } = useExtension();

  const { data, isLoading } = useQuery({
    queryKey: ["extension"],
    queryFn: () => getCurrentUserExtensionProjects(),
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

      <SearchBar />
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
