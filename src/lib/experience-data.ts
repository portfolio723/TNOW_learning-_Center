export const PRODUCTS = [
  {
    id: "secops",
    name: "SecOps",
    tagline: "SAP Security Operations, automated.",
    description:
      "Automate SAP user provisioning, SoD analysis, license optimization, and emergency access — end to end.",
    capabilities: ["User Mgmt", "SoD", "Licenses", "Workflow"],
    time: "12 min",
    status: "available" as const,
    cta: "Start Experience",
  },
  {
    id: "fftrust",
    name: "FF Trust",
    tagline: "Firefighter access with zero blind spots.",
    description: "Session recording, log analytics, and risk scoring for privileged SAP access.",
    capabilities: ["Firefighter", "Log Review", "Risk Scoring"],
    time: "10 min",
    status: "coming" as const,
    cta: "Notify Me",
  },
  {
    id: "reviewnow",
    name: "ReviewNow",
    tagline: "Access recertification without the spreadsheets.",
    description:
      "Automate periodic user access reviews with policy-driven campaigns and audit trails.",
    capabilities: ["Campaigns", "Attestation", "Audit"],
    time: "8 min",
    status: "coming" as const,
    cta: "Notify Me",
  },
  {
    id: "gams360",
    name: "GAMS360",
    tagline: "Governance, Access & Monitoring, unified.",
    description: "A single control plane for SAP GRC across systems and landscapes.",
    capabilities: ["GRC", "Monitoring", "Analytics"],
    time: "10 min",
    status: "coming" as const,
    cta: "Notify Me",
  },
  {
    id: "digybots",
    name: "Digybots",
    tagline: "Intelligent bots for SAP operations.",
    description: "Automate repetitive SAP Basis and security operations with policy-safe bots.",
    capabilities: ["Automation", "Basis", "Ops"],
    time: "9 min",
    status: "coming" as const,
    cta: "Notify Me",
  },
];

export const INDUSTRIES = [
  "Manufacturing",
  "Retail",
  "Pharma",
  "Banking",
  "Energy",
  "Utilities",
  "Public Sector",
];

export const CAPABILITIES = [
  {
    id: "user-management",
    title: "User Management",
    duration: "2:14",
    summary:
      "Provision and deprovision SAP users across ECC and S/4 landscapes with a single workflow.",
    features: [
      "Cross-system provisioning (ECC, S/4, BW, HANA)",
      "HR-driven joiner/mover/leaver",
      "Role-based approvals",
      "Real-time sync with SAP IdM",
    ],
    value: "Reduce provisioning time from days to minutes and cut helpdesk tickets by up to 50%.",
  },
  {
    id: "self-service",
    title: "Self Service",
    duration: "1:58",
    summary:
      "Empower business users to request SAP access through a branded, policy-driven portal.",
    features: [
      "Guided access catalog",
      "Business-friendly language",
      "Risk-aware approvals",
      "Full audit trail",
    ],
    value: "Deflect 60%+ of L1 tickets while keeping approvers in control.",
  },
  {
    id: "sod",
    title: "Segregation of Duties",
    duration: "2:41",
    summary: "Detect and remediate SoD conflicts before they hit production, not after the audit.",
    features: [
      "Real-time SoD simulation",
      "Ruleset library (SAP + custom)",
      "Mitigating controls",
      "Executive dashboards",
    ],
    value: "Ship access changes with confidence and stay continuously audit-ready.",
  },
  {
    id: "license",
    title: "License Optimization",
    duration: "2:02",
    summary: "Right-size SAP licenses by matching actual usage to license type — automatically.",
    features: [
      "Usage classification",
      "License reclassification",
      "Cost forecasts",
      "SAP LAW integration",
    ],
    value: "Typical savings of 15–30% on annual SAP license spend.",
  },
  {
    id: "workflow",
    title: "Workflow",
    duration: "1:47",
    summary: "Configurable approval flows that mirror how your organization actually works.",
    features: ["No-code designer", "Parallel & conditional steps", "SLA tracking", "Escalations"],
    value: "Standardize governance across regions without slowing the business down.",
  },
  {
    id: "role-management",
    title: "Role Management",
    duration: "2:23",
    summary: "Design, review, and maintain SAP roles with built-in risk analysis.",
    features: ["Role designer", "Impact analysis", "Version control", "Bulk maintenance"],
    value: "Keep your role catalog clean, current, and compliant.",
  },
];

export const STORIES = [
  {
    id: "global-manufacturer",
    industry: "Manufacturing",
    company: "Global Industrial Group",
    metric: "62% ticket reduction",
    challenge:
      "20,000 SAP users across 14 plants, manual provisioning taking 4–6 days per request.",
    solution: "Deployed SecOps with HR-driven joiner/mover/leaver and self-service catalog.",
    results: "Provisioning reduced to under 12 minutes; L1 tickets dropped 62% in six months.",
  },
  {
    id: "pharma-compliance",
    industry: "Pharma",
    company: "Top-10 Pharmaceutical",
    metric: "100% audit ready",
    challenge:
      "FDA and SOX pressure with legacy SAP GRC unable to close SoD conflicts fast enough.",
    solution: "SecOps SoD simulation + mitigating controls integrated into every access request.",
    results: "Zero material audit findings for two consecutive years; 40% faster access requests.",
  },
  {
    id: "bank-license",
    industry: "Banking",
    company: "European Retail Bank",
    metric: "$3.2M saved",
    challenge: "Overspending on SAP Professional licenses across 8,000 users with unclear usage.",
    solution: "License optimization module identified reclassification candidates.",
    results: "$3.2M annual savings and full transparency ahead of SAP true-up.",
  },
  {
    id: "utility-audit",
    industry: "Utilities",
    company: "National Utility",
    metric: "Days → minutes",
    challenge: "Emergency access approvals taking 2–3 days, blocking incident response.",
    solution: "Firefighter workflow with policy-based approvals and session recording.",
    results: "Emergency access granted in under 3 minutes with full audit evidence.",
  },
];

export const AI_SUGGESTIONS = [
  { q: "What is the typical ROI timeline?", topic: "Business Value" },
  { q: "How does this fit our compliance and audit cycle?", topic: "Compliance" },
  { q: "What does implementation require from our team?", topic: "Implementation" },
  { q: "How is licensing priced?", topic: "Commercial" },
  { q: "Does SecOps support SAP ECC?", topic: "Compatibility" },
  { q: "Does SecOps support S/4HANA?", topic: "Compatibility" },
  { q: "Is there a cloud deployment option?", topic: "Deployment" },
  { q: "What does the architecture look like?", topic: "Architecture" },
  { q: "How do you handle migration from SAP GRC?", topic: "Migration" },
];

export const AI_ANSWERS: Record<string, string> = {
  "What is the typical ROI timeline?":
    "Most enterprises achieve full payback in 4 to 6 months. Savings are driven by immediate SAP license optimization (typically 15-30% spend reduction), 50%+ reduction in IT helpdesk ticket volume, and eliminating audit-prep manual fire drills.",
  "How does this fit our compliance and audit cycle?":
    "SecOps is built for continuous compliance. It replaces manual periodic fire drills with real-time Segregation of Duties (SoD) checking and auto-generates audit evidence on demand. It turns compliance into a frictionless background process.",
  "What does implementation require from our team?":
    "Very little. SecOps connects via secure, standard SAP RFCs without any ABAP custom code. It requires about 2-3 hours of an SAP Basis administrator's time for configuration, and a security analyst to review the out-of-the-box rulesets.",
  "Does SecOps support SAP ECC?":
    "Yes — SecOps supports SAP ECC 6.0 EhP7 and above via a certified RFC connector. Existing PFCG roles, user master data, and SUIM extracts continue to work without change.",
  "Does SecOps support S/4HANA?":
    "Yes. SecOps is certified for S/4HANA on-premise and RISE/GROW deployments, including Fiori catalog-based authorization and business role composition.",
  "Is there a cloud deployment option?":
    "SecOps runs on-premise, on your private cloud (AWS, Azure, GCP), or fully managed by ToggleNow. All deployment modes share the same feature set.",
  "How is licensing priced?":
    "Licensing is per named SAP user, tiered by module. Typical enterprises see 3–5x ROI in year one through license optimization alone.",
  "What does the architecture look like?":
    "A stateless application tier (Java + React) communicates with SAP via secure RFC. Data is stored in your database of choice (HANA, Postgres, Oracle). Zero footprint inside SAP.",
  "How do you handle migration from SAP GRC?":
    "We provide a GRC accelerator that imports rulesets, mitigating controls, and role definitions, cutting migration effort by 60%.",
};

export const ACHIEVEMENTS = {
  firstVideo: "First video watched",
  firstStory: "First customer story explored",
  firstAi: "First question asked",
  workshopReady: "Workshop ready",
};
