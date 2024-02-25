import React, { useEffect, useState } from "react";
import { SYplanComponent } from "./planInfo";
import { useBunyangScaleQuery } from "../../apis/bunyang/bunyang";
import { SYreactGA4Title } from "../../hooks";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";

function SYplanInfo({ build_dtl_cd, supp_cd, open }) {
    const [SYtabButton, SYsetTabButton] = useState(0);  
    const [SYtabExpanded, SYsetTabExpanded] = useState(false);  
    const { data, refetch } = useBunyangScaleQuery({
        params: {build_dtl_cd: build_dtl_cd, supp_cd: supp_cd, open: open},
        onSuccess: (data) => {   
        },
        onError: (error) => {
            console.log("Error[bunyangList]", error);
        },
    });   
    useEffect(() => {
        refetch();
    }, [build_dtl_cd, supp_cd]);
    const SYtabListExpanded = () => {
        SYsetTabExpanded(!SYtabExpanded);
        SYreactGA4Title(document.title +" - 평형정보");
    }
    const SYtabChange = (SYindex) => {
        SYsetTabButton(SYindex)   
        SYreactGA4Title(document.title +` - 평형정보(${data.data.result.scaleList[SYindex].categoryName})`);     
    }
    if(data && data.data.result) {
        const SYdata = data.data.result.scaleList;
        return (
            <div className="tabContentWrap">
                <div className="planContentWrap">
                    <div className="tabList" aria-expanded={SYtabExpanded}>
                        <div className="tabListItemWrap">
                        <Swiper modules={[Navigation]} slidesPerView={'auto'} freeMode={true}>
                            {SYdata.map((SYloopData, SYindex) => (
                            <SwiperSlide key={SYloopData.categoryCode} className="planListItem" aria-selected={SYtabButton===SYindex ? true : false} onClick={() => SYtabChange(SYindex)}>{SYloopData.categoryName}</SwiperSlide>
                            ))}
                            {/* {SYdata.length > 5 ? (
                            <div className="listMoreBtn" onClick={SYtabListExpanded}><i className="Icon_more"></i></div>
                            ) : null } */}
                            </Swiper>
                        </div>
                    </div>
                    {SYdata.map((SYloopData, SYindex) => (
                    <div key={SYindex} className="planTabpanel" aria-hidden={SYtabButton===SYindex ? false :true}>
                        <div className="planDataTabContent">
                            <SYplanComponent SYdata={SYloopData.dataList} />
                        </div>                       
                    </div>
                    ))}
                </div>                
            </div>
        );
    }
}

export default SYplanInfo;