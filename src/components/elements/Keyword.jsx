import { PlusIcon } from "@heroicons/react/24/solid";
import React from "react";

const Keyword = ({ keyword = "", handleDelete = () => {} }) => {
  return (
    <div className="bg-gray-300 text-com2 inline-flex items-center gap-x-2.5 px-2 py-1 rounded-md whitespace-nowrap">
      <span className="text-sm">{keyword}</span>
      <span onClick={() => handleDelete()}>
        <PlusIcon className="w-5 h-5 rotate-45 cursor-pointer text-com2" />
      </span>
    </div>
  );
};

export default Keyword;
