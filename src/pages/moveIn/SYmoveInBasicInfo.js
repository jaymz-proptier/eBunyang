import React from "react";

function SYmoveInBasicInfo({ SYdata }) {
    const SYbasicInfo = [{"title": "주소", "value": SYdata.address}, {"title": "규모", "value": SYdata.complex_info}, {"title": "주차", "value": SYdata.parking_info}, {"title": "난방", "value": SYdata.heat_info}, {"title": "시공사", "value": SYdata.company_info}, {"title": "학군", "value": SYdata.school_info}];
    return(
        <div className="articleWrap complexInfo">
            <div className="articleTitle">단지정보</div>
            <div className="articleContentWrap">
                <div className="articleContent">
                    <div className="tableWrap">
                        <div className="tableContent">
                            {SYbasicInfo.map((SYloopData, SYindex) => (
                            <div key={SYindex} className="tableRow">
                                <div className="tableDataWrap">
                                    <div className="tableData">{SYloopData.title}</div>
                                </div>
                                <div className="tableDataWrap">
                                    <div className="tableData">{SYloopData.value}</div>
                                </div>
                            </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SYmoveInBasicInfo;