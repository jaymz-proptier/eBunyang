import React from "react";
import {
  SYmoveInADComponent,
  SYmoveInList,
  SYfilterComponents,
} from "../moveIn";
import fixedContent from '../../hooks/fixedContent';

function SYmoveIn() {
  const { sticky, stickyRef } = fixedContent();

  return (
    <div className="contentWrap movein">
      <div className="sectionWrap">
        <SYfilterComponents />
        <div className="contentInfoWrap" id="stickyBgContent">
          <div ref={stickyRef} className={sticky === "sticky" ? "bunyangContents sticky" : (sticky === "end" ? "bunyangContents end" : "bunyangContents")} >
            <SYmoveInADComponent />
          </div>
          <SYmoveInList />
        </div>
      </div>
    </div>
  );
}
export default SYmoveIn;
