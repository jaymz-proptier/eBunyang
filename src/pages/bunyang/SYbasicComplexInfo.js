import React, { useEffect, useState } from "react";
import { SYlocationInfoComponent } from "../";
import { SYbunyangAroundList, SYbunyangBasicInfo, SYbunyangOptionInfo, SYcomplexPhotoPreview, SYbunyangScheduleInfo, SYbunyangSchoolInfo } from "./basicComplexInfo";
import { useBasicComplexInfoQuery } from "../../apis/bunyang/bunyang";

function SYbasicComplexInfo({ build_dtl_cd, supp_cd, open }) {
    const { data, refetch } = useBasicComplexInfoQuery({
        params: {build_dtl_cd: build_dtl_cd, supp_cd: supp_cd, open: open},
        onSuccess: (data) => {   
        },
        onError: (error) => {
            console.log("Error[bunyangList]", error);
        },
    });   
    // console.log(data);
    useEffect(() => {
        refetch();
    }, [build_dtl_cd, supp_cd]);
    if(data && data.data.result) {
        return (
            <div className="tabContentWrap">                    
                <SYcomplexPhotoPreview SYdata={data.data.result.collectionList.imageList} />   
                <SYbunyangBasicInfo SYdata={data.data.result.detail} />           
                <SYbunyangOptionInfo SYdata={data.data.result.optionList} /> 
                {data.data.result.schdlList.length > 0 ? (
                <SYbunyangScheduleInfo SYdata={data.data.result.schdlList} SYlink={data.data.result.detail.cybr_sampl_hse_url} />
                ) : null }      
                {data.data.result.schoolInfo ? (
                <SYbunyangSchoolInfo SYdata={data.data.result.schoolInfo} />
                ) : null }    
                <SYlocationInfoComponent SYdata={data.data.result.detail} />  
                {data.data.result.aroundList.length > 0 ? (
                <SYbunyangAroundList SYdata={data.data.result.aroundList} />
                ) : null }                    
            </div> 
        );
    }
}

export default React.memo(SYbasicComplexInfo);