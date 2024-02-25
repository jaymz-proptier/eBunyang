import React, { useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";

function YJscalePriceComponent({ SYdata }) {
  const [activeTab, setActiveTab] = useState(0);
  const [activeTab2, setActiveTab2] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };
  const handleTabClick2 = (index) => {
    setActiveTab2(index);
  };

  return (
    <div className="articleWrap price">
      <div className="articleContent">
        <div className="articleTitle">
          <div className="text">가격정보</div>
          <div className="num">02</div>
        </div>
        <div className="tabWrap">
          <Tabs selectedIndex={activeTab} onSelect={handleTabClick}>
            {/* 탭1//분양가현황 */}
            <TabList className="tabList">
              {SYdata.scalePriceList.map((YJdata, SYindex) => (
                <Tab className="tabListItem" aria-selected={activeTab === SYindex}>
                  {YJdata.groupName}
                </Tab>
              ))}
            </TabList>
            {SYdata.scalePriceList.map((YJdata, SYindex) => (
              <TabPanel>
                {/* 탭2 */}
                <Tabs selectedIndex={activeTab2} onSelect={handleTabClick2}>
                  <TabList className="tabListSub">
                    {SYdata.scalePriceList[SYindex].categoryList.map((YJdata, SYindex) => (
                      <Tab className="tabListSubItem" aria-selected={activeTab2 === SYindex}>
                        {YJdata.categoryName}
                      </Tab>
                    ))}
                  </TabList>
                  {SYdata.scalePriceList[SYindex].categoryList.map((SYloopData, SYindex) => (
                    <TabPanel key={SYindex}>
                      <div key={SYindex} className="tableWrap">
                        <div className="tableTitle">{SYloopData.dataList.build_nm}</div>
                        <div className="tableContent">
                          <div className="rowContent">
                            <span className="label">전용/계약면적</span>
                            {SYloopData.dataList.scale}
                          </div>
                          <div className="rowContent">
                            <span className="label">공급호실수</span>
                            {SYloopData.dataList.house_cnt}
                          </div>
                          <div className="rowContent">
                            <span className="label">분양가(만원)</span>
                            {SYloopData.dataList.sell_price}
                          </div>
                          <div className="rowContent">
                            <span className="label">3.3㎡가격</span>
                            {SYloopData.dataList.scale_price}
                          </div>
                        </div>
                        <div className="memo">{SYloopData.dataList.memo}</div>
                      </div>
                    </TabPanel>
                  ))}
                </Tabs>
              </TabPanel>
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default YJscalePriceComponent;
