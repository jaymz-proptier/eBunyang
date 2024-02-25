import React, { useState } from "react";
import {
  SYbunyangList,
  SYbunyangMainLastWeekRate,
  SYbunyangMainScheduleInfo,
  SYbunyangPoint,
  SYfilterComponents,
} from "../bunyang";

function SYbunyang() {
  const [bunyangMPopup, setBunyangMPopup] = useState(false);

  const bunyangMPopupState = (openState) => {
      setBunyangMPopup(openState);
  }

  return (
    <div className="contentWrap bunyang">
      <div className="sectionWrap">
        <SYfilterComponents />
        <div className="contentInfoWrap">
          <div className="bunyangContents">
            <div className={bunyangMPopup ? `bunyangMobileLayer open` : `bunyangMobileLayer`}>
              <div className="bunyangMobileTitle">
                <p>청약정보</p>
                <button className="bunyangMobileClose" onClick={() => setBunyangMPopup(false)}></button>
              </div>
              <SYbunyangPoint />
              <SYbunyangMainScheduleInfo />
            </div>
            <SYbunyangMainLastWeekRate bunyangMPopupState={bunyangMPopupState} />
          </div>
          <SYbunyangList />
        </div>
      </div>
    </div>
  );
}

export default SYbunyang;
