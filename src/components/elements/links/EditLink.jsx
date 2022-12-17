import Link from "next/link";
import React from "react";

const EditLink = ({ href }) => {
  return (
    <div>
      <Link href={href}>
        <a className="block px-4 py-4 font-semibold text-center text-gray-500 bg-gray-200 hover:text-gray-700 sm:rounded-b-lg">
          Edit
        </a>
      </Link>
    </div>
  );
};

export default EditLink;
