import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import { useQuery } from "react-query";
import axios from "axios";
import { SYmetatag } from "../../components/layout";
import { usePath } from "../../shared/contexts/SYpath";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import {
  YJbasicInfoComponent,
  YJscalePriceComponent,
  YJdevelopComponent,
  YJinsideComponent,
  YJunitVideoComponent,
  YJadComponent,
  YJaroundComponent,
  YJsurroundingsComponent,
  YJlocationComponent,
} from "../siteReport";
import { SYproductHeader } from "../";
import { Link } from "react-router-dom";
import { SYnumberFormat, SYreactGA4Title } from "../../hooks/";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import { ReportDetailPopup, InsidePopup, LocationPopup, BasicPopup } from "../siteReport";

function SYsiteReportDetail() {
  const [surroundingsCode, setSYsurroundingsCode] = useState();

  const { search } = useLocation();
  const SYquery = queryString.parse(search);
  const { SYapiPath } = usePath();

  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };
  const SYpagination = {
    clickable: true,
  };
  const swiperRef = React.useRef(null);

  const SYsectionWrap = () => {
    const { data } = useQuery(["siteReport", SYquery.report_cd], () => axios.get(`${SYapiPath}/siteReport/basicDetail?report_cd=${SYquery.report_cd}`), "");
    const [open, setOpen] = useState(false);
    const [insideopen, setinsideOpen] = useState(false);
    const [locationopen, setlocationOpen] = useState(false);
    const [basicopen, setbasicOpen] = useState(false);
    const [imgIndex, setImgIndex] = useState();
    const [imgIndexB, setImgIndexB] = useState();
    const [imgIndexC, setImgIndexC] = useState();
    const [imgIndexBasic, setImgIndexBasic] = useState();

    const [scroll, setScroll] = useState(false);
    const [scrollCheck, setScrollCheck] = useState(false);
    let lastScrollPosition = window.pageYOffset;

    const handleScroll = () => {
        const currentScrollPosition = window.pageYOffset;
        if (currentScrollPosition > lastScrollPosition) {
            // setScroll('down');
            setScroll(true);
        } else if (currentScrollPosition < lastScrollPosition) {
            // setScroll('up');
            setScroll(false);
        }
  
        lastScrollPosition = currentScrollPosition;
    };


      useEffect(() => {
        const listener = () => {
          handleScroll();
        };
        window.addEventListener('scroll', listener);
      
        return () => {
          window.removeEventListener('scroll', listener); // cleanup
        };
      }, []);

    if (data) {
      const SYdata = data.data.result;
      const locationLength = SYdata.locationMapList.length;
      document.querySelector("title").innerHTML = SYdata.detail.build_nm;
      SYreactGA4Title(SYdata.detail.build_nm + " - 현장리포트");

      //이미지 경로 및 이름 가져오기 - 주변환경
      function imgAllList() {
        let imgListA = [];
        SYdata?.surroundingsList.map((loopData) => {
          loopData.dataList.map((imgUrl) => {
            imgListA.push({
              idx: imgUrl.id,
              image_url: imgUrl.image_url,
              title: imgUrl.title,
            });
          });
        });
        //console.log("imgListA", imgListA);
        return imgListA;
      }
      //이미지 경로 및 이름 가져오기 - 홍보관투어
      function InsideimgAllList() {
        let imgListB = [];

        SYdata?.insideList.map((loopData) => {
          loopData.dataList.map((imgUrl) => {
            imgListB.push({
              idx: imgUrl.id,
              image_url: imgUrl.image_url,
              title: imgUrl.title,
            });
          });
        });
        //console.log("imgListB", imgListB);
        return imgListB;
      }

      //이미지 경로 및 이름 가져오기 - 입지투어
      function locationimgAllList() {
        let imgListC = [];

        SYdata?.locationMapList.map((imgUrl) => {
          //loopData.dataList.map((imgUrl) => {
          imgListC.push({
            idx: imgUrl.id,
            image_url: imgUrl.image_url,
            title: imgUrl.title,
          });
          //});
        });
        //console.log("imgListC", imgListC);
        return imgListC;
      }
      //이미지 경로 및 이름 가져오기 - 기본이미지
      function basicimgAllList() {
        let imgListD = [];

        imgListD.push({
          detail: SYdata.detail.image_url,
        });
        return imgListD;
      }
      //팝업창 상태 체크 - 주변환경
      const SYdetailPopupState = (openState) => {
        setOpen(openState);
      };
      //팝업창 상태 체크 - 홍보관투어
      const insideSYdetailPopupState = (insideopenState) => {
        setinsideOpen(insideopenState);
      };
      //팝업창 상태 체크 - 입지투어
      const locationSYdetailPopupState = (locationopenState) => {
        setlocationOpen(locationopenState);
      };
      //팝업창 상태 체크 - 기본이미지
      const basicSYdetailPopupState = (basicopenState) => {
        setbasicOpen(basicopenState);
      };

      //클릭한 리스트 인덱스 값 리턴 - 주변환경
      const checkImgUrl = (imgIdx) => {
        let findImgList = [];

        imgAllList().map((loopData) => {
          findImgList.push({ idx: loopData.idx });
        });

        let findImgIdx = findImgList.findIndex((e) => e.idx == imgIdx);
        //console.log("imgIdx", imgIdx);
        // console.log("findImgList", findImgList);
        return setImgIndex(findImgIdx);
      };

      //클릭한 리스트 인덱스 값 리턴 - 홍보관투어
      const insideCheckImgUrl = (imgIdxB) => {
        let InsidefindImgList = [];
        InsideimgAllList().map((loopData) => {
          InsidefindImgList.push({ idx: loopData.idx });
        });
        let InsidefindImgIdx = InsidefindImgList.findIndex((e) => e.idx == imgIdxB);
        return setImgIndexB(InsidefindImgIdx);
      };
      //클릭한 리스트 인덱스 값 리턴 - 입지투어
      const locationCheckImgUrl = (imgIdxC) => {
        let locationfindImgList = [];
        locationimgAllList().map((loopData) => {
          locationfindImgList.push({ idx: loopData.idx });
        });
        let locationfindImgIdx = locationfindImgList.findIndex((e) => e.idx == imgIdxC);
        return setImgIndexC(locationfindImgIdx);
      };
      //클릭한 리스트 인덱스 값 리턴 - 기본이미지
      const basicCheckImgUrl = (imgIdxD) => {
        let basicfindImgList = [];
        basicfindImgList.push({ idx: SYdata.detail.report_cd });

        let basicfindImgIdx = basicfindImgList.findIndex((e) => e.idx == imgIdxD);
        //console.log("imgIdxD", imgIdxD);
        //console.log("basicfindImgList", basicfindImgList);
        return setImgIndexBasic(basicfindImgIdx);
      };

      

      return (
        <div className="reportDetail">
          {/* <div className="sectionWrap"> */}
          <SYmetatag
            title={SYdata.detail.build_nm + " - 현장리포트"}
            meta_title={"[현장리포트]" + SYdata.detail.build_nm}
            description={SYdata.detail.address_info + " | 입주 " + SYdata.detail.moving_date + " | " + SYdata.detail.house_info + " | " + SYdata.detail.dong_info + " | " + SYdata.detail.floor_info}
            image={SYdata.detail.image_url}
          />
          <SYproductHeader
            SYdata={{
              build_nm: SYdata.detail.build_nm,
              sell_office_phone: SYdata.detail.contact_info,
              view_count: SYdata.detail.view_count,
              buildList: SYdata.buildList,
              bclass_nm: SYdata.detail.bclass_nm,
            }}
          />
          {
              SYdata.detail.contact_info ?
                  <a href={`tel:${SYdata.detail.contact_info}`} className={scroll ? "mobileBottomBtn scroll" : "mobileBottomBtn"}>
                      <span>문의하기</span>
                  </a>
                  : null
          }
          {/* 언택트영상투어 */}
          <YJunitVideoComponent
            SYdata={{
              unitVideoList: SYdata.unitVideoList,
              detail: SYdata.detail,
            }}
            basicSYdetailPopupState={basicSYdetailPopupState}
            basicCheckImgUrl={basicCheckImgUrl}
          />
          <BasicPopup SYdata={SYdata.detail} basicopen={basicopen} basicSYdetailPopupState={basicSYdetailPopupState} imgIndexBasic={imgIndexBasic} />
          {/* <button className="listBtn">
            <i className="Icon_list"></i>
            <span>리스트</span>
          </button> */}

          <div className="contentInfoWrap">
            <div className="reportComponentWrap">
              {/* 상세정보 */}
              <YJbasicInfoComponent SYdata={SYdata.detail} />

              {/* 가격정보 */}
              {SYdata.scalePriceList && SYdata.scalePriceList.length > 0 ? <YJscalePriceComponent SYdata={{ scalePriceList: SYdata.scalePriceList }} /> : null}

              {/* 홍보관투어 */}
              {SYdata.insideList && SYdata.insideList.length > 0 ? (
                <YJinsideComponent SYdata={SYdata.insideList} insideSYdetailPopupState={insideSYdetailPopupState} insideCheckImgUrl={insideCheckImgUrl} />
              ) : null}
              <InsidePopup SYdata={InsideimgAllList()} insideopen={insideopen} insideSYdetailPopupState={insideSYdetailPopupState} imgIndexB={imgIndexB} />

              {/* 입지투어 */}
              {SYdata.locationMapList.length && SYdata.locationMapList.length > 0 ? (
                <YJlocationComponent SYdata={SYdata.locationMapList} locationSYdetailPopupState={locationSYdetailPopupState} locationCheckImgUrl={locationCheckImgUrl} />
              ) : null}
              <LocationPopup SYdata={locationimgAllList()} locationopen={locationopen} locationSYdetailPopupState={locationSYdetailPopupState} imgIndexC={imgIndexC} />

              {/* 주변환경 */}
              {SYdata.surroundingsList && SYdata.surroundingsList.length > 0 ? (
                <YJsurroundingsComponent
                  SYdata={{
                    surroundingsList: SYdata.surroundingsList,
                    locationMapList: SYdata.locationMapList,
                  }}
                  SYdetailPopupState={SYdetailPopupState}
                  checkImgUrl={checkImgUrl}
                />
              ) : null}
              <ReportDetailPopup SYdata={imgAllList()} open={open} SYdetailPopupState={SYdetailPopupState} imgIndex={imgIndex} />

              {/* 개발호재 */}
              {SYdata.developList.length > 0 ? (
                <YJdevelopComponent
                  SYdata={{
                    developList: SYdata.developList,
                    locationMapList: SYdata.locationMapList,
                  }}
                />
              ) : null}

              {/* 배너 */}
              <YJadComponent SYdata={SYdata.advertise} />

              {/* 주변 현장리포트 */}
              {SYdata.aroundList.length > 0 ? <YJaroundComponent SYdata={SYdata.aroundList} /> : null}
            </div>
          </div>
          {/* </div> */}
        </div>
      );
    }
  };
  return (
    <div className="contentWrap">
      <SYsectionWrap />
    </div>
  );
}

export default SYsiteReportDetail;
