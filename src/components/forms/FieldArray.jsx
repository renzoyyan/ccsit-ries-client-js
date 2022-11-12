import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import Button from "../elements/Button";
import { PlusCircleIcon, TrashIcon } from "@heroicons/react/24/outline";
import { ErrorMessage } from "@hookform/error-message";

import * as Form from "@/components/forms";
import { classNames } from "../../utils/utils";
import Heading from "@/components/elements/Heading";

const FieldArray = ({
  name = "",
  label = "",
  validation,
  options = [],
  headingTitle = "",
  type,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  const selectedType = (index) => {
    switch (type) {
      case "text":
        return (
          <>
            <Form.Group className="w-full">
              <Form.Input
                label={label}
                name={`${name}.${index}.name`}
                validation={{
                  required: "This is a required field",
                  minLength: 1,
                }}
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
          </>
        );

      default:
        return (
          <>
            <Form.Select
              label={label}
              name={`${name}.${index}.name`}
              validation={{
                required: "This is a required field",
                minLength: 1,
              }}
              options={options}
              className="w-full"
            />

            <Button
              className="mb-2"
              type="button"
              onClick={() => remove(index)}
            >
              <TrashIcon className="w-6 h-6 text-red-500" />
            </Button>
          </>
        );
    }
  };

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
          onClick={() => append({ name: "" })}
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
            {selectedType(index)}
          </li>
        ))}
      </ul>

      {errors[name] && (
        <div className="error-msg">
          <ErrorMessage errors={errors} name={name} />
        </div>
      )}
    </>
  );
};

export default FieldArray;
