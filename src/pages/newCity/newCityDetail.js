import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { YJsubsrInfo, YJchungyakInfo, YJimageInfo, NewCityDetailPopup } from "./";
import { useNewcityListQuery, useDetailBizQuery } from "../../apis/bunyang/newcity";

function newCityDetail() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [SYdata, setSYdata] = useState();
  const [SYdetailData, setSYdetailData] = useState();
  const [SYsortPressed, SYsetSortPressed] = useState(false);
  const [SYcomplexPressed, SYsetcomplexPressed] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const biz_no = searchParams.get("biz_no") || "";
  const [open, setOpen] = useState(false);
  const [imgIndex, setImgIndex] = useState();

  const { refetch } = useNewcityListQuery({
    params: {
      biz_no: biz_no,
    },
    onSuccess: (data) => {
      if (data.data.result.detail === null) navigate(`/newCity`);
      setSYdata(data.data.result);
    },
    onError: (error) => {
      console.log("Error[useNewcityListQuery]", error);
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
    window.scrollTo(0, 0);
  }, [biz_no]);

  if (!SYdata) return "";
  if (!SYdetailData) return "";

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  //let imageList = SYdetailData.imageList;
  //console.log("SYdetailData.imageList", SYdetailData.imageList);

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
    console.log("findImgIdx", imgIdx);
    console.log("findImgList", findImgList);

    return setImgIndex(findImgIdx);
  };

  return (
    <div className="contentWrap">
      <div className="sectionWrap newDetail">
        <div className="contentInfoWrap">
          <div className="complexColumn">
            <div className="complexContentArea">
              <div className="headerInfo">
                <div className="complexTitleWrap">
                  <div className="complexTitle">{SYdata.detail.biz_nm}</div>
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
                      {SYdata.areaBizList?.map((YJdata, index) => (
                        <Link
                          key={index}
                          to={`/newCity/detail?biz_no=${YJdata.biz_no}`}
                          aria-selected="false"
                          onClick={(e) => {
                            SYsetSortPressed(!SYsortPressed);
                          }}
                        >
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
                      단지 전체
                    </Link>

                    <div className="selectList">
                      {SYdata.areaBizDanjiList?.map((YJdata, index) => (
                        <Link key={index} to={`/newCity/complex?biz_no=${YJdata.biz_no}&build_dtl_cd=${YJdata.build_dtl_cd}`} aria-selected="false">
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
            </div>
          </div>
        </div>

        {/* 사전청약 진행 현황 */}
        <YJsubsrInfo SYdata={SYdata?.detail} />

        <div className="contentInfoWrap">
          <div className="complexColumn tabSection">
            <div className="complexContentArea tabArea">
              <Tabs selectedIndex={activeTab} onSelect={handleTabClick}>
                <TabList className="tabList">
                  <Tab className="tabListItem" aria-selected={activeTab === 0}>
                    청약정보
                  </Tab>
                  <Tab className="tabListItem" aria-selected={activeTab === 1}>
                    이미지
                  </Tab>
                </TabList>

                <TabPanel>
                  <YJchungyakInfo SYdata={SYdetailData} />
                </TabPanel>
                <TabPanel>
                  <YJimageInfo SYdata={SYdetailData} SYdetailPopupState={SYdetailPopupState} checkImgUrl={checkImgUrl} />
                  {/* <YJimageInfo SYdata={SYdetailData} /> */}
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

export default newCityDetail;
