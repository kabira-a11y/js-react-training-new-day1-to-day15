function CurrentWeather({ weather, city }) {
  if (!weather) {
    return null;
  }

  const current = weather.current;

  const weatherConditions = {
    0: "Clear Sky",
    1: "Mainly Clear",
    2: "Partly Cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Fog",
    51: "Drizzle",
    53: "Drizzle",
    55: "Drizzle",
    61: "Rain",
    63: "Rain",
    65: "Heavy Rain",
    71: "Snow",
    73: "Snow",
    75: "Heavy Snow",
    80: "Rain Showers",
    81: "Rain Showers",
    82: "Heavy Rain Showers",
    95: "Thunderstorm",
    96: "Thunderstorm",
    99: "Thunderstorm",
  };

  const condition =
    weatherConditions[current.weather_code] || "Unknown Weather";

  return (
    <div className="current-weather">
      <h2>
        {city.name}, {city.country}
      </h2>

      <h1>{current.temperature_2m}°C</h1>

      <h3>{condition}</h3>

      <div className="weather-details">
        <p>Feels Like: {current.apparent_temperature}°C</p>
        <p>Humidity: {current.relative_humidity_2m}%</p>
        <p>Wind Speed: {current.wind_speed_10m} km/h</p>
      </div>
    </div>
  );
}

export default CurrentWeather;