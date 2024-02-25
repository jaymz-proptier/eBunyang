import { useQuery } from "react-query";
import http from "../common/http-common";

//리스트
export const usesiteReportListQuery = ({ params, onSuccess, onError }) => {
  return useQuery(
    ["usesiteReportListQuery", params],
    () => {
      const { mvi_ymd, bclass, sort, page, bubdong_code, bthema, min_price, max_price } = params;
      return http.get(`/siteReport/basicList`, {
        params: { mvi_ymd, bclass, sort, page, bubdong_code, bthema, min_price, max_price },
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
