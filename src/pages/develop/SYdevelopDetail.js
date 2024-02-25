import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { SYmetatag } from "../../components/layout";
import { SYdevelopBizTypeInfo, SYreactGA4Title } from "../../hooks";
import { SYproductHeader } from "../";
import {
  SYdevelopAroundList,
  SYdevelopBasicInfo,
  SYdevelopBasicPreview,
  SYdevelopProgress,
} from "../develop";
import { useDevelopDetailQuery } from "../../apis/bunyang/develop";
// import fixedContent from '../../hooks/fixedContent';

function SYdevelopDetail() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [SYdata, setSYdata] = useState("");
  const biz_no = searchParams.get("biz_no");

  const { data, refetch } = useDevelopDetailQuery({
    params: {
      biz_no: biz_no,
    },
    onSuccess: (data) => {
      setSYdata(data.data.result);
      document.querySelector("title").innerHTML = data.data.result.detail.biz_nm;            
      SYreactGA4Title(data.data.result.detail.biz_nm+" - 개발사업");
      if (data.data.result.detail === null) navigate(`/develop`);
    },
    onError: (error) => {
      console.log("Error[useDevelopDetailQuery]", error);
    },
  });

  useEffect(() => {
    refetch();
    window.scrollTo(0, 0);
  }, [biz_no, searchParams]);

  if (!SYdata) return "";

  return (
    <div className="contentWrap develop detail">
      <div className="sectionWrap">
        <SYmetatag title={SYdata.detail.biz_nm +" - 개발사업"} meta_title={"[개발사업]"+ SYdata.detail.biz_nm} description={SYdata.detail.address +" | "+ SYdata.detail.biz_type_nm +" | "+ SYdata.detail.biz_step} image={SYdata.detail.image_url} />
        <SYproductHeader
          SYdata={{
            build_nm: SYdata.detail.biz_nm,
            address: SYdata.detail.address,
            biz_type_nm: SYdata.detail.biz_type_nm,
            biz_type_info: SYdevelopBizTypeInfo({
              biz_step: SYdata.detail.biz_step,
              old_year_date: SYdata.detail.old_year_date,
              old_month_date: SYdata.detail.old_month_date,
            }),
          }}
        />
        <div className="contentInfoWrap">
          <div className="complexColumn" >
            <div id="stickyContent">
              <SYdevelopBasicPreview SYdata={SYdata.detail} />
            </div>
          </div>
          <div className="complexColumn">
            <div className="complexContentArea">
              <div className="columnContentWrap">
                <SYdevelopBasicInfo SYdata={SYdata.detail} />
                {SYdata?.bizStepList && (
                  <SYdevelopProgress SYdata={SYdata.bizStepList} />
                )}
                {SYdata?.aroundList && (
                  <SYdevelopAroundList SYdata={SYdata.aroundList} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SYdevelopDetail;
