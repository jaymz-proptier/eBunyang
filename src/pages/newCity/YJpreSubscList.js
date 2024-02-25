import React from "react";
import { SYnumberFormat } from "../../hooks/";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";

function YJpreSubscList({ SYdata }) {
  const SYpagination = {
    clickable: true,
  };
  const swiperRef = React.useRef(null);
  if (!SYdata) return "";
  // console.log(SYdata);
  return (
    <div className="articleContent flexBox">
      <div className="quarterContent">
        <Swiper slidesPerView={1} modules={[Pagination]}>
          {SYdata.map((YJdata) =>
            YJdata.categoryName.includes("예정") ? (
              <SwiperSlide key={YJdata} className="supplyList swiper-slide">
                <div className="preSubscListWrap">
                  <div className="listTitleBox">
                    <span className="listTitle">{YJdata.categoryName}</span>
                  </div>

                  <div className="tableHead">
                    <div className="tableRow">
                      <span className="tableData">사전청약지구</span>
                      <span className="tableData">계획물량(세대)</span>
                    </div>
                  </div>
                  <div className="tableContent">
                    {YJdata.dataList.map((loopData) => (
                      <div className="tableRow">
                        <div className="tableData">{loopData.ebunyang_nm}</div>
                        <div className="tableData">{SYnumberFormat(loopData.pre_subsc_tot_cnt)}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </SwiperSlide>
            ) : null
          )}
        </Swiper>
      </div>

      <div className="quarterContent">
        <Swiper pagination={SYpagination} slidesPerView={1} modules={[Pagination]}>
          {SYdata.map((YJdata) =>
            YJdata.categoryName.includes("마감") ? (
              <SwiperSlide key={YJdata} className="supplyList swiper-slide">
                <div className="preSubscListWrap">
                  <div className="listTitleBox">
                    <span className="listTitle">{YJdata.categoryName}</span>
                  </div>

                  <div className="tableHead">
                    <div className="tableRow">
                      <span className="tableData">사전청약지구</span>
                      <span className="tableData">계획물량(세대)</span>
                    </div>
                  </div>
                  <div className="tableContent">
                    {YJdata.dataList.map((loopData) => (
                      <div className="tableRow">
                        <div className="tableData">{loopData.ebunyang_nm}</div>
                        <div className="tableData">{SYnumberFormat(loopData.pre_subsc_tot_cnt)}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </SwiperSlide>
            ) : null
          )}
        </Swiper>
      </div>
    </div>
  );
}

export default YJpreSubscList;
