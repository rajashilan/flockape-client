import React, { useState } from "react";
//css
import "../styles/Navbar.css";
//images
import logo from "./images/logo@2x.png";
//components
import MobileMenu from "./MobileMenu";

function Navbar() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  function Menu(props) {
    if (props.isActive) return <MobileMenu />;
    return null;
  }

  //dynamic classnames for hamburger and close button in nav
  //hide and show according to menu state
  let hamburgerContainer;
  let closeContainer;
  if (showMobileMenu) {
    hamburgerContainer = "navbar-hamburger-container navbar-hidden";
    closeContainer = "navbar-close-container";
  } else {
    hamburgerContainer = "navbar-hamburger-container";
    closeContainer = "navbar-close-container navbar-hidden";
  }

  return (
    <div className="navbar">
      <img className="navbar-logo" src={logo} alt="flockape" />

      <button className="navbar-button">Sign Up</button>

      <div
        className={hamburgerContainer}
        onClick={() => {
          setShowMobileMenu(!showMobileMenu);
        }}
      >
        <div className="navbar-hamburger"></div>
        <div className="navbar-hamburger"></div>
        <div className="navbar-hamburger"></div>
      </div>

      <div
        className={closeContainer}
        onClick={() => {
          setShowMobileMenu(!showMobileMenu);
        }}
      >
        <div className="navbar-close-top">
          <div className="navbar-close-bottom"></div>
        </div>
      </div>

      {/* pass the state as a props and render mobile menu based on that */}
      <Menu isActive={showMobileMenu} />
    </div>
  );
}

export default Navbar;
