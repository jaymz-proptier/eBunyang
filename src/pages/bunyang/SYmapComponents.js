import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import axios from "axios";
import { bubdongState, bunyangMapMarkerTypeAtom, bunyangPositionAtom } from "../../recoils/bunyang";
import { mapBoundingQuery, useAddressListQuery } from "../../apis/bunyang/bunyang";
import { SYkoreanPrice, SYreactGA4Event, SYreactGA4Title } from "../../hooks/";
import { SYareaSelectLayerPopup } from "./";

let SYmap = null;
function SYmapComponents() {   
    
    const SYmapElement = useRef(null);
    const [SYposition, SYsetPosition] = useRecoilState(bunyangPositionAtom);
    const [SYmarkerViewType, SYsetMarkerViewType] = useRecoilState(bunyangMapMarkerTypeAtom);   
    const [searchParams, setSearchParams] = useSearchParams();
    if(searchParams.get("SYmap")) {
        const SYarray = searchParams.get("SYmap").split(":");
        if(JSON.stringify({lat: SYarray[0], lng: SYarray[1], zoom: SYarray[2]})!==JSON.stringify(SYposition) && SYarray[0]!=="0") {
            SYsetPosition({lat: SYarray[0], lng: SYarray[1], zoom: SYarray[2]});
        }
    }
    const bclass = searchParams.get("bclass") || "";
    const supp_proc_step = searchParams.get("supp_proc_step") || "";
    const supp_sclass = searchParams.get("supp_sclass") || "";
    const bthema = searchParams.get("bthema") || "";
    const schdl_cd = searchParams.get("schdl_cd") || "";
    const min_price = searchParams.get("min_price") || "";
    const max_price = searchParams.get("max_price") || "";
    const min_scale = searchParams.get("min_scale") || "";
    const max_scale = searchParams.get("max_scale") || "";
    const min_house_cnt = searchParams.get("min_house_cnt") || "";
    const max_house_cnt = searchParams.get("max_house_cnt") || "";
    const [SYparam, SYsetParam] = useState({
        top: "",
        right: "",
        bottom: "",
        left: "",
        ypos: "",
        xpos: "",
        zoom: "", 
        bclass: bclass,   
        supp_proc_step: supp_proc_step,
        supp_sclass: supp_sclass,
        schdl_cd: schdl_cd,
        bthema: bthema,
        min_price: min_price,
        max_price: max_price,
        min_house_cnt: min_house_cnt,
        max_house_cnt: max_house_cnt,
        min_scale: min_scale,
        max_scale: max_scale,    
    });
    const SYbunyangMarker = useRef([]);
    const [SYdata, SYsetData] = useState([]);
    const [SYmapCode, SYsetMapCode] = useState({bubdongCode: "", sido: "시/도", gugun: "시/군/구", dong: "읍/면/동"});
    const SYsetAreaCode = useSetRecoilState(bubdongState);
    const [SYareaLayerPopup, SYsetAreaLayerPopup] = useState(null);
    const [SYcheckAreaLayerPopup, SYsetCheckAreaLayerPopup] = useState(false);
    const [SYpositionCheck, SYsetPositionCheck] = useState(false);
    const [SYmapFunction, SYsetMapFunction] = useState({bunyang: true, facility:false});
    const SYfacilityList = ["분양유형", "분양현황", "분양평당가", "분양세대수", "분양시기"];

    const SYfetchData = async() =>  {
        try {
            const SYresponse = await axios.get("https://test-api.ebunyang.co.kr/v2/bunyang/addressBasicPos");
            console.log(SYresponse.data.result.addressInfo);
            SYsetPosition({lat: SYresponse.data.result.addressInfo.ypos, lng: SYresponse.data.result.addressInfo.xpos, zoom: 18});
            SYsetPositionCheck(true);
        } catch(e) {
            console.log("error :", e);
        }
    };
    const SYmapContent = () => {
        SYmap = new naver.maps.Map(SYmapElement.current, {
            useStyleMap: true,
            minZoom: 12,
            maxZoom: 19,
            zoom: ((!isNaN(SYposition.zoom))?SYposition.zoom*1:18),
            center: new naver.maps.LatLng(SYposition.lat, SYposition.lng),
            scaleControl: true,
            logoControl: false,
            disableDoubleTapZoom: true,
        });
        naver.maps.Event.addListener(SYmap, "dragend", SYmapDataUpdate);
        naver.maps.Event.addListener(SYmap, "zoom_changed", SYmapDataUpdate);
        naver.maps.Event.addListener(SYmap, "click", SYdetailClose);
        SYmapBounding();
    }
    const SYmapDataUpdate = () => {        
        SYmapBounding();
    }
    const SYdetailClose = () => {
        SYsetCheckAreaLayerPopup(false);
        let SYcopyArray = {...SYmapFunction};
        SYcopyArray.facility = false;
        SYsetMapFunction(SYcopyArray);
    }
    const SYmapBounding = async () => {
        try {
            const SYmapPosition = SYmap.getCenter();
            const SYbounds = SYmap.getBounds();
            const SYdata = await mapBoundingQuery({
                top: SYbounds.getSW().lng(),
                right: SYbounds.getSW().lat(),
                bottom: SYbounds.getNE().lng(),
                left: SYbounds.getNE().lat(),
                ypos: SYmapPosition.lat(),
                xpos: SYmapPosition.lng(),
                zoom: SYmap.getZoom(), 
                bclass: bclass,   
                supp_proc_step: supp_proc_step,
                supp_sclass: supp_sclass,
                schdl_cd: schdl_cd,
                bthema: bthema,
                min_price: min_price,
                max_price: max_price,
                min_house_cnt: min_house_cnt,
                max_house_cnt: max_house_cnt,
                min_scale: min_scale,
                max_scale: max_scale           
            });
            SYpageHashChange(`/bunyang/map?SYmap=${SYmapPosition.lat()}:${SYmapPosition.lng()}:${SYmap.getZoom()}`);
            localStorage.setItem("SYposition", '{"lat":'+ SYmapPosition.lat() +', "lng":'+ SYmapPosition.lng() +', "zoom":'+ SYmap.getZoom() +'}');
            SYsetPosition({lat: SYmapPosition.lat(), lng: SYmapPosition.lng(), zoom: SYmap.getZoom()});
            SYreactGA4Title();
            SYsetMapCode({bubdongCode: SYdata.data.result.addressInfo.bubdong_code, sido: SYdata.data.result.addressInfo.sido, gugun: SYdata.data.result.addressInfo.gugun, dong: SYdata.data.result.addressInfo.dong});
            SYsetAreaCode({
                text: SYdata.data.result.addressInfo.sido + " " + SYdata.data.result.addressInfo.gugun,
                value: SYdata.data.result.addressInfo.bubdong_code,
                sido: SYdata.data.result.addressInfo.sido,
                gugun: SYdata.data.result.addressInfo.gugun,
                lat: SYdata.data.result.addressInfo.ypos,
                lng: SYdata.data.result.addressInfo.xpos,
            });
            SYboundsClear();
            SYdata.data.result.mapList.map((SYloopData) => {
                SYmapIcon(SYloopData);
            });
            
        } catch (error) {
            console.log('Error[regionSelect]', error);
        }
    }
    useEffect(() => {
        console.log("mapStart");
        if(!SYposition.lat && !SYposition.lng) {
            SYfetchData();
        } else {
            SYmapContent();
        }
    }, []);
    useEffect(() => {  
        if(SYpositionCheck) {
            SYmapContent();
        }      
    }, [SYpositionCheck]);
    const SYmapIcon = (SYdata) => {
        const SYmarker = new naver.maps.Marker({
            position: new naver.maps.LatLng(SYdata.ypos, SYdata.xpos),
            map: SYmap,
            icon: {
                content: `<div class="marker SYbunyangMarker" aria-label="분양" aria-hidden="" aria-pressed="">`+
                `<a href='/bunyang/detail?build_dtl_cd=${SYdata.build_dtl_cd}&supp_cd=${SYdata.supp_cd}' role='button' class='markerComplex' aria-pressed='false' aria-label='마커_${SYdata.bclass==="D01" || SYdata.bclass==="M01"?"도시생활형":SYdata.bclass_nm}'>`+
                    `<div class='markerInner'>`+
                        `<div class='markerSelect'>${SYmarkerViewType==="분양유형"?SYdata.bclass_nm:SYmarkerViewType==="분양현황"?SYdata.supp_proc_step_nm:SYmarkerViewType==="분양평당가"?SYdata.supp_bclass==="L"?SYdata.supp_sclass:SYdata.pyper_price?SYkoreanPrice({price:SYdata.pyper_price / 10000, unit: ""}):"미정":SYmarkerViewType==="분양세대수"?SYdata.total_house_cnt:SYdata.schdl_nm}</div>`+
                        `<div class='stateArea'>`+
                            `<span class='stateLabel' aria-label=${SYdata.supp_proc_step_nm}>${SYdata.supp_proc_step_nm}</span>${SYdata.visit_yn==="Y"?"<span class='stateLabel' aria-label='현장방문'>현장방문</span>":""}${SYdata.vr_url==="Y"?"<span class='stateLabel' aria-label='VR'>VR</span>":""}</div>`+
                        `<div class='markerInfo'>`+
                            `<div class='complexTitle'>${SYdata.build_nm}</div>`+
                            `<div class='complexPrice'>${SYdata.max_price==="0"?"미정":SYkoreanPrice({price: SYdata.max_price / 10000, unit: ""})}</div>`+
                            `<div class='complexSize'>${SYdata.max_size==="0"?"미정":SYdata.max_size +"평"}</div>`+
                            `<div class='complexInfo'>`+
                                `<span class='type'>${SYdata.bclass_nm}</span>`+
                                `<span class='total'>${SYdata.supp_sclass}</span>`+
                                `<span class='total'>총${SYdata.total_house_cnt}</span>`+
                            `</div>`+
                        `</div>`+
                    `</div>`+
                `</a>`+
            `</div>`,
            anchor: new naver.maps.Point(0, 0),
            }, 
            zIndex: 0,
        }); 
        
        SYmarker.type = SYdata.bclass_nm;
        SYmarker.state = SYdata.supp_proc_step_nm;
        SYmarker.perPrice = SYdata.supp_bclass==="L"?SYdata.supp_sclass:SYdata.pyper_price?SYkoreanPrice({price:SYdata.pyper_price / 10000, unit: ""}):"미정";
        SYmarker.quantity = SYdata.total_house_cnt;
        SYmarker.period = SYdata.schdl_nm;
        SYmarker.getElement().classList.add("SYmarkerWrap");
        SYbunyangMarker.current.push(SYmarker); 

        
        naver.maps.Event.addListener(SYmarker, "mouseover", function() {
            SYmarker.setZIndex(7);
            SYmarker.getElement().classList.toggle("hover");
        });
        naver.maps.Event.addListener(SYmarker, "mouseout", function() {
            SYmarker.setZIndex(0);
            SYmarker.getElement().classList.toggle("hover");
        });
    }   
    const SYboundsClear = ()  => {
        SYbunyangMarker.current.map((SYloopData) => {
            SYloopData.setMap(null);
        });
        SYbunyangMarker.current = [];     
    }
    /* const { data, refetch } = mapBoundingQuery({
        params: {
            top: SYparam.top, 
            right: SYparam.right, 
            bottom: SYparam.bottom, 
            left: SYparam.left, 
            ypos: SYparam.ypos, 
            xpos: SYparam.xpos, 
            zoom: SYparam.zoom, 
            bclass: bclass,
            supp_proc_step: supp_proc_step,
            supp_sclass: supp_sclass,
            schdl_cd: schdl_cd,
            bthema: bthema,
            min_price: min_price,
            max_price: max_price,
            min_house_cnt: min_house_cnt,
            max_house_cnt: max_house_cnt,
            min_scale: min_scale,
            max_scale: max_scale,
        },
        onSuccess: (data) => {
            console.log("test1",searchParams.toString());
            searchParams.delete("SYmap");
            searchParams.delete("bubdong_code");
            SYpageHashChange(`/bunyang/map?SYmap=${SYparam.ypos}:${SYparam.xpos}:${SYparam.zoom}`);
            SYsetData(data.data.result);
            SYsetAreaCode({
                text: data.data.result.addressInfo.sido + " " + data.data.result.addressInfo.gugun,
                value: data.data.result.addressInfo.bubdong_code,
                sido: data.data.result.addressInfo.sido,
                gugun: data.data.result.addressInfo.gugun,
                lat: data.data.result.addressInfo.ypos,
                lng: data.data.result.addressInfo.xpos,
            });
            SYboundsClear();
            data.data.result.mapList.map((SYloopData) => {
                SYmapIcon(SYloopData);
            });
        },
        onError: (error) => {
            console.log("Error[bunyangList]", error);
        },
    }); */
    useEffect(() => {
        SYmapBounding();
    }, [searchParams]);
    const SYpageHashChange = (SYpage) => {
        window.history.pushState("", "", SYpage + (searchParams.toString()?"&"+ searchParams.toString():""));     
    }
    const SYareaSelectBox = (SYdata, SYlength) => {
        SYsetCheckAreaLayerPopup(!SYcheckAreaLayerPopup);
        if(!SYcheckAreaLayerPopup) SYsetAreaLayerPopup(SYlength===0?"":SYdata.substr(0, SYlength).padEnd(10, "0"));
    }
    const SYmapPositionChange = (SYdata) => {
        SYsetCheckAreaLayerPopup(!SYcheckAreaLayerPopup);
        SYmap.setCenter(new naver.maps.Point(SYdata.xpos, SYdata.ypos));				
        if(SYmap.getZoom()!=SYdata.zoom) SYmap.setZoom(SYdata.zoom);
        else SYmapBounding();
    }
    const SYfacilityListOpen = () => {
        let SYcopyArray = {...SYmapFunction};
        SYcopyArray.facility = !SYcopyArray.facility;
        SYsetMapFunction(SYcopyArray);
    }
    const SYfacilitySelect = (SYdata) => {
        SYsetMarkerViewType(SYdata);
        SYfacilityListOpen();
        
        SYbunyangMarker.current.map(marker => {
            marker.getElement().querySelector(".markerSelect").textContent = SYdata==="분양유형"?marker.type:SYdata==="분양현황"?marker.state:SYdata==="분양평당가"?marker.perPrice:SYdata==="분양세대수"?marker.quantity:marker.period;
        });
    }
    const SYlistViewButton = () => {
        window.location.href = `/bunyang?bubdong_code=${SYdata.addressInfo.bubdong_code}`;
    }
    return(
        <div className="mapSection">   
            <div className="mapAreaSelectBoxWrap">
                {SYmapCode.bubdongCode ? (
                <div className="mapAreaSelect">
                    <div className="region" onClick={() => SYareaSelectBox(SYmapCode.bubdongCode, 0)}>{SYmapCode.sido}</div>
                    {SYmapCode.gugun ? <div className="region" onClick={() => SYareaSelectBox(SYmapCode.bubdongCode, 2)}>{SYmapCode.gugun}</div> : null}
                    {SYmapCode.dong ? <div className="region" onClick={() => SYareaSelectBox(SYmapCode.bubdongCode, 5)}>{SYmapCode.dong}</div> : null}
                </div>
                ): null}
            </div> 
            {SYcheckAreaLayerPopup && SYareaLayerPopup!==null ?(
            <SYareaSelectLayerPopup SYdata={SYareaLayerPopup} SYmapPositionChange={SYmapPositionChange} SYsetAreaLayerPopup={SYsetAreaLayerPopup} SYsetCheckAreaLayerPopup={SYsetCheckAreaLayerPopup} />
            ) : null}
            <div className="mapFunctionWrap">
                <div className="mapFunction">
                    <button type="button" className="functionButton tooltip" aria-pressed={SYmapFunction.bunyang} aria-label="분양">
                        <i className="SYicon"></i>
                    </button>
                </div>
                <div className="tooltipBox" aria-hidden={!SYmapFunction.bunyang}>
                    <button type="button" className="facilityItem" aria-expanded={SYmapFunction.facility} onClick={() => SYfacilityListOpen()}>{SYmarkerViewType}</button>
                    <div className="facilityList">
                    {SYfacilityList.map((SYloopData, SYindex) => (
                        <a key={SYindex} href="#" aria-selected={SYloopData===SYmarkerViewType?true:false} onClick={(e) => { e.preventDefault; SYfacilitySelect(SYloopData); }}>{SYloopData}</a>
                    ))}
                    </div>
                </div>
            </div>  
            <button type="button" className="listViewButton" onClick={() => SYlistViewButton()}><i className="SYicon"></i>리스트</button>
            <div ref={SYmapElement} className="mapArea"></div>
        </div>
    );
}

export default React.memo(SYmapComponents);