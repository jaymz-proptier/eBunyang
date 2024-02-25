import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function YJareaBizList({ SYdata }) {
  if (!SYdata) return "";

  const settings = {
    responsive: [
      {
        breakpoint: 9999,
        settings: "unslick",
      },
      {
        breakpoint: 1024,
        settings: {
          dots: true,
          infinite: false,
          slidesToShow: 2, //한 화면에 보이는 슬라이드 개수
          slidesToScroll: 2, //각 슬라이드 넓이에 맞게 슬라이드 영역내 보이는 슬라이드 수 자동 설정
          vertical: false,
          verticalSwiping: false,
          adaptiveHeight: true,
          rows: 2,
          appendDots: (dots) => <div className="swiper-pagination"> {dots} </div>,
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
    <div className="articleContent">
      <div className="complexColumn">
        <div className="complexContentArea">
          <div className="articleWrap">
            <div className="articleTitle">
              <div className="title">사전청약 주요지구</div>
            </div>
            <div className="articleContent">
              <ul className="applyList">
                <Slider {...settings}>
                  {SYdata?.map((YJdata) => (
                    <li className="applyListItem">
                      <Link to={`/newCity/detail?biz_no=${YJdata.biz_no}`} className="linkItem">
                        {YJdata.biz_nm}
                        <span className="num">{YJdata.housing_cnt}</span>
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
  );
}

export default YJareaBizList;
