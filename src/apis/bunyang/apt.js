import { useQuery } from "react-query";
import http from "../common/http-common";

//리스트
export const useAptListQuery = ({ params, onSuccess, onError }) => {
  return useQuery(
    ["basicList", params],
    () => {
      const { bubdong_code, sort, page } = params;
      return http.get(`/apt/basicList`, {
        params: { bubdong_code, sort, page },
      });
    },
    {
      staleTime: 20000,
      onSuccess,
      onError,
      keepPreviousData: true,
    }
  );
};

/* 그래프 */
export const useAptGraphQuery = ({ params, onSuccess, onError }) => {
  return useQuery(
    ["basicPreview", params],
    () => {
      const { bubdong_code } = params;
      return http.get(`/apt/basicPreview`, {
        params: { bubdong_code },
      });
    },
    {
      staleTime: 20000,
      onSuccess,
      onError,
      keepPreviousData: true,
    }
  );
};
