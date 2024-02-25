import React, { useState, useEffect } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";

function YJsurroundingsComponent({ SYdata, SYdetailPopupState, checkImgUrl }) {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const handleImages = (id) => {
    checkImgUrl(id);
    SYdetailPopupState(true);
  };

  const SYpagination = {
    clickable: true,
  };
  const swiperRef = React.useRef(null);

  return (
    <div className="articleWrap surroundings">
      <div className="articleContent">
        <div className="articleTitle">
          <div className="text">주변환경</div>
          <div className="num">{SYdata.locationMapList !== 0 ? "05" : "04"}</div>
        </div>
        <div className="tabWrap">
          <Tabs selectedIndex={activeTab} onSelect={handleTabClick}>
            <TabList className="tabList">
              {SYdata?.surroundingsList.map((YJdata, index) => (
                <Tab className="tabListItem" aria-selected={activeTab === index}>
                  {YJdata.categoryName}
                </Tab>
              ))}
            </TabList>

            {SYdata.surroundingsList.map((SYloopData, SYindex) => (
              <TabPanel key={SYindex}>
                <div className="surroundingsMemo">{SYloopData.categoryMemo}</div>
                <div className="itemList">
                  {window.innerWidth <= 1024 ? (
                    <Swiper
                      pagination={SYpagination}
                      autoHeight={true}
                      loop={false}
                      slidesPerView={1}
                      modules={[Pagination, Navigation]}
                      ref={swiperRef}
                      breakpoints={{
                        0: {
                          slidesOffsetBefore: 0,
                          slidesPerView: 1.1,
                          spaceBetween: 10,
                          centeredSlides: false,
                        },
                        1024: {
                          slidesOffsetBefore: 0,
                          slidesPerView: 1,
                          spaceBetween: 10,
                          centeredSlides: false,
                        },
                      }}
                    >
                      {SYdata.surroundingsList[SYindex].dataList.map((SYloopData, SYindex) => (
                        <div className="itemWrap">
                          <SwiperSlide key={SYindex} className="swiper-slide" style={{ minHeight: `368px` }} onClick={() => handleImages(SYloopData.id)}>
                            <div key={SYindex} className="imgWrap">
                              <img className="imgBox" src={SYloopData.thumb_image_url}></img>
                              <div className="listInfo">
                                <div className="listTitle">{SYloopData.title}</div>
                                <div className="listMemo">{SYloopData.info}</div>
                              </div>
                            </div>
                          </SwiperSlide>
                        </div>
                      ))}
                    </Swiper>
                  ) : (
                    <>
                      {SYdata.surroundingsList[SYindex].dataList.map((SYloopData, SYindex) => (
                        <div className="itemWrap">
                          <div key={SYindex} className="imgWrap" onClick={() => handleImages(SYloopData.id)}>
                            <img className="imgBox" src={SYloopData.thumb_image_url} />
                            <div className="listInfo">
                              <div className="listTitle">{SYloopData.title}</div>
                              <div className="listMemo">{SYloopData.info}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </TabPanel>
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  );
}
export default YJsurroundingsComponent;
