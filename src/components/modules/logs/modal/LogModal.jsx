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
  ongoing: false,
};

const LogModal = ({ onSubmit, isOpen, toggleModal, isSuccess, disabled }) => {
  const methods = useForm({ defaultValues });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
    watch,
    setValue,
  } = methods;

  const isOnGoing = watch("ongoing");

  useEffect(() => {
    if (!isOnGoing) return;

    setValue("date_completion", "");
  }, [setValue, isOnGoing]);

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
            "w-7 h-7 text-gray-900 group-hover:text-bc-primary translate-x-8 group-hover:rotate-90 group-hover:translate-x-0 transition-all duration-300 ease-in-out",
            disabled ? "text-gray-500" : ""
          )}
        />
        <span className="block ml-2 transition-all group-hover:text-bc-primary duration-300 ease-in-out text-sm font-medium translate-x-[2em] group-hover:translate-x-[-.25em]">
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
              <FileUpload name="file" />
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
                />
              </Form.Group>

              {!isOnGoing && (
                <Form.Group>
                  <Form.Input
                    type="date"
                    name="date_completion"
                    label="Date Completion"
                    validation={{
                      validate: {
                        isEmpty: (value) => {
                          if (!isOnGoing) {
                            return !!value || "This field is required";
                          }

                          return true;
                        },
                        isSameOrAfter: (date) => {
                          const today = moment(new Date());

                          if (!isOnGoing) {
                            return (
                              today.isAfter(date) ||
                              "This field must be either the other day or today"
                            );
                          }

                          return true;
                        },
                      },
                    }}
                  />
                </Form.Group>
              )}
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
