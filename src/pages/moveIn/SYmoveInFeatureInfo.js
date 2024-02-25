import React from "react";

function SYmoveInFeatureInfo({ SYdata }) {
    const SYfeature = SYdata.feature_info.split("\r\n");
    return(
        <div className="articleWrap">
            <div className="articleContentWrap">
                <div className="articleContent">
                    <div className="tourMainImageWrap">
                        <div className="tourMainImg" style={{backgroundImage:`url(${SYdata.image_url})`}}></div>
                    </div>
                </div>
                <div class="articleContent">
                    <div class="tourTableWrap">
                        <div class="tableColumn">
                            <div class="tableRow">
                                <div class="tableTitle">특징</div>
                            </div>
                        </div>
                        <div className="tableColumn">
                            <div className="tableRow">
                                {SYfeature.map((SYloopData, SYindex) => (                                    
                                <div key={SYindex} className="tableData">{SYloopData}</div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SYmoveInFeatureInfo;