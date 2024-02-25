import React from "react";
import { useLocation } from "react-router-dom";

function SYlistPagination({ SYpaging, SYlistPage }) {
  const SYstartPage =
    parseInt((parseInt(SYpaging.page) - 1) / parseInt(SYpaging.listScale)) *
    parseInt(SYpaging.listScale) +
    1;
  const SYendPage = SYstartPage + parseInt(SYpaging.listScale) - 1;
  const SYpageSize =
    SYstartPage + SYpaging.listScale * 1 > SYpaging.maxPage
      ? parseInt(SYpaging.maxPage) - SYstartPage + 1
      : SYpaging.listScale;

  return (
    <div className="SYpaginationWrap">
      {SYstartPage > 1 ? (
        <button
          type="button"
          className="prev"
          onClick={(e) => {
            e.preventDefault();
            SYlistPage(SYstartPage - 1);
          }}
        >
          <i className="SYicon"></i>
        </button>
      ) : null}
      <div className="pagingWrap">
        {Array(SYpageSize * 1)
          .fill()
          .map((_, i) => (
            <a
              key={i}
              href="#"
              aria-selected={
                i + SYstartPage * 1 == SYpaging.page * 1 ? true : false
              }
              onClick={(e) => {
                e.preventDefault();
                SYlistPage(i + SYstartPage * 1);
              }}
            >
              {i + SYstartPage * 1}
            </a>
          ))}
      </div>
      {SYendPage < parseInt(SYpaging.maxPage) ? (
        <button
          type="button"
          className="next"
          onClick={(e) => {
            e.preventDefault();
            SYlistPage(SYstartPage + parseInt(SYpaging.listScale));
          }}
        >
          <i className="SYicon"></i>
        </button>
      ) : null}
    </div>
  );
}

export default SYlistPagination;
