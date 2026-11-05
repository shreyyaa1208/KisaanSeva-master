import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {/* Brand Section */}
          <div className="brand-section">
            <div className="logo">
              <div className="logo-icon">
                <div className="leaf"></div>
              </div>
              <span className="logo-text">KisaanSeva</span>
            </div>
            <p className="brand-description">
              KisaanSeva platform provides cutting-edge Machine Learning models
              for agricultural predictions and insights.
            </p>
          </div>

          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li>
                <Link to="/crop-recommendation">Crop Recommendation</Link>
              </li>
              <li>
                <Link to="/fertilizer-prediction">Fertilizer Prediction</Link>
              </li>
              <li>
                <Link to="/disease-detection">Disease Detection</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p className="copyright">
            Copyright © 2025 All Rights Reserved{" "}
            <span className="brand-highlight">KisaanSeva</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
