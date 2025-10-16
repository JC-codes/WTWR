import { useContext } from "react";
import "../../blocks/ToggleSwitch.css";
import CurrentTempUnitContext from "../../Context/CurrentTempUnitContext";

function ToggleSwitch() {
  const { handleToggleSwitchChange, currentTempUnit } = useContext(
    CurrentTempUnitContext
  );

  return (
    <label className="toggle__switch">
      <input
        type="checkbox"
        className="toggle__switch-checkbox"
        onChange={handleToggleSwitchChange}
        checked={currentTempUnit === "C"}
      />
      <span className="toggle__switch-circle"></span>
      <span
        style={{ color: `${currentTempUnit === "F" ? "white" : ""}` }}
        className="toggle__switch-label toggle__switch-label-f"
      >
        F
      </span>
      <span
        style={{ color: `${currentTempUnit === "C" ? "white" : ""}` }}
        className="toggle__switch-label toggle__switch-label-c"
      >
        C
      </span>
    </label>
  );
}

export default ToggleSwitch;
