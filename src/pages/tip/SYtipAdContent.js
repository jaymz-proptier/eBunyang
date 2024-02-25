import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function SYtipAdContent({ SYdata }) {
  if (!SYdata) return null;

  // 윈도우 사이즈 측정
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
  });

  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
    });
  };

  let bannerSize = windowSize.width;

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="complexRow">
      <div className="adContentArea">
        <div className="advertise">
          <a href={SYdata.link_url} className="" target="_blank">
            <>
              {bannerSize > 789 ? (
                <img
                  src={SYdata.image_url}
                  className="banner_pc"
                  alt={SYdata.title}
                  title={SYdata.title}
                  rel="noopener noreferrer"
                />
              ) : (
                <img
                  src={SYdata.mobile_image_url}
                  className="banner_mobile"
                  alt={SYdata.title}
                />
              )}
            </>
          </a>
        </div>
      </div>
    </div>
  );
}

export default SYtipAdContent;
