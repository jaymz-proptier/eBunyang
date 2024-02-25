import React, { useEffect, useRef, useState } from "react";

const { naver } = window;
let SYdetailMap = null, SYdetailMap2 = null;
function SYbunyangLocationInfo({ SYdata }) {
  const SYmapElement = useRef(null);
  const SYmapElement2 = useRef(null);
  const [ SYmapExpand, SYsetMapExpand ] = useState(false);
  const [ SYmapZoomIn, SYsetMapZoomIn ] = useState(false);
  const [ SYmapZoomOut, SYsetMapZoomOut ] = useState(false);

  useEffect(() => {
    SYdetailMap = new naver.maps.Map(SYmapElement.current, {
        useStyleMap: true,
        minZoom: 12,
        maxZoom: 19,
        zoom: 16,
        center: new naver.maps.LatLng(SYdata.ypos, SYdata.xpos),		
        draggable: false,
        disableDoubleClickZoom: false,
        disableDoubleTapZoom: false,
        disableTwoFingerTapZoom: false,
        disableKineticPan: false,
        keyboardShortcuts: false,
        pinchZoom: false,
        scrollWheel: false,
        logoControl: false,
        mapDataControl: false,
        zIndex: 1000
    });  
         
    const SYmarker = new naver.maps.Marker({
        position: new naver.maps.LatLng(SYdata.ypos, SYdata.xpos),
        map: SYdetailMap,
        icon: {
            content: "<i class='Icon_marker'></i>",
            anchor: new naver.maps.Point(12, 12),
        }, 
    });

    
    SYdetailMap2 = new naver.maps.Map(SYmapElement2.current, {
        useStyleMap: true,
        minZoom: 12,
        maxZoom: 19,
        zoom: 16,
        center: new naver.maps.LatLng(SYdata.ypos, SYdata.xpos),
        logoControl: false,
        mapDataControl: false,
        zIndex: 1000
    });  
         
    const SYmarker2 = new naver.maps.Marker({
        position: new naver.maps.LatLng(SYdata.ypos, SYdata.xpos),
        map: SYdetailMap2,
        icon: {
            content: "<i class='Icon_marker'></i>",
            anchor: new naver.maps.Point(12, 12),
        }, 
    });
    
    naver.maps.Event.addListener(SYdetailMap2,"zoom_changed",function(){
        if(SYdetailMap2.getZoom() > 18) SYsetMapZoomIn(true);
        else SYsetMapZoomOut(false);
        if(SYdetailMap2.getZoom() < 13) SYsetMapZoomOut(true);
        else SYsetMapZoomIn(false);
    });
  }, [ SYdata ]); 
  const SYmapZoom = (SYtype) => {
      if(SYtype==="in") {
          if(SYdetailMap2.getZoom() < 19) {
              SYdetailMap2.setZoom(SYdetailMap2.getZoom() + 1);
              SYsetMapZoomIn(false);
              SYsetMapZoomOut(false);
              if(SYdetailMap2.getZoom() > 18) SYsetMapZoomIn(true);
          } else {
              SYsetMapZoomIn(true);
          }
      } else {
          if(SYdetailMap2.getZoom() > 12) {
              SYdetailMap2.setZoom(SYdetailMap2.getZoom() - 1);
              SYsetMapZoomIn(false);
              SYsetMapZoomOut(false);
              if(SYdetailMap2.getZoom() < 13) SYsetMapZoomIn(true);
          } else {
              SYsetMapZoomIn(true);
          }
      }
  }
  const SYmapExpanded = () => {
      if(SYmapExpand===true) {
          SYsetMapExpand(false);
      } else {
          SYsetMapExpand(true);          
          SYdetailMap2.setCenter(new naver.maps.LatLng(SYdata.ypos, SYdata.xpos));
          SYdetailMap2.setZoom(16);
          SYsetMapZoomIn(false);
          SYsetMapZoomOut(false);
      }
      
  }
  return (
      <div className="articleWrap location">
          <div className="articleTitle">위치</div>
          <div className="articleContentWrap">
              <div className="articleContent">
                  <div className="complexLocation">
                      <div className="locationMapWrap">
                          <div className="locationBtnWrap">
                              <a href="javascript:void(0);" className="locationBtn heightBtn" aria-pressed={SYmapExpand} onClick={() => SYmapExpanded()}><i className="Icon_large"></i></a>
                              <a href="javascript:void(0);" className="locationBtn zoomInBtn" onClick={() => SYmapZoom("in")} aria-desabled={SYmapZoomIn} aria-hidden={!SYmapExpand}><i className="Icon_zoomIn"></i></a>
                              <a href="javascript:void(0);" className="locationBtn zoomOutBtn" onClick={() => SYmapZoom("out")} aria-desabled={SYmapZoomOut} aria-hidden={!SYmapExpand}><i className="Icon_zoomOut"></i></a>
                          </div>
                          <div ref={SYmapElement} className="mapImg" aria-pressed="false" aria-hidden={SYmapExpand}></div>
                          <div ref={SYmapElement2} className="mapImg" aria-pressed="false" aria-hidden={!SYmapExpand}></div>
                      </div>
                      <div className="locationAddress">{SYdata.address}</div>
                  </div>
              </div>
          </div>
      </div>
  );
}

export default SYbunyangLocationInfo;