import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as Form from "@/components/forms";
import Button from "@/components/elements/Button";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { toast } from "react-hot-toast";
import ErrorMessage from "@/components/modules/ErrorMessage";
import SuccessMessage from "@/components/modules/SuccessMessage";

const defaultValues = {
  email: "",
};

let pageUrl =
  process.env.NODE_ENV === "production"
    ? `https://ccsit-ries-client-js.vercel.app/reset-password`
    : "http://localhost:3000/reset-password";

const ForgotPasswordPage = () => {
  const [message, setMessage] = useState("");
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false);

  const methods = useForm({ defaultValues });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const handleResetPassword = async ({ email }) => {
    try {
      const res = await fetch(
        `${process.env.CCSIT_RIES}/api/users/send/password-reset`,
        {
          method: "POST",
          body: JSON.stringify({ email, pageUrl }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        const errorMsg = data.message;
        setMessage(errorMsg);
        setIsSubmitSuccessful(false);
        return;
      }

      setMessage(
        "Reset password link is sent! Please check your email account."
      );
      setIsSubmitSuccessful(true);
      return data;
    } catch (error) {
      setMessage(setMessage);
      setIsSubmitSuccessful(false);
    }
  };

  return (
    <div className="wrapper">
      <div className="w-full max-w-sm mx-auto mt-28">
        <div className="mb-6 text-center">
          <Image
            src={"/assets/logo.svg"}
            alt="CCSIT - RIES"
            width={80}
            height={80}
          />
        </div>

        <h1 className="mb-10 text-3xl font-bold text-center text-gray-900">
          Forgot Password?
        </h1>

        {message && !isSubmitSuccessful && <ErrorMessage message={message} />}

        {isSubmitSuccessful ? (
          <SuccessMessage message={message} />
        ) : (
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(handleResetPassword)}>
              <Form.Group>
                <Form.Input
                  type="email"
                  name="email"
                  label="Email address"
                  className="py-3 bg-gray-100"
                  validation={{
                    required: "This field is required",
                  }}
                  autoComplete="on"
                />
              </Form.Group>

              <Button
                type="submit"
                className="w-full py-3 mt-8 btn-primary disabled:opacity-80"
                disabled={isSubmitting}
              >
                Submit
              </Button>
            </form>
          </FormProvider>
        )}

        <div className="mt-8 text-center">
          <Link href={"/"}>
            <a className="inline-flex items-center justify-center text-sm font-medium text-gray-600 gap-x-4">
              <ArrowLeftIcon className="w-5 h-5 text-gray-600" />
              Back to login
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
