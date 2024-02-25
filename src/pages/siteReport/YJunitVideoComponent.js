import React, { useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import Iframe from "react-iframe";

function YJunitVideoComponent({ SYdata, basicSYdetailPopupState, basicCheckImgUrl }) {
  const [activeTab, setActiveTab] = useState(0);
  const [SYvideoData, setSYvideoData] = useState("");
  const [basicopen, setbasicOpen] = useState(false);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const pyName = SYdata.unitVideoList.flatMap((unit) => unit.dataList.map((data) => data.py_nm));
  //console.log(pyName);

  const handleImages = (id) => {
    basicCheckImgUrl(id);
    basicSYdetailPopupState(true);
  };

  return (
    <div className="articleWrap videoInfo">
      <div className="articleContent ">
        {SYdata.detail.video_yn == "Y" ? (
          <Tabs selectedIndex={activeTab} onSelect={handleTabClick}>
            <div className="articleTitle">언택트 영상투어</div>

            <TabList className="tabListSub">
              <Tab className="tabListSubItem " aria-selected={activeTab === 0}>
                입지영상
              </Tab>

              {SYdata.unitVideoList.map((SYloopData, videoIndex) => (
                <>
                  {SYloopData.dataList.map((SYloopData2, SYindex2) => (
                    <Tab
                      key={SYindex2}
                      className="tabListSubItem "
                      aria-selected={activeTab === videoIndex}
                      // onClick={(e) => {
                      //   e.preventDefault();
                      //   setSYvideoData(SYloopData.categoryCode === "vr" ? SYloopData2.vr_url : SYloopData2.video_url);
                      //   console.log('#SYindex2',SYloopData2.vr_url)

                      // }}
                    >
                      {SYloopData.categoryCode == "video" ? SYloopData2.py_nm + " 영상" : SYloopData.categoryCode == "vr" ? SYloopData2.py_nm + " VR" : null}
                    </Tab>
                  ))}
                </>
              ))}
            </TabList>

            <div className="innerTabWrap">
              <TabPanel className="mediaWrap">
                <Iframe width="100%" style={{ paddingBottom: `100%` }} url={SYdata.detail.video_url} />
              </TabPanel>

              {SYdata.unitVideoList.map((SYloopData, videoIndex) => (
                <>
                  {SYloopData.dataList.map((SYloopData2, SYindex2) => (
                    <TabPanel className="mediaWrap">
                      <Iframe width="100%" style={{ paddingBottom: `100%` }} url={SYloopData.categoryCode === "vr" ? SYloopData2.vr_url : SYloopData2.video_url} />{" "}
                    </TabPanel>
                  ))}
                </>
              ))}
            </div>
          </Tabs>
        ) : (
          <div className="imageBoxWrap">
            <div className="imgBox" style={{ backgroundImage: `url(${SYdata.detail.image_url})` }} onClick={() => handleImages(SYdata.id)}></div>
          </div>
        )}
      </div>
    </div>
  );
}

export default YJunitVideoComponent;
