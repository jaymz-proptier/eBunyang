import React, { useState } from "react";
import { Navigation } from "swiper";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { Swiper, SwiperSlide } from "swiper/react";
import { SYnumberFormat, SYproductPriceView } from "../../hooks/";

function YJplanInfo({ SYdata }) {
  // const [SYtabButton, SYsetTabButton] = useState(SYdata[0].categoryName);

  const [activeTab, setActiveTab] = useState(0);
  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  function tabClick(tabId) {
    SYsetTabButton(tabId);
  }
  console.log(SYdata);
  return (
    <>
      <div className="articleWrap">
        <div className="articleTitle">평형정보</div>
        <div className="articleContentWrap">
          <div className="tabContentWrap">
            <div className="plantabWrap">
              <div className="tabList">
                <div className="tabListItemWrap">
                  <Swiper modules={[Navigation]} slidesPerView={"auto"} freeMode={true}>
                    {SYdata.map((SYloopData) => (
                      <SwiperSlide
                        key={SYloopData.categoryName}
                        className="planListItem swiper-slide"
                        role="tab"
                        aria-selected={SYtabButton === SYloopData.categoryName ? true : false}
                        onClick={() => tabClick(SYloopData.categoryName)}
                      >
                        {SYloopData.categoryName}
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>
            </div>
            {SYdata.map((SYloopData) => (
              <div key={SYloopData.categoryName} className="planTypepanel" aria-hidden={SYtabButton === SYloopData.categoryName ? false : true} role="tabpanel">
                <div className="planContentWrap">
                  <div className="articleWrap">
                    <div className="articleContentWrap">
                      <div className="articleContent">
                        <div className="typeList">
                          {SYloopData.dataList.image_url2 ? (
                            <Tabs selectedIndex={activeTab} onSelect={handleTabClick}>
                              <TabList className="typeItemWrap">
                                <Tab className="typeItem" aria-selected={activeTab === 0}>
                                  기본형
                                </Tab>
                                <Tab className="typeItem" aria-selected={activeTab === 1}>
                                  확장형
                                </Tab>
                              </TabList>

                              <TabPanel>
                                <div className="planTypeImg">
                                  {SYloopData.dataList.image_url ? <img src={SYloopData.dataList.image_url} alt={SYloopData.dataList.py_nm} className="img_plan" /> : null}
                                </div>
                              </TabPanel>
                              <TabPanel>
                                <div className="planTypeImg">
                                  {SYloopData.dataList.image_url2 ? <img src={SYloopData.dataList.image_url2} alt={SYloopData.dataList.py_nm} className="img_plan" /> : null}
                                </div>
                              </TabPanel>
                            </Tabs>
                          ) : (
                            <>
                              <div className="planTypeImg">
                                <img src={SYloopData.dataList.image_url} alt={SYloopData.dataList.py_nm} className="Img_plan" />
                              </div>
                            </>
                          )}
                        </div>

                        <div className="tableWrap">
                          <div className="tableContent">
                            {SYdata.map((SYloopData) => (
                              <div key={SYloopData.categoryName} className="planTypepanel" aria-hidden={SYtabButton === SYloopData.categoryName ? false : true} role="tabpanel">
                                <div className="tableRow">
                                  <div className="tableDataWrap">
                                    <div className="tableData">본청약 경쟁률</div>
                                  </div>
                                  <div className="tableDataWrap">
                                    <div className="tableData" aria-label="colorRed">
                                      {SYloopData.dataList.py_sr_rate} : 1
                                    </div>
                                  </div>
                                </div>

                                <div className="tableRow">
                                  <div className="tableDataWrap">
                                    <div className="tableData">분양가</div>
                                  </div>
                                  <div className="tableDataWrap">
                                    <div className="tableData" aria-label="colorBlue">
                                      {SYproductPriceView(SYloopData.dataList.supp_price, SYloopData.dataList.supp_price)}
                                      만원
                                    </div>
                                  </div>
                                </div>

                                <div className="tableRow">
                                  <div className="tableDataWrap">
                                    <div className="tableData">취득세</div>
                                  </div>
                                  <div className="tableDataWrap">
                                    <div className="tableData">
                                      {SYnumberFormat(SYloopData.dataList.acq_tax_price)}
                                      만원
                                    </div>
                                  </div>
                                </div>

                                <div className="tableRow">
                                  <div className="tableDataWrap">
                                    <div className="tableData">전용 / 공급면적</div>
                                  </div>
                                  <div className="tableDataWrap">
                                    <div className="tableData">
                                      {SYloopData.dataList.use_area_size}㎡ / {SYloopData.dataList.supp_size}㎡
                                    </div>
                                  </div>
                                </div>

                                <div className="tableRow">
                                  <div className="tableDataWrap">
                                    <div className="tableData">청약 세대수</div>
                                  </div>
                                  <div className="tableDataWrap">
                                    <div className="tableData">{SYloopData.dataList.house_supp_cnt} 세대</div>
                                  </div>
                                </div>

                                <div className="tableRow">
                                  <div className="tableDataWrap">
                                    <div className="tableData">현관구조</div>
                                  </div>
                                  <div className="tableDataWrap">
                                    <div className="tableData">{SYloopData.dataList.hallway_str}</div>
                                  </div>
                                </div>

                                <div className="tableRow">
                                  <div className="tableDataWrap">
                                    <div className="tableData">방 / 욕실 수</div>
                                  </div>
                                  <div className="tableDataWrap">
                                    <div className="tableData">
                                      {SYloopData.dataList.room_cnt} / {SYloopData.dataList.bathroom_cnt} 개
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default YJplanInfo;
