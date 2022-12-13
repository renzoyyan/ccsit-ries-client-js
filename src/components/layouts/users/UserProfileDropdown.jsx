import { Menu, Transition } from "@headlessui/react";
import React from "react";
import { ChevronDownIcon, UserIcon } from "@heroicons/react/24/solid";
import { classNames } from "@/utils/utils";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";
import {
  ArrowLeftOnRectangleIcon,
  PowerIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Avatar from "@/assets/images/avatar.svg";
import { useAuth } from "@/context/AuthContext";
import useRoles from "@/hooks/useRoles";

const UserProfileDropdown = () => {
  const router = useRouter();
  const { user } = useAuth();
  const { isProponent } = useRoles();

  return (
    <Menu as="div" className="relative ml-3">
      <div>
        <Menu.Button className="flex items-center text-lg bg-white rounded-full gap-x-2 focus:outline-none focus:ring-2 focus:ring-bc-primary focus:ring-offset-2">
          <span className="sr-only">Open user menu</span>
          <Image
            width={35}
            height={35}
            className="rounded-full"
            src={user?.image?.url ?? Avatar}
            alt={user?.first_name + " " + user?.last_name}
            objectFit="cover"
          />

          <div className="text-left capitalize">
            <h4 className="-mb-2 text-sm font-medium">{`${
              user?.first_name ?? ""
            } ${user?.last_name ?? ""}`}</h4>
            <span className="inline-block text-xs text-gray-500">
              {user?.role ?? ""}
            </span>
          </div>

          <ChevronDownIcon className="w-5 h-5 text-gray-600" />
        </Menu.Button>
      </div>
      <Transition
        as={React.Fragment}
        enter="transition ease-out duration-200"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 w-56 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="w-full divide-y divide-y-gray-300">
            <Menu.Item>
              {({ active }) => (
                <a
                  onClick={() => {
                    if (!isProponent) return router.push("/personnel/profile");

                    router.push("/proponent/profile");
                  }}
                  className={classNames(
                    "flex items-center gap-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                  )}
                >
                  <UserIcon className="w-5 h-5 text-gray-700" />
                  <span className="flex-1">My Profile</span>
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              <a
                className={classNames(
                  "flex items-center gap-x-2 px-4 py-2 text-sm text-gray-700 cursor-pointer  hover:bg-gray-100"
                )}
                onClick={() => signOut()}
              >
                <PowerIcon className="w-5 h-5 text-gray-700" />
                <span className="flex-1">Sign out</span>
              </a>
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default UserProfileDropdown;
