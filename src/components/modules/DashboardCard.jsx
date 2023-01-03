import { classNames } from "@/utils/utils";
import { ChartBarIcon } from "@heroicons/react/24/outline";
import { DocumentChartBarIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import React from "react";

const DashboardCard = ({
  className = "",
  title = "",
  value = 0,
  Icon,
  iconDivColor,
  href = "#",
}) => {
  return (
    <div className="flex flex-col justify-between bg-white rounded-md shadow-md">
      <div className={classNames("p-6", className)}>
        <div className="flex flex-wrap">
          <div className="flex-1 space-y-1">
            <p className="text-xs font-bold text-gray-400 uppercase">{title}</p>
            <h4 className="text-2xl font-semibold lg:text-3xl">{value}</h4>
          </div>

          <div className="flex-initial w-auto pl-4">
            <div
              className={classNames(
                "inline-flex items-center justify-center w-12 h-12 rounded-full shadow-lg",
                iconDivColor ? iconDivColor : " bg-bc-primary"
              )}
            >
              <Icon className="flex-shrink-0 w-5 h-5 text-white" />
            </div>
          </div>
        </div>
      </div>

      <Link href={href}>
        <a className="block py-3 text-xs font-medium text-center bg-gray-100 hover:bg-gray-200">
          More info
        </a>
      </Link>
    </div>
  );
};

export default DashboardCard;
