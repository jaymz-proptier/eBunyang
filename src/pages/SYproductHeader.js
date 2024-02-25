import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { SYnumberFormat, SYreactGA4Title } from "../hooks/";
import { SYshareLayerPopup } from "../components/layout";

function SYcomplexListLayerPopup({ SYdata, SYcomplexListPopup }) {
  const SYmodal = useRef();
  const SYoutSideClick = (e) => {
    if (SYmodal.current && !SYmodal.current.contains(e.target)) {
      SYcomplexListPopup();
    }
    SYreactGA4Title(document.title);
  };
  return (
    <div className="SYpopupLayerWrap" onClick={SYoutSideClick}>
      <div className="popupContentWrap SYcomplexListContents" ref={SYmodal}>
        <div className="popupHeader">
          <div className="headerTitle">단지를 선택하세요.</div>
          <button type="button" className="close" onClick={SYcomplexListPopup}>
            <i className="SYicon"></i>
          </button>
        </div>
        <div className="popupContent">
          <div className="complexListContent">
            <ul>
              {SYdata.filter((SYloopData) => SYloopData.use_yn === "Y").map((SYloopData) => (
                <li>
                  <Link to={`/bunyang/detail?build_dtl_cd=${SYloopData.build_dtl_cd}&supp_cd=${SYloopData.supp_cd}`}>{SYloopData.build_nm}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function SYproductHeader({ SYdata }) {
  const [SYopenPopup, SYsetOpenPopup] = useState(false);
  const [SYcomplexListPopupCheck, SYsetComplexListPopupCheck] = useState(false);
  const SYsharePopupCheck = () => {
    if (SYopenPopup) document.querySelector("body").classList.remove("popupView");
    else document.querySelector("body").classList.add("popupView");
    SYsetOpenPopup(!SYopenPopup);
    SYreactGA4Title(document.title);
  };
  const SYcomplexListPopup = () => {
    if (SYopenPopup) document.querySelector("body").classList.remove("popupView");
    else document.querySelector("body").classList.add("popupView");
    SYsetComplexListPopupCheck(!SYcomplexListPopupCheck);
    SYreactGA4Title(document.title);
  };
  const [ScrollY, setScrollY] = useState(0); // window 의 pageYOffset값을 저장
  const [ScrollActive, setScrollActive] = useState(false);
  function handleScroll() {
    if (ScrollY > 299) {
      setScrollY(window.pageYOffset);
      setScrollActive(true);
    } else {
      setScrollY(window.pageYOffset);
      setScrollActive(false);
    }
  }
  useEffect(() => {
    function scrollListener() {
      window.addEventListener("scroll", handleScroll);
    } //  window 에서 스크롤을 감시 시작
    scrollListener(); // window 에서 스크롤을 감시
    return () => {
      window.removeEventListener("scroll", handleScroll);
    }; //  window 에서 스크롤을 감시를 종료
  });
  return (
    <div className={ScrollActive ? "headerInfo fixed" : "headerInfo"}>
      <div className="headerInner">
        {SYdata.bclass_nm || SYdata.buildList ? (
          <div className="developTypeWrap">
            <div className="bizType">{SYdata.bclass_nm}</div>
            {SYdata.buildList ? (
              SYdata.buildList.filter((SYloopData) => SYloopData.use_yn === "Y").length > 0 ? (
                SYdata.buildList.filter((SYloopData) => SYloopData.use_yn === "Y").length > 1 ? (
                  <a href="javascript:void(0);" className="complexLink" onClick={SYcomplexListPopup}>
                    단지정보
                  </a>
                ) : (
                  <Link to={`/bunyang/detail?build_dtl_cd=${SYdata.buildList[0].build_dtl_cd}&supp_cd=${SYdata.buildList[0].supp_cd}`} className="complexLink">
                    단지정보
                  </Link>
                )
              ) : null
            ) : null}
          </div>
        ) : null}
        <div className="complexTitleWrap">
          <div className="complexTitle">{SYdata.build_nm}</div>
          <div className="shareBtn">
            {SYdata.view_count ? <div className="viewCount">조회 {SYnumberFormat(SYdata.view_count)}</div> : null}
            <button type="button" className="share" onClick={() => SYsharePopupCheck()}>
              <i className="Icon_share"></i>
            </button>
          </div>
        </div>
        {SYdata.address ? (
          <div className="addressWrap">
            <div className="complexAddress">{SYdata.address}</div>
          </div>
        ) : null}
        <div className="infoBtnWrap">
          <div className="infoBtnCol">
            {SYdata.bunyang_url ? (
              <a href={SYdata.bunyang_url} className="infoBtn" target="_blank" rel="noopener noreferrer">
                <i className="Icon_home"></i>
                <div className="infoTxt">분양홈페이지</div>
              </a>
            ) : null}
            {SYdata.sell_office_phone ? (
              <a href="{() => false}" className="infoBtn phoneCall">
                <i className="Icon_phone"></i>
                <div className="infoPhone">{SYdata.sell_office_phone}</div>
              </a>
            ) : null}
          </div>
          {SYdata.new_notif_info_url ? (
            <div className="downloadButton">
              <a href={SYdata.new_notif_info_url} className="infoBtn" target="_blank" rel="noopener noreferrer">
                <i className="Icon_download"></i>
                <div className="infoTxt">입주자 모집공고문</div>
              </a>
            </div>
          ) : null}
        </div>
        {SYopenPopup ? <SYshareLayerPopup SYsharePopupCheck={SYsharePopupCheck} /> : null}
        {SYcomplexListPopupCheck ? <SYcomplexListLayerPopup SYdata={SYdata.buildList} SYcomplexListPopup={SYcomplexListPopup} /> : null}
      </div>
    </div>
  );
}

export default SYproductHeader;
