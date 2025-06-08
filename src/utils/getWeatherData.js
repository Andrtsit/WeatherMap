export async function getWeatherData(query) {
  const response = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=4887801d6c2b40a08fd202818241712&q=${query}`
  );
  const data = await response.json();
  return data;
}
