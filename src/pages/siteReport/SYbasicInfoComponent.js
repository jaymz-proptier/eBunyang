import React from "react";

function SYbasicInfoComponent({ SYdata }) {
    const SYbaseInfoList = [{"title": "주소", "value": SYdata.address}, {"title": "면적", "value": SYdata.scale_info},{"title": ((SYdata.bclass==="C02" || SYdata.bclass==="H01")?"호실":"세대") +"수", "value": SYdata.house_info}, {"title": "층수", "value": SYdata.floor_info},{"title": "동수", "value": SYdata.dong_info}, {"title": "입주시기", "value": SYdata.moving_date}, {"title": "건설사", "value": SYdata.company_info}];
    return(
        <div className="reportBasicInfoWrap">
            <div className="imageBoxWrap">
                <div className="imageBox" style={{backgroundImage:`url(${SYdata.image_url})`}}></div>
            </div>
            <div className="articleWrap">
                <div className="articleContent">
                    <div className="tableContent">
                        {SYbaseInfoList.map((SYloopData, SYindex) => (
                        <div key={SYindex} className="rowContent">
                            <span className="label">{SYloopData.title}</span>
                            {SYloopData.value}
                        </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SYbasicInfoComponent;