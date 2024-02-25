import React from "react";
import { SYpriceListRC12Detail, SYpriceListRC13Detail, SYpriceListRC16Detail } from "./";

function SYscalePriceComponent({ SYdata }) {
  const SYsettingContents = {
    RC12: SYpriceListRC12Detail,
    RC13: SYpriceListRC13Detail,
    RC16: SYpriceListRC16Detail,
  };
  const SYcomponentsCreate = (SYtitle, SYdataList) => {
    const SYcomponentName = SYsettingContents[SYtitle];
    return <SYcomponentName SYdata={{ dataList: SYdataList, bclass: SYdata.bclass }} />;
  };
  return (
    <div className="reportScalePriceWrap">
      {SYdata.dataList.map((SYloopData, SYindex) => (
        <div key={SYindex} className="articleWrap">
          <div className="articleTitle">{SYloopData.groupName}</div>
          {SYcomponentsCreate(SYloopData.groupCode, SYloopData)}
        </div>
      ))}
    </div>
  );
}

export default SYscalePriceComponent;
