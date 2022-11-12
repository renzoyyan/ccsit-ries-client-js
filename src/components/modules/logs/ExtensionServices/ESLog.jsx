import * as Table from "@/components/elements/table";

const ESLog = ({ log_title, date_completion }) => {
  return (
    <Table.Row variant="striped">
      <td className="tbl-data">{log_title}</td>
      <td className="tbl-data">{date_completion}</td>
      <td className="pr-4 font-medium text-right cursor-pointer tbl-data text-bc-primary hover:underline">
        Edit <span className="sr-only">{log_title}</span>
      </td>
    </Table.Row>
  );
};

export default ESLog;
