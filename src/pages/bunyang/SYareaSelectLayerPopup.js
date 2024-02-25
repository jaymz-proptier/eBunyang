import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { mapAreaCodeAtom } from "../../recoils/bunyang";
import { useAddressListQuery } from "../../apis/bunyang/bunyang";


function SYareaSelectLayerPopup({ SYdata, SYmapPositionChange, SYsetAreaLayerPopup, SYsetCheckAreaLayerPopup }) {
    const [SYmapAreaCode, SYsetMapAreaCode] = useRecoilState(mapAreaCodeAtom);
    const [SYareaData, SYsetAreaData] = useState(null);
    const [SYareaSelectData, SYsetAreaSelectData] = useState({xpos: "", ypos: "", zoom: 14, areaName: ""});
    
    const { data, refetch } = useAddressListQuery({
        params: { bubdong_code: SYdata },
        onSuccess: (data) => {
            SYsetAreaData(data.data.result.areaList);
            if(data.data.result.searchInfo) {
                SYsetAreaSelectData({xpos: data.data.result.searchInfo.xpos, ypos: data.data.result.searchInfo.ypos, zoom: data.data.result.searchInfo.disp_level==="2"?14:16, areaName: data.data.result.searchInfo.disp_level==="2"?data.data.result.searchInfo.gugun:data.data.result.searchInfo.dong}); 
            } else SYsetAreaSelectData({xpos: "", ypos: "", zoom: 14, areaName: ""});               
            SYsetMapAreaCode({
                value: data.data.result.searchInfo.bubdong_code,
                sido: data.data.result.searchInfo.sido_basic?data.data.result.searchInfo.sido_basic:"시/도",
                gugun: data.data.result.searchInfo.gugun?data.data.result.searchInfo.gugun:"시/군/구",
                dong: data.data.result.searchInfo.dong?data.data.result.searchInfo.dong:"읍/면/동",
            });
        },
        onError: (error) => {
            console.log("Error[bunyangList]", error);
        },
    })
    const SYmapAreaSelect = (SYloopData) => {
        if(SYloopData.disp_level < 3) SYsetAreaLayerPopup(SYloopData.bubdong_code);
        else SYsetAreaSelectData({xpos: SYloopData.xpos, ypos: SYloopData.ypos, zoom: 16, areaName: SYloopData.dong});
        SYsetMapAreaCode({
            value: SYloopData.bubdong_code,
            sido: SYloopData.sido_basic?SYloopData.sido_basic:"시/도",
            gugun: SYloopData.gugun?SYloopData.gugun:"시/군/구",
            dong: SYloopData.dong?SYloopData.dong:"읍/면/동",
        })
    }
    useEffect(() => {
        refetch();
    }, [ SYdata, refetch ]);
    /*const SYoutSideClick = (e) => {
        if(SYmodal.current && !SYmodal.current.contains(e.target)) {
            SYsetCheckAreaLayerPopup(false);         
        }
    }*/
    const SYoutSideClick = (e) => {
        if(!e.target.closest(".layerPopupContent")) {
            SYsetCheckAreaLayerPopup(false);
        }
    }
    useEffect(() => {
        document.addEventListener("mousedown", SYoutSideClick);
    }, []);
    return (
        <div className="SYlayerPopupWrap areaSelectLayerPopup">
            <div className="layerPopupContent">
                <div className="areaSelectWrap">
                    <div className="region" onClick={() => SYsetAreaLayerPopup("")}>{SYmapAreaCode.sido}</div>
                    <div className="region" onClick={() => SYsetAreaLayerPopup(SYdata.substr(0, 2).padEnd(10, "0"))}>{SYmapAreaCode.gugun}</div>
                    <div className="region" onClick={() => SYsetAreaLayerPopup(SYdata.substr(0, 5).padEnd(10, "0"))}>{SYmapAreaCode.dong}</div>
                </div>
                {SYareaData?(
                <ul>
                {SYareaData.filter((SYareaData) => SYareaData.gugun!=="전체").map((SYloopData) => (
                    <li key={SYloopData.bubdong_code} onClick={() => SYmapAreaSelect(SYloopData)}>{SYloopData.disp_level==="1"?SYloopData.sido_basic:SYloopData.disp_level==="2"?SYloopData.gugun:SYloopData.dong}</li>
                ))}
                </ul>
                ) : null}
                {SYareaSelectData.areaName? (
                <div className="areaButtonWrap">
                    <button type="button" onClick={() => SYmapPositionChange(SYareaSelectData)}>{SYareaSelectData.areaName}지도로 보기</button>
                </div>
                ):null}
            </div>
        </div>
    );
}

export default React.memo(SYareaSelectLayerPopup);