import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import "../../blocks/App.css";
import { apiKey } from "../../utils/constants";
import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import AddItemModal from "./AddItemModal.jsx";
import ItemModal from "./ItemModal";
import { getWeatherData, processWeatherData } from "../../utils/weatherApi.js";
import CurrentTempUnitContext from "../../Context/CurrentTempUnitContext.jsx";
import Profile from "./Profile.jsx";
import { getItems, addItem, removeItem } from "../../utils/api.js";

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
  const [clothingItems, setClothingItems] = useState([]);
  const [currentTempUnit, setCurrentTempUnit] = useState("F");
  const [locationError, setLocationError] = useState(null);

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

  const handleDelete = (cardId) => {
    removeItem(cardId)
      .then(() => {
        setClothingItems((prev) =>
          prev.filter((item) => item._id !== cardId && item.id !== cardId)
        );
      })
      .catch((error) => console.error(error));
  };

  function onAddItem(inputValues, resetForm) {
    const newItem = {
      name: inputValues.name,
      weather: inputValues.weatherType,
      imageURL: inputValues.imageURL,
    };

    addItem(newItem, resetForm)
      .then((createdItem) => {
        setClothingItems(() => [createdItem, ...clothingItems]);
        resetForm();
        setActiveModal("");
      })
      .catch(console.error);
  }

  const getUserLocation = () => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by this browser.");
      setWeatherData((prev) => ({ ...prev, city: "Location unavailable" }));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coordinates = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };

        getWeatherData(coordinates, apiKey)
          .then((data) => {
            const processedData = processWeatherData(data);
            setWeatherData(processedData);
            setLocationError(null);
          })
          .catch((error) => {
            console.error("Error fetching weather data:", error);
            setLocationError("Failed to get weather data");
            setWeatherData((prev) => ({
              ...prev,
              city: "Weather unavailable",
            }));
          });
      },
      (error) => {
        console.error("Error getting location:", error);
        let errorMessage;
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Location access denied by user.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable.";
            break;
          case error.TIMEOUT:
            errorMessage = "Location request timed out.";
            break;
          default:
            errorMessage = "An unknown error occurred.";
            break;
        }
        setLocationError(errorMessage);
        setWeatherData((prev) => ({ ...prev, city: "Location failed" }));
      }
    );
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  useEffect(() => {
    getItems()
      .then((items) => {
        setClothingItems(() => [...items].reverse());
      })
      .catch((error) => {
        console.error("Error fetching clothing items:", error);
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
          {locationError && (
            <div className="location-error">Error: {locationError}</div>
          )}
          <Header handleAddClick={handleAddClick} weatherData={weatherData} />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  clothingItems={clothingItems}
                  handleCardClick={handleCardClick}
                  handleAddClick={handleAddClick}
                />
              }
            />
          </Routes>
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
          handleDelete={handleDelete}
        />
      </div>
    </CurrentTempUnitContext.Provider>
  );
}

export default App;
