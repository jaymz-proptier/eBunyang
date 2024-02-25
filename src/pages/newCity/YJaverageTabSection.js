import React, { useState, useEffect } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import YJavgPoint0 from "./YJavgPoint0";
import YJavgPoint1 from "./YJavgPoint1";
import YJavgPoint2 from "./YJavgPoint2";
import YJavgPoint3 from "./YJavgPoint3";

function YJaverageTabSection({ SYdata }) {
  if (!SYdata) return "";

  const [activeTab, setActiveTab] = useState(0);
  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <Tabs selectedIndex={activeTab} onSelect={handleTabClick}>
      <TabList className="tabList">
        <Tab className="tabListItem" aria-selected={activeTab === 0}>
          1차
        </Tab>
        <Tab className="tabListItem" aria-selected={activeTab === 1}>
          2차
        </Tab>
        <Tab className="tabListItem" aria-selected={activeTab === 2}>
          3차
        </Tab>
        <Tab className="tabListItem" aria-selected={activeTab === 3}>
          4차
        </Tab>
      </TabList>

      <div className="line">평균 당첨선</div>

      <TabPanel>
        <YJavgPoint0 SYdata={SYdata ?? SYdata} />
      </TabPanel>
      <TabPanel>
        <YJavgPoint1 SYdata={SYdata ?? SYdata} />
      </TabPanel>
      <TabPanel>
        <YJavgPoint2 SYdata={SYdata ?? SYdata} />
      </TabPanel>
      <TabPanel>
        <YJavgPoint3 SYdata={SYdata ?? SYdata} />
      </TabPanel>
    </Tabs>
  );
}

export default YJaverageTabSection;
