import React from "react";
import { SYkoreanPrice } from "../../../hooks/";

function SYbaseScaleInfo( { SYdata } ) {
    let SYfloorPrice = "", SYfloorSubPrice = "", SYfloorPriceName = "분양가", SYfloorSubPriceName = "취득세";
    if(SYdata.bclass==="H01") {
        SYfloorPriceName = "호실별 상세조건";
        SYfloorSubPriceName = "호실명"
        SYfloorPrice = SYdata.dtl_info.replace("/\s+/", "").replace("/분양가:/","").replace("/최고분양가/","").replace("/최저분양가/");
        SYfloorSubPrice = SYdata.room_info;
    } else {
        if(SYdata.supp_bclass==="G") {
            SYfloorPrice = SYdata.supp_price ? SYkoreanPrice({price: SYdata.supp_price/10000, unit: "만원"}) : "-";
            SYfloorSubPrice = SYdata.acq_tax_price ? SYkoreanPrice({price: SYdata.acq_tax_price/10000, unit: "만원"}):"-";
        } else {
            SYfloorPriceName = "보증금";
            SYfloorSubPriceName = "월세";
            SYfloorPrice = SYdata.deposit_price ? SYkoreanPrice({price: SYdata.deposit_price/10000, unit: "만원"}):"-";
            SYfloorSubPrice = SYdata.month_rent_price ? SYkoreanPrice({price: SYdata.month_rent_price/10000, unit: "만원"}):"-";
        }
    }

    const SYbaseScaleInfo = [{"viewType": true, "title": SYfloorPriceName, "value": SYfloorPrice}, {"viewType": true, "title": SYfloorSubPriceName, "value": SYfloorSubPrice}, {"viewType": SYdata.bclass==="H01" ? false : true, "title": `분양${SYdata.bclass==="C02" ? "호실" : "세대"}수`, "value": SYdata.house_supp_cnt ? SYdata.house_supp_cnt : "-"}, {"viewType": SYdata.bclass==="H01" ? false : true, "title": "대지지분", "value": SYdata.land_share_size ? SYdata.land_share_size +"㎡" :"-"}, {"viewType": (SYdata.bclass==="C02" || SYdata.bclass==="D01" || SYdata.bclass==="M01") && SYdata.supp_bclass==="G" && SYdata.deny_mnpl_end_date ? true : false, "title": "현관구조", "value": SYdata.hallway_str} ,{"viewType": (SYdata.bclass==="C01" || SYdata.bclass==="C02") && SYdata.supp_bclass==="G" && SYdata.deny_mnpl_end_date ? true : false, "title": "전매제한기간", "value": `~${SYdata.deny_mnpl_end_date}`}];
    return(
        <div className="articleContent">
            <div className="tableWrap">
                <div className="tableContent">
                    {SYbaseScaleInfo.map((SYloopData, SYindex) => (
                    <div className="tableRow">
                        <div className="tableDataWrap">
                            <div className="tableData">{SYloopData.title}</div>
                        </div>
                        <div className="tableDataWrap">
                            <div className="tableData" aria-label="colorBlue">{SYloopData.value ? SYloopData.value : "-"}</div>
                        </div>
                    </div>
                    ))}
                    {SYdata.exp_py_sr_rate ? (
                    <div className="tableRow">
                        <div className="tableDataWrap">
                            <div className="tableData">청약경쟁률</div>
                        </div>
                        <div className="tableDataWrap">
                            <div className="tableData" aria-label="colorOrange">{SYdata.exp_py_sr_rate} : 1</div>
                        </div>
                    </div>
                    ) : null }
                    {SYdata.exp_py_sr_point ? (
                    <div className="tableRow">
                        <div className="tableDataWrap">
                            <div className="tableData">청약가점</div>
                        </div>
                        <div className="tableDataWrap">
                            <div className="tableData" aria-label="colorOrange">{SYdata.exp_py_sr_point_min===SYdata.exp_py_sr_point_max ? SYdata.exp_py_sr_point_max +"점" : SYdata.exp_py_sr_point_min +"점" + (SYdata.exp_py_sr_point_max ? " ~ "+ SYdata.exp_py_sr_point_max +"점" : "")}</div>
                        </div>
                    </div>
                    ) : null }
                </div>
            </div>
        </div>
    );
}

export default SYbaseScaleInfo;