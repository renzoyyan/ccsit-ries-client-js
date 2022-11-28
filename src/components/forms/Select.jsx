import { Fragment, useState, useCallback, useEffect } from "react";
import { Combobox, Transition } from "@headlessui/react";
import {
  CheckIcon,
  ChevronDownIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";
import { classNames } from "@/utils/utils";
import { useFormContext, Controller, RegisterOptions } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import _ from "lodash-es";
import { useAuth } from "@/context/AuthContext";

const Select = ({
  options = [],
  name = "",
  label = "",
  placeholder = "",
  className,
  disabled = false,
  validation,
  multiple = false,
  positionValue = "inside",
  inputClassName = "",
}) => {
  const [query, setQuery] = useState("");
  const {
    watch,
    control,
    setValue,
    formState: { errors },
  } = useFormContext();

  const selectedValues = watch(name);

  const filteredOptions =
    query === ""
      ? options
      : options.filter((option) => {
          return option.label.toLowerCase().includes(query.toLowerCase());
        });

  const removeItem = useCallback(
    (id) => {
      const removedSelection = selectedValues.filter((e) => e !== id);
      setValue(name, removedSelection);
    },
    [setValue, name, selectedValues]
  );

  return (
    <Controller
      name={name}
      control={control}
      rules={validation}
      render={({ field }) => (
        <Combobox
          value={field.value}
          onChange={field.onChange}
          disabled={disabled}
          multiple={multiple}
          nullable
        >
          <div className={classNames(className, "relative")}>
            <div className="space-y-2">
              <Combobox.Label className="label">{label}</Combobox.Label>
              <Combobox.Button
                as="div"
                className={classNames(
                  "flex items-center justify-between form-control",
                  errors[name] && "form-error",
                  inputClassName
                )}
              >
                <Combobox.Input
                  onChange={(event) => setQuery(event.target.value)}
                  displayValue={
                    positionValue === "inside"
                      ? (value) => {
                          const data = options.find((e) => e.value === value);
                          return _.startCase(data?.label);
                        }
                      : undefined
                  }
                  className="w-full bg-transparent outline-none"
                  autoComplete="off"
                  placeholder={placeholder}
                />
                <span className="flex items-center flex-shrink-0 pointer-events-none ">
                  <ChevronDownIcon
                    className={`w-5 h-5 text-gray-500`}
                    aria-hidden="true"
                  />
                </span>
              </Combobox.Button>
              {errors[name] && (
                <div className="error-msg">
                  <ErrorMessage errors={errors} name={name} />
                </div>
              )}
            </div>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              afterLeave={() => setQuery("")}
            >
              <Combobox.Options
                className={`absolute z-50 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm`}
              >
                {(filteredOptions.length === 0 && query !== "") ||
                filteredOptions.length === 0 ? (
                  <div className="relative px-4 py-2 cursor-default select-none text-com2">
                    Nothing found.
                  </div>
                ) : (
                  filteredOptions.map((option, idx) => (
                    <Combobox.Option
                      key={idx}
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
                            className={classNames(
                              selected ? "font-medium" : "font-normal",
                              "block pl-8"
                            )}
                          >
                            {_.startCase(option.label)}
                          </span>
                          {selected && (
                            <span
                              className={`absolute inset-y-0 left-0 flex items-center pl-3`}
                            >
                              <CheckIcon
                                className="w-5 h-5"
                                aria-hidden="true"
                              />
                            </span>
                          )}
                        </li>
                      )}
                    </Combobox.Option>
                  ))
                )}
              </Combobox.Options>
            </Transition>

            {multiple && positionValue === "outside" ? (
              <div className="flex flex-wrap gap-4 mt-4">
                {options
                  ?.filter(({ value }) => selectedValues?.includes(value))
                  ?.map((option, idx) => (
                    <div
                      key={option.value}
                      className="flex items-center gap-x-2.5 py-4 pl-4 pr-2 text-sm font-medium bg-slate-200 rounded-md shadow-md"
                    >
                      <h3>{_.startCase(option.label)}</h3>

                      <span
                        onClick={() => removeItem(option.value)}
                        className="cursor-pointer"
                      >
                        <PlusIcon className="w-5 h-5 text-gray-500 rotate-45 hover:text-red-500" />
                      </span>
                    </div>
                  ))}
              </div>
            ) : null}
          </div>
        </Combobox>
      )}
    />
  );
};

export default Select;
