import React from "react";
import { TFieldArrayProps } from "../FieldArray";
import { useFormContext, useFieldArray } from "react-hook-form";
import Heading from "@/components/elements/Heading";
import Button from "@/components/elements/Button";
import { PlusCircleIcon, TrashIcon } from "@heroicons/react/24/outline";
import { classNames, dummy_proponents } from "@/utils/utils";
import { ErrorMessage } from "@hookform/error-message";
import * as Form from "@/components/forms";

const AgencyFieldArray = ({ name, label, validation, headingTitle }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const { fields, prepend, remove } = useFieldArray({
    control,
    name,
    rules: validation,
  });

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <Heading
          as="h3"
          className="font-semibold text-gray-800"
          title={headingTitle}
        />

        <Button
          className="px-3 btn-primary xs:px-4"
          onClick={() => prepend({ agency_name: "" })}
        >
          <span>
            <PlusCircleIcon className="w-6 h-6 text-white" />
          </span>
          <span>Add</span>
        </Button>
      </div>
      <ul className="space-y-6">
        {fields.map((item, index) => (
          <li key={item.id} className={classNames("items-end gap-x-6 flex")}>
            <Form.Group className="w-full">
              <Form.Input
                label={label}
                name={`${name}.${index}.agency_name`}
                className="w-full"
              />
            </Form.Group>

            <Button
              className="mb-2"
              type="button"
              onClick={() => remove(index)}
            >
              <TrashIcon className="w-6 h-6 text-red-500" />
            </Button>
          </li>
        ))}
      </ul>

      {/* <span className="">{errors[name]?.root?.message}</span> */}

      {errors[name]?.root && (
        <div className="error-msg">{errors[name]?.root?.message}</div>
      )}
    </>
  );
};

export default AgencyFieldArray;
