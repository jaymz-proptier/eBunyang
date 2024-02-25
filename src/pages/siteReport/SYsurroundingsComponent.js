import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

function SYsurroundingsComponent({ SYdata }) {
    const [SYtabButton, SYsetTabButton] = useState(0);
    return(
        <div className="reportSurroundingsWrap">
            <div className="articleWrap">
                <div className="articleTitle">주변환경 둘러보기</div>
                <div className="articleContent">
                    <Swiper slidesPerView={"auto"}  className="tabList">
                        {SYdata.map((SYloopData, SYindex) => (
                        <SwiperSlide key={SYindex} className="tabItem" aria-selected={SYindex===SYtabButton ? true : false} onClick={() => SYsetTabButton(SYindex)}><i className="SYicon" aria-label={SYloopData.categoryName}></i>{SYloopData.categoryName}</SwiperSlide>
                        ))}
                    </Swiper>
                    <div className="tabContentWrap">
                        {SYdata.map((SYloopData, SYindex) => (
                        <div key={SYindex} className="tabContent" aria-hidden={SYindex===SYtabButton ? false : true}>
                            <div className="surroundingsMemo">{SYloopData.categoryMemo}</div>
                            <div className="surroundingsList">
                                {SYloopData.dataList.map((SYsubLoopData, SYsubIndex) => (
                                <div key={SYindex} className="listItem">
                                    <div className="imageBox" style={{backgroundImage:`url(${SYsubLoopData.thumb_image_url})`}}></div>
                                    <div className="listInfo">
                                        <div className="listTitle">{SYsubLoopData.title}</div>
                                        <div className="listMemo">{SYsubLoopData.info}</div>
                                    </div>
                                </div>
                                ))}
                            </div>
                        </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SYsurroundingsComponent;