import { useState } from "react";
import { Bars3BottomLeftIcon, BellIcon } from "@heroicons/react/24/outline";

import MobileMenu from "./MobileMenu";
import Button from "@/components/elements/Button";
import ProfileDropdown from "@/components/layouts/users/ProfileDropdown";
import AdminNotification from "./AdminNotification";
import AdminProfileDropdown from "./AdminProfileDropdown";

const AdminNavbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="relative pb-4 bg-white border-b border-gray-200">
      <header className="sticky top-0 z-10 flex flex-shrink-0 h-16 pt-4 lg:px-10 wrapper">
        <Button
          className="pr-4 text-gray-500 focus:outline-none lg:hidden"
          onClick={() => setSidebarOpen((prev) => !prev)}
        >
          <span className="sr-only">Open sidebar</span>
          <Bars3BottomLeftIcon className="w-6 h-6" aria-hidden="true" />
        </Button>
        <div className="flex justify-end flex-1 pl-4 md:px-0">
          <div className="flex items-center ml-4 md:ml-6">
            <AdminNotification />

            {/* Profile dropdown */}
            <AdminProfileDropdown />
          </div>
        </div>
      </header>

      <MobileMenu sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
    </div>
  );
};

export default AdminNavbar;
