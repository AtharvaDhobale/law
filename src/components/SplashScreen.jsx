import React, { useState, useEffect } from 'react';
import chamberLogo from '../assets/logo.png';

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
        <div className="splash-logo-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img src={chamberLogo} alt="State Emblem of India" style={{ width: '80px', height: '88px', objectFit: 'contain' }} />
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
