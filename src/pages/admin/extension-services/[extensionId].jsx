import React from "react";
import Link from "next/link";
import { NextPage } from "next";
import AdminLayout from "@/components/layouts/admin/AdminLayout";
import SectionHeader from "@/components/elements/SectionHeader";
import Heading from "@/components/elements/Heading";
import ExtensionServicesDetails from "@/components/modules/ExtensionServices/ExtensionServicesDetails";
import Comments from "@/components/modules/Comments";
import ActivityLogs from "@/components/modules/logs/ActivityLogs";
import BackLink from "@/components/elements/links/BackLink";

const SingleExtensionServices = () => {
  return (
    <AdminLayout>
      <SectionHeader className="items-center justify-between mt-16 mb-8 sm:flex sm:mb-20">
        <Heading
          as="h3"
          className="text-2xl font-bold text-bc-primary"
          title="Lorem ipsum lorem lorem lorem"
        />
        <BackLink href="/admin/extension-services" />
      </SectionHeader>

      <div className="grid grid-cols-1 gap-6 mx-auto mt-8 2xl:grid-flow-col-dense 2xl:grid-cols-3">
        <div className="space-y-6 2xl:col-span-2 2xl:col-start-1">
          <ExtensionServicesDetails />
          <Comments isView={false} />
        </div>

        <ActivityLogs title="Extension Project Logs" />
      </div>
    </AdminLayout>
  );
};

export default SingleExtensionServices;
