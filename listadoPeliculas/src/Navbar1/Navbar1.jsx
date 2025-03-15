import { useEffect, useRef, useState } from "react";

import "./Navbar1.css";

function Navbar1() {
  const [isVisible, setIsVisible] = useState(true);

  const lastScrollTop = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      var { scrollY } = window;
      if (scrollY > lastScrollTop.current) {
        setIsVisible(false);
      } else if (scrollY < lastScrollTop.current) {
        setIsVisible(true);
      } // else was horizontal scroll
      lastScrollTop.current = scrollY <= 0 ? 0 : scrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="page navbar-1-page">
      <nav className={`navbar-1 ${isVisible ? "visible" : ""} `}>
        <img src="/src/Navbar1/icon.svg" alt="title-logo" />
        <div className="nav-items">
          <a href="#">About</a>
          <a href="#">Services</a>
          <a href="#">Products</a>
          <a href="#footer">Contact</a>
        </div>
      </nav>
    </div>
  );
}

export default Navbar1;
