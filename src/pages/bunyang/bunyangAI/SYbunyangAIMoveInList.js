import React from "react";
import { Link } from "react-router-dom";
import { SYproductPriceShortView } from "../../../hooks/";

function SYbunyangAIMoveInList( { SYdata }) {
    // console.log('SYbunyangAIMoveInList',SYdata)
    return (
        <div className="articleWrap bunyangMoveInContent">
            <div className="articleTitle">입주예정 아파트</div>
            <div className="articleContentWrap">
                <div className="articleContent">
                    <div className="tableWrap">
                        <div className="tableHead">
                            <div className="tableRow">
                                <div className="tableDataWrap">
                                    <div className="tableData complexData">단지명</div>
                                    <div className="tableData complexData">주소(법정동) · 분양년월 · 총 세대 수</div>
                                </div>
                                <div className="tableDataWrap">
                                    <div className="tableData">분양가</div>
                                </div>
                            </div>
                        </div>
                        <div className="tableContent">
                            {SYdata.map((SYloopData, SYindex) => (
                            <Link to={`/bunyang/detail?build_dtl_cd=${SYloopData.build_dtl_cd}&supp_cd=${SYloopData.supp_cd}`} key={SYindex} className="tableRow">
                                <div className="tableDataWrap">
                                    <div className="tableData complexData">{SYloopData.build_nm}</div>
                                    <div className="tableData complexData">{SYloopData.bubdong} · {SYloopData.mvi_date} · {SYloopData.total_house_cnt}</div>
                                </div>
                                <div className="tableDataWrap">
                                    <div className="tableData" aria-label="colorBlue">{SYproductPriceShortView(SYloopData.min_price, SYloopData.max_price)}</div>
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

export default SYbunyangAIMoveInList;