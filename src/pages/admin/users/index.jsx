import React, { useContext } from "react";
import AdminLayout from "@/components/layouts/admin/AdminLayout";
import Heading from "@/components/elements/Heading";
import Link from "next/link";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import UsersTable from "@/components/modules/users/UsersTable";
import { useQuery } from "@tanstack/react-query";
import useUsers from "@/hooks/useUsers";
import { getAuthSession } from "@/utils/auth";
import { Roles } from "@/utils/utils";
import UsersContent from "@/components/modules/users/UsersContent";
import Skeleton from "@/components/elements/skeleton/Skeleton";
import Image from "next/image";
import UserModal from "@/components/modules/users/UserModal";

const Users = () => {
  const { getUsers } = useUsers();

  const { data, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  const users = data?.docs;
  return (
    <AdminLayout>
      <div className="flex items-center justify-between mt-20 mb-20">
        <div className="sm:flex-auto">
          <Heading as="h1" title="Users" className="text-2xl font-bold" />
        </div>

        <UserModal />
      </div>

      <UsersTable>
        {users?.length > 0 && !isLoading ? (
          users?.map((user, idx) => <UsersContent key={user._id} {...user} />)
        ) : (
          <Skeleton columns={7} rows={5} isLoading={isLoading} />
        )}
      </UsersTable>

      {users?.length === 0 && !isLoading ? (
        <div className="grid mt-10 space-y-6 text-center place-content-center">
          <Image
            src="/assets/no_data.svg"
            alt="No data found"
            width={300}
            height={150}
          />
          <p className="text-sm font-medium text-gray-400">No users found</p>
        </div>
      ) : null}
    </AdminLayout>
  );
};

export default Users;

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
