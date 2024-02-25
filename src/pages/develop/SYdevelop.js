import React from "react";
import {
  SYdevelopIssue,
  SYdevelopList,
  SYdevelopStatus,
  SYfilterComponents,
} from "../develop";

function SYdevelop() {
  return (
    <div className="contentWrap develop">
      <div className="sectionWrap">
        <SYfilterComponents />
        <div className="contentInfoWrap">
          <div className="developContents">
                {/* 개발사업 현황 */}
                <SYdevelopStatus />
                {/* 이슈 개발사업 */}
                <SYdevelopIssue />
          </div>
          <SYdevelopList />
        </div>
      </div>
    </div>
  );
}

export default SYdevelop;
