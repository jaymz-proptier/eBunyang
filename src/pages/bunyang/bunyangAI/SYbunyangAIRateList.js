import React from "react";
import { Link } from "react-router-dom";

function SYbunyangAIRateList({ SYdata }) {
    // console.log('SYbunyangAIRateList', SYdata);
    return (
        <div className="articleWrap AIaroundScore">
            <div className="articleTitle">최근 주변단지 당첨 가점</div>
            {/* <div className="articleContent">
                <div className="tipBox">
                    <div className="text">
                        2022년 1월 분양한 <strong>북서울자이폴라리스</strong>는<br/> <span className="strong">당첨 가점 커트라인이 52점</span> 이었습니다.
                    </div>
                </div>
            </div> */}
            <div className="articleContentWrap">
                <div className="articleContent aroundScoreTable">
                    <div className="tableWrap">
                        <div className="tableHead">
                            <div className="tableRow">
                                <div className="tableDataWrap">
                                    <div className="tableData complexData">단지명</div>
                                    <div className="tableData complexData">분양년월 · 총(분양) 세대 수</div>
                                </div>
                                <div className="tableDataWrap">
                                    <div className="tableData">평균 당첨 가점</div>
                                </div>
                            </div>
                        </div>
                        <div className="tableContent">
                            {SYdata.map((SYloopData, SYindex) => (
                                <Link to={`/bunyang/detail?build_dtl_cd=${SYloopData.build_dtl_cd}&supp_cd=${SYloopData.supp_cd}`} key={SYindex} className="tableRow">
                                    <div className="tableDataWrap">
                                        <div className="tableData complexData">{SYloopData.build_nm}</div>
                                        <div className="tableData complexData">{SYloopData.recruit_date} · 총 {SYloopData.total_house_cnt}({SYloopData.house_supp_cnt})세대</div>
                                    </div>
                                    <div className="tableDataWrap">
                                        {SYloopData.exp_sr_point ? (
                                            <div className="tableData" aria-label="colorBlue">{SYloopData.exp_sr_point}점</div>
                                        ) : (
                                            <div className="tableData">-</div>
                                        )}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default SYbunyangAIRateList;