import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { classNames } from "@/utils/utils";
import { useState, useEffect, useCallback } from "react";
import Keyword from "../elements/Keyword";

const KeywordsInput = ({
  name,
  label,
  validation,
  className,
  placeholder = "Press enter or comma to add keyword",
  ...inputProps
}) => {
  const {
    formState: { errors },
    setValue,
    control,
    watch,
  } = useFormContext();
  const currentKeywords = watch("keywords");

  const [keywords, setKeywords] = useState(currentKeywords);
  const [keywordError, setKeywordError] = useState("");

  const handleAddition = (e) => {
    const value = e.target.value;

    if (value === "") return setKeywordError("This field is required");

    if (value !== "" && value !== ",") {
      switch (e.key) {
        case ",":
          const newKeyword = `${value.trim().split(",")[0]}`;

          if (!keywords.includes(newKeyword) && newKeyword !== "") {
            setKeywords((currValues) => [...currValues, newKeyword]);

            e.target.value = "";
            setKeywordError("");
          } else {
            setKeywordError("Keyword already exists");
          }
          return;

        case "Enter":
          const addKeyword = `${value.trim()}`;

          if (!keywords.includes(addKeyword) && addKeyword !== "") {
            setKeywords((currValues) => [...currValues, addKeyword]);

            // Clear the input
            e.target.value = "";
            setKeywordError("");
          } else {
            setKeywordError("Keyword already exists");
          }
          return;

        default:
          return;
      }
    }
  };

  useEffect(() => {
    setValue(name, keywords);
  }, [name, keywords, setValue]);

  const removeTag = useCallback(
    (idx) => {
      const removedSelection = keywords.filter(
        (selected, keywordIdx) => keywordIdx !== idx
      );
      setKeywords(removedSelection);
    },
    [keywords]
  );

  return (
    <>
      <label htmlFor={name} className="label">
        {label}
      </label>
      <Controller
        control={control}
        name={name}
        rules={validation}
        render={({ field }) => (
          <input
            type="text"
            onChange={(e) => {
              field.onChange(e);
            }}
            onKeyUp={handleAddition}
            onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
            onKeyPress={(e) => e.key === "Enter" && e.preventDefault()}
            className={classNames(
              className,
              (errors[name] || keywordError) && "form-error",
              "form-control placeholder:text-sm"
            )}
            placeholder={placeholder}
            name={name}
            id={name}
            autoComplete="on"
            {...inputProps}
          />
        )}
      />
      {keywordError && <p className="error-msg">{keywordError}</p>}
      <div className="flex flex-wrap gap-2">
        {keywords.map((keyword, idx) => (
          <Keyword
            key={idx}
            keyword={keyword}
            handleDelete={() => removeTag(idx)}
          />
        ))}
      </div>
      {errors[name] && (
        <div className="error-msg">
          <ErrorMessage errors={errors} name={name} />
        </div>
      )}
    </>
  );
};

export default KeywordsInput;
