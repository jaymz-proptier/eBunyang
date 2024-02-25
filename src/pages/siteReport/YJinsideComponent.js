import React, { useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import "swiper/css";

function YJinsideComponent({ SYdata, insideSYdetailPopupState, insideCheckImgUrl }) {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };
  const SYpagination = {
    clickable: true,
  };
  const swiperRef = React.useRef(null);

  const handleImages = (id) => {
    insideCheckImgUrl(id);
    insideSYdetailPopupState(true);
  };

  return (
    <div className="articleWrap insideList">
      <div className="articleContent">
        <div className="articleTitle">
          <div className="text">홍보관 투어</div>
          <div className="num">03</div>
        </div>
        <div className="tabWrap">
          <Tabs selectedIndex={activeTab} onSelect={handleTabClick}>
            <TabList className="tabList">
              {SYdata.map((YJdata, index) => (
                <Tab className="tabListItem" aria-selected={activeTab === index}>
                  {YJdata.categoryName}
                </Tab>
              ))}
            </TabList>

            {SYdata.map((SYloopData, SYindex) => (
              <TabPanel key={SYindex} style={{ position: `relative` }}>
                <>
                  <Swiper
                    pagination={{
                      type: "fraction",
                    }}
                    autoHeight={true}
                    loop={true}
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
                    {SYdata[SYindex].dataList.map((SYloopData, SYindex) => (
                      <SwiperSlide key={SYindex} className="swiper-slide" style={{ minHeight: `368px` }}>
                        {/* {console.log(SYloopData)} */}
                        <div key={SYindex} className="imgWrap" onClick={() => handleImages(SYloopData.id)}>
                          <div className="imgBox" style={{ backgroundImage: `url(${SYloopData.thumb_image_url})` }}></div>
                          <div className="listInfo">
                            <div className="listTitle">{SYloopData.title}</div>
                            <div className="listMemo">{SYloopData.image_memo}</div>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                  {/* {SwiperSlide.length > 0 ?( */}
                  <div onClick={() => swiperRef.current.swiper.slidePrev()} className="AD-button-next"></div>
                  <div onClick={() => swiperRef.current.swiper.slideNext()} className="AD-button-prev"></div>
                  {/* ):null} */}
                </>
              </TabPanel>
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default YJinsideComponent;
