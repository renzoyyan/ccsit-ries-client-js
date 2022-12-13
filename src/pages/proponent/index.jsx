import Image from "next/image";
import React from "react";

import Heading from "@/components/elements/Heading";
import Link from "next/link";
import {
  DocumentDuplicateIcon,
  RectangleStackIcon,
} from "@heroicons/react/24/outline";
import { getAuthSession } from "@/utils/auth";
import { Roles } from "@/utils/utils";
import UserNavbar from "@/components/layouts/users/UserNavbar";

const PatientHomePage = () => {
  return (
    <div className="h-screen overflow-y-hidden">
      <UserNavbar showLinks={false} />
      <div className="bg-gradient-to-tr from-[#d3e4ff] to-[#eff3f5] h-full">
        <div className="flex items-center justify-center h-full">
          <div className="mb-16 text-center">
            <Image
              src={"/assets/logo.svg"}
              alt="CCSIT - RIES"
              width={300}
              height={300}
              className="w-auto h-auto"
            />

            <Heading
              as="h1"
              title="Welcome!"
              className="mt-4 text-2xl font-bold xl:text-3xl 2xl:text-5xl text-bc-primary"
            />

            <p className="mt-5 text-xl font-semibold text-gray-700 2xl:text-2xl">
              Share your <span className="text-bc-secondary">ideas</span> and
              make a <span className="text-bc-tertiary">change</span>.
            </p>

            <div className="mt-10 space-x-4 space-y-4">
              <Link href="/proponent/research-innovation">
                <a className="inline-flex items-center justify-center px-10 py-5 font-medium text-white bg-blue-500 rounded-md gap-x-2 hover:bg-blue-600">
                  <DocumentDuplicateIcon className="w-5 h-5 text-white" />
                  <span> Research & Innovation</span>
                </a>
              </Link>
              <Link href="/proponent/extension-services">
                <a className="inline-flex items-center justify-center px-10 py-5 font-medium text-white bg-blue-500 rounded-md gap-x-2 hover:bg-blue-600">
                  <RectangleStackIcon className="w-5 h-5 text-white" />
                  <span> Extension Services</span>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientHomePage;

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

  if (session && role !== Roles.PROPONENT) {
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
