import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";

function insidePopup({ SYdata, insideopen, insideSYdetailPopupState, imgIndexB }) {
  const [SYswiper, SYsetSwiper] = useState(null);
  const swiperRef = React.useRef(null);

  //console.log("imgIndexB", imgIndexB);
  //console.log("SYdata", SYdata);

  useEffect(() => {
    //console.log("SYdata", SYdata);
    if (SYswiper) {
      SYswiper.slideTo(imgIndexB ? imgIndexB + 1 : -1, 0, false);
    }
  }, [imgIndexB]);

  return (
    <div className={insideopen ? "detailLayerPopup open" : "detailLayerPopup"}>
      <div className="detailLayer">
        <div className="popupLayer">
          <button
            className="popupLayerClose"
            onClick={() => {
              insideSYdetailPopupState(false);
            }}
          ></button>
          <div className="popupSlider">
            <Swiper onSwiper={SYsetSwiper} loop={false} slidesPerView={1} modules={[Navigation]} ref={swiperRef}>
              {SYdata.map((SYloopData, SYindex) => (
                <SwiperSlide key={SYindex} className="swiper-slide">
                  <div className="slideContent">
                    <div className="popupLayerinfoWrap popupLayerimageWrap">
                      <div className="popupImage">
                        <img src={SYloopData.image_url} alt="{SYloopData.title}" />
                      </div>
                      {SYloopData.title ? <div className="popupTitle">{SYloopData.title}</div> : <div className="popupTitle">{SYloopData.img_div}</div>}
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          {/* <div onClick={() => swiperRef.current.swiper.slidePrev()} className="popup-button-next"></div>
                <div onClick={() => swiperRef.current.swiper.slideNext()} className="popup-button-prev"></div> */}
        </div>
      </div>
    </div>
  );
}

export default insidePopup;
