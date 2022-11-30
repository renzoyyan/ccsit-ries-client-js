import React from "react";
import * as Table from "@/components/elements/table";
import useRoles from "@/hooks/useRoles";
import StatusCard, { TStatusCardProps } from "@/components/elements/StatusCard";
import { formattedDate } from "@/utils/utils";
import _ from "lodash-es";

const ResearchInnovationContent = ({
  _id,
  flag,
  research_title,
  proponents,
  research_agenda,
  status,
  created_at,
}) => {
  const { isAdmin, isPersonnel, isProponent } = useRoles();

  let navLinkContent;

  if (isProponent) {
    navLinkContent = (
      <Table.Link
        title={research_title}
        href={`/proponent/research-innovation/${_id}`}
      />
    );
  }

  if (isPersonnel) {
    navLinkContent = (
      <Table.Link
        title={research_title}
        href={`/personnel/research-innovation/${_id}`}
      />
    );
  }

  if (isAdmin) {
    navLinkContent = (
      <Table.Link
        title={research_title}
        href={`/admin/research-innovation/${_id}`}
      />
    );
  }

  return (
    <Table.Row variant={"striped"}>
      <td className="tbl-data sm:pl-6">{flag}</td>
      <td className="tbl-data">{research_title}</td>
      <td className="tbl-data">
        <ul>
          {proponents.map((value, idx) => {
            const name = `${value.first_name} ${value.last_name}`;

            return <li key={value._id}>{name}</li>;
          })}
        </ul>
      </td>
      <td className="tbl-data">{research_agenda}</td>
      <td className="tbl-data">{formattedDate(created_at)}</td>
      <td className="tbl-data">
        <StatusCard status={status} withLabel={false} />
      </td>
      <td className="relative py-4 pl-3 pr-4 text-sm font-medium text-right whitespace-nowrap sm:pr-6">
        {navLinkContent}
      </td>
    </Table.Row>
  );
};

export default ResearchInnovationContent;