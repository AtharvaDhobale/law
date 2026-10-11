// Comprehensive Training & Verification Test Suite for Offline Legal AI Bot
import { classifySituation, generateLegalResponse } from './nlpModel.js';

export const TEST_SITUATIONS = [
  {
    id: 1,
    name: 'Street Snatching',
    input: 'Two men on a motorcycle suddenly grabbed and snatched my gold chain and sped away.',
    expectedCategory: 'Theft / Snatching (Chain, Phone, Bag Snatching)',
    expectedBnsSection: '304',
    expectedIpcSection: '379'
  },
  {
    id: 2,
    name: 'Medical Negligence',
    input: 'The doctor in the private hospital administered wrong medicine and overdose injection which killed the patient.',
    expectedCategory: 'Medical Negligence / Death by Rash & Negligent Act',
    expectedBnsSection: '106(1)',
    expectedIpcSection: '304A'
  },
  {
    id: 3,
    name: 'Online Cyber Scam / Cheating',
    input: 'I was swindled in a fake job offer on Telegram and cheated into transferring 2 lakhs via UPI.',
    expectedCategory: 'Cheating / Financial Fraud / 420 Scams / Job & Loan Scams',
    expectedBnsSection: '318(4)',
    expectedIpcSection: '420'
  },
  {
    id: 4,
    name: 'Cheque Bounce (Dishonour)',
    input: 'My business partner issued a cheque for 5 lakhs which got bounced by the bank with memo insufficient funds.',
    expectedCategory: 'Dishonour of Cheque / Cheque Bounce (Insufficient Funds)',
    expectedBnsSection: 'NI Act 138',
    expectedIpcSection: 'NI Act 138'
  },
  {
    id: 5,
    name: 'Dowry & Matrimonial Cruelty',
    input: 'My husband and in-laws beat me and tortured me demanding cash and a car for dowry.',
    expectedCategory: 'Cruelty by Husband or In-Laws / Dowry Harassment',
    expectedBnsSection: '85',
    expectedIpcSection: '498A'
  },
  {
    id: 6,
    name: 'Hit-and-Run Rash Driving',
    input: 'A speeding car hit a pedestrian on the road and the driver fled without stopping or reporting to police.',
    expectedCategory: 'Rash Driving & Hit-and-Run (Failure to Report Accident)',
    expectedBnsSection: '106(2)',
    expectedIpcSection: '304A'
  },
  {
    id: 7,
    name: 'Landlord House Trespass',
    input: 'My landlord entered my rented apartment without permission while I was away, broke my lock and threw my luggage.',
    expectedCategory: 'Criminal Trespass / House Trespass / Housebreaking (Burglary)',
    expectedBnsSection: '329',
    expectedIpcSection: '448'
  },
  {
    id: 8,
    name: 'Document Forgery',
    input: 'Someone forged my father\'s signature on a fake property sale deed to claim our land.',
    expectedCategory: 'Forgery / Fake Documents / Forged Signature & Property Papers',
    expectedBnsSection: '336',
    expectedIpcSection: '467'
  },
  {
    id: 9,
    name: 'Blackmail / Sextortion',
    input: 'An unknown person is blackmailing me threatening to leak morphed private photos unless I pay 50,000 rupees.',
    expectedCategory: 'Extortion / Blackmail / Sextortion / Threat to Leak Photos',
    expectedBnsSection: '308',
    expectedIpcSection: '384'
  },
  {
    id: 10,
    name: 'Stalking & Cyber Harassment',
    input: 'A man is stalking me continuously from my office and sending vulgar messages on Instagram.',
    expectedCategory: 'Sexual Harassment / Stalking / Workplace Harassment',
    expectedBnsSection: '78',
    expectedIpcSection: '354D'
  },
  {
    id: 11,
    name: 'Public Corruption / Bribery',
    input: 'A government municipal officer demanded a bribe of 20000 rupees to approve my shop building plan.',
    expectedCategory: 'Bribery / Public Official Corruption / Extortion by Police',
    expectedBnsSection: 'PC Act 7',
    expectedIpcSection: 'PC Act 7'
  },
  {
    id: 12,
    name: 'Dacoity / Armed Gang Robbery',
    input: 'A gang of 5 armed robbers entered our jewellery showroom with guns and looted all gold ornaments.',
    expectedCategory: 'Robbery / Armed Robbery / Dacoity',
    expectedBnsSection: '310',
    expectedIpcSection: '395'
  },
  {
    id: 13,
    name: 'Online Defamation',
    input: 'Someone spread fake rumors and defamed my professional reputation on social media.',
    expectedCategory: 'Defamation / Online Character Assassination / WhatsApp Defamation',
    expectedBnsSection: '356',
    expectedIpcSection: '500'
  },
  {
    id: 14,
    name: 'Procedural Rights: Zero FIR',
    input: 'Can the police station refuse to file my Zero FIR if the crime took place in another city?',
    expectedCategory: 'Procedural Advisory',
    expectedBnsSection: '173(1) BNSS',
    expectedIpcSection: '154 CrPC'
  },
  {
    id: 15,
    name: 'Statutory Lookup: Section 303 BNS',
    input: 'Explain Section 303 of BNS and how it replaced Section 379 IPC',
    expectedCategory: 'Statutory Section Lookup',
    expectedBnsSection: '303',
    expectedIpcSection: '379'
  },
  {
    id: 16,
    name: 'Procedural: Anticipatory Bail',
    input: 'I have a fear of arrest in a false criminal case, how to apply for anticipatory bail under BNSS?',
    expectedCategory: 'Procedural Advisory',
    expectedBnsSection: '482',
    expectedIpcSection: '438'
  },
  {
    id: 17,
    name: 'Physical Assault & Grievous Hurt',
    input: 'My neighbor attacked me with an iron pipe and fractured my arm causing severe bleeding.',
    expectedCategory: 'Voluntary Hurt / Grievous Hurt / Physical Assault',
    expectedBnsSection: '117',
    expectedIpcSection: '325'
  },
  {
    id: 18,
    name: 'Real Estate Builder Delay',
    input: 'The builder has delayed my flat possession by 3 years and is demanding extra money beyond RERA agreement.',
    expectedCategory: 'Builder Delay / Non-Possession of Flat / RERA Violations',
    expectedBnsSection: 'RERA 18',
    expectedIpcSection: 'RERA 18'
  },
  {
    id: 19,
    name: 'Public Nuisance & Noise Pollution',
    input: 'A banquet hall is playing loud music and loudspeakers at midnight disturbing our neighborhood peace.',
    expectedCategory: 'Public Nuisance / Noise Pollution / Loud Music at Night',
    expectedBnsSection: '270',
    expectedIpcSection: '290'
  },
  {
    id: 20,
    name: 'Criminal Intimidation & Phone Threats',
    input: 'A local gangster made a threatening call saying he will shoot my brother if we don\'t withdraw the case.',
    expectedCategory: 'Criminal Intimidation / Death Threats / Phone Threats',
    expectedBnsSection: '351',
    expectedIpcSection: '506'
  }
];

/**
 * Runs the test suite against the local AI model
 * Returns execution report with pass/fail counts and details
 */
export function runTestSuite() {
  const startTime = performance.now();
  const results = [];

  for (const test of TEST_SITUATIONS) {
    const analysis = classifySituation(test.input);
    let passed = false;
    let actualDetected = '';

    if (test.expectedCategory === 'Procedural Advisory') {
      passed = analysis.mode === 'procedural';
      actualDetected = analysis.mode === 'procedural' ? analysis.guide.title : 'Not recognized as procedural';
    } else if (test.expectedCategory === 'Statutory Section Lookup') {
      passed = analysis.mode === 'section_lookup' || (analysis.primaryOffense && analysis.primaryOffense.bnsSectionNum.includes(test.expectedBnsSection));
      actualDetected = analysis.primaryOffense ? analysis.primaryOffense.title : 'No offense matched';
    } else {
      passed = analysis.primaryOffense && (
        analysis.primaryOffense.title.toLowerCase().includes(test.expectedCategory.toLowerCase().split('/')[0].trim()) ||
        (analysis.primaryOffense.bnsSectionNum && analysis.primaryOffense.bnsSectionNum.includes(test.expectedBnsSection))
      );
      actualDetected = analysis.primaryOffense ? analysis.primaryOffense.title : 'None';
    }

    results.push({
      id: test.id,
      name: test.name,
      input: test.input,
      passed,
      expected: test.expectedCategory,
      actual: actualDetected,
      bnsMatch: analysis.primaryOffense ? analysis.primaryOffense.bnsSectionNum : (analysis.guide ? analysis.guide.bnsCode : 'N/A'),
      confidence: analysis.confidence
    });
  }

  const durationMs = (performance.now() - startTime).toFixed(1);
  const passedCount = results.filter(r => r.passed).length;
  const accuracy = ((passedCount / results.length) * 100).toFixed(1);

  return {
    total: results.length,
    passed: passedCount,
    failed: results.length - passedCount,
    accuracy: `${accuracy}%`,
    durationMs: `${durationMs}ms`,
    results
  };
}
