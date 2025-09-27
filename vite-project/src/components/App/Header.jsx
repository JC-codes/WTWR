import "../../blocks/Header.css";
import avatar from "../../images/avatar.svg";
import logo from "../../images/logo.svg";

function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <img src={logo} alt="Logo" className="header__logo" />
      <p className="header__date-location">
        {currentDate}, {weatherData.city || "Loading..."}
      </p>
      <div className="header__user-container">
        <button
          onClick={handleAddClick}
          type="button"
          className="header__add-clothes-btn"
        >
          + Add clothes
        </button>
        <p className="header__username">Terrence Tegegne</p>
      </div>
      <img src={avatar} alt="Terrence Tegegne" className="header__avatar" />
    </header>
  );
}

export default Header;
