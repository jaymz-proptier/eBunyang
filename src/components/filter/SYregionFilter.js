import React, { useState, useEffect } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import { useAddressListQuery } from "../../apis/bunyang/bunyang";

import { useRecoilState } from "recoil";
import { bunyangFilterState } from "../../recoils/bunyang";
import { siteReportFilterState } from "../../recoils/siteReport";
import { moveInFilterState } from "../../recoils/moveIn";
import { developFilterState } from "../../recoils/develop";
import { aptFilterState } from "../../recoils/apt";

function SYregionFilter({
  SYareaCode,
  SYfilterMenu,
  SYsetFilterMenu,
  SYsetFilterPressed,
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [SYregionCode, SYsetRegionCode] = useState(SYareaCode);
  const [SYlistData, setSYlistData] = useState(null);
  const [SYswiper, SYsetSwiper] = useState(null);
  const location = useLocation();

  let areaCode;
  let SYsetAreaCode;
  if (location.pathname === "/bunyang") {
    [areaCode, SYsetAreaCode] = useRecoilState(bunyangFilterState);
  } else if (location.pathname === "/siteReport") {
    [areaCode, SYsetAreaCode] = useRecoilState(siteReportFilterState);
  } else if (location.pathname === "/moveIn") {
    [areaCode, SYsetAreaCode] = useRecoilState(moveInFilterState);
  } else if (location.pathname === "/develop") {
    [areaCode, SYsetAreaCode] = useRecoilState(developFilterState);
  } else if (location.pathname === "/apt") {
    [areaCode, SYsetAreaCode] = useRecoilState(aptFilterState);
  } else {
    [areaCode, SYsetAreaCode] = "";
  }

  const SYreginCodeChange = (SYdata) => {
    SYsetAreaCode({
      ...areaCode,
      bubdong: {
        text: SYdata.sido + " " + SYdata.gugun,
        value: SYdata.bubdong_code,
        sido: SYdata.sido === "전국" ? "" : SYdata.sido,
        gugun: SYdata.gugun,
        lat: SYdata.ypos,
        lng: SYdata.xpos,
        zoom: 18,
      },
    });

    if (SYdata.bubdong_code) {
      searchParams.set("bubdong_code", SYdata.bubdong_code);
    } else {
      searchParams.delete("bubdong_code");
    }
    SYsetRegionCode(SYdata.bubdong_code);
    searchParams.delete("page");
    setSearchParams(searchParams);
    SYsetFilterPressed(null);
  };

  const { data, refetch: useAddressListRefetch } = useAddressListQuery({
    params: {},
    onSuccess: (data) => {
      setSYlistData(data.data.result);
    },
    onError: (error) => {
      console.log("Error[useAddressListQuery]", error);
    },
  });

  useEffect(() => {
    useAddressListRefetch();
  }, []);

  useEffect(() => {
    if(SYswiper && SYlistData){
        const index = SYlistData.areaList.findIndex(item => item.bubdong_code.substr(0, 2)===SYregionCode.substr(0, 2));
        SYswiper.slideTo((index ? index : 0), 0, false);
    }
}, [SYswiper, SYlistData]);

  const SYregionListWrap = () => {
    const [SYdata, setSYdata] = useState([]);
    const sidoCode = SYregionCode.substr(0, 2);
    const { data, refetch: useAddressListQueryRefetch } = useAddressListQuery({
      params: { bubdong_code: sidoCode },
      onSuccess: (data) => {
        setSYdata(data.data.result.areaList);
      },
      onError: (error) => {
        console.log("Error[useAddressListQuery]", error);
      },
    });

    const SYregionRendering = () => {
      const SYrenderResult = [];
      for (let i = 0; i < Math.ceil(SYdata.length / 9); i++) {
        const SYcontents = [];
        const SYcount =
          SYdata.length > 8
            ? i * 9 + 9
            : SYdata.length +
              (SYdata.length % 3 > 0 ? (SYdata.length % 3) - 1 : 0);
        for (let j = i * 9; j < SYcount; j++) {
          SYcontents.push(
            <div
              key={j}
              className="region"
              aria-label={j < SYdata.length ? "gugun" : "NoData"}
              onClick={() => SYreginCodeChange(SYdata[j])}
            >
              <span className="text">
                {j < SYdata.length ? SYdata[j].gugun : ""}
              </span>
            </div>
          );
        }
        SYrenderResult.push(
          <SwiperSlide key={i}>
            <div className="regionList">{SYcontents}</div>
          </SwiperSlide>
        );
      }
      return SYrenderResult;
    };

    useEffect(() => {
      useAddressListQueryRefetch();
    }, [SYregionCode]);

    if (SYdata) {
      return (
        <Swiper
          slidesPerView={"auto"}
          pagination={{ clickable: true }}
          modules={[Pagination]}
          className="regionListWrap"
        >
          {SYregionRendering()}
        </Swiper>
      );
    }
  };

  return (
    <>
      <div className="SYfilterLayerComponent">
        <div className="regionFilterwrap">
          <Swiper
           onSwiper={SYsetSwiper}
            spaceBetween={6}
            slidesPerView={"auto"}
            className="regionNavigation"
          >
            <SwiperSlide
              className="region"
              aria-selected={SYareaCode ? false : true}
              aria-pressed={SYregionCode ? false : true}
              onClick={() =>
                SYreginCodeChange({
                  sido: "전국",
                  gugun: "",
                  bubdong_code: "",
                })
              }
            >
              <span className="text">전국</span>
            </SwiperSlide>
            {SYlistData?.areaList.map((SYloopData, SYindex) => (
              <SwiperSlide
                key={SYindex}
                className="region"
                aria-selected={
                  SYareaCode.substr(0, 2) ===
                  SYloopData.bubdong_code.substr(0, 2)
                    ? true
                    : false
                }
                aria-pressed={
                  SYregionCode &&
                  SYregionCode.substr(0, 2) ===
                    SYloopData.bubdong_code.substr(0, 2)
                    ? true
                    : false
                }
                onClick={() => SYsetRegionCode(SYloopData.bubdong_code)}
              >
                <span className="text">{SYloopData.sido}</span>
              </SwiperSlide>
            ))}
          </Swiper>
          {SYregionCode ? <SYregionListWrap /> : null}
        </div>
      </div>
    </>
  );
}

export default SYregionFilter;
