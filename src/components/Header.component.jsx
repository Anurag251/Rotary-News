import React, { useContext, useEffect, useState } from "react";
import { AllDataContext } from "../context/AllData.context";
import { Link } from "react-router-dom";

export const HeaderComponent = () => {
  const { navDatas } = useContext(AllDataContext);
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    const currentPosition = window.scrollY;
    setScrollPosition(currentPosition);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`${scrollPosition >= 108 ? "active" : ""}`}>
      <div className="wrapper">
        <Link to="/">
          <div className="logo">
            <img className="logo-image" src="/rotary-logo.svg" alt="" />
          </div>
        </Link>
      </div>

      <nav>
        <div className="wrapper">
          <Link to="/">
            <div className="logo">
              <img className="logo-image" src="/rotary-logo-light.svg" alt="" />
            </div>
          </Link>
          <ul>
            {navDatas !== null
              ? navDatas.map((nav, idx) => (
                  <li key={idx}>
                    <Link to={nav.href} target="blank">
                      <button> {nav.name}</button>
                    </Link>
                  </li>
                ))
              : "Loading..."}
          </ul>

          <div className="side-nav-button">
            <i className="fas fa-bars"></i>
          </div>
        </div>
      </nav>
    </header>
  );
};
