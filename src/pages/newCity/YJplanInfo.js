import React, { useState, useEffect, Fragment } from "react";
import { Navigation } from "swiper";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { Swiper, SwiperSlide } from "swiper/react";
import { SYnumberFormat, SYproductPriceView } from "../../hooks/";
import { Modal } from "./";

function YJplanInfo({ SYdata }) {
  const [SYtabButton, SYsetTabButton] = useState(0);

  const [activeTab, setActiveTab] = useState(0);
  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpen2, setModalOpen2] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  const openModal2 = () => {
    setModalOpen2(true);
  };

  const closeModal2 = () => {
    setModalOpen2(false);
  };

  function tabClick(tabId) {
    SYsetTabButton(tabId);
  }

  // 팝업창 열고닫기 여부
  const [planPopup, setPlanPopup] = useState(false);
  // 기본형인지 확장형인지 체크
  const [planPopupIndex, setPlanPopupIndex] = useState(null);
  // 클릭한 이미지 인덱스 리턴
  const [imgIndex, setImgIndex] = useState(null);

  const [SYswiper, SYsetSwiper] = useState(null);
  const [planImgList, setPlanImgList] = useState([]);

  function planImgListAdd() {
    const newList = [];

    console.log('item.dataList', SYdata) 
    SYdata.forEach((item) => {
      if (item.dataList.image_url != "") {
        newList.push({ "img": item.dataList.image_url, "planName": item.categoryName, "type" : 1 });
        // console.log('item.dataList.image_url', item.dataList.image_url);
      }
      if (item.dataList.image_url2 != "") {
        newList.push({ "img": item.dataList.image_url2, "planName": item.categoryName, "type" : 2 });
        // console.log('item.dataList.image_url2', item.dataList.image_url2);
      }

    });

    setPlanImgList(newList)
  }

  function planImgIndex(imgSrc) {
    let findImgIdx = planImgList.findIndex(e => e.img === imgSrc);
    // console.log('findImgIdx',findImgIdx)
    setImgIndex(findImgIdx);
    // console.log('imgSrc', imgSrc);
  }

  useEffect(() => {
    if (SYswiper) {
      SYswiper.slideTo((imgIndex ? imgIndex : 0), 0, false);
    }
    if (SYdata) {
      planImgListAdd();
    }

    // console.log("planPopupIndex", planPopupIndex)
  }, [SYdata, imgIndex])

  if (!SYdata) {
    return "";
  }

  return (
    <>
      <div className="articleWrap">
        <div className="articleTitle">
          평형정보<i className="Icon_info" onClick={openModal}></i>
          <Modal open={modalOpen} close={closeModal} header="Modal heading">
            <main>평면도는 대표 평형 기준으로 제공됩니다.</main>
          </Modal>
        </div>
        <div className="articleContentWrap">
          <div className="tabContentWrap">
            <div className="plantabWrap">
              <div className="tabList">
                <div className="tabListItemWrap">
                  <Swiper modules={[Navigation]} slidesPerView={"auto"} freeMode={true}>
                    {SYdata.map((SYloopData, index) => (
                      <SwiperSlide key={SYloopData.categoryName} className="planListItem swiper-slide" role="tab" aria-selected={SYtabButton === index ? true : false} onClick={() => tabClick(index)}>
                        {SYloopData.categoryName}
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>
            </div>
            {SYdata.map((SYloopData, index) => (
              <div key={SYloopData.categoryName} className="planTypepanel" aria-hidden={SYtabButton === index ? false : true} role="tabpanel">
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
                                <div className="planTypeImg" onClick={(e) => { setPlanPopup(true), planImgIndex(SYloopData.dataList.image_url) }}>
                                  {SYloopData.dataList.image_url ? <div className="imgBox" style={{ backgroundImage: `url(${SYloopData.dataList.image_url})` }} /> : null}
                                </div>
                              </TabPanel>
                              <TabPanel>
                                <div className="planTypeImg" onClick={(e) => { setPlanPopup(true),  planImgIndex(SYloopData.dataList.image_url2) }}>
                                  {SYloopData.dataList.image_url2 ? <div className="imgBox" style={{ backgroundImage: `url(${SYloopData.dataList.image_url2})` }} /> : null}
                                </div>
                              </TabPanel>
                            </Tabs>
                          ) : (
                            <>
                              <div className="planTypeImg" onClick={(e) => { setPlanPopup(true),  planImgIndex(SYloopData.dataList.image_url) }}>
                                <img src={SYloopData.dataList.image_url} alt={SYloopData.dataList.py_nm} className="Img_plan" />
                              </div>
                            </>
                          )}
                        </div>

                        <div className="tableWrap">
                          <div className="tableContent">
                            {SYdata.map((SYloopData, index) => (
                              <div key={SYloopData.categoryName} className="planTypepanel" aria-hidden={SYtabButton === index ? false : true} role="tabpanel">
                                <div className="tableRow">
                                  <div className="tableDataWrap">
                                    <div className="tableData">사전청약 경쟁률</div>
                                  </div>
                                  <div className="tableDataWrap">
                                    <div className="tableData" aria-label="colorRed">
                                      {SYloopData.dataList.py_sr_rate} : 1
                                    </div>
                                  </div>
                                </div>

                                <div className="tableRow">
                                  <div className="tableDataWrap">
                                    <div className="tableData">
                                      분양가
                                      <i className="Icon_info" onClick={openModal2}></i>
                                      <Modal open={modalOpen2} close={closeModal2} header="Modal heading">
                                        {/* <main> */}
                                        추정분양가는 사전청약 공고시점에실제분양가 산정이 불가하여 추정한 가격으로 추후 변동이 예상되며, 실제 분양가는 본 청약 시점에서 분양가심위원회 심의를 거쳐
                                        결정될 예정입니다.
                                        {/* </main> */}
                                      </Modal>
                                    </div>
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
                                      {SYproductPriceView(SYloopData.dataList.acq_tax_price, SYloopData.dataList.acq_tax_price)}
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
                                    <div className="tableData">총 세대수</div>
                                  </div>
                                  <div className="tableDataWrap">
                                    <div className="tableData">{SYloopData.dataList.house_supp_cnt} 세대</div>
                                  </div>
                                </div>

                                <div className="tableRow">
                                  <div className="tableDataWrap">
                                    <div className="tableData">사전청약 세대수</div>
                                  </div>
                                  <div className="tableDataWrap">
                                    <div className="tableData">{SYloopData.dataList.subsr_hseh_cnt} 세대</div>
                                  </div>
                                </div>

                                <div className="tableRow detailTableRowDataWrap">
                                  <div className="tableDataWrap">
                                    <div className="tableData"></div>
                                  </div>
                                  <div className="tableDataWrap">
                                    <div className="tableData">
                                      <ul className="detailTableDataWrap">
                                        <li className="detailTableData">일반 - {SYloopData.dataList.nomal_supp_house_cnt} (세대)</li>
                                        <li className="detailTableData">
                                          특별 - 신혼부부 {SYloopData.dataList.new_marry_sp_supp_cnt}, 생애최초 {SYloopData.dataList.first_life_sp_supp_cnt}, 다자녀{" "}
                                          {SYloopData.dataList.child_sp_supp_cnt}, 노부모 {SYloopData.dataList.old_parent_sp_supp_cnt} (세대)
                                        </li>
                                      </ul>
                                    </div>
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







      {/* 평형정보 팝업창 */}
      <div className={planPopup === false ? "planPopupWrap newcityplan" : "planPopupWrap newcityplan open"}>
        <div className="planPopupInner">
          <div className="planPopupWrapper">
            <div className="planPopupClose">
              <button onClick={() => setPlanPopup(false)}></button>
            </div>
            <div className="planPopupContent">
              <Swiper onSwiper={SYsetSwiper} autoHeight={true} modules={[Navigation]} slidesPerView={1}>
                {planImgList.map((data, index) => {
                  return (
                    <SwiperSlide key={index}>
                      {
                        data.img
                          ?
                          <div className="planPopupImg">
                            <img src={data.img} alt={data.planName} />
                          </div>
                          :
                          null
                      }
                      <div className="planPopupInfo">
                        {
                          data.type === 1
                            ?
                            <p>
                              {data.planName} 기본형
                            </p>
                            :
                            (
                              data.type === 2
                                ?
                                <p>
                                  {data.planName} 확장형
                                </p>
                                :
                                <p>
                                  {data.planName}
                                </p>
                            )
                        }
                      </div>
                    </SwiperSlide>
                  )
                })}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default YJplanInfo;
