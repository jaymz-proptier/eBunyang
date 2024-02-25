import React, { useState, useEffect } from "react";
import { YJareaBizList, YJpreSubscList, YJcompetitionTable, YJfaqWrap, YJtop5List, YJaveragePoint, YJaverageTabSection, ChartPreSubsrRate, ChartCompetitionRate, ChartSupply } from "../newCity";
import { usePhase3ListMainQuery } from "../../apis/bunyang/newcity";

function NewCity() {
  const [SYdata, setSYdata] = useState();
  const { data, refetch } = usePhase3ListMainQuery({
    onSuccess: (data) => {
      setSYdata(data.data.result);
    },
    onError: (error) => {
      console.log("Error[usePhase3ListMainQuery]", error);
    },
  });

  useEffect(() => {
    refetch();
  }, []);

  if (!SYdata) return "";

  return (
    <div className="contentWrap">
      <div className="sectionWrap new">
        <div className="contentInfoWrap">
          {/* 사전청약 주요지구 */}
          <YJareaBizList SYdata={SYdata?.areaBizList} />
          <div className="complexColumn">
            <div className="complexContentArea flexBox">
              <div className="articleWrap">
                <div className="articleTitle">
                  <div className="title">3기신도시 공급현황</div>
                </div>
                <div className="articleContent">
                  <div className="chartContent">
                    {/* 3기신도시 공급현황 */}
                    <ChartSupply />
                  </div>
                </div>
              </div>
              <div className="articleWrap">
                <div className="articleTitle">
                  <div className="title">
                    사전청약 진행률<span className="date">(2022.08 기준)</span>
                  </div>
                </div>
                <div className="articleContent">
                  <div className="chartContent">
                    {/* 사전청약 진행률 */}
                    <ChartPreSubsrRate SYdata={SYdata?.preSubsrRate} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="complexColumn">
            <div className="complexContentArea preSubArea">
              <div className="articleWrap">
                <div className="articleTitle">
                  <div className="title">사전청약이란?</div>
                </div>
                <div className="articleContent">
                  <p className="text">주택착공에 맞춰 진행되던 분양시기를 앞당겨 공급함으로써 청약을 기다리는 무주택 실수요자들에게 양질의 주택을 제공합니다.</p>
                  <p className="text">3기 신도시 등 수도권 공공택지 내 공공분양물량 등 사전 청약 물량은 총 6만호 입니다.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="complexColumn">
            <div className="complexContentArea">
              <div className="articleWrap">
                <div className="articleTitle">
                  <div className="title">2022년 사전청약 물량</div>
                </div>

                {/* 2022년 사전청약 물량 */}
                <YJpreSubscList SYdata={SYdata?.preSubscList} />

                <div className="articleTitle">
                  <div className="title">사전청약 당첨분석</div>
                </div>

                <div className="articleContent">
                  <div className="listTitleBox">
                    <span className="listTitle">2021년 청약경쟁률</span>
                  </div>
                  <div className="flexBox competitionContentWrap">
                    <div className="chartContent competitionContent">
                      {/* 2021년 청약경쟁률(차트_bar) */}
                      <ChartCompetitionRate SYdata={SYdata?.preSubscriptionRate} />
                    </div>
                    {/* 2021년 청약경쟁률(차트_table) */}
                    <YJcompetitionTable SYdata={SYdata?.preSubscriptionRate} />
                  </div>
                </div>
                {/* 사전청약 최고 평균 경쟁률 TOP5 단지 */}
                <YJtop5List SYdata={SYdata?.competitionRateList} />

                <div className="articleContent">
                  <div className="listTitleBox">
                    <span className="listTitle">사전청약 당첨선</span>
                  </div>
                  {/* 평균 당첨선 */}
                  <YJaverageTabSection SYdata={SYdata?.preSubscWinLineList} />
                </div>
              </div>
            </div>
          </div>

          <YJfaqWrap />

          <div className="linkArea">
            <ul className="linkList">
              <li className="linkItem">
                <a href="https://www.xn--3-3u6ey6lv7rsa.kr/kor/Main.do" target="_blank" rel="noopener noreferrer">
                  3기 신도시<i className="Icon_shortcut"></i>
                </a>
              </li>
              <li className="linkItem">
                <a href="http://xn--vf4b41gp9bm8g.kr/main.do" target="_blank" rel="noopener noreferrer">
                  사전 청약<i className="Icon_shortcut"></i>
                </a>
              </li>
              <li className="linkItem">
                <a href="http://xn--vf4b41gp9bm8g.kr/subscriptionIntro/info.do" target="_blank" rel="noopener noreferrer">
                  사전 청약 자격 확인<i className="Icon_shortcut"></i>
                </a>
              </li>
              <li className="linkItem">
                <a href="https://www.xn--vf4b41gp9bm8g.kr/subscriptionIntro/faq.do" target="_blank" rel="noopener noreferrer">
                  사전 청약 FAQ<i className="Icon_shortcut"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewCity;
