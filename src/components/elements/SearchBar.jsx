import * as Form from "@/components/forms";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { FormProvider, useForm } from "react-hook-form";

const SearchBar = () => {
  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <Form.Group>
        <div className="relative inline-block w-full shadow-sm group sm:w-64">
          <MagnifyingGlassIcon className="absolute inset-x-0 w-5 h-5 ml-2 text-gray-400 -translate-y-1/2 top-1/2 bottom-1/2 group-focus-within:text-bc-primary" />

          <Form.Input
            type="text"
            name="search"
            placeholder="Search"
            className="w-full bg-white border-none rounded-md outline-none pl-9 ring-2 ring-gray-300 form-input lg:w-96 placeholder:text-sm placeholder:text-gray-400 focus-within:ring-bc-primary focus-within:ring-2"
          />
        </div>
      </Form.Group>
    </FormProvider>
  );
};

export default SearchBar;
