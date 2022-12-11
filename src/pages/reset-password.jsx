import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";

import * as Form from "@/components/forms";
import Button from "@/components/elements/Button";
import SuccessResetPasswordModal from "@/components/elements/modal/SuccessResetPasswordModal";
import ErrorMessage from "@/components/modules/ErrorMessage";

const defaultValues = {
  new_password: "",
  repeat_password: "",
};

const ForgotPasswordPage = () => {
  const [message, setMessage] = useState("");
  const [successResetPassword, setSuccessResetPassword] = useState(false);
  const router = useRouter();
  const { accessToken: access_token } = router.query;
  const methods = useForm({ defaultValues });
  const new_password = methods.watch("new_password");

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const handleResetPassword = async ({ new_password }) => {
    const res = await fetch(
      `${process.env.CCSIT_RIES}/api/users/reset-password`,
      {
        method: "PATCH",
        body: JSON.stringify({ new_password, access_token }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    const data = await res.json();

    if (!res.ok) {
      const errorMsg = data.message;
      setMessage(errorMsg);
      setSuccessResetPassword(false);
      return;
    }
    setMessage("");
    setSuccessResetPassword((prev) => !prev);
    return data;
  };

  return (
    <>
      <div className="overflow-y-hidden wrapper">
        <div className="w-full max-w-sm mx-auto mt-32">
          <div className="mb-6 text-center">
            <Image
              src={"/assets/logo.svg"}
              alt="CCSIT - RIES"
              width={80}
              height={80}
            />
          </div>

          <h1 className="mb-10 text-3xl font-bold text-center text-gray-900">
            Reset Password
          </h1>

          {message && <ErrorMessage message={message} />}

          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(handleResetPassword)}>
              <div className="space-y-4">
                <Form.Group>
                  <Form.Input
                    type="password"
                    name="new_password"
                    label="New password"
                    className="py-3 bg-gray-100"
                    validation={{
                      required: "This field is required",
                    }}
                    autoComplete="on"
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Input
                    type="password"
                    name="repeat_password"
                    label="Repeat password"
                    className="py-3 bg-gray-100"
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

              <Button
                type="submit"
                className="w-full py-3 mt-8 btn-primary disabled:opacity-80"
                disabled={isSubmitting || successResetPassword}
              >
                {successResetPassword ? "Submitted" : "Submit"}
              </Button>
            </form>
          </FormProvider>
        </div>
      </div>

      <SuccessResetPasswordModal isOpen={successResetPassword} />
    </>
  );
};

export default ForgotPasswordPage;

export const getServerSideProps = async (ctx) => {
  const { query } = ctx;
  const { accessToken: access_token } = query;

  if (!access_token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return { props: { data, email } };
};
