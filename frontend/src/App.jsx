import React from "react";
import { LanguageProvider } from "./LanguageContext";
import LanguageSelector from "./components/LanguageSelector";
import WebsiteContent from "./components/WebsiteContent";
import "./index.css";

function App() {
  return (
    <LanguageProvider>
      <div className="app">
        <div className="header">
          <div className="header-content">
            <LanguageSelector />
          </div>
        </div>
        <WebsiteContent />
      </div>
    </LanguageProvider>
  );
}

export default App;