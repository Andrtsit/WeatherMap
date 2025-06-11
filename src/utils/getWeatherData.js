import toast from "react-hot-toast";

export async function getWeatherData(query) {

  try {
  const response = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=4887801d6c2b40a08fd202818241712&q=${query}`
  );
  if (!response.ok) throw new Error('Cannot find the inputed city , please try another one')
  const data = await response.json();
  return data;
  } catch (err) {
    toast.error(err.message)
  }

}
