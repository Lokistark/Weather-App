import React, { useEffect, useState } from 'react';
import './WeatherBackground.css';

const WeatherBackground = ({ weatherCode, isDay = 1 }) => {
    const [elements, setElements] = useState([]);

    useEffect(() => {
        const generateElements = () => {
            const count = 50; // Number of particles
            const newElements = [];

            // Rain: 51, 53, 55, 61, 63, 65, 66, 67, 80, 81, 82
            if ([51, 53, 55, 61, 63, 65, 66, 67, 80, 81, 82, 95, 96, 99].includes(weatherCode)) {
                for (let i = 0; i < 100; i++) {
                    newElements.push({
                        id: i,
                        type: 'rain',
                        style: {
                            left: `${Math.random() * 100}%`,
                            animationDuration: `${0.5 + Math.random() * 0.5}s`,
                            animationDelay: `${Math.random() * 2}s`
                        }
                    });
                }
            }
            // Snow: 71, 73, 75, 77, 85, 86
            else if ([71, 73, 75, 77, 85, 86].includes(weatherCode)) {
                for (let i = 0; i < 50; i++) {
                    newElements.push({
                        id: i,
                        type: 'snow',
                        style: {
                            left: `${Math.random() * 100}%`,
                            width: `${Math.random() * 5 + 2}px`,
                            height: `${Math.random() * 5 + 2}px`,
                            animationDuration: `${3 + Math.random() * 5}s`,
                            animationDelay: `${Math.random() * 5}s`
                        }
                    });
                }
            }
            // Clouds: 1, 2, 3, 45, 48
            else if ([1, 2, 3, 45, 48].includes(weatherCode)) {
                for (let i = 0; i < 5; i++) {
                    newElements.push({
                        id: i,
                        type: 'cloud',
                        style: {
                            top: `${Math.random() * 40}%`,
                            width: `${100 + Math.random() * 200}px`,
                            height: `${100 + Math.random() * 200}px`,
                            animationDuration: `${20 + Math.random() * 20}s`,
                            animationDelay: `${Math.random() * -20}s`
                        }
                    });
                }
            }
            // Clear: 0
            else if (weatherCode === 0) {
                newElements.push({ id: 1, type: 'sun' });
            }

            setElements(newElements);
        };

        generateElements();
    }, [weatherCode]);

    // Determine background gradient based on weather
    const getGradient = () => {
        // Thunderstorm
        if ([95, 96, 99].includes(weatherCode)) return 'from-gray-900 via-slate-900 to-black';
        // Rain
        if ([51, 53, 55, 61, 63, 65, 66, 67, 80, 81, 82].includes(weatherCode)) return 'from-slate-800 via-gray-800 to-slate-900';
        // Snow
        if ([71, 73, 75, 77, 85, 86].includes(weatherCode)) return 'from-blue-900 via-slate-800 to-gray-900';
        // Clear Day
        if (weatherCode === 0 && isDay) return 'from-blue-400 via-blue-600 to-blue-800';
        // Clear Night
        if (weatherCode === 0 && !isDay) return 'from-gray-900 via-blue-900 to-black';
        // Cloudy
        return 'from-gray-700 via-slate-600 to-gray-800';
    };

    return (
        <div className={`fixed inset-0 w-full h-full bg-gradient-to-br ${getGradient()} -z-10 transition-all duration-1000`}>
            {[95, 96, 99].includes(weatherCode) && (
                <div className="weather-thunder">
                    <div className="lightning-flash"></div>
                </div>
            )}

            {elements.length > 0 && elements[0].type === 'rain' && (
                <div className="weather-rain">
                    {elements.map(el => <div key={el.id} className="rain-drop" style={el.style} />)}
                </div>
            )}

            {elements.length > 0 && elements[0].type === 'snow' && (
                <div className="weather-snow">
                    {elements.map(el => <div key={el.id} className="snow-flake" style={el.style} />)}
                </div>
            )}

            {elements.length > 0 && elements[0].type === 'cloud' && (
                <div className="weather-clouds">
                    {elements.map(el => <div key={el.id} className="cloud" style={el.style} />)}
                </div>
            )}

            {elements.length > 0 && elements[0].type === 'sun' && isDay && (
                <div className="weather-clear">
                    <div className="sun-ray" />
                </div>
            )}
        </div>
    );
};

export default WeatherBackground;
