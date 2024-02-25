import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useTipCategoryQuery } from "../../apis/bunyang/tip";

function SYtipMenu() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [SYlistData, setSYlistData] = useState([]);
  const category = searchParams.get("category") || "";

  const { data, refetch } = useTipCategoryQuery({
    onSuccess: (data) => {
      setSYlistData(data.data.result);
    },
    onError: (error) => {
      console.log("Error[useTipCategoryQuery]", error);
    },
  });

  const SYlistCategory = (code) => {
    searchParams.delete("code");
    searchParams.delete("step");
    searchParams.delete("page");
    searchParams.delete("sort");
    code ? searchParams.set("category", code) : searchParams.delete("category");
    setSearchParams(searchParams);
  };

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <div className="articleContentWrap">
      <div className="anotherMenuWrap">
        {SYlistData.categoryList?.map((loopData, index) => (
          <Link
            key={index}
            to="#"
            className="atozMenu"
            aria-selected={category === loopData.category_cd ? true : false}
            onClick={(e) => {
              e.preventDefault();
              SYlistCategory(loopData.category_cd);
            }}
          >
            #{loopData.category_nm}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SYtipMenu;
