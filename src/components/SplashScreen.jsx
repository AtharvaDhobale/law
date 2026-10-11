import React, { useState, useEffect } from 'react';

const PREAMBLE_WATERMARK = `WE, THE PEOPLE OF INDIA, having solemnly resolved to constitute India into a SOVEREIGN SOCIALIST SECULAR DEMOCRATIC REPUBLIC and to secure to all its citizens: JUSTICE, social, economic and political; LIBERTY of thought, expression, belief, faith and worship; EQUALITY of status and of opportunity; and to promote among them all FRATERNITY assuring the dignity of the individual and the unity and integrity of the Nation; IN OUR CONSTITUENT ASSEMBLY this twenty-sixth day of November, 1949, do HEREBY ADOPT, ENACT AND GIVE TO OURSELVES THIS CONSTITUTION. `;

export default function SplashScreen({ onEnter }) {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [fade, setFade] = useState(false);

  const quotes = [
    {
      text: "WE, THE PEOPLE OF INDIA, having solemnly resolved to constitute India into a SOVEREIGN SOCIALIST SECULAR DEMOCRATIC REPUBLIC and to secure to all its citizens: JUSTICE, social, economic and political; LIBERTY of thought, expression, belief, faith and worship...",
      source: "Preamble to the Constitution of India"
    },
    {
      text: "Constitutional morality is not a natural sentiment. It has to be cultivated. We must realise that our people have yet to learn it.",
      source: "Dr. B.R. Ambedkar"
    },
    {
      text: "However good a Constitution may be, if those who are implementing it are not good, it will prove to be bad.",
      source: "Dr. B.R. Ambedkar"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setFade(true);
      setTimeout(() => {
        setQuoteIndex((prev) => (prev + 1) % quotes.length);
        setFade(false);
      }, 500);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="splash-container">
      {/* Repeating Constitution Preamble background watermark */}
      <div className="splash-watermark">
        {Array(15).fill(PREAMBLE_WATERMARK).join(' ')}
      </div>

      <div className="splash-logo-wrapper" style={{ zIndex: 10 }}>
        <div className="splash-logo-ring"></div>
        <div className="splash-logo-content">
          {/* Custom Tie & Suit SVG Logo */}
          <svg width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Suit Collar Left */}
            <path d="M20 20 L40 45 L25 45 Z" fill="currentColor" opacity="0.6" />
            {/* Suit Collar Right */}
            <path d="M80 20 L60 45 L75 45 Z" fill="currentColor" opacity="0.6" />
            {/* Shirt Collar V-Neck */}
            <path d="M40 20 L50 35 L60 20 Z" fill="#ffffff" />
            {/* Tie Knot */}
            <path d="M46 33 L54 33 L52 40 L48 40 Z" fill="currentColor" />
            {/* Tie Body */}
            <path d="M48 40 L52 40 L55 75 L50 82 L45 75 Z" fill="currentColor" />
            {/* Scales of Justice mini emblem on top */}
            <circle cx="50" cy="12" r="3" fill="currentColor" />
            <line x1="42" y1="15" x2="58" y2="15" stroke="currentColor" strokeWidth="1.5" />
            <line x1="50" y1="12" x2="50" y2="20" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </div>
      </div>

      <div style={{ minHeight: '160px', display: 'flex', flexDirection: 'column', justifyContent: 'center', zIndex: 10 }}>
        <p className="splash-quote" style={{ opacity: fade ? 0 : 1, transition: 'opacity 0.5s ease' }}>
          {quotes[quoteIndex].text}
        </p>
      </div>
      <h3 className="splash-subquote" style={{ opacity: fade ? 0 : 1, transition: 'opacity 0.5s ease', zIndex: 10 }}>
        — {quotes[quoteIndex].source}
      </h3>

      <button className="splash-btn" style={{ zIndex: 10 }} onClick={onEnter}>
        Enter Chambers
      </button>
    </div>
  );
}
