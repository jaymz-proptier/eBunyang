import React, { useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import "swiper/css";

function YJlocationComponent({ SYdata, locationSYdetailPopupState, locationCheckImgUrl }) {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };
  const SYpagination = {
    clickable: true,
  };
  const swiperRef = React.useRef(null);

  const handleImages = (id) => {
    locationCheckImgUrl(id);
    locationSYdetailPopupState(true);
  };
  return (
    <div className="articleWrap locationList">
      <div className="articleContent">
        <div className="articleTitle">
          <div className="text">입지 투어</div>
          <div className="num">04</div>
        </div>
        <div className="tableWrap">
          {SYdata.map((SYloopData, SYindex) => (
            <div key={SYindex} className="imgWrap">
              <img className="imgBox" src={SYloopData.image_url} onClick={() => handleImages(SYloopData.id)}></img>
              {/* <div className="imgBox" style={{ backgroundImage: `url(${SYloopData.image_url})` }}></div> */}
              <div className="listTitle">{SYloopData.title}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default YJlocationComponent;
