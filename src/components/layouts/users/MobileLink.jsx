import React from "react";
import Link from "next/link";
import { classNames } from "@/utils/utils";
import { Disclosure } from "@headlessui/react";
import { useRouter } from "next/router";

const MobileLink = ({ item }) => {
  const router = useRouter();

  const classes = {
    current: "text-bc-primary border-bc-primary bg-indigo-50 rounded-md",
    default:
      "text-gray-500 border-transparent hover:border-gray-300 hover:bg-gray-100 hover:text-gray-700 hover:rounded-md",
  };

  return (
    <Link href={item.href}>
      <Disclosure.Button
        as="a"
        className={classNames(
          router.pathname.startsWith(item.href)
            ? classes.current
            : classes.default,
          "block py-3 pl-3 pr-4 text-base font-medium cursor-pointer"
        )}
      >
        {item.name}
      </Disclosure.Button>
    </Link>
  );
};

export default MobileLink;
