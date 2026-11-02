function CityList({ cities, onSelectCity }) {
  if (!cities || cities.length === 0) {
    return null;
  }

  return (
    <div className="city-list">
      <h3>Search Results</h3>

      {cities.map((city) => (
        <div className="city-item" key={city.id}>
          <div>
            <strong>{city.name}</strong>
            <p>
              {city.admin1 ? `${city.admin1}, ` : ""}
              {city.country}
            </p>
          </div>

          <button onClick={() => onSelectCity(city)}>
            Select
          </button>
        </div>
      ))}
    </div>
  );
}

export default CityList;