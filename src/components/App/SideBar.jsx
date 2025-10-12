import "../../blocks/SideBar.css";
import Avatar from "../../images/avatar.svg";

export default function SideBar() {
  return (
    <aside className="sidebar">
      <div className="sidebar__profile">
        <div className="sidebar__user-name">Terrence Tegegne</div>
        <img className="sidebar__avatar" src={Avatar} alt="User Avatar" />
      </div>
    </aside>
  );
}
