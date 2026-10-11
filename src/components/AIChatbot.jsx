import React, { useState, useRef, useEffect } from 'react';
import { 
  FiSend, FiCpu, FiUser, FiInfo, FiLayers, FiHelpCircle, FiChevronRight, 
  FiCheckCircle, FiShield, FiFileText, FiCopy, FiCheck
} from 'react-icons/fi';
import { generateLegalResponse } from '../services/legalAI/nlpModel.js';

const QUICK_PROMPTS = [
  { 
    label: 'Compound Incident: Landlord assault, lockout & theft', 
    text: 'My landlord came to my flat at 11 PM with two men carrying iron rods. They broke open the door lock, entered without permission, threw my luggage on street, beat my brother until his arm bone fractured, stole my laptop and gold watch, and threatened to murder us if we go to police.' 
  },
  { 
    label: 'Incident: Motorcycle chain snatching', 
    text: 'Two men on a motorcycle suddenly grabbed and snatched my gold chain and sped away. What BNS sections apply?' 
  },
  { 
    label: 'Incident: Doctor wrong medication in ICU', 
    text: 'A private hospital doctor administered the wrong dose of anesthesia causing patient demise. What legal action can be taken?' 
  },
  { 
    label: 'Incident: Cheque bounce (5 Lakhs)', 
    text: 'My business contractor issued a cheque of 5 lakhs for supplies which bounced due to insufficient funds.' 
  },
  { 
    label: 'Incident: Telegram job scam (UPI loss)', 
    text: 'I was swindled into a fake job offer on Telegram and cheated of 2 lakhs through UPI transfers.' 
  },
  { 
    label: 'Incident: Blackmail with morphed photos', 
    text: 'Someone is blackmailing me on WhatsApp threatening to leak morphed photos unless I pay 50,000 rupees.' 
  },
  { 
    label: 'Query: What is Section 303 BNS?', 
    text: 'Explain Section 303 of BNS and how it replaced Section 379 IPC for theft.' 
  },
  { 
    label: 'Query: Can police refuse Zero FIR?', 
    text: 'Can a police station refuse to file a Zero FIR if the crime occurred in a different district?' 
  }
];

export default function AIChatbot() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: `### Welcome to NyayaAI Legal Chambers
Greetings. I am your **AI Legal Counsel**, trained specifically in Indian criminal, civil, and procedural law under the **Bharatiya Nyaya Sanhita (BNS, 2023)** and **Indian Penal Code (IPC, 1860)**.

**How to Consult:**
- **Describe any situation or incident in plain words:** Whether it is a single crime (e.g. theft, cheque bounce) or a complex multi-crime event (e.g. assault, break-in, damage to property, death threats).
- **Statutory Analysis:** I will dissect your narrative, determine **every applicable legal section**, identify cognizable/bailable classifications, specify statutory punishments, and outline procedural remedies under **BNSS (2023)** and special acts.

*Type your situation below or choose a prompt to begin your legal evaluation.*`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const formatPythonResponse = (data) => {
    if (data.mode === 'procedural') {
      return `### Procedural Legal Advisory: ${data.title}

1. **Governing Procedural Code:**
   - **Bharatiya Nagarik Suraksha Sanhita (BNSS, 2023):** **${data.bns_section}**
   - **Old Code Equivalent:** **${data.ipc_section}**

2. **Legal Machinery & Operational Scope:**
   ${data.summary}

3. **Recommended Procedural Action Steps:**
${data.remedies.map((r, i) => `   ${i + 1}. ${r}`).join('\n')}`;
    }

    if (data.mode === 'section_lookup') {
      return `### Statutory Section Analysis: ${data.query_section} (${data.title})

1. **Applicable Legal Provisions:**
   - **Bharatiya Nyaya Sanhita (BNS, 2023):** **${data.bns_section}**
   - **Indian Penal Code (IPC, 1860):** **${data.ipc_section}**

2. **Classification & Judicial Jurisdiction:**
   - **Cognizability:** **${data.cognizable}**
   - **Bail Status:** **${data.bailable}**
   - **Prescribed Punishment:** ${data.punishment}
   - **Court of Trial:** ${data.court}

3. **Essential Legal Ingredients (Prima Facie Proof):**
${data.ingredients.map(ing => `   - ${ing}`).join('\n')}

4. **Procedural Framework (BNSS):**
   - ${data.procedural}

5. **Recommended Strategic Next Steps:**
${data.remedies.map((r, i) => `   ${i + 1}. ${r}`).join('\n')}`;
    }

    // Situation Analysis with Multi-Section Schedule
    let text = `### Legal Situation Advisory: ${data.title}

Based on the factual allegations in your situation, here is the comprehensive statutory legal evaluation under the **Bharatiya Nyaya Sanhita (BNS, 2023)**, **Indian Penal Code (IPC, 1860)**, and related procedural laws:

1. **Primary Offense & Governing Sections:**
   - **Bharatiya Nyaya Sanhita (BNS):** **${data.bns_section}**
   - **Indian Penal Code Equivalent:** **${data.ipc_section}**
   - **Classification:** **${data.cognizable}** | **${data.bailable}**
   - **Prescribed Punishment:** ${data.punishment}
   - **Jurisdictional Court:** ${data.court}`;

    // Full Schedule of All Applicable Sections if compound
    if (data.all_applicable_sections && data.all_applicable_sections.length > 1) {
      text += `\n\n2. **Schedule of All Applicable Statutory Sections (${data.total_offenses_found} Offenses Identified):**\n`;
      data.all_applicable_sections.forEach((s, idx) => {
        text += `\n   **${idx + 1}. ${s.title}**\n`;
        text += `      - **BNS (2023):** **${s.bns}**\n`;
        text += `      - **IPC (1860):** *${s.ipc}*\n`;
        text += `      - **Classification:** ${s.cognizable} | ${s.bailable}\n`;
        text += `      - **Punishment:** ${s.punishment}\n`;
        text += `      - **Factual Basis:** *${s.reason}*\n`;
      });
    }

    text += `\n\n${data.all_applicable_sections && data.all_applicable_sections.length > 1 ? '3' : '2'}. **Essential Legal Ingredients (Burden of Proof):**\n`;
    data.ingredients.forEach(ing => {
      text += `   - ${ing}\n`;
    });

    text += `\n${data.all_applicable_sections && data.all_applicable_sections.length > 1 ? '4' : '3'}. **Procedural Framework & Machinery:**\n`;
    text += `   - **Investigation & FIR:** ${data.procedural}\n`;
    text += `   - **Zero FIR Right:** Under Section 173(1) BNSS, you can file a Zero FIR at any police station irrespective of territorial boundaries.\n`;
    text += `   - **Evidence Admissibility:** Under Section 61-63 BSA, digital CCTV, mobile videos, and messages are admissible with a hash-value certificate.`;

    text += `\n\n${data.all_applicable_sections && data.all_applicable_sections.length > 1 ? '5' : '4'}. **Recommended Strategic Legal Action Plan:**\n`;
    data.remedies.forEach((r, idx) => {
      text += `   ${idx + 1}. ${r}\n`;
    });

    return text;
  };

  const handleSend = async (textToSend) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const newUserMessage = {
      id: messages.length + 1,
      sender: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newUserMessage]);
    if (!textToSend) setInputText('');
    setIsTyping(true);

    try {
      let responseText = null;
      // 1. Try Python AI/ML backend first
      try {
        const response = await fetch('/api/ml/predict', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ situation: text })
        });

        if (response.ok) {
          const mlData = await response.json();
          responseText = formatPythonResponse(mlData);
        }
      } catch (err) {
        console.warn('Python backend unavailable, switching to local neural fallback:', err);
      }

      // 2. Resilient fallback to local engine if needed
      if (!responseText) {
        responseText = generateLegalResponse(text);
      }

      setMessages(prev => [...prev, {
        id: prev.length + 1,
        sender: 'bot',
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } catch (err) {
      console.error('Error generating legal response:', err);
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        sender: 'bot',
        text: `⚠️ **Processing Error**: ${err.message}. Please try rephrasing your situation.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const copyToClipboard = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const renderMessageText = (text) => {
    return text.split('\n\n').map((paragraph, index) => {
      if (paragraph.startsWith('### ')) {
        return (
          <h3 key={index} style={{ color: 'var(--gold-primary)', fontFamily: 'var(--font-serif)', marginTop: '0.8rem', marginBottom: '0.5rem', fontSize: '1.25rem' }}>
            {paragraph.replace('### ', '')}
          </h3>
        );
      }
      
      const lines = paragraph.split('\n').map((line, lineIdx) => {
        const boldRegex = /\*\*(.*?)\*\*/g;
        let match;
        const elements = [];
        let lastIndex = 0;
        
        while ((match = boldRegex.exec(line)) !== null) {
          if (match.index > lastIndex) {
            elements.push(line.substring(lastIndex, match.index));
          }
          elements.push(
            <strong key={match.index} style={{ color: 'var(--gold-primary)', fontWeight: '600' }}>
              {match[1]}
            </strong>
          );
          lastIndex = boldRegex.lastIndex;
        }
        
        if (lastIndex < line.length) {
          elements.push(line.substring(lastIndex));
        }

        const renderContent = elements.length > 0 ? elements : line;

        if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
          return (
            <li key={lineIdx} style={{ marginLeft: '1.5rem', listStyleType: 'square', marginBottom: '5px', lineHeight: '1.5' }}>
              {typeof renderContent === 'string' ? renderContent.substring(2) : renderContent}
            </li>
          );
        }
        if (line.match(/^\d+\.\s/)) {
          return (
            <div key={lineIdx} style={{ marginLeft: '0.5rem', marginBottom: '6px', lineHeight: '1.5' }}>
              {renderContent}
            </div>
          );
        }
        return <p key={lineIdx} style={{ marginBottom: '4px', lineHeight: '1.5' }}>{renderContent}</p>;
      });

      return <div key={index} style={{ marginBottom: '0.9rem' }}>{lines}</div>;
    });
  };

  return (
    <div>
      <div className="section-title-wrapper">
        <h2 className="section-title">AI Legal Chambers & Advisory Core</h2>
        <p className="section-subtitle">
          Intelligent legal evaluation system analyzing situations under the Bharatiya Nyaya Sanhita (BNS, 2023) and Indian Penal Code (IPC).
        </p>
      </div>

      <div className="chatbot-layout">
        {/* Main Chat Panel */}
        <div className="chat-panel">
          <div className="chat-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '32px', height: '32px', background: 'var(--gold-light)', border: '1px solid var(--gold-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '4px' }}>
                <FiShield style={{ color: 'var(--gold-primary)', fontSize: '18px' }} />
              </div>
              <div>
                <strong style={{ color: 'var(--text-primary)', fontSize: '0.95rem' }}>NyayaAI Legal Counsel</strong>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                  Statutory Advisory System • Supreme Court & BNS Jurisdiction
                </div>
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem', color: '#22c55e', background: 'rgba(34, 197, 94, 0.08)', padding: '4px 10px', borderRadius: '4px', border: '1px solid rgba(34, 197, 94, 0.25)' }}>
              <span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e' }}></span>
              <span style={{ fontWeight: '600' }}>Chambers Active</span>
            </div>
          </div>

          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div key={msg.id} className={`message-bubble ${msg.sender}`}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: msg.sender === 'user' ? 'var(--text-secondary)' : 'var(--text-muted)' }}>
                    {msg.sender === 'user' ? <FiUser /> : <FiCpu />}
                    <span>{msg.sender === 'user' ? 'Citizen Incident' : 'NyayaAI Counsel'}</span>
                    <span>•</span>
                    <span>{msg.timestamp}</span>
                  </div>

                  {msg.sender === 'bot' && (
                    <button 
                      onClick={() => copyToClipboard(msg.text, index)}
                      title="Copy Legal Opinion"
                      style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem' }}
                    >
                      {copiedIndex === index ? <><FiCheck style={{ color: '#22c55e' }} /> Copied</> : <><FiCopy /> Copy</>}
                    </button>
                  )}
                </div>
                <div style={{ wordBreak: 'break-word', color: 'var(--text-primary)' }}>
                  {msg.sender === 'user' ? msg.text : renderMessageText(msg.text)}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="message-bubble bot" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Analyzing situation across BNS, BNSS, and Special Acts</span>
                <span style={{ display: 'flex', gap: '3px' }}>
                  <span style={{ width: '5px', height: '5px', background: 'var(--gold-primary)', borderRadius: '50%', animation: 'pulse 1s infinite' }}></span>
                  <span style={{ width: '5px', height: '5px', background: 'var(--gold-primary)', borderRadius: '50%', animation: 'pulse 1s infinite 0.2s' }}></span>
                  <span style={{ width: '5px', height: '5px', background: 'var(--gold-primary)', borderRadius: '50%', animation: 'pulse 1s infinite 0.4s' }}></span>
                </span>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Box */}
          <div className="chat-input-area">
            <input
              type="text"
              placeholder="Describe your situation in detail (e.g. landlord break-in, cheque bounce, online fraud)..."
              className="chat-input"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSend();
              }}
            />
            <button className="chat-send-btn" onClick={() => handleSend()} disabled={!inputText.trim()}>
              <FiSend size={16} />
            </button>
          </div>

          <div style={{ padding: '0.5rem 1.2rem', background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)', fontSize: '0.72rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <FiInfo style={{ color: 'var(--gold-primary)', flexShrink: 0 }} />
            <span><strong>Notice:</strong> Opinions are generated based on statutory enactments of Bharatiya Nyaya Sanhita (Act 45 of 2023) and BNSS (Act 46 of 2023).</span>
          </div>
        </div>

        {/* Quick Prompts Sidebar */}
        <div className="chatbot-sidebar">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <h3 className="quick-prompt-title" style={{ margin: 0 }}>Incident Prompts</h3>
            <span style={{ fontSize: '0.7rem', color: 'var(--gold-primary)', background: 'var(--gold-light)', padding: '2px 6px', borderRadius: '3px' }}>Scenarios</span>
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1.2rem' }}>
            Select any real-world incident below to evaluate:
          </p>
          <div className="quick-prompts-list">
            {QUICK_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                className="quick-prompt-btn"
                onClick={() => handleSend(prompt.text)}
              >
                <div style={{ fontWeight: '600', color: 'var(--gold-primary)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span>{prompt.label.split(': ')[0]}</span>
                  <FiChevronRight />
                </div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {prompt.label.split(': ')[1] || prompt.label}
                </div>
              </button>
            ))}
          </div>

          <div style={{ marginTop: 'auto', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--gold-primary)', fontSize: '0.85rem', marginBottom: '8px' }}>
              <FiLayers />
              <strong>Statutory Coverage</strong>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
              Covers Crimes Against Body (BNS 101-140), Property (BNS 303-334), Women & Children (BNS 64-99), Financial Scams, Cyber Offenses, and NI Act Cheque Dishonour.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
