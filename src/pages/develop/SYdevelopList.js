import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { SYproductItem } from ".";
import { SYnumberFormat, SYreactGA4Title } from "../../hooks";
import { SYlistPagination } from "../../components/pagination";
import { useDevelopListQuery } from "../../apis/bunyang/develop";

function SYdevelopList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [SYlistData, setSYlistData] = useState([]);
  const [SYsortPressed, SYsetSortPressed] = useState(false);
  const listSection = useRef("");
  const sort = searchParams.get("sort") || "new";
  const page = searchParams.get("page") || "";
  const bubdong_code = searchParams.get("bubdong_code") || "";
  const biz_type_cd = searchParams.get("biz_type_cd") || "";
  const biz_step_cd = searchParams.get("biz_step_cd") || "";

  const SYlistPage = (code) => {
    searchParams.set("page", code);
    setSearchParams(searchParams);
    window.scrollTo({
      top: listSection.current.offsetTop,
      behavior: "instant",
    });
  };

  const { data, refetch } = useDevelopListQuery({
    params: {
      bubdong_code: bubdong_code,
      biz_type_cd: biz_type_cd,
      biz_step_cd: biz_step_cd,
      sort: sort,
      page: page,
    },
    onSuccess: (data) => {
      setSYlistData(data.data.result);
    },
    onError: (error) => {
      console.log("Error[useDevelopListQuery]", error);
    },
  });

  useEffect(() => {
    refetch();
    window.scrollTo(0, 0);
  }, [searchParams]);

  //정렬
  const SYselectBox = () => {
    const selectedSort = ["new", "max_house"].includes(sort) ? sort : "new";
    const selectBox = [
      {
        code: "new",
        title: "최근등록순",
        selected: selectedSort === "new",
      },
      {
        code: "max_house",
        title: "세대수 많은순",
        selected: selectedSort === "max_house",
      },
    ];

    return (
      <div className="selectBox">
        <a
          href="#"
          className="selectInfo"
          aria-pressed={SYsortPressed}
          onClick={(e) => {
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
              onClick={(e) => {
                e.preventDefault();
                SYsetSortPressed(false);
                setSearchParams({
                  sort: loopData.code,
                });
              }}
            >
              {loopData.title}
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
          총
          <label className="counter">
            {SYnumberFormat(SYlistData.paging?.totalCount)}
          </label>
          건
        </span>
        <SYselectBox />
      </div>
      <div className="listContent">
        {SYlistData.developmentList?.map((loopData, index) => (
          <SYproductItem key={index} SYdata={loopData} />
        ))}
      </div>
      {SYlistData?.paging && (
        <SYlistPagination
          SYpaging={SYlistData.paging}
          SYlistPage={SYlistPage}
        />
      )}
    </div>
  );
}

export default SYdevelopList;
