import React from "react";
import { Link } from "react-router-dom";
import { SYnumberFormat } from "../../hooks/";

function YJtop5List({ SYdata }) {
  if (!SYdata) return "";

  return (
    <div className="articleWrap">
      <div className="articleTitle">
        <div className="title">사전청약 최고 평균 경쟁률 TOP5 단지</div>
      </div>
      <div className="articleContent flexBox top5listWrap">
        <div className="quarterContent">
          <div className="listTitleBox">
            <span className="listTitle">공공분양</span>
          </div>
          <div className="listSection">
            <div className="top5List">
              <div className="tableContent">
                {SYdata[0].dataList.map((YJdata) => (
                  <div className="tableRow">
                    {YJdata.biz_no ? (
                      <Link to={`/newCity/complex?biz_no=${YJdata.biz_no}&build_dtl_cd=${YJdata.build_dtl_cd}`}>
                        <div className="tableData">{YJdata.ranks}</div>
                        <div className="tableData">
                          <div className="title">{YJdata.build_nm}</div>
                          <span className="count">공급수 {SYnumberFormat(YJdata.subsr_supp_cnt)}</span> ·<span className="count">청약건수 {SYnumberFormat(YJdata.py_sr_cnt)}</span>
                        </div>
                        <div className="tableData blue">{YJdata.py_sr_rate} : 1</div>
                      </Link>
                    ) : (
                      <>
                        <div className="tableData">{YJdata.ranks}</div>
                        <div className="tableData">
                          <div className="title">{YJdata.build_nm}</div>
                          <span className="count">공급수 {SYnumberFormat(YJdata.subsr_supp_cnt)}</span> ·<span className="count">청약건수 {SYnumberFormat(YJdata.py_sr_cnt)}</span>
                        </div>
                        <div className="tableData blue">{YJdata.py_sr_rate} : 1</div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="quarterContent">
          <div className="listTitleBox">
            <span className="listTitle">신혼희망타운</span>
          </div>
          <div className="listSection">
            <div className="top5List">
              <div className="tableContent">
                {SYdata[1].dataList.map((YJdata) => (
                  <div className="tableRow">
                    <div className="tableData">{YJdata.ranks}</div>
                    <div className="tableData">
                      <div className="title">{YJdata.build_nm}</div>
                      <span className="count">공급수 {SYnumberFormat(YJdata.subsr_supp_cnt)}</span> ·<span className="count">청약건수 {SYnumberFormat(YJdata.py_sr_cnt)}</span>
                    </div>
                    <div className="tableData blue">{SYnumberFormat(YJdata.py_sr_rate)} : 1</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default YJtop5List;
