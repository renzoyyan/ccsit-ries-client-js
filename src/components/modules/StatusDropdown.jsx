import * as Form from "@/components/forms";
import Heading from "@/components/elements/Heading";
import { filterStatusOptions } from "@/utils/utils";

const StatusDropdown = () => {
  return (
    <Form.Group className="flex items-center gap-x-4 !space-y-0">
      <Heading
        as="h3"
        title="Status"
        className="text-sm font-medium text-gray-500"
      />
      <Form.Listbox options={filterStatusOptions} name="status" />
    </Form.Group>
  );
};

export default StatusDropdown;
