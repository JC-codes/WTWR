import React, { useContext } from "react";
import CurrentTempUnitContext from "../../Context/CurrentTempUnitContext";
import { formatTemp } from "../../utils/FormatTemp.js";
import "../../blocks/WeatherCard.css";
import {
  weatherConditions,
  defaultWeatherOptions,
} from "../../utils/constants";

function WeatherCard({ temp, weatherData, ...props }) {
  const { currentTempUnit } = useContext(CurrentTempUnitContext);

  const formattedTemp = formatTemp(temp ?? weatherData?.temp, currentTempUnit);
  const unit = currentTempUnit === "C" ? "°C" : "°F";

  const filteredCondition = weatherConditions.filter((item) => {
    return (
      item.condition === weatherData?.condition &&
      item.day === weatherData?.isDaytime
    );
  });

  let weatherOption;
  if (filteredCondition.length === 0) {
    weatherOption =
      defaultWeatherOptions[weatherData?.isDaytime ? "day" : "night"];
  } else {
    weatherOption = filteredCondition[0];
  }

  return (
    <section className="weather-card">
      <div className="weather-card__temp">
        {formattedTemp}
        {unit}
      </div>
      <img
        src={weatherOption?.url}
        alt={`${weatherOption?.day ? "day" : "night"}time ${
          weatherOption?.condition
        } weather`}
        className="weather-card__image"
      />
    </section>
  );
}

export default WeatherCard;
