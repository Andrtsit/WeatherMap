import { PiMapPinFill } from "react-icons/pi";

import { useAppContext } from "../context/AppContext";
import { useState } from "react";
import { getWeatherData } from "../utils/getWeatherData";

function Aside() {
  const [input, setInput] = useState("");
  const { map, dispatch } = useAppContext();
  async function handleSubmit(e) {
    e.preventDefault();
    const weatherData = await getWeatherData(input);
    console.log(weatherData);
    const newMarker = {
      city: weatherData.location.name,
      country: weatherData.location.country,
      coords: [weatherData.location.lat, weatherData.location.lon],
      createdAt: weatherData.location.localtime,
    };
    dispatch({ type: "ADD_MARKER", payload: newMarker });
    map.setView(newMarker.coords, 10);
  }

  return (
    <aside>
      <PiMapPinFill className="map-icon" />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </form>
    </aside>
  );
}

export default Aside;
