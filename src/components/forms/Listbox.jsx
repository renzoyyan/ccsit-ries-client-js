import React from "react";
import { Listbox as ListBox } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { classNames } from "@/utils/utils";
import { Fragment, useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import _ from "lodash-es";

const Listbox = ({
  options = [],
  name = "",
  validation,
  disabled = false,
  withCustomOnChange = false,
  handleChange = () => {},
}) => {
  const { control, setValue, watch } = useFormContext();

  const value = watch(name);

  useEffect(() => {
    if (value === undefined) {
      setValue(name, "");
    }
  }, [setValue, name, value]);

  return (
    <Controller
      control={control}
      name={name}
      rules={validation}
      render={({ field }) => (
        <ListBox
          value={field.value}
          onChange={(e) => {
            if (withCustomOnChange) return handleChange(e);
            field.onChange(e);
          }}
          disabled={disabled}
        >
          <div className="relative">
            <ListBox.Button
              className={classNames(
                "relative flex items-center justify-between w-full gap-2 px-4 py-2 text-left bg-white rounded-lg focus:outline-none focus-visible:border-bc-primary focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-bc-primary sm:text-sm ring-1 ring-gray-300",
                disabled ? "cursor-default" : "cursor-pointer"
              )}
            >
              <span
                className={`block pt-px font-medium text-sm  truncate ${
                  disabled ? "text-gray-500" : "text-gray-700"
                }`}
              >
                {_.capitalize(value)}
              </span>
              <span className="flex items-center flex-shrink-0 pointer-events-none ">
                <ChevronDownIcon
                  className={`w-5 h-5 ${
                    disabled ? "text-gray-500" : "text-gray-900"
                  }`}
                  aria-hidden="true"
                />
              </span>
            </ListBox.Button>

            <ListBox.Options
              className={classNames(
                "absolute z-50 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
              )}
            >
              {options?.map((option, idx) => (
                <ListBox.Option
                  key={option.value}
                  value={option.value}
                  as={Fragment}
                >
                  {({ active, selected }) => (
                    <li
                      className={classNames(
                        active && "bg-bc-tertiary text-white",
                        selected && "bg-bc-primary text-white",
                        "relative cursor-default select-none py-2 pl-3 pr-4 flex items-center gap-x-2"
                      )}
                    >
                      <span
                        className={`block whitespace-nowrap ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {option.label}
                      </span>
                    </li>
                  )}
                </ListBox.Option>
              ))}
            </ListBox.Options>
          </div>
        </ListBox>
      )}
    />
  );
};

export default Listbox;
