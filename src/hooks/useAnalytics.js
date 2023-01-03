import { useQuery } from "@tanstack/react-query";
import api from "@/utils/api";
import { useAuth } from "@/context/AuthContext";
import moment from "moment";

const useAnalytics = (period) => {
  const { access_token } = useAuth();

  const getAnalytics = async (period) => {
    const { data } = await api.get(`/api/analytics?period=${period}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    return data;
  };

  const { data: analytics } = useQuery({
    queryKey: ["analytics", period],
    queryFn: () => getAnalytics(period),
    keepPreviousData: true,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  const getResearchAnalytics = (status) => {
    // const numberOfResearchByMonth = analytics?.research?.filter(
    //   (r) => moment(r.created_at).format("MMMM") === month
    // );

    const numberOfResearchByStatus = analytics?.research?.filter(
      (r) => r.status === status
    )?.length;

    return numberOfResearchByStatus;
  };

  const getExtensionAnalytics = (status) => {
    // const numberOfResearchByMonth = analytics?.extension?.filter(
    //   (r) => moment(r.created_at).format("MMMM") === month
    // );

    const numberOfResearchByStatus = analytics?.extension?.filter(
      (r) => r.status === status
    )?.length;

    return numberOfResearchByStatus;
  };

  const totalResearch = analytics?.totalResearch;
  const totalExtension = analytics?.totalExtension;
  const totalUsers = analytics?.totalUsers;
  const verifiedUsers = analytics?.verifiedUsers;

  return {
    totalResearch,
    totalExtension,
    totalUsers,
    verifiedUsers,
    getResearchAnalytics,
    getExtensionAnalytics,
  };
};

export default useAnalytics;
