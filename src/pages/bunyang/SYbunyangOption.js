import React, {
  useEffect,
  useState,
  Fragment,
  useRef,
  useCallback,
} from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import queryString from "query-string";
import {
  SYnumberFormat,
  SYkoreanPriceDetail,
  SYreactGA4Title,
} from "../../hooks/";
import { useBunyangOption } from "../../apis/bunyang/bunyang";
import { SYbunynagOptionResult } from "../../pages/bunyang";

const SYbunyangOption = React.memo(({ SYhoData, setpopupOpen }) => {
  if (!SYhoData) return "";
  SYreactGA4Title(document.title + ` - 동호정보(${SYhoData.dong_nm}동[${SYhoData.ho_nm}]호)옵션계산기`);

  const [SYdata, setSYdata] = useState();

  // 결과값으로 이동
  const [isOpenResult, setIsOpenResult] = useState(false);
  const handleOpenResult = () => {
    setIsOpenResult(true);
    SYreactGA4Title(document.title + ` - 동호정보(${SYhoData.dong_nm}동[${SYhoData.ho_nm}]호)옵션계산기`);
  };

  // 열렸다 닫혔다 체크
  const [isOpen, setIsOpen] = useState([]);
  const [isSecondOpen, setIsSecondOpen] = useState([]);

  // 1단계 오픈여부 체크
  const onOpen = (SYindex) => {
    if (isOpen.includes(SYindex)) {
      setIsOpen(isOpen.filter((el) => el !== SYindex));
    } else {
      setIsOpen([...isOpen, SYindex]);
    }
  };

  // 2단계 오픈여부 체크
  const onSecondOpen = (SYsubIndex, second_level) => {
    // console.log(SYindex);
    const checkArr = {
      index: SYsubIndex,
      level: second_level,
    };
    if (
      isSecondOpen.some(
        (obj) => obj.index === SYsubIndex && obj.level === second_level
      )
    ) {
      setIsSecondOpen(
        isSecondOpen.filter(
          (obj) => !(obj.index === SYsubIndex && obj.level === second_level)
        )
      );
    } else {
      setIsSecondOpen([...isSecondOpen, checkArr]);
    }
  };

  // 선택한 아이템리스트
  const [totalPriceList, setTotalPriceList] = useState([]);
  // 선택한 아이템 합계
  const [totalPrice, setTotalPrice] = useState("");
  // 체크리스트 체크여부
  //const [checkedList, setCheckedList] = useRecoilState(itemClicked);
  const [checkedList, setCheckedList] = useState([]);

  const { data, refetch } = useBunyangOption({
    params: {
      build_dtl_cd: SYhoData.build_dtl_cd,
      py_cd: SYhoData.py_cd,
    },
    onSuccess: (data) => {
      setSYdata(data.data.result);
    },
    onError: (error) => {
      console.log("Error[useBunyangOption]", error);
    },
  });

  //초기화
  const bunyangOptionReset = () => {
    SYreactGA4Title(document.title + ` - 동호정보(${SYhoData.dong_nm}동[${SYhoData.ho_nm}]호)옵션계산기`);
    setIsOpen([]);
    setIsSecondOpen([]);
    setTotalPriceList([]);
    setTotalPrice("");
    setCheckedList([]);
    refetch();
  };

  //옵션 선택확인(추가)
  useEffect(() => {
    let optionCode = [];
    let totalPrice = 0;

    SYdata?.optionList.map((loopData) => {
      if (loopData.selected) {
        optionCode.push(loopData.opt_item_cd);
        totalPrice += parseInt(loopData.opt_price);
      }
      loopData.dataList.map((loopSubData) => {
        if (loopSubData.selected) {
          optionCode.push(loopSubData.opt_item_cd);
          totalPrice += parseInt(loopSubData.opt_price);
        }
        loopSubData.detailList.map((items) => {
          if (items.selected) {
            optionCode.push(items.opt_item_cd);
            totalPrice += parseInt(items.opt_price);
          }
        });
      });
    });

    setCheckedList(optionCode);
    setTotalPrice([totalPrice]);
    SYreactGA4Title(document.title + ` - 동호정보(${SYhoData.dong_nm}동[${SYhoData.ho_nm}]호)옵션계산기`);
  }, [SYdata, data]);

  useEffect(() => {
    refetch();
  }, [SYhoData])

  if (!SYdata) return "";

  // 체크박스 시작
  const Checkbox = ({
    leveltitle,
    label1,
    label2,
    label3,
    label4,
    checked,
    levelIndex,
    type,
    price,
    SYindex,
    SYsubIndex,
    SYthirdIndex,
    levelExist,
    leveltwoExist,
    ...props
  }) => {


    const onCheckedElement = useCallback(
      (checked, levelIndex, price) => {
        if (SYsubIndex >= 0) {
          const updateData = SYdata.optionList[SYindex].dataList.map((item, i) => {
            

            if (SYthirdIndex >= 0) {
              const updateData = SYdata.optionList[SYindex].dataList[SYsubIndex]?.detailList.map((item, i) => {
                if (leveltwoExist === "N") {
                  // console.log('SYthirdIndex', SYthirdIndex);
                  if (i === SYthirdIndex) {
                    // console.log('SYthirdIndex', SYthirdIndex);
                    console.log('item.selected', item.selected);
                    console.log('item.i', i);
                    if (item.selected === true) {
                      return delete item.selected;;
                    } else {
                      return { ...item, selected: true };
                    }
                  }
                  else {
                    SYdata.optionList[SYindex].dataList.map((testItem, testIndex) => {
                      testItem.detailList.map((subItem, subI) => {
                        // console.log('subItem', subItem);
                        if (subItem.selected === true) {
                          delete subItem.selected;
                        }
                      });
                    })

                    const updatedItem = (({ selected, ...rest }) => rest)(item);
                    return updatedItem;
                  }
                } else {
                  if (levelExist === "N") {
                    if (i === SYthirdIndex) {
                      return { ...item, selected: !item.selected };
                    } else {
                      const updatedItem = (({ selected, ...rest }) => rest)(item);
                      return updatedItem;
                    }
                  } else {
                    if (i === SYthirdIndex) {
                      return { ...item, selected: !item.selected };
                    } else {
                      return item;
                    }
                  }
                }
              });

              setSYdata({
                optionList: SYdata?.optionList.map((items, i) =>
                  i === SYindex
                    ? {
                      ...items,
                      dataList: items.dataList.map((subItems, j) =>
                        j === SYsubIndex
                          ? { ...subItems, detailList: updateData }
                          : subItems
                      ),
                    }
                    : items
                ),
              });
            } else {
              const updateData = SYdata.optionList[SYindex]?.dataList.map(
                (item, i) =>
                  i === SYsubIndex ? { ...item, selected: !item.selected } : item
              );
              setSYdata({
                optionList: SYdata?.optionList.map((items, i) =>
                  i === SYindex ? { ...items, dataList: updateData } : items
                ),
              });

            }

          });

        } else {
          const updateData = SYdata.optionList[SYindex]?.map(
            (item, i) =>
              i === SYsubIndex ? { ...item, selected: !item.selected } : item
          );
          setSYdata({
            optionList: SYdata?.optionList.map((items, i) =>
              i === SYindex ? { ...items, dataList: updateData } : items
            ),
          });
        }

      },
      [checkedList, totalPriceList]
    );

    // 2뎁스 클릭 시 중복여부 체크
    // const onCheckedtwoElement = useCallback(
    //   (checked, levelIndex, price) => {
    //     if (SYsubIndex >= 0) {
    //       const updateData = SYdata.optionList[SYindex].dataList.map((item, i) => {
    //         if (levelExist === "N") {
    //           if (i === SYsubIndex) {
    //             return { ...item, selected: !item.selected };
    //           } else {
    //             const updatedItem = (({ selected, ...rest }) => rest)(item);
    //             return updatedItem;
    //           }
    //         } else {
    //           if (i === SYsubIndex) {
    //             return { ...item, selected: !item.selected };
    //           } else {
    //             return item;
    //           }
    //         }
    //       });

    //       setSYdata({
    //         optionList: SYdata?.optionList.map((items, i) =>
    //           i === SYindex
    //             ? {
    //               ...items,
    //               dataList: updateData
    //             }
    //             : items
    //         ),
    //       });
    //     } else {
    //       const updateData = SYdata.optionList[SYindex]?.map(
    //         (item, i) =>
    //           i === SYsubIndex ? { ...item, selected: !item.selected } : item
    //       );
    //       setSYdata({
    //         optionList: SYdata?.optionList.map((items, i) =>
    //           i === SYindex ? { ...items, dataList: updateData } : items
    //         ),
    //       });
    //     }

    //   },
    //   [checkedList, totalPriceList]
    // );


    // if (type != 1) {
    //   if (checked) {
    //     //setCheckedList([...checkedList, levelIndex]);
    //     //setTotalPriceList([...totalPriceList, priceArr]);
    //   } else if (!checked) {
    //     //setCheckedList(checkedList.filter((el) => el !== levelIndex));
    //     // setTotalPriceList(
    //     //   totalPriceList.filter((priceArr) => priceArr.index !== levelIndex)
    //     // );
    //   }
    // }
    // setTotalPrice(
    //   totalPriceList
    //     .map((item) => Number(item.price))
    //     .reduce((prev, curr) => prev + curr, 0)
    // );

    return (
      <Fragment>
        {
          // 3dep
          type == 3 ? (
            <label
              className={`${checkedList.includes(levelIndex) ? "checked" : ""}`}
            >
              <input
                type="checkbox"
                checked={checkedList.includes(levelIndex) ? true : false}
                value={levelIndex}
                onChange={(e) => {
                  onCheckedElement(e.target.checked, e.target.value, price);
                }}
              />
              <p className="byOptionTitle">{leveltitle}</p>
              <div className="byOptionDep2Info">
                <p className="byOptionInfo">{label1}</p>
                <p className="byOptionInfo">{label3}</p>
                <p className="byOptionInfo">{label2}</p>
                <p className="byOptionInfo">{label4}</p>
              </div>
            </label>
          ) : // 3dep가 없을 때의 2dep
            type == 2 ? (
              <label
                className={`${checkedList.includes(levelIndex) ? "checked" : ""}`}
              >
                <input
                  type="checkbox"
                  checked={checkedList.includes(levelIndex) ? true : false}
                  value={levelIndex}
                  onChange={(e) => {
                    onCheckedElement(e.target.checked, e.target.value, price);
                  }}
                />
                <p className="byOptionTitle">{leveltitle}</p>
                <div className="byOptionDep2Info">
                  <p className="byOptionInfo">{label1}</p>
                  <p className="byOptionInfo">{label3}</p>
                  <p className="byOptionInfo">{label2}</p>
                  <p className="byOptionInfo">{label4}</p>
                </div>
              </label>
            ) : // 3dep가 있을 때의 2단계
              type == 1 ? (
                <label
                  className={`${checkedList.includes(levelIndex) ? "checked" : ""}`}
                >
                  {/* <input
                type="checkbox"
                checked={checkedList.includes(levelIndex) ? true : false}
                value={levelIndex}
                onChange={(e) => { onCheckedElement(e.target.checked, e.target.value, price) }}
              /> */}
                  <p className="byOptionTitle">{leveltitle}</p>
                </label>
              ) : (
                // 타이틀이 없을 때
                <label
                  className={`${checkedList.includes(levelIndex) ? "checked" : ""}`}
                >
                  <input
                    type="checkbox"
                    checked={checkedList.includes(levelIndex) ? true : false}
                    value={levelIndex}
                    onChange={(e) => {
                      onCheckedElement(e.target.checked, e.target.value, price);
                    }}
                  // ref={(element) => {
                  //   refList.current[levelIndex] = element;
                  // }}
                  // {...props}
                  />
                  <p className="byOptionTitle">옵션 선택</p>
                  <div className="byOptionDep2Info">
                    <p className="byOptionInfo">{label1}</p>
                    <p className="byOptionInfo">{label3}</p>
                    <p className="byOptionInfo">{label2}</p>
                    <p className="byOptionInfo">{label4}</p>
                  </div>
                </label>
              )
        }
      </Fragment>
    );
  };
  //체크박스 끝

  const OptionList = () => {
    return (
      <Fragment>
        <div className="optionPopupTitle">
          <p>유상옵션 계산</p>
          <button
            className="optionPopupClose"
            onClick={() => {
              setpopupOpen(false), bunyangOptionReset();
            }}
          ></button>
        </div>
        <div className="optionRefresh">
          <button
            onClick={() => {
              bunyangOptionReset();
            }}
          >
            초기화
          </button>
        </div>
        {SYdata.optionList?.map((SYloopData, SYindex) => (
          <div className="byOptionDep1Wrap" key={SYindex}>
            <p
              className={`byOptionDep1Title arrowBtn ${isOpen.includes(SYindex) ? "open" : ""
                } ${SYloopData.dataList.some((item) => item.selected) ? "check" : ""
                } ${SYloopData.dataList.some((SYsubLoopData) =>
                  SYsubLoopData.detailList.some((item) => item.selected)
                )
                  ? "check"
                  : ""
                }`}
              onClick={() => {
                onOpen(SYindex);
              }}
            >
              <span>{SYloopData.categoryName}</span>
            </p>
            {/* ${isOpen.includes(openIndex) ? 'active' : ''} */}
            <div
              className={`byOptionDep2Bx ${isOpen.includes(SYindex) ? "active" : ""
                }`}
            >
              {SYloopData.dataList?.map((SYsubLoopData, SYsubIndex) => (
                <Fragment key={SYsubIndex}>
                  {SYsubLoopData.opt_second_level === "" ? (
                    <div className="byOptionDep2Wrap noChild">
                      <div className="byOptionDep2Inner noChild">
                        <div className="byOptionDep2TitleWrap">
                          <Checkbox
                            checked={false}
                            levelIndex={SYsubLoopData.opt_item_cd}
                            label1={SYsubLoopData?.opt_content1}
                            label2={SYsubLoopData?.opt_content2}
                            label3={SYsubLoopData?.opt_location}
                            label4={SYsubLoopData?.opt_manufact}
                            price={SYsubLoopData?.opt_price}
                            SYindex={SYindex}
                            SYsubIndex={SYsubIndex}
                          />
                        </div>
                        <div className="byoptionDep2PriceWrap">
                          <p className="byoptionDep2Price byOptionPrice">
                            {SYkoreanPriceDetail(SYsubLoopData.opt_price)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Fragment>
                      {SYsubLoopData.detailList.length > 1 ? (
                        <div className="byOptionDep2Wrap">
                          <div className="byOptionDep2Inner hasChild">
                            <div
                              className={`arrowBtn ${isSecondOpen.some(
                                (obj) =>
                                  obj.index === SYsubIndex &&
                                  obj.level === SYsubLoopData.opt_second_level
                              )
                                ? "open"
                                : ""
                                }${SYsubLoopData.detailList.some(
                                  (item) => item.selected
                                )
                                  ? " check"
                                  : ""
                                }`}
                              onClick={(e) => {
                                onSecondOpen(
                                  SYsubIndex,
                                  SYsubLoopData.opt_second_level
                                );
                              }}
                            >
                              {/* {console.log("#SYsubLoopData", SYsubLoopData)} */}
                              {/* 3dep가 있을 때의 2단계 */}
                              <Checkbox
                                checked={false}
                                leveltitle={SYsubLoopData.opt_second_level}
                                type={1}
                              />
                            </div>

                            {SYsubLoopData.detailList.map(
                              (SYthirdLoopData, SYthirdIndex) => (
                                <div
                                  className={`byOptionDep3Bx ${isSecondOpen.some(
                                    (obj) =>
                                      obj.index === SYsubIndex &&
                                      obj.level ===
                                      SYsubLoopData.opt_second_level
                                  )
                                    ? "active"
                                    : ""
                                    }`}
                                  key={SYthirdIndex}
                                >
                                  <div className="byOptionDep3Wrap">
                                    <div className={`byOptionDep3Inner`}>
                                      <div className={`byOptionDep3TitleWrap`}>
                                        {/* onClick={() => testList(SYthirdLoopData.opt_item_cd, SYthirdLoopData.opt_price)} */}
                                        {/* 3dep */}
                                        {/* {console.log(SYthirdLoopData)} */}
                                        <Checkbox
                                          leveltitle={
                                            SYthirdLoopData?.opt_thrid_level
                                          }
                                          label1={SYthirdLoopData?.opt_content1}
                                          label2={SYthirdLoopData?.opt_content2}
                                          label3={SYthirdLoopData?.opt_location}
                                          label4={SYthirdLoopData?.opt_manufact}
                                          checked={false}
                                          levelIndex={
                                            SYthirdLoopData?.opt_item_cd
                                          }
                                          type={3}
                                          price={SYthirdLoopData?.opt_price}
                                          levelExist={
                                            SYthirdLoopData?.opt_third_level_is_exist
                                          }
                                          leveltwoExist={
                                            SYsubLoopData?.opt_second_level_is_exist
                                          }
                                          SYindex={SYindex}
                                          SYsubIndex={SYsubIndex}
                                          SYthirdIndex={SYthirdIndex}
                                        />
                                      </div>
                                      <div className="byOptionDep3PriceWrap">
                                        <p className="byoptionDep3Price byOptionPrice">
                                          {SYkoreanPriceDetail(
                                            SYthirdLoopData?.opt_price
                                          )}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      ) : (
                        <Fragment>
                          {/* 3dep가 없을 때의 2dep */}
                          <div
                            className="byOptionDep2Wrap noChild"
                            key={SYsubIndex}
                          >
                            <div className="byOptionDep2Inner noChild">
                              <div className="byOptionDep2TitleWrap">
                                <Checkbox
                                  leveltitle={SYsubLoopData?.opt_second_level}
                                  label1={SYsubLoopData?.opt_content1}
                                  label2={SYsubLoopData?.opt_content2}
                                  label3={SYsubLoopData?.opt_location}
                                  label4={SYsubLoopData?.opt_manufact}
                                  checked={false}
                                  levelIndex={SYsubLoopData?.opt_item_cd}
                                  levelExist={
                                    SYsubLoopData?.opt_second_level_is_exist
                                  }
                                  type={2}
                                  price={SYsubLoopData?.opt_price}
                                  SYindex={SYindex}
                                  SYsubIndex={SYsubIndex}
                                />
                              </div>
                              <div className="byoptionDep2PriceWrap">
                                <p className="byoptionDep2Price byOptionPrice">
                                  {SYkoreanPriceDetail(SYsubLoopData?.opt_price)}
                                </p>
                              </div>
                            </div>
                          </div>
                        </Fragment>
                      )}
                    </Fragment>
                  )}
                </Fragment>
              ))}
            </div>
          </div>
        ))}
        <div className="optionTotalResult">
          <div className="optionTotalResultInner">
            <p>옵션 계산</p>
            <div className="optionTotalBx">
              <p className="optionTotalPrice">
                {totalPrice === 0 ? (
                  <span>0 만원</span>
                ) : (
                  <span>{SYkoreanPriceDetail(totalPrice)}</span>
                )}
              </p>
              <button onClick={handleOpenResult}>분양가 계산하기</button>
            </div>
          </div>
        </div>
      </Fragment>
    );
  };

  return (
    <div className="contentWrap byoption">
      {isOpenResult ? (
        <SYbunynagOptionResult
          data={SYdata?.optionList}
          SYhoData={SYhoData}
          setIsOpenResult={setIsOpenResult}
          checkedList={checkedList}
          avePrice={SYhoData?.supp_price}
          totalPrice={totalPrice}
          setpopupOpen={setpopupOpen}
          bunyangOptionReset={bunyangOptionReset}
        />
      ) : (
        <OptionList />
      )}
    </div>
  );
});

export default SYbunyangOption;
