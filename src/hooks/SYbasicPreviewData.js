import React from "react";
import { useQuery } from "react-query";
import axios from "axios";


export default function SYbasicPreviewData(build_dtl_cd, supp_cd) {
    const { data, isLoading, error } = useQuery([ build_dtl_cd, supp_cd ], () => axios.get(`https://test-api.ebunyang.co.kr/v2/bunyang/BasicPreview?build_dtl_cd=${build_dtl_cd}&supp_cd=${supp_cd}`), "");

    if(data) return data.data.result;
}