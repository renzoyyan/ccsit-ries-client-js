import React from "react";
import { Listbox } from "../../forms";
import Heading from "@/components/elements/Heading";

const PublicationStatus = ({ disabled, onChange }) => {
  return (
    <div className="flex items-center gap-x-4">
      <Heading
        as="h4"
        title="Publication Status"
        className="text-sm font-medium text-gray-600"
      />
      <Listbox
        options={[
          { value: true, label: "Yes" },
          { value: false, label: "No" },
        ]}
        name="publication_status"
        withCustomOnChange
        handleChange={onChange}
        disabled={disabled}
      />
    </div>
  );
};

export default PublicationStatus;
