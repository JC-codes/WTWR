import { useState } from "react";

import "../../blocks/App.css";
import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";

function App() {
  const [weatherData, setWeatherData] = useState({ type: "hot" });

  return (
    <div className="app">
      <div className="app__content">
        <Header />
        <Main weatherData={weatherData} />
        <Footer />
      </div>
    </div>
  );
}

export default App;
