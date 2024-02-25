import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useTipListPreviewQuery } from "../../apis/bunyang/tip";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function SYtipPreview() {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category") || "";
  const step = searchParams.get("step") || "";
  const [SYdata, setSYdata] = useState([]);

  const { data, refetch } = useTipListPreviewQuery({
    params: {
      category: category,
    },
    onSuccess: (data) => {
      setSYdata(data.data.result);
    },
    onError: (error) => {
      console.log("Error[useTipListPreviewQuery]", error);
    },
  });

  useEffect(() => {
    refetch();
  }, [category]);

  //STEP별 목록
  function SYtipPreviewStep({ SYdata }) {
    if (!SYdata) return "";

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
                      {SYdata.dataList.map((SYloopData, SYindex) => (
                        <li
                          key={SYindex}
                          className="stepItem"
                          aria-selected={
                            SYloopData.step_cd === step ? false : true
                          }
                        >
                          <a
                            href="#"
                            className="itemWrap"
                            onClick={(e) => {
                              e.preventDefault();
                              setSearchParams({
                                category: category,
                                step: SYloopData.step_cd,
                              });
                            }}
                          >
                            <div className="stepWrap">
                              <i
                                className="Icon_checkCircle"
                                aria-label="on"
                              ></i>
                              <div className="stpeTitle">
                                {SYloopData.step_no}
                              </div>
                            </div>
                            <div className="itemTitle">
                              {SYloopData.step_nm}
                            </div>
                          </a>
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

  //인기 콘텐츠
  function SYtipPreviewReadRank({ SYdata }) {
    if (!SYdata) return "";

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
      <div className="complexContentArea popular">
        <div className="columnContentWrap">
          <div className="articleWrap">
            <div className="articleTitleWrap">
              <div className="articleTitle">인기 콘텐츠</div>
            </div>
            <div className="articleContentWrap">
              <div className="articleContent">
                <div className="popularContent">
                  <ul className="itemList">
                    <Slider {...settings}>
                      {SYdata.map((SYloopData, SYindex) => (
                        <li key={SYindex} className="popularItem">
                          <div className="categoryHash">
                            #{SYloopData.category_nm}
                          </div>
                          <div className="item">
                            <Link
                              to={`/tip/detail?blog_cd=${SYloopData.blog_cd}`}
                              className="itemWrap"
                            >
                              {SYloopData.title}
                            </Link>
                          </div>
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

  return (
    <>
      {SYdata.stepList && SYdata.stepList.categoryCode ? (
        <SYtipPreviewStep SYdata={SYdata.stepList} />
      ) : (
        <SYtipPreviewReadRank SYdata={SYdata.readRankList} />
      )}
    </>
  );
}

export default SYtipPreview;
