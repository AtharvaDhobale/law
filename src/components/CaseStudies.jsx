import React, { useState, useEffect } from 'react';
import { FiBookOpen, FiSearch, FiFileText, FiAward, FiBookmark, FiCpu } from 'react-icons/fi';

const MOCK_CASES = [
  {
    id: 1,
    title: 'Kesavananda Bharati v. State of Kerala',
    citation: '(1973) 4 SCC 225',
    category: 'Constitutional',
    summary: 'Established the "Basic Structure Doctrine", limiting the Parliament\'s power to amend the Constitution.',
    facts: 'The petitioner, head of an administrative mutt in Kerala, challenged state land reform laws that attempted to acquire mutt property under Article 31. The case evolved into a review of the Parliament\'s power to amend the Constitution under Article 368.',
    issues: 'Does the Parliament have unlimited power to amend the Constitution under Article 368, including the power to take away fundamental rights?',
    judgment: 'By a thin 7:6 majority, the Supreme Court ruled that while Parliament has wide powers to amend the Constitution, it cannot alter, destroy, or damage its "Basic Structure" (e.g., Democracy, Secularism, Separation of Powers, Judicial Review).',
    significance: 'The most important judgment in Indian legal history. It saved the democratic fabric by establishing judicial review over constitutional amendments.'
  },
  {
    id: 2,
    title: 'Maneka Gandhi v. Union of India',
    citation: '(1978) 1 SCC 248',
    category: 'Constitutional',
    summary: 'Expanded the scope of Article 21 (Right to Life and Personal Liberty) to include "due process of law".',
    facts: 'The petitioner\'s passport was impounded by the government in "public interest" without providing any reasons or an opportunity to be heard. She challenged the order as violating Article 21.',
    issues: 'Does Article 21 merely require any procedure established by law (literal interpretation), or must that procedure be fair, just, and reasonable?',
    judgment: 'The Supreme Court ruled that any procedure depriving a person of life or personal liberty under Article 21 must not be arbitrary. It must pass the test of being "fair, just, and reasonable", effectively importing the American concept of procedural due process.',
    significance: 'Transformed Article 21 into a reservoir of fundamental rights, including the right to clean environment, livelihood, and privacy.'
  },
  {
    id: 3,
    title: 'Lalita Kumari v. Govt. of U.P.',
    citation: '(2014) 2 SCC 1',
    category: 'Criminal',
    summary: 'Made registration of FIR mandatory under Section 154 CrPC if information discloses a cognizable offense.',
    facts: 'A petition was filed regarding the kidnapping of a minor girl, where the police station had refused to register an FIR and delay investigations, demanding bribes and proof first.',
    issues: 'Is a police officer bound to register an FIR immediately upon receiving information of a cognizable offense, or can they conduct a preliminary inquiry first?',
    judgment: 'A Constitution Bench ruled that registration of FIR is mandatory under Section 154 of the CrPC if the information discloses commission of a cognizable offense. No preliminary inquiry is permissible in such situations.',
    significance: 'Crucial criminal law precedent. It prevents police apathy and ensures immediate record of crimes, particularly crimes against women and children.'
  },
  {
    id: 4,
    title: 'Balfour v. Balfour',
    citation: '[1919] 2 KB 571',
    category: 'Civil & Contract',
    summary: 'Established that domestic agreements do not create legal relations and thus are not enforceable contracts.',
    facts: 'A husband promised to pay his wife a monthly allowance of £30 while he was working abroad. They later separated, and the wife sued to enforce the payment agreement.',
    issues: 'Did the husband\'s promise to pay an allowance constitute a legally binding contract?',
    judgment: 'The Court of Appeal held that agreements between husband and wife are social and domestic in nature. There is a rebuttable presumption that parties do not intend to create legal relations, meaning no contract was formed.',
    significance: 'Fundamental contract law case. Serves as the primary authority for the necessity of "intention to create legal relations" in contract formation.'
  },
  {
    id: 5,
    title: 'Shayara Bano v. Union of India',
    citation: '(2017) 9 SCC 1',
    category: 'Family Law',
    summary: 'Declared the practice of Triple Talaq (Talaq-e-Biddat) unconstitutional and void.',
    facts: 'The petitioner, a victim of instant triple talaq, challenged the validity of practices like Talaq-e-Biddat, polygamy, and Nikah Halala under Articles 14, 15, and 21.',
    issues: 'Is the practice of instant Triple Talaq protected under Article 25 (Freedom of Religion) or does it violate women\'s fundamental right to equality?',
    judgment: 'By a 3:2 majority, the Supreme Court declared Triple Talaq unconstitutional, arbitrary, and violative of Article 14. The court ruled that something bad in theology cannot be good in law.',
    significance: 'A major milestone in Muslim family law reform and women\'s rights in India.'
  }
];

export default function CaseStudies() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCase, setActiveCase] = useState(null);
  const [notes, setNotes] = useState({});

  // Load saved notes from LocalStorage on mount
  useEffect(() => {
    const savedNotes = localStorage.getItem('nyayachambers_case_notes');
    if (savedNotes) {
      try {
        setNotes(JSON.parse(savedNotes));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const saveNote = (caseId, noteText) => {
    const updatedNotes = {
      ...notes,
      [caseId]: noteText
    };
    setNotes(updatedNotes);
    localStorage.setItem('nyayachambers_case_notes', JSON.stringify(updatedNotes));
  };

  const categories = ['All', 'Constitutional', 'Criminal', 'Civil & Contract', 'Family Law'];

  const filteredCases = MOCK_CASES.filter(c => {
    const matchesCategory = selectedCategory === 'All' || c.category === selectedCategory;
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          c.citation.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div>
      <div className="section-title-wrapper">
        <h2 className="section-title">Case Studies & Judgments</h2>
        <p className="section-subtitle">Read briefs of landmark decisions and organize legal notes for academic or court preparations.</p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '15px', marginBottom: '2rem', flexWrap: 'wrap', alignItems: 'center' }}>
        {/* Categories */}
        <div className="cases-filter-bar" style={{ marginBottom: 0 }}>
          {categories.map(cat => (
            <button
              key={cat}
              className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <FiSearch style={{ position: 'absolute', left: '12px', color: 'var(--text-muted)' }} />
          <input
            type="text"
            placeholder="Search briefs by name/citation..."
            className="form-control"
            style={{ paddingLeft: '35px', width: '280px' }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {filteredCases.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem', border: '1px dashed var(--border-color)', borderRadius: '6px', color: 'var(--text-secondary)' }}>
          <FiBookOpen size={40} style={{ color: 'var(--text-muted)', marginBottom: '10px' }} />
          <p>No case studies match your query.</p>
        </div>
      ) : (
        <div className="cases-grid">
          {filteredCases.map(c => (
            <div key={c.id} className="case-card">
              <div className="case-header">
                <span className="case-citation">{c.citation}</span>
                <span className="case-category">{c.category}</span>
              </div>
              <h3 className="case-title">{c.title}</h3>
              <p className="case-snippet">{c.summary}</p>
              
              <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
                <button className="case-btn" onClick={() => setActiveCase(c)}>
                  Read Case Brief
                </button>
                {notes[c.id] && (
                  <div style={{ display: 'flex', alignItems: 'center', color: 'var(--gold-primary)', padding: '0 5px' }} title="Has saved notes">
                    <FiAward size={18} />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Case Brief Details Modal */}
      {activeCase && (
        <div className="modal-overlay" onClick={() => setActiveCase(null)}>
          <div className="modal-content" style={{ maxWidth: '800px' }} onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setActiveCase(null)}>&times;</button>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', marginBottom: '1.5rem', alignItems: 'center' }}>
              <div>
                <h2 style={{ fontFamily: 'var(--font-serif)', color: '#fff', fontSize: '1.6rem' }}>{activeCase.title}</h2>
                <div style={{ display: 'flex', gap: '10px', fontSize: '0.85rem', marginTop: '4px' }}>
                  <span style={{ color: 'var(--gold-primary)', fontFamily: 'var(--font-serif)' }}>{activeCase.citation}</span>
                  <span style={{ color: 'var(--text-muted)' }}>|</span>
                  <span style={{ color: 'var(--text-secondary)' }}>{activeCase.category} Law</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.5' }}>
              
              <div>
                <strong style={{ color: 'var(--gold-primary)', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                  <FiFileText /> Case Facts
                </strong>
                <p>{activeCase.facts}</p>
              </div>

              <div>
                <strong style={{ color: 'var(--gold-primary)', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                  <FiHelpCircle /> Legal Questions / Issues
                </strong>
                <p style={{ fontStyle: 'italic' }}>{activeCase.issues}</p>
              </div>

              <div>
                <strong style={{ color: 'var(--gold-primary)', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                  <FiAward /> The Judgment & Ratio Decidendi
                </strong>
                <p>{activeCase.judgment}</p>
              </div>

              <div>
                <strong style={{ color: 'var(--gold-primary)', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                  <FiBookmark /> Legal Significance
                </strong>
                <p>{activeCase.significance}</p>
              </div>

              {/* Legal Notes Taking Panel */}
              <div style={{ marginTop: '1.5rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
                <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--gold-primary)' }}>
                  <FiCpu /> Personal Study Notes & Research
                </label>
                <textarea
                  className="form-control"
                  style={{ height: '100px', resize: 'vertical', marginTop: '6px', background: 'var(--bg-primary)', fontSize: '0.85rem' }}
                  placeholder="Type legal arguments, course references, or court preparation notes for this case here..."
                  value={notes[activeCase.id] || ''}
                  onChange={(e) => saveNote(activeCase.id, e.target.value)}
                />
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px', textAlign: 'right' }}>
                  Notes are auto-saved to local browser storage.
                </div>
              </div>

            </div>

            <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
              <button className="panel-btn" onClick={() => setActiveCase(null)}>Close Brief</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
