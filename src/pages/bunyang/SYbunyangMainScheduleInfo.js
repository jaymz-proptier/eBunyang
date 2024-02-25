import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSchdlListQuery, useSchdlDateQuery } from "../../apis/bunyang/bunyang";
import { useRecoilState } from "recoil";
import { bunyangSchduleDateAtom } from "../../recoils/bunyang";

const SYbunyangMainScheduleInfo = React.memo(() => {
  const SYtoday = new Date();
  const [SYcalendarDay, SYsetCalrendarDay] = useRecoilState(bunyangSchduleDateAtom);

  const SYschduleListWrap = () => {
    // const SYschduleListWrap = React.memo(({ calendarDay }) => {

    const [SYtabMenu, SYsetTabMenu] = useState(0);
    const [SYdata, setSYdata] = useState([]);

    const { data, isLoading, refetch } = useSchdlListQuery({
      params: {
        start_ymd: SYcalendarDay,
      },
      onSuccess: (data) => {
        setSYdata(data.data.result.schdlList);
      },
      onError: (error) => {
        console.log("Error[useSchdlListQuery]", error);
      },
    });

    useEffect(() => {
      refetch();
    }, [SYcalendarDay]);

    if (isLoading) return "";

    return (
      <div className="schduleListWrap">
        <ul className="categoryList">
          {SYdata?.map((SYloopData, SYindex) => (
            <li
              key={SYindex}
              aria-selected={SYindex === SYtabMenu ? true : false}
              onClick={() => SYsetTabMenu(SYindex)}
            >
              {SYloopData.categoryName}
            </li>
          ))}
        </ul>
        <div className="scheduleList">
          {SYdata?.map((SYloopData, SYindex) => (
            <ul
              key={SYindex}
              className="listWrap"
              aria-hidden={SYindex === SYtabMenu ? false : true}
            >
              {SYloopData.dataList.length === 0 ? (
                <li className="noData">
                  <i className="SYicon"></i>청약 단지가 없습니다.
                </li>
              ) : null}
              {SYloopData.dataList?.map((SYsubData, SYsubIndex) => (
                <li key={SYsubIndex}>
                  <Link
                    to={`/bunyang/detail?build_dtl_cd=${SYsubData.build_dtl_cd}&supp_cd=${SYsubData.supp_cd}`}
                  >
                    <span className="region">{SYsubData.address}</span>
                    {SYsubData.build_nm}
                  </Link>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    );
  };

  //청약일정달력
  const SYbunyangSchduleCalendar = ({SYdate}) => {
    const SYdayName = [
      { code: "sun", kor: "일" },
      { code: "day", kor: "월" },
      { code: "day", kor: "화" },
      { code: "day", kor: "수" },
      { code: "day", kor: "목" },
      { code: "day", kor: "금" },
      { code: "sat", kor: "토" },
    ];
    const [SYviewDate, SYsetViewDate] = useState(SYdate);
    const [SYdata, SYsetData] = useState([]);
    const { data, isLoading, refetch } = useSchdlDateQuery({
      params: {
        base_date: SYviewDate.substring(0, 6),
      },
      onSuccess: (data) => {
        SYsetData(data.data.result.calendarList);
      },
      onError: (error) => {
        console.log("Error[useSchdlDateQuery]", error);
      },
    });

    useEffect(() => {
      refetch();
    }, [SYviewDate.substring(0, 6)]);
    const prevMonth = () => {
      if ((SYviewDate.substring(4, 6)) === "01") {
        SYsetViewDate(
          (SYviewDate.substring(0, 4) - 1) + "1201"
        )
      } else {
        SYsetViewDate(
          SYviewDate.substring(0, 4) +("0" + (SYviewDate.substring(4, 6) - 1)).slice(-2) + "01"
        )
      }
    }

    const nextMonth = () => {
      if ((SYviewDate.substring(4, 6)) === "12") {
        SYsetViewDate(
          (Number(SYviewDate.substring(0, 4)) + 1) +"0101"
        )
      } else {
        SYsetViewDate(
          SYviewDate.substring(0, 4) + ("0" + (Number(SYviewDate.substring(4, 6)) + 1)).slice(-2) +"01"
        )
      }
    }
    return (
      <div className="SYcalendarWrap">
          <div className="calendarInner">
            <div className="calendarHeader">
              <button type="button" className="year">
                {SYviewDate.substring(0, 4)} <i className="SYicon"></i>
              </button>
              <div className="monthControl">
                <button type="button" className="prev" onClick={prevMonth}>
                  <i className="SYicon"></i>
                </button>
                <h3 className="month">{SYviewDate.substring(4, 6)}</h3>
                <button type="button" className="next" onClick={nextMonth}>
                  <i className="SYicon"></i>
                </button>
              </div>
            </div>
            <div className="calendarList">
              <div className="dayNameList">
                {SYdayName?.map((SYloopData, SYindex) => (
                  <span key={SYindex} className={SYloopData.code}>
                    {SYloopData.kor}
                  </span>
                ))}
              </div>
              
              <ul>
                {SYdata?.map((SYloopData, SYindex) => (
                  <li
                    key={SYindex}
                    className={SYloopData.state}
                    aria-selected={SYviewDate === SYloopData.date ? true : false}
                  >
                    <a
                      href="{()=>false}"
                      onClick={function (e) {
                        e.preventDefault();
                        SYsetCalrendarDay(SYloopData.date);
                      }}
                    >
                      {SYloopData.day}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
    );
  };

  //청약일정달력(요일)
  const SYbunyangSchduleHeader = () => {
    const [SYcalendarPressed, SYsetCalendarPressed] = useState(false);
    
    const SYoutSideClick = (e) => {
      if(!e.target.closest(".SYcalendarWrap")) {
        SYsetCalendarPressed(false);
      }
    }
    
    useEffect(() => {
        document.addEventListener("mousedown", SYoutSideClick);
    }, []);
    const SYtodayView = () => {
      SYsetCalrendarDay(SYtoday.getFullYear() + ("0" + (SYtoday.getMonth() + 1)).slice(-2) + ("0" + SYtoday.getDate()).slice(-2));
    }
    return (
      <div className="schduleHeader">
        <h3 className="title">청약일정</h3> 
        <button type="button" className="today" onClick={SYtodayView}>오늘</button>

        <button
          type="button"
          className="calendarSelect"
          aria-pressed={SYcalendarPressed}
          onClick={() => SYsetCalendarPressed(!SYcalendarPressed)}
        >
          <span className="date">{`${SYcalendarDay.substring(
            0,
            4
          )}.${SYcalendarDay.substring(4, 6)}.${SYcalendarDay.substring(
            6
          )}`}</span>
          <i className="SYicon"></i>
        </button>
        { SYcalendarPressed ? ( <SYbunyangSchduleCalendar SYdate={SYcalendarDay} /> ) : null }
      </div>
    );
  };

  return (
    <div className="SYbunyangScheduleInfowrap">
      <div className="scheduleContentsWrap">
        <div className="schduleHeaderWrap">
          <SYbunyangSchduleHeader />
        </div>
        <div>
          
        <SYschduleListWrap />
        </div>
      </div>
    </div>
  );
});

export default SYbunyangMainScheduleInfo;
