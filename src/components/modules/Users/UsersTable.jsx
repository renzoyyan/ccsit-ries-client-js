import React from "react";
import * as Table from "@/components/elements/table";
import { usersData } from "@/utils/utils";
import UsersContent from "./UsersContent";

const UsersTable = () => {
  return (
    <Table.Container>
      <Table.Head>
        <tr>
          <Table.Header className="tbl-header sm:pl-6" title="Name" />
          <Table.Header className="tbl-header" title="Username" />
          <Table.Header className="tbl-header" title="Role" />

          {/* <Table.Header className="tbl-header-sr-only">
            <span className="sr-only">View</span>
          </Table.Header> */}
        </tr>
      </Table.Head>
      <Table.Body>
        {usersData.map((user, idx) => (
          <UsersContent key={user.id} {...user} />
        ))}
      </Table.Body>
    </Table.Container>
  );
};

export default UsersTable;
