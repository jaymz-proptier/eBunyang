import React, { useEffect, useState, useRef } from "react";
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from "swiper/react";


function SYmoveInPlanInfo({ SYdata }) {
    const [SYtabButton, SYsetTabButton] = useState(SYdata[0].id);
    const [planPopup, setPlanPopup] = useState(false);
    const [planSwiper, setPlanSwiper] = useState(null);
    const [planImgIndex, setPlanImgIndex] = useState(null);
    const planSwiperRef = useRef(null);

    function tabClick(tabId) {
        SYsetTabButton(tabId);
    }

    useEffect(() => {
        if (planSwiper) {
            planSwiper.slideTo((planImgIndex ? planImgIndex : 0), 0, false);
        }
    }, [planImgIndex]);

    return (
        <div className="articleWrap">
            <div className="articleTitle">평형정보</div>
            <div className="articleContentWrap">
                <div className="tabContentWrap">
                    <div className="plantabWrap">
                        <div className="tabList">
                            <div className="tabListItemWrap">
                                <Swiper modules={[Navigation]} slidesPerView={'auto'} freeMode={true}>
                                    {SYdata.map((SYloopData) => (
                                        <SwiperSlide key={SYloopData.id} className="planListItem swiper-slide" role="tab" aria-selected={SYtabButton === SYloopData.id ? true : false} onClick={() => tabClick(SYloopData.id)}>{SYloopData.py_nm}</SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                        </div>
                    </div>
                    {SYdata.map((SYloopData, imgIndex) => (
                        <div key={SYloopData.id} className="planTypepanel" aria-hidden={SYtabButton === SYloopData.id ? false : true} role="tabpanel">
                            <div className="planContentWrap">
                                <div className="articleWrap">
                                    <div className="articleContentWrap">
                                        <div className="articleContent">
                                            <div className="planTypeImg" onClick={() => { setPlanImgIndex(imgIndex), setPlanPopup(true) }}>
                                                {SYloopData.image_url ? (<img src={SYloopData.image_url} alt={SYloopData.py_nm} className="Img_plan" />) : null}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="articleWrap planBasicInfo">
                                    <div className="articleContentWrap">
                                        <div className="articleContent">
                                            <div className="planBasicInfoContent">
                                                <div className="infoIconWrap">
                                                    <div className="planIcon">
                                                        <i className="Icon_planInfo" aria-label="공급면적"></i>
                                                        <div className="iconInfoTitle">공급면적</div>
                                                        <div className="iconInfoCon">{SYloopData.supply_metter}㎡</div>
                                                    </div>
                                                    <div className="planIcon">
                                                        <i className="Icon_planInfo" aria-label="전용면적"></i>
                                                        <div className="iconInfoTitle">전용면적</div>
                                                        <div className="iconInfoCon">{SYloopData.private_meter}㎡</div>
                                                    </div>
                                                    <div className="planIcon">
                                                        <i className="Icon_planInfo" aria-label="분양세대수"></i>
                                                        <div className="iconInfoTitle">분양세대수</div>
                                                        <div className="iconInfoCon">{SYloopData.family_num}세대</div>
                                                    </div>
                                                    <div className="planIcon">
                                                        <i className="Icon_planInfo" aria-label="방"></i>
                                                        <div className="iconInfoTitle">방</div>
                                                        <div className="iconInfoCon">{SYloopData.room_num}개</div>
                                                    </div>
                                                    <div className="planIcon">
                                                        <i className="Icon_planInfo" aria-label="욕실수"></i>
                                                        <div className="iconInfoTitle">욕실수</div>
                                                        <div className="iconInfoCon">{SYloopData.bath_num}개</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>





            {/* 평형도 이미지 팝업 */}
            <div className={planPopup === false ? "planPopupWrap" : "planPopupWrap open"}>
                <div className="planPopupInner">
                    <div className="planPopupWrapper">
                        <div className="planPopupClose">
                            <button onClick={() => setPlanPopup(false)}></button>
                        </div>
                        <div className="planPopupContent">
                            <Swiper onSwiper={setPlanSwiper} modules={[Navigation]} slidesPerView={1} ref={planSwiperRef}>
                                {SYdata.map((SYloopData) => (
                                    <SwiperSlide key={SYloopData.id} className="planPopupImg">
                                        {SYloopData.image_url ? (<img src={SYloopData.image_url} alt={SYloopData.py_nm} className="Img_plan" />) : null}
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                        <div onClick={() => {planSwiperRef.current.swiper.slidePrev(), console.log("prev")}} className="popupButtonPrev"></div>
                        <div onClick={() => {planSwiperRef.current.swiper.slideNext(), console.log("next")}} className="popupButtonNext"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SYmoveInPlanInfo;