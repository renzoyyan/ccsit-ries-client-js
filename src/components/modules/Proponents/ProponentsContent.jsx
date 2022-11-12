import React from "react";
import * as Table from "@/components/elements/table";
import Link from "next/link";

const ProponentsContent = ({
  first_name,
  last_name,
  suffix,
  doctorate_degree,
  position,
}) => {
  const proponentName = `${first_name} ${last_name}, ${doctorate_degree}`;

  return (
    <Table.Row variant={"striped"}>
      <td className="tbl-data sm:pl-6">{first_name}</td>
      <td className="tbl-data sm:pl-6">{last_name}</td>
      <td className="tbl-data sm:pl-6">{suffix}</td>
      <td className="tbl-data sm:pl-6">{doctorate_degree}</td>
      {/* <td className="tbl-data">{position}</td> */}
      <td className="relative py-4 pl-3 pr-4 text-sm font-medium text-right whitespace-nowrap sm:pr-6">
        <Link href="#">
          <a className="text-bc-primary hover:text-bc-tertiary">
            Edit<span className="sr-only">, {proponentName}</span>
          </a>
        </Link>
      </td>
    </Table.Row>
  );
};

export default ProponentsContent;
