import { CheckCircleIcon } from "@heroicons/react/24/solid";
import React, { useEffect } from "react";
import Heading from "@/components/elements/Heading";
import Link from "next/link";
import { useRouter } from "next/router";
const VerifyEmailPage = ({ data, email }) => {
  return (
    <div className="max-w-lg mx-auto mt-28">
      <div className="p-8 text-center bg-white rounded-md shadow-sm">
        <CheckCircleIcon className="mx-auto text-green-500 w-28 h-28" />

        <Heading
          as="h1"
          title="Email address verified!"
          className="mt-8 text-xl font-semibold lg:text-2xl"
        />

        <p className="text-gray-600">
          Your email{" "}
          <span className="font-medium text-bc-tertiary"> {email}</span> has
          been verified.
        </p>

        <Link href={"/"}>
          <div className="w-full py-3 mt-8 cursor-pointer btn btn-primary">
            Back to login
          </div>
        </Link>
      </div>
    </div>
  );
};

export default VerifyEmailPage;

export const getServerSideProps = async (ctx) => {
  const { query } = ctx;
  const { accessToken: access_token, email } = query;

  const res = await fetch(`${process.env.CCSIT_RIES}/api/users/verify-email`, {
    method: "PATCH",
    body: JSON.stringify({ access_token }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
  });

  const data = await res.json();

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
