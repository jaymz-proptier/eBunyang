import React, { useState, useEffect } from "react";
import { usePhase3DetailDanjiPreQuery } from "../../apis/bunyang/newcity";
import { YJplanInfo } from "../newCity";

const YJdanjiSubsrInfo = React.memo(({ biz_no, build_dtl_cd }) => {
  if (!biz_no) return "";
  if (!build_dtl_cd) return "";

  const [SYdata, setSYdata] = useState();
  const { data, refetch } = usePhase3DetailDanjiPreQuery({
    params: {
      biz_no: biz_no,
      build_dtl_cd: build_dtl_cd,
    },
    onSuccess: (data) => {
      setSYdata(data.data.result);
    },
    onError: (error) => {
      console.log("Error[usePhase3DetailDanjiPreQuery]", error);
    },
  });

  useEffect(() => {
    refetch();
  }, [biz_no, build_dtl_cd]);

  if (!SYdata) return "";

  return (
    <div className="detailTabpanel preInfo" aria-hidden="false" role="tabpanel" tabIndex={0}>
      <div className="tabContentWrap">
        <div className="articleWrap">
          <div className="articleTitle">
            <div className="title">공급정보</div>
          </div>
          <div className="articleContent">
            <div className="tableWrap">
              <div className="tableContent">
                <div className="tableRow">
                  <div className="tableDataWrap">
                    <div className="tableData">사전청약 경쟁률</div>
                  </div>
                  <div className="tableDataWrap">
                    <div className="tableData" aria-label="colorBlue">
                      {SYdata.danjiSubsrInfo?.py_sr_rate} : 1
                    </div>
                  </div>
                </div>

                <div className="tableRow">
                  <div className="tableDataWrap">
                    <div className="tableData">사전청약 공급세대수</div>
                  </div>
                  <div className="tableDataWrap">
                    <div className="tableData"> {SYdata.danjiSubsrInfo?.subsr_supp_cnt} 세대</div>
                  </div>
                </div>

                <div className="tableRow">
                  <div className="tableDataWrap">
                    <div className="tableData">공고문</div>
                  </div>
                  <div className="tableDataWrap">
                    <div className="tableData">
                      <a href={SYdata.danjiSubsrInfo?.new_notif_info_url} className="downloadBtn" target="_blank" rel="noopener noreferrer">
                        <i className="Icon_download"></i>입주자 모집공고문
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="articleWrap schedule">
          <div className="articleTitle">
            <div className="title">사전청약 일정</div>
          </div>
          <div className="articleContent">
            <div className="tableWrap">
              <div className="tableContent">
                {SYdata.schdlList.map((YJdata, index) => (
                  <div key={index} className="tableRow" aria-label={YJdata.status_yn === "W" ? "예정" : YJdata.status_yn === "Y" ? "진행" : YJdata.status_yn === "N" ? "완료" : null}>
                    <div className="tableDataWrap">
                      <div className="tableData">{YJdata.schdl_code}</div>
                    </div>
                    <div className="tableDataWrap">
                      <div className="tableData">{YJdata.schdl_date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {SYdata.scaleList.length > 0 ? <YJplanInfo SYdata={SYdata.scaleList} /> : null}
      </div>
    </div>
  );
});

export default YJdanjiSubsrInfo;
