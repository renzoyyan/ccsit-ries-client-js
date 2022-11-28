import { FormProvider, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useRef } from "react";

import * as Form from "@/components/forms";
import Button from "@/components/elements/Button";
import Modal from "@/components/elements/modal/Modal";
import useModal from "@/hooks/useModal";
import useUsers from "@/hooks/useUsers";
import WarningAlert from "@/components/elements/alerts/WarningAlert";
import { useAuth } from "@/context/AuthContext";
import { signOut } from "next-auth/react";

const defaultValues = {
  username: "",
  old_password: "",
  new_password: "",
  repeat_password: "",
};

const PasswordResetModal = ({ disabled }) => {
  const notificationRef = useRef(null);
  const queryClient = useQueryClient();

  const { isOpen, toggleModal } = useModal();
  const { current_user } = useAuth();
  const { updateUserDetails } = useUsers();

  const methods = useForm({ defaultValues });

  const {
    handleSubmit,
    formState: { isSubmitting },
    reset,
    watch,
  } = methods;

  let new_password = watch("new_password");

  const { mutateAsync: updatePassword } = useMutation({
    mutationFn: (values) => updateUserDetails(current_user, values),

    onSuccess: (values) => {
      queryClient.invalidateQueries({ queryKey: ["user", values._id] });
      toast.success("Password updated", {
        id: notificationRef.current,
      });

      reset();
      toggleModal();
      signOut();
    },

    onError: (error) => {
      const message = error?.response?.data?.message;
      toast.error(message, {
        id: notificationRef.current,
      });
    },
  });

  const onSubmitPassword = async (values) => {
    await updatePassword(values);
  };

  return (
    <>
      <Button
        type="button"
        className="py-3 w-full  sm:w-[346px] text-sm font-medium text-red-500 bg-white border border-gray-300 rounded-md ring-1 ring-gray-200"
        onClick={toggleModal}
        disabled={disabled}
      >
        <span>Reset password</span>
      </Button>
      <Modal
        isOpen={isOpen}
        toggleModal={() => {
          toggleModal();
          reset();
        }}
        modalTitle="Reset password"
      >
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmitPassword)}>
            <div className="space-y-6">
              <WarningAlert description="Once you reset your password you will be automatically logout." />
              <Form.Group>
                <Form.Input
                  name="username"
                  label="Username"
                  validation={{
                    required: "This field is required",
                  }}
                />
              </Form.Group>

              <Form.Group>
                <Form.Input
                  type="password"
                  name="old_password"
                  label="Old password"
                  validation={{
                    required: "This field is required",
                  }}
                />
              </Form.Group>

              <Form.Group>
                <Form.Input
                  type="password"
                  name="new_password"
                  label="New password"
                  validation={{
                    required: "This field is required",
                  }}
                />
              </Form.Group>

              <Form.Group>
                <Form.Input
                  type="password"
                  name="repeat_password"
                  label="Repeat password"
                  validation={{
                    validate: {
                      isEmpty: (value) => !!value || "This field is required",
                      isMatchPassword: (value) =>
                        new_password === value || "Password do not match",
                    },
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
                {isSubmitting ? "Saving" : "Save"}
              </Button>
            </div>
          </form>
        </FormProvider>
      </Modal>
    </>
  );
};

export default PasswordResetModal;
