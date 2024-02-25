import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { SYmetatag } from "../../components/layout";
import { SYreactGA4Title } from "../../hooks";
import {
  SYtipBasicInfo,
  SYtipStep,
  SYtipRecommend,
  SYtipAdContent,
} from "../tip";
import { useTipDetailQuery } from "../../apis/bunyang/tip";

function SYtipDetail() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [SYdata, setSYdata] = useState();
  const blog_cd = searchParams.get("blog_cd");

  const { data, refetch } = useTipDetailQuery({
    params: {
      blog_cd: blog_cd,
    },
    onSuccess: (data) => {
      if (data.data.result.detail === null) navigate(`/tip`);
      document.querySelector("title").innerHTML = data.data.result.detail.title;
      SYreactGA4Title(data.data.result.detail.title + " - 부동산AtoZ");
      setSYdata(data.data.result);
    },
    onError: (error) => {
      console.log("Error[useTipDetailQuery]", error);
    },
  });

  useEffect(() => {
    refetch();
    window.scrollTo(0, 0);
  }, [blog_cd]);

  if (!SYdata) return "";

  return (
    <div className="contentWrap atoz detail">
      <div className="sectionWrap">
        {SYdata.detail && (
          <SYmetatag
            title={SYdata.detail.title + " - 부동산AtoZ"}
            meta_title={"[부동산AtoZ]" + SYdata.detail.title}
            image={SYdata.detail.image_url}
          />
        )}
        <div className="contentInfoWrap">
          {/* 상세정보 */}
          <div className="complexColumn atozDetailRight">
            {SYdata.detail ? <SYtipBasicInfo SYdata={SYdata.detail} /> : null}
          </div>

          <div className="complexColumn atozDetailLeft">
            {/* 단계별정보 */}
            <SYtipStep SYdata={SYdata.stepList} SYdetail={SYdata.detail} />
            {/* 연관 추천 콘텐츠 */}
            <SYtipRecommend SYdata={SYdata.aroundList} />
          </div>
        </div>

        <div className="contentInfoWrap widthAll">
          <SYtipAdContent SYdata={SYdata.advertise} />
          <div className="complexRow">
            <div className="rowContentArea">
              <div className="articleWrap">
                <div className="articleTitleWrap">
                  <div className="articleTitle">이런 이야기는 어때요?</div>
                </div>
                <div className="articleContentWrap">
                  <div className="anotherMenuWrap">
                    {SYdata.categoryList?.map((SYloopData, SYindex) => (
                      <Link
                        key={SYindex}
                        to={`/tip?category=${SYloopData.category_cd}`}
                        className="atozMenu"
                      >
                        {SYindex !== 0 ? "#" : ""}
                        {SYloopData.category_nm}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SYtipDetail;
