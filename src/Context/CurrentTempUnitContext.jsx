import { createContext, useState } from "react";

const CurrentTempUnitContext = createContext();

export const CurrentTempUnitProvider = ({ children }) => {
  const [currentTempUnit, setCurrentTempUnit] = useState("F");

  const handleToggleSwitchChange = () => {
    setCurrentTempUnit(currentTempUnit === "F" ? "C" : "F");
  };

  return (
    <CurrentTempUnitContext.Provider
      value={{ currentTempUnit, handleToggleSwitchChange }}
    >
      {children}
    </CurrentTempUnitContext.Provider>
  );
};

export default CurrentTempUnitContext;
