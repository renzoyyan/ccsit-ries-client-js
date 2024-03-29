import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { FormProvider, useForm } from "react-hook-form";
import moment from "moment";
import { useEffect } from "react";

import * as Form from "@/components/forms";
import FileUpload from "@/components/forms/FileUpload";
import Button from "@/components/elements/Button";
import Modal from "@/components/elements/modal/Modal";
import { classNames } from "@/utils/utils";

const defaultValues = {
  log_title: "",
  date_completion: "",
  file: null,
  publication_url: "",
};

const LogModal = ({ onSubmit, isOpen, toggleModal, isSuccess, disabled }) => {
  const methods = useForm({ defaultValues });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (!isSuccess) return;

    reset();
  }, [isSuccess, reset]);

  const onSubmitLog = (values) => {
    onSubmit(values);
  };

  return (
    <>
      <Button
        type="button"
        onClick={toggleModal}
        disabled={disabled}
        className="flex items-center overflow-hidden transition-all duration-200 cursor-pointer group"
      >
        <PlusCircleIcon
          className={classNames(
            "w-7 h-7 text-gray-900",
            disabled
              ? "text-gray-500"
              : "group-hover:text-bc-primary translate-x-8 group-hover:rotate-90 group-hover:translate-x-0 transition-all duration-300 ease-in-out"
          )}
        />
        <span
          className={classNames(
            "block ml-2",
            disabled
              ? "hidden"
              : "transition-all group-hover:text-bc-primary duration-300 ease-in-out text-sm font-medium translate-x-[2em] group-hover:translate-x-[-.25em]"
          )}
        >
          Add
        </span>
      </Button>
      <Modal
        isOpen={isOpen}
        toggleModal={() => {
          toggleModal();
          reset();
        }}
        modalTitle="Add new log"
      >
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmitLog)}>
            <div className="space-y-6">
              <FileUpload
                name="file"
                label="Add file or image"
                acceptFileType={{
                  "application/pdf": [".pdf"],
                  "image/*": [".png", ".jpg", ".jpeg"],
                }}
              />
              {/* <Form.Group>
                <Form.Input type="checkbox" name="ongoing" label="On going" />
              </Form.Group> */}
              <Form.Group>
                <Form.Input
                  name="log_title"
                  label="Log name"
                  validation={{
                    required: "This field is required",
                  }}
                  placeholder="ex. Proposal Presentation"
                />
              </Form.Group>

              <Form.Group>
                <Form.Input
                  type="date"
                  name="date_completion"
                  label="Date Completion"
                  validation={{
                    validate: {
                      isEmpty: (value) => !!value || "This field is required",
                      isSameOrAfter: (date) => {
                        const today = moment(new Date());

                        return (
                          today.isAfter(date) ||
                          "This field must be either the other day or today"
                        );
                      },
                    },
                  }}
                />
              </Form.Group>

              <Form.Group>
                <Form.Input
                  name="publication_url"
                  label="Publication url / link"
                  placeholder="https://www.website.com/"
                />
              </Form.Group>
            </div>

            <div className="mt-10">
              <Button
                type="submit"
                className="w-full py-3 btn-primary"
                disabled={isSubmitting}
              >
                Save
              </Button>
            </div>
          </form>
        </FormProvider>
      </Modal>
    </>
  );
};

export default LogModal;
