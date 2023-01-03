import React, { useId } from "react";
import { useFormContext } from "react-hook-form";

const FilterDate = ({ name, validation }) => {
  const { register } = useFormContext();
  const randomId = useId();
  return (
    <div className="inline-flex items-center gap-4">
      <label htmlFor={randomId} className="text-sm font-medium text-gray-500">
        Date Created
      </label>
      <input
        {...register(name, validation)}
        type="month"
        id={randomId}
        className="text-sm font-medium border-gray-300 rounded-md form-input"
      />
    </div>
  );
};

export default FilterDate;
