import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";

function basicPopup({ SYdata, basicopen, basicSYdetailPopupState, imgIndexBasic }) {
  const [SYswiper, SYsetSwiper] = useState(null);
  const swiperRef = React.useRef(null);

  //console.log("imgIndexB", imgIndexB);
  //console.log("SYdata", SYdata);

  useEffect(() => {
    //console.log("SYdata", SYdata);
    if (SYswiper) {
      SYswiper.slideTo(imgIndexBasic ? imgIndexBasic + 1 : 1, 0, false);
    }
  }, [imgIndexBasic]);

  return (
    <div className={basicopen ? "detailLayerPopup open" : "detailLayerPopup"}>
      <div className="detailLayer">
        <div className="popupLayer">
          <button
            className="popupLayerClose"
            onClick={() => {
              basicSYdetailPopupState(false);
            }}
          ></button>
          <div className="popupSlider">
            {/* <Swiper onSwiper={SYsetSwiper} loop={true} slidesPerView={1} modules={[Navigation]} ref={swiperRef}>
              {SYdata.map((SYloopData, SYindex) => (
                <SwiperSlide key={SYindex} className="swiper-slide"> */}
            <div className="slideContent">
              <div className="popupLayerinfoWrap popupLayerimageWrap">
                <div className="popupImage">
                  <img src={SYdata.image_url} alt="{SYloopData.title}" style={{ height: "60vh" }} />
                </div>
                {SYdata.title ? <div className="popupTitle">{SYdata.title}</div> : <div className="popupTitle">{SYdata.img_div}</div>}
              </div>
            </div>
            {/* </SwiperSlide>
              ))}
            </Swiper> */}
          </div>
          {/* <div onClick={() => swiperRef.current.swiper.slidePrev()} className="popup-button-next"></div>
                <div onClick={() => swiperRef.current.swiper.slideNext()} className="popup-button-prev"></div> */}
        </div>
      </div>
    </div>
  );
}

export default basicPopup;
