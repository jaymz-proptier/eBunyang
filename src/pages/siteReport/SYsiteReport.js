import React from "react";
import {
  SYreportADComponent,
  SYsiteReportList,
  SYfilterComponents,
} from "../siteReport";

function SYsiteReport() {
  return (
    <div className="contentWrap sitereport">
      <div className="sectionWrap">
        <SYfilterComponents />
        <div className="contentInfoWrap">
          <div className="bunyangContents">
            <SYreportADComponent />
          </div>
          <SYsiteReportList />
        </div>
      </div>
    </div>
  );
}
export default SYsiteReport;
