import React, { useContext, useEffect, useState } from "react";
import { LanguageContext } from "../LanguageContext";

export default function WebsiteContent() {
  const { language } = useContext(LanguageContext);
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const englishContent = {
    title: "GlobalConnect AI",
    subtitle: "Breaking Language Barriers with NLLB-200 AI Technology",
    about: "We revolutionize global communication using state-of-the-art machine learning models. Our platform provides seamless translation across 22 Indian languages.",
    services: "Real-time Translation • Content Localization • Multilingual Support • API Integration",
    contact: "Email: contact@globalconnect.ai\nPhone: +91 XXXXX XXXXX\nAddress: Tech Park, Bangalore",
    aboutHeader: "About Our Mission",
    servicesHeader: "Our Services", 
    contactHeader: "Contact Us"
  };

  useEffect(() => {
    if (language === "English") {
      setContent(englishContent);
      return;
    }

    setLoading(true);
    setProgress(0);
    
    const translateSection = async (text) => {
      try {
        const response = await fetch("http://localhost:5000/translate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text, target_lang: language })
        });
        const data = await response.json();
        return data.translated_text || text;
      } catch {
        return text;
      }
    };

    const translateAll = async () => {
      const texts = Object.values(englishContent);
      const translations = [];
      
      for (let i = 0; i < texts.length; i++) {
        setProgress(Math.round((i / texts.length) * 100));
        const translated = await translateSection(texts[i]);
        translations.push(translated);
      }
      
      setContent({
        title: translations[0],
        subtitle: translations[1],
        about: translations[2],
        services: translations[3],
        contact: translations[4],
        aboutHeader: translations[5],
        servicesHeader: translations[6],
        contactHeader: translations[7]
      });
      setLoading(false);
      setProgress(100);
    };

    translateAll();
  }, [language]);

  if (loading) {
    return (
      <div className="loading-container">
        <h3>🔄 Translating to {language}</h3>
        <div className="progress-bar">
          <div className="progress-fill" style={{width: `${progress}%`}}></div>
        </div>
        <p>{progress}% Complete</p>
      </div>
    );
  }

  return (
    <div className="website-content">
      <header className="hero-section">
        <h1>{content.title}</h1>
        <p>{content.subtitle}</p>
      </header>

      <div className="content-grid">
        <div className="content-column">
          <section className="content-card">
            <h2>{content.aboutHeader}</h2>
            <p>{content.about}</p>
          </section>

          <section className="content-card">
            <h2>{content.servicesHeader}</h2>
            <p>{content.services}</p>
          </section>
        </div>

        <div className="content-column">
          <section className="contact-card">
            <h2>{content.contactHeader}</h2>
            <pre>{content.contact}</pre>
          </section>
        </div>
      </div>
    </div>
  );
}