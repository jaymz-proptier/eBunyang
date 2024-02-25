import { useQuery } from "react-query";
import http from "../common/http-common";

//리스트
export const useDevelopListQuery = ({ params, onSuccess, onError }) => {
  return useQuery(
    ["useDevelopListQuery", params],
    () => {
      const { bubdong_code, biz_type_cd, biz_step_cd, sort, page } = params;
      return http.get(`/developBiz/basicList`, {
        params: {
          bubdong_code,
          biz_type_cd,
          biz_step_cd,
          sort,
          page,
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

//개발사업리스트_개발사업현황
export const useDevelopListChartQuery = ({ params, onSuccess, onError }) => {
  return useQuery(
    ["useDevelopListChartQuery", params],
    () => {
      const { bubdong_code } = params;
      return http.get(`/developBiz/basicListChart`, {
        params: {
          bubdong_code,
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

//개발사업리스트_미리보기
export const useDevelopListPreviewQuery = ({ onSuccess, onError }) => {
  return useQuery(
    ["useDevelopListPreviewQuery"],
    () => {
      return http.get(`/developBiz/basicListPreview`);
    },
    {
      staleTime: 20000,
      onSuccess,
      onError,
      keepPreviousData: true,
    }
  );
};

//개발사업상세_기본정보
export const useDevelopDetailQuery = ({ params, onSuccess, onError }) => {
  return useQuery(
    ["useDevelopDetailQuery", params],
    () => {
      const { biz_no } = params;
      return http.get(`/developBiz/basicDetail`, {
        params: {
          biz_no,
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
