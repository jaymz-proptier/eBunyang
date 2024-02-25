import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import { SYproductItem } from ".";
import { SYlistPagination } from "../../components/pagination";
import { SYnumberFormat, SYreactGA4Title } from "../../hooks";
import { useRecoilState } from "recoil";
import { searchFilterState } from "../../recoils/siteReport";
import { usesiteReportListQuery } from "../../apis/bunyang/report";

function SYsiteReportList() {
  const [SYlistData, setSYlistData] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get("sort") ?? "hot";
  const page = searchParams.get("page");
  const bclass = searchParams.get("bclass") || "";
  const bthema = searchParams.get("bthema") || "";
  const min_price = searchParams.get("min_price") || "";
  const max_price = searchParams.get("max_price") || "";
  const bubdong_code = searchParams.get("bubdong_code") || "";
  const SYlistSorting = (code) => {
    searchParams.set("sort", code);
    searchParams.delete("page");
    setSearchParams(searchParams);
  };

  const listTop = useRef();
  const SYlistPage = (code) => {
    searchParams.set("page", code);
    setSearchParams(searchParams);
    window.scrollTo(0, 0);
  };

  const { data, refetch } = usesiteReportListQuery({
    params: {
      sort: sort,
      page: page,
      bclass: bclass,
      bthema: bthema,
      min_price: min_price,
      max_price: max_price,
      bubdong_code: bubdong_code,
    },
    onSuccess: (data) => {
      setSYlistData(data.data.result);
      SYreactGA4Title(document.title + " - 현장리포트");
      // setTotalCount(data.data.result.paging.totalCount);
      // console.log("Success[aptList] : ", data);
    },
    onError: (error) => {
      console.log("Error[usesiteReportListQuery]", error);
    },
  });

  useEffect(() => {
    refetch();
  }, [searchParams]);

  if (!SYlistData) return "";

  const SYreportSelectBox = () => {
    const selectedSort = ["new", "hot"].includes(sort) ? sort : "new";
    const selectBox = [
      { code: "hot", title: "e분양 추천순", selected: selectedSort === "hot" },
      {
        code: "new",
        title: "분양일정 최신순",
        selected: selectedSort === "new",
      },
    ];
    const [SYsortPressed, SYsetSortPressed] = useState(false);

    return (
      <div className="selectBox">
        <a
          href="{() => false}"
          className="selectInfo"
          aria-pressed={SYsortPressed}
          onClick={function (e) {
            e.preventDefault();
            SYsetSortPressed(!SYsortPressed);
          }}
        >
          {selectBox.filter((SYloopData) => SYloopData.selected === true).map((SYloopData) => `${SYloopData.title}`)}
        </a>
        <div className="selectList">
          {selectBox.map((SYloopData, SYindex) => (
            <a
              key={SYindex}
              href="{() => false}"
              aria-selected={sort === SYloopData.code ? true : false}
              onClick={function (e) {
                e.preventDefault();
                SYlistSorting(SYloopData.code);
              }}
            >
              {SYloopData.title}
            </a>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="bunyangListWrap">
      <div className="listHeader">
        <span className="listCounter">
          총 <label className="counter">{SYnumberFormat(SYlistData.paging?.totalCount)}</label>건
        </span>
        <SYreportSelectBox />
      </div>
      <div className="listContent">
        {SYlistData?.reportList.map((SYloopData, SYindex) => (
          <SYproductItem key={SYindex} SYdata={SYloopData} />
        ))}
      </div>
      {SYlistData.paging && <SYlistPagination SYpaging={SYlistData.paging} SYlistPage={SYlistPage} />}
    </div>
  );
}

export default SYsiteReportList;
