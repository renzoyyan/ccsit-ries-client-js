import { Menu, Transition } from "@headlessui/react";
import React from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { classNames } from "../../utils/utils";
import { useRouter } from "next/router";
import Button from "../elements/Button";
import { signOut } from "next-auth/react";

const ProfileDropdown = () => {
  const router = useRouter();

  return (
    <Menu as="div" className="relative ml-3">
      <div>
        <Menu.Button className="flex text-lg bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-bc-primary focus:ring-offset-2">
          <span className="sr-only">Open user menu</span>
          <img
            className="w-8 h-8 rounded-full"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
          />
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
        <Menu.Items className="absolute right-0 z-10 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <Menu.Item>
            {({ active }) => (
              <a
                onClick={() => router.push("/proponent/profile")}
                className={classNames(
                  "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                )}
              >
                Your Profile
              </a>
            )}
          </Menu.Item>
          <Menu.Item>
            <Button
              className={classNames("block px-4 py-2 text-sm text-gray-700")}
              onClick={() => signOut()}
            >
              Sign out
            </Button>
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default ProfileDropdown;
