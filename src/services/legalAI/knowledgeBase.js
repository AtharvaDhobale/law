// Comprehensive Indian Law Knowledge Base & Statutory Database
// Covers Bharatiya Nyaya Sanhita (BNS, 2023), Indian Penal Code (IPC, 1860),
// Bharatiya Nagarik Suraksha Sanhita (BNSS, 2023), Bharatiya Sakshya Adhiniyam (BSA, 2023),
// and major Special & Local Acts (IT Act, NI Act, POCSO, DV Act, etc.)

export const STATUTORY_OFFENSES = [
  // --- CRIMES AGAINST HUMAN BODY ---
  {
    id: 'murder',
    category: 'Offenses Affecting the Human Body',
    title: 'Murder / Culpable Homicide Causing Death',
    keywords: [
      'murder', 'murdered', 'killed', 'kill', 'killer', 'death', 'stabbed', 'shot', 'slayed',
      'strangled', 'homicide', 'slit throat', 'poisoned to death', 'assassinated', 'dead body'
    ],
    bns: 'Section 101, Bharatiya Nyaya Sanhita (BNS), 2023',
    bnsSectionNum: '101',
    ipc: 'Section 300 / 302, Indian Penal Code (IPC), 1860',
    ipcSectionNum: '302',
    proceduralLaw: 'Section 173 BNSS (Filing FIR), Section 193 BNSS (Magistrate committal to Sessions Court)',
    specialActs: 'Arms Act 1959 (if firearm used), Explosives Substances Act (if bombs used)',
    ingredients: [
      'Act done with intention of causing death.',
      'Act done with intention of causing bodily injury known to offender to be likely to cause death.',
      'Act done with knowledge that it is so imminently dangerous that it must in all probability cause death.'
    ],
    punishment: 'Death penalty or Imprisonment for Life, and shall also be liable to fine.',
    classification: 'Cognizable (Arrest without warrant), Non-bailable, Non-compoundable, Triable by Court of Session.',
    remedy: [
      'Call Police Emergency immediately (Dial 112).',
      'Preserve crime scene without touching weapons or biological traces.',
      'Lodge immediate FIR at nearest police station (Sec 173 BNSS). If jurisdiction disputed, file Zero FIR.',
      'Ensure post-mortem examination is conducted by government medical officer.'
    ]
  },
  {
    id: 'attempt_murder',
    category: 'Offenses Affecting the Human Body',
    title: 'Attempt to Murder',
    keywords: [
      'attempt to murder', 'tried to kill', 'shot at me', 'stabbed but survived', 'attacked with sword',
      'strangulation survived', 'attempted homicide', 'fired gun at me', 'poisoned food survived'
    ],
    bns: 'Section 109, Bharatiya Nyaya Sanhita (BNS), 2023',
    bnsSectionNum: '109',
    ipc: 'Section 307, Indian Penal Code (IPC), 1860',
    ipcSectionNum: '307',
    proceduralLaw: 'Section 173 BNSS (Registration of FIR), Section 176 BNSS (Police inquiry)',
    specialActs: 'Arms Act 1959 (Sec 25/27 if prohibited firearm utilized)',
    ingredients: [
      'Doing an act with such intention or knowledge and under such circumstances that if death was caused, offender would be guilty of murder.',
      'Execution of act progressing beyond mere preparation.'
    ],
    punishment: 'Imprisonment up to 10 years and fine; if hurt is caused to any person, imprisonment for life or up to 10 years.',
    classification: 'Cognizable, Non-bailable, Non-compoundable, Triable by Court of Session.',
    remedy: [
      'Immediate hospital admission and obtain Medico-Legal Certificate (MLC).',
      'Give statement to police; if in critical condition, request Magistrate for Dying Declaration (Sec 190 BNSS).',
      'Police must seize weapon, CCTV footage, and blood-stained garments.'
    ]
  },
  {
    id: 'medical_negligence',
    category: 'Offenses Affecting the Human Body',
    title: 'Medical Negligence / Death by Rash & Negligent Act',
    keywords: [
      'doctor negligence', 'wrong medicine', 'wrong dosage', 'medical malpractice', 'surgical error',
      'surgeon mistake', 'hospital negligence', 'expired injection', 'negligent surgery', 'patient died operation',
      'anesthesia overdose', 'doctor wrong treatment'
    ],
    bns: 'Section 106(1), Bharatiya Nyaya Sanhita (BNS), 2023',
    bnsSectionNum: '106(1)',
    ipc: 'Section 304A, Indian Penal Code (IPC), 1860',
    ipcSectionNum: '304A',
    proceduralLaw: 'Jacob Mathew v. State of Punjab guidelines (Expert medical opinion required before arrest of registered doctor)',
    specialActs: 'Consumer Protection Act, 2019 (Sec 35/84 for compensation), National Medical Commission (NMC) Act, 2019',
    ingredients: [
      'Death of any person caused by rash or negligent act not amounting to culpable homicide.',
      'Gross failure of standard of reasonable care expected from a qualified medical practitioner.'
    ],
    punishment: 'For registered medical practitioners reporting and acting: Imprisonment up to 2 years and fine; otherwise up to 5 years.',
    classification: 'Cognizable, Bailable, Non-compoundable, Triable by Magistrate of First Class.',
    remedy: [
      'Immediately seize and demand certified copies of complete bed-head tickets, OT notes, and treatment charts.',
      'File complaint before State Medical Council (SMC) or National Medical Commission for professional misconduct.',
      'Lodge police complaint requesting constitution of an independent Medical Board (Civil Surgeon committee).',
      'File Consumer Complaint before State/National Consumer Commission for financial compensation.'
    ]
  },
  {
    id: 'hit_and_run',
    category: 'Offenses Affecting the Human Body',
    title: 'Rash Driving & Hit-and-Run (Failure to Report Accident)',
    keywords: [
      'hit and run', 'driver ran away', 'fled accident', 'rash driving', 'overspeeding', 'knocked down',
      'car ran over', 'bike hit and fled', 'speeding truck', 'negligent driving', 'road accident escape',
      'hit pedestrian and sped away'
    ],
    bns: 'Section 106(2) [Hit and Run] & Section 281 [Rash Driving], BNS, 2023',
    bnsSectionNum: '106(2)',
    ipc: 'Section 279 / 304A, Indian Penal Code (IPC), 1860',
    ipcSectionNum: '279 / 304A',
    proceduralLaw: 'Section 173 BNSS (FIR), Section 134 Motor Vehicles Act (Duty of driver in case of accident)',
    specialActs: 'Motor Vehicles Act, 1988 (Sec 161 - Solatium Fund for hit-and-run victims; Sec 166 - MACT claim)',
    ingredients: [
      'Rash or negligent driving of vehicle on public way endangering human life.',
      'Causing death or grave injury and escaping without reporting to police officer or magistrate immediately.'
    ],
    punishment: 'Hit-and-run with driver fleeing: Imprisonment up to 10 years and fine. Simple rash driving: Up to 6 months or ₹20,000 fine.',
    classification: 'Cognizable, Non-bailable (for Section 106(2) escape), Triable by Court of Session.',
    remedy: [
      'Note down vehicle make, color, registration number plate or collect CCTV camera footage from nearby shops.',
      'Lodge immediate FIR at nearest police station under Sec 106(2) & 281 BNS.',
      'Apply to District Magistrate / Sub-Divisional Magistrate for Solatium Scheme compensation for hit-and-run victims.',
      'File claim petition before Motor Accident Claims Tribunal (MACT).'
    ]
  },
  {
    id: 'hurt_assault',
    category: 'Offenses Affecting the Human Body',
    title: 'Voluntary Hurt / Grievous Hurt / Physical Assault',
    keywords: [
      'slapped', 'punched', 'beaten', 'beat me', 'hit me', 'assaulted', 'physical assault', 'fractured',
      'broken bone', 'beating', 'thrashed', 'kicked', 'attacked with rod', 'iron pipe', 'internal bleeding',
      'black eye', 'tooth knocked out'
    ],
    bns: 'Section 115 [Simple Hurt] / Section 117 [Grievous Hurt] / Section 118 [Dangerous Weapon], BNS, 2023',
    bnsSectionNum: '115 / 117',
    ipc: 'Section 323 [Simple Hurt] / Section 325 [Grievous Hurt] / Section 324, 326 [Dangerous Weapon], IPC',
    ipcSectionNum: '323 / 325',
    proceduralLaw: 'Section 173 BNSS (FIR), Section 176 BNSS (Investigation)',
    specialActs: 'Code of Medical Ethics / Medico-Legal Protocol',
    ingredients: [
      'Intentionally causing bodily pain, disease, or infirmity (Hurt).',
      'Grievous hurt: Emasculation, permanent privation of sight/hearing, bone fracture, or pain endangering life for 20+ days.'
    ],
    punishment: 'Simple hurt: Up to 1 year or ₹10,000 fine. Grievous hurt: Up to 7 years and fine. With deadly weapon: Up to 10 years/Life.',
    classification: 'Simple hurt: Non-cognizable, Bailable. Grievous hurt: Cognizable, Non-bailable.',
    remedy: [
      'Visit nearest Government Hospital casualty immediately for Medico-Legal Case (MLC) examination.',
      'Preserve X-rays, medical bills, discharge summary, and photos of contusions/fractures.',
      'Lodge police complaint attaching MLC report to register criminal FIR.'
    ]
  },
  {
    id: 'kidnapping_abduction',
    category: 'Offenses Affecting the Human Body',
    title: 'Kidnapping / Abduction / Hostage for Ransom',
    keywords: [
      'kidnapped', 'kidnap', 'abducted', 'abduction', 'taken away child', 'missing child', 'held hostage',
      'ransom', 'ransom call', 'demanded money for child', 'bundled into car', 'forcefully took daughter'
    ],
    bns: 'Section 137 [Kidnapping] / Section 140 [Kidnapping for Ransom], BNS, 2023',
    bnsSectionNum: '137 / 140',
    ipc: 'Section 359 / 363 [Kidnapping] / Section 364A [Ransom], IPC',
    ipcSectionNum: '363 / 364A',
    proceduralLaw: 'Section 173 BNSS (Mandatory immediate FIR without preliminary inquiry for missing children)',
    specialActs: 'Juvenile Justice (Care and Protection of Children) Act, 2015; POCSO Act 2012',
    ingredients: [
      'Taking or enticing any minor out of keeping of lawful guardian without consent, or compelling person by force.',
      'Detaining person and threatening death/hurt to compel government or person to pay ransom.'
    ],
    punishment: 'Kidnapping: Up to 7 years and fine. Kidnapping for Ransom: Death penalty or Life Imprisonment.',
    classification: 'Cognizable, Non-bailable, Non-compoundable, Triable by Court of Session.',
    remedy: [
      'Call Dial 112 immediately. Inform police of immediate threat to life.',
      'File mandatory Missing Person / Kidnapping FIR under Supreme Court guidelines (Bachpan Bachao Andolan v. UOI).',
      'Provide CDR (Call Detail Records) and record any incoming ransom demands.'
    ]
  },
  {
    id: 'criminal_intimidation',
    category: 'Offenses Affecting the Human Body',
    title: 'Criminal Intimidation / Death Threats / Phone Threats',
    keywords: [
      'threatened to kill', 'threatened me', 'death threat', 'threatening call', 'will ruin your life',
      'will shoot you', 'threatened my family', 'gangster threat', 'intimidated', 'extortion threats'
    ],
    bns: 'Section 351, Bharatiya Nyaya Sanhita (BNS), 2023',
    bnsSectionNum: '351',
    ipc: 'Section 503 / 506, Indian Penal Code (IPC), 1860',
    ipcSectionNum: '506',
    proceduralLaw: 'Section 173 BNSS / Section 175 BNSS',
    specialActs: 'Telecom Regulatory Authority rules (tracing caller ID)',
    ingredients: [
      'Threatening another with any injury to his person, reputation, or property, or to the person or reputation of any in whom that person is interested.',
      'Intent to cause alarm or cause that person to do any act which he is not legally bound to do.'
    ],
    punishment: 'Simple threat: Up to 2 years or fine. Threat to cause death or grievous hurt: Up to 7 years imprisonment or fine.',
    classification: 'Cognizable (for death threats), Non-bailable / Bailable depending on state amendments.',
    remedy: [
      'Record call audio, preserve WhatsApp voice notes, screenshots, and call logs.',
      'Submit written application to Station House Officer (SHO) seeking police protection and registration of FIR.',
      'If police fail to register, file Section 175(3) BNSS application before Judicial Magistrate.'
    ]
  },

  // --- OFFENSES AGAINST WOMEN & CHILDREN ---
  {
    id: 'dowry_domestic_cruelty',
    category: 'Offenses Against Women',
    title: 'Cruelty by Husband or In-Laws / Dowry Harassment',
    keywords: [
      'dowry', 'husband beat', 'in-laws harassing', 'tortured by husband', 'domestic violence',
      'demanding cash car marriage', 'thrown out of matrimonial house', 'harassed for gold',
      'mother-in-law abuse', 'dowry death threat'
    ],
    bns: 'Section 85 [Cruelty] / Section 86 [Definition] / Section 80 [Dowry Death], BNS, 2023',
    bnsSectionNum: '85 / 80',
    ipc: 'Section 498A [Cruelty] / Section 304B [Dowry Death], IPC',
    ipcSectionNum: '498A / 304B',
    proceduralLaw: 'Section 173 BNSS; Arnesh Kumar & BNSS Sec 35 notice of appearance guidelines',
    specialActs: 'Dowry Prohibition Act, 1961 (Sec 3 & 4); Protection of Women from Domestic Violence Act, 2005 (PWDVA)',
    ingredients: [
      'Willful conduct likely to drive woman to suicide or cause grave injury or danger to life/limb.',
      'Harassment of woman with a view to coercing her or relatives to meet unlawful demands for dowry/property.'
    ],
    punishment: 'Cruelty: Imprisonment up to 3 years and fine. Dowry Death: Imprisonment for not less than 7 years extending to Life.',
    classification: 'Cognizable, Non-bailable, Non-compoundable, Triable by Magistrate of First Class.',
    remedy: [
      'Approach nearest Women Police Station (Mahila Thana) or contact Women Helpline (Dial 181 / 1091).',
      'File petition under Section 12 of PWDVA before Magistrate for Protection Order, Residence Order, and Maintenance.',
      'Document all dowry gift lists (Streedhan), bank transfer receipts, and photograph physical injuries.'
    ]
  },
  {
    id: 'sexual_harassment_stalking',
    category: 'Offenses Against Women',
    title: 'Sexual Harassment / Stalking / Workplace Harassment',
    keywords: [
      'stalking', 'stalked', 'followed me', 'inappropriate touch', 'sexual harassment', 'workplace harassment',
      'sexual comments', 'boss asking favors', 'followed from metro', 'instagram stalking', 'unwanted physical contact'
    ],
    bns: 'Section 75 [Sexual Harassment] / Section 78 [Stalking] / Section 74 [Assault on Modesty], BNS, 2023',
    bnsSectionNum: '75 / 78',
    ipc: 'Section 354A [Harassment] / 354D [Stalking] / 354 [Modesty], IPC',
    ipcSectionNum: '354A / 354D',
    proceduralLaw: 'Section 173 BNSS; Section 183 BNSS (Recording victim statement by woman magistrate)',
    specialActs: 'Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013 (POSH Act)',
    ingredients: [
      'Unwelcome physical contact, advances, sexually colored remarks, or demanding sexual favors.',
      'Following a woman, contacting or attempting to contact repeatedly despite clear disinterest, or monitoring internet use.'
    ],
    punishment: 'Harassment: Up to 3 years and fine. Stalking (first conviction): Up to 3 years and fine; second conviction: Up to 5 years.',
    classification: 'Cognizable, Bailable (first offense of stalking) / Non-bailable (second offense).',
    remedy: [
      'At workplace: File formal complaint to Internal Committee (IC/ICC) under POSH Act within 90 days.',
      'For criminal action: File FIR at nearest police station or via National Cyber Crime Reporting Portal.',
      'Preserve digital chat history, emails, phone logs, and CCTV timestamps.'
    ]
  },
  {
    id: 'rape_pocso',
    category: 'Offenses Against Women & Children',
    title: 'Rape / Aggravated Sexual Assault / Child Sexual Abuse',
    keywords: [
      'rape', 'raped', 'sexual assault', 'forced sex', 'minor molestation', 'child abuse', 'pocso',
      'gang rape', 'intoxicated and assaulted', 'rape on false promise of marriage'
    ],
    bns: 'Section 64 [Rape] / Section 70 [Gang Rape] / Section 69 [Deceitful promise of marriage], BNS, 2023',
    bnsSectionNum: '64 / 69 / 70',
    ipc: 'Section 375 / 376 / 376D, Indian Penal Code (IPC), 1860',
    ipcSectionNum: '375 / 376',
    proceduralLaw: 'Section 173 BNSS; Section 183 BNSS (Statement before Judicial Magistrate), Section 398 BNSS (Victim compensation)',
    specialActs: 'Protection of Children from Sexual Offences (POCSO) Act, 2012 (Sections 3 to 10 - Strict presumption of guilt)',
    ingredients: [
      'Sexual intercourse without consent, against will, or obtained under fear of death/hurt or intoxication.',
      'Section 69 BNS: Sexual intercourse by deceitful means (including false promise of marriage/employment).',
      'For minors: Any sexual assault is statutory offense irrespective of alleged consent under POCSO.'
    ],
    punishment: 'Rigorous imprisonment not less than 10 years extending to Life and fine; Gang rape: 20 years to Life; POCSO: Up to Death/Life.',
    classification: 'Cognizable, Non-bailable, Non-compoundable, Triable by Special Fast Track Court / Court of Session.',
    remedy: [
      'Do not bathe or discard clothes to preserve forensic DNA evidence. Go directly to government hospital for medical examination.',
      'Police station must assign woman police officer to record FIR (Sec 173 BNSS).',
      'Statement must be recorded before Judicial Magistrate under Section 183 BNSS without delay.',
      'Apply for interim victim compensation under State Victim Compensation Scheme.'
    ]
  },

  // --- CRIMES AGAINST PROPERTY & FINANCIAL FRAUD ---
  {
    id: 'theft_snatching',
    category: 'Offenses Against Property',
    title: 'Theft / Snatching (Chain, Phone, Bag Snatching)',
    keywords: [
      'theft', 'stole', 'stolen', 'stealing', 'pickpocket', 'snatched', 'snatch', 'snatching',
      'snatched phone', 'chain snatching', 'snatched my', 'grabbed and snatched', 'gold chain',
      'bag snatching', 'bike snatched bag', 'took my wallet', 'stole laptop', 'burglar stole'
    ],
    bns: 'Section 303 [Theft] / Section 304 [Snatching - Brand New Section in BNS!], BNS, 2023',
    bnsSectionNum: '303 / 304',
    ipc: 'Section 378 / 379 [Theft], IPC (Snatching had no dedicated section in IPC)',
    ipcSectionNum: '378 / 379',
    proceduralLaw: 'Section 173 BNSS (FIR), Section 106 BNSS (Search & seizure with mandatory videography)',
    specialActs: 'State Police Acts; CEIR portal (Central Equipment Identity Register for blocked IMEI)',
    ingredients: [
      'Dishonest intention to take movable property out of possession of any person without consent.',
      'Section 304 BNS (Snatching): Theft committed by suddenly or quickly grabbing, snatching or seizing property from a person.'
    ],
    punishment: 'Theft: Up to 3 years or fine (Community service for petty theft under ₹5,000 on first offense). Snatching: Up to 3 years and fine.',
    classification: 'Cognizable, Non-bailable (Snatching & repeat theft), Triable by any Magistrate.',
    remedy: [
      'Immediately block IMEI on CEIR portal (ceir.gov.in) if mobile device is stolen.',
      'Block bank cards and UPI apps immediately if phone or wallet is lost.',
      'File written FIR at local police station mentioning device IMEI numbers, serial numbers, and invoice value.'
    ]
  },
  {
    id: 'house_trespass_burglary',
    category: 'Offenses Against Property',
    title: 'Criminal Trespass / House Trespass / Housebreaking (Burglary)',
    keywords: [
      'landlord entered', 'trespassed', 'trespass', 'house trespass', 'break in', 'broke lock',
      'intruded house', 'entered my flat without permission', 'illegal entry', 'burglary',
      'housebreaking at night', 'landlord lock out', 'threw luggage on street'
    ],
    bns: 'Section 329 [Criminal Trespass] / Section 331 [Lurking House-Trespass & Housebreaking], BNS, 2023',
    bnsSectionNum: '329 / 331',
    ipc: 'Section 441 / 447 [Trespass] / Section 442, 448 [House Trespass] / Section 457 [Night Burglary], IPC',
    ipcSectionNum: '447 / 448 / 457',
    proceduralLaw: 'Section 173 BNSS (FIR), Section 145/146 BNSS (Disputes concerning land/possession)',
    specialActs: 'Specific Relief Act, 1963 (Section 6 - Summary suit for recovery of possession by dispossessed person)',
    ingredients: [
      'Entering into or upon property in possession of another with intent to commit an offense, intimidate, insult or annoy.',
      'Entering a dwelling house or breaking open locks/doors without lawful authority.'
    ],
    punishment: 'Simple trespass: Up to 3 months or ₹5,000 fine. House-trespass: Up to 1 year and fine. Housebreaking by night: Up to 5 years (up to 14 years if with intent to steal).',
    classification: 'Cognizable, Bailable (simple) / Non-bailable (night housebreaking), Triable by Magistrate.',
    remedy: [
      'Take photos and video evidence of broken locks, displaced goods, or trespasser on premises.',
      'File immediate police complaint under Section 329/331 BNS.',
      'If landlord illegally threw tenant out: File Section 6 Specific Relief Act suit in Civil Court for immediate restoration of possession.'
    ]
  },
  {
    id: 'robbery_dacoity',
    category: 'Offenses Against Property',
    title: 'Robbery / Armed Robbery / Dacoity',
    keywords: [
      'robbed', 'robbery', 'armed robbery', 'held at gunpoint', 'knife to throat and took money',
      'dacoity', 'gang of 5 robbers', 'highway robbery', 'robbed jewellery shop', 'looted'
    ],
    bns: 'Section 309 [Robbery] / Section 310 [Dacoity], BNS, 2023',
    bnsSectionNum: '309 / 310',
    ipc: 'Section 390 / 392 [Robbery] / Section 391 / 395 [Dacoity], IPC',
    ipcSectionNum: '392 / 395',
    proceduralLaw: 'Section 173 BNSS; Section 105 BNSS (Attachment of proceeds of crime)',
    specialActs: 'Arms Act, 1959 (Sec 25/27 for lethal weapons)',
    ingredients: [
      'Theft accompanied by causing or attempting to cause death, hurt, or wrongful restraint, or fear of instant hurt.',
      'Dacoity: When robbery is committed by 5 or more persons conjointly.'
    ],
    punishment: 'Robbery: Rigorous imprisonment up to 10 years and fine (up to 14 years if on highway). Dacoity: Life imprisonment or rigorous up to 10 years.',
    classification: 'Cognizable, Non-bailable, Non-compoundable, Triable by Court of Session.',
    remedy: [
      'Dial 112 immediately. Note descriptions, tattoos, accents, and getaway vehicle numbers.',
      'Preserve all CCTV footage and forensic fingerprints at scene.',
      'File formal FIR under Section 309/310 BNS and Arms Act.'
    ]
  },
  {
    id: 'cheating_fraud',
    category: 'Offenses Against Property',
    title: 'Cheating / Financial Fraud / 420 Scams / Job & Loan Scams',
    keywords: [
      'cheated', 'cheat', 'fraud', 'scam', 'swindled', 'duped', 'fake job offer', 'telegram scam',
      'crypto scam', 'investment fraud', 'ponzi scheme', 'took money promised job', '420', 'fake visa'
    ],
    bns: 'Section 318(4) [Cheating and Dishonestly Inducing Delivery of Property], BNS, 2023',
    bnsSectionNum: '318(4)',
    ipc: 'Section 415 / 420, Indian Penal Code (IPC), 1860',
    ipcSectionNum: '420',
    proceduralLaw: 'Section 173 BNSS (FIR), Section 107 BNSS (Power to freeze bank accounts)',
    specialActs: 'Banning of Unregulated Deposit Schemes (BUDS) Act, 2019; Prevention of Money Laundering Act (PMLA), 2002',
    ingredients: [
      'Deceiving any person fraudulently or dishonestly.',
      'Inducing person so deceived to deliver any property, valuable security, or money.'
    ],
    punishment: 'Simple cheating: Up to 3 years or fine. Cheating with delivery of property (Sec 318(4)): Imprisonment up to 7 years and fine.',
    classification: 'Cognizable, Non-bailable, Triable by Magistrate of First Class.',
    remedy: [
      'Dial 1930 (National Cyber Financial Fraud Helpline) within the golden hour to freeze funds in fraudster accounts.',
      'Lodge cyber complaint at cybercrime.gov.in and download the acknowledgment PDF.',
      'File FIR at Cyber Crime Police Station with bank statement, transaction UTR numbers, and WhatsApp/Telegram chat exports.'
    ]
  },
  {
    id: 'forgery',
    category: 'Offenses Against Property',
    title: 'Forgery / Fake Documents / Forged Signature & Property Papers',
    keywords: [
      'forgery', 'forged signature', 'fake documents', 'fake deed', 'forged will', 'forged cheque',
      'fake stamp paper', 'counterfeit documents', 'fake degree', 'forged property papers'
    ],
    bns: 'Section 336 [Forgery] / Section 338 [Valuable Security Forgery] / Section 340 [Using Forged Doc], BNS, 2023',
    bnsSectionNum: '336 / 338 / 340',
    ipc: 'Section 463 / 465 / 467 [Valuable Security] / 468 [For Cheating] / 471, IPC',
    ipcSectionNum: '463 / 467 / 468 / 471',
    proceduralLaw: 'Section 173 BNSS; Section 63 BSA (Expert opinion on handwriting / FSL examination)',
    specialActs: 'Registration Act, 1908 (Sec 82/83 for false statements before sub-registrar)',
    ingredients: [
      'Making a false document, electronic record, or part of a document with intent to cause damage/injury or support false claim.',
      'Dishonestly executing document knowing it was made without authority.'
    ],
    punishment: 'Simple forgery: Up to 2 years or fine. Forgery of valuable security/will: Imprisonment for Life or up to 10 years and fine.',
    classification: 'Cognizable, Non-bailable (for Sec 338/467 valuable security), Triable by Court of Session / Magistrate.',
    remedy: [
      'Obtain certified copies of forged deeds from Sub-Registrar Office.',
      'Commission a preliminary forensic handwriting verification report from a certified Government Forensic Examiner.',
      'File FIR under Sec 336, 338, 340 BNS. In land disputes, file Civil Declaratory Suit for cancellation of forged deed.'
    ]
  },
  {
    id: 'extortion_blackmail',
    category: 'Offenses Against Property',
    title: 'Extortion / Blackmail / Sextortion / Threat to Leak Photos',
    keywords: [
      'blackmail', 'blackmailed', 'extort', 'extortion', 'sextortion', 'leak photos', 'leak video',
      'demanding money threat', 'threaten to expose', 'demanded ransom to delete video', 'morphed photos'
    ],
    bns: 'Section 308 [Extortion], Bharatiya Nyaya Sanhita (BNS), 2023',
    bnsSectionNum: '308',
    ipc: 'Section 383 / 384 [Extortion] / Section 389, Indian Penal Code (IPC), 1860',
    ipcSectionNum: '383 / 384',
    proceduralLaw: 'Section 173 BNSS; Section 107 BNSS (Account freeze)',
    specialActs: 'Information Technology Act, 2000 (Sec 66E - Privacy violation, Sec 67A - Sexually explicit content)',
    ingredients: [
      'Intentionally putting any person in fear of any injury to that person or any other.',
      'Dishonestly inducing person so put in fear to deliver any property, money, or valuable security.'
    ],
    punishment: 'Imprisonment up to 3 years, or fine, or both. Putting in fear of death/grievous hurt for extortion: Up to 10 years.',
    classification: 'Cognizable, Non-bailable, Triable by Magistrate of First Class.',
    remedy: [
      'DO NOT transfer money. Paying blackmailers never stops the extortion.',
      'Take screenshots of all threats, accounts, UPI IDs, and numbers before blocking.',
      'Report urgently on National Cybercrime Portal (cybercrime.gov.in) under "Women/Child Crime" or "Financial Fraud".',
      'File FIR with Cyber Police Station under Section 308 BNS and Section 66E/67A IT Act.'
    ]
  },
  {
    id: 'cheque_bounce',
    category: 'Commercial & Financial Disputes',
    title: 'Dishonour of Cheque / Cheque Bounce (Insufficient Funds)',
    keywords: [
      'cheque bounce', 'check bounce', 'bounced cheque', 'dishonour of cheque', 'insufficient funds',
      'cheque returned unpaid', 'stop payment', 'account closed cheque', 'section 138', '138 ni act'
    ],
    bns: 'Negotiable Instruments Act, 1881 (Sec 138) + Section 318 BNS (if fraudulent intention from inception)',
    bnsSectionNum: 'NI Act 138',
    ipc: 'Section 138 Negotiable Instruments Act, 1881 + Section 420 IPC',
    ipcSectionNum: 'NI Act 138',
    proceduralLaw: 'Section 142/143 NI Act (Summary trial by Judicial Magistrate), Section 143A (Interim compensation up to 20%)',
    specialActs: 'Negotiable Instruments Act, 1881 (Sections 138, 139, 141, 142, 143A)',
    ingredients: [
      'Cheque drawn on an account maintained by drawer for discharge of a legally enforceable debt/liability.',
      'Cheque presented within 3 months validity and returned unpaid by bank with memo "funds insufficient".',
      'Statutory Legal Demand Notice sent within 30 days of receiving bank return memo.',
      'Drawer failing to make payment within 15 days of receiving legal demand notice.'
    ],
    punishment: 'Imprisonment up to 2 years, or fine which may extend to twice the amount of the cheque, or both.',
    classification: 'Non-cognizable, Bailable, Compoundable, Triable by Judicial Magistrate First Class / Metropolitan Magistrate.',
    remedy: [
      'CRITICAL TIMELINE: Send formal Statutory Legal Demand Notice through advocate within 30 DAYS of bank bounce memo.',
      'Give drawer mandatory 15 DAYS to make payment from date of receipt of notice.',
      'If unpaid after 15 days, file Criminal Complaint under Section 138 NI Act within 30 DAYS in competent Magistrate Court.',
      'Apply under Section 143A NI Act for interim compensation of up to 20% of the cheque amount during trial.'
    ]
  },

  // --- CYBER CRIMES & DIGITAL HARASSMENT ---
  {
    id: 'cyber_hacking_phishing',
    category: 'Cyber & Technology Crimes',
    title: 'Cyber Crimes / Hacking / Phishing / OTP Theft / Identity Theft',
    keywords: [
      'hacked', 'hack', 'phishing', 'otp stolen', 'unauthorized transaction', 'sim swap', 'account hacked',
      'ransomware', 'identity theft', 'fake website clone', 'data breach', 'card cloned', 'cyber fraud'
    ],
    bns: 'Sections 66, 66C, 66D, Information Technology (IT) Act, 2000 & Section 318(4) BNS',
    bnsSectionNum: 'IT Act 66 / BNS 318',
    ipc: 'IT Act 66, 66C, 66D + Section 420 IPC',
    ipcSectionNum: 'IT Act 66 / IPC 420',
    proceduralLaw: 'Section 173 BNSS; Section 63 BSA (Admissibility of electronic records and hash value validation)',
    specialActs: 'Information Technology Act, 2000 (Sec 43, 66, 66C, 66D); RBI Circular on Limited Liability of Customers',
    ingredients: [
      'Fraudulent or dishonest use of electronic signature, password, or unique identification feature of another (Sec 66C).',
      'Cheating by personation by using computer resource or communication device (Sec 66D).'
    ],
    punishment: 'Imprisonment up to 3 years and fine up to ₹1,00,000 for IT Act offenses; up to 7 years for BNS 318 cheating.',
    classification: 'Cognizable, Bailable/Non-bailable depending on section, Triable by Magistrate.',
    remedy: [
      'Call 1930 immediately to freeze financial transactions.',
      'Under RBI guidelines: Report unauthorized transaction to bank within 3 working days for ZERO customer liability.',
      'Lodge cyber incident at cybercrime.gov.in and save transaction hash / SMS headers.',
      'File formal FIR at designated Cyber Crime Police Station.'
    ]
  },
  {
    id: 'defamation_online',
    category: 'Offenses Against Reputation',
    title: 'Defamation / Online Character Assassination / WhatsApp Defamation',
    keywords: [
      'defamed', 'defamation', 'slander', 'libel', 'reputation harmed', 'fake rumors', 'insulted online',
      'defamatory whatsapp message', 'defamed on social media', 'character assassination', 'tarnished image'
    ],
    bns: 'Section 356, Bharatiya Nyaya Sanhita (BNS), 2023',
    bnsSectionNum: '356',
    ipc: 'Section 499 / 500, Indian Penal Code (IPC), 1860',
    ipcSectionNum: '499 / 500',
    proceduralLaw: 'Section 223 BNSS (Private complaint before Magistrate); Note: Police cannot register FIR without Magistrate order',
    specialActs: 'Information Technology Act, 2000 (Sec 66A was struck down; relies on BNS 356 and Sec 79 Intermediary Guidelines)',
    ingredients: [
      'Making or publishing any imputation concerning any person.',
      'Intent to harm or knowing/having reason to believe that such imputation will harm reputation of person.',
      'Exceptions apply for truth published for public good, fair comment on public conduct, etc.'
    ],
    punishment: 'Simple imprisonment up to 2 years, or with fine, or both, or COMMUNITY SERVICE (New progressive reform under BNS!).',
    classification: 'Non-cognizable, Bailable, Compoundable, Triable by Court of Session / Magistrate of First Class.',
    remedy: [
      'Take certified screenshot prints with timestamp, URL, and user profile metadata.',
      'Send formal Legal Cease and Desist Notice through advocate demanding unconditional public apology and removal.',
      'If not retracted: File Private Criminal Defamation Complaint under Section 223 BNSS before Judicial Magistrate.',
      'Optionally file Civil Defamation Suit for financial damages in Civil Court.'
    ]
  },

  // --- COMMERCIAL, CONTRACT & TENANCY DISPUTES ---
  {
    id: 'contract_breach',
    category: 'Commercial & Civil Disputes',
    title: 'Breach of Contract / Non-Payment of Freelancer or Vendor Dues',
    keywords: [
      'breach of contract', 'broken agreement', 'did not pay work', 'client not paying', 'freelancer payment',
      'unpaid invoice', 'contractual dispute', 'vendor payment delayed', 'breach of terms', 'nda violation'
    ],
    bns: 'Section 73 & 74, Indian Contract Act, 1872 (Civil) + Order 37 CPC (Summary Suit)',
    bnsSectionNum: 'Contract Act 73',
    ipc: 'Civil Action (No direct criminal IPC/BNS section unless deceitful intention existed at inception under BNS 318)',
    ipcSectionNum: 'Civil Action',
    proceduralLaw: 'Commercial Courts Act, 2015 (Mandatory Pre-Institution Mediation under Section 12A)',
    specialActs: 'MSMED Act, 2006 (Sec 18 - Micro & Small Enterprise Facilitation Council for 3x bank interest on delayed payments)',
    ingredients: [
      'Valid contract exists between parties with lawful consideration.',
      'Failure by one party to perform contractual obligations without valid legal excuse.',
      'Direct loss or damage naturally arising from breach.'
    ],
    punishment: 'Civil decree for payment of outstanding dues + commercial interest + court costs / damages.',
    classification: 'Civil Suit / Commercial Suit.',
    remedy: [
      'Send formal 15-day Legal Notice for Recovery of Dues through advocate.',
      'If registered under MSME: File online petition on MSME Samadhaan portal to recover principal + 3x compound bank interest.',
      'File Commercial Summary Suit under Order 37 CPC for swift decree without long trial.',
      'If breach involved dishonest inducement from start: File criminal cheating complaint under Section 318(4) BNS.'
    ]
  },
  {
    id: 'builder_rera_delay',
    category: 'Real Estate & Property Law',
    title: 'Builder Delay / Non-Possession of Flat / RERA Violations',
    keywords: [
      'builder delay', 'flat possession delayed', 'rera', 'builder fraud', 'possession not given',
      'delayed project', 'builder demanding extra money', 'homebuyer dispute', 'rera refund'
    ],
    bns: 'Section 18 & 31, Real Estate (Regulation and Development) Act (RERA), 2016',
    bnsSectionNum: 'RERA 18',
    ipc: 'RERA Act + Section 318(4) BNS (if funds siphoned)',
    ipcSectionNum: 'RERA 18',
    proceduralLaw: 'Section 31 RERA (Complaint before RERA Authority / Adjudicating Officer)',
    specialActs: 'Insolvency and Bankruptcy Code (IBC), 2016 (Homebuyers as financial creditors)',
    ingredients: [
      'Allottee made payments as per Builder-Buyer Agreement (BBA).',
      'Promoter/Builder failed to give possession by agreed completion date specified in RERA registration.'
    ],
    punishment: 'Full refund of all amounts paid with monthly interest (SBI highest MCLR + 2%) OR monthly delay compensation until possession.',
    classification: 'Special Statutory Regulatory Forum (RERA Authority & Appellate Tribunal).',
    remedy: [
      'File online complaint before State RERA Authority under Section 31 of RERA Act.',
      'Pray for Option A: Complete refund of money with interest; OR Option B: Monthly delay compensation until possession.',
      'If builder siphoned funds into shell companies: Lodge complaint with Economic Offences Wing (EOW) under BNS 318(4).'
    ]
  },
  {
    id: 'corruption_bribery',
    category: 'Public Order & Anti-Corruption',
    title: 'Bribery / Public Official Corruption / Extortion by Police',
    keywords: [
      'bribe', 'corruption', 'demanded bribe', 'police asked money', 'government official bribe',
      'kickback', 'bribe for license', 'anti corruption', 'public servant bribe'
    ],
    bns: 'Section 7 & 13, Prevention of Corruption Act, 1988 (Amended 2018)',
    bnsSectionNum: 'PC Act 7 / 13',
    ipc: 'Prevention of Corruption Act, 1988 (PC Act)',
    ipcSectionNum: 'PC Act 7 / 13',
    proceduralLaw: 'Section 17A PC Act (Prior approval for inquiry against public servants)',
    specialActs: 'Central Vigilance Commission (CVC) Act; State Anti-Corruption Bureau (ACB)',
    ingredients: [
      'Public servant obtaining or demanding any undue advantage with intention to perform public duty improperly or dishonestly.',
      'Note: Section 8 PC Act also penalizes the bribe-giver unless reported within 7 days.'
    ],
    punishment: 'Imprisonment for not less than 3 years extending up to 7 years, along with fine.',
    classification: 'Cognizable, Non-bailable, Triable by Special Judge (CBI / ACB).',
    remedy: [
      'DO NOT pay the bribe.',
      'Report demand immediately to State Anti-Corruption Bureau (ACB) or CBI Anti-Corruption Branch.',
      'The ACB will lay a trap with phenolphthalein-powder-treated currency notes to catch the corrupt official red-handed.',
      'Report online at Central Vigilance Commission (cvc.gov.in).'
    ]
  },
  {
    id: 'public_nuisance_noise',
    category: 'Public Order & Environment',
    title: 'Public Nuisance / Noise Pollution / Loud Music at Night',
    keywords: [
      'loud music', 'noise pollution', 'loudspeakers night', 'public nuisance', 'neighbor disturbing peace',
      'garbage in street', 'dog barking non stop harassment', 'blocking public road'
    ],
    bns: 'Section 270 [Public Nuisance], Bharatiya Nyaya Sanhita (BNS), 2023',
    bnsSectionNum: '270',
    ipc: 'Section 268 / 290, Indian Penal Code (IPC), 1860',
    ipcSectionNum: '268 / 290',
    proceduralLaw: 'Section 152 BNSS (Conditional order for removal of nuisance by Executive Magistrate / SDM)',
    specialActs: 'Noise Pollution (Regulation and Control) Rules, 2000 (Strict ban on loudspeakers between 10 PM and 6 AM)',
    ingredients: [
      'Act causing common injury, danger, or annoyance to the public or people in general living in vicinity.',
      'Violation of ambient noise standards prescribed by Noise Rules.'
    ],
    punishment: 'Fine up to ₹1,000 (BNS). If continued after injunction: Up to 6 months imprisonment.',
    classification: 'Non-cognizable, Bailable, Triable by any Magistrate.',
    remedy: [
      'Dial 112 for immediate police intervention during late-night hours (after 10 PM).',
      'Submit written petition under Section 152 BNSS to Sub-Divisional Magistrate (SDM) seeking injunctive orders.',
      'Lodge complaint with State Pollution Control Board or Municipal Corporation.'
    ]
  }
];

// Contextual Procedural Guides for Quick Queries
export const PROCEDURAL_GUIDES = {
  zero_fir: {
    title: 'Zero FIR — Legal Procedure & Rights',
    bnsCode: 'Section 173(1), Bharatiya Nagarik Suraksha Sanhita (BNSS), 2023',
    ipcEquivalent: 'Section 154 CrPC / Lalita Kumari Guidelines',
    summary: 'A Zero FIR can be registered at ANY police station irrespective of territorial jurisdiction if a cognizable offense has occurred. The police station registers it with "0" as crime number, provides a free copy to informant, and transfers it to the jurisdictional police station.'
  },
  anticipatory_bail: {
    title: 'Anticipatory Bail (Pre-Arrest Bail)',
    bnsCode: 'Section 482, Bharatiya Nagarik Suraksha Sanhita (BNSS), 2023',
    ipcEquivalent: 'Section 438, Code of Criminal Procedure (CrPC), 1973',
    summary: 'Direction for grant of bail to a person apprehending arrest in a non-bailable offense. Filed before Sessions Court or High Court before arrest occurs.'
  },
  regular_bail: {
    title: 'Regular Bail & Default Bail',
    bnsCode: 'Section 480 & 483, Bharatiya Nagarik Suraksha Sanhita (BNSS), 2023',
    ipcEquivalent: 'Section 437 & 439 CrPC, 1973',
    summary: 'Bail sought after person has been arrested and taken into custody. Default bail under Sec 187 BNSS is an indefeasible right if chargesheet is not filed within 60 or 90 days.'
  },
  arrest_guidelines: {
    title: 'Arrest Safeguards & Notice of Appearance',
    bnsCode: 'Section 35, Bharatiya Nagarik Suraksha Sanhita (BNSS), 2023',
    ipcEquivalent: 'Section 41 & 41A CrPC / Arnesh Kumar v. State of Bihar',
    summary: 'For offenses punishable with imprisonment up to 7 years, arrest is NOT automatic. Police officer must issue a Notice of Appearance under Section 35(3) BNSS unless specific reasons justifying arrest are recorded in writing.'
  }
};
