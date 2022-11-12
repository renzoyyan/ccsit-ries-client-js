import { useRouter } from "next/router";

const useRoles = () => {
  const router = useRouter();
  const isAdmin = router.pathname.startsWith("/admin");
  const isProponent = router.pathname.startsWith("/proponent");
  const isPersonnel = router.pathname.startsWith("/personnel");

  return {
    isAdmin,
    isPersonnel,
    isProponent,
  };
};

export default useRoles;
