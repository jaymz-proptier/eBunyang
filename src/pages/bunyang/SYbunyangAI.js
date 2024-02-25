import React from "react";
import { SYbunyangAIAroundList, SYbunyangAIBasicInfo, SYbunyangAIMoveInList, SYbunyangAIRateList, SYbunyangAITip } from "./bunyangAI";
import { useBunyangAiQuery } from "../../apis/bunyang/bunyang";

function SYbunyangAI({ build_dtl_cd, supp_cd, open }) {
    const { data, refetch } = useBunyangAiQuery({
        params: {build_dtl_cd: build_dtl_cd, supp_cd: supp_cd, open: open},
        onSuccess: (data) => {   
            window.scrollTo(0, 0);
        },
        onError: (error) => {
            console.log("Error[bunyangList]", error);
        },
    });   
    if(data && data.data.result) {
        return (
            <div className="tabContentWrap">
                <SYbunyangAIBasicInfo SYdata={data.data.result.detail} SYrateList={data.data.result.rateList} />
                {data.data.result.pyperPriceList.length===0 ? null : (
                <SYbunyangAITip SYdata={data.data.result.pyperPriceList} />
                ) }
                <SYbunyangAIRateList SYdata={data.data.result.aroundSrList} />
                <SYbunyangAIAroundList SYdata={data.data.result.recruitAtpList} />
                <SYbunyangAIMoveInList SYdata={data.data.result.mviAtpList} />
            </div> 
        );
        
    }
}

export default SYbunyangAI;