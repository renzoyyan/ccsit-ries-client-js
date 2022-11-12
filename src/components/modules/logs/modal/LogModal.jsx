import { useEffect, useState } from "react";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { createPortal } from "react-dom";
import { FormProvider, useForm } from "react-hook-form";

import * as Form from "@/components/forms";
import FileUpload from "@/components/forms/FileUpload";
import Button from "@/components/elements/Button";
import Modal from "./Modal";
import { classNames } from "@/utils/utils";

const defaultValues = {
  log_title: "",
  date_completion: "",
  file: null,
};

const LogModal = ({ onSubmit, isOpen, toggleModal, disabled }) => {
  const methods = useForm({ defaultValues });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  const onSubmitLog = (values) => {
    onSubmit(values);
    reset();
  };

  return (
    <>
      <Button type="button" onClick={toggleModal} disabled={disabled}>
        <PlusCircleIcon
          className={classNames(
            "w-6 h-6 text-gray-900",
            disabled ? "text-gray-500" : ""
          )}
        />
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
              <Form.Group>
                <Form.Input
                  name="log_title"
                  label="Log name"
                  validation={{
                    required: "This field is required",
                  }}
                />
              </Form.Group>

              <Form.Group>
                <Form.Input
                  type="date"
                  name="date_completion"
                  label="Date Completion"
                  validation={{
                    required: "This field is required",
                  }}
                />
              </Form.Group>
            </div>

            <div className="mt-10">
              <Button
                type="submit"
                className="w-full py-3 btn-primary"
                disabled={isSubmitting}
              >
                Submit
              </Button>
            </div>
          </form>
        </FormProvider>
      </Modal>
    </>
  );
};

export default LogModal;

const Portal = (props) => {
  let { children } = props;
  let [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;
  return createPortal(children, document.body);
};
