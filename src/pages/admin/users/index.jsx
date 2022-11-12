import React from "react";
import AdminLayout from "@/components/layouts/admin/AdminLayout";
import Heading from "@/components/elements/Heading";
import Link from "next/link";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import UsersTable from "@/components/modules/Users/UsersTable";

const Users = () => {
  return (
    <AdminLayout>
      <div className="flex items-center justify-between mt-20 mb-20">
        <div className="sm:flex-auto">
          <Heading as="h1" title="Users" className="text-2xl font-bold" />
        </div>
        <>
          <Link href="/proponent/research-innovation/new">
            <a className="p-3 btn-primary xs:px-4">
              <span>
                <PlusCircleIcon className="w-5 h-5 text-white" />
              </span>
              <span>Add user</span>
            </a>
          </Link>
        </>
      </div>
      {/* <SearchBar /> */}
      <UsersTable />
    </AdminLayout>
  );
};

export default Users;
