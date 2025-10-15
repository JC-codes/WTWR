import "../../blocks/SideBar.css";
import Avatar from "../../images/avatar.svg";

export default function SideBar() {
  const username = "Terrence Tegegne";

  return (
    <aside className="sidebar">
      <div className="sidebar__profile">
        <div className="sidebar__user-name">{username}</div>
        <img className="sidebar__avatar" src={Avatar} alt="User Avatar" />
      </div>
      <div className="sidebar__actions">
        <button type="button" className="sidebar__action-btn btn--edit-profile">
          Change profile data
        </button>
        <button type="button" className="sidebar__action-btn btn--logout">
          Log out
        </button>
      </div>
    </aside>
  );
}
