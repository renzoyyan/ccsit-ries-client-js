import { Menu, Transition } from "@headlessui/react";
import React from "react";
import { UserIcon } from "@heroicons/react/24/solid";
import { classNames } from "@/utils/utils";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Avatar from "@/assets/images/avatar.svg";
import { useAuth } from "@/context/AuthContext";

const ProfileDropdown = () => {
  const router = useRouter();
  const { user } = useAuth();

  return (
    <Menu as="div" className="relative ml-3">
      <div>
        <Menu.Button className="flex text-lg bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-bc-primary focus:ring-offset-2">
          <span className="sr-only">Open user menu</span>
          <Image
            width={32}
            height={32}
            className="rounded-full"
            src={user?.image?.url ?? Avatar}
            alt={user?.first_name + " " + user?.last_name}
            objectFit="cover"
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
        <Menu.Items className="absolute right-0 z-10 w-56 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="w-full divide-y divide-y-gray-300">
            <Menu.Item>
              {({ active }) => (
                <a
                  onClick={() => router.push("/proponent/profile")}
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
                <ArrowLeftOnRectangleIcon className="w-5 h-5 text-gray-700" />
                <span className="flex-1">Sign out</span>
              </a>
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default ProfileDropdown;
