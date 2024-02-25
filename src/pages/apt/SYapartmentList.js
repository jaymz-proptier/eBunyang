import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { SYapartmentItem } from "./";
import { SYlistPagination } from "../../components/pagination";
import { SYnumberFormat, SYreactGA4Title } from "../../hooks";
import { useAptListQuery } from "../../apis/bunyang/apt";

function SYapartmentList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [SYlistData, setSYlistData] = useState([]);
  const [SYsortPressed, SYsetSortPressed] = useState(false);
  const listSection = useRef("");
  const sort = searchParams.get("sort") || "mvi_date";
  const page = searchParams.get("page") || "";
  const bubdong_code = searchParams.get("bubdong_code") || "";

  const SYlistPage = (code) => {
    searchParams.set("page", code);
    setSearchParams(searchParams);
    window.scrollTo({
      top: listSection.current.offsetTop,
      behavior: "instant",
    });
  };

  const SYlistSorting = (code) => {
    searchParams.set("sort", code);
    searchParams.delete("page");
    setSearchParams(searchParams);
    SYreactGA4Title();
  };

  const { data, refetch } = useAptListQuery({
    params: {
      bubdong_code: bubdong_code,
      sort: sort,
      page: page,
    },
    onSuccess: (data) => {
      setSYlistData(data.data.result);
    },
    onError: (error) => {
      console.log("Error[useAptListQuery]", error);
    },
  });

  useEffect(() => {
    refetch();
    window.scrollTo(0, 0);
    console.log(SYlistData);
  }, [page]);

  useEffect(() => {
    refetch();
    // console.log("refresh");
  }, [bubdong_code, sort]);

  //정렬
  const SYaptSelectBox = () => {
    const selectedSort = ["mvi_date", "house_cnt", "build_nm"].includes(sort) ? sort : "mvi_date";
    const selectBox = [
      {
        code: "mvi_date",
        title: "입주시기 빠른순",
        selected: selectedSort === "mvi_date",
      },
      {
        code: "house_cnt",
        title: "세대수 많은순",
        selected: selectedSort === "house_cnt",
      },
      {
        code: "build_nm",
        title: "가나다순",
        selected: selectedSort === "build_nm",
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
                  bubdong_code: bubdong_code,
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
    <div className="complexContentArea" ref={listSection}>
      <div className="articleTitle">입주예정 아파트</div>
      <SYaptSelectBox />
      <div className="articleContent">
        <div className="totalCountArea">
          총 세대 수{" "}
          <span className="num">{SYnumberFormat(SYlistData.houseTotalCount)} 세대</span>
        </div>
        <div className="totalCountListWrap">
          <div className="totalCountList">
            <div className="tableHead">
              <div className="tableRow">
                <span className="tableData">입주시기</span>
                <span className="tableData">단지 명</span>
                <span className="tableData">주소</span>
                <span className="tableData">총 세대 수</span>
              </div>
            </div>
            <div className="tableContent">
              {SYlistData.houseList?.map((SYloopData, SYindex) => (
                <SYapartmentItem key={SYindex} SYdata={SYloopData} />
              ))}
            </div>
          </div>
          {SYlistData?.paging && (
            <SYlistPagination
              SYpaging={SYlistData.paging}
              SYlistPage={SYlistPage}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default SYapartmentList;
