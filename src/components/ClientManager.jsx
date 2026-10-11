import React, { useState, useEffect } from 'react';
import { FiUsers, FiCalendar, FiMail, FiPlus, FiTrash2, FiUserPlus, FiEdit3, FiInfo, FiSend, FiFileText, FiDollarSign, FiSearch, FiChevronDown, FiChevronUp, FiPlusCircle, FiList } from 'react-icons/fi';

const MOCK_CLIENTS = [
  {
    id: 1,
    name: 'Ramesh Kumar',
    email: 'ramesh.kumar.example@gmail.com',
    phone: '+91 98765 43210',
    matter: 'Property Encroachment Dispute',
    sections: 'Sec 303 BNS (Theft), Sec 324 BNS (Mischief)',
    hearingDate: '2026-08-15',
    courtroom: 'Courtroom 4, High Court',
    status: 'active',
    notes: 'Land boundary dispute with northern neighbor. Survey report scheduled next week.',
    billing: [
      { id: 101, desc: 'Initial Retainer', amount: '₹20,000', status: 'paid', date: '2026-07-10' },
      { id: 102, desc: 'Written Statement Drafting', amount: '₹10,000', status: 'unpaid', date: '2026-07-25' }
    ],
    documents: ['Boundary_Survey_Map.pdf', 'Chamber_Legal_Notice.docx', 'Property_Tax_Receipts.zip']
  },
  {
    id: 2,
    name: 'Priya Sharma',
    email: 'priya.sharma.legal@gmail.com',
    phone: '+91 87654 32109',
    matter: 'Defamation Case on Social Media',
    sections: 'Sec 356 BNS (Defamation)',
    hearingDate: '2026-08-22',
    courtroom: 'JMFC Court 2, Delhi',
    status: 'active',
    notes: 'Defamation suit against ex-partner for malicious social media posts. Screenshots secured.',
    billing: [
      { id: 201, desc: 'Consultation Fee', amount: '₹5,000', status: 'paid', date: '2026-07-02' },
      { id: 202, desc: 'Filing Defamation Suit', amount: '₹15,000', status: 'paid', date: '2026-07-15' }
    ],
    documents: ['Insta_Post_Screenshots.pdf', 'Criminal_Complaint_Draft.pdf']
  },
  {
    id: 3,
    name: 'Vikram Singh',
    email: 'vikram.singh.tech@yahoo.com',
    phone: '+91 76543 21098',
    matter: 'Venture Capital Contract Dispute',
    sections: 'Sec 73 Indian Contract Act',
    hearingDate: '2026-09-05',
    courtroom: 'Arbitration Bench 1',
    status: 'pending',
    notes: 'Breach of non-compete clause by outgoing cofounder. Arbitration clause triggered.',
    billing: [
      { id: 301, desc: 'Contract Audit & Advisory', amount: '₹12,000', status: 'unpaid', date: '2026-07-28' }
    ],
    documents: ['Shareholders_Agreement.pdf', 'VC_TermSheet.pdf']
  }
];

const PLAN_TEMPLATES = [
  {
    id: 'retainer',
    name: 'Corporate Retainer Plan',
    subject: 'Proposed Legal Retainer Agreement - Nyaya Chambers',
    body: (clientName, matter) => `Dear ${clientName},

Following our recent consultation regarding the "${matter}", we are pleased to outline our proposal for a Retainer Legal Plan.

Under this plan, Nyaya Chambers will provide:
1. Unlimited advisory services and contract review related to your matter.
2. Representation in scheduled court hearings.
3. 24/7 legal emergency support.

Fee Structure: ₹25,000 per month (invoiced quarterly).

Please review the attached draft agreement and let us know if you have any questions. We look forward to representing you.

Warm regards,
Advocate Chambers`
  },
  {
    id: 'per-hearing',
    name: 'Per-Hearing Representation Plan',
    subject: 'Fee Structure: Scheduled Representation - ${hearingDate}',
    body: (clientName, matter, date) => `Dear ${clientName},

This is regarding your upcoming hearing for "${matter}" scheduled on ${date}.

To ensure representation by our senior legal team, we propose our Standard Per-Hearing Fee Plan:
1. Drafting and filing of replies/applications: Included.
2. Senior Counsel appearance fee: ₹15,000 per hearing session.
3. Clerkage and administrative filings: ₹2,000.

Kindly confirm your approval so we can finalize the briefs and instruct the lead counsel.

Best regards,
Advocate Chambers`
  },
  {
    id: 'consultation',
    name: 'Initial Advisory & Study Plan',
    subject: 'Case Analysis & Advisory Roadmap - Nyaya Chambers',
    body: (clientName, matter) => `Dear ${clientName},

Thank you for selecting Nyaya Chambers. To perform a comprehensive legal audit and section mapping for your matter "${matter}", we propose our Case Advisory Plan:

Services Included:
- Comprehensive evidence evaluation.
- Pre-trial research and compilation of matching landmark Supreme Court judgments.
- Written Legal Opinion detailing strengths and vulnerabilities.

One-time Advisory Fee: ₹8,500.

Let us know when you would like to schedule our next strategy session.

Regards,
Advocate Chambers`
  }
];

export default function ClientManager() {
  const [clients, setClients] = useState([]);
  const [expandedClientId, setExpandedClientId] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(PLAN_TEMPLATES[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  // Input states for Add/Edit Form
  const [clientIdToEdit, setClientIdToEdit] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [matter, setMatter] = useState('');
  const [sections, setSections] = useState('');
  const [hearingDate, setHearingDate] = useState('');
  const [courtroom, setCourtroom] = useState('');
  const [status, setStatus] = useState('active');
  const [notesText, setNotesText] = useState('');

  // Local billing state for new items
  const [newBillDesc, setNewBillDesc] = useState('');
  const [newBillAmount, setNewBillAmount] = useState('');
  const [newBillStatus, setNewBillStatus] = useState('unpaid');

  // Local document state for new files
  const [newDocName, setNewDocName] = useState('');

  // Simulated Email Sent States
  const [emailSentStatus, setEmailSentStatus] = useState('');

  // Load from local storage
  useEffect(() => {
    const saved = localStorage.getItem('nyayachambers_clients');
    if (saved) {
      try {
        setClients(JSON.parse(saved));
      } catch (e) {
        setClients(MOCK_CLIENTS);
      }
    } else {
      setClients(MOCK_CLIENTS);
      localStorage.setItem('nyayachambers_clients', JSON.stringify(MOCK_CLIENTS));
    }
  }, []);

  const saveClients = (newClients) => {
    setClients(newClients);
    localStorage.setItem('nyayachambers_clients', JSON.stringify(newClients));
  };

  const handleAddClient = (e) => {
    e.preventDefault();
    if (!name || !email || !matter) return;

    const newClient = {
      id: Date.now(),
      name,
      email,
      phone,
      matter,
      sections: sections || 'N/A',
      hearingDate: hearingDate || 'TBD',
      courtroom: courtroom || 'TBD',
      status,
      notes: notesText || 'No custom case notes logged yet.',
      billing: [],
      documents: []
    };

    const updated = [...clients, newClient];
    saveClients(updated);
    
    // Reset Form
    setName('');
    setEmail('');
    setPhone('');
    setMatter('');
    setSections('');
    setHearingDate('');
    setCourtroom('');
    setStatus('active');
    setNotesText('');
    setShowAddModal(false);
  };

  const handleOpenEditModal = (client, e) => {
    e.stopPropagation(); // Prevent row toggling
    setSelectedClient(client);
    setClientIdToEdit(client.id);
    setName(client.name);
    setEmail(client.email);
    setPhone(client.phone);
    setMatter(client.matter);
    setSections(client.sections);
    setHearingDate(client.hearingDate);
    setCourtroom(client.courtroom);
    setStatus(client.status);
    setNotesText(client.notes || '');
    setShowEditModal(true);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!clientIdToEdit) return;

    const updated = clients.map(c => {
      if (c.id === clientIdToEdit) {
        return {
          ...c,
          name,
          email,
          phone,
          matter,
          sections,
          hearingDate,
          courtroom,
          status,
          notes: notesText
        };
      }
      return c;
    });

    saveClients(updated);
    setShowEditModal(false);
    setClientIdToEdit(null);
  };

  const handleDeleteClient = (id, e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to remove this client record?')) {
      const updated = clients.filter(c => c.id !== id);
      saveClients(updated);
      if (expandedClientId === id) {
        setExpandedClientId(null);
      }
    }
  };

  const openEmailModal = (client, e) => {
    e.stopPropagation();
    setSelectedClient(client);
    setSelectedTemplate(PLAN_TEMPLATES[0]);
    setShowEmailModal(true);
    setEmailSentStatus('');
  };

  const triggerNativeEmail = () => {
    if (!selectedClient) return;
    
    const subjectText = selectedTemplate.id === 'per-hearing' 
      ? selectedTemplate.subject.replace('${hearingDate}', selectedClient.hearingDate)
      : selectedTemplate.subject;
      
    const bodyText = selectedTemplate.id === 'per-hearing'
      ? selectedTemplate.body(selectedClient.name, selectedClient.matter, selectedClient.hearingDate)
      : selectedTemplate.body(selectedClient.name, selectedClient.matter);

    const mailtoUrl = `mailto:${selectedClient.email}?subject=${encodeURIComponent(subjectText)}&body=${encodeURIComponent(bodyText)}`;
    
    setEmailSentStatus('sending');
    setTimeout(() => {
      setEmailSentStatus('sent');
      window.location.href = mailtoUrl;
    }, 1000);
  };

  const toggleRow = (id) => {
    setExpandedClientId(expandedClientId === id ? null : id);
  };

  // Add bill item to currently selected/expanded client
  const handleAddBillItem = (clientId) => {
    if (!newBillDesc || !newBillAmount) return;
    const updated = clients.map(c => {
      if (c.id === clientId) {
        const currentBilling = c.billing || [];
        return {
          ...c,
          billing: [
            ...currentBilling,
            {
              id: Date.now(),
              desc: newBillDesc,
              amount: newBillAmount.startsWith('₹') ? newBillAmount : `₹${newBillAmount}`,
              status: newBillStatus,
              date: new Date().toISOString().split('T')[0]
            }
          ]
        };
      }
      return c;
    });
    saveClients(updated);
    setNewBillDesc('');
    setNewBillAmount('');
    setNewBillStatus('unpaid');
  };

  // Add document reference to currently selected/expanded client
  const handleAddDoc = (clientId) => {
    if (!newDocName) return;
    const updated = clients.map(c => {
      if (c.id === clientId) {
        const currentDocs = c.documents || [];
        return {
          ...c,
          documents: [...currentDocs, newDocName]
        };
      }
      return c;
    });
    saveClients(updated);
    setNewDocName('');
  };

  // Filter and search
  const filteredClients = clients.filter(c => {
    const matchesStatus = filterStatus === 'All' || c.status === filterStatus.toLowerCase();
    const search = searchQuery.toLowerCase();
    const matchesSearch = c.name.toLowerCase().includes(search) || 
                          c.matter.toLowerCase().includes(search) ||
                          c.sections.toLowerCase().includes(search);
    return matchesStatus && matchesSearch;
  });

  const upcomingHearings = [...clients]
    .filter(c => c.hearingDate && c.hearingDate !== 'TBD' && c.status === 'active')
    .sort((a, b) => new Date(a.hearingDate) - new Date(b.hearingDate));

  return (
    <div>
      <div className="section-title-wrapper">
        <h2 className="section-title">Client & Hearing Dashboard</h2>
        <p className="section-subtitle">Manage client details, edit files, upload mock documents, log invoices, and draft fee contracts.</p>
      </div>

      <div className="client-dashboard">
        
        {/* Main client log table */}
        <div className="client-section-panel">
          <div className="panel-header-action" style={{ borderBottom: 'none', paddingBottom: 0 }}>
            <h3 className="panel-title">Litigation Registers</h3>
            <button className="panel-btn" style={{ display: 'flex', alignItems: 'center', gap: '6px' }} onClick={() => setShowAddModal(true)}>
              <FiUserPlus /> Add Client File
            </button>
          </div>

          {/* Search and status filter bar */}
          <div style={{ display: 'flex', gap: '10px', margin: '1rem 0 1.5rem 0', flexWrap: 'wrap', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
            <div style={{ display: 'flex', gap: '6px' }}>
              {['All', 'Active', 'Pending', 'Disposed'].map(st => (
                <button
                  key={st}
                  className={`filter-btn ${filterStatus === st ? 'active' : ''}`}
                  onClick={() => setFilterStatus(st)}
                  style={{ padding: '0.4rem 0.9rem', fontSize: '0.8rem' }}
                >
                  {st}
                </button>
              ))}
            </div>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', flexGrow: 1 }}>
              <FiSearch style={{ position: 'absolute', left: '12px', color: 'var(--text-muted)' }} />
              <input
                type="text"
                placeholder="Search by name, matter or sections..."
                className="form-control"
                style={{ paddingLeft: '35px', width: '100%', padding: '0.45rem 1rem 0.45rem 35px' }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="client-table-container">
            {filteredClients.length === 0 ? (
              <p style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem' }}>No client records match filters.</p>
            ) : (
              <table className="client-table">
                <thead>
                  <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Matter Description</th>
                    <th>Appearing Sections</th>
                    <th>Hearing Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredClients.map(client => {
                    const isExpanded = expandedClientId === client.id;
                    return (
                      <React.Fragment key={client.id}>
                        {/* Summary Row */}
                        <tr onClick={() => toggleRow(client.id)}>
                          <td style={{ width: '25px', paddingRight: '0' }}>
                            {isExpanded ? <FiChevronUp /> : <FiChevronDown />}
                          </td>
                          <td>
                            <strong style={{ color: 'var(--text-primary)' }}>{client.name}</strong>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>{client.email}</div>
                          </td>
                          <td>{client.matter}</td>
                          <td>
                            <code style={{ background: 'var(--bg-primary)', padding: '2px 6px', borderRadius: '4px', fontSize: '0.8rem', color: 'var(--gold-primary)' }}>
                              {client.sections}
                            </code>
                          </td>
                          <td>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem' }}>
                              <FiCalendar style={{ color: 'var(--gold-primary)' }} />
                              {client.hearingDate}
                            </div>
                            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '2px' }}>{client.courtroom}</div>
                          </td>
                          <td>
                            <span className={`status-badge ${client.status}`}>
                              {client.status}
                            </span>
                          </td>
                          <td>
                            <div className="action-btn-group">
                              <button className="action-btn" title="Edit File" onClick={(e) => handleOpenEditModal(client, e)}>
                                <FiEdit3 />
                              </button>
                              <button className="action-btn" title="Mail Plans" onClick={(e) => openEmailModal(client, e)}>
                                <FiMail />
                              </button>
                              <button className="action-btn" style={{ borderColor: 'rgba(224, 108, 117, 0.3)', color: 'var(--red-accent)' }} title="Remove File" onClick={(e) => handleDeleteClient(client.id, e)}>
                                <FiTrash2 />
                              </button>
                            </div>
                          </td>
                        </tr>

                        {/* Dossier Expanded Panel */}
                        {isExpanded && (
                          <tr>
                            <td colSpan="7" style={{ padding: '0 0.8rem 1rem 0.8rem', cursor: 'default' }}>
                              <div className="dossier-expanded-container">
                                <div className="dossier-grid">
                                  {/* Left: Case Notes & Docs */}
                                  <div>
                                    <div className="dossier-header-title">Litigation Briefing & Dossier</div>
                                    <div style={{ marginBottom: '1.2rem' }}>
                                      <strong style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Case Strategy & Logs:</strong>
                                      <p style={{ fontSize: '0.85rem', color: 'var(--text-primary)', background: 'var(--bg-primary)', padding: '8px 12px', borderRadius: '4px', border: '1px solid var(--border-color)', minHeight: '60px', whiteSpace: 'pre-wrap' }}>
                                        {client.notes || 'No case strategy notes logged. Edit this client file to log notes.'}
                                      </p>
                                    </div>

                                    {/* Document References */}
                                    <div>
                                      <strong style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>Uploaded Case Documents:</strong>
                                      {client.documents && client.documents.length > 0 ? (
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', marginBottom: '10px' }}>
                                          {client.documents.map((doc, dIdx) => (
                                            <div key={dIdx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', background: 'var(--bg-primary)', padding: '6px 10px', borderRadius: '4px', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}>
                                              <FiFileText style={{ color: 'var(--gold-primary)' }} />
                                              <span>{doc}</span>
                                            </div>
                                          ))}
                                        </div>
                                      ) : (
                                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '10px' }}>No documents attached to this case file.</p>
                                      )}
                                      
                                      <div style={{ display: 'flex', gap: '8px' }}>
                                        <input
                                          type="text"
                                          placeholder="File name (e.g. Complaint_Copy.pdf)"
                                          className="form-control"
                                          style={{ padding: '4px 8px', fontSize: '0.8rem', flexGrow: 1 }}
                                          value={newDocName}
                                          onChange={e => setNewDocName(e.target.value)}
                                        />
                                        <button className="panel-btn" style={{ padding: '4px 10px', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '4px' }} onClick={() => handleAddDoc(client.id)}>
                                          <FiPlusCircle /> Attach
                                        </button>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Right: Invoicing & Billing Ledger */}
                                  <div>
                                    <div className="dossier-header-title">Invoice & Billing Ledger</div>
                                    
                                    <div style={{ maxHeight: '140px', overflowY: 'auto', marginBottom: '1rem', border: '1px solid var(--border-color)', borderRadius: '4px', background: 'var(--bg-primary)' }}>
                                      {client.billing && client.billing.length > 0 ? (
                                        <table style={{ width: '100%', fontSize: '0.8rem', borderCollapse: 'collapse' }}>
                                          <thead>
                                            <tr style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)' }}>
                                              <th style={{ padding: '6px 10px', color: 'var(--text-muted)' }}>Description</th>
                                              <th style={{ padding: '6px 10px', color: 'var(--text-muted)' }}>Amount</th>
                                              <th style={{ padding: '6px 10px', color: 'var(--text-muted)' }}>Status</th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            {client.billing.map(bill => (
                                              <tr key={bill.id} style={{ borderBottom: '1px dashed var(--border-color)' }}>
                                                <td style={{ padding: '6px 10px' }}>{bill.desc}</td>
                                                <td style={{ padding: '6px 10px', fontWeight: '500' }}>{bill.amount}</td>
                                                <td style={{ padding: '6px 10px' }}>
                                                  <span style={{ fontSize: '0.7rem', padding: '2px 6px', borderRadius: '3px', textTransform: 'uppercase', 
                                                    background: bill.status === 'paid' ? 'rgba(152,195,121,0.1)' : 'rgba(224,108,117,0.1)',
                                                    color: bill.status === 'paid' ? 'var(--green-accent)' : 'var(--red-accent)',
                                                    border: bill.status === 'paid' ? '1px solid rgba(152,195,121,0.2)' : '1px solid rgba(224,108,117,0.2)'
                                                  }}>
                                                    {bill.status}
                                                  </span>
                                                </td>
                                              </tr>
                                            ))}
                                          </tbody>
                                        </table>
                                      ) : (
                                        <p style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '1.5rem', fontSize: '0.75rem' }}>No invoice items logged.</p>
                                      )}
                                    </div>

                                    {/* Add Bill Item Form */}
                                    <div style={{ background: 'var(--bg-secondary)', padding: '10px', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
                                      <div style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--gold-primary)', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        <FiDollarSign /> Create Invoice Item
                                      </div>
                                      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                                        <input
                                          type="text"
                                          placeholder="Description (e.g. Bail Application)"
                                          className="form-control"
                                          style={{ padding: '4px 8px', fontSize: '0.8rem', flexGrow: 2 }}
                                          value={newBillDesc}
                                          onChange={e => setNewBillDesc(e.target.value)}
                                        />
                                        <input
                                          type="text"
                                          placeholder="Amount (e.g. 5000)"
                                          className="form-control"
                                          style={{ padding: '4px 8px', fontSize: '0.8rem', width: '90px' }}
                                          value={newBillAmount}
                                          onChange={e => setNewBillAmount(e.target.value)}
                                        />
                                        <select
                                          className="form-control"
                                          style={{ padding: '4px 8px', fontSize: '0.8rem', width: '90px' }}
                                          value={newBillStatus}
                                          onChange={e => setNewBillStatus(e.target.value)}
                                        >
                                          <option value="unpaid">Unpaid</option>
                                          <option value="paid">Paid</option>
                                        </select>
                                        <button className="panel-btn" style={{ padding: '4px 10px', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '4px' }} onClick={() => handleAddBillItem(client.id)}>
                                          <FiPlus /> Add Bill
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Calendar hearings timeline sidebar */}
        <div className="client-section-panel" style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="panel-header-action" style={{ marginBottom: '1.2rem' }}>
            <h3 className="panel-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FiCalendar style={{ color: 'var(--gold-primary)' }} /> Calendar Schedule
            </h3>
          </div>

          {upcomingHearings.length === 0 ? (
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>No hearings scheduled for active clients.</p>
          ) : (
            <div className="hearing-timeline">
              {upcomingHearings.map(client => (
                <div key={client.id} className="timeline-item">
                  <div className="timeline-date">
                    {new Date(client.hearingDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </div>
                  <div className="timeline-details">
                    <div className="timeline-client">{client.name}</div>
                    <div className="timeline-matter">{client.matter}</div>
                    <div className="timeline-court">{client.courtroom}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div style={{ marginTop: 'auto', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)', fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <FiInfo />
            <span>Click any table row to view full strategy dossier, document list, and billing invoices.</span>
          </div>
        </div>

      </div>

      {/* Add Client Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowAddModal(false)}>&times;</button>
            <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--text-primary)', fontSize: '1.4rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.8rem' }}>
              File New Litigation Case
            </h3>
            
            <form onSubmit={handleAddClient}>
              <div className="form-group">
                <label className="form-label">Client Name *</label>
                <input type="text" className="form-control" placeholder="E.g., Ramesh Kumar" required value={name} onChange={e => setName(e.target.value)} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Email Address *</label>
                  <input type="email" className="form-control" placeholder="client@example.com" required value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone Number</label>
                  <input type="text" className="form-control" placeholder="+91 XXXXX XXXXX" value={phone} onChange={e => setPhone(e.target.value)} />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Case/Matter Description *</label>
                <input type="text" className="form-control" placeholder="Property dispute, contract audit, cyber theft, etc." required value={matter} onChange={e => setMatter(e.target.value)} />
              </div>

              <div className="form-group">
                <label className="form-label">Appearing Sections (e.g. BNS/IPC)</label>
                <input type="text" className="form-control" placeholder="E.g., Section 303 of BNS" value={sections} onChange={e => setSections(e.target.value)} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Next Hearing Date</label>
                  <input type="date" className="form-control" value={hearingDate} onChange={e => setHearingDate(e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label">Court Bench/Room</label>
                  <input type="text" className="form-control" placeholder="E.g., Courtroom 4, High Court" value={courtroom} onChange={e => setCourtroom(e.target.value)} />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Litigation Status</label>
                <select className="form-control" value={status} onChange={e => setStatus(e.target.value)}>
                  <option value="active">Active (On Trial)</option>
                  <option value="pending">Pending (Awaiting Admission)</option>
                  <option value="disposed">Disposed (Settled/Decided)</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Initial Legal Strategy Notes</label>
                <textarea className="form-control" style={{ height: '80px', resize: 'vertical' }} placeholder="Log initial thoughts or facts of case..." value={notesText} onChange={e => setNotesText(e.target.value)} />
              </div>

              <div className="form-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowAddModal(false)}>Cancel</button>
                <button type="submit" className="panel-btn">Open File</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Client Modal */}
      {showEditModal && selectedClient && (
        <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowEditModal(false)}>&times;</button>
            <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--text-primary)', fontSize: '1.4rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.8rem' }}>
              Edit Litigation Record: {selectedClient.name}
            </h3>
            
            <form onSubmit={handleSaveEdit}>
              <div className="form-group">
                <label className="form-label">Client Name *</label>
                <input type="text" className="form-control" required value={name} onChange={e => setName(e.target.value)} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Email Address *</label>
                  <input type="email" className="form-control" required value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone Number</label>
                  <input type="text" className="form-control" value={phone} onChange={e => setPhone(e.target.value)} />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Case/Matter Description *</label>
                <input type="text" className="form-control" required value={matter} onChange={e => setMatter(e.target.value)} />
              </div>

              <div className="form-group">
                <label className="form-label">Appearing Sections</label>
                <input type="text" className="form-control" value={sections} onChange={e => setSections(e.target.value)} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Next Hearing Date</label>
                  <input type="date" className="form-control" value={hearingDate} onChange={e => setHearingDate(e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label">Court Bench/Room</label>
                  <input type="text" className="form-control" value={courtroom} onChange={e => setCourtroom(e.target.value)} />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Litigation Status</label>
                <select className="form-control" value={status} onChange={e => setStatus(e.target.value)}>
                  <option value="active">Active (On Trial)</option>
                  <option value="pending">Pending (Awaiting Admission)</option>
                  <option value="disposed">Disposed (Settled/Decided)</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Case Strategy Notes</label>
                <textarea className="form-control" style={{ height: '100px', resize: 'vertical' }} value={notesText} onChange={e => setNotesText(e.target.value)} />
              </div>

              <div className="form-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowEditModal(false)}>Cancel</button>
                <button type="submit" className="panel-btn">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Plan Emailer Modal */}
      {showEmailModal && selectedClient && (
        <div className="modal-overlay" onClick={() => setShowEmailModal(false)}>
          <div className="modal-content" style={{ maxWidth: '650px' }} onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowEmailModal(false)}>&times;</button>
            <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--text-primary)', fontSize: '1.4rem', marginBottom: '1rem' }}>
              Dispatch Fee Plan Proposal
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              Draft a structured case service proposal. Select a template to auto-populate the details.
            </p>

            <div className="form-group">
              <label className="form-label">Select Plan Template</label>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {PLAN_TEMPLATES.map(tpl => (
                  <button
                    key={tpl.id}
                    type="button"
                    className={`filter-btn ${selectedTemplate.id === tpl.id ? 'active' : ''}`}
                    onClick={() => setSelectedTemplate(tpl)}
                  >
                    {tpl.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Email Form Preview */}
            <div style={{ border: '1px solid var(--border-color)', borderRadius: '6px', background: 'var(--bg-primary)', padding: '1.2rem', marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px', marginBottom: '10px' }}>
                <div><strong>To:</strong> {selectedClient.name} &lt;{selectedClient.email}&gt;</div>
                <div style={{ marginTop: '4px' }}>
                  <strong>Subject:</strong> {
                    selectedTemplate.id === 'per-hearing' 
                      ? selectedTemplate.subject.replace('${hearingDate}', selectedClient.hearingDate)
                      : selectedTemplate.subject
                  }
                </div>
              </div>
              <div style={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace', fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                {
                  selectedTemplate.id === 'per-hearing'
                    ? selectedTemplate.body(selectedClient.name, selectedClient.matter, selectedClient.hearingDate)
                    : selectedTemplate.body(selectedClient.name, selectedClient.matter)
                }
              </div>
            </div>

            {emailSentStatus === 'sending' && (
              <div style={{ textAlign: 'center', padding: '1rem', color: 'var(--gold-primary)', background: 'var(--gold-light)', border: '1px solid var(--gold-border)', borderRadius: '4px', marginBottom: '1rem', fontSize: '0.9rem' }}>
                Constructing and initiating native mail client...
              </div>
            )}

            {emailSentStatus === 'sent' && (
              <div style={{ textAlign: 'center', padding: '1rem', color: 'var(--green-accent)', background: 'rgba(152, 195, 121, 0.1)', border: '1px solid rgba(152, 195, 121, 0.3)', borderRadius: '4px', marginBottom: '1rem', fontSize: '0.9rem' }}>
                Draft loaded into mail client successfully! Simulating dispatch...
              </div>
            )}

            <div className="form-actions">
              <button type="button" className="btn-secondary" onClick={() => setShowEmailModal(false)}>Close</button>
              <button
                type="button"
                className="panel-btn"
                style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                onClick={triggerNativeEmail}
                disabled={emailSentStatus === 'sending'}
              >
                <FiSend /> Send Proposal Draft
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
