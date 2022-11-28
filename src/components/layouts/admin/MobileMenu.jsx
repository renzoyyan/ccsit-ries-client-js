import React from "react";
import { Transition, Dialog } from "@headlessui/react";
import { Fragment } from "react";
import Logo from "@/components/elements/Logo";
import { adminNav, personnelNav, proponentNav, Roles } from "@/utils/utils";
import Button from "@/components/elements/Button";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import NavLink from "../../elements/links/NavLink";
import useRoles from "@/hooks/useRoles";

const MobileMenu = ({ sidebarOpen, setSidebarOpen }) => {
  const { isAdmin, isPersonnel, isProponent } = useRoles();

  let navigationContent;

  // if (isProponent) {
  //   navigationContent = proponentNav.map((item, idx) => (
  //     <NavLink key={idx} item={item} />
  //   ));
  // }

  // if (isPersonnel) {
  //   navigationContent = personnelNav.map((item, idx) => (
  //     <NavLink key={idx} item={item} />
  //   ));
  // }

  // if (isAdmin) {
  //   navigationContent = adminNav.map((item, idx) => (
  //     <NavLink key={idx} item={item} />
  //   ));
  // }

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
            <Dialog.Panel className="relative flex flex-col flex-1 w-full max-w-xs pt-5 pb-4 bg-gray-900">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute top-0 right-0 pt-4 -mr-5">
                  <Button
                    className="flex items-center justify-center w-10 h-10 ml-1 rounded-full bg-bc-tertiary focus:outline-none focus:ring-2 focus:ring-inset focus:bg-bc-tertiary active:bg-white focus:ring-bc-tertiary"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <ChevronLeftIcon
                      className="w-5 h-5 -ml-0.5 text-white"
                      aria-hidden="true"
                    />
                  </Button>
                </div>
              </Transition.Child>
              <div className="flex items-center flex-shrink-0 px-6 mb-10">
                <Logo headingClassName="text-gray-100" />
              </div>
              <div className="flex-1 h-0 mt-5 overflow-y-auto">
                <nav className="px-6 space-y-5">
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
