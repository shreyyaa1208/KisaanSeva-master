import React, { useState, useEffect } from "react";
import { Cloud, Sun, Droplets, Thermometer } from "lucide-react";
import "./styles.css";

const API_URL = "https://kisaanseva-backend-main.onrender.com";

const FertilizerDashboard = () => {
  const [formData, setFormData] = useState({
    temp: "",
    humidity: "",
    moisture: "",
    soil: "",
    crop: "",
    N: "",
    P: "",
    K: "",
  });

  const [prediction, setPrediction] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentStage, setCurrentStage] = useState("Tillering");

  // Mock weather data - you can replace with actual weather API
  const [weather, setWeather] = useState({
    temperature: "32°C",
    humidity: "65%",
    condition: "sunny",
  });

  const soilTypes = ["Sandy", "Loamy", "Clay", "Red", "Clayey", "Black"];
  const cropTypes = [
    "Wheat",
    "Rice",
    "Maize",
    "Cotton",
    "Sugarcane",
    "Potato",
    "Tomato",
    "Groundnut",
  ];

  const growthStages = [
    { name: "Germination", status: "completed" },
    { name: "Seeding", status: "completed" },
    { name: "Tillering", status: "current" },
    { name: "Heading", status: "upcoming" },
    { name: "Ripening", status: "upcoming" },
  ];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const predictFertilizer = async () => {
    const numericFields = ["temp", "humidity", "moisture", "N", "P", "K"];
    if (
      numericFields.some(
        (field) =>
          formData[field].trim() === "" ||
          !Number.isFinite(Number(formData[field]))
      ) ||
      !formData.soil ||
      !formData.crop
    ) {
      setErrorMessage("Enter valid values and select a soil and crop type.");
      return;
    }

    setErrorMessage("");
    setPrediction("");
    setLoading(true);
    try {
      const response = await fetch(
        `${API_URL}/api/predict-fertilizer`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Fertilizer prediction failed.");
      }
      if (typeof data.prediction !== "string" || !data.prediction) {
        throw new Error("The prediction service returned no fertilizer.");
      }
      setPrediction(data.prediction);
    } catch (error) {
      console.error("Error predicting fertilizer:", error);
      setErrorMessage(error.message || "Unable to predict fertilizer. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fert-dashboard">
      <header className="fert-header">
        <div className="fert-header-content">
          <div className="fert-logo">
            <span className="fert-logo-icon">🌱</span>
            <span className="fert-logo-text">KisaanSeva</span>
          </div>

          <div className="fert-header-actions"></div>
        </div>
      </header>

      <main className="fert-main-content">
        <div className="fert-page-header">
          <h1 className="fert-page-title">Fertilizer Prediction</h1>
          <p className="fert-page-subtitle">Growing Season: Spring - Summer</p>
          <div className="fert-crop-info">
            <span className="fert-crop-name">Wheat</span>
          </div>
        </div>

        <div className="fert-dashboard-grid">
          {/* Soil Analysis */}
          <div className="fert-card soil-analysis">
            <div className="fert-card-header">
              <div className="fert-status-indicator active"></div>
              <h3>Soil Analysis</h3>
            </div>
            <div className="soil-metrics">
              <div className="metric">
                <span className="metric-label">pH Level:</span>
                <span className="metric-value">6.5</span>
              </div>
              <div className="metric">
                <span className="metric-label">Moisture:</span>
                <span className="metric-value">{formData.moisture}%</span>
              </div>
            </div>
          </div>
          {/* Weather */}
          <div className="card weather">
            <h3>Weather</h3>
            <div className="weather-info">
              <div className="weather-item">
                {weather.condition === "sunny" ? (
                  <Sun size={20} />
                ) : (
                  <Cloud size={20} />
                )}
                <span>{weather.temperature}</span>
              </div>
              <div className="weather-item">
                <Droplets size={20} />
                <span>{weather.humidity}</span>
              </div>
            </div>
          </div>
          {/* Nutrient Levels */}
          <div className="card nutrients">
            <div className="nutrient-item nitrogen">
              <h4>Nitrogen</h4>
              <p>Current: Optimal 35-40</p>
            </div>
            <div className="nutrient-item phosphorus">
              <h4>Phosphorus</h4>
              <p>Current: Optimal 35-40</p>
            </div>
            <div className="nutrient-item potassium">
              <h4>Potassium</h4>
              <p>Current: Optimal 35-40</p>
            </div>
          </div>
          {/* Prediction Form */}
          <div className="card predict-form">
            <h3>Predict Fertilizer</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Temperature</label>
                <input
                  type="number"
                  value={formData.temp}
                  onChange={(e) => handleInputChange("temp", e.target.value)}
                  className="form-input"
                  placeholder="Enter temperature"
                />
              </div>
              <div className="form-group">
                <label>Humidity</label>
                <input
                  type="number"
                  value={formData.humidity}
                  onChange={(e) =>
                    handleInputChange("humidity", e.target.value)
                  }
                  className="form-input"
                  placeholder="Enter humidity"
                />
              </div>
              <div className="form-group">
                <label>Moisture</label>
                <input
                  type="number"
                  value={formData.moisture}
                  onChange={(e) =>
                    handleInputChange("moisture", e.target.value)
                  }
                  className="form-input"
                  placeholder="Enter moisture"
                />
              </div>
              <div className="form-group">
                <label>Soil Type</label>
                <select
                  value={formData.soil}
                  onChange={(e) => handleInputChange("soil", e.target.value)}
                  className="form-select"
                >
                  <option value="">Select Soil</option>
                  {soilTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Crop Type</label>
                <select
                  value={formData.crop}
                  onChange={(e) => handleInputChange("crop", e.target.value)}
                  className="form-select"
                >
                  <option value="">Select Crop</option>
                  {cropTypes.map((crop) => (
                    <option key={crop} value={crop}>
                      {crop}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Nitrogen</label>
                <input
                  type="number"
                  value={formData.N}
                  onChange={(e) => handleInputChange("N", e.target.value)}
                  className="form-input"
                  placeholder="Enter N value"
                />
              </div>
              <div className="form-group">
                <label>Potassium</label>
                <input
                  type="number"
                  value={formData.K}
                  onChange={(e) => handleInputChange("K", e.target.value)}
                  className="form-input"
                  placeholder="Enter K value"
                />
              </div>
              <div className="form-group">
                <label>Phosphorus</label>
                <input
                  type="number"
                  value={formData.P}
                  onChange={(e) => handleInputChange("P", e.target.value)}
                  className="form-input"
                  placeholder="Enter P value"
                />
              </div>
            </div>
            <button
              onClick={predictFertilizer}
              disabled={loading}
              className="predict-btn"
            >
              {loading ? "Predicting..." : "Predict Fertilizer"}
            </button>
            {errorMessage && (
              <p className="error-message" role="alert">
                {errorMessage}
              </p>
            )}
            {prediction && (
              <div className="prediction-result">
                <h4>Recommended Fertilizer:</h4>
                <p>{prediction}</p>
              </div>
            )}
          </div>

          <div className="card growth-stage">
            <h3>Crop Growth Stage</h3>
            <div className="growth-timeline">
              {growthStages.map((stage, index) => (
                <div key={stage.name} className={`stage-item ${stage.status}`}>
                  <div className="stage-indicator">
                    {stage.status === "completed" && <span>✓</span>}
                    {stage.status === "current" && <span>●</span>}
                    {stage.status === "upcoming" && <span>○</span>}
                  </div>
                  <span className="stage-name">{stage.name}</span>
                </div>
              ))}
            </div>
            <div className="stage-details">
              <p>
                <strong>Current Stage:</strong> {currentStage}
              </p>
              <p>
                <strong>Days Since Planting:</strong> 45
              </p>
              <p>
                <strong>Estimated Days to Harvest:</strong> 75
              </p>
            </div>
          </div>
          {/* Smart Suggestions */}
          <div className="card suggestions">
            <h3>Smart Suggestions</h3>
            <p>
              Based on current weather patterns and market prices, we recommend
              considering these alternative fertilizers.
            </p>
          </div>
          {/* Nutrient History */}
          <div className="card nutrient-history">
            <h3>Nutrient History</h3>
            <div className="chart-placeholder">
              <p>Interactive Nutrient History Graph</p>
              <div className="mock-chart">
                <div className="chart-bar" style={{ height: "60%" }}></div>
                <div className="chart-bar" style={{ height: "80%" }}></div>
                <div className="chart-bar" style={{ height: "70%" }}></div>
                <div className="chart-bar" style={{ height: "90%" }}></div>
                <div className="chart-bar" style={{ height: "85%" }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="action-buttons">
          <button className="action-btn">📊 View Report</button>
          <button className="action-btn">⚖️ Compare Options</button>
          <button className="action-btn">📄 Download PDF</button>
        </div>
      </main>
    </div>
  );
};

export default FertilizerDashboard;
