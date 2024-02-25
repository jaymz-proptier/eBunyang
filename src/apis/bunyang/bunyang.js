import { useQuery } from "react-query";
import http from "../common/http-common";

//리스트
export const useBunyangListQuery = ({ params, onSuccess, onError }) => {
  return useQuery(
    ["useBunyangListQuery", params],
    () => {
      const {
        bubdong_code,
        bclass,
        supp_proc_step,
        supp_sclass,
        schdl_cd,
        bthema,
        min_price,
        max_price,
        min_house_cnt,
        max_house_cnt,
        min_scale,
        max_scale,
        sort,
        page,
      } = params;
      return http.get(`/bunyang/basicList`, {
        params: {
          bubdong_code,
          bclass,
          supp_proc_step,
          supp_sclass,
          schdl_cd,
          bthema,
          min_price,
          max_price,
          min_house_cnt,
          max_house_cnt,
          min_scale,
          max_scale,
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

//주소 리스트
export const useAddressListQuery = ({ params, onSuccess, onError }) => {
  return useQuery(
    ["AddressList", params],
    () => {
      const { bubdong_code } = params;
      return http.get(`/bunyang/addressList`, {
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

//주소(서브) 리스트
export const useAddressSubQuery = ({ params, onSuccess, onError }) => {
  return useQuery(
    ["useAddressSubQuery", params],
    () => {
      const { bubdong_code } = params;
      return http.get(`/bunyang/addressList`, {
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

//청약일정
export const useSchdlListQuery = ({ params, onSuccess, onError }) => {
  return useQuery(
    ["SchdlList", params],
    () => {
      const { start_ymd } = params;
      return http.get(`/bunyang/basicListSchdl`, {
        params: {
          start_ymd,
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

//청약일정달력
export const useSchdlDateQuery = ({ params, onSuccess, onError }) => {
  return useQuery(
    ["SchdlDate", params],
    () => {
      const { base_date } = params;
      return http.get(`/bunyang/basicListSchdlDate`, {
        params: {
          base_date,
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

//당첨가점
export const useListSrAreaDtlQuery = ({ params, onSuccess, onError }) => {
  return useQuery(
    ["ListSrAreaDtl", params],
    () => {
      const { bubdong_code } = params;
      return http.get(`/bunyang/basicListSrAreaDtl`, {
        params: {
          bubdong_code,
        },
      });
    },
    {
      staleTime: 1000,
      onSuccess,
      onError,
      keepPreviousData: true,
    }
  );
};

//분양리스트_미리보기
export const useListPreviewQuery = ({ onSuccess, onError }) => {
  return useQuery(
    ["useListPreviewQuery"],
    () => {
      return http.get(`/bunyang/basicListPreview`);
    },
    {
      staleTime: 20000,
      onSuccess,
      onError,
      keepPreviousData: true,
    }
  );
};

// 분양옵션 데이터
export const useBunyangOption = ({ params, onSuccess, onError }) => {
  return useQuery(
    ["basicDetailAptOption", params],
    () => {
      const { build_dtl_cd, py_cd } = params;
      return http.get(`/bunyang/basicDetailAptOption`, {
        params: { build_dtl_cd, py_cd },
      });
    },
    {
      staleTime: Infinity,
      onSuccess,
      onError,
      //keepPreviousData: true,
    }
  );
};
export const mapBoundingQuery  = async(params) =>  {
  try {
      const SYresponse = http.get("bunyang/basicListMap", {
          params: params,
      });
      return SYresponse;
  } catch(e) {
      console.log("error :", e);
  }
};

export const useBunyangDetailPreviewQuery = ({
  params,
  onSuccess,
  onError,
}) => {
  return useQuery(
    ["bunyangDetailPreview", params],
    () => {
      const { build_dtl_cd, supp_cd } = params;
      return http.get(`bunyang/basicDetailPreview`, {
        params: { build_dtl_cd, supp_cd },
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

export const useBasicComplexInfoQuery = ({ params, onSuccess, onError }) => {
  return useQuery(
    ["bunyangDetail", params],
    () => {
      const { build_dtl_cd, supp_cd, open } = params;
      return open
        ? http.get(`bunyang/basicDetail`, {
          params: { build_dtl_cd, supp_cd },
        })
        : { data: { result: "", read: "ok" } };
    },
    {
      staleTime: 60000,
      onSuccess,
      onError,
      keepPreviousData: true,
    }
  );
};
export const useBunyangAiQuery = ({ params, onSuccess, onError }) => {
  return useQuery(
    ["bunyangAi", params],
    () => {
      const { build_dtl_cd, supp_cd, open } = params;
      return open
        ? http.get(`bunyang/basicDetailAi`, {
          params: { build_dtl_cd, supp_cd },
        })
        : { data: { result: "", read: "ok" } };
    },
    {
      staleTime: 60000,
      onSuccess,
      onError,
      keepPreviousData: true,
    }
  );
};
export const useBunyangScaleQuery = ({ params, onSuccess, onError }) => {
  return useQuery(
    ["bunyangPlanInfo", params],
    () => {
      const { build_dtl_cd, supp_cd, open } = params;
      return open
        ? http.get(`bunyang/basicDetailScale`, {
          params: { build_dtl_cd, supp_cd },
        })
        : { data: { result: "", read: "ok" } };
    },
    {
      staleTime: 60000,
      onSuccess,
      onError,
      keepPreviousData: true,
    }
  );
};

// 분양옵션 타이틀 데이터
export const useBunyangOptionTitle = ({ params, onSuccess, onError }) => {
  return useQuery(
    ["basicDetailBunyangOptionTitle", params],
    () => {
      const { build_dtl_cd, supp_cd } = params;
      return http.get(`/bunyang/basicDetailPreview`, {
        params: { build_dtl_cd, supp_cd },
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

//분양상세_동호정보
export const useBunyangDonghoQuery = ({ params, onSuccess, onError }) => {
  return useQuery(
    ["useBunyangDonghoQuery", params],
    () => {
      const { build_dtl_cd, dong_nm } = params;
      return http.get(`/bunyang/basicDetailDongho`, {
        params: { build_dtl_cd, dong_nm },
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

export const useBunyangRestrictQuery = ({ params, onSuccess, onError }) => {
  return useQuery(
    ["basicDetailRestrict", params],
    () => {
      const { keyword } = params;
      return http.get(`/bunyang/basicDetailRestric`, {
        params: { keyword },
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
