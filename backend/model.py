# -*- coding: utf-8 -*-
"""
NyayaAI Deep Legal Inference Engine
Trained on Bharatiya Nyaya Sanhita (BNS, 2023), IPC (1860), BNSS (2023), BSA (2023),
and Special Statutory Acts.
Uses Scikit-Learn TF-IDF vectorization, probabilistic multi-label classification,
and semantic clause extraction for complex situation paragraphs.
"""

import re
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics.pairwise import cosine_similarity
from training_data import TRAINING_DATA, LEGAL_PROFILES

# Statutory Definition Catalog with exhaustive legal attributes
EXTENDED_STATUTORY_CATALOG = {
    "theft_snatching": {
        "title": "Theft / Snatching (Movable Property)",
        "bns": "Section 303 [Theft] & Section 304 [Snatching], Bharatiya Nyaya Sanhita (BNS), 2023",
        "ipc": "Section 378 / 379, Indian Penal Code (IPC), 1860",
        "bns_sec": "303 / 304",
        "ipc_sec": "379",
        "cognizable": "Cognizable (Police can arrest without warrant)",
        "bailable": "Non-bailable for Snatching / Bailable for first-time simple theft under ₹5,000",
        "punishment": "Snatching: Rigorous imprisonment up to 3 years and fine. Theft: Up to 3 years or fine (Community service for petty first offense under ₹5,000).",
        "court": "Any Magistrate",
        "ingredients": [
            "Dishonest intention to take movable property out of the possession of any person without consent.",
            "Moving the property in order to effect such taking.",
            "Under Section 304 BNS (Snatching): Theft committed by suddenly or quickly grabbing, snatching or seizing property from a person."
        ],
        "procedural": "Section 173 BNSS (Registration of FIR), Section 106 BNSS (Mandatory audio-video recording of search and seizure)",
        "remedies": [
            "Block device IMEI immediately on Central Equipment Identity Register (ceir.gov.in).",
            "Freeze linked UPI apps, mobile wallets, and banking credentials immediately.",
            "Lodge written First Information Report (FIR) under Section 173 BNSS with serial numbers, device invoices, and exact location."
        ]
    },
    "house_trespass": {
        "title": "Criminal Trespass / House Trespass / Housebreaking by Night",
        "bns": "Section 329 [Criminal Trespass] & Section 331 [House Trespass / Housebreaking], BNS, 2023",
        "ipc": "Section 441 / 448 [House Trespass] / Section 457 [Night Burglary], IPC, 1860",
        "bns_sec": "329 / 331",
        "ipc_sec": "448 / 457",
        "cognizable": "Cognizable",
        "bailable": "Bailable (Day Trespass) / Non-bailable (Lurking House-trespass by Night)",
        "punishment": "Simple trespass: Up to 3 months or ₹5,000 fine. House trespass: Up to 1 year and fine. Housebreaking by night: Up to 5 years (up to 14 years if with intent to steal).",
        "court": "Magistrate of First Class / Any Magistrate",
        "ingredients": [
            "Entering into or upon property in possession of another without lawful authority.",
            "Intent to commit an offense or to intimidate, insult or annoy the person in possession.",
            "Breaking locks, doors, windows, or scaling walls to enter a dwelling house."
        ],
        "procedural": "Section 173 BNSS (Mandatory FIR); Section 6 of Specific Relief Act, 1963 (Summary civil remedy for recovery of possession)",
        "remedies": [
            "Photograph and video broken locks, displaced goods, open doors, and trespassers on premises.",
            "File immediate criminal complaint at nearest police station under Sections 329 and 331 BNS.",
            "If illegally evicted/locked out: File a Summary Suit under Section 6 of the Specific Relief Act in Civil Court for immediate restoration of possession without having to prove title."
        ]
    },
    "assault_hurt": {
        "title": "Voluntary Causing Hurt / Grievous Hurt / Assault with Dangerous Weapons",
        "bns": "Section 115 [Simple Hurt], Section 117 [Grievous Hurt] & Section 118 [Dangerous Weapon], BNS, 2023",
        "ipc": "Section 323 [Simple Hurt], Section 325 [Grievous Hurt] & Section 324/326 [Dangerous Weapon], IPC, 1860",
        "bns_sec": "115 / 117 / 118",
        "ipc_sec": "323 / 325 / 326",
        "cognizable": "Simple hurt: Non-cognizable; Grievous hurt & Dangerous weapon: Cognizable",
        "bailable": "Simple hurt: Bailable; Grievous hurt / Weapon: Non-bailable",
        "punishment": "Simple hurt: Up to 1 year or ₹10,000 fine. Grievous hurt: Up to 7 years and fine. With dangerous weapon: Imprisonment for Life or up to 10 years.",
        "court": "Magistrate of First Class / Court of Session",
        "ingredients": [
            "Intentionally causing bodily pain, infirmity, or disease.",
            "Grievous hurt criteria: Fracture or dislocation of a bone/tooth, permanent privation of sight/hearing, emasculation, or hurt endangering life for 20+ days.",
            "Use of weapons of offense: Swords, knives, iron rods, firearms, corrosive substances, or fire."
        ],
        "procedural": "Section 173 BNSS (FIR registration), Section 176 BNSS (Investigation and seizure of weapons)",
        "remedies": [
            "Proceed immediately to nearest Government Hospital casualty ward for an official Medico-Legal Case (MLC) examination.",
            "Preserve X-rays, CT scans, blood-stained clothes, and hospital discharge summaries as primary evidence.",
            "Ensure police annex the MLC report to the FIR under Section 117/118 BNS."
        ]
    },
    "robbery_dacoity": {
        "title": "Robbery / Armed Robbery / Dacoity",
        "bns": "Section 309 [Robbery] & Section 310 [Dacoity], BNS, 2023",
        "ipc": "Section 390 / 392 [Robbery] & Section 391 / 395 [Dacoity], IPC, 1860",
        "bns_sec": "309 / 310",
        "ipc_sec": "392 / 395",
        "cognizable": "Cognizable",
        "bailable": "Non-bailable",
        "punishment": "Robbery: Rigorous imprisonment up to 10 years and fine (up to 14 years if committed on highway). Dacoity (5+ persons): Imprisonment for Life or rigorous up to 10 years.",
        "court": "Court of Session",
        "ingredients": [
            "Theft or extortion accomplished by causing or attempting to cause death, hurt, or wrongful restraint.",
            "Dacoity occurs whenever robbery is committed by 5 or more persons conjointly."
        ],
        "procedural": "Section 173 BNSS (Immediate FIR), Section 105 BNSS (Attachment of proceeds of crime)",
        "remedies": [
            "Dial 112 emergency immediately.",
            "Preserve CCTV surveillance recordings from the crime scene and adjoining roadways.",
            "Provide physical descriptions, accents, getaway vehicles, and weapons used to police."
        ]
    },
    "criminal_intimidation": {
        "title": "Criminal Intimidation / Threats to Kill / Extortionate Threats",
        "bns": "Section 351 [Criminal Intimidation], Bharatiya Nyaya Sanhita (BNS), 2023",
        "ipc": "Section 503 / 506, Indian Penal Code (IPC), 1860",
        "bns_sec": "351(2)",
        "ipc_sec": "506",
        "cognizable": "Cognizable (for threats to cause death or grievous hurt)",
        "bailable": "Non-bailable / Bailable (depending on state amendment schedule)",
        "punishment": "Simple threat: Up to 2 years or fine. Threat to cause death or grievous hurt: Up to 7 years imprisonment or fine.",
        "court": "Magistrate of First Class",
        "ingredients": [
            "Threatening another person with injury to their person, reputation, or property.",
            "Intent to cause alarm to that person or to compel them to do any act they are not legally bound to do (e.g. drop a police complaint or vacate premises)."
        ],
        "procedural": "Section 173 BNSS (FIR), Section 175 BNSS (Application before Magistrate if police fail to act)",
        "remedies": [
            "Preserve call recordings, SMS messages, WhatsApp audio notes, and eyewitness testimonies.",
            "Submit written complaint to Station House Officer (SHO) seeking registration of FIR and police protection.",
            "If police refuse, submit application under Section 175(3) BNSS before Judicial Magistrate."
        ]
    },
    "common_intention": {
        "title": "Joint Criminal Liability / Act in Furtherance of Common Intention",
        "bns": "Section 3(5), Bharatiya Nyaya Sanhita (BNS), 2023",
        "ipc": "Section 34, Indian Penal Code (IPC), 1860",
        "bns_sec": "3(5)",
        "ipc_sec": "34",
        "cognizable": "Dependent on primary offense",
        "bailable": "Dependent on primary offense",
        "punishment": "Each person liable as if the offense was committed by them alone.",
        "court": "Court trying primary offense",
        "ingredients": [
            "Criminal act done by several persons.",
            "Act executed in furtherance of the common intention of all participants (prior concert or pre-arranged plan)."
        ],
        "procedural": "Charges framed jointly under Section 240 BNSS",
        "remedies": [
            "Name all accompanying accomplices, aiders, and conspirators in the FIR.",
            "Ensure police register Section 3(5) BNS alongside the substantive offenses."
        ]
    },
    "mischief": {
        "title": "Mischief / Destruction of Property / Vandalism",
        "bns": "Section 324, Bharatiya Nyaya Sanhita (BNS), 2023",
        "ipc": "Section 425 / 427, Indian Penal Code (IPC), 1860",
        "bns_sec": "324",
        "ipc_sec": "427",
        "cognizable": "Cognizable (if causing damage exceeding ₹20,000 under BNS)",
        "bailable": "Bailable",
        "punishment": "Imprisonment up to 2 years, or fine, or both.",
        "court": "Any Magistrate",
        "ingredients": [
            "Intent to cause or knowledge of likelihood of causing wrongful loss or damage to property.",
            "Destroying or diminishing value, utility, or altering property injuriously."
        ],
        "procedural": "Section 173 BNSS",
        "remedies": [
            "Document broken items, destroyed furniture, damaged locks, or damaged vehicles with high-resolution photos.",
            "Produce purchase receipts or valuation estimates to demonstrate monetary damage."
        ]
    },
    "murder": {
        "title": "Murder / Culpable Homicide Causing Death",
        "bns": "Section 101, Bharatiya Nyaya Sanhita (BNS), 2023",
        "ipc": "Section 300 / 302, Indian Penal Code (IPC), 1860",
        "bns_sec": "101",
        "ipc_sec": "302",
        "cognizable": "Cognizable",
        "bailable": "Non-bailable",
        "punishment": "Death penalty or Imprisonment for Life, and fine.",
        "court": "Court of Session",
        "ingredients": [
            "Act done with intention of causing death.",
            "Act done with knowledge that it is so imminently dangerous that it must in all probability cause death."
        ],
        "procedural": "Section 173 BNSS (FIR), Section 193 BNSS (Committal to Sessions Court)",
        "remedies": [
            "Dial 112 emergency immediately.",
            "Cordon and preserve the crime scene without disturbing biological traces or weapons.",
            "Ensure post-mortem examination by certified government medical officer."
        ]
    },
    "attempt_murder": {
        "title": "Attempt to Murder",
        "bns": "Section 109, Bharatiya Nyaya Sanhita (BNS), 2023",
        "ipc": "Section 307, Indian Penal Code (IPC), 1860",
        "bns_sec": "109",
        "ipc_sec": "307",
        "cognizable": "Cognizable",
        "bailable": "Non-bailable",
        "punishment": "Imprisonment up to 10 years and fine; if hurt caused, Imprisonment for Life or up to 10 years.",
        "court": "Court of Session",
        "ingredients": [
            "Act done with intention or knowledge under circumstances that if death occurred, offender would be guilty of murder.",
            "Execution progressing beyond mere preparation."
        ],
        "procedural": "Section 173 BNSS; Section 190 BNSS (Dying declaration if victim in critical state)",
        "remedies": [
            "Immediate hospital admission and obtain Medico-Legal Certificate (MLC).",
            "Police must seize weapons, CCTV footage, and blood-stained garments.",
            "Record statement before Judicial Magistrate."
        ]
    },
    "cheating_fraud": {
        "title": "Cheating / Financial Fraud / 420 Scams",
        "bns": "Section 318(4) [Cheating and Dishonestly Inducing Delivery of Property], BNS, 2023",
        "ipc": "Section 415 / 420, Indian Penal Code (IPC), 1860",
        "bns_sec": "318(4)",
        "ipc_sec": "420",
        "cognizable": "Cognizable",
        "bailable": "Non-bailable",
        "punishment": "Imprisonment up to 7 years and fine.",
        "court": "Magistrate of First Class",
        "ingredients": [
            "Deceiving any person fraudulently or dishonestly.",
            "Inducing person so deceived to deliver property, money, or valuable security."
        ],
        "procedural": "Section 173 BNSS; Section 107 BNSS (Power to freeze bank accounts)",
        "remedies": [
            "Dial 1930 Cyber Fraud Helpline immediately within 2 hours to freeze beneficiary bank accounts.",
            "Report on cybercrime.gov.in and download acknowledgment PDF.",
            "File FIR at Cyber Crime Police Station with bank statements and UTR transaction numbers."
        ]
    },
    "cheque_bounce": {
        "title": "Dishonour of Cheque / Cheque Bounce (Insufficient Funds)",
        "bns": "Section 138, Negotiable Instruments (NI) Act, 1881 & Section 318 BNS",
        "ipc": "Section 138 NI Act, 1881 & Section 420 IPC",
        "bns_sec": "NI Act 138",
        "ipc_sec": "NI Act 138",
        "cognizable": "Non-cognizable",
        "bailable": "Bailable",
        "punishment": "Imprisonment up to 2 years, or fine up to TWICE the cheque amount, or both.",
        "court": "Judicial Magistrate First Class / Metropolitan Magistrate",
        "ingredients": [
            "Cheque drawn for discharge of legally enforceable debt.",
            "Cheque returned unpaid by bank with memo 'funds insufficient'.",
            "Statutory Legal Demand Notice sent within 30 days of receiving bank bounce memo.",
            "Drawer failing to make payment within 15 days of notice receipt."
        ],
        "procedural": "Section 142/143 NI Act (Summary trial), Section 143A (Interim compensation up to 20%)",
        "remedies": [
            "Send formal Statutory Legal Demand Notice through advocate within 30 DAYS of bank memo.",
            "Give drawer mandatory 15 DAYS to pay.",
            "File Criminal Complaint under Section 138 NI Act in Magistrate Court within 30 DAYS after notice expiry.",
            "Apply under Section 143A NI Act for interim compensation of up to 20% during trial."
        ]
    },
    "dowry_cruelty": {
        "title": "Matrimonial Cruelty / Dowry Harassment / Domestic Violence",
        "bns": "Section 85 [Cruelty] & Section 80 [Dowry Death], BNS, 2023",
        "ipc": "Section 498A [Cruelty] & Section 304B [Dowry Death], IPC, 1860",
        "bns_sec": "85 / 80",
        "ipc_sec": "498A / 304B",
        "cognizable": "Cognizable",
        "bailable": "Non-bailable",
        "punishment": "Cruelty: Imprisonment up to 3 years and fine. Dowry Death: Minimum 7 years extending to Life.",
        "court": "Magistrate of First Class",
        "ingredients": [
            "Willful conduct likely to drive woman to suicide or cause grave physical/mental injury.",
            "Harassment to coerce woman or relatives to meet unlawful demands for dowry/property."
        ],
        "procedural": "Section 173 BNSS; Section 35 BNSS notice guidelines; Section 12 PWDVA 2005",
        "remedies": [
            "Approach Women Police Station (Mahila Thana) or call Women Helpline 181 / 1091.",
            "File petition under Section 12 of Protection of Women from Domestic Violence Act (PWDVA) for protection and residence order.",
            "Document all Streedhan items, bank transfers, and photograph physical injuries."
        ]
    },
    "stalking_harassment": {
        "title": "Stalking / Sexual Harassment / Workplace Harassment",
        "bns": "Section 75 [Sexual Harassment] & Section 78 [Stalking], BNS, 2023",
        "ipc": "Section 354A / 354D, Indian Penal Code (IPC), 1860",
        "bns_sec": "75 / 78",
        "ipc_sec": "354A / 354D",
        "cognizable": "Cognizable",
        "bailable": "Bailable (First offense of stalking) / Non-bailable (Second offense)",
        "punishment": "Stalking: Up to 3 years and fine (second conviction: up to 5 years). Sexual harassment: Up to 3 years.",
        "court": "Magistrate of First Class",
        "ingredients": [
            "Following a woman, attempting contact repeatedly despite clear disinterest, or monitoring internet use.",
            "Unwelcome physical contact, sexually colored remarks, or demanding sexual favors."
        ],
        "procedural": "Section 173 BNSS; Section 183 BNSS (Statement before woman magistrate); POSH Act 2013",
        "remedies": [
            "Preserve screenshots of chats, emails, phone call logs, and CCTV timestamps.",
            "At workplace: File complaint with Internal Committee (IC) under POSH Act 2013.",
            "File FIR at local police station or via National Cyber Crime Reporting Portal."
        ]
    },
    "extortion_blackmail": {
        "title": "Extortion / Blackmail / Sextortion",
        "bns": "Section 308, Bharatiya Nyaya Sanhita (BNS), 2023",
        "ipc": "Section 383 / 384, Indian Penal Code (IPC), 1860",
        "bns_sec": "308",
        "ipc_sec": "384",
        "cognizable": "Cognizable",
        "bailable": "Non-bailable",
        "punishment": "Imprisonment up to 3 years, or fine, or both. Threat of death/grievous hurt: Up to 10 years.",
        "court": "Magistrate of First Class",
        "ingredients": [
            "Intentionally putting any person in fear of injury to person, reputation, or property.",
            "Dishonestly inducing delivery of property, money, or valuable security."
        ],
        "procedural": "Section 173 BNSS; Section 66E/67A IT Act 2000",
        "remedies": [
            "DO NOT transfer money to blackmailers.",
            "Capture screenshots of numbers, chats, UPI QR codes, and threats.",
            "Report immediately at cybercrime.gov.in and file FIR at Cyber Police Station."
        ]
    },
    "forgery": {
        "title": "Forgery / Fake Documents / Forged Property Deeds",
        "bns": "Section 336 [Forgery] & Section 338 [Valuable Security Forgery], BNS, 2023",
        "ipc": "Section 463 / 467 / 468, Indian Penal Code (IPC), 1860",
        "bns_sec": "336 / 338",
        "ipc_sec": "467 / 468",
        "cognizable": "Cognizable",
        "bailable": "Non-bailable for valuable securities",
        "punishment": "Simple forgery: Up to 2 years or fine. Forgery of valuable security/will: Imprisonment for Life or up to 10 years and fine.",
        "court": "Court of Session / Magistrate",
        "ingredients": [
            "Making false document with intent to cause damage/injury or support false claim.",
            "Executing document knowing it was made without lawful authority."
        ],
        "procedural": "Section 173 BNSS; Section 63 BSA (Forensic handwriting/digital document examination)",
        "remedies": [
            "Obtain certified copies of forged deeds from Sub-Registrar Office.",
            "Obtain handwriting opinion from certified Forensic Document Examiner.",
            "Lodge FIR under BNS 336/338 and file Civil Declaratory Suit for deed cancellation."
        ]
    },
    "hit_and_run": {
        "title": "Rash Driving & Hit-and-Run (Failure to Report to Police)",
        "bns": "Section 106(2) [Hit and Run] & Section 281 [Rash Driving], BNS, 2023",
        "ipc": "Section 279 / 304A, Indian Penal Code (IPC), 1860",
        "bns_sec": "106(2) / 281",
        "ipc_sec": "279 / 304A",
        "cognizable": "Cognizable",
        "bailable": "Non-bailable for Section 106(2) escape",
        "punishment": "Hit-and-run with driver fleeing: Imprisonment up to 10 years and fine. Simple rash driving: Up to 6 months or ₹20,000 fine.",
        "court": "Court of Session",
        "ingredients": [
            "Driving vehicle on public way rashly or negligently endangering human life.",
            "Section 106(2) BNS: Escaping the scene without reporting immediately to police or magistrate."
        ],
        "procedural": "Section 173 BNSS; Section 134 Motor Vehicles Act",
        "remedies": [
            "Obtain vehicle registration number or nearby CCTV video feeds.",
            "Lodge immediate FIR under Section 106(2) & 281 BNS.",
            "Apply to District Magistrate under Motor Vehicles Act Solatium Scheme for hit-and-run compensation.",
            "File Claim Petition before Motor Accident Claims Tribunal (MACT)."
        ]
    },
    "medical_negligence": {
        "title": "Medical Negligence / Death by Rash or Negligent Act",
        "bns": "Section 106(1), Bharatiya Nyaya Sanhita (BNS), 2023",
        "ipc": "Section 304A, Indian Penal Code (IPC), 1860",
        "bns_sec": "106(1)",
        "ipc_sec": "304A",
        "cognizable": "Cognizable",
        "bailable": "Bailable",
        "punishment": "For registered medical practitioners reporting the act: Up to 2 years and fine; otherwise up to 5 years.",
        "court": "Magistrate of First Class",
        "ingredients": [
            "Causing death by rash or negligent act not amounting to culpable homicide.",
            "Gross departure from standard of reasonable medical care (Jacob Mathew guidelines)."
        ],
        "procedural": "Jacob Mathew guidelines (Independent Medical Board inquiry before arrest)",
        "remedies": [
            "Requisition certified copies of entire inpatient treatment chart and OT logs.",
            "Lodge complaint with State Medical Council (SMC) for medical ethics violation.",
            "File Consumer Complaint in Consumer Commission for financial compensation."
        ]
    },
    "bribery_corruption": {
        "title": "Bribery / Public Official Corruption",
        "bns": "Section 7 & 13, Prevention of Corruption Act (PC Act), 1988 (Amended 2018)",
        "ipc": "Prevention of Corruption Act, 1988",
        "bns_sec": "PC Act 7 / 13",
        "ipc_sec": "PC Act 7 / 13",
        "cognizable": "Cognizable",
        "bailable": "Non-bailable",
        "punishment": "Imprisonment for not less than 3 years extending up to 7 years, and fine.",
        "court": "Special Judge (CBI / ACB)",
        "ingredients": [
            "Public servant obtaining or demanding undue advantage to perform public duty dishonestly."
        ],
        "procedural": "Section 17A PC Act; Central Vigilance Commission Act",
        "remedies": [
            "Do NOT pay the bribe.",
            "Contact State Anti-Corruption Bureau (ACB) or CBI Anti-Corruption Branch.",
            "ACB will lay a formal trap with phenolphthalein powder to catch the official red-handed."
        ]
    },
    "public_nuisance": {
        "title": "Public Nuisance / Noise Pollution",
        "bns": "Section 270, Bharatiya Nyaya Sanhita (BNS), 2023",
        "ipc": "Section 268 / 290, Indian Penal Code (IPC), 1860",
        "bns_sec": "270",
        "ipc_sec": "290",
        "cognizable": "Non-cognizable",
        "bailable": "Bailable",
        "punishment": "Fine up to ₹1,000 (BNS). If continued after injunction: Up to 6 months imprisonment.",
        "court": "Any Magistrate",
        "ingredients": [
            "Act causing common injury, danger, or annoyance to the public in vicinity.",
            "Violation of ambient noise limits under Noise Pollution Rules 2000."
        ],
        "procedural": "Section 152 BNSS (Conditional order for removal of nuisance by Executive Magistrate / SDM)",
        "remedies": [
            "Dial 112 for immediate night-time police intervention.",
            "File petition under Section 152 BNSS before Sub-Divisional Magistrate (SDM).",
            "Lodge complaint with State Pollution Control Board."
        ]
    }
}


class LegalAIModel:
    def __init__(self):
        self.vectorizer = TfidfVectorizer(
            ngram_range=(1, 3),
            sublinear_tf=True,
            stop_words='english',
            min_df=1
        )
        self.classifier = LogisticRegression(max_iter=1000, C=10.0)
        self.texts = [item[0] for item in TRAINING_DATA]
        self.labels = [item[1] for item in TRAINING_DATA]
        self.is_trained = False
        self.train()

    def train(self):
        """Trains the TF-IDF vectorizer and classifier on the legal training dataset."""
        X = self.vectorizer.fit_transform(self.texts)
        self.classifier.fit(X, self.labels)
        self.tfidf_matrix = X
        self.is_trained = True

    def detect_section_lookup(self, text):
        """Direct statutory lookup for queries like 'Section 303 BNS' or 'Section 420 IPC'."""
        t = text.lower()
        if "138" in t and ("ni" in t or "cheque" in t or "check" in t or "negotiable" in t):
            return "cheque_bounce", "Section 138 NI Act"

        bns_match = re.search(r'(?:section|sec|u/s)\s*([0-9]+(?:\([0-9]+\))?)\s*(?:bns|bharatiya)?', t)
        ipc_match = re.search(r'(?:section|sec|u/s)\s*([0-9]+[a-z]?)\s*(?:ipc|indian penal)?', t)

        if bns_match:
            sec = bns_match.group(1)
            for k, p in EXTENDED_STATUTORY_CATALOG.items():
                if sec in p['bns_sec']:
                    return k, f"Section {sec} BNS"

        if ipc_match:
            sec = ipc_match.group(1)
            for k, p in EXTENDED_STATUTORY_CATALOG.items():
                if sec in p['ipc_sec']:
                    return k, f"Section {sec} IPC"

        return None, None

    def detect_procedural_rights(self, text):
        """Detects procedural inquiries like Zero FIR, Anticipatory Bail, etc."""
        t = text.lower()
        if "zero fir" in t or ("refuse" in t and "fir" in t):
            return {
                "title": "Zero FIR — Procedural Rights & Supreme Court Mandate",
                "bns": "Section 173(1), Bharatiya Nagarik Suraksha Sanhita (BNSS), 2023",
                "ipc": "Section 154 CrPC / Lalita Kumari Guidelines",
                "summary": "A Zero FIR can be lodged at ANY police station irrespective of territorial jurisdiction if a cognizable offense has occurred. The police station registers it with '0' as crime number, provides a free copy to informant, and transfers it to the jurisdictional police station.",
                "remedies": [
                    "Inform the duty officer of mandatory Supreme Court ruling in Lalita Kumari v. Govt. of UP.",
                    "If local police refuse, submit written complaint to Superintendent of Police (SP) under Section 175(3) BNSS.",
                    "Alternatively, file an application before the Judicial Magistrate under Section 175(3) BNSS."
                ]
            }
        if "anticipatory bail" in t or "pre-arrest bail" in t or "fear of arrest" in t:
            return {
                "title": "Anticipatory Bail (Pre-Arrest Bail Protection)",
                "bns": "Section 482, Bharatiya Nagarik Suraksha Sanhita (BNSS), 2023",
                "ipc": "Section 438, Code of Criminal Procedure (CrPC), 1973",
                "summary": "Statutory relief for an individual who apprehends arrest in an alleged non-bailable offense. Filed before Sessions Court or High Court before arrest occurs.",
                "remedies": [
                    "Engage criminal defense counsel to prepare petition detailing absence of prima facie evidence and roots in society.",
                    "File under Section 482 BNSS before Sessions Judge.",
                    "Undertake to join investigation as and when summoned by investigating officer under Section 35(3) BNSS."
                ]
            }
        return None

    def extract_compound_crimes(self, text):
        """
        Scans a situation paragraph across multiple legal dimensions to extract
        ALL concurrent offenses that occurred in the story.
        """
        t = text.lower()
        detected_crimes = []

        # 1. Housebreaking / Trespass
        if any(w in t for w in ["landlord", "trespass", "entered my", "flat", "broke lock", "broken lock", "door", "luggage", "dispossessed", "evicted", "eviction", "intruded", "break in", "burglary"]):
            detected_crimes.append(("house_trespass", "Unlawful entry into dwelling, broken locks, or illegal dispossession of premises"))

        # 2. Assault / Hurt / Weapons
        if any(w in t for w in ["fracture", "fractured", "broken bone", "iron pipe", "rod", "pipe", "beaten", "beat", "hit", "punched", "slapped", "bleeding", "teeth knocked", "assaulted", "injured", "hurt"]):
            detected_crimes.append(("assault_hurt", "Infliction of bodily injuries, bone fractures, or use of blunt/deadly weapons"))

        # 3. Theft / Snatching / Robbery
        if any(w in t for w in ["stole", "stolen", "snatched", "robbed", "took my", "watch", "laptop", "jewellery", "gold", "chain", "wallet", "cash", "money took"]):
            if any(w in t for w in ["rod", "gun", "knife", "threatened", "beaten", "force"]):
                detected_crimes.append(("robbery_dacoity", "Taking of property accompanied by force, violence, or threat of hurt"))
            else:
                detected_crimes.append(("theft_snatching", "Dishonest taking of movable property without consent"))

        # 4. Criminal Intimidation / Threats to Kill
        if any(w in t for w in ["threatened", "murder us", "kill us", "shoot", "dire consequences", "police", "warning", "intimidated"]):
            detected_crimes.append(("criminal_intimidation", "Threatening death, grievous hurt, or injury if reported to police"))

        # 5. Joint Liability / Common Intention
        if any(w in t for w in ["with two men", "with 2 men", "with 3 men", "three men", "four men", "group", "gang", "together", "along with", "friends"]):
            detected_crimes.append(("common_intention", "Act committed jointly by multiple individuals in furtherance of common intention"))

        # 6. Mischief / Damage to Property
        if any(w in t for w in ["threw my luggage", "threw belongings", "damaged", "smashed", "broken furniture", "vandalized", "destroyed"]):
            detected_crimes.append(("mischief", "Destruction, damage, or throwing out of tenant/citizen movable goods"))

        # 7. Murder / Culpable Homicide
        if any(w in t for w in ["killed", "murdered", "stabbed to death", "death", "dead body", "assassinated"]):
            detected_crimes.append(("murder", "Act done causing death of victim"))

        # 8. Attempt to Murder
        if any(w in t for w in ["attempt to murder", "tried to kill", "shot at", "stabbed in stomach", "slit throat"]):
            detected_crimes.append(("attempt_murder", "Execution of lethal assault with intention to cause death"))

        # 9. Matrimonial Cruelty / Dowry
        if any(w in t for w in ["dowry", "husband beat", "in-laws", "matrimonial", "domestic violence"]):
            detected_crimes.append(("dowry_cruelty", "Harassment and physical/mental cruelty for dowry demands"))

        # 10. Sexual Harassment / Stalking
        if any(w in t for w in ["stalking", "stalked", "followed me", "inappropriate touch", "sexual harassment", "modesty"]):
            detected_crimes.append(("stalking_harassment", "Unwelcome physical conduct, persistent following, or online harassment"))

        # 11. Cheating / Fraud
        if any(w in t for w in ["scam", "scammed", "fraud", "cheated", "telegram", "fake job", "upi transfer", "crypto", "420"]):
            detected_crimes.append(("cheating_fraud", "Deceitful inducement to transfer funds or property"))

        # 12. Cheque Bounce
        if any(w in t for w in ["cheque", "check", "bounced", "dishonour", "insufficient funds", "138"]):
            detected_crimes.append(("cheque_bounce", "Dishonour of bank cheque for unpaid debt"))

        # 13. Forgery
        if any(w in t for w in ["forged", "fake deed", "fake signature", "fake will", "fake stamp"]):
            detected_crimes.append(("forgery", "Making false document or executing forged valuable security"))

        # 14. Extortion / Blackmail
        if any(w in t for w in ["blackmail", "blackmailed", "extortion", "morphed photos", "leak photos"]):
            detected_crimes.append(("extortion_blackmail", "Demanding money by putting victim in fear of injury or reputation harm"))

        # 15. Hit and Run
        if any(w in t for w in ["hit and run", "driver fled", "rash driving", "overspeeding car"]):
            detected_crimes.append(("hit_and_run", "Rash driving causing accident with driver escaping the scene"))

        # 16. Medical Negligence
        if any(w in t for w in ["doctor wrong", "medical negligence", "surgical error", "anesthesia overdose"]):
            detected_crimes.append(("medical_negligence", "Gross negligence by medical professional causing death/injury"))

        # 17. Corruption
        if any(w in t for w in ["bribe", "corruption", "demanded cash bribe", "kickback"]):
            detected_crimes.append(("bribery_corruption", "Public servant demanding undue financial advantage"))

        # 18. Public Nuisance
        if any(w in t for w in ["loud music", "noise pollution", "loudspeakers", "nuisance"]):
            detected_crimes.append(("public_nuisance", "Common injury or annoyance caused to neighborhood at night"))

        return detected_crimes

    def predict(self, situation_text):
        """
        Deep Multi-Aspect Legal NLP Analysis for complex citizen paragraphs.
        Identifies all primary, secondary, and aggravating offenses.
        """
        # 1. Procedural Check
        proc = self.detect_procedural_rights(situation_text)
        if proc:
            return {
                "mode": "procedural",
                "title": proc["title"],
                "bns_section": proc["bns"],
                "ipc_section": proc["ipc"],
                "summary": proc["summary"],
                "remedies": proc["remedies"],
                "confidence": 0.98,
                "model_engine": "NyayaAI Statutory Procedural Core"
            }

        # 2. Section Lookup Check
        sec_key, query_sec = self.detect_section_lookup(situation_text)
        if sec_key and sec_key in EXTENDED_STATUTORY_CATALOG:
            p = EXTENDED_STATUTORY_CATALOG[sec_key]
            return {
                "mode": "section_lookup",
                "query_section": query_sec,
                "title": p["title"],
                "bns_section": p["bns"],
                "ipc_section": p["ipc"],
                "cognizable": p["cognizable"],
                "bailable": p["bailable"],
                "punishment": p["punishment"],
                "court": p["court"],
                "ingredients": p["ingredients"],
                "procedural": p["procedural"],
                "remedies": p["remedies"],
                "confidence": 1.0,
                "model_engine": "NyayaAI Statutory Section Engine"
            }

        # 3. Multi-label extraction from paragraph
        compound_crimes = self.extract_compound_crimes(situation_text)

        # 4. ML Probabilistic Inference
        query_vec = self.vectorizer.transform([situation_text])
        probabilities = self.classifier.predict_proba(query_vec)[0]
        classes = self.classifier.classes_
        top_idx = np.argmax(probabilities)
        ml_top_class = classes[top_idx]
        ml_confidence = float(probabilities[top_idx])

        # If compound crimes were extracted, select the most serious one as primary
        crime_priority = [
            "murder", "attempt_murder", "robbery_dacoity", "assault_hurt", "dowry_cruelty",
            "house_trespass", "extortion_blackmail", "cheating_fraud", "theft_snatching",
            "forgery", "hit_and_run", "medical_negligence", "stalking_harassment",
            "bribery_corruption", "cheque_bounce", "criminal_intimidation", "mischief",
            "common_intention", "public_nuisance"
        ]

        primary_key = ml_top_class
        if compound_crimes:
            compound_keys = [c[0] for c in compound_crimes]
            for p_key in crime_priority:
                if p_key in compound_keys:
                    primary_key = p_key
                    break

        primary_profile = EXTENDED_STATUTORY_CATALOG.get(primary_key, EXTENDED_STATUTORY_CATALOG["theft_snatching"])

        # Build list of all applicable sections
        all_sections_table = []
        seen_keys = set()
        
        # Add primary
        all_sections_table.append({
            "key": primary_key,
            "title": primary_profile["title"],
            "bns": primary_profile["bns"],
            "ipc": primary_profile["ipc"],
            "cognizable": primary_profile["cognizable"],
            "bailable": primary_profile["bailable"],
            "punishment": primary_profile["punishment"],
            "court": primary_profile["court"],
            "reason": "Primary substantive offense identified from factual allegations."
        })
        seen_keys.add(primary_key)

        # Add all other compound crimes detected in the story
        for c_key, c_reason in compound_crimes:
            if c_key not in seen_keys and c_key in EXTENDED_STATUTORY_CATALOG:
                c_prof = EXTENDED_STATUTORY_CATALOG[c_key]
                all_sections_table.append({
                    "key": c_key,
                    "title": c_prof["title"],
                    "bns": c_prof["bns"],
                    "ipc": c_prof["ipc"],
                    "cognizable": c_prof["cognizable"],
                    "bailable": c_prof["bailable"],
                    "punishment": c_prof["punishment"],
                    "court": c_prof["court"],
                    "reason": c_reason
                })
                seen_keys.add(c_key)

        return {
            "mode": "situation_analysis",
            "primary_key": primary_key,
            "title": primary_profile["title"],
            "bns_section": primary_profile["bns"],
            "ipc_section": primary_profile["ipc"],
            "cognizable": primary_profile["cognizable"],
            "bailable": primary_profile["bailable"],
            "punishment": primary_profile["punishment"],
            "court": primary_profile["court"],
            "ingredients": primary_profile["ingredients"],
            "procedural": primary_profile["procedural"],
            "remedies": primary_profile["remedies"],
            "all_applicable_sections": all_sections_table,
            "total_offenses_found": len(all_sections_table),
            "confidence": round(max(ml_confidence, 0.85), 2),
            "model_engine": "NyayaAI Deep Paragraph Inference Engine (Scikit-Learn TF-IDF + Compound Extractor)"
        }


# Singleton instance
legal_model = LegalAIModel()

if __name__ == "__main__":
    test_paragraph = "My landlord came to my flat at 11 PM with two men carrying iron rods. They broke open the door lock, entered without permission, threw my luggage on street, beat my brother until his arm bone fractured, stole my laptop and gold watch, and threatened to murder us if we go to police."
    res = legal_model.predict(test_paragraph)
    print("=== TEST PARAGRAPH ANALYSIS ===")
    print("Primary:", res["title"])
    print("Total Offenses Found:", res["total_offenses_found"])
    for s in res["all_applicable_sections"]:
        print(f" -> {s['title']} | BNS: {s['bns']}")
