function RecentSearches({ recentCities, onSelectCity }) {
  if (recentCities.length === 0) {
    return null;
  }

  return (
    <div className="recent-searches">
      <h3>Recent Searches</h3>

      <div className="recent-buttons">
        {recentCities.map((city) => (
          <button
            key={city.id}
            onClick={() => onSelectCity(city)}
          >
            {city.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default RecentSearches;