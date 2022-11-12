import * as Table from "@/components/elements/table";
import { timeline } from "../ActivityLogs";
import ResearchInnovationLog from "./ResearchInnovationLog";

const ResearchInnovationLogTbl = () => {
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
      <Table.Body>
        {timeline.map((item) => (
          <ResearchInnovationLog
            key={item.id}
            log_title={item.content}
            date_completion={item.datetime}
          />
        ))}
      </Table.Body>
    </Table.Container>
  );
};

export default ResearchInnovationLogTbl;
