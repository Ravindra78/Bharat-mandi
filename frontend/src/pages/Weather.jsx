import { Cloud, Droplets, WindArrowDown, Eye, Gauge } from "lucide-react";

const Weather = () => {
  const weatherData = [
    {
      region: "Maharashtra",
      temp: 28,
      humidity: 65,
      windSpeed: 12,
      rainfall: "15mm",
      advisory: "Moderate temperature, ideal planting season",
    },
    {
      region: "Punjab",
      temp: 22,
      humidity: 58,
      windSpeed: 18,
      rainfall: "8mm",
      advisory: "Cool weather, good for wheat cultivation",
    },
    {
      region: "Gujarat",
      temp: 31,
      humidity: 72,
      windSpeed: 14,
      rainfall: "22mm",
      advisory: "High temperature, ensure irrigation",
    },
    {
      region: "Karnataka",
      temp: 26,
      humidity: 70,
      windSpeed: 10,
      rainfall: "18mm",
      advisory: "Moderate weather, suitable for coffee & spices",
    },
  ];

  const forecast = [
    {
      day: "Today",
      high: 32,
      low: 20,
      condition: "Sunny",
      weatherImage:
        "https://static.vecteezy.com/system/resources/previews/007/637/871/non_2x/cute-summer-sunny-day-weather-character-smiling-with-clouds-in-yellow-background-illustration-vector.jpg",
      rainfall: "0mm",
    },
    {
      day: "Tomorrow",
      high: 31,
      low: 19,
      condition: "Partly Cloudy",
      weatherImage:
        "https://thumbs.dreamstime.com/b/partly-sunny-weather-15076999.jpg",
      rainfall: "2mm",
    },
    {
      day: "Day 3",
      high: 28,
      low: 18,
      condition: "Light Rain",
      weatherImage: "https://img.icons8.com/ultraviolet/1200/light-rain.jpg",
      rainfall: "15mm",
    },
    {
      day: "Day 4",
      high: 29,
      low: 19,
      condition: "Rainy",
      weatherImage:
        "https://friendlystock.com/wp-content/uploads/2021/07/4-weather-emoji-rainy-cartoon-clipart.jpg",
      rainfall: "25mm",
    },
    {
      day: "Day 5",
      high: 30,
      low: 20,
      condition: "Clear",
      weatherImage:
        "https://png.pngtree.com/thumb_back/fh260/background/20220903/pngtree-clear-weather-with-white-clouds-against-a-blue-sky-photo-image_39002894.jpg",
      rainfall: "0mm",
    },
  ];

  const alerts = [
    {
      type: "Heat Wave",
      severity: "High",
      message:
        "Extreme heat expected in Gujarat region. Increase irrigation frequency.",
    },
    {
      type: "Heavy Rainfall",
      severity: "Medium",
      message:
        "Heavy rainfall expected in Punjab next week. Plan harvesting accordingly.",
    },
    {
      type: "Frost Warning",
      severity: "Low",
      message: "Mild frost in northern regions. Protect seedlings.",
    },
  ];

  return (
    <div className="bg-white min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-2xl p-12 mb-16">
          <h1 className="text-5xl font-bold mb-4">
            Agricultural Weather Dashboard
          </h1>
          <p className="text-xl font-light">
            Real-time weather data and forecasts for your farming decisions
          </p>
        </div>

        {/* Regional Weather */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-8">
            Regional Weather Status
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {weatherData.map((data, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border-2 border-blue-200 p-6 hover:shadow-xl transition-all"
              >
                <h3 className="text-2xl font-bold text-slate-900 mb-6">
                  {data.region}
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center justify-between bg-white rounded-lg p-3">
                    <span className="flex items-center gap-2 text-slate-700">
                      <span className="text-2xl">🌡️</span> Temperature
                    </span>
                    <span className="text-2xl font-bold text-orange-600">
                      {data.temp}°C
                    </span>
                  </div>

                  <div className="flex items-center justify-between bg-white rounded-lg p-3">
                    <span className="flex items-center gap-2 text-slate-700">
                      <Droplets size={20} className="text-blue-600" /> Humidity
                    </span>
                    <span className="text-2xl font-bold text-blue-600">
                      {data.humidity}%
                    </span>
                  </div>

                  <div className="flex items-center justify-between bg-white rounded-lg p-3">
                    <span className="flex items-center gap-2 text-slate-700">
                      <WindArrowDown size={20} className="text-teal-600" /> Wind
                      Speed
                    </span>
                    <span className="text-2xl font-bold text-teal-600">
                      {data.windSpeed} km/h
                    </span>
                  </div>

                  <div className="flex items-center justify-between bg-white rounded-lg p-3">
                    <span className="flex items-center gap-2 text-slate-700">
                      <Gauge size={20} className="text-blue-600" /> Rainfall
                    </span>
                    <span className="text-2xl font-bold text-blue-700">
                      {data.rainfall}
                    </span>
                  </div>
                </div>

                <div className="bg-teal-100 border-l-4 border-teal-600 rounded-lg p-4 mt-6">
                  <p className="text-sm text-teal-900 font-light">
                    <strong>Advisory:</strong> {data.advisory}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5-Day Forecast */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-8">
            5-Day Forecast
          </h2>
          <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl p-8 border-2 border-slate-200">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {forecast.map((day, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl overflow-hidden border border-slate-200 hover:shadow-lg transition-all text-center"
                >
                  <div className="h-24 overflow-hidden">
                    <img
                      src={day.weatherImage}
                      alt={day.condition}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold text-slate-900 mb-2">{day.day}</h4>
                    <p className="text-sm font-light text-slate-700 mb-3">
                      {day.condition}
                    </p>
                    <div className="space-y-1 text-xs">
                      <p>
                        <span className="font-semibold text-orange-600">
                          {day.high}°
                        </span>{" "}
                        / <span className="text-blue-600">{day.low}°</span>
                      </p>
                      <p className="text-slate-600">Rain: {day.rainfall}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Weather Alerts */}
        <section>
          <h2 className="text-4xl font-bold text-slate-900 mb-8">
            Weather Alerts
          </h2>
          <div className="space-y-4">
            {alerts.map((alert, idx) => (
              <div
                key={idx}
                className={`bg-white border-l-4 rounded-lg p-6 shadow-md hover:shadow-lg transition-all ${
                  alert.severity === "High"
                    ? "border-red-400"
                    : alert.severity === "Medium"
                      ? "border-orange-400"
                      : "border-yellow-400"
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-slate-900">
                    {alert.type}
                  </h3>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      alert.severity === "High"
                        ? "bg-red-100 text-red-700"
                        : alert.severity === "Medium"
                          ? "bg-orange-100 text-orange-700"
                          : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {alert.severity}
                  </span>
                </div>
                <p className="text-slate-700 font-light">{alert.message}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Weather;
