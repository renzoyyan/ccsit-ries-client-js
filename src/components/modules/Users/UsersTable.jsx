import React from "react";
import * as Table from "@/components/elements/table";
import { usersData } from "@/utils/utils";
import UsersContent from "./UsersContent";

const UsersTable = ({ children }) => {
  return (
    <Table.Container>
      <Table.Head>
        <tr>
          <Table.Header
            className="pr-48 tbl-header sm:pl-6 sm:pr-3"
            title="Name"
          />
          <Table.Header className="pr-32 tbl-header sm:pr-3" title="Username" />
          <Table.Header className="pr-32 tbl-header sm:pr-3" title="Role" />

          <Table.Header className="sr-only tbl-header sm:pr-3" title="Edit" />

          {/* <Table.Header className="tbl-header-sr-only">
            <span className="sr-only">View</span>
          </Table.Header> */}
        </tr>
      </Table.Head>
      <Table.Body>{children}</Table.Body>
    </Table.Container>
  );
};

export default UsersTable;
