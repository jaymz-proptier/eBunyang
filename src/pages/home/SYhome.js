import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import {
  SYhomeAi,
  SYhomePickVisit,
  SYhomeApartmentGraph,
  SYhomeWholeGraph,
} from "../home";
import CountUp from "react-countup";
import { SYnumberFormat } from "../../hooks/";
import { useHomeQuery } from "../../apis/bunyang/home";

function SYhome() {
  const navigate = useNavigate();
  const location = useLocation();
  const [SYdata, setSYdata] = useState();

  const { data, refetch } = useHomeQuery({
    onSuccess: (data) => {
      setSYdata(data.data.result);
      console.log("Success[useHomeQuery]", data);
    },
    onError: (error) => {
      console.log("Error[useHomeQuery]", error);
    },
  });

  // 윈도우 사이즈 측정
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth
  })

  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth
    })
  }

  let bannerSize = windowSize.width;


  useEffect(() => {
    refetch();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, []);

  //데이터가 로딩되지 않았을 때 리턴값
  if (!SYdata) return "";

  return (
    <div className="contentWrap aptWrap">
      <div className="sectionWrap home">
        {/* 상단 부분 */}
        <div className="commonLineBxWrap homeCol03">
          {/* 분양 AI */}
          <SYhomeAi SYdata={SYdata.expSrRateList} />
          <div className="commonLineBx homeBunyangMap">
            <a href="/bunyang/map">
              <div className="commonHomeHeader">
                <p>분양지도로 보기</p>
              </div>
              <div className="homeBunyangMapCount">
                <div className="btnRnd03">
                  <span>LIVE</span>
                </div>
                <p className="count">
                  {/* 카운팅 애니메이션 */}
                  <span>
                    <CountUp
                      end={SYdata.mapTotalCount}
                      separator=","
                      decimal=","
                      duration={1.5}
                    />
                  </span>{" "}
                  건
                </p>
              </div>
            </a>
          </div>

          <div className="commonLineBxInner">
            <div className="commonLineBx">
              {/* 3기 신도시 중 1지구 랜덤 */}
              <Link to={`/newCity/detail?biz_no=${SYdata.phase3Dtl.biz_no}`}>
                <div className="commonHomeHeader">
                  <p>3기 신도시</p>
                </div>
                <dl className="commonColorBx color01">
                  <dt>{SYdata.phase3Dtl.biz_nm}</dt>
                  <dd>{SYnumberFormat(SYdata.phase3Dtl.house_supp_cnt)}세대</dd>
                </dl>
              </Link>
            </div>
            <div className="commonLineBx today">
              <Link to={`/bunyang`}>
                <div className="commonHomeHeader">
                  <p>Today 청약</p>
                </div>
                <dl className="commonColorBx color02">
                  {/* 주말이거나 없을 경우 0건 노출 */}
                  <dt>{SYdata.todaySrDtl.schdl_date}</dt>
                  <dd>
                    <span>{SYnumberFormat(SYdata.todaySrDtl.total_cnt)}</span> 건
                  </dd>
                </dl>
              </Link>
            </div>
          </div>
        </div>

        {/* 배너 부분 */}
        <div className="homeBannerSlider">
          <a href={SYdata.advertise.link_url}>
            <p>{window.width}</p>
            <div className="homeBanner">
              {/* 이미지 랜덤으로 노출하기 */}
              <img src=
                {
                  bannerSize > 789
                    ?
                    SYdata.advertise.image_url
                    :
                    SYdata.advertise.mobile_image_url
                }
              />
            </div>
          </a>
        </div>


        {/* e분양 Pick 부분 */}
        <div className="commonLineBx">
          <div className="commonHomeHeader">
            <p>
              e분양 <span className="pointColor">Pick</span>
            </p>
          </div>

          <div className="homePickWrap">
            {/* 현장방문(리포트단지) */}
            <SYhomePickVisit SYdata={SYdata.reportDanjiList} />

            <div className="homePickBanner">
              <div className="homePickBannerSlider">
                {/* 분양단지(현장방문등록) 10개 중 랜덤으로 나오게끔 */}
                <a href={`/bunyang/detail?build_dtl_cd=${SYdata.reportVisitDtl.build_dtl_cd}&supp_cd=${SYdata.reportVisitDtl.supp_cd}`}>
                  <div
                    className="homePickBannerImage"
                    style={{
                      backgroundImage:
                        "url(" + SYdata.reportVisitDtl.image_url + ")",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  ></div>
                  <div className="homePickBannerInfo">
                    <div className="btnRnd02">
                      <span>{SYdata.reportVisitDtl.bclass_nm}</span>
                    </div>
                    <div className="infoBx">
                      <p className="title">{SYdata.reportVisitDtl.build_nm}</p>
                      <p className="location">{SYdata.reportVisitDtl.address}</p>
                    </div>
                  </div>
                </a>
              </div>
            </div>

            <div className="homePickList">
              {/* VR과 영상 단지 10개 중 랜덤으로 나오게끔 */}
              <div className="homePickListInner pickVideo">
                <Link
                  to={`/bunyang/detail?build_dtl_cd=${SYdata.vrDtl.build_dtl_cd}&supp_cd=${SYdata.vrDtl.supp_cd}`}
                >
                  <div
                    className={
                      SYdata.vrDtl.vr_yn == "Y"
                        ? SYdata.vrDtl.video_yn == "Y"
                          ? "homePickListImg vr video"
                          : "homePickListImg vr"
                        : SYdata.vrDtl.video_yn == "Y"
                          ? "homePickListImg video"
                          : "homePickListImg"
                    }
                    style={{
                      backgroundImage: "url(" + SYdata.vrDtl.image_url + ")",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    {/* vr일 경우 360도 아이콘 생성(class: vr) 동영상일 경우 재생 아이콘 생성(class: video) */}
                  </div>
                  <div className="homePickListInfo">
                    <div className="btnRnd02">
                      <span>{SYdata.vrDtl.bclass_nm}</span>
                    </div>
                    <p className="title">{SYdata.vrDtl.build_nm}</p>
                    <p className="location">{SYdata.vrDtl.address}</p>
                  </div>
                </Link>
              </div>

              {/* 입주탐방 단지 5개 중 랜덤으로 나오게끔 */}
              <div className="homePickListInner pickImage">
                <Link
                  to={`/moveIn/detail?move_in_cd=${SYdata.moveInDtl.move_in_cd}`}
                >
                  <div
                    className="homePickListImg"
                    style={{
                      backgroundImage:
                        "url(" + SYdata.moveInDtl.image_url + ")",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  ></div>
                  <div className="homePickListInfo">
                    <p className="title">{SYdata.moveInDtl.build_nm}</p>
                    <p className="info">{SYdata.moveInDtl.main_title1}</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* 분양임박단지 / 아파트 입주물량  부분*/}
        <div className="commonLineBxWrap homeCol02">
          <div className="commonLineBx">
            <div className="commonHomeHeader">
              <p>
                <span className="pointColor">분양임박</span> 단지
              </p>
              <a href="/bunyang?supp_proc_step=S01" className="btnMore">
                더보기
              </a>
            </div>
            <div className="homeApproachLIst">
              {/* 3개씩 노출 분양예정일이 빠른 순으로 */}
              {SYdata.sellPlanList.map((SYloopData, index) => (
                <div className="homeApproachListInner" key={index}>
                  <div className="infoBx">
                    <p className="title">{SYloopData.build_nm}</p>
                    <p className="location">{SYloopData.address}</p>
                  </div>
                  <div className="date">
                    <p>{SYloopData.recruit_date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="commonLineBx">
            <div className="commonHomeHeader">
              <p>
                <span className="pointColor">서울</span> 아파트 입주물량
              </p>
              <a href="/apt" className="btnMore">
                더보기
              </a>
            </div>
            <div className="homeApartmentGraph">
              <SYhomeApartmentGraph SYdata={SYdata} />
            </div>
          </div>
        </div>

        {/* 재건축 재개발 현황 부분*/}
        <div className="commonLineBx homeWholeGraphBx">
          <div className="commonHomeHeader">
            <p>
              <span className="pointColor">전국</span> 재건축 · 재개발 현황
            </p>
            <a href="/develop" className="btnMore">
              더보기
            </a>
          </div>
          <div className="homeWholeGraph">
            <SYhomeWholeGraph SYdata={SYdata} />
          </div>
        </div>

        {/* 분양 유상옵션 계산 Real Trend 부분*/}
        <div className="commonLineBxWrap homeCol02">
          <div className="commonLineBx">
            <div className="commonHomeHeader">
              <p>분양 유상옵션 계산</p>
              <a href="/bunyang?bthema=ISV" className="btnMore">
                더보기
              </a>
            </div>
            <div className="homeOptionList">
              {/* 5개씩 노출 */}
              {SYdata.aptOptionList.map((SYloopData, index) => (
                <div className="homeOptionListInner" key={index}>
                  <Link
                    to={`/bunyang/detail?build_dtl_cd=${SYloopData.build_dtl_cd}&supp_cd=${SYloopData.supp_cd}&detailType=donghoPlanInfo`}
                  >
                    <div className="btnRnd01">
                      <span>{SYloopData.sido}</span>
                    </div>
                    <div className="title">
                      <p>{SYloopData.build_nm}</p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <div className="commonLineBx">
            <div className="commonHomeHeader">
              <p>Real Trend</p>
              <a href="/tip" className="btnMore">
                더보기
              </a>
            </div>
            <div className="homeRealTrend">
              {/* 3개씩 노출 */}
              {SYdata.tipList.map((SYloopData, index) => (
                <div className="homeRealTrendInner" key={index}>
                  <a href={`/tip/detail?blog_cd=${SYloopData.blog_cd}`}>
                    <div
                      className="homeRealTrendImg"
                      style={{
                        backgroundImage: "url(" + SYloopData.image_url + ")",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    ></div>
                    <div className="homeRealTrendTitle">
                      <p>
                        [{SYloopData.category_nm}] {SYloopData.title}
                      </p>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SYhome;
