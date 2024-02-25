import React from "react";
import { SYkoreanPrice } from "../../../hooks/";

function SYbunyangAITip( { SYdata } ) {
    return (
        <div className="articleWrap tipContent">
            <div className="articleTitle">e분양의 청약 TIP {/*<span className="date">2022.09.02 기준</span>*/} </div>
            <div className="articleContentWrap">
                <div className="articleContent">
                    <div className="tipBox">
                        <div className="text">주변 아파트 시세 대비 84타입 기준 <span className="strong">분양가가 1억 정도 저렴</span> 해요.</div>
                    </div>
                </div>
                <div className="articleContent">
                    <div className="chartWrap">
                        <div className="chartItemList">
                            {SYdata.aroundApt.map((SYloopData, SYindex) => (
                            <div key={SYindex} className="chartItem">
                                <div className="chartItemLabel">
                                    <div className="complexName">{SYloopData.title}</div>
                                    {/*<div className="complexPyung">84㎡</div>*/}
                                </div>
                                <div className="chartItemBar">
                                    <div className="fill" aria-label={`단지${(SYindex + 1)}`} style={{height:`${SYloopData.pyper_price_per}%`}}>
                                        <span className="data">{SYkoreanPrice({price: SYloopData.pyper_price, unit: ""})}</span>
                                    </div>
                                </div>
                            </div>
                            ))}
                            <div className="chartLineWrap">
                                <div className="chartItem chartLine" style={{top:`${100-SYdata.targetApt.pyper_price_per}%`}}>
                                    <span className="data">{SYkoreanPrice({price: SYdata.targetApt.pyper_price, unit: ""})}</span>
                                </div>
                            </div>
                        </div>
                        <div className="chartInfoList">
                            <div className="chartInfo">
                                <div className="colorBox" aria-label="해당단지"></div>
                                <div className="complexText">해당단지</div>
                            </div>
                            {SYdata.aroundApt.map((SYloopData, SYindex) => (
                            <div key={SYindex} className="chartInfo">
                                <div className="colorBox" aria-label={`단지${(SYindex + 1)}`}></div>
                                <div className="complexText">{SYloopData.title}</div>
                            </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default SYbunyangAITip;