import React from "react";
import { SYproductItem  } from "./";

function SYaroundComponent({ SYdata }) {
    return(
        <div className="articleWrap">
            <div className="articleTitle">주변 입주탐방 단지</div>
            <div className="articleContentWrap">
                <div className="articleContent">
                    <div className="bunyangDetailList">
                        {SYdata.map((SYloopData) => (
                        <SYproductItem key={SYloopData.move_in_cd} SYdata={SYloopData} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SYaroundComponent;