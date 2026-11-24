/**
 * OS2 Reports — Production Vanilla JavaScript
 * Zero-dependency interactive controller for elements, animations, and transitions
 * Designed with OS2 Studio (os2studio.com) color palette & brand identity
 */

(function () {
  'use strict';

  // --------------------------------------------------------------------------
  // Data Store & Assets
  // --------------------------------------------------------------------------
  const ASSETS = {
    synthesisSky: './assets/images/hero_sky_gradient_1795433100743.jpg',
    damageEvidence: './assets/images/hero_damage_evidence_1795435760310.jpg',
    avatar1: '',
    avatar2: '',
    avatar3: '',
  };

  const PRESET_RESULTS = {
    'upload-docs': {
      id: 'upload-docs',
      sourceLabel: 'RC Book, Fitness Cert, Permit & Driver License Packet (18 MB PDF)',
      formCode: 'OCR COMPLETE · TENANT-ISOLATED VAULT',
      policyNumber: 'AEKK1236016',
      claimantName: 'ARS Engineering (Driver: Ian Mcowen Mail)',
      incidentDate: '04 Nov 2024',
      estimatedAmount: '< 5 Min Synthesis · DOCX & PDF',
      detectedLanguage: 'PaddleOCR + Multimodal Vision',
      confidenceScore: 99.1,
      cloudVaultId: 'sha256:9f84c2e1...a7b0 · /data/claims/MY-20261102',
      summary:
        'Validated magic bytes, committed SHA-256 digest, and parsed Registration Certificate, Permit, and Driver License validity against the exact Date of Loss.',
      fields: [
        { label: 'Policy & Cover', value: 'AEKK1236016 · Active', confidence: '99.4%' },
        { label: 'Vehicle & RC', value: 'Toyota Hilux · QM8860E', confidence: '99.2%' },
        { label: 'License on Loss Date', value: 'Flagged · Invalid / Expired', confidence: '99.1%' },
        { label: 'Evidence Hash', value: 'SHA-256 Verified', confidence: '100%' },
      ],
    },
    'ocr-translate': {
      id: 'ocr-translate',
      sourceLabel: 'Police FIR, Hospital Admission & Discharge Summary (Multi-Page)',
      formCode: 'DISCREPANCY AUDIT · REVIEW REQUIRED',
      policyNumber: 'VKK9039631',
      claimantName: 'Azahari Bin Talip · TPBI Claim',
      incidentDate: '04 Nov 2024 · 7:40 AM',
      estimatedAmount: '1 Timestamp Contradiction Flagged',
      detectedLanguage: 'OpenCV Deskew + Bilingual OCR',
      confidenceScore: 98.7,
      cloudVaultId: 'sha256:3c19a7d4...82fe · /data/claims/MY-20261102',
      summary:
        'Extracted Police FIR under S.41(1) RTA 1987 alongside Hospital admission timestamps and discharge notes. Cross-checked admission time against reported accident time.',
      fields: [
        { label: 'FIR Reference', value: 'S.41(1) Road Transport Act', confidence: '99.0%' },
        { label: 'Hospital Stamp', value: '04 Nov · 08:15 AM (Verified)', confidence: '98.8%' },
        { label: 'Prompt Boundary', value: 'Injection Defense Passed', confidence: '100%' },
        { label: 'System Status', value: 'review_required', confidence: '98.7%' },
      ],
    },
    'fraud-audit': {
      id: 'fraud-audit',
      sourceLabel: 'Garage Repair Estimate vs. Itemized Spares Cross-Verification',
      formCode: 'ANOMALY CHECK · INVESTIGATOR AUDIT',
      policyNumber: 'MY-20261102-1233AF',
      claimantName: 'Multi-Layer Discrepancy Engine',
      incidentDate: 'Itemized Audit Complete',
      estimatedAmount: 'Recommendation: Suspicious',
      detectedLanguage: 'Dual-Layer Regex + AI Forensics',
      confidenceScore: 99.3,
      cloudVaultId: 'sha256:7d42e0b9...11ac · AuditLog Committed',
      summary:
        'Cross-verified final garage payment bills against individual itemized spares and policy endorsements. Flagged duplicate labor entry for surveyor remarks and Manager sign-off.',
      fields: [
        { label: 'Invoice Total Check', value: '1 Variance Flagged (-$640)', confidence: '99.4%' },
        { label: 'Identity Match', value: 'Policyholder vs Driver Split', confidence: '99.6%' },
        { label: 'Recommendation', value: 'Suspicious · Needs Review', confidence: '99.1%' },
        { label: 'Deliverable', value: 'Custom DOCX + PDF Ready', confidence: '100%' },
      ],
    },
    'voice-notes': {
      id: 'voice-notes',
      sourceLabel: 'Garage Repair Estimate vs. Itemized Spares Cross-Verification',
      formCode: 'ANOMALY CHECK · INVESTIGATOR AUDIT',
      policyNumber: 'MY-20261102-1233AF',
      claimantName: 'Multi-Layer Discrepancy Engine',
      incidentDate: 'Itemized Audit Complete',
      estimatedAmount: 'Recommendation: Suspicious',
      detectedLanguage: 'Dual-Layer Regex + AI Forensics',
      confidenceScore: 99.3,
      cloudVaultId: 'sha256:7d42e0b9...11ac · AuditLog Committed',
      summary:
        'Cross-verified final garage payment bills against individual itemized spares and policy endorsements. Flagged duplicate labor entry for surveyor remarks and Manager sign-off.',
      fields: [
        { label: 'Invoice Total Check', value: '1 Variance Flagged (-$640)', confidence: '99.4%' },
        { label: 'Identity Match', value: 'Policyholder vs Driver Split', confidence: '99.6%' },
        { label: 'Recommendation', value: 'Suspicious · Needs Review', confidence: '99.1%' },
        { label: 'Deliverable', value: 'Custom DOCX + PDF Ready', confidence: '100%' },
      ],
    },
    'damage-evidence': {
      id: 'damage-evidence',
      sourceLabel: 'Geotagged Accident Scene & Vehicle Damage Photos (30 Files)',
      formCode: 'CRYPTOGRAPHIC VAULT · EVIDENCE CHAIN',
      policyNumber: 'QM8860E / SYL 405',
      claimantName: 'Tamper-Evident Scene Appendix',
      incidentDate: 'GPS & EXIF Metadata Locked',
      estimatedAmount: '100% Fail-Closed Tenant Isolation',
      detectedLanguage: 'Vision AI + SHA-256 Commitment',
      confidenceScore: 98.9,
      cloudVaultId: 'sha256:b812f4c6...9e30 · Tenant Isolated',
      summary:
        'Hashed geotagged accident site photos and vehicle impact stills on ingestion. Embedded verified photo tables directly into the custom letterhead DOCX & PDF report.',
      fields: [
        { label: 'Plate Verification', value: 'QM8860E & SYL 405 Matched', confidence: '99.5%' },
        { label: 'Geotag & EXIF', value: 'Coordinates & Time Intact', confidence: '99.1%' },
        { label: 'Magic-Byte Guard', value: '25 MB Limit · Validated', confidence: '100%' },
        { label: 'Manager Queue', value: 'Ready for Sign-Off', confidence: '100%' },
      ],
    },
  };

  const RECENT_VAULT_FILES = [
    {
      id: 'MY-20261102-1233AF',
      title: 'RC Book, Permit & Driver License Audit · QM8860E',
      meta: 'sha256:9f84c2e1 · 18 MB PDF · Magic-byte verified',
      status: 'ocr_complete',
      preset: 'upload-docs',
    },
    {
      id: 'MY-20261104-0842BC',
      title: 'Police FIR & Hospital Admission Cross-Check',
      meta: 'sha256:3c19a7d4 · S.41(1) RTA · 1 stamp flag',
      status: 'review_required',
      preset: 'ocr-translate',
    },
    {
      id: 'SG-20261105-4410DE',
      title: 'Geotagged Scene Photos & Custom DOCX Report',
      meta: 'sha256:b812f4c6 · Tenant-isolated AES-256 vault',
      status: 'completed',
      preset: 'damage-evidence',
    },
  ];

  const TECHNOLOGY_TABS = [
    {
      id: 'step-1-intake',
      stepNumber: '01',
      statusLabel: 'draft',
      title: '01. Onboarding & Claim Intake',
      description:
        'Managers configure the tenant workspace and approve investigators before opening claim files with policy, vehicle, and incident details.',
      previewTag: 'Step 1 · Intake',
      previewBadgeTop: 'route',
      previewBadgeBottom: 'check',
      rows: [
        {
          name: 'Company Tenant Isolated',
          detail: 'Fail-closed org workspace ready',
          time: 'Active',
          status: 'Approved',
          avatar: ASSETS.avatar2,
        },
        {
          name: 'Investigator Access Control',
          detail: 'Affirmative manager verification',
          time: 'Role Gate',
          status: 'Verified',
          avatar: ASSETS.avatar1,
        },
        {
          name: 'Claim #MY-20261102-1233AF',
          detail: 'Policy AEKK1236016 · QM8860E',
          time: 'Status',
          status: 'draft',
          avatar: ASSETS.avatar3,
        },
      ],
    },
    {
      id: 'step-2-upload',
      stepNumber: '02',
      statusLabel: 'documents_uploaded',
      title: '02. Forensic Upload & SHA-256 Hashing',
      description:
        'Upload RC books, driver licenses, FIRs, hospital bills, and geotagged scene photos—each validated by magic bytes and hashed with SHA-256.',
      previewTag: 'Step 2 · Vault Hash',
      previewBadgeTop: 'lock',
      previewBadgeBottom: 'vault',
      rows: [
        {
          name: 'Vehicle & Identity Docs',
          detail: 'RC, Permit, Fitness & Driver ID',
          time: 'SHA-256',
          status: 'Committed',
          avatar: ASSETS.avatar3,
        },
        {
          name: 'Legal & Medical Files',
          detail: 'Police FIR, Hospital & Garage Bills',
          time: '25 MB Max',
          status: 'Validated',
          avatar: ASSETS.avatar2,
        },
        {
          name: 'Geotagged Scene Photos',
          detail: 'Tenant-isolated UUID storage',
          time: 'Status',
          status: 'uploaded',
          avatar: ASSETS.avatar1,
        },
      ],
    },
    {
      id: 'step-3-ocr',
      stepNumber: '03',
      statusLabel: 'ocr_complete',
      title: '03. Asynchronous OCR & AI Extraction',
      description:
        'Background workers run PaddleOCR, OpenCV preprocessing, and multimodal AI with prompt-injection defenses to extract structured JSON.',
      previewTag: 'Step 3 · AI Pipeline',
      previewBadgeTop: 'mail',
      previewBadgeBottom: 'verified',
      rows: [
        {
          name: 'OpenCV & PaddleOCR Layer',
          detail: 'Deskewed scans & physical stamps',
          time: 'Workers',
          status: 'Extracted',
          avatar: ASSETS.avatar1,
        },
        {
          name: 'Multimodal Forensic AI',
          detail: 'Dates, totals, injuries & clauses',
          time: 'Dual-Layer',
          status: 'Structured',
          avatar: ASSETS.avatar3,
        },
        {
          name: 'Prompt Injection Defense',
          detail: 'Delimited OCR evaluation boundary',
          time: 'Status',
          status: 'ocr_complete',
          avatar: ASSETS.avatar2,
        },
      ],
    },
    {
      id: 'step-4-discrepancy',
      stepNumber: '04',
      statusLabel: 'review_required',
      title: '04. Discrepancy & Fraud Analysis',
      description:
        'Cross-checks driver license validity on the date of loss, flags hospital stamp contradictions, and verifies itemized garage spares.',
      previewTag: 'Step 4 · Cross-Check',
      previewBadgeTop: 'scan',
      previewBadgeBottom: 'check',
      rows: [
        {
          name: 'Driver License Date Audit',
          detail: 'Verified against exact date of loss',
          time: 'Rule 1',
          status: 'Flagged',
          avatar: ASSETS.avatar2,
        },
        {
          name: 'Hospital Stamp Timeline',
          detail: 'Admission vs reported incident time',
          time: 'Rule 2',
          status: 'Checked',
          avatar: ASSETS.avatar1,
        },
        {
          name: 'Garage Spares & Totals',
          detail: 'Itemized bill variance (-$640)',
          time: 'Status',
          status: 'review_required',
          avatar: ASSETS.avatar3,
        },
      ],
    },
    {
      id: 'step-5-audit',
      stepNumber: '05',
      statusLabel: 'ready_for_report',
      title: '05. Investigator Audit & Customization',
      description:
        'Review extracted fields in the Claim Workspace, add surveyor remarks, attach Genuine / Suspicious / Repudiate findings, and submit.',
      previewTag: 'Step 5 · Workspace',
      previewBadgeTop: 'scan',
      previewBadgeBottom: 'verified',
      rows: [
        {
          name: 'Extracted Report Boxes',
          detail: 'Missing fields highlighted inline',
          time: 'Editor',
          status: 'Verified',
          avatar: ASSETS.avatar3,
        },
        {
          name: 'Surveyor Remarks & Verdict',
          detail: 'Genuine · Suspicious · Repudiate',
          time: 'Tagged',
          status: 'Attached',
          avatar: ASSETS.avatar1,
        },
        {
          name: 'Submitted to Manager Queue',
          detail: 'Full evidence packet attached',
          time: 'Status',
          status: 'ready_for_report',
          avatar: ASSETS.avatar2,
        },
      ],
    },
    {
      id: 'step-6-signoff',
      stepNumber: '06',
      statusLabel: 'completed',
      title: '06. Report Synthesis & Manager Sign-Off',
      description:
        'Compiles official .docx and .pdf deliverables with custom corporate letterheads for affirmative Manager approval or feedback.',
      previewTag: 'Step 6 · Sign-Off',
      previewBadgeTop: 'lock',
      previewBadgeBottom: 'cloud',
      rows: [
        {
          name: 'Custom DOCX & PDF Export',
          detail: 'Corporate letterhead & evidence log',
          time: 'Rendered',
          status: 'Generated',
          avatar: ASSETS.avatar2,
        },
        {
          name: 'Manager Audit Inspection',
          detail: 'Affirmative approval or feedback',
          time: 'AuditLog',
          status: 'Signed Off',
          avatar: ASSETS.avatar3,
        },
        {
          name: 'Final Dossier Archived',
          detail: 'Immutable AES-256 + SHA-256',
          time: 'Status',
          status: 'completed',
          avatar: ASSETS.avatar1,
        },
      ],
    },
  ];

  const LANGUAGE_TOGGLES = [
    { code: 'EN', label: 'English', native: null, docType: 'Policies & bills', accent: 'bg-blue' },
    { code: 'BM', label: 'Bahasa Melayu', native: null, docType: 'Police & PDRM', accent: 'bg-amber' },
    { code: 'HI', label: 'Hindi', native: 'हिन्दी', docType: 'FIRs & RC books', accent: 'bg-orange' },
    { code: 'TA', label: 'Tamil', native: 'தமிழ்', docType: 'Hospital notes', accent: 'bg-sky' },
  ];

  // Helper: Extract claim preset or custom prompt
  function extractClaimPreset(presetId, customPrompt) {
    if (presetId !== 'custom') {
      return PRESET_RESULTS[presetId] || PRESET_RESULTS['upload-docs'];
    }
    const prompt = (customPrompt || '').trim();
    const lower = prompt.toLowerCase();

    if (lower.includes('photo') || lower.includes('damage') || lower.includes('scene') || lower.includes('geotag')) {
      return {
        ...PRESET_RESULTS['damage-evidence'],
        sourceLabel: `Custom Request: "${prompt.slice(0, 48)}${prompt.length > 48 ? '...' : ''}"`,
      };
    }
    if (lower.includes('fir') || lower.includes('hospital') || lower.includes('medical') || lower.includes('stamp')) {
      return {
        ...PRESET_RESULTS['ocr-translate'],
        sourceLabel: `Custom Request: "${prompt.slice(0, 48)}${prompt.length > 48 ? '...' : ''}"`,
      };
    }
    if (lower.includes('fraud') || lower.includes('discrepancy') || lower.includes('garage') || lower.includes('invoice') || lower.includes('audit')) {
      return {
        ...PRESET_RESULTS['fraud-audit'],
        sourceLabel: `Custom Request: "${prompt.slice(0, 48)}${prompt.length > 48 ? '...' : ''}"`,
      };
    }
    return {
      ...PRESET_RESULTS['upload-docs'],
      sourceLabel: prompt
        ? `Custom Request: "${prompt.slice(0, 48)}${prompt.length > 48 ? '...' : ''}"`
        : PRESET_RESULTS['upload-docs'].sourceLabel,
    };
  }

  // --------------------------------------------------------------------------
  // SVG Icon Templates
  // --------------------------------------------------------------------------
  const ICONS = {
    check: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
    copy: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>`,
    cloud: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/></svg>`,
    checkCircle: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
    arrowLeft: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>`,
    fileText: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>`,
    mail: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`,
    scan: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/></svg>`,
    route: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 16.98h-5.99c-1.1 0-1.95.94-2.48 1.9A4 4 0 0 1 2 17c0-2.21 1.79-4 4-4h6.01c1.1 0 1.95-.94 2.48-1.9A4 4 0 0 1 22 9c0 2.21-1.79 4-4 4"/></svg>`,
    lock: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
    verified: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>`,
    shieldCheck: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>`,
    cloudLarge: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/></svg>`,
    checkCircleLarge: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
    eye: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/></svg>`,
    eyeOff: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-.722-3.25"/><path d="M2 8a10.645 10.645 0 0 0 20 0"/><path d="m20 15-1.726-2.05"/><path d="m4 15 1.726-2.05"/><path d="m9 18 .722-3.25"/></svg>`,
  };

  // --------------------------------------------------------------------------
  // Application State
  // --------------------------------------------------------------------------
  const state = {
    activeRail: 'workspace', // 'workspace' | 'queue' | 'forms' | 'vault'
    activeResult: null,      // ExtractedClaimResult or null
    activeTechId: 'step-3-ocr',
    activeLanguages: ['EN', 'BM', 'HI'],
    counterStarted: false,
    modalMode: null,         // 'demo' | 'login' | 'privacy' | 'terms' | null
    loginRole: 'investigator',// 'investigator' | 'manager'
    showPassword: false,
  };

  // --------------------------------------------------------------------------
  // DOM Cache
  // --------------------------------------------------------------------------
  const DOM = {};

  function initDOM() {
    // Navigation
    DOM.mobileMenuBtn = document.getElementById('mobileMenuBtn');
    DOM.mobileMenu = document.getElementById('mobileMenu');
    DOM.btnOpenLogin = document.getElementById('btnOpenLogin');
    DOM.btnOpenDemo = document.getElementById('btnOpenDemo');
    DOM.mobileBtnLogin = document.getElementById('mobileBtnLogin');
    DOM.mobileBtnDemo = document.getElementById('mobileBtnDemo');
    DOM.heroScheduleDemo = document.getElementById('heroScheduleDemo');

    // Hero Workspace
    DOM.railBtnWorkspace = document.getElementById('railBtnWorkspace');
    DOM.railBtnQueue = document.getElementById('railBtnQueue');
    DOM.railBtnForms = document.getElementById('railBtnForms');
    DOM.railBtnVault = document.getElementById('railBtnVault');
    DOM.workspaceHint = document.getElementById('workspaceHint');
    DOM.workspaceBackWrapper = document.getElementById('workspaceBackWrapper');
    DOM.workspaceCardsGrid = document.getElementById('workspaceCardsGrid');
    DOM.workspaceResultPanel = document.getElementById('workspaceResultPanel');
    DOM.workspaceVaultPanel = document.getElementById('workspaceVaultPanel');

    // Technology
    DOM.technologyTabsList = document.getElementById('technologyTabsList');
    DOM.badgeTop = document.getElementById('badgeTop');
    DOM.badgeBottom = document.getElementById('badgeBottom');
    DOM.feedCard = document.getElementById('feedCard');

    // Capabilities
    DOM.langTogglesContainer = document.getElementById('langTogglesContainer');
    DOM.activeLangSummary = document.getElementById('activeLangSummary');
    DOM.activeLangCount = document.getElementById('activeLangCount');
    DOM.kpiNumber = document.getElementById('kpiNumber');
    DOM.kpiCard = document.getElementById('kpiCard');

    // FAQ
    DOM.faqList = document.getElementById('faqList');
    DOM.faqContactBtn = document.getElementById('faqContactBtn');

    // Waitlist
    DOM.waitlistForm = document.getElementById('waitlistForm');
    DOM.waitlistEmailInput = document.getElementById('waitlistEmailInput');
    DOM.waitlistError = document.getElementById('waitlistError');
    DOM.waitlistConfirmation = document.getElementById('waitlistConfirmation');
    DOM.waitlistConfirmedEmail = document.getElementById('waitlistConfirmedEmail');
    DOM.btnWaitlistReset = document.getElementById('btnWaitlistReset');

    // Footer
    DOM.footerContactBtn = document.getElementById('footerContactBtn');
    DOM.footerPrivacyBtn = document.getElementById('footerPrivacyBtn');
    DOM.footerTermsBtn = document.getElementById('footerTermsBtn');
    DOM.footerLoginInvestigator = document.getElementById('footerLoginInvestigator');
    DOM.footerLoginManager = document.getElementById('footerLoginManager');

    // Synthesis Spotlight
    DOM.synthesisSandboxBtn = document.getElementById('synthesisSandboxBtn');

    // Modal
    DOM.modalOverlay = document.getElementById('modalOverlay');
    DOM.modalBackdrop = document.getElementById('modalBackdrop');
    DOM.modalCloseBtn = document.getElementById('modalCloseBtn');
    DOM.modalBody = document.getElementById('modalBody');
  }

  // --------------------------------------------------------------------------
  // Navigation & Mobile Menu
  // --------------------------------------------------------------------------
  function initNav() {
    function closeMobileMenu() {
      if (DOM.mobileMenu) DOM.mobileMenu.classList.remove('is-open');
      if (DOM.mobileMenuBtn) {
        DOM.mobileMenuBtn.classList.remove('is-open');
        DOM.mobileMenuBtn.setAttribute('aria-expanded', 'false');
        DOM.mobileMenuBtn.setAttribute('aria-label', 'Open navigation menu');
      }
    }

    if (DOM.mobileMenuBtn && DOM.mobileMenu) {
      DOM.mobileMenuBtn.addEventListener('click', () => {
        const isOpen = DOM.mobileMenu.classList.toggle('is-open');
        DOM.mobileMenuBtn.classList.toggle('is-open', isOpen);
        DOM.mobileMenuBtn.setAttribute('aria-expanded', String(isOpen));
        DOM.mobileMenuBtn.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
      });

      // Close mobile menu on clicking any navigation link
      const mobileNavLinks = DOM.mobileMenu.querySelectorAll('.mobile-nav-link');
      mobileNavLinks.forEach((link) => {
        link.addEventListener('click', closeMobileMenu);
      });
    }

    if (DOM.mobileBtnLogin) DOM.mobileBtnLogin.addEventListener('click', () => { closeMobileMenu(); openModal('login', 'investigator'); });
    if (DOM.btnOpenDemo) DOM.btnOpenDemo.addEventListener('click', () => openModal('demo'));
    if (DOM.mobileBtnDemo) DOM.mobileBtnDemo.addEventListener('click', () => { closeMobileMenu(); openModal('demo'); });
    if (DOM.heroScheduleDemo) DOM.heroScheduleDemo.addEventListener('click', () => openModal('demo'));
    if (DOM.faqContactBtn) DOM.faqContactBtn.addEventListener('click', () => openModal('demo'));
    if (DOM.synthesisSandboxBtn) DOM.synthesisSandboxBtn.addEventListener('click', () => openModal('demo'));
    if (DOM.footerContactBtn) DOM.footerContactBtn.addEventListener('click', () => openModal('demo'));
    if (DOM.footerPrivacyBtn) DOM.footerPrivacyBtn.addEventListener('click', () => openModal('privacy'));
    if (DOM.footerTermsBtn) DOM.footerTermsBtn.addEventListener('click', () => openModal('terms'));
    if (DOM.footerLoginInvestigator) DOM.footerLoginInvestigator.addEventListener('click', () => openModal('login', 'investigator'));
    if (DOM.footerLoginManager) DOM.footerLoginManager.addEventListener('click', () => openModal('login', 'manager'));
  }

  // --------------------------------------------------------------------------
  // Hero Workspace Logic
  // --------------------------------------------------------------------------
  function setHeroRail(rail, preset) {
    state.activeRail = rail;
    if (preset) {
      state.activeResult = extractClaimPreset(preset);
    } else if (rail === 'forms') {
      state.activeResult = extractClaimPreset('upload-docs');
    } else {
      state.activeResult = null;
    }
    renderHeroWorkspace();
  }

  function renderHeroWorkspace() {
    // Update rail buttons active state
    DOM.railBtnWorkspace.className = 'rail-btn' + (state.activeRail === 'workspace' && !state.activeResult ? ' active-black' : '');
    DOM.railBtnQueue.className = 'rail-btn' + (state.activeRail === 'queue' ? ' active-blue' : '');
    DOM.railBtnForms.className = 'rail-btn' + (state.activeResult ? ' active-yellow' : '');
    DOM.railBtnVault.className = 'rail-btn' + (state.activeRail === 'vault' ? ' active-teal' : '');

    // Header hint & Back button
    if (state.activeResult) {
      DOM.workspaceHint.textContent = 'Structured forensic extraction, SHA-256 digest & draft synthesis';
      DOM.workspaceBackWrapper.innerHTML = `
        <button type="button" class="btn-back-tools" id="btnBackToTools">
          ${ICONS.arrowLeft} Back to tools
        </button>
      `;
      document.getElementById('btnBackToTools').addEventListener('click', () => {
        state.activeResult = null;
        state.activeRail = 'workspace';
        renderHeroWorkspace();
      });
    } else {
      DOM.workspaceHint.textContent = 'Select a forensic pipeline module to inspect live extraction';
      DOM.workspaceBackWrapper.innerHTML = '';
    }

    // View Switching
    if (state.activeResult) {
      DOM.workspaceCardsGrid.style.display = 'none';
      DOM.workspaceVaultPanel.style.display = 'none';
      DOM.workspaceResultPanel.style.display = 'block';
      renderResultPanel(state.activeResult);
    } else if (state.activeRail === 'queue' || state.activeRail === 'vault') {
      DOM.workspaceCardsGrid.style.display = 'none';
      DOM.workspaceResultPanel.style.display = 'none';
      DOM.workspaceVaultPanel.style.display = 'block';
      renderVaultPanel(state.activeRail);
    } else {
      DOM.workspaceCardsGrid.style.display = 'grid';
      DOM.workspaceResultPanel.style.display = 'none';
      DOM.workspaceVaultPanel.style.display = 'none';
    }
  }

  function renderResultPanel(res) {
    const fieldsHtml = res.fields
      .map(
        (f) => `
        <div class="result-field-card">
          <div class="field-label">${f.label}</div>
          <div class="field-value">${f.value}</div>
          <div class="field-verified">Verified · ${f.confidence}</div>
        </div>
      `
      )
      .join('');

    DOM.workspaceResultPanel.innerHTML = `
      <div class="result-top-bar">
        <div>
          <div class="result-tag-row">
            <span>${res.formCode}</span>
            <span>·</span>
            <span>${res.detectedLanguage}</span>
          </div>
          <h3 class="result-source-label">${res.sourceLabel}</h3>
        </div>
        <div class="result-actions">
          <span class="confidence-badge">${res.confidenceScore}% OCR Confidence</span>
        </div>
      </div>

      <p class="result-summary-text">${res.summary}</p>

      <div class="result-fields-grid">
        ${fieldsHtml}
      </div>

      <div class="result-footer-bar">
        <span style="display:inline-flex; align-items:center; gap:6px; font-family:var(--font-mono); color:#0284c7;">
          ${ICONS.cloud} ${res.cloudVaultId}
        </span>
        <span style="display:inline-flex; align-items:center; gap:6px; font-weight:500; color:var(--color-primary);">
          ${ICONS.checkCircle} Custom letterhead DOCX &amp; PDF ready for Manager Sign-Off
        </span>
      </div>
    `;
  }

  function renderVaultPanel(rail) {
    const title = rail === 'vault' ? 'Tamper-Evident SHA-256 Evidence Vault' : 'Tenant-Isolated Claims Queue';
    const rowsHtml = RECENT_VAULT_FILES.map(
      (item) => `
      <button type="button" class="vault-file-row" data-preset="${item.preset}">
        <div class="vault-file-info">
          <div class="vault-icon-box">
            ${ICONS.fileText}
          </div>
          <div style="min-width:0;">
            <div class="vault-file-title">${item.title}</div>
            <div class="vault-file-meta">${item.id} · ${item.meta}</div>
          </div>
        </div>
        <span class="vault-file-status">${item.status}</span>
      </button>
    `
    ).join('');

    DOM.workspaceVaultPanel.innerHTML = `
      <div class="vault-list-header">
        <h3>${title}</h3>
        <button type="button" class="btn-return-tools" id="btnReturnQuickTools">Return to quick tools</button>
      </div>
      <div style="display:flex; flex-direction:column; gap:10px; margin-top:12px;">
        ${rowsHtml}
      </div>
    `;

    document.getElementById('btnReturnQuickTools').addEventListener('click', () => {
      state.activeRail = 'workspace';
      renderHeroWorkspace();
    });

    const fileRows = DOM.workspaceVaultPanel.querySelectorAll('.vault-file-row');
    fileRows.forEach((row) => {
      row.addEventListener('click', () => {
        const preset = row.getAttribute('data-preset');
        setHeroRail('workspace', preset);
      });
    });
  }

  function initHeroWorkspace() {
    // Rail clicks
    DOM.railBtnWorkspace.addEventListener('click', () => setHeroRail('workspace'));
    DOM.railBtnQueue.addEventListener('click', () => setHeroRail('queue'));
    DOM.railBtnForms.addEventListener('click', () => setHeroRail('forms'));
    DOM.railBtnVault.addEventListener('click', () => setHeroRail('vault'));

    // 4 Action Cards clicks
    const actionCards = DOM.workspaceCardsGrid.querySelectorAll('.action-card');
    actionCards.forEach((card) => {
      card.addEventListener('click', () => {
        const preset = card.getAttribute('data-preset');
        setHeroRail('workspace', preset);
      });
    });

    // Command Bar interactive prompt submit
    const promptForm = document.getElementById('workspacePromptForm');
    const promptInput = document.getElementById('workspacePrompt');
    if (promptForm && promptInput) {
      promptForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const query = (promptInput.value || '').toLowerCase().trim();
        if (query.includes('fir') || query.includes('hospital') || query.includes('medical') || query.includes('stamp')) {
          setHeroRail('workspace', 'ocr-translate');
        } else if (query.includes('fraud') || query.includes('discrepancy') || query.includes('audit') || query.includes('garage') || query.includes('voice')) {
          setHeroRail('workspace', 'fraud-audit');
        } else if (query.includes('photo') || query.includes('damage') || query.includes('scene') || query.includes('evidence')) {
          setHeroRail('workspace', 'damage-evidence');
        } else {
          setHeroRail('workspace', 'upload-docs');
        }
      });
    }
  }

  // --------------------------------------------------------------------------
  // Technology Section Workflow Tabs
  // --------------------------------------------------------------------------
  function renderTechTab(tabId) {
    state.activeTechId = tabId;
    const tab = TECHNOLOGY_TABS.find((t) => t.id === tabId) || TECHNOLOGY_TABS[2];

    // Update tab button classes
    const tabBtns = DOM.technologyTabsList.querySelectorAll('.workflow-tab-btn');
    tabBtns.forEach((btn) => {
      const id = btn.getAttribute('data-id');
      if (id === tabId) {
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
      } else {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
      }
    });

    // Update Top Floating Badge Icon
    let topIcon = ICONS.mail;
    if (tab.previewBadgeTop === 'route') topIcon = ICONS.route;
    if (tab.previewBadgeTop === 'scan') topIcon = ICONS.scan;
    if (tab.previewBadgeTop === 'lock') topIcon = ICONS.lock;
    DOM.badgeTop.innerHTML = topIcon;

    // Update Bottom Floating Badge Icon
    let bottomIcon = ICONS.verified;
    if (tab.previewBadgeBottom === 'cloud') bottomIcon = ICONS.cloudLarge;
    if (tab.previewBadgeBottom === 'check') bottomIcon = ICONS.checkCircleLarge;
    if (tab.previewBadgeBottom === 'vault') bottomIcon = ICONS.lock;
    DOM.badgeBottom.innerHTML = bottomIcon;

    // Update Center Feed Card with smooth opacity transition
    DOM.feedCard.style.opacity = '0';
    DOM.feedCard.style.transform = 'translateY(8px) scale(0.98)';

    window.setTimeout(() => {
      const rowsHtml = tab.rows
        .map(
          (row, idx) => `
          <div class="feed-row ${idx === 0 ? 'row-featured' : idx === 1 ? 'row-plain' : 'row-muted'}">
            <div class="feed-row-left">
              <img src="${row.avatar}" alt="" class="feed-avatar" />
              <div style="min-width:0;">
                <div class="feed-name">${row.name}</div>
                <div class="feed-detail">${row.detail}</div>
              </div>
            </div>
            <div class="feed-row-right">
              <div class="feed-time">${row.time}</div>
              <div class="feed-row-status">${row.status}</div>
            </div>
          </div>
        `
        )
        .join('');

      DOM.feedCard.innerHTML = `
        <div class="feed-header">
          <span class="feed-tag">${tab.previewTag}</span>
          <span class="feed-status">status: ${tab.statusLabel}</span>
        </div>
        <div class="feed-rows">
          ${rowsHtml}
        </div>
      `;

      DOM.feedCard.style.opacity = '1';
      DOM.feedCard.style.transform = 'translateY(0) scale(1)';
    }, 140);
  }

  function initTechnologyTabs() {
    const tabBtns = DOM.technologyTabsList.querySelectorAll('.workflow-tab-btn');
    tabBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        renderTechTab(id);
      });
    });
    renderTechTab('step-3-ocr');
  }

  // --------------------------------------------------------------------------
  // Capabilities Bento: Language Toggles & Animated KPI Counter
  // --------------------------------------------------------------------------
  function toggleLanguage(code) {
    const norm = code.toUpperCase();
    if (state.activeLanguages.includes(norm)) {
      if (state.activeLanguages.length <= 1) return; // Must have at least 1 language
      state.activeLanguages = state.activeLanguages.filter((c) => c !== norm);
    } else {
      state.activeLanguages.push(norm);
    }
    renderLanguageToggles();
  }

  function renderLanguageToggles() {
    const buttons = DOM.langTogglesContainer.querySelectorAll('.lang-toggle-btn');
    buttons.forEach((btn) => {
      const code = btn.getAttribute('data-code');
      const isActive = state.activeLanguages.includes(code);
      btn.classList.toggle('is-active', isActive);
      btn.setAttribute('aria-pressed', String(isActive));
    });

    const activeNames = LANGUAGE_TOGGLES.filter((l) => state.activeLanguages.includes(l.code)).map((l) => l.label);
    DOM.activeLangSummary.textContent = activeNames.join(', ');
    DOM.activeLangCount.textContent = `${state.activeLanguages.length} of ${LANGUAGE_TOGGLES.length} active`;
  }

  function initLanguageToggles() {
    const buttons = DOM.langTogglesContainer.querySelectorAll('.lang-toggle-btn');
    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const code = btn.getAttribute('data-code');
        toggleLanguage(code);
      });
    });
    renderLanguageToggles();
  }

  function initKpiCounter() {
    if (!DOM.kpiCard || !DOM.kpiNumber) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !state.counterStarted) {
            state.counterStarted = true;
            observer.disconnect();

            const start = performance.now();
            const duration = 950;
            const from = 192;
            const to = 300;

            const tick = (now) => {
              const progress = Math.min((now - start) / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              const current = Math.round(from + (to - from) * eased);
              DOM.kpiNumber.textContent = `${current}K`;
              if (progress < 1) {
                requestAnimationFrame(tick);
              }
            };
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(DOM.kpiCard);
  }

  // --------------------------------------------------------------------------
  // FAQ Accordion
  // --------------------------------------------------------------------------
  function initFaq() {
    const items = DOM.faqList.querySelectorAll('.faq-accordion-item');
    items.forEach((item) => {
      const header = item.querySelector('.faq-accordion-header');
      header.addEventListener('click', () => {
        const isOpen = item.classList.contains('is-open');
        // Close others or toggle this
        items.forEach((other) => {
          other.classList.remove('is-open');
          other.querySelector('.faq-accordion-header').setAttribute('aria-expanded', 'false');
        });
        if (!isOpen) {
          item.classList.add('is-open');
          header.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  // --------------------------------------------------------------------------
  // Waitlist Form Validation
  // --------------------------------------------------------------------------
  function validateEmail(email) {
    const trimmed = (email || '').trim();
    if (!trimmed) {
      return { valid: false, error: 'Please enter your work email address.' };
    }
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!pattern.test(trimmed)) {
      return { valid: false, error: 'Enter a valid email address (for example, name@company.com).' };
    }
    return { valid: true, error: null };
  }

  function initWaitlist() {
    if (!DOM.waitlistForm) return;

    DOM.waitlistForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = DOM.waitlistEmailInput.value;
      const check = validateEmail(val);
      if (!check.valid) {
        DOM.waitlistError.textContent = check.error;
        DOM.waitlistError.style.display = 'block';
        return;
      }

      DOM.waitlistError.style.display = 'none';
      DOM.waitlistForm.style.display = 'none';
      DOM.waitlistConfirmedEmail.textContent = val.trim();
      DOM.waitlistConfirmation.style.display = 'flex';
      DOM.waitlistEmailInput.value = '';
    });

    DOM.waitlistEmailInput.addEventListener('input', () => {
      if (DOM.waitlistError.style.display !== 'none') {
        DOM.waitlistError.style.display = 'none';
      }
    });

    DOM.btnWaitlistReset.addEventListener('click', () => {
      DOM.waitlistConfirmation.style.display = 'none';
      DOM.waitlistForm.style.display = 'block';
      DOM.waitlistEmailInput.focus();
    });
  }

  // --------------------------------------------------------------------------
  // Action Modal System (Demo, Login, Privacy, Terms)
  // --------------------------------------------------------------------------
  function openModal(mode, role) {
    if (!DOM.modalOverlay || !DOM.modalBody) return;
    state.modalMode = mode;
    if (role) state.loginRole = role;
    state.showPassword = false;

    renderModalContent();
    DOM.modalOverlay.classList.add('is-active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!DOM.modalOverlay) return;
    state.modalMode = null;
    DOM.modalOverlay.classList.remove('is-active');
    document.body.style.overflow = '';
  }

  function renderModalContent() {
    const mode = state.modalMode;
    if (!mode || !DOM.modalBody) return;

    if (mode === 'demo' || mode === 'sandbox') {
      DOM.modalBody.innerHTML = `
        <div class="brand-mark">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" class="shrink-0">
            <defs>
              <linearGradient id="modalBrandA" x1="2" y1="2" x2="26" y2="26" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stop-color="#FFD54F" />
                <stop offset="60%" stop-color="#FFB600" />
                <stop offset="100%" stop-color="#E0A100" />
              </linearGradient>
              <linearGradient id="modalBrandB" x1="24" y1="4" x2="6" y2="24" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stop-color="#FFB600" stop-opacity="0.95" />
                <stop offset="100%" stop-color="#D97706" stop-opacity="0.75" />
              </linearGradient>
            </defs>
            <circle cx="14" cy="14" r="12" fill="url(#modalBrandA)" />
            <path d="M14 5.5C9.30558 5.5 5.5 9.30558 5.5 14C5.5 18.6944 9.30558 22.5 14 22.5C17.1 22.5 19.81 20.84 21.3 18.36" stroke="#0a0a0a" stroke-width="2.6" stroke-linecap="round" />
            <circle cx="14" cy="14" r="4.2" fill="url(#modalBrandB)" stroke="#0a0a0a" stroke-width="1.6" />
          </svg>
          <span>OS2 Reports</span>
        </div>
        <h2 class="modal-heading" id="modalHeading">Schedule a live OCR walkthrough</h2>
        <p class="modal-desc">
          See how OS2 Reports anchors party identities, parses PDRM evidence, and drafts Template 1–3 DOCX &amp; PDF investigation reports.
        </p>

        <div id="demoFormWrapper">
          <form id="demoModalForm" novalidate style="margin-top:20px;">
            <div class="modal-form-group">
              <label class="modal-label" for="demoName">Full name</label>
              <input type="text" id="demoName" class="modal-input" placeholder="Priya Nair" />
              <div class="modal-input-error" id="demoNameError" style="display:none;"></div>
            </div>

            <div class="modal-form-group">
              <label class="modal-label" for="demoEmail">Work email</label>
              <input type="email" id="demoEmail" class="modal-input" placeholder="priya@carrier.com" />
              <div class="modal-input-error" id="demoEmailError" style="display:none;"></div>
            </div>

            <div class="modal-form-group">
              <label class="modal-label" for="demoCompany">Insurance carrier or TPA</label>
              <input type="text" id="demoCompany" class="modal-input" placeholder="Pacific Mutual Insurance" />
              <div class="modal-input-error" id="demoCompanyError" style="display:none;"></div>
            </div>

            <div class="modal-form-group">
              <label class="modal-label" for="demoVolume">Monthly claim packet volume</label>
              <select id="demoVolume" class="modal-input">
                <option value="Under 1,000 claims / mo">Under 1,000 claims / mo</option>
                <option value="1,000 - 5,000 claims / mo" selected>1,000 - 5,000 claims / mo</option>
                <option value="5,000 - 25,000 claims / mo">5,000 - 25,000 claims / mo</option>
                <option value="25,000+ claims / mo">25,000+ claims / mo</option>
              </select>
            </div>

            <button type="submit" class="modal-submit-btn">Book Demo Walkthrough</button>
          </form>
        </div>
      `;

      const demoForm = document.getElementById('demoModalForm');
      demoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const nameVal = document.getElementById('demoName').value.trim();
        const emailVal = document.getElementById('demoEmail').value.trim();
        const compVal = document.getElementById('demoCompany').value.trim();
        const volVal = document.getElementById('demoVolume').value;

        let hasError = false;

        const nameErr = document.getElementById('demoNameError');
        if (nameVal.length < 2) {
          nameErr.textContent = 'Please enter your full name.';
          nameErr.style.display = 'block';
          hasError = true;
        } else {
          nameErr.style.display = 'none';
        }

        const emailErr = document.getElementById('demoEmailError');
        const check = validateEmail(emailVal);
        if (!check.valid) {
          emailErr.textContent = check.error;
          emailErr.style.display = 'block';
          hasError = true;
        } else {
          emailErr.style.display = 'none';
        }

        const compErr = document.getElementById('demoCompanyError');
        if (compVal.length < 2) {
          compErr.textContent = 'Please enter your organization name.';
          compErr.style.display = 'block';
          hasError = true;
        } else {
          compErr.style.display = 'none';
        }

        if (hasError) return;

        document.getElementById('demoFormWrapper').innerHTML = `
          <div class="modal-success-box">
            <div class="modal-success-header">
              <span style="color:#16a34a; margin-top:2px;">${ICONS.checkCircleLarge}</span>
              <div>
                <h3>Demo request confirmed</h3>
                <p>
                  Thanks, <strong>${nameVal}</strong>. Our solutions engineer will send a calendar invite to
                  <strong>${emailVal}</strong> for <strong>${compVal}</strong> (${volVal}).
                </p>
              </div>
            </div>
            <button type="button" class="modal-submit-btn" id="btnDemoDone" style="margin-top:16px;">Done</button>
          </div>
        `;
        document.getElementById('btnDemoDone').addEventListener('click', closeModal);
      });
    } else if (mode === 'login') {
      DOM.modalBody.innerHTML = `
        <div class="brand-mark">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" class="shrink-0">
            <defs>
              <linearGradient id="modalBrandA" x1="2" y1="2" x2="26" y2="26" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stop-color="#FFD54F" />
                <stop offset="60%" stop-color="#FFB600" />
                <stop offset="100%" stop-color="#E0A100" />
              </linearGradient>
              <linearGradient id="modalBrandB" x1="24" y1="4" x2="6" y2="24" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stop-color="#FFB600" stop-opacity="0.95" />
                <stop offset="100%" stop-color="#D97706" stop-opacity="0.75" />
              </linearGradient>
            </defs>
            <circle cx="14" cy="14" r="12" fill="url(#modalBrandA)" />
            <path d="M14 5.5C9.30558 5.5 5.5 9.30558 5.5 14C5.5 18.6944 9.30558 22.5 14 22.5C17.1 22.5 19.81 20.84 21.3 18.36" stroke="#0a0a0a" stroke-width="2.6" stroke-linecap="round" />
            <circle cx="14" cy="14" r="4.2" fill="url(#modalBrandB)" stroke="#0a0a0a" stroke-width="1.6" />
          </svg>
          <span>OS2 Reports</span>
        </div>
        <h2 class="modal-heading" id="modalHeading">Log in to OS2 Reports</h2>
        <p class="modal-desc">
          Sign in with your approved Investigator or Manager account to access your fail-closed organization workspace.
        </p>

        <div class="modal-role-switch">
          <button type="button" class="role-switch-btn ${state.loginRole === 'investigator' ? 'is-active' : ''}" id="btnRoleInvestigator">Investigator</button>
          <button type="button" class="role-switch-btn ${state.loginRole === 'manager' ? 'is-active' : ''}" id="btnRoleManager">Manager</button>
        </div>

        <div id="loginFormWrapper">
          <form id="loginModalForm" novalidate style="margin-top:16px;">
            <div class="modal-form-group">
              <label class="modal-label" for="loginEmail">Employee email</label>
              <input type="email" id="loginEmail" class="modal-input" placeholder="${state.loginRole === 'investigator' ? 'investigator@os2reports.com' : 'manager@os2reports.com'}" />
              <div class="modal-input-error" id="loginEmailError" style="display:none;"></div>
            </div>

            <div class="modal-form-group">
              <label class="modal-label" for="loginPassword">Password</label>
              <div class="password-input-wrapper">
                <input type="password" id="loginPassword" class="modal-input" placeholder="••••••••••••" style="padding-right:40px;" />
                <button type="button" class="password-toggle-btn" id="btnTogglePassword" aria-label="Toggle password visibility">
                  ${ICONS.eye}
                </button>
              </div>
              <div class="modal-input-error" id="loginPasswordError" style="display:none;"></div>
            </div>

            <button type="submit" class="modal-submit-btn" id="btnLoginSubmit">
              Log in as ${state.loginRole === 'investigator' ? 'Investigator' : 'Manager'}
            </button>
          </form>
        </div>
      `;

      const btnInvestigator = document.getElementById('btnRoleInvestigator');
      const btnManager = document.getElementById('btnRoleManager');
      const emailInput = document.getElementById('loginEmail');
      const submitBtn = document.getElementById('btnLoginSubmit');

      btnInvestigator.addEventListener('click', () => {
        state.loginRole = 'investigator';
        btnInvestigator.classList.add('is-active');
        btnManager.classList.remove('is-active');
        emailInput.placeholder = 'investigator@os2reports.com';
        submitBtn.textContent = 'Log in as Investigator';
      });

      btnManager.addEventListener('click', () => {
        state.loginRole = 'manager';
        btnManager.classList.add('is-active');
        btnInvestigator.classList.remove('is-active');
        emailInput.placeholder = 'manager@os2reports.com';
        submitBtn.textContent = 'Log in as Manager';
      });

      const passToggle = document.getElementById('btnTogglePassword');
      const passInput = document.getElementById('loginPassword');
      passToggle.addEventListener('click', () => {
        state.showPassword = !state.showPassword;
        passInput.type = state.showPassword ? 'text' : 'password';
        passToggle.innerHTML = state.showPassword ? ICONS.eyeOff : ICONS.eye;
      });

      const loginForm = document.getElementById('loginModalForm');
      loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailVal = emailInput.value.trim();
        const passVal = passInput.value.trim();

        let hasError = false;

        const emailErr = document.getElementById('loginEmailError');
        const check = validateEmail(emailVal);
        if (!check.valid) {
          emailErr.textContent = check.error;
          emailErr.style.display = 'block';
          hasError = true;
        } else {
          emailErr.style.display = 'none';
        }

        const passErr = document.getElementById('loginPasswordError');
        if (passVal.length < 6) {
          passErr.textContent = 'Password must be at least 6 characters.';
          passErr.style.display = 'block';
          hasError = true;
        } else {
          passErr.style.display = 'none';
        }

        if (hasError) return;

        document.getElementById('loginFormWrapper').innerHTML = `
          <div class="modal-success-box">
            <div class="modal-success-header">
              <span style="color:#16a34a; margin-top:2px;">${ICONS.shieldCheck}</span>
              <div>
                <h3>Credentials verified (${state.loginRole === 'investigator' ? 'Investigator' : 'Manager'})</h3>
                <p>
                  Signed in as <strong>${emailVal}</strong>. Your encrypted claim vault is ready.
                </p>
              </div>
            </div>
            <button type="button" class="modal-submit-btn" id="btnLoginDone" style="margin-top:16px;">Continue to Workspace</button>
          </div>
        `;
        document.getElementById('btnLoginDone').addEventListener('click', closeModal);
      });
    } else if (mode === 'privacy' || mode === 'terms') {
      const isPrivacy = mode === 'privacy';
      DOM.modalBody.innerHTML = `
        <div style="display:inline-flex; height:40px; width:40px; align-items:center; justify-content:center; border-radius:12px; background-color:#F4F4F5; color:var(--color-primary);">
          ${ICONS.lock}
        </div>
        <h2 class="modal-heading" id="modalHeading">${isPrivacy ? 'Privacy &amp; Data Security' : 'Terms of Service'}</h2>
        <div style="margin-top:14px; display:flex; flex-direction:column; gap:12px; font-size:14px; line-height:1.6; color:#525252;">
          ${
            isPrivacy
              ? `
            <p>
              OS2 Reports by OS2 Studio validates file magic bytes, generates SHA-256 cryptographic hashes on ingestion, and encrypts all claim evidence and generated DOCX/PDF reports using TLS 1.3 in transit and AES-256 at rest.
            </p>
            <p>
              Fail-closed multi-tenant isolation enforces strict database, cache, and filesystem separation per insurance organization with tamper-resistant AuditLog recording and anti-jailbreak AI prompt boundaries.
            </p>
          `
              : `
            <p>
              Enterprise OS2 Reports subscriptions include Organization Onboarding, Asynchronous PaddleOCR &amp; Multimodal Vision extraction, Discrepancy &amp; Fraud Analysis, Custom Letterhead DOCX/PDF synthesis, and Manager Sign-Off.
            </p>
            <p>
              Insurers and adjusting firms retain full ownership of source evidence, SHA-256 checksums, extracted report boxes, and versioned dossiers with full export or deletion on demand.
            </p>
          `
          }
        </div>
        <button type="button" class="modal-submit-btn" id="btnLegalClose" style="margin-top:24px;">Close</button>
      `;
      document.getElementById('btnLegalClose').addEventListener('click', closeModal);
    }
  }

  function initModal() {
    if (DOM.modalCloseBtn) DOM.modalCloseBtn.addEventListener('click', closeModal);
    if (DOM.modalBackdrop) DOM.modalBackdrop.addEventListener('click', closeModal);

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && state.modalMode) {
        closeModal();
      }
    });
  }

  // --------------------------------------------------------------------------
  // Scroll-Triggered Reveal Animations (Framer Motion replacement)
  // --------------------------------------------------------------------------
  function initScrollReveals() {
    const reveals = document.querySelectorAll('.reveal-on-scroll');
    if (!reveals.length) return;

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15 }
      );

      reveals.forEach((el) => observer.observe(el));
    } else {
      // Fallback for older browsers
      reveals.forEach((el) => el.classList.add('is-visible'));
    }
  }

  // --------------------------------------------------------------------------
  // Main Bootstrapper
  // --------------------------------------------------------------------------
  // Expose the modal controller so newly added sections can reuse it.
  window.OS2ReportsModal = { open: openModal, close: closeModal };

  function safeInit(name, fn) {
    try {
      fn();
    } catch (err) {
      // A section may be replaced by a newer design — never let one missing
      // element stop the rest of the page from initialising.
      console.warn('[OS2 Reports] skipped ' + name + ':', err && err.message);
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    safeInit('DOM', initDOM);
    safeInit('nav', initNav);
    safeInit('hero workspace', initHeroWorkspace);
    // The tabbed workflow and bento capabilities grid were replaced by the
    // sticky guide and role workspaces.
    safeInit('faq', initFaq);
    safeInit('waitlist', initWaitlist);
    safeInit('modal', initModal);
    safeInit('scroll reveals', initScrollReveals);
  });
})();
