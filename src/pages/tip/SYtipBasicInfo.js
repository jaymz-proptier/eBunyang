import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { SYreactGA4Title } from "../../hooks/";
import { SYshareLayerPopup } from "../../components/layout";

function SYtipBasicInfo({ SYdata }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const blog_cd = searchParams.get("blog_cd") || "";
  const [SYopenPopup, SYsetOpenPopup] = useState(false);

  const SYsharePopupCheck = () => {
    if (SYopenPopup) document.querySelector("body").classList.remove("popupView");
    else document.querySelector("body").classList.add("popupView");
    SYsetOpenPopup(!SYopenPopup);
    SYreactGA4Title(document.title);
  };

  const listPage = () => {
    // 이전 페이지에서 전달한 파라미터 값
    const prevParams = window.history.state?.usr?.prevParams;
    return prevParams ? `?${prevParams}` : "";
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [blog_cd]);

  return (
    <div className="complexContentArea">
      <div className="articleWrap">
        <div className="titleArea">
          <div className="labelWrap">
            <div className="atozLabel" aria-label="전월세">
              #{SYdata.category_nm}
            </div>
            <div className="shareBtn">
              <button className="share">
                <i className="Icon_share"></i>
              </button>
            </div>
          </div>
          <div className="atozTitleWrap">
            <div className="title">{SYdata.title}</div>
            <div className="uploadDate">{SYdata.reg_date}</div>
            <div className="shareBtn">
              {SYdata.view_count ? <div className="viewCount">조회 {SYnumberFormat(SYdata.view_count)}</div> : null}
              <button type="button" className="share" onClick={() => SYsharePopupCheck()}>
                <i className="Icon_share"></i>
              </button>
            </div>
            {SYopenPopup ? <SYshareLayerPopup SYsharePopupCheck={SYsharePopupCheck} /> : null}
          </div>
        </div>
        <div className="articleContent">
          <div
            className="atozContent"
            dangerouslySetInnerHTML={{ __html: SYdata.blog_content }}
          ></div>
          <div className="backListBtn">
            <Link to={`/tip${listPage()}`} className="backBtn">
              목록으로
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SYtipBasicInfo;
