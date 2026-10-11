// Custom Offline Legal AI Intelligence & Classification Engine
// No external API required — Fully self-contained NLP & Statutory Inference Engine

import { STATUTORY_OFFENSES, PROCEDURAL_GUIDES } from './knowledgeBase.js';

// Legal Synonym & Stemming Dictionary for Indian Legal Context
const SYNONYM_MAP = {
  // Stealing & Property
  'stole': 'theft',
  'stolen': 'theft',
  'stealing': 'theft',
  'thief': 'theft',
  'pickpocket': 'theft',
  'robbed': 'robbery',
  'looted': 'robbery',
  'dacoit': 'dacoity',
  'snatched': 'snatching',
  'snatch': 'snatching',
  'burglary': 'burglary',
  'break-in': 'burglary',
  'trespassed': 'trespass',
  'intruded': 'trespass',
  'cheated': 'cheating',
  'swindled': 'cheating',
  'duped': 'cheating',
  'scammed': 'cheating',
  'forged': 'forgery',
  'fake signature': 'forgery',
  'fake documents': 'forgery',
  
  // Violence & Harm
  'killed': 'murder',
  'kill': 'murder',
  'slayed': 'murder',
  'murdered': 'murder',
  'strangled': 'murder',
  'homicide': 'murder',
  'shot': 'assault',
  'stabbed': 'assault',
  'slapped': 'assault',
  'punched': 'assault',
  'hit': 'assault',
  'beaten': 'assault',
  'thrashed': 'assault',
  'fractured': 'assault',
  
  // Threats & Coercion
  'blackmailed': 'extortion',
  'blackmail': 'extortion',
  'extorted': 'extortion',
  'sextortion': 'extortion',
  'threatened': 'threat',
  'threat': 'threat',
  'intimidation': 'threat',
  
  // Cyber & Financial
  'hacked': 'cyber',
  'phishing': 'cyber',
  'otp': 'cyber',
  'sim swap': 'cyber',
  'bounced': 'cheque_bounce',
  'cheque': 'cheque_bounce',
  'dishonour': 'cheque_bounce',
  'bribe': 'corruption',
  'corrupt': 'corruption',
  
  // Women & Domestic
  'dowry': 'dowry',
  'in-laws': 'dowry',
  'matrimonial': 'dowry',
  'domestic violence': 'dowry',
  'stalking': 'stalking',
  'stalked': 'stalking',
  'molested': 'sexual_harassment',
  'harassed': 'sexual_harassment',
  'rape': 'rape',
  'raped': 'rape'
};

/**
 * Normalizes input text into clean lowercase tokens with stemming
 */
export function tokenizeAndNormalize(text) {
  if (!text) return [];
  const clean = text.toLowerCase().replace(/[^a-z0-9\s]/g, ' ');
  const rawTokens = clean.split(/\s+/).filter(t => t.length > 2);
  
  const expanded = [];
  for (const token of rawTokens) {
    expanded.push(token);
    if (SYNONYM_MAP[token]) {
      expanded.push(SYNONYM_MAP[token]);
    }
  }
  return expanded;
}

/**
 * Checks if query is specifically inquiring about a statutory section
 */
export function detectSectionLookup(text) {
  const t = text.toLowerCase();
  
  // Check BNS section matches
  const bnsMatch = t.match(/(?:section|sec|u\/s)\s*([0-9]+(?:\([0-9]+\))?)\s*(?:bns|bharatiya nyaya sanhita)?/i);
  // Check IPC section matches
  const ipcMatch = t.match(/(?:section|sec|u\/s)\s*([0-9]+[a-z]?)\s*(?:ipc|indian penal code)?/i);
  // Check 138 NI Act
  const niMatch = t.match(/(?:section|sec)\s*138\s*(?:ni|negotiable)?/i) || t.includes('138');

  if (niMatch) {
    const offense = STATUTORY_OFFENSES.find(o => o.id === 'cheque_bounce');
    if (offense) return { type: 'section', target: offense, querySection: 'Section 138 NI Act' };
  }

  if (bnsMatch) {
    const secNum = bnsMatch[1];
    const found = STATUTORY_OFFENSES.find(o => o.bnsSectionNum && o.bnsSectionNum.includes(secNum));
    if (found) return { type: 'section', target: found, querySection: `Section ${secNum} BNS` };
  }

  if (ipcMatch) {
    const secNum = ipcMatch[1];
    const found = STATUTORY_OFFENSES.find(o => o.ipcSectionNum && o.ipcSectionNum.includes(secNum));
    if (found) return { type: 'section', target: found, querySection: `Section ${secNum} IPC` };
  }

  return null;
}

/**
 * Checks if query is inquiring about procedural rights (bail, zero FIR, arrest)
 */
export function detectProceduralQuery(text) {
  const t = text.toLowerCase();
  if (t.includes('zero fir') || (t.includes('refuse') && t.includes('fir')) || t.includes('police not filing fir')) {
    return PROCEDURAL_GUIDES.zero_fir;
  }
  if (t.includes('anticipatory bail') || t.includes('pre arrest bail') || t.includes('fear of arrest')) {
    return PROCEDURAL_GUIDES.anticipatory_bail;
  }
  if (t.includes('regular bail') || t.includes('default bail') || t.includes('bail after arrest')) {
    return PROCEDURAL_GUIDES.regular_bail;
  }
  if (t.includes('arrest without warrant') || t.includes('notice of appearance') || t.includes('can police arrest') || t.includes('arnesh kumar')) {
    return PROCEDURAL_GUIDES.arrest_guidelines;
  }
  return null;
}

/**
 * Detects aggravating factors from situation text
 */
function detectAggravatingFactors(text) {
  const t = text.toLowerCase();
  const factors = [];
  if (t.includes('night') || t.includes('midnight') || t.includes('dark')) {
    factors.push('Offense committed at Night (Aggravating under BNS house-trespass and burglary provisions)');
  }
  if (t.includes('weapon') || t.includes('gun') || t.includes('pistol') || t.includes('knife') || t.includes('sword') || t.includes('rod') || t.includes('pipe')) {
    factors.push('Use of Deadly/Dangerous Weapon (Attracts enhanced punishment under BNS 118 / Arms Act 1959)');
  }
  if (t.includes('group') || t.includes('gang') || t.includes('5 people') || t.includes('men together') || t.includes('friends joined')) {
    factors.push('Joint Liability / Common Intention (Section 3(5) BNS / Section 34 IPC; Section 61 Criminal Conspiracy)');
  }
  if (t.includes('threatened to kill') || t.includes('threatened if call police') || t.includes('threatened with dire consequences')) {
    factors.push('Accompanied by Criminal Intimidation (Section 351 BNS / Section 506 IPC)');
  }
  if (t.includes('minor') || t.includes('child') || t.includes('girl below 18') || t.includes('school student')) {
    factors.push('Victim is a Minor (Attracts statutory protection under POCSO Act 2012 / JJ Act 2015)');
  }
  return factors;
}

/**
 * Core trained situation classifier and multi-offense matcher
 */
export function classifySituation(userInput) {
  const normalized = userInput.toLowerCase();
  const tokens = tokenizeAndNormalize(userInput);
  
  // 1. Direct section lookup check
  const sectionLookup = detectSectionLookup(userInput);
  if (sectionLookup) {
    return {
      mode: 'section_lookup',
      primaryOffense: sectionLookup.target,
      querySection: sectionLookup.querySection,
      secondaryOffenses: [],
      aggravatingFactors: [],
      confidence: 1.0
    };
  }

  // 2. Procedural rights query check
  const proceduralGuide = detectProceduralQuery(userInput);
  if (proceduralGuide) {
    return {
      mode: 'procedural',
      guide: proceduralGuide,
      confidence: 0.95
    };
  }

  // 3. Multi-label scoring across knowledge base
  const scoredOffenses = STATUTORY_OFFENSES.map(offense => {
    let score = 0;
    
    // Exact phrase matches in keywords
    for (const kw of offense.keywords) {
      if (normalized.includes(kw.toLowerCase())) {
        score += 3.5;
      }
    }

    // Token overlap matches
    for (const kw of offense.keywords) {
      const kwTokens = kw.toLowerCase().split(/\s+/);
      for (const token of tokens) {
        if (kwTokens.includes(token)) {
          score += 1.2;
        } else if (token.length > 4 && kwTokens.some(kt => kt.includes(token) || token.includes(kt))) {
          score += 0.6;
        }
      }
    }

    return {
      offense,
      score
    };
  });

  // Sort descending by score
  scoredOffenses.sort((a, b) => b.score - a.score);

  const topMatch = scoredOffenses[0];
  const secondaryMatches = scoredOffenses
    .slice(1)
    .filter(item => item.score >= 3.0 && item.score >= topMatch.score * 0.45)
    .map(item => item.offense);

  const aggravatingFactors = detectAggravatingFactors(userInput);

  return {
    mode: 'incident_analysis',
    primaryOffense: topMatch && topMatch.score >= 2.0 ? topMatch.offense : null,
    secondaryOffenses: secondaryMatches,
    aggravatingFactors,
    confidence: topMatch ? Math.min(topMatch.score / 10, 0.99) : 0
  };
}

/**
 * Formats a rich, structured, professional legal opinion response
 */
export function generateLegalResponse(userInput) {
  const analysis = classifySituation(userInput);

  if (analysis.mode === 'procedural') {
    const g = analysis.guide;
    return `### Procedural Legal Advisory: ${g.title}

1. **Governing Procedural Code:**
   - **Bharatiya Nagarik Suraksha Sanhita (BNSS, 2023):** **${g.bnsCode}**
   - **Equivalent under Old Code:** **${g.ipcEquivalent}**

2. **Legal Machinery & Operational Scope:**
   ${g.summary}

3. **Immediate Procedural Rights for Citizens:**
   - Citizens cannot be turned away by police stations on grounds of territorial jurisdiction.
   - For offenses carrying under 7 years punishment, police must adhere strictly to Section 35(3) BNSS notice requirements.
   - You have the statutory right to free legal aid under Section 341 BNSS and Article 39A of the Indian Constitution.`;
  }

  if (analysis.mode === 'section_lookup') {
    const off = analysis.primaryOffense;
    return `### Statutory Section Analysis: ${analysis.querySection} (${off.title})

1. **Statutory Provisions & Transition:**
   - **Bharatiya Nyaya Sanhita (BNS, 2023):** **${off.bns}**
   - **Indian Penal Code (IPC, 1860):** **${off.ipc}**
   - **Related Special Acts:** ${off.specialActs || 'Governed under general penal code'}

2. **Essential Legal Ingredients to Establish Offense:**
${off.ingredients.map(ing => `   - ${ing}`).join('\n')}

3. **Statutory Classification & Maximum Penalties:**
   - **Punishment:** ${off.punishment}
   - **Classification:** ${off.classification}

4. **Procedural Framework (BNSS):**
   - ${off.proceduralLaw}

5. **Recommended Statutory Next Steps:**
${off.remedy.map(r => `   - ${r}`).join('\n')}`;
  }

  // Incident Analysis Mode
  if (analysis.primaryOffense) {
    const primary = analysis.primaryOffense;
    const secondaries = analysis.secondaryOffenses;
    const factors = analysis.aggravatingFactors;

    let response = `### Legal Situation Analysis: ${primary.title}

Based on the factual circumstances described in your query, here is the comprehensive legal evaluation under the **Bharatiya Nyaya Sanhita (BNS, 2023)** and related Indian statutes:

1. **Primary Applicable Penal Provisions:**
   - **New Law:** **${primary.bns}**
   - **Old Law Equivalent:** **${primary.ipc}**
   ${primary.specialActs ? `- **Special Statutory Act:** **${primary.specialActs}**` : ''}

2. **Essential Legal Ingredients (Prima Facie Evidence Required):**
${primary.ingredients.map(ing => `   - ${ing}`).join('\n')}

3. **Statutory Classification & Prescribed Penalties:**
   - **Prescribed Punishment:** ${primary.punishment}
   - **Legal Classification:** ${primary.classification}`;

    // Overlapping / Secondary Offenses
    if (secondaries.length > 0) {
      response += `\n\n4. **Overlapping / Compound Offenses Identified:**\n`;
      secondaries.forEach(sec => {
        response += `   - **${sec.title}**: Governed by **${sec.bns}** (formerly *${sec.ipc}*). ${sec.ingredients[0]}\n`;
      });
    }

    // Aggravating Circumstances
    if (factors.length > 0) {
      response += `\n5. **Aggravating Circumstances Present in Narrative:**\n`;
      factors.forEach(f => {
        response += `   - ⚠️ **${f}**\n`;
      });
    }

    // Step-by-Step Action Roadmap
    response += `\n${secondaries.length > 0 || factors.length > 0 ? '6' : '4'}. **Recommended Strategic Legal Action Plan:**\n`;
    primary.remedy.forEach((step, idx) => {
      response += `   ${idx + 1}. ${step}\n`;
    });

    response += `\n*Governing Procedural Machinery:* **${primary.proceduralLaw}**`;
    return response;
  }

  // Fallback for unknown broad queries
  return `### Comprehensive Legal Diagnostic Assistant

I have analyzed your input across our database of statutory offenses under the **Bharatiya Nyaya Sanhita (BNS, 2023)** and the **Indian Penal Code (IPC, 1860)**.

To provide the exact statutory section and classification, please describe:
1. **What specific act took place?** (e.g., physical assault, property taken, forged deed, online scam, threat on phone)
2. **Who were the parties involved?** (e.g., landlord, neighbor, stranger, spouse, doctor, contractor)
3. **Were any weapons used, or was there monetary loss or bodily injury?**

You can also directly ask about any specific section (e.g., *"Explain Section 303 BNS"* or *"Section 138 NI Act"*) or procedural rights (e.g., *"How to file Zero FIR"* or *"Anticipatory Bail under BNSS"*).`;
}
