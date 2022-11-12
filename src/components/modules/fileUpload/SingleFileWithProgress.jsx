import { DocumentIcon } from "@heroicons/react/24/outline";
import React from "react";
import { partial } from "filesize";

const size = partial({ base: 2, standard: "jedec" });

const SingleFileWithProgress = ({ file }) => {
  const file_name = file?.location?.split("/")[1];

  return (
    <div className="flex items-center mt-5 sm:mt-0">
      <span>
        <DocumentIcon className="text-gray-600 w-14 h-14" />
      </span>
      <div className="flex flex-col">
        <span>{file.name || file_name}</span>
        {/* <span className="text-xs text-gray-500">{size(file?.size)}</span> */}
      </div>
    </div>
  );
};

export default SingleFileWithProgress;
