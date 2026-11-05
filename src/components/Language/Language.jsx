import React, { useState, useEffect, createContext, useContext } from "react";
import "./styles.css";

// Create Language Context
const LanguageContext = createContext();

// Translation data for different languages
const translations = {
  en: {
    // Navigation
    home: "Home",
    cropManagement: "Crop Recommendation",
    soilFertilizer: "Fertilizer Prediction",
    diseaseDetection: "Disease Detection",
    tools: "Tools",
    help: "Help",
    login: "Login",

    // Main Content
    welcome: "Welcome to KisaanSeva",
    subtitle: "Revolutionizing Agriculture",
    description:
      "Explore AI-powered solutions tailored to enhance farming practices. From crop prediction to soil analysis, discover tools designed to optimize agricultural productivity.",
    exploreNow: "Explore Now",

    // Language names
    hindi: "Hindi",
    bengali: "Bengali",
    tamil: "Tamil",
    telugu: "Telugu",
    marathi: "Marathi",
    punjabi: "Punjabi (Gurmukhi)",
    english: "English",
  },
  hi: {
    // Navigation
    home: "होम",
    cropManagement: "फसल प्रबंधन",
    soilFertilizer: "मिट्टी और उर्वरक",
    diseaseDetection: "रोग का पता लगाना",
    tools: "उपकरण",
    help: "सहायता",
    login: "लॉगिन",

    // Main Content
    welcome: "किसानसेवा में आपका स्वागत है",
    subtitle: "कृषि में क्रांति",
    description:
      "कृषि प्रथाओं को बढ़ाने के लिए तैयार की गई AI-संचालित समाधानों का अन्वेषण करें। फसल की भविष्यवाणी से लेकर मिट्टी के विश्लेषण तक, कृषि उत्पादकता को अनुकूलित करने के लिए डिज़ाइन किए गए उपकरणों की खोज करें।",
    exploreNow: "अभी खोजें",

    // Language names
    hindi: "हिंदी",
    bengali: "बंगाली",
    tamil: "तमिल",
    telugu: "तेलुगु",
    marathi: "मराठी",
    punjabi: "पंजाबी (गुरमुखी)",
    english: "अंग्रेजी",
  },
  bn: {
    // Navigation
    home: "হোম",
    cropManagement: "ফসল ব্যবস্থাপনা",
    soilFertilizer: "মাটি ও সার",
    diseaseDetection: "রোগ সনাক্তকরণ",
    tools: "সরঞ্জাম",
    help: "সাহায্য",
    login: "লগইন",

    // Main Content
    welcome: "কিসানসেতুতে স্বাগতম",
    subtitle: "কৃষিতে বিপ্লব",
    description:
      "কৃষি অনুশীলন উন্নত করার জন্য তৈরি AI-চালিত সমাধানগুলি অন্বেষণ করুন। ফসলের ভবিষ্যদ্বাণী থেকে মাটি বিশ্লেষণ পর্যন্ত, কৃষি উৎপাদনশীলতা অপ্টিমাইজ করার জন্য ডিজাইন করা সরঞ্জামগুলি আবিষ্কার করুন।",
    exploreNow: "এখনই অন্বেষণ করুন",

    // Language names
    hindi: "হিন্দি",
    bengali: "বাংলা",
    tamil: "তামিল",
    telugu: "তেলুগু",
    marathi: "মারাঠি",
    punjabi: "পাঞ্জাবি (গুরমুখী)",
    english: "ইংরেজি",
  },
  ta: {
    // Navigation
    home: "முகப்பு",
    cropManagement: "பயிர் மேலாண்மை",
    soilFertilizer: "மண் மற்றும் உரம்",
    diseaseDetection: "நோய் கண்டறிதல்",
    tools: "கருவிகள்",
    help: "உதவி",
    login: "உள்நுழைவு",

    // Main Content
    welcome: "கிசான்செதுவுக்கு வரவேற்கிறோம்",
    subtitle: "விவசாயத்தில் புரட்சி",
    description:
      "விவசாய நடைமுறைகளை மேம்படுத்த வடிவமைக்கப்பட்ட AI-இயங்கும் தீர்வுகளை ஆராயுங்கள். பயிர் முன்னறிவிப்பு முதல் மண் பகுப்பாய்வு வரை, விவசாய உற்பத்தித்திறனை உகந்ததாக்க வடிவமைக்கப்பட்ட கருவிகளைக் கண்டறியுங்கள்.",
    exploreNow: "இப்போதே ஆராயுங்கள்",

    // Language names
    hindi: "இந்தி",
    bengali: "வங்காளம்",
    tamil: "தமிழ்",
    telugu: "தெலுங்கு",
    marathi: "மராத்தி",
    punjabi: "பஞ்சாபி (குர்முகி)",
    english: "ஆங்கிலம்",
  },
  te: {
    // Navigation
    home: "హోమ్",
    cropManagement: "పంట నిర్వహణ",
    soilFertilizer: "మట్టి మరియు ఎరువులు",
    diseaseDetection: "వ్యాధి గుర్తింపు",
    tools: "సాధనాలు",
    help: "సహాయం",
    login: "లాగిన్",

    // Main Content
    welcome: "కిసాన్‌సేతుకు స్వాగతం",
    subtitle: "వ్యవసాయంలో విప్లవం",
    description:
      "వ్యవసాయ పద్ధతులను మెరుగుపరచడానికి రూపొందించిన AI-ఆధారిత పరిష్కారాలను అన్వేషించండి. పంట అంచనా నుండి మట్టి విశ్లేషణ వరకు, వ్యవసాయ ఉత్పాదకతను అనుకూలీకరించడానికి రూపొందించిన సాధనాలను కనుగొనండి.",
    exploreNow: "ఇప్పుడే అన్వేషించండి",

    // Language names
    hindi: "హిందీ",
    bengali: "బెంగాలీ",
    tamil: "తమిళం",
    telugu: "తెలుగు",
    marathi: "మరాఠీ",
    punjabi: "పంజాబీ (గుర్ముఖీ)",
    english: "ఇంగ్లీష్",
  },
  mr: {
    // Navigation
    home: "होम",
    cropManagement: "पीक व्यवस्थापन",
    soilFertilizer: "माती आणि खत",
    diseaseDetection: "रोग शोध",
    tools: "साधने",
    help: "मदत",
    login: "लॉगिन",

    // Main Content
    welcome: "किसानसेतूमध्ये आपले स्वागत आहे",
    subtitle: "शेतीमध्ये क्रांती",
    description:
      "शेती पद्धती वाढवण्यासाठी तयार केलेल्या AI-चालित समाधानांचा शोध घ्या. पीक अंदाजापासून माती विश्लेषणापर्यंत, कृषी उत्पादकता अनुकूल करण्यासाठी डिझाइन केलेली साधने शोधा.",
    exploreNow: "आत्ताच एक्सप्लोर करा",

    // Language names
    hindi: "हिंदी",
    bengali: "बंगाली",
    tamil: "तमिळ",
    telugu: "तेलुगू",
    marathi: "मराठी",
    punjabi: "पंजाबी (गुरमुखी)",
    english: "इंग्रजी",
  },
  pa: {
    // Navigation
    home: "ਘਰ",
    cropManagement: "ਫਸਲ ਪ੍ਰਬੰਧਨ",
    soilFertilizer: "ਮਿੱਟੀ ਅਤੇ ਖਾਦ",
    diseaseDetection: "ਬਿਮਾਰੀ ਦੀ ਪਛਾਣ",
    tools: "ਸਾਧਨ",
    help: "ਮਦਦ",
    login: "ਲਾਗਇਨ",

    // Main Content
    welcome: "ਕਿਸਾਨਸੇਤੂ ਵਿੱਚ ਤੁਹਾਡਾ ਸਵਾਗਤ ਹੈ",
    subtitle: "ਖੇਤੀਬਾੜੀ ਵਿੱਚ ਕ੍ਰਾਂਤੀ",
    description:
      "ਖੇਤੀਬਾੜੀ ਅਭਿਆਸਾਂ ਨੂੰ ਵਧਾਉਣ ਲਈ ਤਿਆਰ ਕੀਤੇ ਗਏ AI-ਸੰਚਾਲਿਤ ਹੱਲਾਂ ਦੀ ਖੋਜ ਕਰੋ। ਫਸਲ ਦੀ ਭਵਿੱਖਬਾਣੀ ਤੋਂ ਲੈ ਕੇ ਮਿੱਟੀ ਦੇ ਵਿਸ਼ਲੇਸ਼ਣ ਤੱਕ, ਖੇਤੀਬਾੜੀ ਉਤਪਾਦਕਤਾ ਨੂੰ ਅਨੁਕੂਲ ਬਣਾਉਣ ਲਈ ਡਿਜ਼ਾਈਨ ਕੀਤੇ ਗਏ ਸਾਧਨਾਂ ਦੀ ਖੋਜ ਕਰੋ।",
    exploreNow: "ਹੁਣੇ ਖੋਜੋ",

    // Language names
    hindi: "ਹਿੰਦੀ",
    bengali: "ਬੰਗਾਲੀ",
    tamil: "ਤਮਿਲ",
    telugu: "ਤੇਲਗੂ",
    marathi: "ਮਰਾਠੀ",
    punjabi: "ਪੰਜਾਬੀ (ਗੁਰਮੁਖੀ)",
    english: "ਅੰਗਰੇਜ਼ੀ",
  },
};

// Language Provider Component
export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState("en");

  useEffect(() => {
    // Load saved language from localStorage on component mount
    const savedLanguage = localStorage.getItem("kisaanSetu_language");
    if (savedLanguage && translations[savedLanguage]) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  const changeLanguage = (langCode) => {
    setCurrentLanguage(langCode);
    localStorage.setItem("kisaanSetu_language", langCode);
  };

  const t = (key) => {
    return (
      translations[currentLanguage]?.[key] || translations["en"][key] || key
    );
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

// Language Selector Component (to replace your existing dropdown)
export const LanguageSelector = () => {
  const { currentLanguage, changeLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: "en", name: t("english") },
    { code: "hi", name: t("hindi") },
    { code: "bn", name: t("bengali") },
    { code: "ta", name: t("tamil") },
    { code: "te", name: t("telugu") },
    { code: "mr", name: t("marathi") },
    { code: "pa", name: t("punjabi") },
  ];

  const handleLanguageSelect = (langCode) => {
    changeLanguage(langCode);
    setIsOpen(false);
  };
  return (
    <div className="language-selector">
      <button
        className="language-dropdown-btn"
        onClick={() => setIsOpen(!isOpen)}
      >
        {languages.find((lang) => lang.code === currentLanguage)?.name}
        <span className={`dropdown-arrow ${isOpen ? "open" : ""}`}>▼</span>
      </button>

      {isOpen && (
        <div className="language-dropdown-menu">
          {languages.map((language) => (
            <button
              key={language.code}
              className={`language-option ${
                currentLanguage === language.code ? "active" : ""
              }`}
              onClick={() => handleLanguageSelect(language.code)}
            >
              {language.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// Translated Content Section
export const TranslatedContent = () => {
  const { t } = useLanguage();

  return (
    <div className="main-content">
      <h1>{t("welcome")}</h1>
      <h2>{t("subtitle")}</h2>
      <p>{t("description")}</p>
      <button className="explore-btn">{t("exploreNow")}</button>
    </div>
  );
};
