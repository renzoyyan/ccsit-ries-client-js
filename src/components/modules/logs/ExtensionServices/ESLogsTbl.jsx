import * as Table from "@/components/elements/table";

const ESLogsTbl = ({ children }) => {
  return (
    <Table.Container className="mt-4">
      <Table.Head>
        <Table.Row>
          <Table.Header className="tbl-header" title="Log Title" />
          <Table.Header className="tbl-header" title="Date Completion" />
          <Table.Header className="tbl-header-sr-only">
            <span className="sr-only">Edit</span>
          </Table.Header>
        </Table.Row>
      </Table.Head>
      <Table.Body>{children}</Table.Body>
    </Table.Container>
  );
};

export default ESLogsTbl;
