import React, { useState } from "react";
import { SYbaseScaleInfo, SYsummaryScaleInfo } from "./";
import { SYkoreanPrice } from "../../../hooks/";

function SYplanComponent( { SYdata } ) {
    const [SYexpanded, SYsetExpanded] = useState(SYdata.image_url2 ? true : false);
    return(
        <div className="planTypeBtn">
            <div className="typeList">
                <div className="typeItemWrap">
                    {SYdata.image_url ? ( <div className="typeItem" aria-selected={!SYexpanded} onClick={() => SYsetExpanded(false)}>기본형</div>) : null }
                    {SYdata.image_url2 ? ( <div className="typeItem" aria-selected={SYexpanded} onClick={() => SYsetExpanded(true)}>확장형</div>) : null }
                </div>
            </div>
            <div className="planContentInner">
                {SYdata.image_url || SYdata.image_url2 ? (
                <div className="articleWrap planImage">                    
                    {SYdata.image_url ? ( <img src={SYdata.image_url} aria-hidden={SYexpanded} />) : null }
                    {SYdata.image_url2 ? ( <img src={SYdata.image_url2} aria-hidden={!SYexpanded} />) : null }
                </div>
                ) : null }
                <div className="articleWrap planBasicInfo">
                    <div className="articleContentWrap">
                        <SYsummaryScaleInfo SYdata={SYdata} />
                        {SYdata.inside_video_url || SYdata.vr_url ? (
                        <div className="articleBtnContent">
                            <div className="articleBtnWrap">
                                {SYdata.inside_video_url ? (
                                <a href={SYdata.inside_video_url} className="articleBtn" target="_blank" rel="noopener noreferrer">
                                    <i className="Icon_btn" aria-label="버튼아이콘_내부영상"></i>
                                    <p className="btnText">내부영상 보기</p>
                                </a>) : null}                                
                                {SYdata.vr_url ? (
                                <a href={SYdata.vr_url} className="articleBtn" target="_blank" rel="noopener noreferrer">
                                    <i className="Icon_btn" aria-label="버튼아이콘_VR"></i>
                                    <p className="btnText">360˚VR 보기</p>
                                </a>) : null}
                            </div>
                        </div>
                        ) : null }
                        <SYbaseScaleInfo SYdata={SYdata} />
                    </div>
                </div>
                {SYdata.midd_pay_price1!=="0" || SYdata.midd_pay_price2!=="0" || SYdata.midd_pay_price3!=="0" || SYdata.midd_pay_price4!=="0" || SYdata.midd_pay_price5!=="0" || SYdata.midd_pay_price6!=="0" || SYdata.midd_pay_price7!=="0" || SYdata.contr_price1!=="0" || SYdata.contr_price2!=="0" || SYdata.balance_price!=="0" ? (
                <div className="articleWrap complexPayInfo">
                    <div className="articleContentWrap">
                        <div className="articleTitle">중도금 납입정보</div>
                        <div className="articleContentWrap">
                            <div className="articleContent">
                                <div className="tableWrap">
                                    <div class="tableHead">
                                        <div class="tableRow">
                                            <div class="tableDataWrap">
                                                <div class="tableData">계약금 ({SYdata.contr_price_percent}%)</div>
                                            </div>
                                            <div class="tableDataWrap">
                                                <div class="tableData">중도금 ({SYdata.midd_price_percent}%)</div>
                                            </div>
                                            <div class="tableDataWrap">
                                                <div class="tableData">잔금 ({SYdata.balance_price_percent}%)</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tableContent">
                                        {SYdata.contr_price1!=="0" ? (
                                        <div className="tableRow">
                                            <div className="tableDataWrap">
                                                <div className="tableData">계약금(1차)</div>
                                            </div>
                                            <div className="tableDataWrap">
                                                <div className="tableData">{SYkoreanPrice({price: SYdata.contr_price1/10000, unit: "만원"})}</div>
                                            </div>
                                            <div className="tableDataWrap">
                                                <div className="tableData">{SYdata.contr_pay_date1 ? `[${SYdata.contr_pay_date1}]` :"-"}</div>
                                            </div>
                                        </div>
                                        ) : null }
                                        
                                        {SYdata.contr_price2!=="0" ? (
                                        <div className="tableRow">
                                            <div className="tableDataWrap">
                                                <div className="tableData">계약금(2차)</div>
                                            </div>
                                            <div className="tableDataWrap">
                                                <div className="tableData">{SYkoreanPrice({price: SYdata.contr_price2/10000, unit: "만원"})}</div>
                                            </div>
                                            <div className="tableDataWrap">
                                                <div className="tableData">{SYdata.contr_pay_date2 ? `[${SYdata.contr_pay_date2}]` :"-"}</div>
                                            </div>
                                        </div>
                                        ) : null }

                                        {SYdata.midd_pay_price1!=="0" ? (
                                        <div className="tableRow">
                                            <div className="tableDataWrap">
                                                <div className="tableData">중도금(1차)</div>
                                            </div>
                                            <div className="tableDataWrap">
                                                <div className="tableData">{SYkoreanPrice({price: SYdata.midd_pay_price1/10000, unit: "만원"})}</div>
                                            </div>
                                            <div className="tableDataWrap">
                                                <div className="tableData">{SYdata.midd_pay_date1 ? `[${SYdata.midd_pay_date1}]` :"-"}</div>
                                            </div>
                                        </div>
                                        ) : null }
                                        
                                        {SYdata.midd_pay_price2!=="0" ? (
                                        <div className="tableRow">
                                            <div className="tableDataWrap">
                                                <div className="tableData">중도금(2차)</div>
                                            </div>
                                            <div className="tableDataWrap">
                                                <div className="tableData">{SYkoreanPrice({price: SYdata.midd_pay_price2/10000, unit: "만원"})}</div>
                                            </div>
                                            <div className="tableDataWrap">
                                                <div className="tableData">{SYdata.midd_pay_date2 ? `[${SYdata.midd_pay_date2}]` :"-"}</div>
                                            </div>
                                        </div>
                                        ) : null }
                                        
                                        {SYdata.midd_pay_price3!=="0" ? (
                                        <div className="tableRow">
                                            <div className="tableDataWrap">
                                                <div className="tableData">중도금(3차)</div>
                                            </div>
                                            <div className="tableDataWrap">
                                                <div className="tableData">{SYkoreanPrice({price: SYdata.midd_pay_price3/10000, unit: "만원"})}</div>
                                            </div>
                                            <div className="tableDataWrap">
                                                <div className="tableData">{SYdata.midd_pay_date3 ? `[${SYdata.midd_pay_date3}]` :"-"}</div>
                                            </div>
                                        </div>
                                        ) : null }
                                        
                                        {SYdata.midd_pay_price4!=="0" ? (
                                        <div className="tableRow">
                                            <div className="tableDataWrap">
                                                <div className="tableData">중도금(4차)</div>
                                            </div>
                                            <div className="tableDataWrap">
                                                <div className="tableData">{SYkoreanPrice({price: SYdata.midd_pay_price4/10000, unit: "만원"})}</div>
                                            </div>
                                            <div className="tableDataWrap">
                                                <div className="tableData">{SYdata.midd_pay_date4 ? `[${SYdata.midd_pay_date4}]` :"-"}</div>
                                            </div>
                                        </div>
                                        ) : null }
                                        
                                        {SYdata.midd_pay_price5!=="0" ? (
                                        <div className="tableRow">
                                            <div className="tableDataWrap">
                                                <div className="tableData">중도금(5차)</div>
                                            </div>
                                            <div className="tableDataWrap">
                                                <div className="tableData">{SYkoreanPrice({price: SYdata.midd_pay_price5/10000, unit: "만원"})}</div>
                                            </div>
                                            <div className="tableDataWrap">
                                                <div className="tableData">{SYdata.midd_pay_date5 ? `[${SYdata.midd_pay_date5}]` :"-"}</div>
                                            </div>
                                        </div>
                                        ) : null }
                                        
                                        {SYdata.midd_pay_price6!=="0" ? (
                                        <div className="tableRow">
                                            <div className="tableDataWrap">
                                                <div className="tableData">중도금(6차)</div>
                                            </div>
                                            <div className="tableDataWrap">
                                                <div className="tableData">{SYkoreanPrice({price: SYdata.midd_pay_price6/10000, unit: "만원"})}</div>
                                            </div>
                                            <div className="tableDataWrap">
                                                <div className="tableData">{SYdata.midd_pay_date6 ? `[${SYdata.midd_pay_date6}]` :"-"}</div>
                                            </div>
                                        </div>
                                        ) : null }
                                        
                                        {SYdata.midd_pay_price7!=="0" ? (
                                        <div className="tableRow">
                                            <div className="tableDataWrap">
                                                <div className="tableData">중도금(7차)</div>
                                            </div>
                                            <div className="tableDataWrap">
                                                <div className="tableData">{SYkoreanPrice({price: SYdata.midd_pay_price7/10000, unit: "만원"})}</div>
                                            </div>
                                            <div className="tableDataWrap">
                                                <div className="tableData">{SYdata.midd_pay_date7 ? `[${SYdata.midd_pay_date7}]` :"-"}</div>
                                            </div>
                                        </div>
                                        ) : null }
                                        
                                        {SYdata.balance_price!=="0" ? (
                                        <div className="tableRow">
                                            <div className="tableDataWrap">
                                                <div className="tableData">잔금</div>
                                            </div>
                                            <div className="tableDataWrap">
                                                <div className="tableData">{SYkoreanPrice({price: SYdata.balance_price/10000, unit: "만원"})}</div>
                                            </div>
                                            <div className="tableDataWrap">
                                                <div className="tableData">{SYdata.balance_pay_date ? `[${SYdata.balance_pay_date}]` :"-"}</div>
                                            </div>
                                        </div>
                                        ) : null }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                ) : null }
            </div>

        </div>
    );
}

export default SYplanComponent;