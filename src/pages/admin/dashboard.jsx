import AdminLayout from "@/components/layouts/admin/AdminLayout";

import { getAuthSession } from "@/utils/auth";
import { filterByPeriod, formattedDate, Roles } from "@/utils/utils";
import { useState } from "react";

import SectionHeader from "@/components/elements/SectionHeader";
import {
  ChartBarIcon,
  ChartPieIcon,
  UsersIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";

import DashboardCard from "@/components/modules/DashboardCard";

import useAnalytics from "@/hooks/useAnalytics";
import ResearchBarChart from "@/components/modules/research/ResearchBarChart";
import ExtensionBarChart from "@/components/modules/extension/ExtensionBarChart";
import { FormProvider, useForm } from "react-hook-form";
import { Listbox } from "@/components/forms";
import dynamic from "next/dynamic";
import moment from "moment";

const Datepicker = dynamic(() => import("@/components/forms/Datepicker"), {
  ssr: false,
});

const defaultValues = {
  period: 0,
  year: moment().format(),
};

const Dashboard = () => {
  const methods = useForm({ defaultValues });
  const [watchPeriod, year] = methods.watch(["period", "year"]);

  const params = {
    period: watchPeriod,
    year: formattedDate(year, "yyyy") || null,
  };

  const { totalResearch, totalExtension, totalUsers, verifiedUsers } =
    useAnalytics(params);

  return (
    <AdminLayout>
      <SectionHeader title="Dashboard" className="mt-16 mb-10" />

      <div className="grid gap-6 mt-10 md:grid-cols-2 xl:grid-cols-4">
        <DashboardCard
          title="Research & Innovation"
          value={totalResearch}
          Icon={ChartBarIcon}
          iconDivColor="bg-red-500"
          href="/admin/research-innovation"
        />
        <DashboardCard
          title="Extension Services"
          value={totalExtension}
          Icon={ChartPieIcon}
          iconDivColor="bg-amber-500"
          href="/admin/extension-services"
        />
        <DashboardCard
          className="from-sky-500 via-indigo-500 to-purple-500"
          title="Registered Users"
          value={totalUsers}
          Icon={UserGroupIcon}
          iconDivColor="bg-sky-500"
          href="/admin/users"
        />
        <DashboardCard
          className="from-purple-500 via-indigo-500 to-sky-500 "
          title="Verified Users"
          value={verifiedUsers}
          Icon={UsersIcon}
          iconDivColor="bg-green-500"
          href="/admin/users?email_verified=true"
        />
      </div>

      <div className="flex items-center mt-16 gap-x-2">
        <p className="font-medium text-gray-600">Filter by period</p>
        <FormProvider {...methods}>
          <Listbox name="period" options={filterByPeriod} className="!py-3" />
          <Datepicker
            name="year"
            format="yyyy"
            maxDetail="decade"
            showClearIcon={false}
          />
        </FormProvider>
      </div>

      <div className="flex flex-wrap gap-6 mt-10 xl:flex-nowrap">
        <ResearchBarChart period={watchPeriod} year={year} />
        <ExtensionBarChart period={watchPeriod} year={year} />
      </div>
    </AdminLayout>
  );
};

export default Dashboard;

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
