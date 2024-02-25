import React from "react";
import { SYtipMenu, SYtipPreview, SYtipList } from "../tip";

function SYtip() {
  return (
    <div className="contentWrap atoz">
      <div className="sectionWrap">
        <div className="sectionContentWrap">
          <div className="titleWrap">
            <div className="title">e분양이 알려주는 부동산 가이드</div>
            <span>부동산의 어떤 것이 알고 싶나요? 키워드를 선택해보세요.</span>
          </div>
          <SYtipMenu />
          <div className="contentInfoWrap atozList">
            {/* 인기콘텐츠, STEP */}
            <div className="complexColumn w384">
              <SYtipPreview />
            </div>
            <div className="complexColumn">
              <SYtipList />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default SYtip;
