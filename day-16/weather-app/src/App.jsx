import { useState } from "react";
import SearchBar from "./components/SearchBar";
import CityList from "./components/CityList";
import CurrentWeather from "./components/CurrentWeather";
import Forecast from "./components/Forecast";
import RecentSearches from "./components/RecentSearches";
import useLocalStorage from "./hooks/useLocalStorage";
import "./App.css";

function App() {
  const [search, setSearch] = useState("");
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const [recentCities, setRecentCities] = useLocalStorage(
    "recentCities",
    []
  );

  const searchCity = async () => {
    if (!search.trim()) {
      setError("Please enter a city name.");
      return;
    }

    setLoading(true);
    setError("");
    setWeather(null);
    setForecast(null);
    setSelectedCity(null);
    setHasSearched(true);

    try {
      const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(search)}&count=5`
      );

      if (!response.ok) {
        throw new Error("Unable to search for city.");
      }

      const data = await response.json();

      if (!data.results || data.results.length === 0) {
        setCities([]);
        setError("City not found. Please try another city.");
        return;
      }

      setCities(data.results);
    } catch {
      setError("Unable to search city. Please check your internet connection.");
    } finally {
      setLoading(false);
    }
  };

  const selectCity = async (city) => {
    setLoading(true);
    setError("");
    setCities([]);
    setSelectedCity(city);
    setWeather(null);
    setForecast(null);

    try {
      const url =
        `https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}` +
        `&longitude=${city.longitude}` +
        `&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code` +
        `&daily=weather_code,temperature_2m_max,temperature_2m_min` +
        `&forecast_days=5&timezone=auto`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Unable to fetch weather.");
      }

      const data = await response.json();

      setWeather(data);
      setForecast(data.daily);

      const updatedCity = {
        id: city.id,
        name: city.name,
        country: city.country,
        admin1: city.admin1 || "",
        latitude: city.latitude,
        longitude: city.longitude,
      };

      setRecentCities((previousCities) => {
        const filteredCities = previousCities.filter(
          (item) => item.id !== updatedCity.id
        );

        return [updatedCity, ...filteredCities].slice(0, 5);
      });
    } catch {
      setError("Unable to load weather. Please check your internet connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <h1>Weather App</h1>

      <p>Check current weather and a 5-day forecast.</p>

      <SearchBar
        search={search}
        setSearch={setSearch}
        onSearch={searchCity}
      />

      {loading && <p className="loading">Loading weather data...</p>}

      {error && <p className="error">{error}</p>}

      {!loading && !error && !hasSearched && (
        <p className="empty-state">
          Search for a city to see the weather.
        </p>
      )}

      <CityList
        cities={cities}
        onSelectCity={selectCity}
      />

      <RecentSearches
        recentCities={recentCities}
        onSelectCity={selectCity}
      />

      {weather && selectedCity && (
        <>
          <CurrentWeather
            weather={weather}
            city={selectedCity}
          />

          <Forecast forecast={forecast} />
        </>
      )}
    </div>
  );
}

export default App;