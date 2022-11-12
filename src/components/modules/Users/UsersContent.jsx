import React from "react";
import * as Table from "@/components/elements/table";

const UsersContent = ({ first_name, last_name, username, role }) => {
  const userName = `${first_name} ${last_name}`;
  return (
    <Table.Row variant={"striped"}>
      <td className="tbl-data sm:pl-6">{userName}</td>
      <td className="tbl-data">{username}</td>
      <td className="tbl-data">{role}</td>
      {/* <td className="relative py-4 pl-3 pr-4 text-sm font-medium text-right whitespace-nowrap sm:pr-6">
        <Table.Link href="/proponents/1" title={userName} />
      </td> */}
    </Table.Row>
  );
};

export default UsersContent;
