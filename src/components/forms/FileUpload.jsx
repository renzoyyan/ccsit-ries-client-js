import { useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { useState } from "react";
import { ArrowUpTrayIcon } from "@heroicons/react/24/solid";
import { classNames } from "../../utils/utils";
import { Controller, useFormContext } from "react-hook-form";
import SingleFileWithProgress from "../modules/fileUpload/SingleFileWithProgress";
import { partial } from "filesize";

const MAX_SIZE_FILE = 10485760;
const ACCEPTED_FILE_TYPE = {
  "application/pdf": [".pdf"],
  "application/docx": [".docx"],
};

const size = partial({ base: 2, standard: "jedec" });

const FileUpload = ({
  multiple = false,
  name = "",
  label = "",
  className = "",
  width,
  validation,
  ...props
}) => {
  const { setValue, watch, control } = useFormContext();

  const file = watch(name);

  const onDrop = useCallback(
    (droppedFiles) => {
      const newFile = droppedFiles[0];
      setValue(name, newFile, { shouldValidate: true });
    },
    [setValue, name]
  );

  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      onDrop,
      accept: ACCEPTED_FILE_TYPE,
      maxSize: MAX_SIZE_FILE,
    });

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <div
      className="mt-1 text-sm font-medium text-gray-800 pointer-events-none"
      key={file.name}
    >
      {file.name} - {size(file.size)}
      <ul>
        {errors.map((e) => {
          if (e.code === "file-too-large") {
            return (
              <li key={e.code} className="error-msg">
                {`File is larger than 10MB`}
              </li>
            );
          }
          if (e.code === "file-invalid-type") {
            return (
              <li key={e.code} className="error-msg">
                File type must be PDF, DOCX
              </li>
            );
          }
        })}
      </ul>
    </div>
  ));

  return (
    <div className="flex-wrap items-center gap-6 sm:flex">
      <div className="cursor-pointer">
        <Controller
          control={control}
          name={name}
          rules={validation}
          render={({ field: { onChange, onBlur }, fieldState: { error } }) => (
            <>
              <div
                {...getRootProps()}
                className={classNames(
                  "rounded-md transition duration-150 ease-out hover:border-gray-600 border-2 py-8 border-dashed border-gray-300 w-56",
                  isDragActive && "border-gray-600"
                )}
              >
                <input
                  {...getInputProps({
                    id: name,
                    onBlur,
                    onChange,
                  })}
                  {...props}
                />
                <div className="flex flex-col items-center justify-center text-xs font-medium text-com2">
                  <ArrowUpTrayIcon className="w-6 h-6 text-gray-500" />
                  <div className="mt-4 mb-2 text-gray-500">
                    <span className="px-2 py-1 bg-white rounded-md cursor-pointer">
                      Upload a file
                    </span>
                    or drag and drop
                  </div>
                  <span className="text-xs text-gray-500">
                    PDF, DOCX up to 10MB
                  </span>
                </div>
              </div>

              {error && (
                <p className="error-msg" role="alert">
                  {error.message}
                </p>
              )}
            </>
          )}
        />

        {fileRejectionItems}
      </div>

      {file && <SingleFileWithProgress file={file} />}
    </div>
  );
};

export default FileUpload;
