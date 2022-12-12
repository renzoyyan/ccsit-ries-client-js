import { classNames } from "@/utils/utils";
import React from "react";

const DashboardCard = ({ className = "", title = "", value = 0 }) => {
  return (
    <div
      class={classNames("bg-gradient-to-r p-6 rounded-md shadow-md", className)}
    >
      <h4 className="mb-4 text-xl font-semibold text-white lg:text-3xl">
        {value}
      </h4>

      <p className="text-sm font-medium text-white">{title}</p>
    </div>
  );
};

export default DashboardCard;
