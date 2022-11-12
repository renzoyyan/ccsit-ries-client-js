import { BellIcon } from "@heroicons/react/24/outline";
import { Disclosure } from "@headlessui/react";
import { XMarkIcon, Bars3Icon } from "@heroicons/react/24/solid";

import UserMobileMenu from "./UserMobileMenu";
import NavLink from "@/components/elements/links/NavLink";
import Logo from "@/components/elements/Logo";
import useRoles from "@/hooks/useRoles";
import { personnelNav, proponentNav, Roles } from "@/utils/utils";
import ProfileDropdown from "@/components/modules/ProfileDropdown";
import { signOut } from "next-auth/react";

const UserNavbar = () => {
  const { isPersonnel, isProponent } = useRoles();

  let navigationContent;

  if (isProponent) {
    navigationContent = proponentNav.map((item, idx) => (
      <NavLink key={idx} item={item} role={Roles.PERSONNEL} />
    ));
  }

  if (isPersonnel) {
    navigationContent = personnelNav.map((item, idx) => (
      <NavLink key={idx} item={item} role={Roles.PERSONNEL} />
    ));
  }

  return (
    <Disclosure as="nav" className="bg-white shadow">
      {({ open }) => (
        <>
          <div className="wrapper">
            <div className="relative flex justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center lg:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-bc-primary">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block w-6 h-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block w-6 h-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex items-center justify-center flex-1 lg:items-stretch lg:justify-start">
                <div className="flex items-center flex-shrink-0">
                  <Logo />
                </div>
                <div className="hidden lg:ml-6 lg:flex lg:space-x-8">
                  {navigationContent}
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 lg:static lg:inset-auto lg:ml-6 lg:pr-0">
                {isProponent ? (
                  <button
                    type="button"
                    className="p-1 text-gray-400 bg-white rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-bc-primary focus:ring-offset-2"
                  >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="w-6 h-6" aria-hidden="true" />
                  </button>
                ) : null}

                {/* Profile dropdown */}
                {isProponent ? (
                  <ProfileDropdown />
                ) : (
                  <button
                    type="button"
                    onClick={() => signOut()}
                    className="text-sm font-medium text-red-500 hover:underline"
                  >
                    Logout
                  </button>
                )}
              </div>
            </div>
          </div>

          <UserMobileMenu />
        </>
      )}
    </Disclosure>
  );
};

export default UserNavbar;
