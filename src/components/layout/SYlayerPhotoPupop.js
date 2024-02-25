import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";

function SYlayerPhotoPupop({ SYdata, SYphotoPopupCheck, SYimageNo }) {
    const [SYswiper, SYsetSwiper] = useState(null);
    const SYprevButton = useRef(null);
    const SYnextButton = useRef(null);
    const [SYcount, SYsetCount] = useState(SYimageNo?SYimageNo:0);
    const SYmodal = useRef();
    useEffect(() => {
        if(SYswiper){
            SYswiper.slideTo((SYimageNo ? SYimageNo : 0), 0, false);
        }
    }, [SYswiper]);
    const SYoutSideClick = (e) => {
        if(SYmodal.current && !SYmodal.current.contains(e.target)) {
            SYphotoPopupCheck("close");            
        }
    }
    const SYpageView = (SYindex) => {
        SYsetCount(SYindex);
    }
    return(
        <div className="SYpopupLayerWrap" onClick={SYoutSideClick}>
            <div className="popupContentWrap" ref={SYmodal}>
                <div className="popupHeader">
                    <div className="headerTitle">{SYcount + 1}/{SYdata.length}</div>
                    <button type="button" className="close" onClick={() => SYphotoPopupCheck("close")}>
                        <i className="SYicon"></i>
                    </button>
                </div>
                <div className="popupContent">
                    <div className="photoViewContentWrap">
                        <Swiper className="photoSwiper" onSwiper={SYsetSwiper} slidesPerView={1} navigation={{prevEl: SYprevButton.current, nextEl: SYnextButton.current }} modules={[Navigation]} onSlideChange={(e) => SYpageView(e.activeIndex)}>
                            {SYdata.map((SYloopData, SYindex) => (
                            <SwiperSlide key={SYindex}>
                                <div className="photoWrap">
                                    <img src={SYloopData.image_url} />
                                </div>
                                <h2 className="photoTitle">{SYloopData.title}</h2>
                            </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SYlayerPhotoPupop;