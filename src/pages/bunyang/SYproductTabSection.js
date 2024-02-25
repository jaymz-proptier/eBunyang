import React, { useState, useEffect } from "react";
import { SYbasicComplexInfo, SYbunyangAI, SYplanInfo, SYdongInfo } from "./";
import { SYreactGA4Title } from "../../hooks";

function SYproductTabSection({ SYdata, SYquery }) {
    const SYsettingContents = {
        "분양AI": SYbunyangAI,
        "기본정보": SYbasicComplexInfo,
        "평형정보": SYplanInfo,
        "동호정보": SYdongInfo,
    }
    const SYdetailTabpanelName = {
        "분양AI": "bunyangAI",
        "기본정보": "basicComplexInfo",
        "평형정보": "planInfo",
        "동호정보": "donghoPlanInfo",
    }
    const SYsettingMenu = SYquery.detailType ? SYquery.detailType : SYdetailTabpanelName[SYdata.detail.menuList.filter(SYloopData => SYloopData.use_yn==="Y")[0].title];
    const [SYtabMenu, SYsetTabMenu] = useState(SYsettingMenu);
    const [SYtabContent, SYsetTabContent] = useState(SYsettingMenu);
    const dong_nm = "";
    const SYfindKeyName = (SYobject, SYvalue) => {
        return Object.keys(SYobject).find(key => SYobject[key]===SYvalue);
    }
    const SYcomponentsCreate = (SYtitle) => {
        const SYcomponentName = SYsettingContents[SYtitle];
        return <SYcomponentName build_dtl_cd={SYdata.detail.build_dtl_cd} supp_cd={SYdata.detail.supp_cd} dong_nm={dong_nm} open={ SYtabMenu===SYdetailTabpanelName[SYtitle] ? true : false } />
    }
    
    const SYtabChangeSection = (SYtitle) => {
        SYsetTabMenu(SYtitle);
        SYsetTabContent(SYtitle);
        SYreactGA4Title(document.title +" - "+ SYfindKeyName(SYdetailTabpanelName, SYtitle));
        window.history.pushState("", "", `/bunyang/detail?build_dtl_cd=${SYdata.detail.build_dtl_cd}&supp_cd=${SYdata.detail.supp_cd}&detailType=${SYtitle}`);
    }
    useEffect(() => {        
        SYreactGA4Title(document.title +" - "+ SYfindKeyName(SYdetailTabpanelName, SYtabMenu));
    }, []);
    return (        
        <div className="complexColumn tabSection">
            <div className="complexContentArea tabArea">
                <div className="tabList">
                {SYdata.detail.menuList.filter(SYloopData => SYloopData.use_yn==="Y").map((SYloopData, SYindex) => (
                    <div key={SYindex} className="tabListItem" aria-selected={ SYdetailTabpanelName[SYloopData.title]===SYtabMenu ? true : false } role="tab" onClick={() => SYtabChangeSection(SYdetailTabpanelName[SYloopData.title])}><p>{SYloopData.title}</p></div>
                ))}
                </div>
                {SYdata.detail.menuList.filter(SYloopData => SYloopData.use_yn==="Y").map((SYloopData, SYindex) => (
                <div key={SYindex} className={`detailTabpanel ${SYdetailTabpanelName[SYloopData.title]}`} aria-hidden={ SYdetailTabpanelName[SYloopData.title]===SYtabMenu ? false : true } role="tabpanel" tabIndex={SYindex}>{ SYcomponentsCreate(SYloopData.title) }</div>
                ))}
            </div>
        </div>
    );

}

export default SYproductTabSection;