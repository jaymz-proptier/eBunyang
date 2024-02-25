import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

function SYmoveInPhotoComponent({ SYtitle, SYdata, SYdetailPopupState, checkImgUrl }) {

    const settings = {
        responsive: [
            {
                breakpoint: 9999,
                settings: "unslick",
            },
            {
                breakpoint: 680,
                settings: {
                    dots: false,
                    arrows: false,
                    infinite: true,
                    slidesToShow: 1, //한 화면에 보이는 슬라이드 개수
                    slidesToScroll: 1, //각 슬라이드 넓이에 맞게 슬라이드 영역내 보이는 슬라이드 수 자동 설정
                    vertical: false,
                    variableWidth: true,
                    verticalSwiping: false,
                    adaptiveHeight: false,
                },
            },
        ],
    };

    return (
        <div className="articleWrap complexPhoto">
            <div className="articleTitle">{SYtitle}</div>
            <div className="articleContentWrap">
                <div className="articleContent">
                    <Slider {...settings}>
                        {SYdata.map((SYloopData) => (
                            <div className="itemWrap" onClick={() => { checkImgUrl(SYloopData.id), SYdetailPopupState(true) }}>
                                <div className="itemImg">
                                    <div className="imgBox" style={{ backgroundImage: `url(${SYloopData.image_url})` }}></div>
                                </div>
                                <div className="itemText">
                                    <div className="listTitle">{SYloopData.title}</div>
                                    <div className="listContent">{SYloopData.memo}</div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </div>
    );
}

export default SYmoveInPhotoComponent;