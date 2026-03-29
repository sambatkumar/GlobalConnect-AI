import React, { useContext, useEffect, useState } from "react";
import { LanguageContext } from "../LanguageContext";

export default function LanguageSelector() {
  const { language, setLanguage } = useContext(LanguageContext);
  const [availableLanguages, setAvailableLanguages] = useState(["English"]);

  useEffect(() => {
    fetch("http://localhost:5000/languages")
      .then(r => r.json())
      .then(data => setAvailableLanguages(data.languages || ["English"]))
      .catch(() => setAvailableLanguages(["English"]));
  }, []);

  return (
    <div className="language-selector">
      <label htmlFor="language-select">Select Language: </label>
      <select 
        id="language-select"
        value={language} 
        onChange={(e) => setLanguage(e.target.value)}
      >
        {availableLanguages.map(lang => (
          <option key={lang} value={lang}>{lang}</option>
        ))}
      </select>
    </div>
  );
}