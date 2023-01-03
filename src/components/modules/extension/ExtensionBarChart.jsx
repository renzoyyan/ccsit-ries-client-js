import BarChart from "../charts/BarChart";
import Legend from "../Legend";
import Heading from "@/components/elements/Heading";
import useAnalytics from "@/hooks/useAnalytics";
import { labels } from "@/utils/utils";
import moment from "moment";

const ExtensionBarChart = ({ period }) => {
  const { getExtensionAnalytics } = useAnalytics(period);

  const periodLabel = ["January to June", "July to December"];

  const extensionBarChart = {
    labels,
    datasets: [
      {
        label: "Number of Extension Services Projects",
        data: [
          getExtensionAnalytics("pending"),
          getExtensionAnalytics("proposal"),
          getExtensionAnalytics("ongoing"),
          getExtensionAnalytics("completed"),
        ],
        backgroundColor: ["#fed7aa", "#fde68a", "#bae6fd", "#bbf7d0"],
        borderColor: ["#f97316", "#f59e0b", "#0ea5e9", "#22c55e"],
        borderRadius: 5,
        borderWidth: 2,
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
        text: `${periodLabel[period]} Period`,
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
    <div className="w-full p-8 space-y-10 bg-white rounded-md shadow-md xl:w-1/2">
      <Heading
        as="h2"
        title="Extension Services Projects"
        className="font-medium text-gray-800"
      />

      <div className="w-full h-[418px]">
        <BarChart data={extensionBarChart} customOptions={options} />
      </div>
    </div>
  );
};

export default ExtensionBarChart;
