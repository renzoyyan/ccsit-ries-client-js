import { FormProvider, useForm } from "react-hook-form";
import moment from "moment";
import { useEffect } from "react";

import * as Form from "@/components/forms";
import FileUpload from "@/components/forms/FileUpload";
import Button from "@/components/elements/Button";
import Modal from "@/components/elements/modal/Modal";
import useModal from "@/hooks/useModal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useLogs from "@/hooks/useLogs";
import toast from "react-hot-toast";

const defaultValues = {
  log_title: "",
  date_completion: "",
  file: null,
  ongoing: false,
};

const EditLogModal = ({ logId }) => {
  const { isOpen, toggleModal } = useModal();
  const { getLogById, updateLogById } = useLogs();
  const queryClient = useQueryClient();

  const methods = useForm({ defaultValues });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
    watch,
    setValue,
  } = methods;

  const isOnGoing = watch("ongoing");

  const { data } = useQuery({
    queryKey: ["log", logId],
    queryFn: () => getLogById(logId),
    enabled: !!isOpen,
  });

  useEffect(() => {
    if (!isOnGoing) return;

    setValue("date_completion", "");
  }, [setValue, isOnGoing]);

  useEffect(() => {
    if (!data) return;

    reset(data);
  }, [reset, data]);

  const { mutateAsync } = useMutation({
    mutationFn: (values) => updateLogById(logId, values),

    onSuccess: (values) => {
      if (values.log.research_id) {
        queryClient.invalidateQueries(["research", values.log.research_id]);
      } else {
        queryClient.invalidateQueries(["extension", values.log.extension_id]);
      }

      toast.success("Updated log successfully");
      toggleModal();
      reset();
    },

    onError: (error) => {
      const message = error.response.data.message;
      toast.error(message);
    },
  });

  const onSubmitLog = async (values) => await mutateAsync(values);

  return (
    <>
      <Button
        className="text-xs font-medium cursor-pointer hover:underline text-bc-tertiary"
        onClick={toggleModal}
      >
        Update log
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
                <Form.Input type="checkbox" name="ongoing" label="On going" />
              </Form.Group>
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

export default EditLogModal;
