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
import {
  useBunyangOption,
  useBunyangOptionTitle,
} from "../../apis/bunyang/bunyang";

function SYbunynagOptionResult({
  data,
  SYhoData,
  checkedList,
  totalPrice,
  avePrice,
  setIsOpenResult,
  setpopupOpen,
  bunyangOptionReset
}) {
  const [bunyangOption, setbunyangOption] = useState([]);
  const [bunyangOptionTitle, setbunyangOptionTitle] = useState([]);

  // 열렸다 닫혔다 체크
  const [isOpen, setIsOpen] = useState(false);
  const onOpen = () => {
    setIsOpen((isOpen) => !isOpen);
  };

  const handleOpenResult = () => {
    setIsOpenResult(false);
  };

  //페이지 제목과 주소 불러오기
  const [searchParams, setSearchParams] = useSearchParams();
  const build_dtl_cd = searchParams.get("build_dtl_cd") || "";
  const supp_cd = searchParams.get("supp_cd") || "";

  const { data: dataTitle, refetch: refetchTitle } = useBunyangOptionTitle({
    params: {
      build_dtl_cd: build_dtl_cd,
      supp_cd: supp_cd,
    },
    onSuccess: (dataTitle) => {
      setbunyangOptionTitle(dataTitle.data.result.detail);
    },
    onError: (errorTitle) => {
      console.log("Error[bunyangOptionTitle]", errorTitle);
    },
  });

  useEffect(() => {
    refetchTitle();
  }, [setIsOpenResult]);

  const SYdata = data;
  const SYtitleData = bunyangOptionTitle;

  // console.log('checkedList', checkedList);
  // console.log("checkedList", checkedList);
  //해당 아이디 값의 내용 가져오기

  const optionResultInfo = new Set();

  const totalCheckList = () => {
    checkedList.map((checkArr) => {
      SYdata.map((data) => {
        data.dataList.map((item) => {
          if (checkArr === item.opt_item_cd) {
            optionResultInfo.add(
              JSON.stringify({
                opt_first_level: item.opt_first_level,
                opt_second_level: item.opt_second_level,
                opt_location: item.opt_location,
                opt_content1: item.opt_content1,
                opt_content2: item.opt_content2,
                opt_manufact: item.opt_manufact,
                opt_price: item.opt_price,
              })
            );
          }
          if (item.detailList.length > 0) {
            item.detailList.map((detailItem) => {
              if (checkArr === detailItem.opt_item_cd) {
                optionResultInfo.add(
                  JSON.stringify({
                    opt_thrid_level: detailItem.opt_thrid_level,
                    opt_location: detailItem.opt_location,
                    opt_content1: detailItem.opt_content1,
                    opt_content2: detailItem.opt_content2,
                    opt_manufact: detailItem.opt_manufact,
                    opt_price: detailItem.opt_price,
                  })
                );
              }
            });
          }
        });
      });
    });

    return Array.from(optionResultInfo).map((value) => JSON.parse(value));
  };

  // console.log("totalCheckList", totalCheckList());

  return (
    <div className="contentWrap optionResult">
      <button
        className="optionPopupClose"
        onClick={() => {
          setpopupOpen(false), bunyangOptionReset(), setIsOpenResult(false);
        }}
      ></button>
      <div className="optionResultTitle">
        {console.log(SYtitleData)}
        <p className="title">{SYtitleData.build_nm}</p>
        {console.log(SYhoData)}
        <p className="info">{SYhoData.dong_nm}동 {SYhoData.ho_nm}호 ({SYhoData.py_nm})</p>
      </div>

      <div className="optionResultButton">
        <p>선택 옵션</p>
        <button onClick={handleOpenResult}>옵션 변경하기</button>
      </div>
      <div className="optionResultItem">
        <table>
          <colgroup>
            <col style={{ width: "66%" }} />
            <col style={{ width: "34%" }} />
          </colgroup>
          <thead>
            <tr>
              <th>옵션명</th>
              <th>금액</th>
            </tr>
          </thead>
          <tbody>
            {totalCheckList().map((SYloopData, SYindex) =>
              !SYloopData.opt_thrid_level ? (
                <tr>
                  <td>
                    <p className="category">{SYloopData.opt_first_level}</p>
                    <p className="info">{SYloopData.opt_second_level}</p>
                  </td>
                  <td className="price">
                    <p>{SYkoreanPriceDetail(SYloopData.opt_price)}</p>
                  </td>
                </tr>
              ) : (
                <tr>
                  <td>
                    <p className="category">{SYloopData.opt_thrid_level}</p>
                    <p className="info">{SYloopData.opt_content1}</p>
                  </td>
                  <td className="price">
                    <p>{SYkoreanPriceDetail(SYloopData.opt_price)}</p>
                  </td>
                </tr>
              )
            )}
          </tbody>
          <tfoot>
            <tr>
              <td>선택옵션 금액</td>
              <td className="priceTotal">
                <p>{SYkoreanPriceDetail(totalPrice)}</p>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="optionResultTotal">
        <dl>
          <dt>기준 분양가</dt>
          <dd>{SYkoreanPriceDetail(avePrice)}</dd>
        </dl>
        <dl>
          <dt>선택옵션 금액</dt>
          <dd>{SYkoreanPriceDetail(totalPrice)}</dd>
        </dl>
        <dl className="totalPrice">
          <dt>총 예상분양가</dt>
          <dd>{SYkoreanPriceDetail(Number(avePrice) + Number(totalPrice))}</dd>
        </dl>
      </div>

      <div className="optionResultCaption">
        <p>
          ※ 분양가 및 유상옵션 금액은 모집공고문을 기반으로 제공하고 있습니다.
          유상옵션 계산의 경우 선택 옵션에 따라 실제 금액과 차이 날 수 있으므로
          참고용으로 활용하시길 바랍니다. 활용 대한 책임은 전적으로 이용자에게
          있으며 e분양은 이에 대하여 아무런 책임을 부담하지 않습니다.
        </p>
      </div>
    </div>
  );
}

export default SYbunynagOptionResult;
