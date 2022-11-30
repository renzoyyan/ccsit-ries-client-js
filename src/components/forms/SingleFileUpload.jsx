import { PlusCircleIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import Button from "../elements/Button";
import Avatar from "@/assets/images/avatar.svg";
import { classNames } from "@/utils/utils";

const btnColorValues = {
  primary: "btn-primary px-4 py-3",
  secondary:
    "px-3 py-2 text-sm font-medium leading-4 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:hover:bg-white",
};

const SingleFileUpload = ({
  name = "",
  validation,
  btnColor = "primary",
  btnText = "Add photo",
  imgWidth,
  imgHeight,
  disabled = false,
  withLabel = false,
  withIcon = true,
}) => {
  const { control, watch } = useFormContext();
  const currentFile = watch(name);

  const isUrl = (url) => {
    const urlPattern = new RegExp(
      /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/
    );

    return !!urlPattern.test(url);
  };

  const [image, setImage] = useState(null);

  useEffect(() => {
    if (currentFile instanceof File) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(currentFile);
    }

    if (isUrl(currentFile)) {
      setImage(currentFile);
    }
  }, [currentFile]);

  return (
    <div className="space-y-1">
      {withLabel ? (
        <h4 className="block text-sm font-medium text-gray-700">Photo</h4>
      ) : null}
      <div className="flex items-center space-x-5">
        <div className={`relative`}>
          <Image
            src={image !== null ? image : Avatar}
            alt={"Upload here"}
            objectFit="cover"
            width={imgWidth ? imgWidth : 100}
            height={imgHeight ? imgHeight : 100}
            className="rounded-full"
          />
        </div>
        <Button type="button">
          <label
            htmlFor={name}
            className={classNames(
              "block",
              disabled ? "cursor-default" : "cursor-pointer",
              btnColor === "primary"
                ? btnColorValues.primary
                : btnColorValues.secondary
            )}
          >
            <Controller
              control={control}
              name={name}
              rules={validation}
              render={({ field }) => (
                <input
                  id={name}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={field.ref}
                  disabled={disabled}
                  onChange={(e) => {
                    field.onChange(e.currentTarget.files[0]);
                  }}
                />
              )}
            />

            <div className="flex items-center gap-x-2">
              {withIcon && (
                <span
                  className={classNames(btnColor !== "primary" && "hidden")}
                >
                  <PlusCircleIcon className="w-5 h-5" aria-hidden="true" />
                </span>
              )}
              <span>{btnText}</span>
            </div>
          </label>
        </Button>

        {/* <ErrorMessage
        name={name}
        component="div"
        className="mt-0 text-sm text-red-500 pointer-events-none select-none"
      /> */}
      </div>
    </div>
  );
};

export default SingleFileUpload;
