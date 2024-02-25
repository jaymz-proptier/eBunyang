import React from "react";
import { SYkoreanPrice, SYproductPriceView } from "../../hooks/";

function SYbasicPreview({ SYdata }) {
    return (
        <div className="complexColumn basicInfoSection">
            <div className="complexContentArea infoArea">
                <div className="articleWrap summary">
                    <div className="bunyangPriceWrap">
                        <div className="priceWrap ">
                            <div className="title">분양가</div>
                            <div className="bunyangPrice">{SYproductPriceView(SYdata.detail.min_price, SYdata.detail.max_price)}</div>
                        </div>
                        <div className="priceWrap">
                            <div className="title">평당가</div>
                            <div className="pyungPriceWrap">
                                <div className="pyungPrice">{SYkoreanPrice({price: SYdata.detail.pyper_price, unit: "만원"})}</div>
                                <div className="pyung"> / 3.3㎡</div>
                            </div>
                        </div>
                    </div>
                    <div className="bunyangInfoWrap">
                        <div className="typeInfo">
                            <div className="typeTitle">물건종류</div>
                            <div className="typeText" aria-label={SYdata.detail.bclass_nm}>{SYdata.detail.bclass_nm}</div>
                        </div>
                        <div className="typeInfo">
                            <div className="typeTitle">분양형태</div>
                            <div className="typeText">{SYdata.detail.supp_sclass}</div>
                        </div>
                        <div className="typeInfo">
                            <div className="typeTitle">분양세대수</div>
                            <div className="typeText">{SYdata.detail.total_house_cnt}</div>
                        </div>
                    </div>
                    {SYdata.schdlList.length > 0 ? (
                    <div className="bunyangDateWrap">
                    {SYdata.schdlList.map((SYloopData, SYindex) => (                           
                        <div key={SYindex} className="dateInfo">
                            <div className="dateTitle">{SYloopData.schdl_nm}</div>
                            <div className="date">{SYloopData.schdl_date}</div>
                        </div> 
                    ))}
                    </div>
                    ) : null }
                </div>
                {SYdata.videoList.length > 0 ? (
                <div className="articleWrap complexMedia">
                    <div className="bunyangTourWrap">
                        <div className="articleTitle">VR과 영상으로 내부투어하기</div>
                        <div className="articleContent vrList">
                            {SYdata.videoList.map((SYloopData, SYindex) => (
                                <a href={`${SYloopData.vr_url}`} target="_blank" className="itemWrap">
                                    <div className="imgWrap">
                                        <div className="imgBox" style={{background: `url(${SYloopData.thumb_image_url}) no-repeat center`}}></div>
                                        <div className="thumbIcon">
                                            <i className="Icon_thumb" aria-label= {SYloopData.vr_yn === "Y" ? "VR" : "내부영상"}></i>
                                        </div>
                                    </div>
                                    <div className="typeName">39A</div>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
                ) : null }
                {SYdata.scaleList.length > 0 ? (
                <div className="articleWrap typeTable">
                    <div className="bunyangTableWrap">
                        <div className="articleTitle">타입 별 분양가</div>
                        <div className="typePriceTable">
                            <div className="tableHead">
                                <div className="tableRow">
                                    <div className="tableData">타입</div>
                                    <div className="tableData">공급 세대수</div>
                                    <div className="tableData">분양가</div>
                                    {SYdata.detail.py_sr_rate_yn==="Y" ? (
                                    <div className="tableData">1순위 경쟁률</div>
                                    ) : null}
                                </div>
                            </div>
                            <div className="tableContent">
                            {SYdata.scaleList.map((SYloopData, SYindex) => (
                                <div key={SYindex} className="tableRow">
                                    <div className="tableData">{SYloopData.py_nm}</div>
                                    <div className="tableData">{SYloopData.house_supp_cnt}</div>
                                    <div className="tableData">{SYloopData.supp_price===0 ? SYkoreanPrice({price: SYloopData.supp_price/10000, unit: "만원"}) : "-"}</div>
                                    {SYdata.detail.py_sr_rate_yn==="Y" ? (
                                    <div className="tableData">{SYloopData.py_sr_rate ? `${SYloopData.py_sr_rate} : 1` : "-"}</div>
                                    ) : null}
                                </div>
                            ))}
                            </div>
                        </div>
                    </div>
                </div>
                ) : null }
            </div>
            {SYdata.detail.report_cd ? (
                <div className="adContentArea">
                    <a href={`/siteReport/detail?report_cd=${SYdata.detail.report_cd}`}>
                        <div className="adImgBox"></div>
                    </a>
                </div>
            ) : null }
        </div>
    );
}

export default SYbasicPreview;