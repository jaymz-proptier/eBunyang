import React from "react";
import { Link } from "react-router-dom";
import { SYnumberFormat } from "../../hooks";

function YJchungyakInfo({ SYdata }) {
  if (!SYdata) return "";

  return (
    <div className="articleContent">
      <div className="detailTabpanel basicComplexInfo">
        {SYdata.subsrBuildList.length > 0 ? (
          <div className="articleWrap summary">
            <div className="articleTitle">
              <div className="title">지구 개요</div>
            </div>
            <div className="articleContent">
              <div className="typePriceTable">
                <div className="tableHead">
                  <div className="tableRow">
                    <div className="tableData">단계</div>
                    <div className="tableData">단지명</div>
                    <div className="tableData">총 세대수</div>
                    <div className="tableData">입주시기</div>
                  </div>
                </div>
                <div className="tableContent">
                  {SYdata.subsrBuildList.map((YJdata, index) => (
                    <div key={index} className="tableRow">
                      <div className="tableData">{YJdata.step_nm}</div>
                      <div className="tableData">
                        <Link to={`/newCity/complex?biz_no=${YJdata.biz_no}&build_dtl_cd=${YJdata.build_dtl_cd}`}>{YJdata.build_nm}</Link>
                      </div>
                      <div className="tableData">{YJdata.total_house_cnt}</div>
                      <div className="tableData">{YJdata.mvi_date}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {SYdata.subsrWinList.length > 0 ? (
          <div className="articleWrap">
            <div className="articleTitle">
              <div className="title">사전청약 당첨선</div>
            </div>
            <div className="articleContent">
              <div className="tableWrap">
                <table className="tableTypeA">
                  <thead>
                    <tr>
                      <th rowSpan="2">구분</th>
                      <th rowSpan="2">일반청약(만원)</th>
                      <th colSpan="3">특별공급</th>
                    </tr>
                    <tr>
                      <th>다자녀(점)</th>
                      <th>신혼부부(점)</th>
                      <th>노부모(점)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {SYdata.subsrWinList.map((YJdata, index) => (
                      <tr key={index}>
                        <td>
                          {YJdata.win_line_year} {YJdata.gubun}
                        </td>
                        <td>{SYnumberFormat(YJdata.chungyak_won)}</td>
                        <td>{YJdata.child_point}</td>
                        <td>{YJdata.newlyweds_point}</td>
                        <td>{SYnumberFormat(YJdata.old_parents_won)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : null}

        <div className="articleWrap schedule">
          <div className="articleTitle">
            <div className="title">청약 일정</div>
          </div>
          <div className="articleContent">
            <div className="tableWrap">
              <div className="tableContent">
                {SYdata.subsrSchdlList.map((YJdata, index) => (
                  <>
                    {SYdata.subsrSchdlList[index].categoryName === "사전청약" ? (
                      <>
                        <ul key={index} className="scheduleBx" aria-label="일정">
                          {SYdata.subsrSchdlList[index].dataList.map((schdData, index) => (
                            <li>
                              <div className="tableDataWrap">
                                <div className="tableData">{schdData.build_nm}</div>
                              </div>
                              <div className="tableDataWrap">
                                <div className="tableData">{schdData.schdl_date}</div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </>
                    ) : (
                      <>
                        {SYdata.subsrSchdlList[index].dataList.map((schdData, index) => (
                          <div
                            key={index}
                            className="tableRow"
                            aria-label={
                              YJdata.categoryName === "지구지정"
                                ? "완료"
                                : YJdata.categoryName === "사전청약일정"
                                ? "진행"
                                : YJdata.categoryName === "본청약" || YJdata.categoryName === "입주"
                                ? "예정"
                                : null
                            }
                          >
                            <div className="tableDataWrap">
                              <div className="tableData">{schdData.build_nm}</div>
                            </div>
                            <div className="tableDataWrap">
                              <div className="tableData">{schdData.schdl_date}</div>
                            </div>
                          </div>
                        ))}
                      </>
                    )}
                  </>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default YJchungyakInfo;
