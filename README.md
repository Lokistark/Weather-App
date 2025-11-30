# ☁️ Weather App

A beautiful and responsive React weather application that provides real-time weather information for any city worldwide using the OpenWeatherMap API.

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen.svg)](https://lokistark.github.io/Weather-App/)
[![React](https://img.shields.io/badge/React-19.2.0-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF.svg)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.18-38B2AC.svg)](https://tailwindcss.com/)

## 🌐 Live Demo

**🔗 [View Live Application](https://lokistark.github.io/Weather-App/)**

Experience the app in action! Search for any city and get instant weather updates.

---

## ✨ Features

- 🔍 **City Search** - Search for weather information by city name
- 🌡️ **Current Weather** - Real-time temperature, weather conditions, and descriptions
- 💨 **Detailed Metrics** - Wind speed, humidity, visibility, and feels-like temperature
- ⏰ **Hourly Forecast** - 24-hour weather forecast with temperature trends
- 📅 **8-Day Forecast** - Extended daily weather predictions
- 🎨 **Dynamic Backgrounds** - Weather-based background animations
- 📱 **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- 🌈 **Weather Icons** - Beautiful, intuitive weather condition icons
- ⚡ **Fast Performance** - Built with Vite for lightning-fast load times

---

## 🖼️ Screenshots

### Weather Dashboard
![Weather App Dashboard](https://raw.githubusercontent.com/Lokistark/Weather-App/master/Screenshot%202025-11-30%20133654.png)
*Beautiful, responsive weather dashboard showing real-time weather data, hourly forecast, and 8-day extended forecast*

---

> **💡 Tip:** You can add more screenshots by uploading them to the repository and adding them here using the format:
> ```markdown
> ![Description](https://raw.githubusercontent.com/Lokistark/Weather-App/master/your-image-name.png)
> ```

---

## 🛠️ Tech Stack

- **Frontend Framework:** React 19.2.0
- **Build Tool:** Vite 7.2.4
- **Styling:** TailwindCSS 3.4.18
- **HTTP Client:** Axios 1.13.2
- **Icons:** Lucide React 0.555.0
- **API:** OpenWeatherMap API
- **Deployment:** GitHub Pages

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- OpenWeatherMap API key ([Get one here](https://openweathermap.org/api))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Lokistark/Weather-App.git
   cd Weather-App
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory and add your OpenWeatherMap API key:
   ```env
   VITE_WEATHER_API_KEY=your_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:5173`

---

## 📦 Build for Production

```bash
npm run build
```

The optimized production build will be created in the `dist` folder.

---

## 🌍 Deployment

This project is configured for GitHub Pages deployment.

```bash
npm run deploy
```

This command will:
1. Build the production version
2. Deploy to GitHub Pages automatically

---

## 📁 Project Structure

```
Weather-App/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── WeatherDashboard.jsx    # Main dashboard component
│   │   ├── WeatherBackground.jsx   # Dynamic background component
│   │   └── ...
│   ├── services/
│   │   └── weatherService.js       # API service layer
│   ├── utils/
│   │   └── weatherUtils.js         # Utility functions
│   ├── App.jsx                     # Root component
│   ├── main.jsx                    # Entry point
│   └── index.css                   # Global styles
├── .gitignore
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

---

## 🎯 Key Components

### WeatherDashboard
The main component that handles:
- City search functionality
- Weather data fetching
- Display of current weather, hourly, and daily forecasts

### WeatherBackground
Provides dynamic, weather-based background animations for enhanced visual experience.

### weatherService
Handles all API calls to OpenWeatherMap:
- Geocoding (city to coordinates)
- Current weather data
- Forecast data

---

## 🔑 API Reference

This app uses the [OpenWeatherMap API](https://openweathermap.org/api):

- **Geocoding API** - Convert city names to coordinates
- **Current Weather API** - Get current weather data
- **One Call API** - Get hourly and daily forecasts

---

## 🎨 Features in Detail

### Search Functionality
- Type any city name
- Press Enter or click the search button
- Instant weather data retrieval

### Weather Metrics
- **Temperature** - Current, feels-like, min/max
- **Wind** - Speed and direction
- **Humidity** - Percentage
- **Visibility** - Distance in kilometers
- **Weather Condition** - Clear description with icons

### Forecast
- **Hourly** - Next 24 hours with temperature graph
- **Daily** - 8-day forecast with high/low temperatures

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👤 Author

**Lokistark**

- GitHub: [@Lokistark](https://github.com/Lokistark)
- Project Link: [https://github.com/Lokistark/Weather-App](https://github.com/Lokistark/Weather-App)

---

## 🙏 Acknowledgments

- [OpenWeatherMap](https://openweathermap.org/) for the weather API
- [Lucide Icons](https://lucide.dev/) for beautiful icons
- [TailwindCSS](https://tailwindcss.com/) for styling utilities
- [Vite](https://vitejs.dev/) for blazing fast build tool

---

## 📧 Support

If you have any questions or need help, please open an issue in the GitHub repository.

---

<div align="center">
  <p>Made with ❤️ by Lokistark</p>
  <p>⭐ Star this repo if you find it helpful!</p>
</div>
