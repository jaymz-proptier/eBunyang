import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import { SYnumberFormat } from "../../hooks/";
import CountUp from "react-countup";

function SYhomeAi({ SYdata }) {
  const SYpagination = { clickable: true };
  const SYscoreBar = [1, 2, 3, 4, 5];

  return (
    <div className="commonLineBx homeBunyangAi">
      <div className="commonHomeHeader">
        <p>분양 AI</p>
      </div>
      {/* 예상경쟁률/예상가점 있는 단지만 노출 분양 중 단지, 모집공고 빠른 순으로 노출 :: 없을 경우 분양계획단지 빠른 순 서울 > 경기,인천 > 그외 */}
      {SYdata ? (
        <Swiper
          pagination={SYpagination}
          loop={true}
          slidesPerView={1}
          modules={[Pagination]}
          className="homeBunyangAiSlider"
        >
          {SYdata.map((SYloopData, SYindex) => (
            <SwiperSlide key={SYindex} className="swiper-slide">
              <a href={`/bunyang/detail?build_dtl_cd=${SYloopData.build_dtl_cd}&supp_cd=${SYloopData.supp_cd}`}>
                <div className="homeBunyangAiTitle">
                  <div className="btnRnd01">
                    <span>{SYloopData.sido}</span>
                  </div>
                  <div className="title">
                    <p>{SYloopData.build_nm}</p>
                  </div>
                </div>
                <div className="homeBunyangAiList">
                  <div className="listBx">
                    <div className="title">
                      <p>예상 경쟁률</p>
                    </div>
                    <div className="competit">
                      <div className="scoreBarWrap">
                        {SYscoreBar.map((scoreData, SYindex) => (
                          <div
                            key={SYindex}
                            className="scoreBar"
                            aria-label={`경쟁률${scoreData}`}
                            aria-hidden={
                              scoreData <= SYloopData.exp_sr_rate_cnt ? false : true
                            }
                          ></div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="listBx score">
                    <div className="title">
                      <p>예상 가점</p>
                    </div>
                    <div className="info">
                      <p>
                        {SYloopData.exp_py_sr_point_min} ~{" "}
                        {SYloopData.exp_py_sr_point_max}점
                      </p>
                    </div>
                  </div>
                  {/* 분양계획이 노출될 경우 분양시기로 변경 */}
                  {SYloopData.subsr_1st_date === "" ? (
                    <div className="listBx date">
                      <div className="title">
                        <p>분양시기</p>
                      </div>
                      <div className="info">
                        <p>{SYloopData.recruit_date}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="listBx date">
                      <div className="title">
                        <p>1순위 청약일</p>
                      </div>
                      <div className="info">
                        <p>{SYloopData.subsr_1st_date}</p>
                      </div>
                    </div>
                  )}
                </div>
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div>{/* 데이터가 없는경우 */}</div>
      )}
    </div>
  );
  // }
}
export default SYhomeAi;
