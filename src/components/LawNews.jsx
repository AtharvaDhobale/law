import React, { useState, useEffect } from 'react';
import { 
  FiFileText, FiSearch, FiExternalLink, FiClock, FiRefreshCw, 
  FiRadio, FiFilter, FiCheckCircle, FiChevronRight, FiAlertTriangle 
} from 'react-icons/fi';
import { fetchRealTimeLegalNews } from '../services/newsService.js';

export default function LawNews() {
  const [newsList, setNewsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);
  const [sourceType, setSourceType] = useState('Connecting to Legal API Wire...');
  const [lastUpdated, setLastUpdated] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeNews, setActiveNews] = useState(null);

  const categories = [
    'All', 
    'Supreme Court', 
    'High Courts', 
    'Criminal Law (BNS)', 
    'Corporate & Tax', 
    'Bills & Acts', 
    'Global Legal'
  ];

  const loadNews = async () => {
    setIsLoading(true);
    try {
      const data = await fetchRealTimeLegalNews();
      setNewsList(data.news);
      setIsLive(data.isLive);
      setSourceType(data.sourceType);
      setLastUpdated(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    } catch (err) {
      console.error('Failed to load legal news:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadNews();
  }, []);

  const filteredNews = newsList.filter(news => {
    const matchesCategory = selectedCategory === 'All' || news.category === selectedCategory;
    const matchesSearch = !searchQuery.trim() || 
      news.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      news.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (news.impactSections && news.impactSections.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Calculate counts for categories
  const getCategoryCount = (cat) => {
    if (cat === 'All') return newsList.length;
    return newsList.filter(n => n.category === cat).length;
  };

  return (
    <div>
      <div className="section-title-wrapper" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '15px' }}>
        <div>
          <h2 className="section-title">Legal Gazette & Real-Time News Wire</h2>
          <p className="section-subtitle">
            Live updates on Supreme Court judgments, High Court rulings, BNS criminal enactments, and regulatory developments.
          </p>
        </div>

        {/* Live Status and Refresh Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px', 
            background: isLive ? 'rgba(34, 197, 94, 0.1)' : 'var(--bg-tertiary)', 
            border: `1px solid ${isLive ? 'rgba(34, 197, 94, 0.3)' : 'var(--border-color)'}`,
            padding: '6px 12px',
            borderRadius: '4px',
            fontSize: '0.78rem'
          }}>
            <span style={{ 
              width: '8px', 
              height: '8px', 
              borderRadius: '50%', 
              background: isLive ? '#22c55e' : '#eab308',
              animation: isLive ? 'pulse 1.5s infinite' : 'none'
            }}></span>
            <span style={{ color: isLive ? '#22c55e' : 'var(--text-secondary)', fontWeight: '600' }}>
              {isLive ? '● Live API Connected' : 'Cached Gazette'}
            </span>
            {lastUpdated && (
              <span style={{ color: 'var(--text-muted)', fontSize: '0.72rem' }}>
                ({lastUpdated})
              </span>
            )}
          </div>

          <button 
            className="panel-btn" 
            style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', padding: '7px 14px' }}
            onClick={loadNews}
            disabled={isLoading}
          >
            <FiRefreshCw className={isLoading ? 'spin-animation' : ''} />
            {isLoading ? 'Fetching Wire...' : 'Refresh Live News'}
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '15px', marginBottom: '1.8rem', flexWrap: 'wrap', alignItems: 'center' }}>
        {/* Categories Bar */}
        <div className="cases-filter-bar" style={{ marginBottom: 0, display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {categories.map(cat => (
            <button
              key={cat}
              className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
              style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <span>{cat}</span>
              <span style={{ 
                fontSize: '0.68rem', 
                background: selectedCategory === cat ? 'var(--gold-primary)' : 'var(--bg-tertiary)', 
                color: selectedCategory === cat ? '#000' : 'var(--text-muted)', 
                padding: '1px 5px', 
                borderRadius: '10px' 
              }}>
                {getCategoryCount(cat)}
              </span>
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <FiSearch style={{ position: 'absolute', left: '12px', color: 'var(--text-muted)' }} />
          <input
            type="text"
            placeholder="Search news, sections (e.g. BNS, SEBI)..."
            className="form-control"
            style={{ paddingLeft: '35px', width: '280px' }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              style={{ position: 'absolute', right: '10px', background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
            >
              &times;
            </button>
          )}
        </div>
      </div>

      {/* News Stream Content */}
      {isLoading ? (
        <div style={{ textAlign: 'center', padding: '4rem 2rem', color: 'var(--text-secondary)' }}>
          <FiRefreshCw size={36} className="spin-animation" style={{ color: 'var(--gold-primary)', marginBottom: '15px' }} />
          <p style={{ fontSize: '1rem', fontWeight: '500' }}>Fetching real-time legal feeds from court wires...</p>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Parsing live XML dispatches & classifying statutory sections</span>
        </div>
      ) : filteredNews.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3.5rem', border: '1px dashed var(--border-color)', borderRadius: '6px', color: 'var(--text-secondary)' }}>
          <FiFileText size={44} style={{ color: 'var(--text-muted)', marginBottom: '12px' }} />
          <h4 style={{ color: 'var(--text-primary)', marginBottom: '6px' }}>No Legal Articles Found</h4>
          <p style={{ fontSize: '0.85rem' }}>No updates match category "{selectedCategory}" with query "{searchQuery}".</p>
          <button 
            className="btn-secondary" 
            style={{ marginTop: '12px', fontSize: '0.8rem' }}
            onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="news-grid">
          {filteredNews.map(news => (
            <div key={news.id} className="news-card" onClick={() => setActiveNews(news)}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span className="news-tag">{news.category}</span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{news.source}</span>
                </div>
                <h3 className="news-title">{news.title}</h3>
              </div>

              <div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem', lineHeight: '1.4' }}>
                  {news.summary}
                </p>

                {news.impactSections && (
                  <div style={{ marginBottom: '0.8rem', fontSize: '0.72rem', color: 'var(--gold-primary)', background: 'var(--gold-light)', padding: '3px 8px', borderRadius: '3px', border: '1px solid var(--gold-border)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    <strong>Statutory Tag:</strong> {news.impactSections}
                  </div>
                )}

                <div className="news-meta">
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <FiClock /> {news.readTime}
                  </span>
                  <span>{news.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* News Details Modal */}
      {activeNews && (
        <div className="modal-overlay" onClick={() => setActiveNews(null)}>
          <div className="modal-content" style={{ maxWidth: '700px' }} onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setActiveNews(null)}>&times;</button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
              <span className="news-tag">{activeNews.category}</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{activeNews.date}</span>
            </div>
            
            <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--text-primary)', fontSize: '1.6rem', marginBottom: '1.2rem', lineHeight: '1.3' }}>
              {activeNews.title}
            </h2>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', padding: '0.8rem 1rem', background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: '4px', marginBottom: '1.5rem', fontSize: '0.85rem' }}>
              <div><strong style={{ color: 'var(--gold-primary)' }}>Source:</strong> {activeNews.source}</div>
              <div><strong style={{ color: 'var(--gold-primary)' }}>Impacted Laws:</strong> <code style={{ background: 'var(--bg-primary)', padding: '2px 6px', borderRadius: '3px' }}>{activeNews.impactSections || 'General Statutory Law'}</code></div>
            </div>

            <div style={{ lineHeight: '1.65', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '1.2rem', fontSize: '0.95rem', whiteSpace: 'pre-line' }}>
              {activeNews.content}
            </div>

            <div style={{ marginTop: '2rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button className="btn-secondary" onClick={() => setActiveNews(null)}>Close Gazette</button>
              <button 
                className="panel-btn" 
                style={{ display: 'flex', alignItems: 'center', gap: '6px' }} 
                onClick={() => window.open(activeNews.link || 'https://google.com/search?q=' + encodeURIComponent(activeNews.title), '_blank')}
              >
                Read Official Source Report <FiExternalLink />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
