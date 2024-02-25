import React, { useState, useEffect } from "react";
import { usePhase3DetailDanjiBonQuery } from "../../apis/bunyang/newcity";
import { YJplanBonInfo } from "../newCity";

// function YJdanjiBonInfo({ SYdata }) {

const YJdanjiBonInfo = React.memo(({ biz_no, build_dtl_cd }) => {
  if (!biz_no) return "";
  if (!build_dtl_cd) return "";

  const [SYdata, setSYdata] = useState();
  const { data, refetch } = usePhase3DetailDanjiBonQuery({
    params: {
      biz_no: biz_no,
      build_dtl_cd: build_dtl_cd,
    },
    onSuccess: (data) => {
      setSYdata(data.data.result);
    },
    onError: (error) => {
      console.log("Error[usePhase3DetailDanjiBonQuery]", error);
    },
  });

  useEffect(() => {
    refetch();
  }, [biz_no, build_dtl_cd]);

  if (!SYdata) return "";

  return (
    <div className="detailTabpanel subscription" aria-hidden="false" role="tabpanel" tabIndex={1}>
      <div className="tabContentWrap">
        {SYdata.scaleList.length > 0 ? (
          <div className="articleWrap schedule">
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
                        {SYdata.danjiSubsrInfo.py_sr_rate} : 1
                      </div>
                    </div>
                  </div>

                  <div className="tableRow">
                    <div className="tableDataWrap">
                      <div className="tableData">사전청약 공급세대수</div>
                    </div>
                    <div className="tableDataWrap">
                      <div className="tableData"> {SYdata.danjiSubsrInfo.subsr_supp_cnt} 세대</div>
                    </div>
                  </div>

                  <div className="tableRow">
                    <div className="tableDataWrap">
                      <div className="tableData">공고문</div>
                    </div>
                    <div className="tableDataWrap">
                      <div className="tableData">
                        <a href="#!" className="downloadBtn">
                          <i className="Icon_download"></i>입주자 모집공고문
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {SYdata.schdlList.length !== [] ? (
          <div className="articleWrap schedule">
            <div className="articleTitle">
              <div className="title">본청약 일정</div>
            </div>
            <div className="articleContent">
              <div className="tableWrap">
                <div className="tableContent">
                  {SYdata.danjiSubsrInfo.bon_subsr_date !== null ? (
                    <div className="tableRow" aria-label="예정">
                      <div className="tableDataWrap">
                        <div className="tableData">본 청약</div>
                      </div>
                      <div className="tableDataWrap">
                        <div className="tableData">{SYdata.danjiSubsrInfo.bon_subsr_date}</div>
                      </div>
                    </div>
                  ) : null}
                  <div className="tableRow" aria-label="예정">
                    <div className="tableDataWrap">
                      <div className="tableData">입주</div>
                    </div>
                    <div className="tableDataWrap">
                      <div className="tableData">{SYdata.danjiSubsrInfo.mvi_date}</div>
                    </div>
                  </div>
                </div>
                <span className="text">※ 본청약 일정은 변경될 수 있습니다.</span>
              </div>
            </div>
          </div>
        ) : null}

        {SYdata.scaleList.length > 0 ? <YJplanBonInfo SYdata={SYdata.scaleList} /> : null}
        {/* <YJplanBonInfo SYdata={SYdata} /> */}
      </div>
    </div>
  );
});
export default YJdanjiBonInfo;
