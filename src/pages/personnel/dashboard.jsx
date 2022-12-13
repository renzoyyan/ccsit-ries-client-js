import { CalendarIcon, PlusIcon } from "@heroicons/react/24/outline";
import dynamic from "next/dynamic";
import React, { useState } from "react";

import SectionHeader from "@/components/elements/SectionHeader";
import UserLayout from "@/components/layouts/users/UserLayout";

import { getAuthSession } from "@/utils/auth";
import { Roles } from "@/utils/utils";

import ResearchBarChart from "@/components/modules/research/ResearchBarChart";
import ExtensionBarChart from "@/components/modules/extension/ExtensionBarChart";
import useAnalytics from "@/hooks/useAnalytics";
import DashboardCard from "@/components/modules/DashboardCard";

const DatePicker = dynamic(
  () => import("react-date-picker/dist/entry.nostyle"),
  {
    ssr: false,
  }
);

export const barData = [
  {
    month: "January",
    pending: 4,
    proposal: 2,
    ongoing: 1,
    completed: 2,
  },
  {
    month: "February",
    pending: 1,
    proposal: 1,
    ongoing: 1,
    completed: 1,
  },
  {
    month: "March",
    pending: 2,
    proposal: 3,
    ongoing: 1,
    completed: 1,
  },
  {
    month: "April",
    pending: 1,
    proposal: 2,
    ongoing: 3,
    completed: 2,
  },
  {
    month: "May",
    pending: 2,
    proposal: 1,
    ongoing: 0,
    completed: 0,
  },
  {
    month: "June",
    pending: 1,
    proposal: 2,
    ongoing: 0,
    completed: 1,
  },
  {
    month: "July",
    pending: 0,
    proposal: 1,
    ongoing: 1,
    completed: 1,
  },
  {
    month: "August",
    pending: 0,
    proposal: 1,
    ongoing: 2,
    completed: 3,
  },
  {
    month: "Sept",
    pending: 2,
    proposal: 0,
    ongoing: 1,
    completed: 0,
  },
  {
    month: "October",
    pending: 3,
    proposal: 1,
    ongoing: 0,
    completed: 0,
  },
  {
    month: "November",
    pending: 1,
    proposal: 3,
    ongoing: 2,
    completed: 4,
  },
  {
    month: "December",
    pending: 1,
    proposal: 2,
    ongoing: 3,
    completed: 4,
  },
];

const Dashboard = () => {
  const [date, setDate] = useState(new Date());

  const { totalResearch, totalExtension } = useAnalytics(date);

  return (
    <UserLayout>
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
    </UserLayout>
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

  if (session && role !== Roles.PERSONNEL) {
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
