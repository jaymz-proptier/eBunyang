import React from "react";
import { Link } from "react-router-dom";
import { SYproductPriceView } from "../../hooks/";

function SYproductItem({ SYdata }) {
    const SYscoreBar = [1, 2, 3, 4, 5];
    return (
        <div className="listItem bunyangItem">            
            <Link to={`/bunyang/detail?build_dtl_cd=${SYdata.build_dtl_cd}&supp_cd=${SYdata.supp_cd}`} className="linkItem">
                <div className="scheduleInfo">
                    <div className="scheduleStep" aria-label={SYdata.supp_proc_step_nm}>{SYdata.supp_proc_step_nm}</div>
                    { SYdata.schdl_nm && SYdata.exp_sr_rate_icon ? (
                    <div className="scheduleIng">
                        <span>{SYdata.schdl_nm}</span> · 예상 경쟁률 
                        <div className="scheduleScore">
                            {SYscoreBar.map((SYloopData, SYindex) => (
                                <div key={SYindex} className={`scoreBar${ SYloopData <= SYdata.exp_sr_rate_icon ? " active" : "" }`} aria-label={`경쟁률${SYloopData}`} aria-hidden={ SYloopData <= SYdata.exp_sr_rate_icon ? false : true }></div>
                            ))}
                        </div>
                    </div>
                    ) : null }
                </div>
                <div className="scheduleBx">
                    { SYdata.image_url ? (<div className="thumbnail" style={{backgroundImage:`url(${SYdata.image_url})`}}></div>) : null }
                    <div className="listInfo">
                        <div className="complexInfoWrap">
                            <div className="listTitle">{SYdata.build_nm}</div>
                            <div className="listAddress">{SYdata.address}</div>
                            <div className="listPrice">{SYproductPriceView(SYdata.min_price, SYdata.max_price)}</div>
                        </div>
                        <div className="complexInfoLabel">
                            <div className="bunyangLabel">
                                <div className="type" aria-label={SYdata.supp_sclass}>{SYdata.supp_sclass}</div>
                                <div className="type" aria-label={SYdata.bclass_nm}>{SYdata.bclass_nm}</div>
                            </div>
                            <div className="optionLabel">
                                {SYdata.visit_yn==="Y" ? (<div className="option" aria-label="현장방문">현장방문</div>) : null }
                                {SYdata.vr_yn==="Y" ? (<div className="option" aria-label="VR">VR</div>) : null }
                                {SYdata.apt_opt_yn==="Y" ? (<div className="option" aria-label="옵션계산">옵션계산</div>) : null }
                            </div>
                        </div>
                    </div>    
                </div>                            
            </Link>
        </div>
    );
}
export default SYproductItem;