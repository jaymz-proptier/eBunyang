import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import { SYproductItem } from ".";
import { SYlistPagination } from "../../components/pagination";
import { SYnumberFormat, SYreactGA4Title } from "../../hooks";
import { usemoveInListQuery } from "../../apis/bunyang/moveIn";

function SYmoveInList() {
  const [SYlistData, setSYlistData] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get("sort") ?? "new";
  const page = searchParams.get("page");
  const bclass = searchParams.get("bclass") || "";
  const mvi_ymd = searchParams.get("mvi_ymd") || "";
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
    listTop.current.scrollIntoView({ behavior: "instant" });
  };

  const { data, refetch } = usemoveInListQuery({
    params: {
      sort: sort,
      page: page,
      bclass: bclass,
      mvi_ymd: mvi_ymd,
      bubdong_code: bubdong_code,
    },
    onSuccess: (data) => {
      setSYlistData(data.data.result);
      SYreactGA4Title(document.title + " - 입주탐방");
      // setTotalCount(data.data.result.paging.totalCount);
      // console.log("Success[aptList] : ", data);
    },
    onError: (error) => {
      console.log("Error[aptList]", error);
    },
  });

  useEffect(() => {
    refetch();
    console.log("sort", sort);
  }, [bclass, mvi_ymd, sort]);

  if (!SYlistData) return "";

  const SYmoveInSelectBox = () => {
    const SYselectBox = [
      { code: "new", title: "최근등록순", selected: sort.includes("new") },
      { code: "moving_date", title: "입주일정 최신순", selected: sort.includes("moving_date") },
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
          {SYselectBox.filter((SYloopData) => SYloopData.selected === true).map(
            (SYloopData) => `${SYloopData.title}`
          )}
        </a>
        <div className="selectList">
          {SYselectBox.map((SYloopData, SYindex) => (
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
    <div className="bunyangListWrap" ref={listTop}>
      <div className="listHeader">
        <span className="listCounter">
          총{" "}
          <label className="counter">
            {SYnumberFormat(SYlistData.paging?.totalCount)}
          </label>
          건
        </span>
        <SYmoveInSelectBox />
      </div>
      <div className="listContent">
        {SYlistData.moveInList?.map((SYloopData, SYindex) => (
          <SYproductItem key={SYindex} SYdata={SYloopData} />
        ))}
      </div>
      {SYlistData.paging && (
        <SYlistPagination
          SYpaging={SYlistData.paging}
          SYlistPage={SYlistPage}
        />
      )}
    </div>
  );
}

export default SYmoveInList;
