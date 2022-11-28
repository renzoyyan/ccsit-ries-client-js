import { classNames } from "@/utils/utils";
import { ErrorMessage } from "@hookform/error-message";
import React, { useId } from "react";
import { useFormContext } from "react-hook-form";

const Textarea = ({
  name = "",
  label = "",
  className = "",
  placeholder = "Add a comment",
  validation,
  ...props
}) => {
  const randomId = useId();

  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <label htmlFor={randomId} className="sr-only">
        {label}
      </label>
      <textarea
        {...register(name, validation)}
        id={randomId}
        name={name}
        rows={3}
        className={classNames(
          "block w-full px-4 py-3 border-2 border-gray-300 rounded-md shadow-sm outline-none focus:border-bc-primary focus:ring-bc-primary sm:text-sm",
          className
        )}
        placeholder={placeholder}
        {...props}
      />

      {errors[name] && (
        <div className="error-msg">
          <ErrorMessage errors={errors} name={name} />
        </div>
      )}
    </>
  );
};

export default Textarea;
