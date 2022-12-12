import AdminLayout from "@/components/layouts/admin/AdminLayout";
import BarChart from "@/components/modules/charts/BarChart";
import { getAuthSession } from "@/utils/auth";
import { Roles } from "@/utils/utils";
import { useState } from "react";
import Heading from "@/components/elements/Heading";
import SectionHeader from "@/components/elements/SectionHeader";
import { CalendarIcon, PlusIcon } from "@heroicons/react/24/solid";
import dynamic from "next/dynamic";
import { barData } from "../personnel/dashboard";
import DashboardCard from "@/components/modules/DashboardCard";

const DatePicker = dynamic(
  () => import("react-date-picker/dist/entry.nostyle"),
  {
    ssr: false,
  }
);

const Dashboard = () => {
  const [value, onChange] = useState(new Date());

  return (
    <AdminLayout>
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
        <DashboardCard
          className="from-[#007FC6] to-[#053e85]"
          title="Total Research & Innovation Projects"
          value={10}
        />
        <DashboardCard
          className="from-[#053e85] to-blue-500"
          title="Total Extension Services Projects"
          value={10}
        />
        <DashboardCard
          className="from-blue-500 to-sky-500"
          title="Registered Users"
          value={10}
        />
        <DashboardCard
          className="from-sky-500 to-[#053e85]"
          title="Verified Users"
          value={10}
        />
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
