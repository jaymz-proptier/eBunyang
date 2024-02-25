import React, { useEffect } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { usePath } from "../../shared/contexts/SYpath";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper";
import { SYreactGA4Event, SYreactGA4Title } from "../../hooks";

function SYmoveInADComponent() {
    const { SYapiPath } = usePath();
    const SYpagination = {
        clickable: true,
    }
    const { data } = useQuery(["reportAD"], () => axios.get(`${SYapiPath}/moveIn/basicListPreview`), "");
    useEffect(() => {
        // refetch();
    }, [data]);
    
    const SYadViewChange = (SYindex) => {
        SYreactGA4Title(`인기 입주단지 - ${data.data.result.readRankList[SYindex].build_nm} 슬라이드`);    
        // console.log(data.data.result.readRankList[SYindex]);
    }
    const SYadLinkCheck = (SYlinkData) => {
      SYreactGA4Title(`인기 입주단지 - ${SYlinkData.build_nm} 클릭`);
      SYreactGA4Event({cagetory: "인기 입주단지", action: "move_ad_click", label: SYlinkData.build_nm})
      window.location.href = `/moveIn/detail?move_in_cd=${SYlinkData.move_in_cd}`;
    }
    const SYmoveInADListWrap = () => {

        const swiperRef = React.useRef(null);

        if (data) {
            const SYdata = data.data.result.readRankList;
            return (
                <div className="ADcontentWrap">
                    <div className="articleTitle">인기 입주단지</div>
                    <Swiper pagination={SYpagination} autoplay={{delay: 2500, disableOnInteraction: false,}} autoHeight={true} loop={false} slidesPerView={1} modules={[Pagination, Navigation, Autoplay]} onSlideChange={(e) => SYadViewChange(e.activeIndex)} ref={swiperRef}>
                        {SYdata.map((SYloopData, SYindex) => (
                            <SwiperSlide key={SYindex} className="swiper-slide">
                                <a href="javascript:void(0)" onClick={() => SYadLinkCheck(SYloopData)}>
                                <div className="slideContent">
                                    {/* <div className="ADimage" style={{backgroundImage:`url(${SYloopData.image_url})`}}></div> */}
                                    <div className="ADimageBx">
                                        {
                                            //조건을 하나 더 줌으로써 렌더링 후 동작하게끔 함.
                                            SYloopData.images 
                                            ? Array(4).fill().map((arr, num) => (
                                                SYloopData.images[num] 
                                                ? <img src={SYloopData.images[num]} alt={SYloopData.build_nm} className={"ADimage ADimage-" + num} key={num} />
                                                : <div className={"noImage ADimage-" + num} key={num}></div>
                                            ))
                                            : null
                                        }
                                    </div>
                                    <div className="ADinfoWrap">
                                        <div className="title">{SYloopData.main_info}</div>
                                        <div className="buildName">{SYloopData.build_nm}</div>
                                        {/* <div className="memo">{SYloopData.images}</div> */}
                                    </div>
                                </div>
                                </a>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <div onClick={() => swiperRef.current.swiper.slideNext()} className="AD-button-next"></div>
                    <div onClick={() => swiperRef.current.swiper.slidePrev()} className="AD-button-prev"></div>
                </div>
            );
        }
    }
    return (
        <div className="ADwrap" id="stickyContent">
            <div className="SYmoveInADWrap">
                <SYmoveInADListWrap />
            </div>
            <div className="ADlinkButton">
                <a href="/proposal" rel="noopener noreferrer"><span>광고/제휴 문의</span></a>
            </div>
        </div>
    );
}

export default SYmoveInADComponent;