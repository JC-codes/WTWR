import "../../blocks/Header.css";
import avatar from "../../images/avatar.svg";
import logo from "../../images/logo.svg";
import ToggleSwitch from "./ToggleSwitch";
import { NavLink } from "react-router-dom";

function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
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
          <p className="header__username">Terrence Tegegne</p>
          <img src={avatar} alt="Terrence Tegegne" className="header__avatar" />
        </NavLink>
      </div>
      <button
        className="header__menu-icon"
        type="button"
        onClick={handleAddClick}
      ></button>
    </header>
  );
}

export default Header;
