import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import React, { Fragment, useId } from "react";
import useProponents from "@/hooks/useProponents";
import { startCase } from "lodash-es";
import { useFormContext } from "react-hook-form";
import Button from "../elements/Button";

const AuthorFilter = ({ validation }) => {
  const randomId = useId();
  const { proponentOptions } = useProponents();

  const { register, resetField } = useFormContext();

  return (
    <Popover as="div" id={randomId} className="relative inline-block text-left">
      <div>
        <Popover.Button className="inline-flex items-center justify-center text-sm font-medium text-gray-500 gap-x-4 group hover:text-gray-900">
          <span>Author</span>

          <ChevronDownIcon
            className="flex-shrink-0 w-5 h-5 text-gray-400 group-hover:text-gray-500"
            aria-hidden="true"
          />
        </Popover.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Popover.Panel className="absolute right-0 z-10 p-6 mt-2 origin-top-right bg-white rounded-md shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="space-y-3">
            {proponentOptions?.map((option, optionIdx) => (
              <div key={option.value} className="flex items-center">
                <input
                  {...register("author", validation)}
                  id={option.value}
                  defaultValue={option.value}
                  type="radio"
                  className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <label
                  htmlFor={option.value}
                  className="pr-6 ml-3 text-sm font-medium text-gray-900 whitespace-nowrap"
                >
                  {startCase(option.label)}
                </label>
              </div>
            ))}
          </div>

          <Button
            className="w-full mt-4 text-sm text-right text-blue-500 underline"
            onClick={() => resetField("author")}
          >
            Reset
          </Button>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default AuthorFilter;
