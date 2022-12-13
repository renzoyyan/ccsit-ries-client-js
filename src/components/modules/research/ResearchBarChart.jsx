import BarChart from "../charts/BarChart";
import Legend from "../Legend";
import Heading from "@/components/elements/Heading";
import useAnalytics from "@/hooks/useAnalytics";
import { labels } from "@/utils/utils";
import moment from "moment";

const ResearchBarChart = ({ date }) => {
  const { getResearchAnalytics } = useAnalytics(date);

  const getYear = moment(date, "YYYY").format("YYYY");

  const researchBarChart = {
    labels,
    datasets: [
      {
        label: "Pending",
        data: [
          getResearchAnalytics("January", "pending"),
          getResearchAnalytics("February", "pending"),
          getResearchAnalytics("March", "pending"),
          getResearchAnalytics("April", "pending"),
          getResearchAnalytics("May", "pending"),
          getResearchAnalytics("June", "pending"),
          getResearchAnalytics("July", "pending"),
          getResearchAnalytics("August", "pending"),
          getResearchAnalytics("September", "pending"),
          getResearchAnalytics("October", "pending"),
          getResearchAnalytics("November", "pending"),
          getResearchAnalytics("December", "pending"),
        ],
        backgroundColor: "#fed7aa",
        borderColor: "#f97316",
        borderRadius: 5,
        borderWidth: 2,
        borderSkipped: false,
        maxBarThickness: 40,
      },
      {
        label: "Proposal",
        data: [
          getResearchAnalytics("January", "proposal"),
          getResearchAnalytics("February", "proposal"),
          getResearchAnalytics("March", "proposal"),
          getResearchAnalytics("April", "proposal"),
          getResearchAnalytics("May", "proposal"),
          getResearchAnalytics("June", "proposal"),
          getResearchAnalytics("July", "proposal"),
          getResearchAnalytics("August", "proposal"),
          getResearchAnalytics("September", "proposal"),
          getResearchAnalytics("October", "proposal"),
          getResearchAnalytics("November", "proposal"),
          getResearchAnalytics("December", "proposal"),
        ],
        backgroundColor: "#fde68a",
        borderColor: "#f59e0b",
        borderRadius: 5,
        borderWidth: 2,
        borderSkipped: false,
        maxBarThickness: 40,
      },
      {
        label: "Ongoing",
        data: [
          getResearchAnalytics("January", "ongoing"),
          getResearchAnalytics("February", "ongoing"),
          getResearchAnalytics("March", "ongoing"),
          getResearchAnalytics("April", "ongoing"),
          getResearchAnalytics("May", "ongoing"),
          getResearchAnalytics("June", "ongoing"),
          getResearchAnalytics("July", "ongoing"),
          getResearchAnalytics("August", "ongoing"),
          getResearchAnalytics("September", "ongoing"),
          getResearchAnalytics("October", "ongoing"),
          getResearchAnalytics("November", "ongoing"),
          getResearchAnalytics("December", "ongoing"),
        ],
        backgroundColor: "#bae6fd",
        borderColor: "#0ea5e9",
        borderRadius: 5,
        borderWidth: 2,
        borderSkipped: false,
        maxBarThickness: 40,
      },
      {
        label: "Completed",
        data: [
          getResearchAnalytics("January", "completed"),
          getResearchAnalytics("February", "completed"),
          getResearchAnalytics("March", "completed"),
          getResearchAnalytics("April", "completed"),
          getResearchAnalytics("May", "completed"),
          getResearchAnalytics("June", "completed"),
          getResearchAnalytics("July", "completed"),
          getResearchAnalytics("August", "completed"),
          getResearchAnalytics("September", "completed"),
          getResearchAnalytics("October", "completed"),
          getResearchAnalytics("November", "completed"),
          getResearchAnalytics("December", "completed"),
        ],
        backgroundColor: "#bbf7d0",
        borderColor: "#22c55e",
        borderRadius: 5,
        borderWidth: 2,
        borderSkipped: false,
        maxBarThickness: 40,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: `Year ${getYear}`,
        font: {
          size: 14,
        },
        position: "bottom",
        padding: {
          top: 20,
        },
      },
    },
  };

  return (
    <div className="p-8 space-y-10 bg-white rounded-md shadow-md">
      <div className="flex flex-wrap items-center justify-between gap-6">
        <Heading
          as="h2"
          title="Research and Innovation Summary"
          className="font-medium text-gray-800"
        />

        <div className="grid grid-cols-4">
          <Legend title="Pending" />
          <Legend title="Proposal" />
          <Legend title="Ongoing" />
          <Legend title="Completed" />
        </div>
      </div>
      <div className="w-full h-[418px]">
        <BarChart data={researchBarChart} customOptions={options} />
      </div>
    </div>
  );
};

export default ResearchBarChart;
