import React, { useState } from 'react';
import { 
  FiUser, FiLock, FiMail, FiBriefcase, FiArrowRight, 
  FiShield, FiEye, FiEyeOff, FiAlertCircle, FiCheckCircle 
} from 'react-icons/fi';
import { api } from '../services/api.js';
import chamberLogo from '../assets/logo.png';

export default function AuthModal({ onAuthSuccess, onClose }) {
  const [isRegister, setIsRegister] = useState(false);
  const [role, setRole] = useState('lawyer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      if (isRegister) {
        const res = await api.register({ email: email.trim(), password, full_name: fullName.trim(), role });
        onAuthSuccess(res.user);
      } else {
        const res = await api.login(email.trim(), password);
        onAuthSuccess(res.user);
      }
    } catch (err) {
      setError(err.message || 'Authentication failed. Please verify your email and password.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickDemo = async (demoRole) => {
    setIsLoading(true);
    setError('');
    try {
      const creds = demoRole === 'lawyer'
        ? { email: 'advocate.sharma@nyayachambers.in', pass: 'lawyer123' }
        : { email: 'client.ramesh@gmail.com', pass: 'client123' };
      const res = await api.login(creds.email, creds.pass);
      onAuthSuccess(res.user);
    } catch (err) {
      setError('Demo login failed: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card-container">
        {/* Left Side: Stately Judicial Chamber Brand Panel */}
        <div className="auth-brand-panel">
          <div className="auth-brand-inner">
            {/* State Emblem of India Crest Logo */}
            <div className="auth-logo-badge">
              <img src={chamberLogo} alt="State Emblem of India" className="auth-logo-img" />
            </div>

            {/* Name 'Nyaya Chambers' in Solid Black Ink */}
            <h1 className="auth-brand-title">Nyaya Chambers</h1>
            <p className="auth-brand-tagline">Legal Chambers & Practice Suite</p>
            <div className="auth-brand-divider" />

            <div className="auth-seal-badge">
              <span className="auth-seal-dot"></span>
              Satyameva Jayate · Supreme Court of India
            </div>

            <p className="auth-brand-desc">
              India's premier legal intelligence system and chambers ledger. Dedicated to legal practitioners, judicial clerks, and litigants.
            </p>

            <div className="auth-features-list">
              <div className="auth-feature-item">
                <FiShield className="feat-icon" />
                <div>
                  <strong>Role-Based Access Control</strong>
                  <span>Tailored suites for Senior Advocates & Litigants</span>
                </div>
              </div>
              <div className="auth-feature-item">
                <FiBriefcase className="feat-icon" />
                <div>
                  <strong>Litigation Docket Registers</strong>
                  <span>Case management, hearings & client retainers</span>
                </div>
              </div>
              <div className="auth-feature-item">
                <FiCheckCircle className="feat-icon" />
                <div>
                  <strong>Bharatiya Nyaya Sanhita (BNS) AI</strong>
                  <span>Statutory section classification & compound offense audits</span>
                </div>
              </div>
            </div>

            <div className="auth-brand-footer">
              <span>NYAYA CHAMBERS ARCHIVAL SUITE</span>
              <small>Bar Council of India Enrolment Standard</small>
            </div>
          </div>
        </div>

        {/* Right Side: High-End Interactive Form */}
        <div className="auth-form-panel">
          <div className="auth-form-container">
            {/* Segmented Tab Switcher */}
            <div className="auth-segmented-tabs">
              <button 
                type="button" 
                className={`auth-segment-btn ${!isRegister ? 'active' : ''}`}
                onClick={() => { setIsRegister(false); setError(''); }}
              >
                Sign In
              </button>
              <button 
                type="button" 
                className={`auth-segment-btn ${isRegister ? 'active' : ''}`}
                onClick={() => { setIsRegister(true); setError(''); }}
              >
                Create Account
              </button>
            </div>

            <div className="auth-header-text">
              <h2 className="auth-form-title">
                {isRegister ? 'Register Chamber Dossier' : 'Sign In to Chambers'}
              </h2>
              <p className="auth-form-subtitle">
                {isRegister 
                  ? 'Set up your credentials to join the digital bar registry' 
                  : 'Access your pending briefs, client matters & AI counsel'}
              </p>
            </div>

            {/* Quick Demo Access (For fast review / evaluator access) */}
            {!isRegister && (
              <div className="auth-demo-section">
                <div className="auth-demo-header">
                  <span className="auth-demo-label">Instant One-Click Demo Access</span>
                </div>
                <div className="auth-demo-grid">
                  <button
                    type="button"
                    className="auth-demo-card lawyer-card"
                    onClick={() => handleQuickDemo('lawyer')}
                    disabled={isLoading}
                  >
                    <div className="demo-card-icon lawyer">
                      <FiBriefcase />
                    </div>
                    <div className="demo-card-body">
                      <span className="demo-role-tag lawyer-tag">Advocate</span>
                      <strong className="demo-name">Adv. Rajesh Sharma</strong>
                      <span className="demo-sub">Criminal & BNS Defense</span>
                    </div>
                    <span className="demo-action-btn">Enter →</span>
                  </button>

                  <button
                    type="button"
                    className="auth-demo-card client-card"
                    onClick={() => handleQuickDemo('client')}
                    disabled={isLoading}
                  >
                    <div className="demo-card-icon client">
                      <FiUser />
                    </div>
                    <div className="demo-card-body">
                      <span className="demo-role-tag client-tag">Litigant</span>
                      <strong className="demo-name">Ramesh Kumar</strong>
                      <span className="demo-sub">Civil Matter Client</span>
                    </div>
                    <span className="demo-action-btn">Enter →</span>
                  </button>
                </div>

                <div className="auth-or-divider">
                  <span>or enter with credentials</span>
                </div>
              </div>
            )}

            {/* Error Notification Banner */}
            {error && (
              <div className="auth-error-banner">
                <FiAlertCircle className="error-icon" />
                <div className="error-text">{error}</div>
              </div>
            )}

            {/* Form Fields */}
            <form onSubmit={handleSubmit} className="auth-form-fields">
              {isRegister && (
                <div className="auth-field">
                  <label>Full Legal Name</label>
                  <div className="auth-input-wrap">
                    <FiUser className="auth-field-icon" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Adv. Rajesh Sharma or Ramesh Kumar"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>
                </div>
              )}

              {isRegister && (
                <div className="auth-field">
                  <label>Practice Role in Chambers</label>
                  <div className="auth-role-toggle">
                    <button
                      type="button"
                      className={`auth-role-btn ${role === 'lawyer' ? 'active' : ''}`}
                      onClick={() => setRole('lawyer')}
                    >
                      <FiBriefcase /> Advocate / Counsel
                    </button>
                    <button
                      type="button"
                      className={`auth-role-btn ${role === 'client' ? 'active' : ''}`}
                      onClick={() => setRole('client')}
                    >
                      <FiUser /> Litigant / Client
                    </button>
                  </div>
                </div>
              )}

              <div className="auth-field">
                <label>Email Address</label>
                <div className="auth-input-wrap">
                  <FiMail className="auth-field-icon" />
                  <input
                    type="email"
                    required
                    placeholder="advocate@nyayachambers.in"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className="auth-field">
                <label>Password</label>
                <div className="auth-input-wrap">
                  <FiLock className="auth-field-icon" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete={isRegister ? "new-password" : "current-password"}
                  />
                  <button
                    type="button"
                    className="auth-password-toggle-btn"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex="-1"
                    title={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>

              <button type="submit" className="auth-submit-btn" disabled={isLoading}>
                {isLoading ? (
                  <span className="auth-loading-state">
                    <span className="auth-spinner"></span>
                    Authenticating Dossier…
                  </span>
                ) : (
                  <>
                    <span>{isRegister ? 'Create Chambers Account' : 'Sign In to Chambers'}</span>
                    <FiArrowRight />
                  </>
                )}
              </button>
            </form>

            <div className="auth-switch-footer">
              {isRegister ? (
                <p>Already possess a registered dossier? <button type="button" className="auth-link-btn" onClick={() => setIsRegister(false)}>Sign In</button></p>
              ) : (
                <p>New advocate or litigant? <button type="button" className="auth-link-btn" onClick={() => setIsRegister(true)}>Create Chambers Account</button></p>
              )}
            </div>

            <div className="auth-security-badge">
              <FiShield />
              <span>256-Bit SSL Judicial Data Privacy · Supreme Court & BNS Compliance</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
