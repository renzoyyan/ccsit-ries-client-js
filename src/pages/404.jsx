import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[80vh] space-y-3">
      <p className="font-bold tracking-widest text-primary text-9xl">404</p>
      <p className="text-sm text-gray-400">
        The page you are looking for is not available
      </p>
      <Link href="/">
        <a className="flex items-center font-bold text-secondary group">
          <span className="group-hover:underline"> Go back</span>
          <ArrowRightIcon className="flex-shrink-0 w-5 h-5 ml-3 group-hover:underline" />
        </a>
      </Link>
    </div>
  );
};

export default NotFoundPage;
