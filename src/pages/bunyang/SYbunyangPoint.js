import React, { useState, useEffect } from "react";
import { useListSrAreaDtlQuery } from "../../apis/bunyang/bunyang";
import { useRecoilValue } from "recoil";
import { bunyangFilterState } from "../../recoils/bunyang";

function SYbunyangPoint() {
  
  const SYbubdong = useRecoilValue(bunyangFilterState);
  const [SYdata, setSYdata] = useState([]);

  const { data, isLoading, refetch } = useListSrAreaDtlQuery({
    params: {
      bubdong_code: SYbubdong.bubdong.value.substr(0, 2),
    },
    onSuccess: (data) => {
      setSYdata(data.data.result.detail);
    },
    onError: (error) => {
      console.log("Error[useListSrAreaDtlQuery]", error);
    },
  });

  useEffect(() => {
    refetch();
  }, [SYbubdong.bubdong.value]);

  if (isLoading) return "";

  return (
    <div className="SYbunyangPointWrap">
      <div className="pointInfo">
        <div className="pointTitle">
          <strong className="areaInfo">{SYdata.sido}</strong>
          <h3 className="title">
            <label>청약 </label>당첨 가점 평균
          </h3>
        </div>
        <p className="caption">
          <i className="SYicon"></i>최근 1년 분양단지 기준
        </p>
        <span className="mobileIcon">
          <i className="SYicon"></i>
        </span>
        <strong className="point">{SYdata.py_sr_point_avg}점</strong>
      </div>
    </div>
  );
}

export default SYbunyangPoint;
