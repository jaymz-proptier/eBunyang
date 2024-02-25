import React, { useRef } from "react";
import { useBunyangRestrictQuery } from "../../../apis/bunyang/bunyang";

function SYoverheatLayerPopup({ SYoverheatLayerCheck }) {    
    const SYmodal = useRef();
    const { data } = useBunyangRestrictQuery({
        params: {keyword: "투기과열지구"},
        onSuccess: (data) => {   
        },
        onError: (error) => {
            console.log("Error[bunyangList]", error);
        },
    });
    const SYoutSideClick = (e) => {
        if(SYmodal.current && !SYmodal.current.contains(e.target)) {
            SYoverheatLayerCheck();           
        }
    }
    return data && data.data.result ? (
        <div className="SYpopupLayerWrap" onClick={SYoutSideClick}>
            <div className="popupContentWrap SYoverheatContents" ref={SYmodal}>
                <div className="popupHeader">
                    <div className="headerTitle">투기과열지구 조건 알고가자!</div>
                    <button type="button" className="close" onClick={SYoverheatLayerCheck}>
                        <i className="SYicon"></i>
                    </button>
                </div>
                <div className="popupContent">
                    <div className="overheatWrap">
                        {data.data.result.restricZoneList[0].categoryList.map((SYloopData) => (
                        <>
                        <div className="listTitle">
                            <span>{SYloopData.categoryName}</span>
                        </div>
                        <ul>
                            {SYloopData.itemsList.map((SYsubLoopData) => (
                            <li>
                                <div className="title">{SYsubLoopData.itemsName}</div>
                                <div className="contents">
                                    {SYsubLoopData.dataList.map((SYdata) => (
                                    <p>{SYdata.title}{SYdata.memo ? (<label>{SYdata.memo}</label>) : "" }</p>
                                    ))}
                                </div>
                            </li>
                            ))}
                        </ul>
                        </>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    ) : null;
}

export default SYoverheatLayerPopup;