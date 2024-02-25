import { useQuery } from "react-query";
import http from "../common/http-common";

//리스트
export const usemoveInListQuery = ({ params, onSuccess, onError }) => {
  return useQuery(
    ["basicList", params],
    () => {
      const { mvi_ymd, bclass, sort, page, bubdong_code } = params;
      return http.get(`/moveIn/basicList`, {
        params: { mvi_ymd, bclass, sort, page, bubdong_code },
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

//상세페이지
export const usemoveInDetailQuery = ({ params, onSuccess, onError }) => {
  return useQuery(
    ["basicDetail", params],
    () => {
      const { move_in_cd } = params;
      return http.get(`/moveIn/basicDetail`, {
        params: { move_in_cd },
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

export const usemoveInRegion = ({ params, onSuccess, onError }) => {
  return useQuery(
    ["addressList", params],
    () => {
      const { bubdong_code } = params;
      return http.get(`/bunyang/addressList`, {
        params: {
          bubdong_code
        },
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


