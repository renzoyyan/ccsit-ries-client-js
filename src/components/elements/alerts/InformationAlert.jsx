import { InformationCircleIcon } from "@heroicons/react/24/solid";
import React from "react";

const InformationAlert = ({
  title = "You can only add logs once approved by",
  by = "Research Coordinator",
}) => {
  return (
    <div className="px-4 py-3 mt-4 rounded-md bg-blue-50">
      <div className="flex items-center gap-x-3">
        <div className="flex-shrink-0">
          <InformationCircleIcon
            className="w-5 h-5 text-blue-400"
            aria-hidden="true"
          />
        </div>

        <p className="text-xs font-medium text-blue-700">
          {title} {by ? <span className="font-semibold">{by}</span> : null}.
        </p>
      </div>
    </div>
  );
};

export default InformationAlert;
