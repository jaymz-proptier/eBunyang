import React from "react";
import {
  SYfilterComponents,
  SYapartmentMainGraph,
  SYapartmentList,
} from "../apt";

function SYapartment() {
  return (
    <div className="contentWrap aptWrap">
      <div className="sectionWrap apt">
        <SYfilterComponents />
        <div className="contentInfoWrap">
          <div className="complexColumn">
            <SYapartmentMainGraph />
            <div className="adContentArea">
              <a href="/moveIn" className="bannerBox">
                <div className="textArea">
                  <div className="bannerTilte">
                    <p>e분양과 함께하는 입주아파트 랜선탐방</p>
                  </div>
                </div>
              </a>
            </div>
          </div>
          <div className="complexColumn">
            <SYapartmentList />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SYapartment;
