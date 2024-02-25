import React from "react";
import { useLocation, Link } from "react-router-dom";
import queryString from "query-string";
import { useQuery } from "react-query";
import axios from "axios";
import { usePath } from "../../shared/contexts/SYpath";
import { SYnumberFormat } from "../../hooks";

function YJpreInfo({ SYdata }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const biz_no = searchParams.get("biz_no") ?? "";
  const build_dtl_cd = searchParams.get("build_dtl_cd") ?? "";

  const { data, refetch } = usebasicDetailDanjiQuery({
    params: {
      biz_no: biz_no,
      build_dtl_cd: build_dtl_cd,
    },
    onSuccess: (data) => {
      console.log("Success[usebasicDetailDanjiQuery]", data);
    },
    onError: (error) => {
      console.log("Error[usebasicDetailDanjiQuery]", error);
    },
  });
  if (data) {
    const SYdata = data.data.result;
    return <></>;
  }
  // return (
  //     <div className="articleContent">
  //       <YJpreInfo />
  //     </div>
  //   );
}
export default YJpreInfo;
