import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { usePath } from "../../shared/contexts/SYpath";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Autoplay } from "swiper";
import { SYreactGA4Event, SYreactGA4Title } from "../../hooks";
SwiperCore.use([Autoplay]);

function SYreportADComponent() {
  const { SYapiPath } = usePath();
  const SYpagination = {
    clickable: true,
  };
  const SYreportADListWrap = () => {
    const { data } = useQuery(["reportAD"], () => axios.get(`${SYapiPath}/siteReport/basicListPreview`), "");

    const SYadViewChange = (SYindex) => {
      SYreactGA4Title(`현장리포트 AD - ${data.data.result.readRankList[SYindex].build_nm} 슬라이드`);
    };
    const SYadLinkCheck = (SYlinkData) => {
      SYreactGA4Title(`현장리포트 AD - ${SYlinkData.build_nm} 링크`);
      SYreactGA4Event({ cagetory: "현장리포트 AD", action: "report_ad_click", label: SYlinkData.build_nm });
      window.open(SYlinkData.link_url);
    };
    if (data) {
      const SYdata = data.data.result.readRankList;
      //console.log(SYdata[0].link_url);
      return (
        <Swiper pagination={SYpagination} slidesPerView={1} modules={[Pagination]} autoplay={{ delay: 2000, disableOnInteraction: false }} onSlideChange={(e) => SYadViewChange(e.activeIndex)}>
          {SYdata.map((SYloopData, SYindex) => (
            <SwiperSlide key={SYindex} className="swiper-slide">
              {SYloopData.link_url ? (
                <a href="javascript:void(0)" onClick={() => SYadLinkCheck(SYloopData)}>
                  <div className="slideContent">
                    <div
                      className="ADimage"
                      style={{
                        backgroundImage: `url(${SYloopData.image_url})`,
                      }}
                    ></div>
                    <div className="ADinfoWrap">
                      <div className="buildName">{SYloopData.build_nm}</div>
                      <div className="title">{SYloopData.title}</div>
                      <div className="memo" style={{ whiteSpace: "pre-wrap" }}>
                        {SYloopData.memo}
                      </div>
                    </div>
                  </div>
                </a>
              ) : (
                <div className="slideContent">
                  <div className="ADimage" style={{ backgroundImage: `url(${SYloopData.image_url})` }}></div>
                  <div className="ADinfoWrap">
                    <div className="buildName">{SYloopData.build_nm}</div>
                    <div className="title">{SYloopData.title}</div>
                    <div className="memo" style={{ whiteSpace: "pre-wrap" }}>
                      {SYloopData.memo}
                    </div>
                  </div>
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      );
    }
  };
  return (
    <div className="SYreportADWrap">
      <SYreportADListWrap />
    </div>
  );
}

export default SYreportADComponent;
