import React from "react";
import { SYproductItem } from "./";

function SYaroundComponent({ SYdata }) {
    return(
        <div className="singleComponentWrap">
            <div className="reportAroundWrap">
                <div className="articleWrap">
                    <div className="articleTitle">주변 현장리포트</div>
                    <div className="articleContent">
                        {SYdata.map((SYloopData, SYindex) => (
                        <SYproductItem key={SYindex} SYdata={SYloopData} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SYaroundComponent;