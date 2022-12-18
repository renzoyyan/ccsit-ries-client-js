import { classNames } from "@/utils/utils";
import { ErrorMessage } from "@hookform/error-message";
import React, { useId } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { NumericFormat } from "react-number-format";

const NumberFormat = ({ name, label, validation, className }) => {
  const randomId = useId();
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      {label ? (
        <label htmlFor={randomId} className="label">
          {label}
        </label>
      ) : null}
      <Controller
        control={control}
        name={name}
        rules={validation}
        render={({ field }) => (
          <NumericFormat
            value={field.value}
            onChange={(e) => field.onChange(e)}
            onBlur={field.onBlur}
            displayType="input"
            name={field.name}
            id={randomId}
            thousandSeparator=","
            className={classNames(
              className,
              errors[name] && "form-error",
              "form-control placeholder:text-gray-400"
            )}
          />
        )}
      />

      {errors[name] && (
        <div className="error-msg">
          <ErrorMessage errors={errors} name={name} />
        </div>
      )}
    </>
  );
};

export default NumberFormat;
