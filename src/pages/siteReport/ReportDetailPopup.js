import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";

function newCityDetailPopup({ SYdata, open, SYdetailPopupState, imgIndex }) {
  const [SYswiper, SYsetSwiper] = useState(null);
  const swiperRef = React.useRef(null);

  // console.log(imgIndex);
  //console.log("SYdata", SYdata);

  useEffect(() => {
    if (SYswiper) {
      SYswiper.slideTo(imgIndex ? imgIndex + 1 : 1, 0, false);
    }
  }, [imgIndex]);

  return (
    <div className={open ? "detailLayerPopup open" : "detailLayerPopup"}>
      <div className="detailLayer">
        <div className="popupLayer">
          <button
            className="popupLayerClose"
            onClick={() => {
              SYdetailPopupState(false);
            }}
          ></button>
          <div className="popupSlider">
            <Swiper onSwiper={SYsetSwiper} loop={true} slidesPerView={1} modules={[Navigation]} ref={swiperRef}>
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

export default newCityDetailPopup;
