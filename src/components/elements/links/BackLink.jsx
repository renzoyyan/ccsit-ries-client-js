import React from "react";
import Link from "next/link";
import { classNames } from "@/utils/utils";

const BackLink = ({ href, className = "" }) => {
  return (
    <Link href={href}>
      <a className={classNames("px-12 py-3 btn-primary", className)}>Back</a>
    </Link>
  );
};

export default BackLink;
