import React from "react";
import { Transition, Dialog } from "@headlessui/react";
import { Fragment } from "react";
import Logo from "@/components/elements/Logo";
import { adminNav, personnelNav, proponentNav, Roles } from "@/utils/utils";
import Button from "@/components/elements/Button";
import {
  Bars3BottomLeftIcon,
  ChevronLeftIcon,
} from "@heroicons/react/24/solid";
import NavLink from "../../elements/links/NavLink";
import useRoles from "@/hooks/useRoles";

const MobileMenu = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <Transition.Root show={sidebarOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-40 lg:hidden"
        onClose={setSidebarOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
        </Transition.Child>

        <div className="fixed inset-0 z-40 flex">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <Dialog.Panel className="relative flex flex-col flex-1 w-full max-w-xs pt-5 pb-4 bg-white">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="flex items-center justify-between flex-shrink-0 px-6 mb-10">
                  <Logo />
                  <Button onClick={() => setSidebarOpen(false)}>
                    <span className="sr-only">Close sidebar</span>
                    <Bars3BottomLeftIcon
                      className="w-6 h-6"
                      aria-hidden="true"
                    />
                  </Button>
                </div>
              </Transition.Child>

              <div className="flex-1 h-0 mt-5 overflow-y-auto">
                <nav className="px-4 space-y-4">
                  {adminNav.map((nav, idx) => (
                    <NavLink key={idx} item={nav} role={Roles.ADMIN} />
                  ))}
                </nav>
              </div>
            </Dialog.Panel>
          </Transition.Child>
          <div className="flex-shrink-0 w-14">
            {/* Dummy element to force sidebar to shrink to fit close icon */}
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default MobileMenu;
