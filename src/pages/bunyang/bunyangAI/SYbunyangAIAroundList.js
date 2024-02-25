import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import 'swiper/css';

function SYbunyangAIAroundList( { SYdata } ) {
    const swiperRef = React.useRef(null);
    const SYprevButton = useRef(null);
    const SYnextButton = useRef(null);
    const SYpagination = {
        clickable: true,
    }
    return(
        <div className="articleWrap AIAround">
            <div className="articleTitle">주변 분양예정 아파트</div>
            <div className="articleContentWrap">
                <div className="articleContent">
                    <div className="slideWrap">
                        {/* navigation={{prevEl: SYprevButton.current, nextEl: SYnextButton.current }} */}
                        <Swiper className="swiper mySwiper aroundBunyangSwiper" pagination={SYpagination} loop={true} slidesPerView={1} modules={[Navigation, Pagination]} ref={swiperRef}>
                            {SYdata.map((SYloopData, SYindex) => (
                            <SwiperSlide key={SYindex} className="swiper-slide">
                                <Link to={`/bunyang/detail?build_dtl_cd=${SYloopData.build_dtl_cd}&supp_cd=${SYloopData.supp_cd}`} className="slideContent">
                                    <div className="contentBox">
                                        {SYloopData.image_url ? (
                                        <div className="complexImg" style={{backgroundImage:`url(${SYloopData.image_url})`}}></div>
                                        ) : (
                                        <div className="complexImg"></div>
                                        )}
                                    </div>
                                    <div className="contentBox">
                                        <div className="slideComplexLabel">{SYloopData.recruit_date} 분양예정</div>
                                        <div className="slideComplexTxt">
                                            <div className="titleWrap">
                                                <div className="title">{SYloopData.build_nm}</div>
                                            </div>
                                            <div className="textWrap">
                                                <div className="address">{SYloopData.address}</div>
                                                <div className="info">총 {SYloopData.total_house_cnt}세대 · 분양 {SYloopData.house_supp_cnt}세대 · {SYloopData.cmpy_nm}</div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>                    
                            </SwiperSlide>
                            ))}
                            
                            <div className="swiper-button-next" onClick={() => swiperRef.current.swiper.slideNext()}></div>
                            <div className="swiper-button-prev" onClick={() => swiperRef.current.swiper.slidePrev()}></div>

                        </Swiper>
                    </div>
                </div>
            </div>

            
                
        </div>
    );
}
export default SYbunyangAIAroundList;