import { MapContainer, TileLayer, Popup, Marker, useMap } from "react-leaflet";
import { useAppContext } from "../context/AppContext";
import { useEffect } from "react";
import { getWeatherData } from "../utils/getWeatherData";

function MapSetter() {
  const map = useMap();
  const { dispatch } = useAppContext();

  useEffect(() => {
    dispatch({ type: "SET_MAP", payload: map });
  }, [map, dispatch]);

  return null;
}

// function ClickHandler() {
//   const map = useMapEvent("click", (e) => {
//     map.setView(e.latlng, map.getZoom());
//   });
//   return null;
// }

function Map() {
  const { markers ,dispatch} = useAppContext();
  const position = [51.505, -0.09];
 async function handlePopUpClick(marker){
  const data = await getWeatherData(marker.city)
  const selectedCity = data;
 
  dispatch({type: "OPEN_MODAL" ,payload : true})
  dispatch({ type: "SELECT_CITY", payload: selectedCity });
  console.log(selectedCity)
  }
  return (
    <section className="map-container">
      <MapContainer id="map" center={position} zoom={13} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers.map((marker) => (
          <Marker key={marker.createdAt} position={marker.coords}>
          <Popup>
              <button className="popup-btn" onClick={()=> {
                handlePopUpClick(marker)
              }}>INFO</button>
           </Popup>
          </Marker>
        ))}

        {/* <ClickHandler /> */}
        <MapSetter />
      </MapContainer>
    </section>
  );
}

export default Map;
