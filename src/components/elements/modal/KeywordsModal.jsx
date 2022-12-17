import { FormProvider, useForm } from "react-hook-form";

import * as Form from "@/components/forms";
import Button from "@/components/elements/Button";
import Modal from "@/components/elements/modal/Modal";
import KeywordsInput from "@/components/forms/KeywordsInput";
import useModal from "@/hooks/useModal";
import { useEffect } from "react";

const defaultValues = {
  keywords: [],
};

const KeywordsModal = ({ onSubmit = () => {}, disabled, previousKeywords }) => {
  const { isOpen, toggleModal } = useModal();
  const methods = useForm({
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { isSubmitting, errors },
  } = methods;

  const watchKeywordValue = watch("keywords");

  useEffect(() => {
    if (isOpen && previousKeywords?.length > 0) {
      setValue("keywords", previousKeywords);
    }
  }, [isOpen, setValue, previousKeywords]);

  const onSubmitKeywords = ({ keywords }) => {
    onSubmit(keywords);
    reset();

    if (!errors["keywords"]) {
      toggleModal();
    }
  };

  return (
    <>
      <Button
        type="button"
        className="px-4 py-2 btn-success"
        onClick={toggleModal}
        disabled={disabled}
      >
        Add keywords
      </Button>
      <Modal
        isOpen={isOpen}
        toggleModal={() => {
          toggleModal();
          reset();
        }}
        modalTitle="Add keywords"
      >
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmitKeywords)}>
            <Form.Group>
              <KeywordsInput name="keywords" label="Keywords" />
            </Form.Group>

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

export default KeywordsModal;
