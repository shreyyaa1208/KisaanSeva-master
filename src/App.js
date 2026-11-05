import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.jsx";
import Banner from "./components/Banner/Banner.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Fertilizer from "./components/Fertilizer/Fertilizer.jsx";
import Crop from "./components/Crop/Crop.jsx";
import Disease from "./components/Disease/Disease.jsx";
import ChatBox from "./components/ChatBox/ChatBox.jsx";

// Import the Language Provider
import { LanguageProvider } from "./components/Language/Language.jsx"; // adjust path as needed

function App() {
  return (
    <LanguageProvider>
      <div className="App">
        <Navbar />

        <Routes>
          <Route path="/" element={<Banner />} />
          <Route path="/fertilizer-prediction" element={<Fertilizer />} />
          <Route path="/crop-recommendation" element={<Crop />} />
          <Route path="/disease-detection" element={<Disease />} />
        </Routes>

        <ChatBox />
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;