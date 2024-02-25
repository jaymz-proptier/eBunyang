import React, { useState, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";

//e분양 Pick
function SYhomePickVisit({ SYdata }) {
  const [isActive, setIsActive] = useState(false);
  const swiperRef = useRef(null);
  const SYpagination = { clickable: true };

  const playSlider = (e) => {
    e.preventDefault();
    setIsActive((current) => !current);
    swiperRef.current.swiper.autoplay.start();
  };
  const pauseSlider = (e) => {
    e.preventDefault();
    setIsActive((current) => !current);
    swiperRef.current.swiper.autoplay.stop();
  };

  //현장방문(리포트단지) 10개단지 중 3개 단지 랜덤으로 자동 롤링
  return (
    <div className="homePickVisit">
      <Swiper
        pagination={SYpagination}
        loop={true}
        slidesPerView={1}
        autoplay={{ delay: 1500 }}
        modules={[Pagination, Autoplay]}
        ref={swiperRef}
        className="homePickVisitSlider"
      >
        {SYdata.map((SYloopData, SYindex) => (
          <SwiperSlide key={SYindex} className="swiper-slide">
            <div
              className="homePickVisitImage"
              style={{ backgroundImage: "url(" + SYloopData.image_url + ")" }}
            ></div>
            <div className="homePickVisitTxt">
              <div className="homePickVisitCategory">
                {SYloopData.vido_yn == "Y" ? (
                  <div className="btnRnd04">
                    <span>내부영상</span>
                  </div>
                ) : null}

                {SYloopData.inside_video_yn == "Y" ? (
                  <div className="btnRnd04">
                    <span>입지영상</span>
                  </div>
                ) : null}
              </div>
              <div className="title">{SYloopData.report_title}</div>
              <div className="link">
                <Link
                  to={`/siteReport/detail?report_cd=${SYloopData.report_cd}`}
                >
                  <span>{SYloopData.build_nm}</span>
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="homePickBtnBx">
        <div
          className={
            isActive ? "btnPause homePickBtn pause" : "btnPause homePickBtn"
          }
          onClick={pauseSlider}
        >
          <button></button>
        </div>
        <div
          className={
            isActive ? "btnPlay homePickBtn pause" : "btnPlay homePickBtn"
          }
          onClick={playSlider}
        >
          <button></button>
        </div>
      </div>
    </div>
  );
}
export default SYhomePickVisit;
