import React, { useState } from "react";

import "./styles.css";

const API_URL = "https://kisaanseva-backend-main.onrender.com";

const Disease = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    } else {
      setSelectedFile(null);
    }
  };
  const handlePredict = async () => {
    if (!selectedFile) {
      setAlertMessage("Please select an image first.");
      setShowAlert(true);
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await fetch(
        `${API_URL}/api/predict-disease`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (response.ok) {
        if (typeof data.prediction === "string" && data.prediction) {
          setAlertMessage("Predicted Disease: " + data.prediction);
        } else {
          setAlertMessage("Prediction returned no label.");
        }
      } else {
        setAlertMessage("Prediction failed: " + data.error);
      }
    } catch (err) {
      setAlertMessage("Server error: " + err.message);
    }

    setShowAlert(true);
  };

  const closeAlert = () => {
    setShowAlert(false);
    setAlertMessage("");
  };
  return (
    <div className="container-wrapper">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          {/* Logo/Brand */}
          <div className="logo-brand">
            <svg
              className="logo-icon"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="brand-name">KisaanSetu</span>
          </div>
        </div>
      </header>

      {/* Main content moved outside header */}
      <main className="main-content">
        <div className="recognition-card">
          <h2 className="card-title">Plant Disease Detection</h2>
          <p className="card-description">
            Upload an image of your plant to identify potential diseases.
          </p>

          <div className="file-input-section">
            <label htmlFor="file-upload" className="file-upload-label">
              Choose File
            </label>
            <input
              type="file"
              id="file-upload"
              className="hidden-file-input"
              onChange={handleFileChange}
              accept="image/*"
            />
            <span id="file-name" className="file-name-display">
              {selectedFile ? selectedFile.name : "No file chosen"}
            </span>
          </div>

          <button onClick={handlePredict} className="predict-button">
            Predict
          </button>
        </div>
      </main>

      {/* Custom Alert Modal */}
      {showAlert && (
        <div className="custom-alert-overlay">
          <div className="custom-alert-box">
            <p className="custom-alert-message">{alertMessage}</p>
            <button className="custom-alert-button" onClick={closeAlert}>
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Disease;
