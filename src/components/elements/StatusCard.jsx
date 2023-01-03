import { classNames } from "@/utils/utils";
import React from "react";

const statusTypes = {
  pending: { statusClass: "bg-orange-100 text-orange-800" },
  proposal: { statusClass: "bg-amber-100 text-amber-800" },
  ongoing: { statusClass: "bg-sky-100 text-sky-800" },
  completed: { statusClass: "bg-green-100 text-green-800" },
};

const statusColor = (status) => {
  return statusTypes[status]?.statusClass;
};

const StatusCard = ({ status, withLabel = false }) => {
  return (
    <div className="flex items-center gap-x-3">
      {withLabel && <p className="text-sm font-medium text-gray-500">Status</p>}
      <div
        className={classNames(
          "px-3 py-1 text-xs  font-medium rounded-lg inline-block capitalize",
          statusColor(status)
        )}
      >
        {status}
      </div>
    </div>
  );
};

export default StatusCard;
