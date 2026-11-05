import React, { useState } from "react";
import "./styles.css";
import Image2 from "../../assets/image2.jpg";
import Image3 from "../../assets/image3.jpg";
import Image4 from "../../assets/image4.jpg";

const API_URL = "https://kisaanseva-backend-main.onrender.com";

const Crop = () => {
  const [formData, setFormData] = useState({
    nitrogen: "",
    phosphorus: "",
    potassium: "",
    temperature: "",
    humidity: "",
    ph: "",
    rainfall: "",
  });

  const [cropPrediction, setCropPrediction] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async () => {
    const values = Object.values(formData);
    if (values.some((value) => value.trim() === "" || !Number.isFinite(Number(value)))) {
      setErrorMessage("Enter a valid number for every field.");
      return;
    }
    if (Number(formData.ph) < 1 || Number(formData.ph) > 14) {
      setErrorMessage("Soil pH must be between 1 and 14.");
      return;
    }
    if (Number(formData.rainfall) < 1 || Number(formData.rainfall) > 300) {
      setErrorMessage("Rainfall must be between 1 and 300 mm.");
      return;
    }

    setErrorMessage("");
    setCropPrediction("");
    setLoading(true);
    const data = {
      temp: formData.temperature,
      humidity: formData.humidity,
      ph: formData.ph,
      rainfall: formData.rainfall,
      N: formData.nitrogen,
      P: formData.phosphorus,
      K: formData.potassium,
    };

    try {
      const response = await fetch(`${API_URL}/api/predict-crop`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Crop prediction failed.");
      }
      if (!result.recommendedCrop) {
        throw new Error("The prediction service returned no crop.");
      }
      setCropPrediction(result.recommendedCrop); // 🟢 Store prediction
    } catch (error) {
      console.error("API error:", error);
      setErrorMessage(error.message || "Unable to predict a crop. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2 className="heading">About Crop Recommendation Model</h2>
      <h3 className="subheading">
        Empowering Farmers with AI-Driven Crop Insights
      </h3>
      <p className="description">
        🌾 The Crop Recommendation System revolutionizes how farmers choose
        crops. It takes into account the mineral composition of the soil,
        including potassium, nitrogen and phosphorous, as well as factors like
        humidity, temperature and rainfall. By analyzing these factors, farmers
        can ensure optimal crop selection, leading to higher yields and
        sustainable farming practices.
      </p>

      <div className="how-it-works">
        <h4 className="how-it-works-title">😊 How it Works!</h4>
        <div className="feature">
          <span className="icon">🔵</span>
          <span>Analyze soil and environmental parameters.</span>
        </div>
        <div className="feature">
          <span className="icon">📊</span>
          <span>Get precise crop recommendations based on data.</span>
        </div>
        <div className="feature">
          <span className="icon">🌾</span>
          <span>Make informed decisions on crop management.</span>
        </div>
      </div>

      <div className="right-section">
        <h2 className="form-heading">Crop Recommendation</h2>

        <div className="circle-images">
          <div className="circle-wrapper">
            <img src={Image2} alt="Plant Growth" className="circle-img" />
          </div>
          <div className="circle-wrapper larger offset">
            <img src={Image3} alt="Watering Plant" className="circle-img" />
          </div>
          <div className="circle-wrapper">
            <img src={Image4} alt="Crop Field" className="circle-img" />
          </div>
        </div>
        <div className="form-container">
          <h3 className="form-title">Crop Recommendation</h3>
          <div className="form-grid">
            {[
              "nitrogen",
              "phosphorus",
              "potassium",
              "temperature",
              "humidity",
              "ph",
            ].map((field) => (
              <div key={field}>
                <label htmlFor={`crop-${field}`}>
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  id={`crop-${field}`}
                  type="number"
                  min={field === "ph" ? "1" : "0"}
                  max={field === "ph" ? "14" : undefined}
                  step="any"
                  name={field}
                  placeholder={field === "ph" ? "1 to 14" : ""}
                  value={formData[field]}
                  onChange={handleInputChange}
                />
              </div>
            ))}
            <div className="full-width">
              <label htmlFor="crop-rainfall">Rainfall</label>
              <input
                id="crop-rainfall"
                type="number"
                min="1"
                max="300"
                step="any"
                name="rainfall"
                placeholder="1 to 300 mm"
                value={formData.rainfall}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <button
            type="button"
            className="submit-button"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Predicting..." : "Predict Crop that is suitable"}
          </button>

          {errorMessage && (
            <p className="error-message" role="alert">
              {errorMessage}
            </p>
          )}
          {cropPrediction && (
            <div className="prediction-result">
              <h4>🌾 Recommended Crop:</h4>
              <p>{cropPrediction}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Crop;
