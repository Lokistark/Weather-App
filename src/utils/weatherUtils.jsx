import { Sun, Cloud, CloudRain, CloudSnow, CloudLightning, CloudDrizzle, CloudFog } from 'lucide-react';

export const getWeatherIcon = (code, className = "w-16 h-16") => {
    // WMO Weather interpretation codes (WW)
    if (code === 0) return <Sun className={`${className} text-yellow-400`} />;
    if ([1, 2, 3].includes(code)) return <Cloud className={`${className} text-gray-300`} />;
    if ([45, 48].includes(code)) return <CloudFog className={`${className} text-gray-400`} />;
    if ([51, 53, 55, 56, 57].includes(code)) return <CloudDrizzle className={`${className} text-blue-300`} />;
    if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return <CloudRain className={`${className} text-blue-500`} />;
    if ([71, 73, 75, 77, 85, 86].includes(code)) return <CloudSnow className={`${className} text-white`} />;
    if ([95, 96, 99].includes(code)) return <CloudLightning className={`${className} text-purple-400`} />;

    return <Sun className={`${className} text-yellow-400`} />;
};

export const getWeatherDescription = (code) => {
    const codes = {
        0: 'Clear sky',
        1: 'Mainly clear', 2: 'Partly cloudy', 3: 'Overcast',
        45: 'Fog', 48: 'Depositing rime fog',
        51: 'Light Drizzle', 53: 'Moderate Drizzle', 55: 'Dense Drizzle',
        56: 'Light Freezing Drizzle', 57: 'Dense Freezing Drizzle',
        61: 'Slight Rain', 63: 'Moderate Rain', 65: 'Heavy Rain',
        66: 'Light Freezing Rain', 67: 'Heavy Freezing Rain',
        71: 'Slight Snow', 73: 'Moderate Snow', 75: 'Heavy Snow',
        77: 'Snow grains',
        80: 'Slight Rain Showers', 81: 'Moderate Rain Showers', 82: 'Violent Rain Showers',
        85: 'Slight Snow Showers', 86: 'Heavy Snow Showers',
        95: 'Thunderstorm', 96: 'Thunderstorm with slight hail', 99: 'Thunderstorm with heavy hail',
    };
    return codes[code] || 'Unknown';
};
