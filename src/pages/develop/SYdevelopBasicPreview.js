import React from "react";
import { SYdevelopBizTypeInfo } from "../../hooks";

function SYdevelopBasicPreview({ SYdata }) {
  return (
    <div className="">
      <div className="complexContentArea">
        <div className="articleWrap">
          <div className="developInfoWrap">
            <div className="articleContent">
              <div className="developInfo">
                <div className="developLabel" aria-label={SYdata.biz_type_nm}>
                  {SYdata.biz_type_nm}
                </div>
                <div className="developTitleWrap">
                  <div className="developTitle">{SYdata.biz_nm}</div>
                </div>
              </div>
            </div>
            <div className="articleContent">
              <div className="developFeature">
                <div className="featureWrap">
                  <div className="title">예상 총 세대수</div>
                  <div className="data">{SYdata.plan_house_cnt}세대</div>
                </div>
                <div className="featureWrap">
                  <div className="title">일반세대수</div>
                  <div className="data">{SYdata.sell_house_cnt}세대</div>
                </div>
              </div>
            </div>
            <div className="articleContent">
              <div className="developDate">
                <div className="dateData">
                  <i className="Icon_check"></i>
                  <div className="data">
                    {SYdevelopBizTypeInfo({
                      biz_step: SYdata.biz_step,
                      old_year_date: SYdata.old_year_date,
                      old_month_date: SYdata.old_month_date,
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SYdevelopBasicPreview;
