import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";

function YJdevelopComponent({ SYdata }) {
  const SYpagination = {
    clickable: true,
  };
  const swiperRef = React.useRef(null);
  return (
    <div className="articleWrap develop">
      <div className="articleContent">
        <div className="articleTitle">
          <div className="text">개발호재</div>
          <div className="num">{SYdata.locationMapList !== 0 ? "06" : "05"}</div>
        </div>
        <div className="tableWrap" style={{ position: `relative` }}>
          <Swiper
            pagination={{
              type: "fraction",
            }}
            autoHeight={true}
            loop={false}
            slidesPerView={1}
            modules={[Pagination, Navigation]}
            ref={swiperRef}
          >
            {SYdata.developList.map((SYloopData, SYindex) => (
              <SwiperSlide key={SYindex} className="swiper-slide">
                <div key={SYindex} className="imgBox" style={{ backgroundImage: `url(${SYloopData.image_url})` }}></div>
                <div className="tableContent" key={SYindex}>
                  <div className="rowContent title">
                    <span className="developTitle">{SYloopData.title}</span>
                  </div>
                  {SYloopData.info1_title ? (
                    <div className="rowContent">
                      <span className="label">{SYloopData.info1_title}</span>
                      {SYloopData.info1}
                    </div>
                  ) : null}
                  {SYloopData.info2_title ? (
                    <div className="rowContent">
                      <span className="label">{SYloopData.info2_title}</span>
                      {SYloopData.info2}
                    </div>
                  ) : null}
                  {SYloopData.info3_title ? (
                    <div className="rowContent">
                      <span className="label">{SYloopData.info3_title}</span>
                      {SYloopData.info3}
                    </div>
                  ) : null}
                  {SYloopData.info4_title ? (
                    <div className="rowContent">
                      <span className="label">{SYloopData.info4_title}</span>
                      {SYloopData.info4}
                    </div>
                  ) : null}
                  {SYloopData.info5_title ? (
                    <div className="rowContent">
                      <span className="label">{SYloopData.info5_title}</span>
                      {SYloopData.info5}
                    </div>
                  ) : null}
                  {SYloopData.info6_title ? (
                    <div className="rowContent">
                      <span className="label">{SYloopData.info6_title}</span>
                      {SYloopData.info6}
                    </div>
                  ) : null}
                </div>
                <div class="memo">출처 : {SYloopData.origin}</div>
              </SwiperSlide>
            ))}
          </Swiper>
          {SYdata.developList.length > 1 ? (
            <>
              <div onClick={() => swiperRef.current.swiper.slidePrev()} className="AD-button-next"></div>
              <div onClick={() => swiperRef.current.swiper.slideNext()} className="AD-button-prev"></div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default YJdevelopComponent;
