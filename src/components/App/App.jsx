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
import ModalWithForm from "./ModalWithForm";
import ItemModal from "./ItemModal";
import { getWeatherData, processWeatherData } from "../../utils/weatherApi.js";

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
  const [selectedWeatherType, setSelectedWeatherType] = useState("");
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);

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

  const handleWeatherTypeChange = (event) => {
    setSelectedWeatherType(event.target.value);
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
      <ModalWithForm
        isOpen={activeModal === "add-garment"}
        title="New Garment"
        name="add-garment"
        activeModal={activeModal}
        handleCloseClick={handleCloseClick}
      >
        <label htmlFor="name" className="modal__label">
          Name{" "}
          <input
            type="text"
            className="modal__input"
            id="name"
            placeholder="Name"
          />
        </label>
        <label htmlFor="imageURL" className="modal__label">
          Image{" Image URL "}
          <input
            type="url"
            className="modal__input"
            id="imageURL"
            placeholder="imageURL"
          />
        </label>
        <fieldset className="modal__radio-buttons">
          <legend className="modal__legend">Select the weather type:</legend>
          <label htmlFor="hot" className="modal__label modal__label_type_radio">
            <input
              id="hot"
              type="radio"
              name="weatherType"
              value="hot"
              className="modal__radio-input"
              checked={selectedWeatherType === "hot"}
              onChange={handleWeatherTypeChange}
            />
            Hot
          </label>
          <label
            htmlFor="warm"
            className="modal__label modal__label_type_radio"
          >
            <input
              id="warm"
              type="radio"
              name="weatherType"
              value="warm"
              className="modal__radio-input"
              checked={selectedWeatherType === "warm"}
              onChange={handleWeatherTypeChange}
            />
            Warm
          </label>
          <label
            htmlFor="cold"
            className="modal__label modal__label_type_radio"
          >
            <input
              id="cold"
              type="radio"
              name="weatherType"
              value="cold"
              className="modal__radio-input"
              checked={selectedWeatherType === "cold"}
              onChange={handleWeatherTypeChange}
            />
            Cold
          </label>
        </fieldset>
      </ModalWithForm>
      <ItemModal
        activeModal={activeModal}
        card={selectedCard}
        handleCloseClick={handleCloseClick}
      />
    </div>
  );
}

export default App;
