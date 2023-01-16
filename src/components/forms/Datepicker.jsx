import { classNames } from "@/utils/utils";
import { CalendarDaysIcon, PlusIcon } from "@heroicons/react/24/outline";
import { ErrorMessage } from "@hookform/error-message";

import DatePicker from "react-date-picker/dist/entry.nostyle";
import { Controller, useFormContext } from "react-hook-form";

const Datepicker = ({
  name = "",
  label = "",
  id,
  validation,
  disabled,
  format = "y-MM-d",
  showClearIcon = true,
  ...props
}) => {
  const {
    control,
    formState: { errors },
    setValue,
  } = useFormContext();

  return (
    <div className="relative">
      <label htmlFor={id} className="label">
        {label}
      </label>
      <Controller
        control={control}
        name={name}
        rules={validation}
        render={({ field }) => (
          <DatePicker
            onChange={(date) => {
              field.onChange(date);
              setValue(field.name, date);
            }}
            value={field.value ? new Date(field.value) : null}
            clearIcon={
              !field.value || !showClearIcon ? null : (
                <PlusIcon
                  className={classNames(
                    "w-5 h-5 rotate-45 text-gray-500",
                    !disabled ? "hover:text-bc-primary" : null
                  )}
                  style={{ display: (disabled || showClearIcon) && "none" }}
                />
              )
            }
            calendarIcon={
              <CalendarDaysIcon
                className={classNames(
                  "w-5 h-5 text-gray-500",
                  !disabled ? "hover:text-bc-primary" : null
                )}
              />
            }
            className={classNames(
              errors[name] &&
                "ring-red-500 border-red-500 focus:border-red-500 focus-within:ring-red-500 focus-within:border-red-500"
            )}
            format={format}
            autoComplete="off"
            disabled={disabled}
            {...props}
          />
        )}
      />

      {errors[name] && (
        <div className="error-msg">
          <ErrorMessage errors={errors} name={name} />
        </div>
      )}
    </div>
  );
};

export default Datepicker;
