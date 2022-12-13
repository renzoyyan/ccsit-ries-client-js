import { useQuery } from "@tanstack/react-query";
import api from "@/utils/api";
import { useAuth } from "@/context/AuthContext";
import moment from "moment";

const useAnalytics = (date) => {
  const { access_token } = useAuth();

  const getAnalytics = async (date) => {
    const { data } = await api.get(`/api/analytics?date=${date}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    return data;
  };

  const filterDate = moment(date).format();

  const { data: analytics } = useQuery({
    queryKey: ["analytics", filterDate],
    queryFn: () => getAnalytics(filterDate),
    keepPreviousData: true,
  });

  const getResearchAnalytics = (month, status) => {
    const numberOfResearchByMonth = analytics?.research?.filter(
      (r) => moment(r.created_at).format("MMMM") === month
    );

    const numberOfResearchByStatus = numberOfResearchByMonth?.filter(
      (r) => r.status === status
    )?.length;

    return numberOfResearchByStatus;
  };

  const getExtensionAnalytics = (month, status) => {
    const numberOfResearchByMonth = analytics?.extension?.filter(
      (r) => moment(r.created_at).format("MMMM") === month
    );

    const numberOfResearchByStatus = numberOfResearchByMonth?.filter(
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
