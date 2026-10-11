# -*- coding: utf-8 -*-
"""
Indian Legal AI / ML Training Dataset
Over 80+ situation scenarios and citizen incident descriptions mapped to
Bharatiya Nyaya Sanhita (BNS, 2023), IPC (1860), BNSS (2023), and Special Acts.
"""

TRAINING_DATA = [
    # THEFT / SNATCHING (BNS 303, 304 / IPC 379)
    ("Someone snatched my gold chain on a motorcycle and fled", "theft_snatching"),
    ("Two boys on bike grabbed my mobile phone from my hand and drove off", "theft_snatching"),
    ("My bag was snatched while I was walking home near the metro station", "theft_snatching"),
    ("Pickpocket stole my wallet on a crowded bus", "theft_snatching"),
    ("Someone stole my laptop from the library when I went to the washroom", "theft_snatching"),
    ("Burglar broke into my house and took gold jewellery and cash", "theft_snatching"),
    ("My servant stole diamond ring from the bedroom cupboard", "theft_snatching"),
    ("Chain snatching incident happened to my mother in market", "theft_snatching"),
    ("Theft of luggage from train compartment while sleeping", "theft_snatching"),
    ("Someone took my parked scooter without permission and sold it", "theft_snatching"),

    # MURDER / CULPABLE HOMICIDE (BNS 101 / IPC 302)
    ("A man stabbed my cousin to death during a street brawl", "murder"),
    ("A gunman shot and killed the shopkeeper during an argument", "murder"),
    ("Victim was poisoned to death by business rival", "murder"),
    ("Found dead body of young boy with strangulation marks", "murder"),
    ("Group attacked my uncle with swords and he died on the spot", "murder"),
    ("Premeditated assassination of a political activist", "murder"),
    ("Homicide committed by striking victim head with iron rod", "murder"),

    # ATTEMPT TO MURDER (BNS 109 / IPC 307)
    ("Attacker shot at me with a pistol but bullet missed my head", "attempt_murder"),
    ("Someone stabbed me in the stomach with intent to kill but I survived surgery", "attempt_murder"),
    ("Attempted to slit my throat during robbery but people intervened", "attempt_murder"),
    ("Threw me from second floor balcony with intention to kill", "attempt_murder"),
    ("Attacked with deadly machete causing critical skull injuries", "attempt_murder"),

    # MEDICAL NEGLIGENCE (BNS 106(1) / IPC 304A)
    ("Doctor administered wrong medicine causing severe allergic shock and death", "medical_negligence"),
    ("Surgeon left a medical sponge inside patient abdomen during surgery", "medical_negligence"),
    ("Hospital gave expired anesthesia injection resulting in patient coma", "medical_negligence"),
    ("Gross malpractice by clinic doctor prescribing fatal dosage to child", "medical_negligence"),
    ("Patient died in ICU due to complete negligence and absence of duty doctor", "medical_negligence"),
    ("Unqualified quack doctor performed delivery leading to mother demise", "medical_negligence"),

    # HIT AND RUN / RASH DRIVING (BNS 106(2), 281 / IPC 279, 304A)
    ("Speeding car hit a pedestrian on highway and driver fled without stopping", "hit_and_run"),
    ("Drunk driver ran over people sleeping on pavement and sped away", "hit_and_run"),
    ("Overspeeding truck knocked down cyclist and escaped the accident scene", "hit_and_run"),
    ("Motorcycle hit elderly person at high speed and ran away without medical help", "hit_and_run"),
    ("Hit and run accident where vehicle driver failed to report to police", "hit_and_run"),

    # ASSAULT / GRIEVOUS HURT (BNS 115, 117, 118 / IPC 323, 325, 326)
    ("Neighbor beat me with an iron pipe and fractured my arm bone", "assault_hurt"),
    ("Group of men punched and slapped my brother causing severe eye trauma", "assault_hurt"),
    ("Attacked with broken glass bottle causing deep bleeding lacerations", "assault_hurt"),
    ("Physical fight where attacker knocked out two of my teeth", "assault_hurt"),
    ("Brutal assault causing internal skull fracture and 25 days hospitalization", "assault_hurt"),

    # DOMESTIC VIOLENCE & DOWRY CRUELTY (BNS 85, 80 / IPC 498A, 304B)
    ("Husband and mother-in-law beating me demanding 10 lakhs dowry and a car", "dowry_cruelty"),
    ("Tortured physically and mentally by matrimonial in-laws for gold jewellery", "dowry_cruelty"),
    ("Thrown out of matrimonial home with baby because my parents gave less dowry", "dowry_cruelty"),
    ("Husband constantly abuses and threatens to burn me for dowry demands", "dowry_cruelty"),
    ("Domestic cruelty by husband demanding property share from my father", "dowry_cruelty"),

    # SEXUAL HARASSMENT & STALKING (BNS 75, 78 / IPC 354A, 354D)
    ("A colleague stalks me daily from office to my home and stares inappropriately", "stalking_harassment"),
    ("Senior manager at workplace made unwelcome physical touch and sexual demands", "stalking_harassment"),
    ("Unknown man sending vulgar obscene photos and messages on my Instagram", "stalking_harassment"),
    ("Boy following me outside college despite repeatedly telling him to stay away", "stalking_harassment"),
    ("Outraging modesty of a woman in public bus with obscene gestures", "stalking_harassment"),

    # CHEATING & FINANCIAL FRAUD (BNS 318(4) / IPC 420)
    ("Scammed in Telegram job offer by paying 2 lakhs for fake tasks", "cheating_fraud"),
    ("Fraudster duped me into investing 5 lakhs in a fake crypto trading scheme", "cheating_fraud"),
    ("Company promised overseas visa and took 3 lakhs but disappeared with money", "cheating_fraud"),
    ("Fake builder took booking advance of 10 lakhs on flat owned by someone else", "cheating_fraud"),
    ("Swindled by fake loan app charging 500 percent interest and harassment", "cheating_fraud"),
    ("Person sold me stolen vehicle by forging ownership certificate", "cheating_fraud"),

    # CHEQUE BOUNCE (Section 138 NI Act)
    ("Cheque given by client for 5 lakhs was bounced by bank for insufficient funds", "cheque_bounce"),
    ("Friend issued cheque to repay loan but bank memo returned funds insufficient", "cheque_bounce"),
    ("Dishonour of cheque of 3 lakhs with remarks account closed", "cheque_bounce"),
    ("Contractor payment cheque bounced due to exceed arrangement", "cheque_bounce"),
    ("Section 138 NI act notice for bounced cheque unpaid after 15 days", "cheque_bounce"),

    # HOUSE TRESPASS & BURGLARY (BNS 329, 331 / IPC 448, 457)
    ("Landlord unlocked my flat with spare key while I was out and threw my things", "house_trespass"),
    ("Neighbor broke open my garage lock and parked his car unlawfully", "house_trespass"),
    ("Intruders entered my private property at midnight without consent", "house_trespass"),
    ("Illegal eviction by landlord changing house locks without court order", "house_trespass"),
    ("Lurking house trespass into residential bungalow by breaking window grille", "house_trespass"),

    # FORGERY & FAKE DOCUMENTS (BNS 336, 338 / IPC 467, 468)
    ("Relative forged my father signature on property sale deed to grab ancestral land", "forgery"),
    ("Found forged will created using counterfeit stamp paper and fake witness", "forgery"),
    ("Fake educational degree and marksheet produced for government job", "forgery"),
    ("Forged bank signature on cheque to withdraw funds fraudulently", "forgery"),

    # EXTORTION & BLACKMAIL (BNS 308 / IPC 384)
    ("Blackmailed on WhatsApp with morphed private photos demanding 50000 rupees", "extortion_blackmail"),
    ("Gangster demanding 5 lakhs monthly protection money extortion from shop", "extortion_blackmail"),
    ("Threatening to leak private personal videos unless I transfer bitcoin", "extortion_blackmail"),
    ("Extortion call threatening to kidnap my child unless ransom is deposited", "extortion_blackmail"),

    # BRIBERY & CORRUPTION (PC Act 1988 Sec 7, 13)
    ("Municipal officer demanding 25000 bribe to approve commercial building permit", "bribery_corruption"),
    ("Police officer asked 10000 cash bribe to register my vehicle theft FIR", "bribery_corruption"),
    ("Government clerk took 5000 kickback for releasing pension arrears", "bribery_corruption"),
    ("Public servant demanding undue financial advantage to pass tender contract", "bribery_corruption"),

    # PUBLIC NUISANCE & NOISE POLLUTION (BNS 270 / IPC 290)
    ("Banquet hall playing high decibel loudspeakers at 2 AM disturbing neighborhood", "public_nuisance"),
    ("Neighbor running noisy illegal commercial generator throughout the night", "public_nuisance"),
    ("Dumping foul-smelling hazardous chemical waste on residential public road", "public_nuisance"),

    # CRIMINAL INTIMIDATION (BNS 351 / IPC 506)
    ("Criminal called and threatened to shoot my family if we do not drop the court case", "criminal_intimidation"),
    ("Threatening phone call warning dire consequences to life and property", "criminal_intimidation"),
    ("Intimidating witness outside court premises with weapon threat", "criminal_intimidation")
]

LEGAL_PROFILES = {
    "theft_snatching": {
        "title": "Theft / Snatching (Chain, Mobile & Movable Property)",
        "bns": "Section 303 [Theft] & Section 304 [Snatching - New Provision in BNS, 2023]",
        "ipc": "Section 378 / 379, Indian Penal Code (IPC), 1860",
        "ingredients": [
            "Dishonest intention to take movable property out of possession of any person without consent.",
            "Section 304 BNS: Specifically penalizes suddenly grabbing, seizing, or snatching property from a person."
        ],
        "punishment": "Snatching: Rigorous imprisonment up to 3 years and fine. Theft: Up to 3 years or fine (Community service for petty first-time theft under ₹5,000).",
        "classification": "Cognizable, Non-bailable (Snatching), Triable by Magistrate.",
        "procedural": "Section 173 BNSS (Registration of FIR), Section 106 BNSS (Mandatory audio-video recording of search/seizure)",
        "remedies": [
            "Block device IMEI immediately on Central Equipment Identity Register (ceir.gov.in).",
            "Freeze linked UPI apps and debit/credit cards.",
            "File written FIR at local police station mentioning device serial numbers and invoice."
        ]
    },
    "murder": {
        "title": "Murder / Culpable Homicide",
        "bns": "Section 101, Bharatiya Nyaya Sanhita (BNS), 2023",
        "ipc": "Section 300 / 302, Indian Penal Code (IPC), 1860",
        "ingredients": [
            "Act done with intention of causing death.",
            "Act done with knowledge that it is so imminently dangerous that it must in all probability cause death."
        ],
        "punishment": "Death penalty or Imprisonment for Life, and fine.",
        "classification": "Cognizable, Non-bailable, Non-compoundable, Triable by Court of Session.",
        "procedural": "Section 173 BNSS (Mandatory FIR), Section 193 BNSS (Committal to Sessions Court)",
        "remedies": [
            "Dial 112 emergency immediately.",
            "Cordon and preserve crime scene without touching biological or weapon traces.",
            "Ensure post-mortem examination by certified government forensic medical officer."
        ]
    },
    "attempt_murder": {
        "title": "Attempt to Murder",
        "bns": "Section 109, Bharatiya Nyaya Sanhita (BNS), 2023",
        "ipc": "Section 307, Indian Penal Code (IPC), 1860",
        "ingredients": [
            "Act done with intention or knowledge under circumstances that if death occurred, offender would be guilty of murder.",
            "Direct physical progression beyond mere contemplation."
        ],
        "punishment": "Imprisonment up to 10 years and fine; if hurt is caused, Imprisonment for Life or up to 10 years.",
        "classification": "Cognizable, Non-bailable, Triable by Court of Session.",
        "procedural": "Section 173 BNSS (FIR), Section 190 BNSS (Dying declaration if victim in critical state)",
        "remedies": [
            "Admit victim to emergency hospital casualty and obtain Medico-Legal Case (MLC) certificate.",
            "Ensure police seize weapon, CCTV footage, and blood-stained clothing.",
            "Record victim statement before Judicial Magistrate."
        ]
    },
    "medical_negligence": {
        "title": "Medical Negligence / Death by Rash or Negligent Act",
        "bns": "Section 106(1), Bharatiya Nyaya Sanhita (BNS), 2023",
        "ipc": "Section 304A, Indian Penal Code (IPC), 1860",
        "ingredients": [
            "Causing death of any person by rash or negligent act not amounting to culpable homicide.",
            "Gross departure from standard of reasonable care expected from medical practitioner (Jacob Mathew guidelines)."
        ],
        "punishment": "For registered medical practitioners reporting the act: Up to 2 years and fine; otherwise up to 5 years.",
        "classification": "Cognizable, Bailable, Triable by Magistrate of First Class.",
        "procedural": "Jacob Mathew v. State of Punjab (Independent Medical Board opinion required before arresting doctor)",
        "remedies": [
            "Immediately requisition certified copies of entire inpatient treatment chart and OT logs.",
            "Lodge complaint with State Medical Council (SMC) for medical ethics violation.",
            "File Consumer Complaint in District/State Consumer Disputes Redressal Commission for compensation."
        ]
    },
    "hit_and_run": {
        "title": "Rash Driving & Hit-and-Run (Failure to Report to Police)",
        "bns": "Section 106(2) [Hit and Run] & Section 281 [Rash Driving], BNS, 2023",
        "ipc": "Section 279 / 304A, Indian Penal Code (IPC), 1860",
        "ingredients": [
            "Driving vehicle on public way in rash or negligent manner endangering human life.",
            "Section 106(2) BNS: Escaping the scene of accident without reporting immediately to police officer or magistrate."
        ],
        "punishment": "Hit-and-run with driver fleeing: Imprisonment up to 10 years and fine. Simple rash driving: Up to 6 months or ₹20,000 fine.",
        "classification": "Cognizable, Non-bailable (Section 106(2)), Triable by Court of Session.",
        "procedural": "Section 173 BNSS; Section 134 Motor Vehicles Act",
        "remedies": [
            "Obtain vehicle registration number or nearby CCTV video feeds.",
            "Lodge immediate FIR under Section 106(2) & 281 BNS.",
            "Apply to District Magistrate under Motor Vehicles Act Solatium Scheme for hit-and-run victim compensation.",
            "File Claim Petition before Motor Accident Claims Tribunal (MACT)."
        ]
    },
    "assault_hurt": {
        "title": "Voluntary Hurt / Grievous Hurt / Assault with Deadly Weapon",
        "bns": "Section 115 [Simple Hurt] / Section 117 [Grievous Hurt] / Section 118 [Deadly Weapon], BNS, 2023",
        "ipc": "Section 323 / 325 / 326, Indian Penal Code (IPC), 1860",
        "ingredients": [
            "Intentionally causing bodily pain, fracture, dislocation, or danger to life.",
            "Grievous hurt includes bone fractures, permanent loss of hearing/vision, or injury keeping victim in severe pain for 20+ days."
        ],
        "punishment": "Simple hurt: Up to 1 year or ₹10,000 fine. Grievous hurt: Up to 7 years and fine. Deadly weapon: Up to 10 years/Life.",
        "classification": "Simple hurt: Non-cognizable, Bailable. Grievous hurt: Cognizable, Non-bailable.",
        "procedural": "Section 173 BNSS (FIR), Section 176 BNSS (Police inquiry)",
        "remedies": [
            "Undergo Medico-Legal Examination (MLC) at nearest Government Hospital.",
            "Preserve X-ray reports, discharge summaries, and medical invoices.",
            "File written police complaint attaching MLC report."
        ]
    },
    "dowry_cruelty": {
        "title": "Matrimonial Cruelty / Dowry Harassment / Domestic Violence",
        "bns": "Section 85 [Cruelty] & Section 80 [Dowry Death], BNS, 2023",
        "ipc": "Section 498A [Cruelty] & Section 304B [Dowry Death], IPC",
        "ingredients": [
            "Willful conduct by husband or relatives likely to drive woman to suicide or cause grave physical/mental injury.",
            "Harassment to coerce woman or her family into meeting unlawful demands for dowry/property."
        ],
        "punishment": "Cruelty: Imprisonment up to 3 years and fine. Dowry Death: Minimum 7 years extending to Life.",
        "classification": "Cognizable, Non-bailable, Non-compoundable, Triable by Magistrate of First Class.",
        "procedural": "Section 173 BNSS; Section 35 BNSS notice of appearance guidelines (Arnesh Kumar)",
        "remedies": [
            "Approach Women Police Station (Mahila Thana) or call Women Helpline 181 / 1091.",
            "File application under Section 12 of Protection of Women from Domestic Violence Act (PWDVA) for protection and residence order.",
            "Document all Streedhan items, bank transfers, and photographic evidence of injuries."
        ]
    },
    "stalking_harassment": {
        "title": "Stalking / Sexual Harassment / Online Harassment",
        "bns": "Section 75 [Sexual Harassment] & Section 78 [Stalking], BNS, 2023",
        "ipc": "Section 354A / 354D, Indian Penal Code (IPC), 1860",
        "ingredients": [
            "Following a woman, attempting contact repeatedly despite clear disinterest, or monitoring internet/electronic communication.",
            "Unwelcome physical contact, sexually colored remarks, or demanding sexual favors."
        ],
        "punishment": "Stalking (first conviction): Up to 3 years and fine. Second conviction: Up to 5 years. Sexual harassment: Up to 3 years.",
        "classification": "Cognizable, Bailable (first offense of stalking) / Non-bailable (repeat offense).",
        "procedural": "Section 173 BNSS; Section 183 BNSS (Recording victim statement before woman judicial magistrate)",
        "remedies": [
            "Save screenshots of all calls, chats, emails, and profiles.",
            "If at workplace: File complaint with Internal Committee (IC) under POSH Act 2013.",
            "File FIR at local police station or via National Cyber Crime Reporting Portal."
        ]
    },
    "cheating_fraud": {
        "title": "Cheating / Financial Scams / 420 Fraud",
        "bns": "Section 318(4) [Cheating and Dishonestly Inducing Delivery of Property], BNS, 2023",
        "ipc": "Section 415 / 420, Indian Penal Code (IPC), 1860",
        "ingredients": [
            "Deceiving any person fraudulently or dishonestly.",
            "Inducing person so deceived to deliver property, money, or valuable security."
        ],
        "punishment": "Imprisonment up to 7 years and fine.",
        "classification": "Cognizable, Non-bailable, Triable by Magistrate of First Class.",
        "procedural": "Section 173 BNSS (FIR), Section 107 BNSS (Power of police to freeze bank accounts)",
        "remedies": [
            "Call 1930 Cyber Fraud Helpline immediately within 2 hours to freeze fraudster bank accounts.",
            "Report on cybercrime.gov.in and download acknowledgment PDF.",
            "File FIR at Cyber Crime Police Station with bank statements and transaction UTR numbers."
        ]
    },
    "cheque_bounce": {
        "title": "Dishonour of Cheque / Cheque Bounce (Insufficient Funds)",
        "bns": "Section 138, Negotiable Instruments (NI) Act, 1881 & Section 318 BNS",
        "ipc": "Section 138 NI Act, 1881 & Section 420 IPC",
        "ingredients": [
            "Cheque drawn for discharge of legally enforceable debt.",
            "Cheque returned unpaid by bank with memo funds insufficient.",
            "Statutory Legal Demand Notice dispatched within 30 days of receiving bank return memo.",
            "Drawer fails to make payment within 15 days of notice receipt."
        ],
        "punishment": "Imprisonment up to 2 years, or fine up to TWICE the cheque amount, or both.",
        "classification": "Non-cognizable, Bailable, Compoundable, Triable by Judicial Magistrate First Class.",
        "procedural": "Section 142/143 NI Act (Summary trial), Section 143A (Interim compensation up to 20%)",
        "remedies": [
            "Send formal Statutory Legal Demand Notice within 30 DAYS of bank memo.",
            "Give drawer mandatory 15 DAYS to pay.",
            "File Criminal Complaint under Section 138 NI Act in Magistrate Court within 30 DAYS after the 15-day notice period ends.",
            "Pray for 20% interim deposit under Section 143A NI Act."
        ]
    },
    "house_trespass": {
        "title": "Criminal Trespass / House Trespass / Illegal Eviction",
        "bns": "Section 329 [Criminal Trespass] & Section 331 [House Trespass / Housebreaking], BNS, 2023",
        "ipc": "Section 441 / 448 / 457, Indian Penal Code (IPC), 1860",
        "ingredients": [
            "Entering property in possession of another with intent to commit offense, intimidate, insult or annoy.",
            "Breaking locks or entering residential premises without legal authority."
        ],
        "punishment": "Simple trespass: Up to 3 months or ₹5,000 fine. House trespass: Up to 1 year and fine. Housebreaking by night: Up to 5 years (up to 14 years if with intent to steal).",
        "classification": "Cognizable, Bailable (day trespass) / Non-bailable (night housebreaking).",
        "procedural": "Section 173 BNSS; Section 6 Specific Relief Act, 1963",
        "remedies": [
            "Photograph and video broken locks, displaced goods, or trespassers.",
            "File police complaint under Section 329/331 BNS.",
            "If tenant unlawfully dispossessed: File Summary Suit under Section 6 Specific Relief Act for immediate restoration of possession."
        ]
    },
    "forgery": {
        "title": "Forgery / Fake Documents / Forged Property Deeds",
        "bns": "Section 336 [Forgery] & Section 338 [Valuable Security Forgery], BNS, 2023",
        "ipc": "Section 463 / 467 / 468, Indian Penal Code (IPC), 1860",
        "ingredients": [
            "Making false document with intent to cause damage/injury or support false claim.",
            "Signing or executing document knowing it was made without lawful authority."
        ],
        "punishment": "Simple forgery: Up to 2 years or fine. Forgery of valuable security/will: Imprisonment for Life or up to 10 years and fine.",
        "classification": "Cognizable, Non-bailable (for valuable securities under Section 338).",
        "procedural": "Section 173 BNSS; Section 63 BSA (Forensic examination of handwriting and electronic records)",
        "remedies": [
            "Obtain certified copies of forged deeds from Sub-Registrar Office.",
            "Obtain preliminary handwriting opinion from certified Forensic Document Examiner.",
            "Lodge FIR under BNS 336/338 and file Civil Declaratory Suit for cancellation of forged document."
        ]
    },
    "extortion_blackmail": {
        "title": "Extortion / Blackmail / Sextortion",
        "bns": "Section 308, Bharatiya Nyaya Sanhita (BNS), 2023",
        "ipc": "Section 383 / 384, Indian Penal Code (IPC), 1860",
        "ingredients": [
            "Intentionally putting any person in fear of injury to person, reputation, or property.",
            "Dishonestly inducing delivery of property or money."
        ],
        "punishment": "Imprisonment up to 3 years, or fine, or both. Threatening death or grievous hurt for extortion: Up to 10 years.",
        "classification": "Cognizable, Non-bailable, Triable by Magistrate of First Class.",
        "procedural": "Section 173 BNSS; Section 66E/67A Information Technology Act",
        "remedies": [
            "Do NOT transfer any money to blackmailers.",
            "Capture screenshots of numbers, chats, UPI QR codes, and threats.",
            "Report immediately at cybercrime.gov.in and file FIR at Cyber Crime Police Station."
        ]
    },
    "bribery_corruption": {
        "title": "Bribery / Public Official Corruption",
        "bns": "Section 7 & 13, Prevention of Corruption Act (PC Act), 1988 (Amended 2018)",
        "ipc": "Governed by Prevention of Corruption Act, 1988",
        "ingredients": [
            "Public servant obtaining or demanding any undue advantage with intention to perform public duty improperly or dishonestly."
        ],
        "punishment": "Imprisonment for not less than 3 years extending up to 7 years, and fine.",
        "classification": "Cognizable, Non-bailable, Triable by Special Judge (CBI / ACB).",
        "procedural": "Section 17A PC Act (Inquiry rules); Central Vigilance Commission Act",
        "remedies": [
            "Do NOT pay the bribe.",
            "Contact State Anti-Corruption Bureau (ACB) or CBI Anti-Corruption Branch.",
            "ACB will organize a formal phenolphthalein powder trap to catch the corrupt officer red-handed.",
            "File online report with Central Vigilance Commission (cvc.gov.in)."
        ]
    },
    "public_nuisance": {
        "title": "Public Nuisance / Noise Pollution",
        "bns": "Section 270, Bharatiya Nyaya Sanhita (BNS), 2023",
        "ipc": "Section 268 / 290, Indian Penal Code (IPC), 1860",
        "ingredients": [
            "Act causing common injury, danger, or annoyance to the public in vicinity.",
            "Violation of ambient noise limits under Noise Pollution Rules 2000 (after 10 PM)."
        ],
        "punishment": "Fine up to ₹1,000 (BNS). If continued after injunction: Up to 6 months imprisonment.",
        "classification": "Non-cognizable, Bailable, Triable by any Magistrate.",
        "procedural": "Section 152 BNSS (Conditional order for removal of nuisance by Executive Magistrate / SDM)",
        "remedies": [
            "Dial 112 for immediate night-time police intervention.",
            "File petition under Section 152 BNSS before Sub-Divisional Magistrate (SDM) seeking injunctive order.",
            "Lodge complaint with State Pollution Control Board."
        ]
    },
    "criminal_intimidation": {
        "title": "Criminal Intimidation / Threats to Kill",
        "bns": "Section 351, Bharatiya Nyaya Sanhita (BNS), 2023",
        "ipc": "Section 503 / 506, Indian Penal Code (IPC), 1860",
        "ingredients": [
            "Threatening another with injury to person, reputation, or property with intent to cause alarm."
        ],
        "punishment": "Simple intimidation: Up to 2 years or fine. Threat to cause death or grievous hurt: Up to 7 years or fine.",
        "classification": "Cognizable (for death threats), Non-bailable / Bailable depending on state amendments.",
        "procedural": "Section 173 BNSS / Section 175 BNSS",
        "remedies": [
            "Record calls, preserve WhatsApp audio messages and logs.",
            "Submit written complaint to Station House Officer (SHO) seeking FIR registration and police protection.",
            "If police refuse, apply under Section 175(3) BNSS before Judicial Magistrate."
        ]
    }
}
