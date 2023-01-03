import React from "react";
import { Listbox } from "../../forms";
import Heading from "@/components/elements/Heading";
import { statusOptions } from "@/utils/utils";

const StatusListbox = ({ disabled, onChange }) => {
  return (
    <div className="flex items-center gap-x-4">
      <Heading
        as="h4"
        title="Project Status"
        className="text-sm font-medium text-gray-600"
      />
      <Listbox
        options={statusOptions}
        name="status"
        withCustomOnChange
        handleChange={onChange}
        disabled={disabled}
      />
    </div>
  );
};

export default StatusListbox;
