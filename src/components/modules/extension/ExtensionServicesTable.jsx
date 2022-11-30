import React from "react";
import * as Table from "@/components/elements/table";

const ExtensionServicesTable = ({ children }) => {
  return (
    <Table.Container>
      <Table.Head>
        <Table.Row>
          <Table.Header
            className="pr-10 2xl:w-1/6 tbl-header sm:pl-6"
            title="Extension Type"
          />
          <Table.Header className="pr-32 tbl-header" title="Extension Title" />
          <Table.Header className="tbl-header" title="Proponent(s)" />
          <Table.Header
            className="pr-20 xl:w-[250px] tbl-header"
            title="Extension Service Agenda"
          />
          <Table.Header className="pr-10 tbl-header" title="Date Created" />
          <Table.Header className="pr-10 tbl-header" title="Status" />

          <Table.Header className="tbl-header-sr-only">
            <span className="sr-only">View</span>
          </Table.Header>
        </Table.Row>
      </Table.Head>
      <Table.Body>{children}</Table.Body>
    </Table.Container>
  );
};

export default ExtensionServicesTable;
