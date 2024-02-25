import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDevelopListPreviewQuery } from "../../apis/bunyang/develop";

function SYdevelopIssue() {
  const [SYdata, setSYdata] = useState([]);

  const { data, isLoading, refetch } = useDevelopListPreviewQuery({
    onSuccess: (data) => {
      setSYdata(data.data.result);
    },
    onError: (error) => {
      console.log("Error[useDevelopListPreviewQuery]", error);
    },
  });

  useEffect(() => {
    refetch();
  }, []);

  if (isLoading) return "";

  return (
    <div className="SYdevelopIssueWrap">
      <div className="developIssueWrap">
        <div className="developHeader">
          <h3 className="title">이슈 개발사업</h3>
        </div>
        <div className="developIssueList">
          {SYdata.bizList?.map((loopData, index) => (
            <Link key={index} to={`/develop/detail?biz_no=${loopData.biz_no}`}>
              <span className="type">{loopData.biz_type_nm}</span>
              {loopData.biz_nm}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SYdevelopIssue;
