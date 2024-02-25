import React from "react";

function SYsummaryScaleInfo( { SYdata} ) {
    const SYarrayData = [{"viewType": true, "title": (SYdata.bclass==="C02" || SYdata.bclass==="H01" || SYdata.bclass==="J01" ? "계약" : "공급") +"면적","value":((SYdata.bclass==="C02" || SYdata.bclass==="H01" || SYdata.bclass==="J01")?SYdata.contr_size:SYdata.supp_size) +"㎡"},{"viewType": true, "title":"전용면적","value":SYdata.use_area_size +"㎡"}, {"viewType": SYdata.bclass==="H01" ? true : false, "title":"분양호실수","value": SYdata.house_supp_cnt ?SYdata.house_supp_cnt : "-"}, {"viewType": SYdata.bclass==="H01" ? false : true, "title":"방","value": SYdata.room_cnt ? SYdata.room_cnt +"개" : ""}, {"viewType": SYdata.bclass==="H01" ? false : true, "title":"욕실수","value": SYdata.bathroom_cnt ? SYdata.bathroom_cnt +"개" : ""}];
    return(
        <div className="articleContent">
            <div className="planBasicInfoContent">
                <div className="infoIconWrap">
                    {SYarrayData.filter(SYloopData => SYloopData.viewType===true).map((SYloopData, SYindex) => (
                    <div key={SYindex} className="planIcon">
                        <i className="Icon_planInfo" aria-label={SYloopData.title==="계약면적"?"공급면적":SYloopData.title}></i>
                        <div className="iconInfoTitle">{SYloopData.title}</div>
                        <div className="iconInfoCon">{SYloopData.value}</div>
                    </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default SYsummaryScaleInfo;