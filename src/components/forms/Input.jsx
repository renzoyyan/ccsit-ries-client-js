import { classNames } from "@/utils/utils";
import { ErrorMessage } from "@hookform/error-message";
import React from "react";
import { useFormContext } from "react-hook-form";

const Input = ({
  label,
  placeholder,
  name,
  type,
  autoComplete,
  className,
  validation,
  ...inputProps
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  switch (type) {
    case "radio":
      return (
        <label
          htmlFor={label}
          className={classNames("inline-flex items-center space-x-2")}
        >
          <input
            {...register(name, validation)}
            type="radio"
            name={name}
            id={label}
            className={classNames(
              "form-radio text-bc-primary",
              className ? className : "w-4 h-4"
            )}
            {...inputProps}
          />
          <span className={classNames("mt-1 text-xs sm:text-sm")}>{label}</span>
        </label>
      );

    default:
      return (
        <>
          <label htmlFor={name} className="label">
            {label}
          </label>
          <input
            {...register(name, validation)}
            type={type || "text"}
            min={type === "number" ? 0 : undefined}
            className={classNames(
              className,
              errors[name] && "form-error",
              "form-control"
            )}
            placeholder={placeholder}
            name={name}
            id={name}
            autoComplete={autoComplete || "off"}
            {...inputProps}
          />

          {errors[name] && (
            <div className="error-msg">
              <ErrorMessage errors={errors} name={name} />
            </div>
          )}
        </>
      );
  }
};

export default Input;
