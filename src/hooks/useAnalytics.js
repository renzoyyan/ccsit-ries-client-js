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
    refetchOnWindowFocus: false,
  });

  const getResearchAnalytics = (status) => {
    if (!analytics) return;
    const filteredStatus = analytics?.totalResearchByStatus?.filter(
      (r) => r._id === status
    );

    const numberOfResearchByStatus = filteredStatus[0]?.totalCount || 0;

    return numberOfResearchByStatus;
  };

  const getExtensionAnalytics = (status) => {
    if (!analytics) return;
    const filteredStatus = analytics?.totalExtensionByStatus?.filter(
      (e) => e._id === status
    );

    const numberOfExtensionsByStatus = filteredStatus[0]?.totalCount || 0;

    return numberOfExtensionsByStatus;
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
