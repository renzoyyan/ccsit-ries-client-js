import { classNames } from "@/utils/utils";
import { ErrorMessage } from "@hookform/error-message";
import { useId } from "react";
import { useFormContext } from "react-hook-form";

const Input = ({
  label = "",
  placeholder = "",
  name = "",
  type = "",
  autoComplete = "",
  className = "",
  validation,
  ...inputProps
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const randomId = useId();

  switch (type) {
    case "checkbox":
      return (
        <label
          htmlFor={label}
          className={classNames("inline-flex items-center space-x-2")}
        >
          <input
            {...register(name, validation)}
            type="checkbox"
            name={name}
            id={label}
            className={classNames(
              "form-checkbox text-bc-primary rounded-md border-gray-500",
              className ? className : "w-4 h-4"
            )}
            {...inputProps}
          />
          <span className={classNames("mt-1 text-xs sm:text-sm")}>{label}</span>
        </label>
      );
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
          {label ? (
            <label htmlFor={randomId} className="label">
              {label}
            </label>
          ) : null}
          <input
            {...register(name, validation)}
            type={type || "text"}
            min={type === "number" ? 0 : undefined}
            className={classNames(
              className,
              errors[name] && "form-error",
              "form-control placeholder:text-gray-400"
            )}
            placeholder={placeholder}
            name={name}
            id={randomId}
            autoComplete={autoComplete || "off"}
            aria-describedby={randomId}
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
