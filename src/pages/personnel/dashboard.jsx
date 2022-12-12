import { CalendarIcon, PlusIcon } from "@heroicons/react/24/outline";
import dynamic from "next/dynamic";
import React, { useState } from "react";

import SectionHeader from "@/components/elements/SectionHeader";
import UserLayout from "@/components/layouts/users/UserLayout";
import Heading from "@/components/elements/Heading";

import { getAuthSession } from "@/utils/auth";
import { Roles } from "@/utils/utils";
import BarChart from "@/components/modules/charts/BarChart";

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
  const [value, onChange] = useState(new Date());

  return (
    <UserLayout>
      <SectionHeader title="Dashboard" className="mt-16 mb-10" />
      <div className="flex items-center gap-x-2">
        <p className="font-medium text-gray-600">Filter by year</p>
        <DatePicker
          onChange={onChange}
          value={value}
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

      <div className="grid grid-cols-4 gap-6 mt-10">
        <div class="bg-gradient-to-r from-[#007FC6] to-[#053e85] p-6 rounded-md shadow-md">
          <h4 className="mb-4 text-xl font-semibold text-white lg:text-3xl">
            10
          </h4>

          <p className="text-sm font-medium text-white">
            Total Research & Innovation Projects
          </p>

          <div className="grid grid-cols-2">
            {/* <ChartBarIcon className="w-8 h-8 text-white" /> */}
          </div>
        </div>

        <div class="bg-gradient-to-r from-[#053e85] to-blue-500 p-6 rounded-md shadow-md">
          <h4 className="mb-4 text-xl font-semibold text-white lg:text-3xl">
            10
          </h4>

          <p className="text-sm font-medium text-white">
            Total Extension Services Projects
          </p>

          <div className="grid grid-cols-2">
            {/* <ChartBarIcon className="w-8 h-8 text-white" /> */}
          </div>
        </div>
      </div>

      <div className="mt-10 space-y-6">
        <div className="bg-white rounded-md shadow-md">
          <Heading
            as="h2"
            title="Research and Innovation Summary"
            className="pt-8 pl-8 font-medium text-gray-800"
          />
          <div className="w-full xl:max-w-5xl h-[418px]">
            <BarChart data={barData} />
          </div>
        </div>

        <div className="bg-white rounded-md shadow-md">
          <Heading
            as="h2"
            title="Extension Services Summary"
            className="pt-8 pl-8 font-medium text-gray-800"
          />
          <div className="w-full xl:max-w-5xl h-[418px]">
            <BarChart data={barData} />
          </div>
        </div>
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
