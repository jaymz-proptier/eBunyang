import React from "react";
import { SYnumberFormat } from "../../hooks/";

function YJsubsrInfo({ SYdata }) {
  if (!SYdata) return "";

  return (
    <div className="contentInfoWrap">
      <div className="complexColumn">
        <div className="complexContentArea">
          <div className="articleWrap">
            <div className="articleTitle">
              <div className="title">
                사전청약 진행 현황<span className="date">{SYdata.reg_date}</span>
              </div>
            </div>
            <div className="articleContent">
              <div className="progressBarWrap">
                <span className="progressBar" aria-label="진행" style={{ width: `${SYdata.house_supp_rate}` }}></span>
                <span className="progressBar" aria-label="예정"></span>
              </div>
              <div className="graphTipWrap">
                <div className="graphTipItem">
                  <span className="graphTip" aria-label="진행"></span>
                  <span className="text">사전청약진행 </span>
                  <span className="count">
                    {SYnumberFormat(SYdata.house_supp_cnt)}세대 ({SYdata.house_supp_rate})
                  </span>
                </div>
                <div className="graphTipItem">
                  <span className="graphTip" aria-label="예정"></span>
                  <span className="text">사전청약예정 </span>
                  <span className="count">
                    {SYnumberFormat(SYdata.pre_subsc_tot_cnt)}세대 ({SYdata.pre_subsc_tot_rate})
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="articleWrap basicInfo">
            <div className="articleTitle">
              <div className="title">청약 단지</div>
            </div>
            <div className="articleContent">
              <div className="tableWrap">
                <div className="tableContent">
                  <div className="tableRow">
                    <div className="tableDataWrap">
                      <div className="tableData">지구명</div>
                    </div>
                    <div className="tableDataWrap">
                      <div className="tableData">{SYdata.biz_nm}</div>
                    </div>
                  </div>

                  <div className="tableRow">
                    <div className="tableDataWrap">
                      <div className="tableData">면적</div>
                    </div>
                    <div className="tableDataWrap">
                      <div className="tableData">{SYnumberFormat(SYdata.biz_area)} ㎡</div>
                    </div>
                  </div>

                  <div className="tableRow">
                    <div className="tableDataWrap">
                      <div className="tableData">사업시행기간</div>
                    </div>
                    <div className="tableDataWrap">
                      <div className="tableData">{SYdata.biz_period}</div>
                    </div>
                  </div>

                  <div className="tableRow">
                    <div className="tableDataWrap">
                      <div className="tableData">사업시행자</div>
                    </div>
                    <div className="tableDataWrap">
                      <div className="tableData">{SYdata.biz_operator}</div>
                    </div>
                  </div>

                  <div className="tableRow">
                    <div className="tableDataWrap">
                      <div className="tableData">인구 및 주택계획</div>
                    </div>
                    <div className="tableDataWrap">
                      <div className="tableData">주택 53,534세대, 인구 125,335명</div>
                    </div>
                  </div>

                  <div className="tableRow">
                    <div className="tableDataWrap">
                      <div className="tableData">위치</div>
                    </div>
                    <div className="tableDataWrap">
                      <div className="tableData">{SYdata.detail_addr}</div>
                    </div>
                  </div>

                  <div className="tableRow">
                    <div className="tableDataWrap">
                      <div className="tableData">{SYdata.biz_outline}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default YJsubsrInfo;
