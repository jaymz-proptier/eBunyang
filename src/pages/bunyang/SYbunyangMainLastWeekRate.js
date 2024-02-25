import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useListPreviewQuery } from "../../apis/bunyang/bunyang";
import { useRecoilValue } from "recoil";
import { bunyangFilterState, bunyangSchduleDateAtom } from "../../recoils/bunyang";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function SYbunyangMainLastWeekRate({ bunyangMPopupState }) {
  const [SYdata, setSYdata] = useState([]);
  const [mainPopupOpen, setMainPopupOpen] = useState(false);
  const SYbubdong = useRecoilValue(bunyangFilterState);
  const SYcalendarDay = useRecoilValue(bunyangSchduleDateAtom);
  const settings = {
    dots: true,
    arrows: false,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    vertical: false,
    verticalSwiping: false,
    adaptiveHeight: true,
    appendDots: (dots) => <div className="swiper-pagination"> {dots} </div>,
  };
  const settings2 = {
    dots: true,
    arrows: true,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    vertical: false,
    verticalSwiping: false,
    adaptiveHeight: true,
    appendDots: (dots) => <div className="swiper-pagination"> {dots} </div>,
    responsive: [
      {
        breakpoint: 680,
        settings: {
          arrows: false,
        },
      },
    ],
  };
  const { data, isLoading, refetch } = useListPreviewQuery({
    onSuccess: (data) => {
      setSYdata(data.data.result);
    },
    onError: (error) => {
      console.log("Error[SYbunyangMainLastWeekRate]", error);
    },
  });

  useEffect(() => {
    refetch();
  }, []);


  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
  });

  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
    });
  };

  let popupImgSize = windowSize.width;

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (isLoading) return "";

  return (
    <>
      <div className="bunyangMobileTop">
        <div className="bunyangSlider">
          <Slider {...settings}>
            <div className="bunyangSliderInner">
              <ul>
                <li>
                  <button onClick={() => { bunyangMPopupState(true) }}>
                    <span>{SYbubdong.bubdong.sido ? SYbubdong.bubdong.sido : "전국"}</span>
                    당첨 가점 평균
                  </button>
                </li>
                <li>
                  <button onClick={() => { bunyangMPopupState(true) }}>
                    <span>{SYcalendarDay.substring(4, 6) * 1}월 {SYcalendarDay.substring(6, 8) * 1}일</span>
                    청약 일정 확인
                  </button>
                </li>
              </ul>
            </div>
            <div className="bunyangSliderInner">
              <div className="bunyangCalculatorBanner">
                <button onClick={() => setMainPopupOpen(true)}>
                  <span className="info">
                    유상 옵션 계산하기 어렵다면? e분양에서 할 수 있어요!
                  </span>
                </button>
              </div>
            </div>
            <div className="bunyangSliderInner">
              {SYdata.blogLink ? (
                <div className="bunyangWeeklyBanner">
                  <a href={SYdata.blogLink.link_url} className="" aria-label={`메인배너${SYdata.blogLink.type}`} target="_blank" rel="noopener noreferrer">
                    <span className="title">{SYdata.blogLink.title}</span>
                    <span className="info">{SYdata.blogLink.memo}</span>
                  </a>
                </div>
              ) : null}
            </div>
          </Slider>
        </div>
      </div>
      <div className="SYbunyangLstWeekRateWrap">
        <div className="LastWeekRate">
          <div className="LastWeekRateHeader">
            <h3 className="title">지난 주 청약 경쟁률 TOP3</h3>
          </div>
          <div className="LastWeekRateList">
            <ul>
              {SYdata.srRateList?.map((SYloopData, SYindex) => (
                <li key={SYindex}>
                  <Link
                    to={`/bunyang/detail?build_dtl_cd=${SYloopData.build_dtl_cd}&supp_cd=${SYloopData.supp_cd}`}
                  >
                    <span className="rank">0{SYindex + 1}</span>
                    <div className="title">{SYloopData.build_nm}</div>
                    <div className="countInfo">
                      <span className="count">
                        <label>공급수</label>
                        {SYloopData.subsr_supp_cnt.replace(
                          /(\d)(?=(?:\d{3})+(?!\d))/g,
                          "$1,"
                        )}
                      </span>
                      <span className="count">
                        <label>청약건수</label>
                        {SYloopData.py_sr_cnt.replace(
                          /(\d)(?=(?:\d{3})+(?!\d))/g,
                          "$1,"
                        )}
                      </span>
                    </div>
                    <span className="rate">{SYloopData.py_sr_rate}:1</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className={`bunyangMainPopup ${mainPopupOpen ? "open" : ""}`}>
        <div className="bunyangPopupInner">
          <div className="bunyangPopupContent">
            <div className="bunyangPopupClose">
              <button onClick={() => setMainPopupOpen(false)}></button>
            </div>
            <ul>
              <Slider {...settings2}>
                <li>
                  <div className="title">유상 옵션 계산기</div>
                  <div className="popupImg">
                    {popupImgSize > 680 ? (
                      <img
                        src="/public/images/bunyang_popup_step1_pc.png"
                        alt=""
                        className="pc"
                      />
                    ) : (
                      <img
                        src="/public/images/bunyang_popup_step1.png"
                        alt=""
                        className="mobile"
                      />
                    )}
                  </div>
                  <div className="info">
                    내가 원하는 동호수에 맞춰 유상옵션 및 최종 분양가를
                    계산해볼 수 있어요!
                  </div>
                </li>
                <li>
                  <div className="title">옵션 선택</div>
                  <div className="popupImg">
                    {popupImgSize > 680 ? (
                      <img
                        src="/public/images/bunyang_popup_step2_pc.png"
                        alt=""
                        className="pc"
                      />
                    ) : (
                      <img
                        src="/public/images/bunyang_popup_step2.png"
                        alt=""
                        className="mobile"
                      />
                    )}
                  </div>
                  <div className="info">
                    내가 선택한 호수에 해당하는 옵션을 선택할 수 있어요
                  </div>
                </li>
                <li>
                  <div className="title">분양가, 옵션가 계산</div>
                  <div className="popupImg">
                    {popupImgSize > 680 ? (
                      <img
                        src="/public/images/bunyang_popup_step3_pc.png"
                        alt=""
                        className="pc"
                      />
                    ) : (
                      <img
                        src="/public/images/bunyang_popup_step3.png"
                        alt=""
                        className="mobile"
                      />
                    )}
                  </div>
                  <div className="info">
                    선택한 옵션의 가격이 합산된 최종 예상 분양가를 알 수
                    있어요!
                  </div>
                </li>
                <li>
                  <div className="title">옵션계산 단지 보기</div>
                  <div className="popupImg">
                    {popupImgSize > 680 ? (
                      <img
                        src="/public/images/bunyang_popup_step4_pc.png"
                        alt=""
                        className="pc"
                      />
                    ) : (
                      <img
                        src="/public/images/bunyang_popup_step4.png"
                        alt=""
                        className="mobile"
                      />
                    )}
                  </div>
                  <div className="info">
                    테마 필터에서 옵션계산을 선택하면 옵션계산이 가능한
                    단지만 볼 수 있어요!
                  </div>
                </li>
              </Slider>
            </ul>
          </div>
        </div>
      </div>

      <div className="bunyangCalculatorBanner">
        <button onClick={() => setMainPopupOpen(true)}>
          <span className="title">유상옵션 계산기</span>
          <span className="info">
            유상 옵션 계산하기 어렵다면? e분양에서 할 수 있어요!
          </span>
        </button>
      </div>
      {SYdata.blogLink ? (
        <div className="bunyangWeeklyBanner">
          <a href={SYdata.blogLink.link_url} className="" aria-label={`메인배너${SYdata.blogLink.type}`} target="_blank" rel="noopener noreferrer">
            <span className="title">{SYdata.blogLink.title}</span>
            <span className="info">{SYdata.blogLink.memo}</span>
          </a>
        </div>
      ) : null}
    </>
  );
}

export default SYbunyangMainLastWeekRate;
