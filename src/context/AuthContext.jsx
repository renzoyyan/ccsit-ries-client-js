import { createContext, useContext } from "react";
import { useSession } from "next-auth/react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { data: session } = useSession();

  const access_token = session?.user?.access_token;
  const current_user = session?.user?.user_details?._id;

  const contextValue = { access_token, current_user };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
