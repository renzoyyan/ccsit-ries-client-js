import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { FormProvider, useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useCallback, useContext, useEffect, useRef } from "react";

import * as Form from "@/components/forms";
import Button from "@/components/elements/Button";
import Modal from "@/components/elements/modal/Modal";
import { isFile, roleOptions } from "@/utils/utils";
import useModal from "@/hooks/useModal";
import SingleFileUpload from "@/components/forms/SingleFileUpload";
import useUsers from "@/hooks/useUsers";
import { UserContext } from "@/context/UserContext";

const defaultValues = {
  image: null,
  role: "",
  first_name: "",
  last_name: "",
  suffix: "",
  doctorate_degree: "",
  username: "",
  password: "",
};

const UserModal = ({ disabled }) => {
  const notificationRef = useRef(null);
  const queryClient = useQueryClient();

  const { isOpen, toggleModal } = useModal();
  const { addUser } = useUsers();

  const methods = useForm({ defaultValues });

  const {
    handleSubmit,
    reset,
    setValue,
    formState: { isSubmitting },
  } = methods;

  const { mutateAsync: addNewUser } = useMutation({
    mutationFn: (values) => addUser(values),

    onSuccess: () => {
      queryClient.invalidateQueries("users");
      toast.success("New user saved", {
        id: notificationRef.current,
      });
      toggleModal();
      reset(defaultValues);
    },

    onError: (error) => {
      const message = error?.response?.data?.message;
      toast.error(message, {
        id: notificationRef.current,
      });
    },
  });

  const onSubmitUser = async (values) => {
    notificationRef.current = isFile(values?.file)
      ? toast.loading("Uploading file please wait..")
      : toast.loading("Saving...");

    await addNewUser(values);
    return;
  };

  return (
    <>
      <Button
        type="button"
        className="px-4 py-3 btn-primary"
        onClick={toggleModal}
        disabled={disabled}
      >
        <PlusCircleIcon className="w-5 h-5 text-white" />
        <span>Add user</span>
      </Button>
      <Modal
        isOpen={isOpen}
        toggleModal={() => {
          toggleModal();
          reset(defaultValues);
        }}
        modalTitle="Add new user"
      >
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmitUser)}>
            <SingleFileUpload name="image" />
            <div className="grid gap-6 mt-6 sm:grid-cols-2">
              <Form.Group>
                <Form.Select
                  name="role"
                  options={roleOptions}
                  label="Role"
                  validation={{
                    required: "This field is required",
                  }}
                />
              </Form.Group>

              <Form.Group>
                <Form.Input
                  type="email"
                  name="email"
                  label="Email address"
                  validation={{
                    required: "This field is required",
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "Email is not valid",
                    },
                  }}
                />
              </Form.Group>

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
                  name="password"
                  label="Temporary password"
                  validation={{
                    required: "This field is required",
                    minLength: {
                      value: 6,
                      message: "Password must have at least 6 characters",
                    },
                  }}
                />
              </Form.Group>

              <Form.Group>
                <Form.Input
                  name="first_name"
                  label="First name"
                  validation={{
                    required: "This field is required",
                  }}
                />
              </Form.Group>

              <Form.Group>
                <Form.Input
                  name="last_name"
                  label="Last name"
                  validation={{
                    required: "This field is required",
                  }}
                />
              </Form.Group>

              <Form.Group>
                <Form.Input name="suffix" label="Suffix (optional)" />
              </Form.Group>

              <Form.Group>
                <Form.Input
                  name="doctorate_degree"
                  label="Doctorate degree (optional)"
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

export default UserModal;
