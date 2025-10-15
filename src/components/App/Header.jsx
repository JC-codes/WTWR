import React, { useState, useRef, useEffect } from "react";
import "../../blocks/Header.css";
import avatar from "../../images/avatar.svg";
import logo from "../../images/logo.svg";
import ToggleSwitch from "./ToggleSwitch";
import { NavLink, useLocation } from "react-router-dom";
import MenuModal from "./MenuModal";

function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  const username = "Terrence Tegegne";

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const location = useLocation();
  const isProfile =
    location.pathname === "/profile" ||
    location.pathname.startsWith("/profile/");

  useEffect(() => {
    function handleOutsideClick(e) {
      if (
        menuOpen &&
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target)
      ) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [menuOpen]);

  const toggleMenu = () => setMenuOpen((v) => !v);

  return (
    <header className={`header ${isProfile ? "header--profile" : ""}`}>
      <NavLink to="/" className="header__logo-link">
        <img src={logo} alt="Logo" className="header__logo" />
      </NavLink>
      <p className="header__date-location">
        {currentDate}, {weatherData.city || "Loading..."}
      </p>
      <div className="header__user-container">
        <ToggleSwitch />
        <button
          onClick={handleAddClick}
          type="button"
          className="header__add-clothes-btn"
        >
          + Add clothes
        </button>
        <NavLink to="/profile" className="header__profile-link">
          <p className="header__username">{username}</p>
          <img src={avatar} alt={username} className="header__avatar" />
        </NavLink>
      </div>
      <button
        className="header__menu-icon"
        type="button"
        onClick={toggleMenu}
        ref={buttonRef}
      ></button>
      <MenuModal
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        modalRef={menuRef}
        username={username}
        avatar={avatar}
        handleAddClick={handleAddClick}
      />
    </header>
  );
}

export default Header;
