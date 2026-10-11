import React, { useState, useEffect } from 'react';
import SplashScreen from './components/SplashScreen';
import LawNews from './components/LawNews';
import AIChatbot from './components/AIChatbot';
import CaseStudies from './components/CaseStudies';
import ClientManager from './components/ClientManager';

import { FiFileText, FiCpu, FiBookOpen, FiUsers, FiSun, FiMoon } from 'react-icons/fi';

const CHAMBER_QUOTES = [
  "Satyameva Jayate (Truth Alone Triumphs) — Motto of India",
  "Justice, Liberty, Equality, Fraternity — Fundamental Pillars of the Indian Constitution",
  "Justice delayed is justice denied. — Legal Aphorism",
  "However good a Constitution may be, if those who are implementing it are not good, it will prove to be bad. — Dr. B.R. Ambedkar",
  "The law is not a cold science but a warm, living organ of society, serving the human needs of the people. — Justice V.R. Krishna Iyer",
  "The law of the court is the law of the strong, but the law of the heart is the law of the just. — Mahatma Gandhi"
];

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [currentTab, setCurrentTab] = useState('chatbot'); 
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [theme, setTheme] = useState('dark'); // 'dark' | 'light'

  // Apply theme to document body
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  useEffect(() => {
    if (!showSplash) {
      const interval = setInterval(() => {
        setQuoteIndex((prev) => (prev + 1) % CHAMBER_QUOTES.length);
      }, 8000);
      return () => clearInterval(interval);
    }
  }, [showSplash]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  if (showSplash) {
    return <SplashScreen onEnter={() => setShowSplash(false)} />;
  }

  const renderTabContent = () => {
    switch (currentTab) {
      case 'news':
        return <LawNews />;
      case 'chatbot':
        return <AIChatbot />;
      case 'cases':
        return <CaseStudies />;
      case 'clients':
        return <ClientManager />;
      default:
        return <AIChatbot />;
    }
  };

  return (
    <div className="app-container">
      {/* Sidebar Navigation */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: 'var(--gold-primary)' }}>
            <path d="M20 20 L40 45 L25 45 Z" fill="currentColor" opacity="0.6" />
            <path d="M80 20 L60 45 L75 45 Z" fill="currentColor" opacity="0.6" />
            <path d="M40 20 L50 35 L60 20 Z" fill="#ffffff" />
            <path d="M46 33 L54 33 L52 40 L48 40 Z" fill="currentColor" />
            <path d="M48 40 L52 40 L55 75 L50 82 L45 75 Z" fill="currentColor" />
          </svg>
          <div>
            <h1 className="sidebar-title">Nyaya Chambers</h1>
            <span className="sidebar-subtitle">Legal Chambers</span>
          </div>
        </div>

        <ul className="sidebar-menu">
          <li 
            className={`sidebar-item ${currentTab === 'chatbot' ? 'active' : ''}`}
            onClick={() => setCurrentTab('chatbot')}
          >
            <FiCpu />
            <span>AI Legal Chambers</span>
          </li>
          <li 
            className={`sidebar-item ${currentTab === 'news' ? 'active' : ''}`}
            onClick={() => setCurrentTab('news')}
          >
            <FiFileText />
            <span>Gazette & News</span>
          </li>
          <li 
            className={`sidebar-item ${currentTab === 'cases' ? 'active' : ''}`}
            onClick={() => setCurrentTab('cases')}
          >
            <FiBookOpen />
            <span>Case Briefs</span>
          </li>
          <li 
            className={`sidebar-item ${currentTab === 'clients' ? 'active' : ''}`}
            onClick={() => setCurrentTab('clients')}
          >
            <FiUsers />
            <span>Litigation Registers</span>
          </li>
        </ul>

        <div className="sidebar-footer">
          <div>NYAYA CHAMBERS v1.1.0</div>
          <div style={{ fontSize: '0.65rem', marginTop: '4px', letterSpacing: '0.5px' }}>Satyameva Jayate</div>
        </div>
      </aside>

      {/* Main Workspace */}
      <main className="main-workspace">
        <header className="workspace-header">
          <div className="quote-ticker">
            {CHAMBER_QUOTES[quoteIndex]}
          </div>
          <div className="workspace-user-info">
            {/* Elegant Executive Switcher */}
            <button className="theme-toggle-btn" onClick={toggleTheme}>
              {theme === 'dark' ? (
                <>
                  <FiSun /> Chamber Light
                </>
              ) : (
                <>
                  <FiMoon /> Gavel Dark
                </>
              )}
            </button>
            <span>Jurisdiction: <strong>Supreme Court of India</strong></span>
            <span className="badge">Bar Council Active</span>
          </div>
        </header>

        <section className="workspace-content">
          {renderTabContent()}
        </section>
      </main>
    </div>
  );
}
