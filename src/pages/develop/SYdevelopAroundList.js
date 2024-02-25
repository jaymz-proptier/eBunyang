import React from "react";
import { SYproductItem } from ".";

function SYdevelopAroundList({ SYdata }) {
  return (
    <div className="articleWrap">
      <div className="articleTitle">주변 개발사업</div>
      <div className="articleContentWrap">
        <div className="articleContent">
          <div className="bunyangDetailList">
            {SYdata.map((loopData, index) => (
              <SYproductItem key={index} SYdata={loopData} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default SYdevelopAroundList;
