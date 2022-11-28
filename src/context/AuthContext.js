import { createContext, useContext, useRef } from "react";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import api from "@/utils/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { data: session } = useSession();
  const socketRef = useRef(null);

  const access_token = session?.user?.access_token;
  const current_user = session?.user?.user_details?._id;
  const current_role = session?.user?.user_details?.role;

  const getUserById = async (user_id) => {
    const { data } = await api.get(`/api/users/${user_id}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    return data;
  };

  const { data: user } = useQuery({
    queryKey: ["user", current_user],
    queryFn: () => getUserById(current_user),
    enabled: !!session,
  });

  const contextValue = {
    access_token,
    current_user,
    current_role,
    user,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
