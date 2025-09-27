import "../../blocks/WeatherCard.css";
import {
  weatherConditions,
  defaultWeatherOptions,
} from "../../utils/constants";

function WeatherCard({ weatherData }) {
  const filteredCondition = weatherConditions.filter((item) => {
    return (
      item.condition === weatherData.condition &&
      item.day === weatherData.isDaytime
    );
  });

  let weatherOption;
  if (filteredCondition.length === 0) {
    weatherOption =
      defaultWeatherOptions[weatherData.isDaytime ? "day" : "night"];
  } else {
    weatherOption = filteredCondition[0];
  }

  return (
    <section className="weather-card">
      <p className="weather-card__temp">{weatherData.temp.F}°F</p>
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
