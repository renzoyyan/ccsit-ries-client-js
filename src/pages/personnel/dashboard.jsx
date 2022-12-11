import SectionHeader from "@/components/elements/SectionHeader";
import UserLayout from "@/components/layouts/users/UserLayout";
import React from "react";
import { Doughnut } from "react-chartjs-2";
import Heading from "@/components/elements/Heading";
import {
  DocumentDuplicateIcon,
  RectangleStackIcon,
} from "@heroicons/react/24/outline";
import { getAuthSession } from "@/utils/auth";
import { Roles } from "@/utils/utils";
import BarChart from "@/components/modules/charts/BarChart";
import useResearch from "@/hooks/useResearch";
import { useQuery } from "@tanstack/react-query";

let labels = ["Pending", "Proposal", "On Going", "Completed"];
const values = [1, 3, 0, 1];
const customLabels = labels.map((label, index) => `${label}: ${values[index]}`);

const data = {
  labels: customLabels,
  datasets: [
    {
      label: "# of Research Project",
      data: values,
      backgroundColor: ["#ea580c", "#FFBB28", "#0088FE", "#00C49F"],
      borderWidth: 0,
    },
  ],
};

export const options = {
  plugins: {
    legend: {
      position: "right",
      labels: {
        usePointStyle: true,
        pointStyle: "circle",
        padding: 20,
      },
    },
  },
  datalabels: {
    display: true,
    color: "white",
  },

  spacing: 2,
  responsive: true,
  maintainAspectRatio: false,
  cutout: 30,
};

const RecentProject = () => {
  return (
    <div className="flex justify-between p-4 text-sm rounded-md bg-gray-50">
      <div className="flex flex-col">
        <p className="font-medium text-gray-700">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
        <p className="text-xs text-gray-400">
          Transformative Learning | Research Innovation
        </p>
      </div>
      <div className="flex flex-col items-end text-xs">
        <p className="text-gray-500">09-18-2022</p>
        <p className="text-gray-400 t">
          Created by: <span>John Doe</span>
        </p>
      </div>
    </div>
  );
};

const Dashboard = () => {
  return (
    <UserLayout>
      <SectionHeader title="Dashboard" className="mt-16" />
      <div className="grid grid-cols-1 mt-10 lg:grid-cols-2 gap-x-6">
        <div className="px-6 pt-4 pb-6 bg-white rounded-md">
          <header>
            <Heading
              as="h2"
              title="Project Summary"
              className="text-lg font-medium"
            />
            <p className="text-sm text-gray-400">
              Here&apos;s your recent progress of different projects. &apos;
            </p>
          </header>

          <div className="mt-6 space-y-6">
            <div className="flex flex-wrap gap-4 sm:flex-nowrap">
              <div className="w-full p-4 rounded-md shadow-sm sm:w-2/5 bg-gray-50">
                <div className="space-y-2">
                  <DocumentDuplicateIcon className="w-6 h-6 text-gray-500" />
                  <p className="text-sm text-gray-500">
                    Total research & innovation projects
                  </p>
                </div>

                <h3 className="mt-6 text-2xl font-bold">
                  {/* {researchData?.length ?? ""} */}5
                </h3>
              </div>
              <div className="w-full sm:w-3/5 bg-gray-50">
                <div className="h-[150px] my-4 mr-10">
                  <BarChart data={data} options={options} />
                  pie chart here
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 sm:flex-nowrap">
              <div className="w-full p-4 rounded-md shadow-sm sm:w-2/5 bg-gray-50">
                <div className="space-y-2">
                  <RectangleStackIcon className="w-6 h-6 text-gray-500" />
                  <p className="pr-4 text-sm text-gray-500">
                    Total extension services projects
                  </p>
                </div>

                <h3 className="mt-4 text-2xl font-bold">18</h3>
              </div>
              <div className="w-full sm:w-3/5 bg-gray-50">
                <div className="h-[150px] my-4 mr-10">pie chart here</div>
              </div>
            </div>
          </div>
        </div>
        <div className="px-6 pt-4 pb-6 bg-white rounded-md">
          <Heading
            as="h2"
            title="Recent Projects"
            className="text-lg font-medium"
          />

          <div className="mt-8 space-y-5">
            <RecentProject />
            <RecentProject />
            <RecentProject />
            <RecentProject />
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
