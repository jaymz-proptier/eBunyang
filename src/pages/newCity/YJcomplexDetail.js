import React, { useState, useEffect } from "react";
import { useSearchParams, useLocation, Link } from "react-router-dom";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { usebasicDetailDanjiQuery, useDetailBizQuery } from "../../apis/bunyang/newcity";
import { useBunyangListQuery } from "../../apis/bunyang/bunyang";
import { YJdanjiSubsrInfo, YJdanjiBonInfo, YJimageInfo, NewCityDetailPopup } from "./";
import { SYlocationInfoComponent } from "../";

function YJcomplexDetail() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [SYdata, setSYdata] = useState();
  const [SYdetailData, setSYdetailData] = useState();
  const biz_no = searchParams.get("biz_no") || "";
  const build_dtl_cd = searchParams.get("build_dtl_cd") || "";
  const [SYsortPressed, SYsetSortPressed] = useState(false);
  const [SYcomplexPressed, SYsetcomplexPressed] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [open, setOpen] = useState(false);
  const [imgIndex, setImgIndex] = useState();
  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const { refetch } = usebasicDetailDanjiQuery({
    params: {
      biz_no: biz_no,
      build_dtl_cd: build_dtl_cd,
    },
    onSuccess: (data) => {
      setSYdata(data.data.result);
    },
    onError: (error) => {
      console.log("Error[usebasicDetailDanjiQuery]", error);
    },
  });

  const { refetch: detailBizRefetch } = useDetailBizQuery({
    params: {
      biz_no: biz_no,
    },
    onSuccess: (data) => {
      setSYdetailData(data.data.result);
    },
    onError: (error) => {
      console.log("Error[useDetailBizQuery]", error);
    },
  });

  useEffect(() => {
    refetch();
    detailBizRefetch();
  }, [biz_no, build_dtl_cd]);

  //이미지 경로 및 이름 가져오기
  function imgAllList() {
    let imgListA = [];

    SYdetailData.imageList.map(function (imgUrl, index) {
      imgListA.push({ index: index, idx: imgUrl.biz_no, image_url: imgUrl.image_url, title: imgUrl.img_div });
    });

    //console.log("imgListA", imgListA);
    return imgListA;
  }

  //팝업창 상태 체크
  const SYdetailPopupState = (openState) => {
    setOpen(openState);
  };

  //클릭한 리스트 인덱스 값 리턴
  const checkImgUrl = (imgIdx) => {
    let findImgList = [];

    imgAllList().map(function (listImgId) {
      findImgList.push({ idx: listImgId.index });
    });

    let findImgIdx = findImgList.findIndex((e) => e.idx == imgIdx);
    // console.log("findImgIdx", imgIdx);
    // console.log("findImgList", findImgList);

    return setImgIndex(findImgIdx);
  };

  if (!SYdata) return "";
  if (!SYdetailData) return "";

  const YJheaderInfo = () => {
    return (
      <div className="headerInfo">
        <div className="complexTitleWrap">
          <span className="state" aria-label={SYdata.areaBizDanjiList.filter((loopData) => loopData.build_dtl_cd === build_dtl_cd).map((loopData) => `${loopData.step_nm}`)}>
            {SYdata.areaBizDanjiList.filter((loopData) => loopData.build_dtl_cd === build_dtl_cd).map((loopData) => `${loopData.step_nm}`)}
          </span>
          <div className="complexTitle">{SYdata.detail.build_nm}</div>
        </div>
        <div className="selectBoxWrap">
          <div className="selectBox locationSelect">
            <Link
              to="#"
              className="selectItem selectInfo"
              aria-pressed={SYsortPressed}
              onClick={(e) => {
                e.preventDefault();
                SYsetSortPressed(!SYsortPressed);
                SYsetcomplexPressed(false);
              }}
            >
              {SYdata.areaBizList.filter((loopData) => loopData.biz_no === biz_no).map((loopData) => `${loopData.biz_nm}`)}
            </Link>

            <div className="selectList">
              {SYdata.areaBizList.map((YJdata, index) => (
                <Link key={index} to={`/newCity/detail?biz_no=${YJdata.biz_no}`} aria-selected="false">
                  {YJdata.biz_nm}
                </Link>
              ))}
            </div>
          </div>

          <div className="selectBox complexSelect">
            <Link
              to="#"
              className="selectItem selectInfo"
              aria-pressed={SYcomplexPressed}
              onClick={(e) => {
                e.preventDefault();
                SYsetcomplexPressed(!SYcomplexPressed);
                SYsetSortPressed(false);
              }}
            >
              {SYdata.detail.build_nm}
            </Link>

            <div className="selectList">
              {SYdata.areaBizDanjiList.map((YJdata, index) => (
                <Link
                  key={index}
                  to={`?biz_no=${YJdata.biz_no}&build_dtl_cd=${YJdata.build_dtl_cd}`}
                  aria-selected="false"
                  onClick={(e) => {
                    SYsetcomplexPressed(!SYcomplexPressed);
                  }}
                >
                  {YJdata.build_nm}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="moreButton">
          <button className="">
            <Link to="/newCity">전체보기</Link>
          </button>
        </div>
      </div>
    );
  };
  const YJbasicInfo = () => {
    return (
      <div className="complexContentArea">
        <div className="articleWrap basicInfo">
          <div className="articleTitle">
            <div className="title">기본 정보</div>
          </div>
          <div className="articleContent">
            <div className="tableWrap">
              <div className="tableContent">
                <div className="tableRow">
                  <div className="tableDataWrap">
                    <div className="tableData">주소</div>
                  </div>
                  <div className="tableDataWrap">
                    <div className="tableData">{SYdata.detail.address}</div>
                  </div>
                </div>

                <div className="tableRow">
                  <div className="tableDataWrap">
                    <div className="tableData">단지규모</div>
                  </div>
                  <div className="tableDataWrap">
                    <div className="tableData">{SYdata.detail.total_house_cnt}</div>
                  </div>
                </div>

                <div className="tableRow">
                  <div className="tableDataWrap">
                    <div className="tableData">입주예정</div>
                  </div>
                  <div className="tableDataWrap">
                    <div className="tableData">{SYdata.detail.mvi_date}</div>
                  </div>
                </div>

                <div className="tableRow">
                  <div className="tableDataWrap">
                    <div className="tableData">건설사</div>
                  </div>
                  <div className="tableDataWrap">
                    <div className="tableData">{SYdata.detail.cmpy_nm}</div>
                  </div>
                </div>

                <div className="tableRow">
                  <div className="tableDataWrap">
                    <div className="tableData">전매여부</div>
                  </div>
                  <div className="tableDataWrap">
                    <div className="tableData">{SYdata.detail.deny_mnpl_end_yn === "Y" ? "전매제한단지" : null}</div>
                  </div>
                </div>

                <div className="tableRow">
                  <div className="tableDataWrap">
                    <div className="tableData">분양문의</div>
                  </div>
                  <div className="tableDataWrap">
                    <div className="tableData">{SYdata.detail.sell_office_phone}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="contentWrap">
      <div className="sectionWrap newDetail complexDetail">
        <div className="contentInfoWrap">
          <div className="complexColumn">
            <div className="complexContentArea">
              <YJheaderInfo />
            </div>
          </div>
        </div>

        <div className="contentInfoWrap">
          <div className="complexColumn">
            <YJbasicInfo />

            {SYdata.detail.bunyang_link_yn === "Y" ? (
              <div className="adContentArea">
                <Link to={`/bunyang/detail?build_dtl_cd=${SYdata.detail.build_dtl_cd}&supp_cd=${SYdata.detail.supp_cd}`} className="bannerBox">
                  지금 보고 있는 단지<br></br>분양정보에서 자세히 보기 <i className="Icon_next"></i>
                </Link>
              </div>
            ) : null}

            <SYlocationInfoComponent SYdata={SYdata.detail} />
          </div>
        </div>

        <div className="contentInfoWrap">
          <div className="complexColumn tabSection">
            <div className="complexContentArea tabArea">
              <Tabs selectedIndex={activeTab} onSelect={handleTabClick}>
                <TabList className="tabList">
                  <Tab className="tabListItem" aria-selected={activeTab === 0}>
                    사전청약정보
                  </Tab>
                  <Tab className="tabListItem" aria-selected={activeTab === 1}>
                    본청약정보
                  </Tab>
                  <Tab className="tabListItem" aria-selected={activeTab === 2}>
                    이미지
                  </Tab>
                </TabList>

                <TabPanel>
                  <YJdanjiSubsrInfo biz_no={biz_no && biz_no} build_dtl_cd={build_dtl_cd && build_dtl_cd} />
                </TabPanel>
                <TabPanel>
                  {/* <YJdanjiBonInfo SYdata={SYdetailData} /> */}
                  <YJdanjiBonInfo biz_no={biz_no && biz_no} build_dtl_cd={build_dtl_cd && build_dtl_cd} />
                </TabPanel>
                <TabPanel>
                  <YJimageInfo SYdata={SYdetailData} SYdetailPopupState={SYdetailPopupState} checkImgUrl={checkImgUrl} />
                  <NewCityDetailPopup SYdata={SYdetailData.imageList} open={open} SYdetailPopupState={SYdetailPopupState} imgIndex={imgIndex} />
                </TabPanel>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default YJcomplexDetail;
