import React from "react";
import * as Table from "@/components/elements/table";
import ProponentsContent from "./ProponentsContent";
import { proponentsData } from "@/utils/utils";

const ProponentsTable = () => {
  return (
    <Table.Container>
      <Table.Head>
        <Table.Row>
          <Table.Header className="tbl-header sm:pl-6" title="First name" />
          <Table.Header className="tbl-header" title="First name" />
          <Table.Header className="tbl-header" title="Suffix" />
          <Table.Header className="tbl-header" title="Doctorate Degree" />

          <Table.Header className="tbl-header-sr-only">
            <span className="sr-only">View</span>
          </Table.Header>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {proponentsData.map((proponent, idx) => (
          <ProponentsContent key={proponent.id} {...proponent} />
        ))}
      </Table.Body>
    </Table.Container>
  );
};

export default ProponentsTable;
