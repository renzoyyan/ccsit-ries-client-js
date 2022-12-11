import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import * as Form from "@/components/forms";
import Button from "@/components/elements/Button";
import SingleFileUpload from "@/components/forms/SingleFileUpload";
import useUsers from "@/hooks/useUsers";
import { useAuth } from "@/context/AuthContext";
import useEditMode from "@/hooks/useEditMode";
import { getAuthSession } from "@/utils/auth";
import { isFile, Roles } from "@/utils/utils";
import UserLayout from "@/components/layouts/users/UserLayout";
import PasswordResetModal from "@/components/modules/proponents/PasswordResetModal";

const personalDefaultValues = {
  first_name: "",
  last_name: "",
  suffix: "",
  doctorate_degree: "",
};
const accountDefaultValues = {
  username: "",
  image: null,
};

const ProponentProfile = () => {
  const queryClient = useQueryClient();

  // hooks
  const { getUserById, updateUserDetails } = useUsers();
  const { current_user } = useAuth();
  const { isEdit, isEditPersonal, handleEditPersonal, handleEditAccount } =
    useEditMode();

  const { data: user } = useQuery({
    queryKey: ["user", current_user],
    queryFn: () => getUserById(current_user),
    enabled: !!current_user,
  });

  const personalMethods = useForm({ defaultValues: personalDefaultValues });

  const accountMethods = useForm({ defaultValues: accountDefaultValues });

  const {
    handleSubmit: handleSubmitPersonal,
    reset: resetPersonal,
    setFocus: setFocusPersonal,
    formState: { isSubmitting: isSubmittingPersonal },
  } = personalMethods;

  const {
    handleSubmit: handleSubmitAccount,
    reset: resetAccount,
    setFocus: setFocusAccount,
    formState: { isSubmitting: isSubmittingAccount },
  } = accountMethods;

  useEffect(() => {
    if (current_user) {
      resetAccount({
        username: user?.username,
        image: user?.image?.url,
      });
      resetPersonal(user);
    }
  }, [current_user, resetAccount, resetPersonal, user]);

  useEffect(() => {
    if (isEditPersonal) {
      setFocusPersonal("first_name");
    }

    if (isEdit) {
      setFocusAccount("username");
    }
  }, [isEditPersonal, setFocusPersonal, setFocusAccount, isEdit]);

  const { mutateAsync: updateUserById } = useMutation({
    mutationFn: (values) => updateUserDetails(current_user, values),

    onSuccess: (values) => {
      queryClient.invalidateQueries({ queryKey: ["user", values._id] });
      toast.success("Personal Information updated");
    },

    onError: (error) => {
      const message = error?.response?.data?.message;
      toast.error(message);
    },
  });

  const onSubmitCallback = async (values) => {
    let formData = new FormData();

    if (isEditPersonal) {
      await updateUserById(values);
      handleEditPersonal();
      return;
    }

    if (isFile(values.image)) formData.append("image", values.image);
    formData.append("username", values.username);

    await updateUserById(formData);
    handleEditAccount();
    return;
  };

  return (
    <UserLayout>
      <div className="mt-10 sm:mt-20">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Personal Information
            </h3>
          </div>
          <div className="mt-5 md:col-span-2 md:mt-0">
            <FormProvider {...personalMethods}>
              <form>
                <div className="overflow-hidden shadow sm:rounded-md">
                  <div className="px-4 py-5 bg-white sm:p-6">
                    <div className="grid gap-6 lg:grid-cols-2">
                      <Form.Group>
                        <Form.Input
                          name="first_name"
                          label="First name"
                          disabled={!isEditPersonal}
                          validation={{
                            required: "This field is required",
                          }}
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Input
                          name="last_name"
                          label="Last name"
                          disabled={!isEditPersonal}
                          validation={{
                            required: "This field is required",
                          }}
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Input
                          name="suffix"
                          label="Suffix (optional)"
                          disabled={!isEditPersonal}
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Input
                          name="doctorate_degree"
                          label="Doctorate Degree"
                          disabled={!isEditPersonal}
                        />
                      </Form.Group>
                    </div>
                  </div>
                  <div className="px-4 py-3 space-x-4 text-right bg-gray-50 sm:px-6">
                    {/* <Button className="px-4 btn-primary">Save</Button> */}
                    {isEditPersonal ? (
                      <div className="space-x-4">
                        <Button
                          type="submit"
                          className="px-4 text-gray-800 bg-white btn-primary ring-1 ring-gray-300 hover:bg-gray-50 focus:ring-[unset]"
                          onClick={handleEditPersonal}
                        >
                          Discard
                        </Button>
                        <Button
                          type="submit"
                          className="px-4 btn-primary"
                          onClick={handleSubmitPersonal(onSubmitCallback)}
                          disabled={isSubmittingPersonal}
                        >
                          Save
                        </Button>
                      </div>
                    ) : (
                      <Button
                        className="px-4 btn-primary"
                        onClick={handleEditPersonal}
                      >
                        Edit
                      </Button>
                    )}
                  </div>
                </div>
              </form>
            </FormProvider>
          </div>
        </div>
      </div>
      <div className="hidden sm:block sm:my-10" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>

      {/* account information */}
      <div className="mt-10 md:grid md:grid-cols-3 md:gap-6 ">
        <div className="md:col-span-1">
          <div className="px-4 sm:px-0">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Account Information
            </h3>
            <p className="mt-1 text-sm text-gray-600">
              This information is private don&apos;t share it to anyone.
            </p>
          </div>
        </div>
        <div className="mt-5 md:col-span-2 md:mt-0">
          <FormProvider {...accountMethods}>
            <form>
              <div className="shadow sm:overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 space-y-6 bg-white sm:p-6">
                  <SingleFileUpload
                    name="image"
                    imgWidth={50}
                    imgHeight={50}
                    btnText="Change"
                    btnColor="secondary"
                    withLabel
                    disabled={!isEdit}
                  />
                  <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <Form.Group>
                      <Form.Input
                        name="username"
                        label="Username"
                        disabled={!isEdit}
                      />
                    </Form.Group>
                  </div>
                </div>
                <div className="px-4 py-3 space-x-4 text-right bg-gray-50 sm:px-6">
                  {/* <Button className="px-4 btn-primary">Save</Button> */}
                  {isEdit ? (
                    <div className="space-x-4">
                      <Button
                        type="submit"
                        className="px-4 text-gray-800 bg-white btn-primary ring-1 ring-gray-300 hover:bg-gray-50 focus:ring-[unset]"
                        onClick={handleEditAccount}
                      >
                        Discard
                      </Button>
                      <Button
                        type="submit"
                        className="px-4 btn-primary"
                        onClick={handleSubmitAccount(onSubmitCallback)}
                        disabled={isSubmittingAccount}
                      >
                        {isSubmittingAccount ? "Saving" : "Save"}
                      </Button>
                    </div>
                  ) : (
                    <Button
                      className="px-4 btn-primary"
                      onClick={handleEditAccount}
                    >
                      Edit
                    </Button>
                  )}
                </div>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>

      <div className="hidden sm:block sm:my-10" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>

      <div className="mt-10 md:grid md:grid-cols-3 md:gap-6 ">
        <div className="md:col-span-1">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Password Reset
          </h3>
        </div>
        <div className="mt-5 md:col-span-2 md:mt-0">
          <div className="shadow sm:overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 space-y-6 bg-white sm:p-6">
              <PasswordResetModal />
            </div>
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default ProponentProfile;

export const getServerSideProps = async (ctx) => {
  const session = await getAuthSession(ctx);
  const role = session?.user?.user_details?.role;

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  if (session && role !== Roles.PERSONNEL) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};
