import AdminLayout from "@/components/layouts/admin/AdminLayout";

import { getAuthSession } from "@/utils/auth";
import { Roles } from "@/utils/utils";
import { useState } from "react";

import SectionHeader from "@/components/elements/SectionHeader";
import { CalendarIcon, PlusIcon } from "@heroicons/react/24/solid";
import dynamic from "next/dynamic";

import DashboardCard from "@/components/modules/DashboardCard";

import useAnalytics from "@/hooks/useAnalytics";
import ResearchBarChart from "@/components/modules/research/ResearchBarChart";
import ExtensionBarChart from "@/components/modules/extension/ExtensionBarChart";

const DatePicker = dynamic(
  () => import("react-date-picker/dist/entry.nostyle"),
  {
    ssr: false,
  }
);

const Dashboard = () => {
  const [date, setDate] = useState(new Date());

  const { totalResearch, totalExtension, totalUsers, verifiedUsers } =
    useAnalytics(date);

  return (
    <AdminLayout>
      <SectionHeader title="Dashboard" className="mt-16 mb-10" />

      <div className="grid gap-6 mt-10 md:grid-cols-2 xl:grid-cols-4">
        <DashboardCard
          className="from-sky-500 to-[#053e85]"
          title="Total Research & Innovation Projects"
          value={totalResearch}
        />
        <DashboardCard
          className="from-[#053e85] to-sky-500"
          title="Total Extension Services Projects"
          value={totalExtension}
        />
        <DashboardCard
          className="from-sky-500 via-indigo-500 to-purple-500"
          title="Registered Users"
          value={totalUsers}
        />
        <DashboardCard
          className="from-purple-500 via-indigo-500 to-sky-500 "
          title="Verified Users"
          value={verifiedUsers}
        />
      </div>

      <div className="flex items-center mt-10 gap-x-2">
        <p className="font-medium text-gray-600">Filter by year</p>
        <DatePicker
          onChange={setDate}
          value={date}
          format="y"
          maxDetail="decade"
          calendarClassName="border-none mt-2"
          calendarIcon={
            <CalendarIcon className="w-5 h-5 text-gray-500 hover:text-bc-primary" />
          }
          clearIcon={
            <PlusIcon className="w-6 h-6 text-gray-500 rotate-45 hover:text-bc-primary" />
          }
        />
      </div>

      <div className="mt-10 space-y-6">
        <ResearchBarChart date={date} />
        <ExtensionBarChart date={date} />
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
