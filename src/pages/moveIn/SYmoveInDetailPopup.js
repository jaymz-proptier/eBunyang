import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";

function SYmoveInDetailPopup({ SYdata, open, SYdetailPopupState, imgIndex }) {
    const [SYswiper, SYsetSwiper] = useState(null);
    const swiperRef = useRef(null);
    const SYmodal = useRef();

    const SYoutSideClick = (e) => {
        if (SYmodal.current && !SYmodal.current.contains(e.target)) {
            SYdetailPopupState(false);
        }
    }

    // console.log(imgIndex);

    useEffect(() => {
        if (SYswiper) {
            SYswiper.slideTo((imgIndex ? imgIndex + 1 : 1), 0, false);
        }
    }, [imgIndex]);

    return (
        <div className={open ? "detailLayerPopup open" : "detailLayerPopup"} onClick={SYoutSideClick}>
            <div className="detailLayer">
                <div className="popupLayer" ref={SYmodal}>
                    <button className="popupLayerClose" onClick={() => { SYdetailPopupState(false) }}></button>
                    <div className="popupSlider">
                        <Swiper onSwiper={SYsetSwiper} loop={true} slidesPerView={1} modules={[Navigation]} ref={swiperRef}>
                            {SYdata.map((SYloopData, SYindex) => (
                                <SwiperSlide key={SYindex} className="swiper-slide">
                                    <div className="slideContent">
                                        <div className="popupLayerinfoWrap">
                                            <div className="popupImage">
                                                <img src={SYloopData.image_url} alt="{SYloopData.title}" />
                                            </div>
                                            <div className="popupTitle">{SYloopData.title}</div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                    <div onClick={() => swiperRef.current.swiper.slideNext()} className="popupButtonNext"></div>
                    <div onClick={() => swiperRef.current.swiper.slidePrev()} className="popupButtonPrev"></div>
                </div>
            </div>
        </div>
    );
}

export default SYmoveInDetailPopup;