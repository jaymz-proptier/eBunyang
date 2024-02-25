import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { SYproductItem } from "./";
import { SYnumberFormat, SYreactGA4Title } from "../../hooks/";
import { SYlistPagination } from "../../components/pagination";
import { useBunyangListQuery } from "../../apis/bunyang/bunyang";
import { useRecoilValue } from "recoil";
import { bunyangFilterState } from "../../recoils/bunyang";

function SYbunyangList() {
  const [SYlistData, setSYlistData] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get("sort") || "new";
  const page = searchParams.get("page");
  const bclass = searchParams.get("bclass") || "";
  const supp_proc_step = searchParams.get("supp_proc_step") || "";
  const supp_sclass = searchParams.get("supp_sclass") || "";
  const bthema = searchParams.get("bthema") || "";
  const schdl_cd = searchParams.get("schdl_cd") || "";
  const min_price = searchParams.get("min_price") || "";
  const max_price = searchParams.get("max_price") || "";
  const min_scale = searchParams.get("min_scale") || "";
  const max_scale = searchParams.get("max_scale") || "";
  const min_house_cnt = searchParams.get("min_house_cnt") || "";
  const max_house_cnt = searchParams.get("max_house_cnt") || "";
  const bubdong_code = searchParams.get("bubdong_code") || "";
  const [SYsortPressed, SYsetSortPressed] = useState(false);
  const SYmapLink = useRecoilValue(bunyangFilterState);

  const SYlistSorting = (code) => {
    searchParams.set("sort", code);
    searchParams.delete("page");
    setSearchParams(searchParams);
  };

  const SYlistPage = (code) => {
    searchParams.set("page", parseInt(code));
    setSearchParams(searchParams);
    window.scrollTo(0, 0);
  };

  const { data, refetch } = useBunyangListQuery({
    params: {
      sort: sort,
      page: page,
      bclass: bclass,
      supp_proc_step: supp_proc_step,
      supp_sclass: supp_sclass,
      schdl_cd: schdl_cd,
      bthema: bthema,
      min_price: min_price,
      max_price: max_price,
      min_scale: min_scale,
      max_scale: max_scale,
      min_house_cnt: min_house_cnt,
      max_house_cnt: max_house_cnt,
      bubdong_code: bubdong_code,
    },
    onSuccess: (data) => {
      setSYlistData(data.data.result);
      SYreactGA4Title(document.title +" - 분양정보");
    },
    onError: (error) => {
      console.log("Error[useBunyangListQuery]", error);
    },
  });

  useEffect(() => {
    refetch();
  }, [searchParams]);

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     refetch();
  //   }, 500);
  //   return () => clearInterval(intervalId);
  // }, [
  //   bclass,
  //   supp_proc_step,
  //   supp_sclass,
  //   schdl_cd,
  //   bthema,
  //   min_price,
  //   max_price,
  //   min_scale,
  //   max_scale,
  //   min_house_cnt,
  //   max_house_cnt,
  // ]);

  //정렬
  const SYbunyangSelectBox = () => {
    const selectedSort = [
      "new",
      "supp_proc_step",
      "price_high",
      "price_low",
    ].includes(sort)
      ? sort
      : "new";
    const selectBox = [
      {
        code: "new",
        title: "분양일정 최신순",
        selected: selectedSort === "new",
      },
      {
        code: "supp_proc_step",
        title: " 미분양 및 분양중 우선",
        selected: selectedSort === "supp_proc_step",
      },
      {
        code: "price_high",
        title: "분양가 높은 순",
        selected: selectedSort === "price_high",
      },
      {
        code: "price_low",
        title: "분양가 낮은 순",
        selected: selectedSort === "price_low",
      },
    ];

    return (
      <div className="selectBox">
        <a
          href="#"
          className="selectInfo"
          aria-pressed={SYsortPressed}
          onClick={function (e) {
            e.preventDefault();
            SYsetSortPressed(!SYsortPressed);
          }}
        >
          {selectBox
            .filter((loopData) => loopData.selected === true)
            .map((loopData) => `${loopData.title}`)}
        </a>
        <div className="selectList">
          {selectBox.map((loopData, index) => (
            <a
              key={index}
              href="#"
              aria-selected={sort === loopData.code ? true : false}
              onClick={function (e) {
                e.preventDefault();
                SYlistSorting(loopData.code);
                SYsetSortPressed(false);
              }}
            >
              {loopData.title}
            </a>
          ))}
        </div>
      </div>
    );
  };
  const SYmapViewLink = () => {
    window.location.href = `/bunyang/map?${SYmapLink.bubdong.lat && SYmapLink.bubdong.lng ?`SYmap=${SYmapLink.bubdong.lat}:${SYmapLink.bubdong.lng}:14` : ``}${searchParams.toString()? SYmapLink.bubdong.lat && SYmapLink.bubdong.lng ? "&"+searchParams.toString(): searchParams.toString():""}`;
  }

  return (
    <div className="bunyangListWrap">
      <div className="listHeader">
        <span className="listCounter">
          총{" "}
          <label className="counter">
            {SYnumberFormat(SYlistData.paging?.totalCount)}
          </label>
          건
        </span>
        <SYbunyangSelectBox />
      </div>
      <div className="listContent">
        {SYlistData.bunyangList?.map((loopData) => (
          <SYproductItem
            key={loopData.build_dtl_cd + "_" + loopData.supp_cd}
            SYdata={loopData}
          />
        ))}
      </div>
      {SYlistData.paging && (
        <SYlistPagination
          SYpaging={SYlistData.paging}
          SYlistPage={SYlistPage}
        />
      )}
      <button type="button" className="mapViewButton"onClick={() => SYmapViewLink()}><i className="SYicon"></i>지도</button>
    </div>
    
  );
}

export default SYbunyangList;
