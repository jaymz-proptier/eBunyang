import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { SYtipProduct } from "../tip";
import { SYlistPagination } from "../../components/pagination";
import { useTipListQuery } from "../../apis/bunyang/tip";

function SYtipList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [SYlistData, setSYlistData] = useState([]);
  const [SYsortPressed, SYsetSortPressed] = useState(false);
  const listSection = useRef("");

  const category = searchParams.get("category") || "";
  const step = searchParams.get("step") || "";
  const sort = searchParams.get("sort") || "new";
  const page = searchParams.get("page") || "";

  const SYlistPage = (code) => {
    searchParams.set("page", code);
    setSearchParams(searchParams);
    window.scrollTo({
      top: listSection.current.offsetTop,
      behavior: "instant",
    });
  };

  const { data, refetch } = useTipListQuery({
    params: {
      category: category,
      step_cd: step,
      sort: sort,
      page: page,
    },
    onSuccess: (data) => {
      setSYlistData(data.data.result);
    },
    onError: (error) => {
      console.log("Error[useTipListQuery]", error);
    },
  });

  useEffect(() => {
    refetch();
    window.scrollTo(0, 0);
  }, [page]);

  useEffect(() => {
    refetch();
  }, [category, sort, step]);

  //정렬
  const SYtipSelectBox = () => {
    const selectedSort = ["new", "name", "view"].includes(sort) ? sort : "new";
    const selectBox = [
      {
        code: "new",
        title: "최근등록순",
        selected: selectedSort === "new",
      },
      {
        code: "name",
        title: "가나다순",
        selected: selectedSort === "name",
      },
      {
        code: "view",
        title: "인기순",
        selected: selectedSort === "view",
      },
    ];

    return (
      <div className="selectBox">
        <a
          href="#"
          className="selectItem selectInfo"
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
                  category: category,
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
    <div className="complexContentArea">
      <div className="listSection">
        <div className="listHeader">
          <div className="listCount">
            총 <span className="count">{SYlistData.paging?.totalCount}</span>건
          </div>
          <SYtipSelectBox />
        </div>
        <div className="listContentWrap" ref={listSection}>
          <ul className="listItem">
            {SYlistData.tipList?.map((SYloopData, SYindex) => (
              <SYtipProduct SYdata={SYloopData} key={SYindex} />
            ))}
          </ul>
        </div>
        {SYlistData?.paging && (
          <SYlistPagination
            SYpaging={SYlistData.paging}
            SYlistPage={SYlistPage}
          />
        )}
      </div>
    </div>
  );
}

export default SYtipList;
