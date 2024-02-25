import React, {useState} from "react";
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from "swiper/react";

function SYdevelopBasicInfo({ SYdata }) {
  const [planPopup, setPlanPopup] = useState(false);

  
  const SYbasicInfo = [
    { title: "주소", value: SYdata.address },
    { title: "대지면적", value: `${SYdata.biz_area}㎡` },
    {
      title: "예상 총 세대수",
      value:
        parseInt(SYdata.plan_house_cnt) > 0
          ? `총 ${SYdata.plan_house_cnt}세대`
          : "-",
    },
    {
      title: "예상 일반 세대수",
      value:
        parseInt(SYdata.sell_house_cnt) > 0
          ? `${SYdata.sell_house_cnt}세대`
          : "-",
    },
    {
      title: "용적율 / 건폐율",
      value:
        parseInt(SYdata.flr_area_rat) > 0 || parseInt(SYdata.flr_area_rat) > 0
          ? `${SYdata.flr_area_rat}% / ${SYdata.build_land_rat}%`
          : "-",
    },
    { title: "시공예정사", value: SYdata.constr_cmpy || "-" },
    { title: "추진위 / 조합 전화", value: SYdata.asso_office_phone || "-" },
  ];
  return (
    <div className="articleWrap developBasicInfo">
      <div className="articleContentWrap">
        <div className="articleContent">
          <div className="developMainImageWrap">
            <div
              className="developMainImg"  onClick={() => { setPlanPopup(true) }}
              style={{ backgroundImage: `url(${SYdata.image_url})` }}
            ></div>
          </div>
        </div>
        <div className="articleContent">
          <div className="articleTitle">기본정보</div>
          <div className="tableWrap">
            <div className="tableContent">
              {SYbasicInfo.map((loopData, index) => (
                <div key={index} className="tableRow">
                  <div className="tableDataWrap">
                    <div className="tableData">{loopData.title}</div>
                  </div>
                  <div className="tableDataWrap">
                    <div className="tableData">{loopData.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>



      <div className={planPopup === false ? "planPopupWrap" : "planPopupWrap open"}>
          <div className="planPopupInner">
              <div className="planPopupWrapper">
                  <div className="planPopupClose">
                      <button onClick={() => setPlanPopup(false)}></button>
                  </div>
                  <div className="planPopupContent">
                      {SYdata.image_url ? (<img src={SYdata.image_url} className="Img_plan" />) : null}
                  </div>
                  {/* <div onClick={() => {planSwiperRef.current.swiper.slidePrev(), console.log("prev")}} className="popupButtonPrev"></div>
                  <div onClick={() => {planSwiperRef.current.swiper.slideNext(), console.log("next")}} className="popupButtonNext"></div> */}
              </div>
          </div>
      </div>
    </div>
  );
}

export default SYdevelopBasicInfo;
