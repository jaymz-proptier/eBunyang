import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function SYtipStep({ SYdata, SYdetail }) {
  if (!SYdata) return null;
  if (SYdata.dataList.length === 0) return null;
  if (!SYdetail) return null;

  const settings = {
    responsive: [
      {
        breakpoint: 9999,
        settings: "unslick",
      },
      {
        breakpoint: 680,
        settings: {
          dots: true,
          infinite: false,
          slidesToShow: 1, //한 화면에 보이는 슬라이드 개수
          slidesToScroll: 1, //각 슬라이드 넓이에 맞게 슬라이드 영역내 보이는 슬라이드 수 자동 설정
          vertical: false,
          verticalSwiping: false,
          adaptiveHeight: true,
          appendDots: (dots) => (
            <div className="swiper-pagination"> {dots} </div>
          ),
        },
      },
    ],
    beforeChange: function (currentSlide, nextSlide) {
      console.log("before change", currentSlide, nextSlide);
    },
    afterChange: function (currentSlide) {
      console.log("after change", currentSlide);
    },
  };

  return (
    <div className="complexContentArea step">
      <div className="columnContentWrap">
        <div className="articleWrap">
          <div className="articleTitleWrap">
            <div className="articleTitle">
              <span className="strong">{SYdata.categoryName}</span> 내 집 마련
            </div>
            <div className="unfoldBtn" aria-pressed="true">
              <i className="Icon_unfold"></i>
            </div>
          </div>
          <div className="articleContentWrap">
            <div className="articleContent">
              <div className="stepContent" aria-pressed="true">
                <ul className="itemList">
                  <Slider {...settings}>
                    {SYdata.dataList?.map((loopData, index) => (
                      <li
                        key={index}
                        className="stepItem"
                        aria-selected={
                          SYdetail.step_cd === loopData.step_cd ? false : true
                        }
                      >
                        <Link
                          to={`/tip?category=${SYdata.categoryCode}&step=${loopData.step_cd}`}
                          className="itemWrap"
                        >
                          <div className="stepWrap">
                            <i className="Icon_checkCircle" aria-label="on"></i>
                            <div className="stpeTitle">{loopData.step_no}</div>
                          </div>
                          <div className="itemTitle">{loopData.step_nm}</div>
                        </Link>
                      </li>
                    ))}
                  </Slider>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SYtipStep;
