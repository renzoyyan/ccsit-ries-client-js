import { Disclosure } from "@headlessui/react";
import React from "react";
import useRoles from "@/hooks/useRoles";
import { proponentNav, personnelNav } from "@/utils/utils";
import MobileLink from "./MobileLink";

const UserMobileMenu = () => {
  const { isPersonnel, isProponent } = useRoles();

  let mobileMenuContent;

  if (isProponent) {
    mobileMenuContent = proponentNav.map((item, idx) => (
      <MobileLink item={item} key={idx} />
    ));
  }
  if (isPersonnel) {
    mobileMenuContent = personnelNav.map((item, idx) => (
      <MobileLink item={item} key={idx} />
    ));
  }

  return (
    <Disclosure.Panel className="lg:hidden">
      <div className="pt-2 pb-4 space-y-1 wrapper">
        {/* Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" */}
        {mobileMenuContent}
      </div>
    </Disclosure.Panel>
  );
};

export default UserMobileMenu;
