import { useQuery } from "react-query";
import http from "../common/http-common";

//3기신도시_메인
export const usePhase3ListMainQuery = ({ onSuccess, onError }) => {
  return useQuery(
    ["usePhase3ListMainQuery"],
    () => {
      return http.get(`/phase3/basicListMain`);
    },
    {
      staleTime: 20000,
      onSuccess,
      onError,
      keepPreviousData: true,
    }
  );
};

//3기신도시_개발사업_미리보기
export const usePhase3PreviewBizQuery = ({ params, onSuccess, onError }) => {
  return useQuery(
    ["usePhase3PreviewBizQuery", params],
    () => {
      const { biz_no } = params;
      return http.get(`/phase3/basicPreviewBiz`, {
        params: { biz_no },
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

//3기신도시_개발사업상세
export const usePhase3DetailBizQuery = ({ params, onSuccess, onError }) => {
  return useQuery(
    ["usePhase3DetailBizQuery", params],
    () => {
      const { biz_no } = params;
      return http.get(`/phase3/basicDetailBiz`, {
        params: { biz_no },
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

//3기신도시_단지정보_미리보기
export const usePhase3PreviewDanjiQuery = ({ params, onSuccess, onError }) => {
  return useQuery(
    ["usePhase3PreviewDanjiQuery", params],
    () => {
      const { biz_no, build_dtl_cd } = params;
      return http.get(`/phase3/basicPreviewDanji`, {
        params: { biz_no, build_dtl_cd },
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

//3기신도시_단지정보_사전청약정보
export const usePhase3DetailDanjiPreQuery = ({
  params,
  onSuccess,
  onError,
}) => {
  return useQuery(
    ["usePhase3DetailDanjiPreQuery", params],
    () => {
      const { biz_no, build_dtl_cd } = params;
      return http.get(`/phase3/basicDetailDanjiPre`, {
        params: { biz_no, build_dtl_cd },
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

//3기신도시_단지정보_본청약정보
export const usePhase3DetailDanjiBonQuery = ({
  params,
  onSuccess,
  onError,
}) => {
  return useQuery(
    ["usePhase3DetailDanjiBonQuery", params],
    () => {
      const { biz_no, build_dtl_cd } = params;
      return http.get(`/phase3/basicDetailDanjiBon`, {
        params: { biz_no, build_dtl_cd },
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

//3기신도시_단지정보_이미지
export const useDetailDanjiCollectionQuery = ({
  params,
  onSuccess,
  onError,
}) => {
  return useQuery(
    ["useDetailDanjiCollectionQuery", params],
    () => {
      const { biz_no, build_dtl_cd } = params;
      return http.get(`/phase3/basicDetailDanjiCollection`, {
        params: { biz_no, build_dtl_cd },
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

/////////////////////

//리스트
export const useNewcityListQuery = ({ params, onSuccess, onError }) => {
  return useQuery(
    ["useNewcityListQuery", params],
    () => {
      const { biz_no } = params;
      return http.get(`/phase3/basicPreviewBiz`, {
        params: { biz_no },
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

//청약정보
export const useDetailBizQuery = ({ params, onSuccess, onError }) => {
  return useQuery(
    ["useDetailBizQuery", params],
    () => {
      const { biz_no } = params;
      return http.get(`/phase3/basicDetailBiz`, {
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

//단지정보
export const usebasicDetailDanjiQuery = ({ params, onSuccess, onError }) => {
  return useQuery(
    ["basicPreviewDanji", params],
    () => {
      const { biz_no, build_dtl_cd } = params;
      return http.get(`/phase3/basicPreviewDanji`, {
        params: {
          biz_no,
          build_dtl_cd,
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

//사전청약정보
export const usebasicDetailDanjiPreQuery = ({ params, onSuccess, onError }) => {
  return useQuery(
    ["basicDetailDanjiPre", params],
    () => {
      const { biz_no, build_dtl_cd } = params;
      return http.get(`/phase3/basicDetailDanjiPre`, {
        params: {
          biz_no,
          build_dtl_cd,
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

//본청약정보
export const usebasicDetailDanjiBonQuery = ({ params, onSuccess, onError }) => {
  return useQuery(
    ["basicDetailDanjiBon", params],
    () => {
      const { biz_no, build_dtl_cd } = params;
      return http.get(`/phase3/basicDetailDanjiBon`, {
        params: {
          biz_no,
          build_dtl_cd,
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
