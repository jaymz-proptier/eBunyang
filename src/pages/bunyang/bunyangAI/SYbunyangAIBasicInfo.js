import React, { useRef, useState } from "react";
import { SYoverheatLayerPopup } from "./";

function SYbunyangAIBasicInfo( { SYdata, SYrateList } ) {
    const SYscoreBar = [1, 2, 3, 4, 5];
    const [SYrateListPopup, SYsetRateListPopup] = useState(false);
    const [SYoverheatPopup, SYsetOverheatPopup] = useState(false);
    const SYmodal = useRef();
    const SYoutSideClick = (e) => {
        if(SYmodal.current && !SYmodal.current.contains(e.target)) {
            SYrateListLayerCheck();         
        }
    }
    const SYrateListLayerCheck = () => {
        if(SYrateListPopup) document.querySelector("body").classList.remove("popupView");
        else document.querySelector("body").classList.add("popupView");
        SYsetRateListPopup(!SYrateListPopup);
    }
    const SYoverheatLayerCheck = () => {
        if(SYoverheatPopup) document.querySelector("body").classList.remove("popupView");
        else document.querySelector("body").classList.add("popupView");
        SYsetOverheatPopup(!SYoverheatPopup);
    }
    const SYrateListLayer = () => {
        return (
            <div className="SYpopupLayerWrap" onClick={SYoutSideClick}>
                <div className="popupContentWrap SYrateListContents" ref={SYmodal}>
                    <div className="popupHeader">
                        <div className="headerTitle"><strong>{SYrateList.categoryName}</strong> 예상 경쟁률 기준</div>
                        <button type="button" className="close" onClick={SYrateListLayerCheck}>
                            <i className="SYicon"></i>
                        </button>
                    </div>
                    <div className="popupContent">
                        <div className="rateListWrap">
                            <div className="listTitle">
                                <span>경쟁률(초과 · 이하)</span>
                                <span>경쟁률 표시 바</span>
                            </div>
                            <ul>
                                {SYrateList.dataList.map((SYloopData) => (
                                <li>
                                    <span>{SYloopData.rate_min}{SYloopData.rate_max ? ` ~ ${SYloopData.rate_max}`: ""}</span>                                    
                                    <div className="scoreBarWrap">
                                    {SYscoreBar.map((SYsubLoopData, SYindex) => (
                                        <div key={SYindex} className="scoreBar" aria-label={`경쟁률${SYsubLoopData}`} aria-hidden={ SYsubLoopData <= SYloopData.rate_cnt ? false : true }></div>
                                    ))}
                                    </div>
                                </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    if(SYdata) {
        return (
            <div className="articleWrap AIdetailInfo">
                <div className="articleTitle">e분양의 청약비서</div>
                <div className="articleContentWrap">
                    <div className="articleContent rate">
                        <div className="scoreBox">
                            <div className="text">예상 경쟁률</div>
                            <div className="tooltipIcon" onClick={SYrateListLayerCheck}><i className="Icon_tip"></i></div>
                            <div className="scoreBarWrap">
                            {SYscoreBar.map((SYloopData, SYindex) => (
                                <div key={SYindex} className="scoreBar" aria-label={`경쟁률${SYloopData}`} aria-hidden={ SYloopData <= SYdata.exp_sr_rate_cnt ? false : true }></div>
                            ))}
                            </div>
                        </div>
                        <div className="scoreBox">
                            <div className="text">예상 가점</div>
                            <div className="scoreNum">{SYdata.exp_py_sr_point_min==="" && SYdata.exp_py_sr_point_max==="" ? "-" : SYdata.exp_py_sr_point_min===SYdata.exp_py_sr_point_max ? SYdata.exp_py_sr_point_min +"점" : SYdata.exp_py_sr_point_min +" ~ "+ SYdata.exp_py_sr_point_max +"점"}</div>
                        </div>
                    </div>
                    <div className="articleContent table">
                        <div className="infoTableWrap">
                            <div className="tableRow">
                                <div className="tableTitle">1순위 거주 조건</div>
                                <div className="tableData">
                                    <p>해당지역 : { SYdata.residency_1st_competente ? SYdata.residency_1st_competente : "-" }</p>
                                    <p>기타지역 : { SYdata.residency_1st_etc ? SYdata.residency_1st_etc : "-" }</p>
                                </div>
                            </div>
                            <div className="tableRow">
                                <div className="tableTitle">1순위 청약통장</div>
                                <div className="tableData">{ SYdata.speculative_overheat_nm ? SYdata.speculative_overheat_nm : "-" }</div>
                            </div>
                            <div className="tableRow">
                                <div className="tableTitle">지역별 예치금액 충족</div>
                                <div className="tableData">{ SYdata.area_division ? SYdata.area_division : "-" }</div>
                            </div>
                            { SYdata.scale_rate_min || SYdata.scale_rate_max ? (
                            <div className="tableRow">
                                <div className="tableTitle">가점 및 추첨비율</div>
                                <div className="tableData">
                                    { SYdata.scale_rate_min ? (<p>{SYdata.scale_rate_min}</p>) : null }
                                    { SYdata.scale_rate_max ? (<p>{SYdata.scale_rate_max}</p>) : null }
                                </div>
                            </div>
                            ) : null }
                            <div className="tableRow">
                                <div className="tableTitle">거주 의무기간</div>
                                <div className="tableData">{ SYdata.residency_requirements ? SYdata.residency_requirements : "-" }</div>
                            </div>
                            <div className="tableRow">
                                <div className="tableTitle">재당첨제한</div>
                                <div className="tableData">10년간</div>
                            </div>
                            <div className="tableRow">
                                <div className="tableTitle">대출(LTV)</div>
                                <div className="tableData">
                                {SYdata.ltvList.map((SYloopData, SYindex) => (
                                    <p key={SYindex}>{SYloopData.title} : {SYloopData.memo}</p>
                                ))}
                                </div>
                            </div>
                            <div className="tableRow">
                                <div className="tableTitle">규제지역정보</div>
                                <div className="tableData" onClick={SYoverheatLayerCheck}>{ SYdata.speculative_overheat==="Y" ? "투기과열지구" : "-" }</div>
                            </div>
                            <div className="tableRow">
                                <div className="tableTitle">분양가상한제 여부</div>
                                <div className="tableData">{ SYdata.price_ceiling_yn==="Y" ? "적용" : "미적용" }</div>
                            </div>
                        </div>
                    </div>
                </div>
                {SYrateListPopup ? ( <SYrateListLayer /> ) : null }
                {SYoverheatPopup ? ( <SYoverheatLayerPopup SYoverheatLayerCheck={SYoverheatLayerCheck} /> ) : null }
            </div>
        );
    }
}
export default SYbunyangAIBasicInfo;