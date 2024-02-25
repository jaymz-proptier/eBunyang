import { useQuery } from "react-query";
import http from "../common/http-common";

//리스트
export const useTipListQuery = ({ params, onSuccess, onError }) => {
  return useQuery(
    ["useTipListQuery", params],
    () => {
      const { category, step_cd, sort, page } = params;
      return http.get(`/tip/basicList`, {
        params: { category, step_cd, sort, page },
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

//리스트_미리보기
export const useTipListPreviewQuery = ({ params, onSuccess, onError }) => {
  return useQuery(
    ["basicListPreview", params],
    () => {
      const { category } = params;
      return http.get(`/tip/basicListPreview`, {
        params: { category },
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

//상세정보
export const useTipDetailQuery = ({ params, onSuccess, onError }) => {
  return useQuery(
    ["basicDetail", params],
    () => {
      const { blog_cd } = params;
      return http.get(`/tip/basicDetail`, {
        params: { blog_cd },
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

//카테고리
export const useTipCategoryQuery = ({ onSuccess, onError }) => {
  return useQuery(
    ["basicCategory"],
    () => {
      return http.get(`/tip/basicCategory`);
    },
    {
      staleTime: 20000,
      onSuccess,
      onError,
      keepPreviousData: true,
    }
  );
};
