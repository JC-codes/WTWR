import { useContext } from "react";
import "../../blocks/Main.css";
import WeatherCard from "../Cards/WeatherCard";
import ItemCard from "../Cards/ItemCard";
import CurrentTempUnitContext from "../../Context/CurrentTempUnitContext";

function Main({ weatherData, handleCardClick, clothingItems }) {
  const { currentTempUnit } = useContext(CurrentTempUnitContext);

  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is {weatherData.temp[currentTempUnit]}°{currentTempUnit} / You
          may want to wear:
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
