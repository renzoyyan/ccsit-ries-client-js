import React from "react";
import Link from "next/link";

const BackLink = ({ href }) => {
  return (
    <Link href={href}>
      <a className="px-12 py-3 btn-primary">Back</a>
    </Link>
  );
};

export default BackLink;
