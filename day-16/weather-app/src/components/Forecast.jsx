function Forecast({ forecast }) {
  if (!forecast) {
    return null;
  }

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

  const getDayName = (date) => {
    return new Date(date + "T12:00:00").toLocaleDateString("en-US", {
      weekday: "long",
    });
  };

  return (
    <div className="forecast">
      <h2>5-Day Forecast</h2>

      <div className="forecast-list">
        {forecast.time.map((date, index) => (
          <div className="forecast-card" key={date}>
            <h3>{getDayName(date)}</h3>

            <p>
              {weatherConditions[forecast.weather_code[index]] ||
                "Unknown Weather"}
            </p>

            <div className="forecast-temperatures">
              <span>
                Max: {forecast.temperature_2m_max[index]}°C
              </span>

              <span>
                Min: {forecast.temperature_2m_min[index]}°C
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Forecast;