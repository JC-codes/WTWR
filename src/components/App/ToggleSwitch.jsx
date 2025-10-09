import "../../blocks/ToggleSwitch.css";

function ToggleSwitch() {
  return (
    <label className="toggle-switch">
      <input type="checkbox" className="toggle-switch-checkbox" />
      <span className="toggle-switch_circle"></span>
      <span className="toggle-switch-label toggle-switch-label-f">F</span>
      <span className="toggle-switch-label toggle-switch-label-c">C</span>
    </label>
  );
}

export default ToggleSwitch;
