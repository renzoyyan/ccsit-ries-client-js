import { Fragment, useState } from "react";
import { Bars3BottomLeftIcon, BellIcon } from "@heroicons/react/24/outline";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { userNavigation, classNames } from "@/utils/utils";
import MobileMenu from "./MobileMenu";
import Button from "@/components/elements/Button";
import ProfileDropdown from "@/components/modules/ProfileDropdown";

const AdminNavbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="relative">
      <header className="sticky top-0 z-10 flex flex-shrink-0 h-16 pt-4 bg-transparent lg:pt-8">
        <Button
          className="pr-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-tertiary lg:hidden"
          onClick={() => setSidebarOpen((prev) => !prev)}
        >
          <span className="sr-only">Open sidebar</span>
          <Bars3BottomLeftIcon className="w-6 h-6" aria-hidden="true" />
        </Button>
        <div className="flex justify-end flex-1 pl-4 md:px-0">
          <div className="flex items-center ml-4 md:ml-6">
            <Button className="p-1 text-gray-400 bg-white rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-bc-tertiary focus:ring-offset-2">
              <span className="sr-only">View notifications</span>
              <BellIcon className="w-6 h-6" aria-hidden="true" />
            </Button>

            {/* Profile dropdown */}
            <ProfileDropdown />
          </div>
        </div>
      </header>

      <MobileMenu sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
    </div>
  );
};

export default AdminNavbar;
