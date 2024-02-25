import React, { useEffect, useState, useRef } from "react";
import axios from 'axios';

let SYmap = null, SYposition = {"lat":"", "lng":"", "zoom":18};
const { naver } = window;

if(localStorage.getItem("SYposition")) SYposition = JSON.parse(localStorage.getItem("SYposition"));

function SYmapBaseComponents({SYmapAddressUpdate}) { 
    const [SYdata, SYsetData] = useState([]);      
    const [SYmapData, SYsetMapData] = useState([]); 
    const SYmapElement = useRef(null);
    const SYfetchData = async() =>  {
        try {
            const SYresponse = await axios.get("//new-api.ebunyang.co.kr/bunyang/addressBasicPos");
            SYsetData(SYresponse.data);
        } catch(e) {
            console.log("error :", e);
        }
    };
    useEffect(() => {
        if(!SYposition.lat && !SYposition.lng) {
            SYfetchData();
        }
    }, []);
    useEffect(() => {
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
    }, []);
    const SYmapBounding = async() => {
        const SYmapPosition = SYmap.getCenter(); 
        const SYbounds = SYmap.getBounds();
        const SYswLatLng = SYbounds.getSW();
        const SYneLatLng = SYbounds.getNE();

        SYposition.lat = SYmapPosition.lat();
        SYposition.lng = SYmapPosition.lng();
        SYposition.zoom = SYmap.getZoom();

        localStorage.setItem("SYposition", '{"lat":'+ SYposition.lat +', "lng":'+ SYposition.lng +', "zoom":'+ SYposition.zoom +'}');

        window.history.pushState("", "", `/bunyang/?SYmap=${SYposition.lat }:${SYposition.lng}:${SYposition.zoom}`);

        const SYparam = {top: encodeURIComponent(SYswLatLng.lng()), right: encodeURIComponent(SYswLatLng.lat()), bottom: encodeURIComponent(SYneLatLng.lng()), left: encodeURIComponent(SYneLatLng.lat()), ypos: encodeURIComponent(SYposition.lat), xpos: encodeURIComponent(SYposition.lng), zoom: SYposition.zoom};

        try {
            const SYresponse = await axios.get("//new-api.ebunyang.co.kr/bunyang/BasicMapList", {params: SYparam});
            const SYdata = SYresponse.data.result; 
            if(SYdata.addressInfo) {   
                SYmapAddressUpdate({sido: SYdata.addressInfo.sido, gugun: SYdata.addressInfo.gugun, dong: SYdata.addressInfo.dong}); 
            }
            if(SYdata.mapList) SYsetMapData(SYdata.mapList);
        } catch(e) {
            console.log("error :", e);
        }
        
    }
    const SYmapDataUpdate = () => {
        SYmapBounding();      
    }
    useEffect(() => {
        SYmapBounding();
    }, [])

    if(SYdata.result || (SYposition.lat && SYposition.lng)) {
        if(SYdata.result) {
            SYposition.lat = SYdata.result.addressInfo.ypos;    
            SYposition.lng = SYdata.result.addressInfo.xpos;     
        }
        return (
            <div className="mapSection">
                <div ref={SYmapElement} className="mapArea" style={{width:"1000px", height:"400px"}}></div>
                <div className="mapListLayer" aria-hidden="false">
                    <div className="listContentWrap">
                        {SYmapData ? (
                        <ul className="listItem SYproductList">
                        </ul>
                        ) : null }
                    </div>
                </div>
            </div>
        );
    }
}

export default React.memo(SYmapBaseComponents);