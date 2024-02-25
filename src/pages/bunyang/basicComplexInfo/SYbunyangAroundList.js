import React from "react";
import { SYproductItem } from "../";

function SYbunyangAroundList({ SYdata }) {
    return (
        <div className="articleWrap bunyangArround">
            <div className="articleTitle">청약 통장 없이 내 집 마련!</div>
            <div className="articleContentWrap">
                <div className="articleContent">
                    <div className="bunyangDetailList">
                        {SYdata.map((SYloopData) => (
                        <SYproductItem key={SYloopData.build_dtl_cd + "_" + SYloopData.supp_cd} SYdata={SYloopData} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SYbunyangAroundList;