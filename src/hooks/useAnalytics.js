import { useQuery } from "@tanstack/react-query";
import api from "@/utils/api";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-hot-toast";
import { useEffect } from "react";

const useAnalytics = (params) => {
  const { access_token } = useAuth();

  const getAnalytics = async (params) => {
    const { data } = await api.get(`/api/analytics`, {
      params,
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    return data;
  };

  const { data: analytics } = useQuery({
    queryKey: ["analytics", params],
    queryFn: () => getAnalytics(params),
    keepPreviousData: true,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

  const getResearchAnalytics = (status) => {
    if (analytics?.length === 0) return;
    const filteredStatus = analytics?.totalResearchByStatus?.find(
      (e) => e._id === status
    );

    const numberOfResearchByStatus = filteredStatus?.totalCount || 0;

    return numberOfResearchByStatus;
  };

  const getExtensionAnalytics = (status) => {
    if (analytics?.length === 0) return;
    const filteredStatus = analytics?.totalExtensionByStatus?.find(
      (e) => e._id === status
    );

    const numberOfExtensionsByStatus = filteredStatus?.totalCount || 0;

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
