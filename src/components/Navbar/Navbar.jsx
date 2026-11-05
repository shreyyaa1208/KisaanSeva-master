import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LanguageSelector, useLanguage } from "../Language/Language";

import "./styles.css"; // Or your correct path

const Navbar = () => {
  const { t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <div className="brand">KisaanSeva</div>

        <button
          type="button"
          className={`hamburger ${isMenuOpen ? "open" : ""}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMenuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <div className={`navbar-container ${isMenuOpen ? "show" : ""}`}>
        <Link to="/" onClick={() => setIsMenuOpen(false)}>{t("home")}</Link>
        <Link to="/crop-recommendation" onClick={() => setIsMenuOpen(false)}>{t("cropManagement")}</Link>
        <Link to="/fertilizer-prediction" onClick={() => setIsMenuOpen(false)}>{t("soilFertilizer")}</Link>
        <Link to="/disease-detection" onClick={() => setIsMenuOpen(false)}>{t("diseaseDetection")}</Link>
        <LanguageSelector />
      </div>
    </nav>
  );
};

export default Navbar;
