import { format, subDays } from "date-fns";

export async function fetchWeatherData(location) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${location.lat}&longitude=${location.lon}&hourly=temperature_2m,relativehumidity_2m,precipitation_probability,precipitation,rain,pressure_msl,cloudcover,visibility,windspeed_180m,winddirection_180m,uv_index,uv_index_clear_sky,is_day`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }
    const data = await response.json();
    return data;
}