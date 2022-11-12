import React from "react";
import { NextPage } from "next";
import Link from "next/link";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

import AdminLayout from "@/components/layouts/admin/AdminLayout";
import Heading from "@/components/elements/Heading";
import SearchBar from "@/components/elements/SearchBar";
import ExtensionServicesTable from "@/components/modules/ExtensionServices/ExtensionServicesTable";

const ExtensionServices = () => {
  return (
    <AdminLayout>
      <div className="flex items-center justify-between mt-20 mb-20">
        <div className="sm:flex-auto">
          <Heading
            as="h1"
            title="Extension Services"
            className="text-2xl font-bold"
          />
        </div>
        <>
          <Link href="/admin/extension-services/new">
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
      <ExtensionServicesTable />
    </AdminLayout>
  );
};

export default ExtensionServices;
