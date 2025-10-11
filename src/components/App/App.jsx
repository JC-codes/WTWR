import { useEffect, useState } from "react";

import "../../blocks/App.css";
import {
  coordinates,
  APIkey,
  defaultClothingItems,
} from "../../utils/constants";
import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import AddItemModal from "./AddItemModal.jsx";
import ItemModal from "./ItemModal";
import { getWeatherData, processWeatherData } from "../../utils/weatherApi.js";
import CurrentTempUnitContext from "../../Context/CurrentTempUnitContext.jsx";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "warm",
    temp: { F: 999, C: 999 },
    city: "Loading...",
    condition: "clear",
    isDaytime: true,
  });

  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [currentTempUnit, setCurrentTempUnit] = useState("F");

  const handleToggleSwitchChange = () => {
    setCurrentTempUnit(currentTempUnit === "F" ? "C" : "F");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleCloseClick = () => {
    setActiveModal("");
  };

  const onAddItem = (inputValues) => {
    const newItem = {
      name: inputValues.name,
      weather: inputValues.weatherType,
      imageUrl: inputValues.imageURL,
    };
    setClothingItems([newItem, ...clothingItems]);
    setActiveModal("");
  };

  useEffect(() => {
    getWeatherData(coordinates, APIkey)
      .then((data) => {
        const processedData = processWeatherData(data);
        setWeatherData(processedData);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  }, []);

  useEffect(() => {
    if (!activeModal) return;

    const handleEscClose = (event) => {
      if (event.key === "Escape") {
        handleCloseClick();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  return (
    <CurrentTempUnitContext.Provider
      value={{ currentTempUnit, handleToggleSwitchChange }}
    >
      <div className="app">
        <div className="app__content">
          <Header handleAddClick={handleAddClick} weatherData={weatherData} />
          <Main
            weatherData={weatherData}
            handleCardClick={handleCardClick}
            clothingItems={clothingItems}
          />
          <Footer />
        </div>
        <AddItemModal
          isOpen={activeModal === "add-garment"}
          onAddItem={onAddItem}
          onClose={handleCloseClick}
        ></AddItemModal>
        <ItemModal
          activeModal={activeModal}
          card={selectedCard}
          handleCloseClick={handleCloseClick}
        />
      </div>
    </CurrentTempUnitContext.Provider>
  );
}

export default App;
