import axios from 'axios';

const GEOCODING_API_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const WEATHER_API_URL = 'https://api.open-meteo.com/v1/forecast';

export const getCoordinates = async (city) => {
    try {
        const response = await axios.get(GEOCODING_API_URL, {
            params: {
                name: city,
                count: 1,
                language: 'en',
                format: 'json',
            },
        });

        if (!response.data.results || response.data.results.length === 0) {
            throw new Error('City not found');
        }

        const { latitude, longitude, name, country } = response.data.results[0];
        return { latitude, longitude, name, country };
    } catch (error) {
        throw error;
    }
};

export const getWeatherData = async (latitude, longitude) => {
    try {
        const response = await axios.get(WEATHER_API_URL, {
            params: {
                latitude,
                longitude,
                hourly: 'temperature_2m,rain,snowfall,snow_depth,apparent_temperature,relative_humidity_2m,precipitation,showers,visibility,weathercode',
                daily: 'temperature_2m_max,temperature_2m_min,weathercode',
                past_days: 0,
                forecast_days: 8,
                timezone: 'Asia/Kolkata',
                current_weather: true,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};
