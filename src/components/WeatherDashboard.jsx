import React, { useState, useEffect } from 'react';
import { Search, MapPin, Wind, Droplets, Eye, Thermometer, Calendar } from 'lucide-react';
import { getCoordinates, getWeatherData } from '../services/weatherService';
import { getWeatherIcon, getWeatherDescription } from '../utils/weatherUtils';

import WeatherBackground from './WeatherBackground';

const WeatherDashboard = () => {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchWeather = async (cityName) => {
        setWeather(null);
        try {
            setLoading(true);
            setError(null);
            const { latitude, longitude, name, country } = await getCoordinates(cityName);
            const data = await getWeatherData(latitude, longitude);
            setWeather({ ...data, name, country });
        } catch (err) {
            setError('City not found or network error.');
        } finally {
            setLoading(false);
        }
    };

    // Load default city "India" on mount
    useEffect(() => {
        fetchWeather('India');
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            fetchWeather(searchTerm);
            setSearchTerm('');
        }
    };

    // Extract data for rendering
    const current = weather?.current_weather;
    const hourly = weather?.hourly;
    const daily = weather?.daily;
    const currentHourIndex = (() => {
        if (!hourly?.time || !current?.time) return 0;
        const currentHourStr = current.time.slice(0, 13);
        const index = hourly.time.findIndex((t) => t.slice(0, 13) === currentHourStr);
        return index >= 0 ? index : 0;
    })();
    const humidity = hourly?.relative_humidity_2m?.[currentHourIndex];
    const apparentTemp = hourly?.apparent_temperature?.[currentHourIndex];
    const visibility = hourly?.visibility?.[currentHourIndex];

    if (loading && !weather) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white relative overflow-hidden">
                <WeatherBackground weatherCode={0} isDay={1} />
                <div className="animate-pulse text-2xl font-light z-10">Loading Weather...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen text-white font-sans p-4 md:p-8 relative">
            <WeatherBackground weatherCode={current?.weathercode} isDay={current?.is_day} />

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Header & Search */}
                <header className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-blue-500 rounded-lg bg-opacity-20 backdrop-blur-sm">
                            <MapPin className="text-blue-400" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold tracking-wide">{weather?.name}</h1>
                            <p className="text-sm text-gray-400">{weather?.country}</p>
                        </div>
                    </div>
                    <form onSubmit={handleSearch} className="relative w-full md:w-96">
                        <input
                            type="text"
                            placeholder="Search city..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-white/10 border border-white/20 rounded-xl py-3 px-5 pl-12 focus:outline-none focus:ring-2 focus:ring-blue-500/50 backdrop-blur-md transition-all placeholder-gray-400"
                        />
                        <Search className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
                        <button type="submit" className="hidden">Search</button>
                    </form>
                </header>

                {error && (
                    <div className="bg-red-500/20 border border-red-500/50 text-red-200 p-4 rounded-xl mb-8 text-center backdrop-blur-sm">
                        {error}
                    </div>
                )}

                {weather && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Weather Card */}
                        <div className="lg:col-span-2 space-y-8">
                            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md relative overflow-hidden group hover:bg-white/10 transition-all duration-500">
                                <div className="absolute -right-20 -top-20 w-64 h-64 bg-blue-500/30 rounded-full blur-3xl group-hover:bg-blue-500/40 transition-all" />
                                <div className="flex flex-col md:flex-row items-center justify-between relative z-10">
                                    <div className="text-center md:text-left">
                                        <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
                                            <span className="px-4 py-1 rounded-full bg-blue-500/20 text-blue-300 text-sm font-medium border border-blue-500/30">Today</span>
                                            <span className="text-gray-400 text-sm">
                                                {new Date().toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long' })}
                                            </span>
                                        </div>
                                        <h2 className="text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                                            {Math.round(current?.temperature)}°
                                        </h2>
                                        <p className="text-2xl text-gray-300 mt-2 font-light">
                                            {getWeatherDescription(current?.weathercode)}
                                        </p>
                                    </div>
                                    <div className="mt-8 md:mt-0 transform hover:scale-110 transition-transform duration-300">
                                        {getWeatherIcon(current?.weathercode, "w-40 h-40")}
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
                                    <StatCard icon={<Wind />} label="Wind" value={`${current?.windspeed} km/h`} />
                                    <StatCard icon={<Droplets />} label="Humidity" value={`${humidity}%`} />
                                    <StatCard icon={<Thermometer />} label="Feels Like" value={`${Math.round(apparentTemp)}°`} />
                                    <StatCard icon={<Eye />} label="Visibility" value={`${visibility / 1000} km`} />
                                </div>
                            </div>

                            {/* Hourly Forecast */}
                            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-md">
                                <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                                    <Calendar className="w-5 h-5 text-blue-400" />
                                    Hourly Forecast
                                </h3>
                                <div className="flex overflow-x-auto pb-4 gap-4 scrollbar-hide">
                                    {hourly?.time?.slice(currentHourIndex, currentHourIndex + 24).map((time, i) => {
                                        const idx = currentHourIndex + i;
                                        return (
                                            <div key={time} className="min-w-[100px] bg-white/5 rounded-2xl p-4 flex flex-col items-center justify-center border border-white/5 hover:bg-white/10 transition-colors">
                                                <span className="text-sm text-gray-400 mb-2">
                                                    {new Date(time).toLocaleTimeString('en-US', { hour: 'numeric' })}
                                                </span>
                                                <div className="mb-2">
                                                    {getWeatherIcon(hourly.weathercode?.[idx], "w-8 h-8")}
                                                </div>
                                                <span className="text-lg font-bold">
                                                    {Math.round(hourly.temperature_2m?.[idx])}°
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* 8-Day Forecast */}
                        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-md h-fit">
                            <h3 className="text-xl font-semibold mb-6">8-Day Forecast</h3>
                            <div className="space-y-4 max-h-[800px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/10">
                                {daily?.time?.slice(0, 8).map((time, i) => (
                                    <div key={time} className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors border-b border-white/5 last:border-0">
                                        <span className="w-24 text-gray-300">
                                            {new Date(time).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                                        </span>
                                        <div className="flex items-center gap-2">
                                            {getWeatherIcon(daily.weathercode?.[i], "w-8 h-8")}
                                        </div>
                                        <div className="flex gap-3 text-right w-24">
                                            <span className="font-bold">{Math.round(daily.temperature_2m_max?.[i])}°</span>
                                            <span className="text-gray-500">{Math.round(daily.temperature_2m_min?.[i])}°</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const StatCard = ({ icon, label, value }) => (
    <div className="bg-white/5 rounded-xl p-4 flex flex-col items-center justify-center gap-2 border border-white/5 hover:bg-white/10 transition-colors">
        <div className="text-gray-400">{icon}</div>
        <span className="text-sm text-gray-400">{label}</span>
        <span className="text-lg font-semibold">{value}</span>
    </div>
);

export default WeatherDashboard;
