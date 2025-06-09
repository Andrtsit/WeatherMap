// components/Modal.jsx
import { useAppContext } from "../context/AppContext";

// You'll need to install react-icons: npm install react-icons
import { WiDaySunny, WiCloudy, WiRain, WiStrongWind } from 'react-icons/wi';

// Helper function to map weather conditions to icons
const getWeatherIcon = (conditionText) => {
  const condition = conditionText.toLowerCase();
  
  if (condition.includes('sunny') || condition.includes('clear')) {
    return 'sun';
  } else if (condition.includes('rain') || condition.includes('drizzle') || condition.includes('shower')) {
    return 'rain';
  } else if (condition.includes('cloud') || condition.includes('overcast')) {
    return 'cloud';
  } else if (condition.includes('wind') || condition.includes('breezy')) {
    return 'wind';
  } else {
    return 'sun'; // default
  }
};

// Helper function to format date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    weekday: 'short', 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  }).toUpperCase();
};

const WeatherIcon = ({ type, size = 24, isMain = false }) => {
  const iconProps = { 
    size, 
    color: isMain ? 'white' : '#9CA3AF'
  };
  
  switch (type) {
    case 'sun':
      return <WiDaySunny {...iconProps} />;
    case 'rain':
      return <WiRain {...iconProps} />;
    case 'cloud':
      return <WiCloudy {...iconProps} />;
    case 'wind':
      return <WiStrongWind {...iconProps} />;
    default:
      return <WiDaySunny {...iconProps} />;
  }
};

function Modal() {
  const { isModalOpen, selectedCity, dispatch } = useAppContext();

  if (!isModalOpen || !selectedCity) return null;

  // selectedCity is now the entire WeatherAPI response
  const { current, location } = selectedCity;
  
  return (
    <div className="modal-overlay">
      <div className="modal-weather">
        <div className="weather-main">
          <div className="weather-date">
            {formatDate(current.last_updated)}
          </div>
          <div className="weather-city">
            {location.name}, {location.country}
          </div>
          
          <div className="weather-icon">
            <WeatherIcon 
              type={getWeatherIcon(current.condition.text)} 
              size={48} 
              isMain={true} 
            />
          </div>
          
          <div className="weather-condition">
            {current.condition.text.toUpperCase()}
          </div>
          <div className="weather-temp">
            {Math.round(current.temp_c)}°
          </div>
        </div>
        
        <div className="weather-info">
          <div className="info-grid">
            <div className="info-item">
              <div className="info-label">Feels Like</div>
              <div className="info-value">{Math.round(current.feelslike_c)}°</div>
            </div>
            <div className="info-item">
              <div className="info-label">Humidity</div>
              <div className="info-value">{current.humidity}%</div>
            </div>
            <div className="info-item">
              <div className="info-label">Wind</div>
              <div className="info-value">{current.wind_kph} km/h</div>
            </div>
            <div className="info-item">
              <div className="info-label">Pressure</div>
              <div className="info-value">{current.pressure_mb} mb</div>
            </div>
            <div className="info-item">
              <div className="info-label">Visibility</div>
              <div className="info-value">{current.vis_km} km</div>
            </div>
            <div className="info-item">
              <div className="info-label">UV Index</div>
              <div className="info-value">{current.uv}</div>
            </div>
          </div>
        </div>
        
        <div className="modal-footer">
          <button 
            className="close-btn"
            onClick={() => {
              dispatch({type: "SELECT_CITY",payload: null})
              dispatch({ type: "CLOSE_MODAL" })}}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;