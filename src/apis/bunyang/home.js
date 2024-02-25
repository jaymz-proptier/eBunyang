import { useQuery } from "react-query";
import http from "../common/http-common";

//메인 전체 화면
export const useHomeQuery = ({ onSuccess, onError }) => {
  return useQuery(
    ["useHomeQuery"],
    () => {
      return http.get(`/home/basicPreview`);
    },
    {
      staleTime: 20000,
      onSuccess,
      onError,
      keepPreviousData: true,
    }
  );
};