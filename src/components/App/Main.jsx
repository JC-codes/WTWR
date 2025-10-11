import React, { useContext } from "react";
import "../../blocks/Main.css";
import WeatherCard from "../Cards/WeatherCard";
import ItemCard from "../Cards/ItemCard";
import CurrentTempUnitContext from "../../Context/CurrentTempUnitContext";
import { formatTemp } from "../../utils/FormatTemp.js";

function Main({ weatherData, handleCardClick, clothingItems }) {
  const { currentTempUnit } = useContext(CurrentTempUnitContext);

  const formattedTemp = formatTemp(weatherData?.temp, currentTempUnit);
  const unit = currentTempUnit === "C" ? "°C" : "°F";

  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is {formattedTemp}
          {unit} / You may want to wear:
        </p>
        <ul className="cards__list">
          {clothingItems
            .filter((item) => {
              return item.weather === weatherData.type;
            })
            .map((item) => {
              return (
                <ItemCard
                  key={item._id}
                  item={item}
                  handleCardClick={handleCardClick}
                />
              );
            })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
