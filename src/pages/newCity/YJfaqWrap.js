import React from "react";

function YJfaqWrap() {
  const FaqItem = (props) => {
    const { question, answer } = props;
    const [isOpen, setIsOpen] = React.useState(false);
    const onOpen = () => {
      setIsOpen((isOpen) => !isOpen);
    };

    return (
      <div className="faqWrap">
        <div className={`titleWrap ${isOpen ? "open" : ""}`} onClick={onOpen}>
          <div className="faqTitle">{question}</div>
          <div className="unfoldBtn">
            <i className={`Icon_unfold ${isOpen ? "open" : ""}`}></i>
          </div>
        </div>
        {isOpen && <div className="faqContentWrap">{answer}</div>}
      </div>
    );
  };
  const YJfaqWrap = () => {
    const faqData = [
      {
        question: "Q. 3기신도시 분양일정은 어떻게 진행되나요?",
        answer: (
          <div className="faqContent">
            <span className="reply">A.</span>
            <span className="box progress">지구계획 승인</span>
            <span className="box progress">사전 청약</span>
            <span className="box progress">주택 사업승인 및 착공</span>
            <span className="box progress">본 청약</span>
          </div>
        ),
      },
      {
        question: "Q. 3기신도시 분양가는 어떻게 책정되나요?",
        answer: (
          <div className="faqContent">
            <span className="reply">A.</span>
            <span className="text">
              사전청약 시점에는 추정분양가격 안내하고 실제 분양가는
              분양가상한금액을 토대로 본 청약 시에 제공
              예정입니다.(추정분양가격은 실제 분양가와 다를 수 있습니다.)
            </span>
            <div className="calculationWrap">
              <span className="box equals">분양가 상한금액</span>
              <span className="box plus">택지비</span>
              <span className="box plus">기본형건축비</span>
              <span className="box">가산비</span>
            </div>
          </div>
        ),
      },
      {
        question: "Q. 3기신도시 본청약은 언제인가요?",
        answer: (
          <div className="faqContent">
            <span className="reply">A.</span>
            <span className="text">
              본청약은 주택사업승인 및 착공 시기에 맞춰 진행될 예정이며 자세한
              사항은 단지별 모집공고를 확인하셔야 합니다.(실제 본청약은 다를 수
              있습니다.)
            </span>
          </div>
        ),
      },
      {
        question: "Q. 공공분양주택의 사전청약 공급량은 어떻게 되나요?",
        answer: (
          <div className="faqContentWrap">
            <div className="faqContent">
              <span className="reply">A.</span>
              <span className="tableWrap">
                <div className="tableRow tableHead">
                  <span className="tableData">공급방식</span>
                  <span className="tableData">공급량</span>
                </div>
                <div className="tableRow">
                  <span className="tableData">일반공급</span>
                  <span className="tableData">건설량의 15%</span>
                </div>
                <div className="tableRow">
                  <span className="tableData">신혼부부 특별공급</span>
                  <span className="tableData">건설량의 30%</span>
                </div>
                <div className="tableRow">
                  <span className="tableData">생애최초 특별공급</span>
                  <span className="tableData">건설량의 25%</span>
                </div>
                <div className="tableRow">
                  <span className="tableData">다자녀가구 특별공급</span>
                  <span className="tableData">건설량의 10%</span>
                </div>
                <div className="tableRow">
                  <span className="tableData">노부모부양 특별공급</span>
                  <span className="tableData">건설량의 5%</span>
                </div>
                <div className="tableRow">
                  <span className="tableData">기관추천 특별공급</span>
                  <span className="tableData">건설량의 15%</span>
                </div>
              </span>
            </div>
          </div>
        ),
      },
    ];

    return (
      <div className="complexColumn">
        <div className="complexContentArea">
          <div className="articleWrap">
            <div className="faqContainer">
              {faqData.map((i) => (
                <FaqItem question={i.question} answer={i.answer} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };
  return <YJfaqWrap />;
}

export default YJfaqWrap;
