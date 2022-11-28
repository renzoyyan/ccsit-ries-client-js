import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { FormProvider, useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { BeatLoader } from "react-spinners";

import Logo from "@/components/elements/Logo";
import Button from "@/components/elements/Button";
import * as Form from "@/components/forms";
import RightHero from "@/components/modules/RightHero";
import Heading from "@/components/elements/Heading";
import { getAuthSession } from "@/utils/auth";
import api from "@/utils/api";
import { Roles } from "@/utils/utils";

const RegisterPage = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const methods = useForm();

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (values) => {
    try {
      const res = await api.post("/api/auth/signup", {
        role: Roles.PROPONENT,
        ...values,
      });

      const data = res.data;

      if (!data) return;

      const signInResponse = await signIn("credentials", {
        redirect: false,
        username: values.username,
        password: values.password,
      });

      const signInError = signInResponse?.error;

      if (signInError) {
        setErrorMessage(signInError);
        return;
      }

      router.replace("/proponent/dashboard");

      setErrorMessage("");

      return signInResponse;
    } catch (error) {
      const errMsg = error?.response?.data?.message || "";
      setErrorMessage(errMsg);

      return error;
    }
  };

  return (
    <div className="h-[90vh] lg:h-screen">
      <div className="grid h-full lg:grid-cols-[58%_1fr] xl:grid-cols-2">
        {/* left */}
        <div className="grid pt-8 px-6 xl:pl-8 xl:pr-0 grid-rows-[54px_1fr]">
          <Logo />
          <div className="flex items-center">
            <div className="flex-1 max-w-sm mx-auto">
              <Heading
                as="h1"
                className="text-3xl font-bold text-center text-gray-800 mb-11"
                title="Create your account"
              />

              {errorMessage && <p className="mb-2 error-msg">{errorMessage}</p>}

              <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="space-y-4">
                    <Form.Group>
                      <Form.Input
                        name="first_name"
                        label="First name"
                        className="bg-gray-100"
                        validation={{
                          required: "This field is required",
                        }}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Input
                        name="last_name"
                        label="Last name"
                        className="bg-gray-100"
                        validation={{
                          required: "This field is required",
                        }}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Input
                        name="username"
                        label="Username"
                        autoComplete="on"
                        className="bg-gray-100"
                        validation={{
                          required: "This field is required",
                          minLength: {
                            value: 4,
                            message: "Username must have at least 4 characters",
                          },
                        }}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Input
                        type="password"
                        name="password"
                        label="Password"
                        className="bg-gray-100"
                        validation={{
                          required: "This field is required",
                          minLength: {
                            value: 6,
                            message: "Password must have at least 6 characters",
                          },
                        }}
                      />
                    </Form.Group>
                  </div>

                  <Button
                    type="submit"
                    className="w-full py-3 mt-8 text-sm text-white rounded-md bg-bc-primary disabled:bg-bc-primary/80"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <BeatLoader loading={true} size={6} color="white" />
                    ) : (
                      "Sign up"
                    )}
                  </Button>
                </form>
              </FormProvider>

              <Link href="/">
                <a className="block mt-6 text-sm font-medium text-center text-bc-primary/75 hover:underline">
                  Already have an account? Log in here!
                </a>
              </Link>
            </div>
          </div>
        </div>

        {/* right */}
        <RightHero />
      </div>
    </div>
  );
};

export default RegisterPage;

export const getServerSideProps = async (ctx) => {
  const session = await getAuthSession(ctx);
  const role = session?.user?.user_details?.role;

  if (session && role === Roles.PROPONENT) {
    return {
      redirect: {
        destination: "/proponent/dashboard",
        permanent: false,
      },
      props: { session },
    };
  }
  if (session && role === Roles.PERSONNEL) {
    return {
      redirect: {
        destination: "/personnel/research-innovation",
        permanent: false,
      },
      props: { session },
    };
  }
  if (session && role === Roles.ADMIN) {
    return {
      redirect: {
        destination: "/admin/dashboard",
        permanent: false,
      },
      props: { session },
    };
  }

  return { props: {} };
};
