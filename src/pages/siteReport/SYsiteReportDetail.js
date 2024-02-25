import React from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import { useQuery } from "react-query";
import axios from "axios";
import { SYmetatag } from "../../components/layout";
import { usePath } from "../../shared/contexts/SYpath";
import { SYproductHeader } from "../";
import { SYaroundComponent, SYbasicInfoComponent, SYscalePriceComponent, SYsurroundingsComponent } from "../siteReport";

function SYsiteReportDetail() {
    const { search } = useLocation();
    const SYquery = queryString.parse(search);
    const { SYapiPath } = usePath();

    const SYsectionWrap = () => { 
        const { data } = useQuery([ "siteReport", SYquery.report_cd ], () => axios.get(`${SYapiPath}/siteReport/basicDetail?report_cd=${SYquery.report_cd}`), "");

        if(data) {
            const SYdata = data.data.result;
            document.querySelector("title").innerHTML = SYdata.detail.build_nm;
            return (
                <div className="sectionWrap">                    
                    <SYmetatag title={"[현장리포트]"+ SYdata.detail.build_nm} description={SYdata.detail.address_info +" | 입주 "+ SYdata.detail.moving_date +" | "+ SYdata.detail.house_info +" | "+ SYdata.detail.dong_info +" | "+ SYdata.detail.floor_info} image={SYdata.detail.image_url} />
                    <SYproductHeader SYdata={{"build_nm": SYdata.detail.build_nm, "address": SYdata.detail.title, "bunyang_url": SYdata.detail.homepage, "sell_office_phone": SYdata.detail.contact_info, "view_count": SYdata.detail.view_count, "buildList": SYdata.buildList}} />
                    <div className="contentInfoWrap">
                        <div className="singleComponentWrap">
                            <SYbasicInfoComponent SYdata={SYdata.detail} />
                            <SYscalePriceComponent SYdata={{"dataList": SYdata.scalePriceList, "bclass": SYdata.detail.bclass}} />
                        </div>
                        <div className="singleComponentWrap">
                            {SYdata.surroundingsList.length > 0 ? (
                            <SYsurroundingsComponent SYdata={SYdata.surroundingsList} />
                            ) : null }
                        </div>
                        { SYdata.aroundList.length > 0 ? (
                        <SYaroundComponent SYdata={SYdata.aroundList} />
                        ) : null}
                    </div>
                </div>
            );
        }
    }
    return(
        <div className="contentWrap">
            <SYsectionWrap />
        </div>
    );
}

export default SYsiteReportDetail;