import React from "react";

import MainContent from "@/components/modules/MainContent";
import UserNavbar from "./UserNavbar";

const UserLayout = ({ children }) => {
  return (
    <>
      <UserNavbar />
      <MainContent className="pb-10 wrapper">{children}</MainContent>
    </>
  );
};

export default UserLayout;
