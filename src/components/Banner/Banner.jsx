import React from "react";
import "./Banner.css";
import Image1 from "../../assets/image1.png";
import { LanguageSelector, useLanguage } from "../Language/Language";

function Banner() {
  const { t } = useLanguage();
  return (
    <>
      <div className="banner-container">
        <div className="banner">
          <h1 className="header-text">
            {t("welcome")}
            <br />
            <span className="sub-header-highlight">{t("subtitle")}</span>
          </h1>

          <p className="sub-text">{t("description")}</p>

          <button className="explore-button">{t("exploreNow")}</button>
        </div>

        <div className="image-container">
          <div className="banner-image-wrapper">
            <img src={Image1} alt="Agriculture" className="banner-image" />
          </div>
        </div>
      </div>{" "}
      {/* closes .banner-container properly */}
      <div className="what-we-offer-section">
        <div className="section-header">
          <span className="green-dot">●</span>
          <span className="folder-icon">📁</span>
          <h1 className="banner-header">What We Offer to Farmers</h1>
        </div>

        <p className="section-subtitle">
          Explore our cutting-edge AI-driven solutions crafted to transform
          farming practices for the better.
        </p>

        <div className="banner-cards">
          <div className="sub-card">
            <div className="card-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M3 3h18v18H3zM9 9h6v6H9z" />
              </svg>
            </div>
            <h3>Responsive Design</h3>
            <p>
              Our platform is designed to be fully responsive, ensuring a
              seamless experience on any device. Farmers can access our tools
              and resources on-the-go, whether on a smartphone, tablet, or
              desktop.
            </p>
          </div>

          <div className="sub-card">
            <div className="card-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
              </svg>
            </div>
            <h3>Comprehensive Models</h3>
            <p>
              KisaanSeva platform offers various machine learning models for
              accurate predictions. These models help farmers to make informed
              decisions about crop management, soil health, and pest control.
            </p>
          </div>

          <div className="sub-card">
            <div className="card-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
            </div>
            <h3>User-Friendly Interface</h3>
            <p>
              Our intuitive interface allows farmers to easily navigate
              throughout the platform and utilize the AI tools to solve their
              problems. The platform is designed to be accessible even for users
              with limited technical knowledge.
            </p>
          </div>

          <div className="sub-card">
            <div className="card-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <rect x="7" y="7" width="3" height="9" />
                <rect x="14" y="7" width="3" height="5" />
              </svg>
            </div>
            <h3>Customizable Solutions</h3>
            <p>
              KisaanSetu provides customizable solutions tailored to the unique
              needs of each farm. Farmers can adjust parameters to get the most
              accurate and relevant predictions by using AI tools for their
              specific conditions.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Banner;
