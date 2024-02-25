import React, { useState, useEffect, useRef, Fragment } from "react";
import { SYkoreanPrice, SYreactGA4Title } from "../../hooks/";
import { SYbunyangOption } from "./";
import { useBunyangDonghoQuery } from "../../apis/bunyang/bunyang";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";

function SYdongInfo({ build_dtl_cd, dong_nm, open }) {
  const [SYdongName, SYsetDongName] = useState(dong_nm);
  const [SYhoData, SYsetHoData] = useState(null);
  const [SYdata, setSYdata] = useState();

  // 동호 옵션 팝업 위치
  const [topPosition, setTopPosition] = useState(null);
  //동호 옵션 팝업 닫기
  const [donghoPopup, setDonghoPopup] = useState(false);

  // 평형정보코드
  const [pyInfo, setPyInfo] = useState(null);
  const [SYtabExpanded, SYsetTabExpanded] = useState(false);

  //팝업창 상태 체크

  //팝업창이 아닌 다른 곳 선택하면 닫힘
  const [popupOpen, setpopupOpen] = useState(false);
  const popupLayout = useRef();

  const pyPopupState = (openState) => {
    setpopupOpen(openState);
  };

  const handleClosePopup = (e) => {
    if (
      popupOpen &&
      (!popupLayout.current || !popupLayout.current.contains(e.target))
    )
      setpopupOpen(false);
  };

  useEffect(() => {
    window.addEventListener("click", handleClosePopup);
    return () => {
      window.addEventListener("click", handleClosePopup);
    };
  }, []);

  const { refetch } = useBunyangDonghoQuery({
    params: {
      build_dtl_cd: build_dtl_cd,
      dong_nm: SYdongName,
    },
    onSuccess: (data) => {
      setSYdata(data.data.result);
    },
    onError: (error) => {
      console.log("Error[useTipListQuery]", error);
    },
  });

  useEffect(() => {
    refetch();
  }, [build_dtl_cd, dong_nm, SYdongName]);

  if (!SYdata) return "";

  const SYdonghoListWrap = () => {
    let SYdonghoScaleColor = new Array();
    SYdata.suppSizeList.map((SYloopData) => {
      if (!SYdonghoScaleColor[SYloopData.supp_size_step])
        SYdonghoScaleColor[SYloopData.supp_size_step] = [];
      SYdonghoScaleColor[SYloopData.supp_size_step] = [
        ...SYdonghoScaleColor[SYloopData.supp_size_step],
        SYloopData.py_nm,
      ];
    });
    return (
      <Fragment>
        <div className="donhoPlanWrap">
          <div className="scrollWrap">
            <div className="lineWrap">
              <div className="line">
                {SYdata.donghoList.map((SYloopData, SYindex) => (
                  <div
                    key={SYindex}
                    className="lineInner"
                    aria-label={SYloopData.categoryName}
                  >
                    {SYloopData.dataList.map((SYsubLoopData, SYsubIndex) => (
                      <div
                        key={SYsubIndex}
                        className="hoInfo"
                        aria-label={
                          SYsubLoopData.piloti_yn === "Y"
                            ? "필로티"
                            : SYsubLoopData.ho_nm === ""
                              ? "공급제외"
                              : SYsubLoopData.supp_size_step +
                              SYdonghoScaleColor[
                                SYsubLoopData.supp_size_step
                              ].indexOf(SYsubLoopData.py_nm)
                        }
                        aria-pressed={
                          SYhoData && SYsubLoopData.ho_cd === SYhoData.ho_cd
                            ? true
                            : false
                        }
                        onClick={(e) => {
                          // console.log(SYsubLoopData.ho_nm);
                          if (
                            SYsubLoopData.ho_nm !== "X" && SYsubLoopData.ho_nm !== ""
                          ) {
                            SYhoChange(SYsubLoopData);
                          }
                          donghoTopPosition(SYloopData.dataList.length, SYsubIndex),
                          setDonghoPopup(true)
                        }}
                      >
                        {SYsubLoopData.piloti_yn === "Y" ||
                          SYsubLoopData.ho_nm === ""
                          ? ""
                          : SYsubLoopData.ho_nm}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="planTypeWrap">
            {SYdata.suppSizeList.map((SYloopData, SYindex) => (
              <div key={SYindex} className="donghoPlanType">
                <div
                  className="colorBox"
                  aria-label={
                    SYloopData.supp_size_step +
                    SYdonghoScaleColor[SYloopData.supp_size_step].indexOf(
                      SYloopData.py_nm
                    )
                  }
                ></div>
                <div className="planText">{SYloopData.py_nm}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="donghoInfoCaption">
          ※ 분양가 및 유상옵션 금액은 모집공고문을 기반으로 제공하고 있습니다.
          유상옵션 계산의 경우 선택 옵션에 따라 실제 금액과 차이 날 수 있으므로
          참고용으로 활용하시길 바랍니다. 활용에 대한 책임은 전적으로 이용자에게
          있으며 e분양은 이에 대하여 아무런 책임을 부담하지 않습니다.
        </div>
      </Fragment>
    );
  };

  const SYdonghoInfoWrap = () => {
    return (
      <div className="donghoInfoWrap">
        <div className="tableRow titleRow">
          <div className="donghoTable">
            <div className="selectDong">{SYhoData.dong_nm}동</div>
            <div className="selectho">
              {SYhoData.ho_nm}호 ({SYhoData.py_nm})
            </div>
          </div>
        </div>
        <div className="tableRow contentRow">
          <div className="donghoTableContentArea">
            <div className="donghoTable">
              <div className="donghoPriceTitle">분양가</div>
              <div className="donghoPriceCon">
                {SYkoreanPrice({
                  price: SYhoData.supp_price / 10000,
                  unit: "만원",
                })}
              </div>
            </div>
            <div className="donghoTable">
              <div className="donghoPriceTitle">취득세</div>
              <div className="donghoPriceCon">
                {SYkoreanPrice({
                  price: SYhoData.acq_tax_price / 10000,
                  unit: "만원",
                })}
              </div>
            </div>
          </div>
          {SYhoData.option_yn === "Y" ? (
            <div className="priceOptionBtnWrap">
              <a href="javascript:void(0);" onClick={() => {
                if (
                  SYhoData.option_yn === "Y"
                ) {
                  pyPopupState(true);
                } else {
                  pyPopupState(false);
                }
              }} className="priceOptionBtn">
                유상옵션 선택하고 분양가 계산하기
              </a>
            </div>
          ) : null}
        </div>
      </div>
    );
  };
  const SYtabListExpanded = () => {
    SYsetTabExpanded(!SYtabExpanded);
    SYreactGA4Title(document.title + " - 동호정보");
  }
  const SYtabChange = (SYdongName) => {
    SYsetDongName(SYdongName);
    SYsetHoData(null);
    SYreactGA4Title(document.title + ` - 동호정보(${SYdongName})`);
  }
  const SYhoChange = (SYdata) => {
    SYsetHoData(SYdata);
    SYreactGA4Title(document.title + ` - 동호정보(${SYdata.dong_nm}동[${SYdata.ho_nm}호])`);
  } 

  const donghoTopPosition = (length, index) => {
    // 33은 hoInfo의 높이
    setTopPosition(33 * ((length - index) + 1));
    // console.log('length', index)
  }

  return (
    <div className="tabContentWrap">
      <div className="donghoTabWrap">
        <div className="tabList" aria-expanded={SYtabExpanded}>
          <div className="tabListItemWrap">
            <Swiper modules={[Navigation]} slidesPerView={'auto'} freeMode={true}>
              {SYdata.dongList.map((SYloopData, SYindex) => (
                <SwiperSlide
                  key={SYindex}
                  className="dongListItem"
                  aria-selected={
                    (SYdongName === "" && SYindex === 0) ||
                      SYdongName === SYloopData.dong_nm
                      ? true
                      : false
                  }
                  onClick={() => {
                    SYtabChange(SYloopData.dong_nm);
                  }}
                >
                  {SYloopData.dong_nm}
                </SwiperSlide>
              ))}
            </Swiper>
            {SYdata.dongList.length > 5 ? (
              <div className="listMoreBtn" onClick={SYtabListExpanded}><i className="Icon_more"></i></div>
            ) : null}
          </div>
        </div>
        <div className="donghoTabpanel">
          <div className="articleWrap donghoArea">
            <SYdonghoListWrap />
            <div className={donghoPopup === true ? 'donghoPopup open' : 'donghoPopup close'} style={{top: `${topPosition}px`}}>
              <button className="donghoPopupClose" onClick={() => {setDonghoPopup(false)}}></button>
              {SYhoData ? <SYdonghoInfoWrap /> : null}
            </div>
          </div>
        </div>
      </div>

      <div
        className={popupOpen ? "optionPopupWrap open" : "optionPopupWrap"}
        ref={popupLayout}
      >
        <div className="optionPopupInner">
          <div className="optionPopupContent">
            {SYhoData && <SYbunyangOption SYhoData={SYhoData} setpopupOpen={setpopupOpen} />}
          </div>
        </div>
      </div>
    </div>
  );
  
}

export default SYdongInfo;
