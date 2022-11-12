import { useState } from "react";
import { useRouter } from "next/router";
import { useForm, FormProvider } from "react-hook-form";
import { getSession, signIn } from "next-auth/react";

import Logo from "@/components/elements/Logo";
import Heading from "@/components/elements/Heading";
import Button from "@/components/elements/Button";
import RightHero from "@/components/modules/RightHero";
import * as Form from "@/components/forms";
import { getAuthSession } from "@/utils/auth";
import { Roles } from "@/utils/utils";

const LoginPage = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const methods = useForm();

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const handleLogin = async (values) => {
    const { username, password } = values;

    try {
      const res = await signIn("credentials", {
        redirect: false,
        username,
        password,
      });

      const error = res?.error;

      if (error) {
        setErrorMessage(error);
        return;
      }

      const session = await getSession();
      const role = session?.user?.user_details?.role;

      if (role === Roles.ADMIN) router.replace("/admin/dashboard");
      if (role === Roles.PROPONENT) router.replace("/proponent/dashboard");
      if (role === Roles.PERSONNEL)
        router.replace("/personnel/research-innovation");

      setErrorMessage("");
      return res;
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
                className="text-4xl font-bold text-center text-gray-800 mb-11"
                title="Log in"
              />

              {errorMessage && <p className="mb-2 error-msg">{errorMessage}</p>}

              <FormProvider {...methods}>
                <form onSubmit={handleSubmit(handleLogin)}>
                  <div className="space-y-4">
                    <Form.Group>
                      <Form.Input
                        name="username"
                        label="Username"
                        autoComplete="on"
                        validation={{
                          required: "This field is required",
                        }}
                        className="bg-gray-100"
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Input
                        type="password"
                        name="password"
                        label="Password"
                        validation={{
                          required: "This field is required",
                        }}
                        className="bg-gray-100"
                      />
                    </Form.Group>
                  </div>

                  <Button
                    type="submit"
                    className="w-full py-3 mt-8 text-sm text-white rounded-md bg-bc-primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Signing in" : "Sign in"}
                  </Button>
                </form>
              </FormProvider>

              <a
                className="block mt-6 text-sm font-medium text-center cursor-pointer text-bc-primary/75 hover:underline"
                onClick={() => router.push("/signup")}
              >
                Are you a proponent? Sign up!
              </a>
            </div>
          </div>
        </div>

        {/* right */}
        <RightHero />
      </div>
    </div>
  );
};

export default LoginPage;

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
