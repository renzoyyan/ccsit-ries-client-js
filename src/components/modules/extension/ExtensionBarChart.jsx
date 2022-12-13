import BarChart from "../charts/BarChart";
import Legend from "../Legend";
import Heading from "@/components/elements/Heading";
import useAnalytics from "@/hooks/useAnalytics";
import { labels } from "@/utils/utils";
import moment from "moment";

const ExtensionBarChart = ({ date }) => {
  const { getExtensionAnalytics } = useAnalytics(date);

  const getYear = moment(date, "YYYY").format("YYYY");

  const extensionBarChart = {
    labels,
    datasets: [
      {
        label: "Pending",
        data: [
          getExtensionAnalytics("January", "pending"),
          getExtensionAnalytics("February", "pending"),
          getExtensionAnalytics("March", "pending"),
          getExtensionAnalytics("April", "pending"),
          getExtensionAnalytics("May", "pending"),
          getExtensionAnalytics("June", "pending"),
          getExtensionAnalytics("July", "pending"),
          getExtensionAnalytics("August", "pending"),
          getExtensionAnalytics("September", "pending"),
          getExtensionAnalytics("October", "pending"),
          getExtensionAnalytics("November", "pending"),
          getExtensionAnalytics("December", "pending"),
        ],
        backgroundColor: "#ffedd5",
        borderRadius: 5,
        maxBarThickness: 40,
      },
      {
        label: "Proposal",
        data: [
          getExtensionAnalytics("January", "proposal"),
          getExtensionAnalytics("February", "proposal"),
          getExtensionAnalytics("March", "proposal"),
          getExtensionAnalytics("April", "proposal"),
          getExtensionAnalytics("May", "proposal"),
          getExtensionAnalytics("June", "proposal"),
          getExtensionAnalytics("July", "proposal"),
          getExtensionAnalytics("August", "proposal"),
          getExtensionAnalytics("September", "proposal"),
          getExtensionAnalytics("October", "proposal"),
          getExtensionAnalytics("November", "proposal"),
          getExtensionAnalytics("December", "proposal"),
        ],
        backgroundColor: "#1077d5",
        borderRadius: 5,
        maxBarThickness: 40,
      },
      {
        label: "Ongoing",
        data: [
          getExtensionAnalytics("January", "ongoing"),
          getExtensionAnalytics("February", "ongoing"),
          getExtensionAnalytics("March", "ongoing"),
          getExtensionAnalytics("April", "ongoing"),
          getExtensionAnalytics("May", "ongoing"),
          getExtensionAnalytics("June", "ongoing"),
          getExtensionAnalytics("July", "ongoing"),
          getExtensionAnalytics("August", "ongoing"),
          getExtensionAnalytics("September", "ongoing"),
          getExtensionAnalytics("October", "ongoing"),
          getExtensionAnalytics("November", "ongoing"),
          getExtensionAnalytics("December", "ongoing"),
        ],
        backgroundColor: "#0f5aac",
        borderRadius: 5,
        maxBarThickness: 40,
      },
      {
        label: "Completed",
        data: [
          getExtensionAnalytics("January", "completed"),
          getExtensionAnalytics("February", "completed"),
          getExtensionAnalytics("March", "completed"),
          getExtensionAnalytics("April", "completed"),
          getExtensionAnalytics("May", "completed"),
          getExtensionAnalytics("June", "completed"),
          getExtensionAnalytics("July", "completed"),
          getExtensionAnalytics("August", "completed"),
          getExtensionAnalytics("September", "completed"),
          getExtensionAnalytics("October", "completed"),
          getExtensionAnalytics("November", "completed"),
          getExtensionAnalytics("December", "completed"),
        ],
        backgroundColor: "#053e85",
        borderRadius: 5,
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
          title="Extension Services Summary"
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
        <BarChart data={extensionBarChart} customOptions={options} />
      </div>
    </div>
  );
};

export default ExtensionBarChart;
