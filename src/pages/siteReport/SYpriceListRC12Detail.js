import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

function SYpriceListRC12Detail({ SYdata }) {
    const [SYtabButton, SYsetTabButton] = useState(0);
    return(        
        <div className="articleContent">
            <Swiper slidesPerView={"auto"}  className="tabList">
                {SYdata.dataList.categoryList.map((SYloopData, SYindex) => (
                <SwiperSlide key={SYindex} className="tabItem" aria-selected={SYindex===SYtabButton ? true : false} onClick={() => SYsetTabButton(SYindex)}>{SYloopData.categoryName}</SwiperSlide>
                ))}
            </Swiper>
            <div className="tabContentWrap">
                {SYdata.dataList.categoryList.map((SYloopData, SYindex) => (
                <div key={SYindex} className="tabContent" aria-hidden={SYindex===SYtabButton ? false : true}>
                    <div className="priceItemWrap">
                        <div className="itemTitle">{SYloopData.dataList.build_nm} {SYloopData.dataList.build_type}</div>
                        <div className="itemRow">
                            <span className="label">{`전용/${SYdata.bclass==="C02" || SYdata.bclass==="H01" ? "계약" : "공급" }면적(㎡)`}</span>
                            {SYloopData.dataList.scale}
                        </div>
                        <div className="itemRow">
                            <span className="label">{`공급${SYdata.bclass==="C02" || SYdata.bclass==="H01" ? "호실" : "세대" }수`}</span>
                            {SYloopData.dataList.house_cnt} {SYdata.bclass==="C02" || SYdata.bclass==="H01" ? "실" : "세대"}
                        </div>
                        <div className="itemRow price">
                            <span className="label">{SYloopData.dataList.sell_price_nm}(만원)</span>
                            {SYloopData.dataList.sell_price}
                        </div>
                        {SYloopData.dataList.scale_price ? (
                        <div className="itemRow price">
                            <span className="label">{`${SYloopData.dataList.supp_sclass==="민간임대시행자임의" ? "월임대료" : "3.3㎡가격"} (${SYloopData.dataList.supp_sclass==="민간임대시행자임의" ? "천원" : "만원"})`}</span>
                            {SYloopData.dataList.scale_price}
                        </div>
                        ) : null }
                        {SYdata.dataList.memo ? (
                        <p className="caution">{SYdata.dataList.memo}</p>
                        ) : null }
                    </div>
                </div>
                ))}
            </div>
        </div>
    );
}

export default SYpriceListRC12Detail;