import { classNames } from "@/utils/utils";
import React from "react";

const statusTypes = {
  pending: { class: "bg-orange-200" },
  proposal: { class: "bg-amber-200" },
  ongoing: { class: "bg-sky-200" },
  completed: { class: "bg-green-200" },
};

const statusColor = (status) => {
  const lowerCaseStatus = status?.toLowerCase();

  return statusTypes[lowerCaseStatus]?.class;
};

const Legend = ({ className, title = "" }) => {
  return (
    <div className="flex items-center text-xs gap-x-2 ">
      <div
        className={classNames(
          className,
          "w-4 h-4 rounded-md flex-shrink-0",
          statusColor(title)
        )}
      />
      <p>{title}</p>
    </div>
  );
};

export default Legend;
