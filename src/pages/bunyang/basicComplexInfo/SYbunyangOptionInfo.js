import React from "react";

function SYbunyangOptionInfo( { SYdata } ) {
    if(SYdata.length!==0 && (SYdata.facilityIn.length > 0 || SYdata.facilityOut.length > 0)) {
        const SYbunyangFacilityOption = {"ap_70":"무인택배함","ap_72":"자전거보관소","ap_75":"CCTV","ap_76":"보안출입문","ap_77":"엘리베이터","ap_79":"개별창고","ap_80":"텃밭","ap_82":"현관보안","ap_13":"드레스룸","ap_14":"붙박이장","ap_15":"파우더룸","ap_17":"시스템키친","ap_18":"아일랜드식탁","ap_19":"빌트인가전","ap_20":"빌트인냉장고","ap_24":"부부욕실","ap_25":"욕조","ap_26":"비데","ap_27":"샤워부스파티션","ap_28":"베란다","ap_29":"테라스","ap_30":"중문","ap_32":"시스템에어컨","ap_33":"일괄소등키","ap_34":"인터폰","ap_35":"반자동빨래건조대","ap_37":"복층"};
        return(
            <div className={SYdata.facilityIn.length > 0 ? "articleWrap" :""}>
            { SYdata.facilityIn.length > 0 ? (
            <div className="articleWrap facilityInOption">
                <div className="articleTitle">내부 옵션</div>
                <div className="articleContentWrap">
                    <div className="articleContent">
                        <div className="facilityContent" aria-label="내부옵션">
                            <div className="optionIconWrap">
                                {SYdata.facilityIn.map((SYloopData, SYindex) => (
                                <div key={SYindex} className="facility">
                                    <i className="Icon_facility" aria-label={SYbunyangFacilityOption[Object.keys(SYloopData)]}></i>
                                    <div className="iconInfoCon">{SYbunyangFacilityOption[Object.keys(SYloopData)]}</div>
                                </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            ):null }
            { SYdata.facilityOut.length > 0 ? (
            <div className="articleWrap facilityInfo">
                <div className="articleTitle facilityIn">외부 옵션</div>
                <div className="articleContentWrap">
                    <div className="articleContent">
                        <div className="facilityContent" aria-label="외부옵션">
                            <div className="optionIconWrap">
                                {SYdata.facilityOut.map((SYloopData, SYindex) => (
                                <div key={SYindex} className="facility">
                                    <i className="Icon_facility" aria-label={SYbunyangFacilityOption[Object.keys(SYloopData)]}></i>
                                    <div className="iconInfoCon">{SYbunyangFacilityOption[Object.keys(SYloopData)]}</div>
                                </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            ):null }
            </div>
        );
    }
}

export default SYbunyangOptionInfo;