import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";

import AdminLayout from "@/components/layouts/admin/AdminLayout";
import Heading from "@/components/elements/Heading";
import UsersTable from "@/components/modules/users/UsersTable";
import useUsers from "@/hooks/useUsers";
import { getAuthSession } from "@/utils/auth";
import { filterRoleOptions, Roles } from "@/utils/utils";
import UsersContent from "@/components/modules/users/UsersContent";
import Skeleton from "@/components/elements/skeleton/Skeleton";
import UserModal from "@/components/modules/users/UserModal";
import * as Form from "@/components/forms";

const defaultValues = {
  role: "all",
};

const Users = () => {
  const { getUsers } = useUsers();

  const methods = useForm({ defaultValues });

  const [role] = methods.watch(["role"]);
  const filterRole = role === "all" ? null : role;

  const { data, isLoading } = useQuery({
    queryKey: ["users", role],
    queryFn: () => getUsers({ role: filterRole }),
    keepPreviousData: true,
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

      <FormProvider {...methods}>
        <Form.Group className="flex items-center gap-x-4 !space-y-0">
          <Heading
            as="h3"
            title="Role"
            className="text-lg font-medium text-gray-700"
          />
          <Form.Listbox options={filterRoleOptions} name="role" />
        </Form.Group>
      </FormProvider>

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
