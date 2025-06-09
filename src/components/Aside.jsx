import { PiMapPinFill } from "react-icons/pi";
import { useState } from "react";

import { useAppContext } from "../context/AppContext";
import { getWeatherData } from "../utils/getWeatherData";

function Aside() {
  const [input, setInput] = useState("");
  const { map, markers, dispatch } = useAppContext();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!input.trim()) return;

    try {
      const weatherData = await getWeatherData(input);

      const newMarker = {
        city: weatherData.location.name,
        country: weatherData.location.country,
        coords: [weatherData.location.lat, weatherData.location.lon],
        createdAt: weatherData.location.localtime,
      };

      const isDuplicate = markers.some(
        (marker) =>
          marker.city.toLowerCase() === newMarker.city.toLowerCase() &&
          marker.country.toLowerCase() === newMarker.country.toLowerCase()
      );

      if (isDuplicate) {
        const existingMarker = markers.find(
          (marker) =>
            marker.city.toLowerCase() === newMarker.city.toLowerCase() &&
            marker.country.toLowerCase() === newMarker.country.toLowerCase()
        );
        map.setView(existingMarker.coords, 10);
        console.log("Marker already exists for this location.");
        return;
      }

      dispatch({ type: "ADD_MARKER", payload: newMarker });
      map.setView(newMarker.coords, 10);
      setInput(""); // Clear input after successful submission
    } catch (error) {
      console.error("Failed to fetch weather data:", error);
      alert("Invalid location or API error.");
    }
  }

  return (
    <aside>
      <PiMapPinFill className="map-icon" />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          placeholder="Enter a city"
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Add Marker</button>
      </form>
    </aside>
  );
}

export default Aside;
