export const getWeatherData = ({ latitude, longitude }, apiKey) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`
  ).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject(`Error: ${response.status}`);
    }
  });
};

export const getWeatherType = (temperature) => {
  if (temperature > 86) {
    return "hot";
  } else if (temperature > 66) {
    return "warm";
  } else {
    return "cold";
  }
};

export const processWeatherData = (data) => {
  const result = {};
  result.city = data.name;
  result.temp = {
    F: Math.round(data.main.temp),
    C: Math.round(((data.main.temp - 32) * 5) / 9),
  };
  result.type = getWeatherType(result.temp.F);
  result.condition = data.weather[0].main.toLowerCase();
  result.isDaytime = isDaytime(data.sys, Date.now());
  return result;
};

const isDaytime = ({ sunrise, sunset }, now) => {
  return sunrise * 1000 < now && now < sunset * 1000;
};
