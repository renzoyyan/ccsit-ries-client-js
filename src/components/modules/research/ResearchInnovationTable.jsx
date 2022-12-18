import * as Table from "@/components/elements/table";

const ResearchInnovationTable = ({ children }) => {
  return (
    <Table.Container>
      <Table.Head>
        <Table.Row>
          {/* <Table.Header className="tbl-header sm:pl-6" title="Flag" /> */}
          <Table.Header
            className="pr-48 sm:pl-6 tbl-header"
            title="Research Title"
          />
          <Table.Header className="tbl-header" title="Proponent(s)" />
          <Table.Header className="w-60 tbl-header" title="Research Agenda" />
          <Table.Header className="w-60 tbl-header" title="Duration" />
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

export default ResearchInnovationTable;
