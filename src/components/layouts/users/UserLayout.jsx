import React, { useEffect, useRef } from "react";

import MainContent from "@/components/modules/MainContent";
import UserNavbar from "./UserNavbar";
import { useAuth } from "@/context/AuthContext";

const UserLayout = ({ children }) => {
  return (
    <>
      <UserNavbar />
      <MainContent className="pb-10 wrapper">{children}</MainContent>
    </>
  );
};

export default UserLayout;
