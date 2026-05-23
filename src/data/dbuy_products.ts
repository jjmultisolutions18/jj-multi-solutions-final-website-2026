import { StoreCategory } from '../types/store';

export interface DBUYProduct {
  product_id: string;
  product_name: string;
  category: StoreCategory;
  sub_category: string;
  supplier: 'DBUY';
  supplier_cost_zar: number;
  recommended_selling_price_zar: number;
  profit_zar: number;
  markup_percentage: number;
  description: string;
  key_features: string[];
  ideal_client: 'SMEs' | 'Designers' | 'Engineers' | 'Students' | 'Corporates' | 'IT Technicians' | 'Government / NGOs';
  license_type: 'Subscription' | 'Once-off' | 'License' | 'Digital Key';
  billing_cycle: 'Monthly' | 'Annual' | 'Once-off';
  tags: string[];
  recommended_badge: 'Best Value' | 'High Margin' | 'Popular' | 'Budget' | 'Premium';
  upsell_services: string[];
}

export const DBUY_PRODUCTS: DBUYProduct[] = [
  // 1. Productivity & Office Software
  {
    product_id: 'dbuy-m365-bus-basic',
    product_name: 'Microsoft 365 Business Basic',
    category: 'Productivity & Office Software',
    sub_category: 'Cloud Productivity',
    supplier: 'DBUY',
    supplier_cost_zar: 92.00,
    recommended_selling_price_zar: 149.00,
    profit_zar: 57.00,
    markup_percentage: 61.96,
    description: 'Fully featured professional business email, team messaging via Microsoft Teams, 1TB safe OneDrive cloud storage, and web-accessible Office software suites.',
    key_features: [
      'Business-class email with 50GB mailbox storage',
      'Core web-based apps including Word, Excel, and Outlook',
      'Full Microsoft Teams chat, meeting, and file collaboration',
      '1TB secure cloud storage per user via OneDrive',
      'Advanced spam and malware server-side protection modules'
    ],
    ideal_client: 'SMEs',
    license_type: 'Subscription',
    billing_cycle: 'Monthly',
    tags: ['microsoft', 'office', 'm365', 'email', 'teams', 'collaboration', 'cloud'],
    recommended_badge: 'Best Value',
    upsell_services: ['Exchange Mailbox Migration Service', 'Teams Room Setup Assistance', 'SLA Professional Tech Support']
  },
  {
    product_id: 'dbuy-m365-bus-std',
    product_name: 'Microsoft 365 Business Standard',
    category: 'Productivity & Office Software',
    sub_category: 'Cloud Productivity',
    supplier: 'DBUY',
    supplier_cost_zar: 215.00,
    recommended_selling_price_zar: 349.00,
    profit_zar: 134.00,
    markup_percentage: 62.33,
    description: 'Full corporate productivity bundle. Includes heavy-gauge premium desktop Office apps on all devices, custom domain email hosting, and standard collaborative tools.',
    key_features: [
      'Pre-installed Premium Office apps on up to 5 PCs/Macs per user',
      'Centralised business email hosting with personalized domains',
      'Teams webinars and custom attendee registration forms',
      '1TB superfast cloud storage with file system synchronization',
      'Integrated bookings system to automate customer appointments'
    ],
    ideal_client: 'SMEs',
    license_type: 'Subscription',
    billing_cycle: 'Monthly',
    tags: ['office', 'excel', 'word', 'powerpoint', 'outlook', 'm365', 'business'],
    recommended_badge: 'Popular',
    upsell_services: ['Office Client Deployment', 'Custom CRM Database Integration', 'End-User Productivity Training']
  },
  {
    product_id: 'dbuy-m365-bus-prem',
    product_name: 'Microsoft 365 Business Premium',
    category: 'Productivity & Office Software',
    sub_category: 'Secured Cloud Environment',
    supplier: 'DBUY',
    supplier_cost_zar: 380.00,
    recommended_selling_price_zar: 599.00,
    profit_zar: 219.00,
    markup_percentage: 57.63,
    description: 'The definitive executive choice. Merges premium desktop Office software with advanced, enterprise-grade cloud security controls and mobile device management.',
    key_features: [
      'Advanced threat protection against malware, phishing, and zero-day threats',
      'Comprehensive Mobile Device Management (MDM) via Microsoft Intune',
      'Azure Information Protection for absolute remote document classification',
      'Automated PC deployments and central administration panels',
      'Full premium desktop app versions of key productivity software'
    ],
    ideal_client: 'Corporates',
    license_type: 'Subscription',
    billing_cycle: 'Monthly',
    tags: ['m365', 'security', 'enterprise', 'intune', 'cloud-office', 'premium'],
    recommended_badge: 'Premium',
    upsell_services: ['Azure AD Mobile Policy Deployment', 'Security Endpoint Audit', '24/7 Corporate SLA Helpdesk Agreement']
  },

  // 2. Graphic Design & Creative Software
  {
    product_id: 'dbuy-adobe-cc-all',
    product_name: 'Adobe Creative Cloud All Apps',
    category: 'Graphic Design & Creative Software',
    sub_category: 'Digital Design Systems',
    supplier: 'DBUY',
    supplier_cost_zar: 950.00,
    recommended_selling_price_zar: 1699.00,
    profit_zar: 749.00,
    markup_percentage: 78.84,
    description: 'The master suite for creative professionals. Access over 20+ specialized desktop and mobile apps including Photoshop, Illustrator, Premiere Pro, and Acrobat Pro.',
    key_features: [
      'Absolute access to the entire portfolio of 20+ Adobe design apps',
      '100GB secure cloud storage per user license for cross-device assets',
      'Adobe Fonts integration with thousands of licensed premium fonts',
      'Generative AI credits powered by Adobe Firefly engine',
      'Collaborative shared libraries and review assets links'
    ],
    ideal_client: 'Designers',
    license_type: 'Subscription',
    billing_cycle: 'Monthly',
    tags: ['adobe', 'creative', 'photoshop', 'illustrator', 'design', 'vector', 'edit'],
    recommended_badge: 'Popular',
    upsell_services: ['Adobe Portal Setup & Provisioning', 'Creative Asset Migration', 'UI/UX Design Best Practices Training']
  },
  {
    product_id: 'dbuy-coreldraw-graphics',
    product_name: 'CorelDRAW Graphics Suite Enterprise',
    category: 'Graphic Design & Creative Software',
    sub_category: 'Vector Design Tools',
    supplier: 'DBUY',
    supplier_cost_zar: 3400.00,
    recommended_selling_price_zar: 5990.00,
    profit_zar: 2590.00,
    markup_percentage: 76.18,
    description: 'High performance vector illustration, layout, photo editing, and physical print layout design software preferred by printing shops in South Africa.',
    key_features: [
      'Interactive vector illustration, typography, and page layout engines',
      'Powerful Corel PHOTO-PAINT AI-accelerated pixel editing controls',
      'High contrast design layouts for signage, banner wraps, and engraving',
      'Cross-platform capabilities with fast desktop startup cycles',
      'Flexible file formats compatibility including PDF, EPS, and SVG'
    ],
    ideal_client: 'Designers',
    license_type: 'License',
    billing_cycle: 'Annual',
    tags: ['coreldraw', 'vector', 'branding', 'print-shop', 'signage', 'layout'],
    recommended_badge: 'High Margin',
    upsell_services: ['Print-shop Workflow Consulting', 'Vector Conversion Training', 'Color Profile Calibration License']
  },
  {
    product_id: 'dbuy-acdsee-photo-ultimate',
    product_name: 'ACDSee Photo Studio Ultimate',
    category: 'Graphic Design & Creative Software',
    sub_category: 'Photography Workflow',
    supplier: 'DBUY',
    supplier_cost_zar: 890.00,
    recommended_selling_price_zar: 1499.00,
    profit_zar: 609.00,
    markup_percentage: 68.43,
    description: 'A rapid, lightweight alternative for photo editing and asset storage tagging. Features non-destructive RAW editing and AI-powered face detection.',
    key_features: [
      'Digital asset manager with lightning-fast file indexing metadata systems',
      'Non-destructive RAW photo developer with support for 500+ camera models',
      'Parametric layers editing tools and skin tuning sliders',
      'High accuracy AI facial recognition and automatic grouping',
      'High performance GPU acceleration for rapid heavy image rendering'
    ],
    ideal_client: 'Designers',
    license_type: 'Once-off',
    billing_cycle: 'Once-off',
    tags: ['acdsee', 'photography', 'photo-developer', 'raw', 'asset-managers'],
    recommended_badge: 'Budget',
    upsell_services: ['Digital Photography Workshop Group Session', 'NAS Private Backup Pairing Config']
  },

  // 3. CAD & Engineering Design Software
  {
    product_id: 'dbuy-autocad-lt',
    product_name: 'Autodesk AutoCAD LT',
    category: 'CAD & Engineering Design Software',
    sub_category: '2D Drafting Systems',
    supplier: 'DBUY',
    supplier_cost_zar: 4500.00,
    recommended_selling_price_zar: 7900.00,
    profit_zar: 3400.00,
    markup_percentage: 75.56,
    description: 'The industry standard for 2D drafting, drawing creation, and architectural schemas with premium cloud connectivity.',
    key_features: [
      'Draft, design, and modify geometry with advanced 2D drafting precision',
      'Produce comprehensive tables, multi-leader notes, and dynamic blocks',
      'Deploy files using verified DWG comparison and drawing history logs',
      'Access web-based CAD layouts on any mobile hardware browser',
      'Premium technical integration support for enterprise standards'
    ],
    ideal_client: 'Engineers',
    license_type: 'Subscription',
    billing_cycle: 'Annual',
    tags: ['autocad', 'cad', '2d', 'drawing', 'drafting', 'blueprint', 'autodesk'],
    recommended_badge: 'Popular',
    upsell_services: ['CAD Workstation Optimization', 'Drawing Templates Setup Services', 'Fast CAD SLA Helpdesk Support']
  },
  {
    product_id: 'dbuy-autodesk-fusion360',
    product_name: 'Autodesk Fusion 360 with PowerMill',
    category: 'CAD & Engineering Design Software',
    sub_category: '3D CAD/CAM Ecosystem',
    supplier: 'DBUY',
    supplier_cost_zar: 6800.00,
    recommended_selling_price_zar: 11990.00,
    profit_zar: 5190.00,
    markup_percentage: 76.32,
    description: 'Full cloud 3D CAD, CAM, CAE, and PCB toolsuite. Seamlessly bridges standard industrial manufacturing design with 3D print prototyping.',
    key_features: [
      'Unified design workspace supporting parametric sheet-metal solid models',
      'Advanced CAM tools including 3-axis and multi-axis CNC path generation',
      'Thermal structural stress simulation capabilities inside the cloud engine',
      'Direct STL / OBJ exports optimized for Maker laboratory SLA 3D printers',
      'Collaborative engineering design pipeline with active revision histories'
    ],
    ideal_client: 'Engineers',
    license_type: 'Subscription',
    billing_cycle: 'Annual',
    tags: ['fusion360', '3d-cad', 'cam', 'cnc', '3d-printing', 'prototyping'],
    recommended_badge: 'Premium',
    upsell_services: ['3D Print Parametric Setup', 'Reverse Engineering Services', 'Maker Workspace Operator Training']
  },
  {
    product_id: 'dbuy-sketchup-pro',
    product_name: 'Trimble SketchUp Pro',
    category: 'CAD & Engineering Design Software',
    sub_category: '3D Visualisation Modelling',
    supplier: 'DBUY',
    supplier_cost_zar: 3100.00,
    recommended_selling_price_zar: 5490.00,
    profit_zar: 2390.00,
    markup_percentage: 77.10,
    description: 'An exceptionally accessible 3D modeling environment. Outstanding choice for rapid building volume concepts, structural models, and site surveys.',
    key_features: [
      'Simple, organic push-pull 3D modeling controls which compile rapid mockups',
      'Access to Trimble 3D Warehouse holding millions of shared models',
      'Layout engine facilitating multi-page presentation blueprints from 3D models',
      'Integrated geographic site planning and shadow analysis tools',
      'Robust plugin marketplace to customize advanced photorealistic renders'
    ],
    ideal_client: 'Designers',
    license_type: 'Subscription',
    billing_cycle: 'Annual',
    tags: ['sketchup', '3d-model', 'architecture', 'concepts', 'surveys', 'render'],
    recommended_badge: 'Best Value',
    upsell_services: ['V-Ray Render Plugin Installation', 'Model Libraries Asset Import', 'On-Site Office Layout Training']
  },

  // 4. Cybersecurity & Antivirus
  {
    product_id: 'dbuy-kaspersky-endpoint',
    product_name: 'Kaspersky Endpoint Security for Business',
    category: 'Cybersecurity & Antivirus',
    sub_category: 'Endpoint Security',
    supplier: 'DBUY',
    supplier_cost_zar: 45.00,
    recommended_selling_price_zar: 99.00,
    profit_zar: 54.00,
    markup_percentage: 120.00,
    description: 'Total multi-layered shield preventing viruses, ransomware, system intrusions, and malware exploits. Governed via a single remote cloud management console.',
    key_features: [
      'Real-time proactive anti-malware and behaviors anomaly shield',
      'Centralized admin dashboard to deploy updates to multiple devices',
      'Automated local firewall configuration and system vulnerability scans',
      'Web control policies blocking unsafe content and credential phishing',
      'Minimal CPU usage signature preserving business machine performance'
    ],
    ideal_client: 'SMEs',
    license_type: 'Subscription',
    billing_cycle: 'Monthly',
    tags: ['kaspersky', 'antivirus', 'security', 'ransomware-shield', 'admin-console', 'endpoint'],
    recommended_badge: 'High Margin',
    upsell_services: ['Security Client Remote Installation', 'Monthly Security Health Check', 'Incident Remediation SLA SLA']
  },
  {
    product_id: 'dbuy-bitdefender-gravityzone',
    product_name: 'Bitdefender GravityZone Business Security',
    category: 'Cybersecurity & Antivirus',
    sub_category: 'Enterprise Protection Suite',
    supplier: 'DBUY',
    supplier_cost_zar: 55.00,
    recommended_selling_price_zar: 119.00,
    profit_zar: 64.00,
    markup_percentage: 116.36,
    description: 'Next-generation machine-learning-driven endpoint protection. Stops advanced malware attacks, exploits, and rootkits before they execute in memory.',
    key_features: [
      'Self-learning artificial intelligence models scanning execution registers',
      'Integrated network sandboxing environment to analyze unknown files',
      'Integrated ransomware backup freeze with automatic local rollbacks',
      'Detailed reports for POPIA security compliance audits',
      'Universal licensing for Windows, macOS, and Linux physical machines'
    ],
    ideal_client: 'SMEs',
    license_type: 'Subscription',
    billing_cycle: 'Monthly',
    tags: ['bitdefender', 'antivirus', 'gravityzone', 'ml-security', 'popia'],
    recommended_badge: 'Best Value',
    upsell_services: ['POPIA Data Compliance Configuration', 'Team Password Manager Deployment']
  },
  {
    product_id: 'dbuy-eset-protect-entry',
    product_name: 'ESET PROTECT Entry (Cloud-Managed)',
    category: 'Cybersecurity & Antivirus',
    sub_category: 'Cloud Threat Intelligence',
    supplier: 'DBUY',
    supplier_cost_zar: 42.00,
    recommended_selling_price_zar: 89.00,
    profit_zar: 47.00,
    markup_percentage: 111.90,
    description: 'Super-lightweight endpoint protection with excellent, low system resource footprint and central cloud security administration.',
    key_features: [
      'Legendary fast file scan speed saving user business laptop batterylife',
      'Cloud sandboxing protecting emails against suspicious attachments',
      'Advanced device controls restricting raw USB mass storage drives access',
      'Comprehensive, rapid central administration platform',
      'Includes ESET File Security for protecting server endpoints and local directories'
    ],
    ideal_client: 'Students',
    license_type: 'Subscription',
    billing_cycle: 'Monthly',
    tags: ['eset', 'antivirus', 'endpoint', 'lightweight', 'usb-control', 'security'],
    recommended_badge: 'Budget',
    upsell_services: ['Enterprise Security Policy Draft', 'Client USB Access Policy Implementation']
  },

  // 5. PDF & Document Management
  {
    product_id: 'dbuy-adobe-acrobat-pro',
    product_name: 'Adobe Acrobat Pro DC Cloud',
    category: 'PDF & Document Management',
    sub_category: 'Document Lifecycle Management',
    supplier: 'DBUY',
    supplier_cost_zar: 210.00,
    recommended_selling_price_zar: 349.00,
    profit_zar: 139.00,
    markup_percentage: 66.19,
    description: 'The global standard for creating, editing, security signing, and conversion of high-quality digital PDF documents and templates.',
    key_features: [
      'Full edit capabilities of text and layouts inside any PDF document',
      'Convert PDFs to Microsoft Office formats (Word, Excel) with exact styling retention',
      'Legally binding digital signature requests with full audit trail tracking via Adobe Sign',
      'Advanced password locking, data redaction, and metadata cleaning structures',
      'Shared cloud storage integration to collect reader feedback and comments dynamically'
    ],
    ideal_client: 'SMEs',
    license_type: 'Subscription',
    billing_cycle: 'Monthly',
    tags: ['adobe', 'acrobat', 'pdf-editor', 'digital-signature', 'redaction', 'conversion'],
    recommended_badge: 'Popular',
    upsell_services: ['Corporate PDF Invoice Template Design', 'Secure Signature Workflow Automation', 'SLA PDF Helpdesk Help']
  },
  {
    product_id: 'dbuy-nuance-powerpdf',
    product_name: 'Nuance Power PDF Advanced',
    category: 'PDF & Document Management',
    sub_category: 'Secure Document Toolkits',
    supplier: 'DBUY',
    supplier_cost_zar: 1450.00,
    recommended_selling_price_zar: 2490.00,
    profit_zar: 1040.00,
    markup_percentage: 71.72,
    description: 'An exceptional once-off perpetual license alternative to Acrobat Pro. Delivers heavy-duty PDF operations for legal, medical, and public organizations.',
    key_features: [
      'Once-off perpetual billing cycle bypassing monthly fees',
      'Outstanding optical character recognition (OCR) converting paper scans into editable text',
      'Comprehensive automated redaction tool targeting POPIA protected fields',
      'Easy document comparison marking changes side-by-side automatically',
      'Seamless direct integrations with cloud folders like OneDrive or Dropbox Enterprise'
    ],
    ideal_client: 'Government / NGOs',
    license_type: 'Once-off',
    billing_cycle: 'Once-off',
    tags: ['powerpdf', 'pdf-editor', 'ocr', 'perpetual-license', 'popia-redact'],
    recommended_badge: 'High Margin',
    upsell_services: ['Paper Archive Scanning Solutions Plan', 'POPIA Workflow Compliance Consulting']
  },

  // 6. Operating Systems & Server Software
  {
    product_id: 'dbuy-windows11-pro',
    product_name: 'Windows 11 Professional Pro Key',
    category: 'Operating Systems & Server Software',
    sub_category: 'Workstation OS',
    supplier: 'DBUY',
    supplier_cost_zar: 450.00,
    recommended_selling_price_zar: 990.00,
    profit_zar: 540.00,
    markup_percentage: 120.00,
    description: 'Authentic Microsoft operating system digital key for modern workstations. Standard features include BitLocker encryption and secure remote access setup.',
    key_features: [
      'Advanced hardware safety with BitLocker full-drive file encryption',
      'Integrated secure Remote Desktop connection hosting for homeworkers',
      'Advanced Windows Information Protection defending company apps',
      'Seamless setups with Azure Active Directory / local corporate domains',
      'Optimized snap-layout windows for extreme multi-tasking setups'
    ],
    ideal_client: 'IT Technicians',
    license_type: 'Digital Key',
    billing_cycle: 'Once-off',
    tags: ['windows11', 'windows-key', 'microsoft-os', 'license', 'bitlocker'],
    recommended_badge: 'High Margin',
    upsell_services: ['Workstation OS Safe Clean Install', 'BitLocker Key Backup Archiving', 'Domain Enrollment Setup']
  },
  {
    product_id: 'dbuy-win-server-std',
    product_name: 'Windows Server 2022 Standard (16-Core)',
    category: 'Operating Systems & Server Software',
    sub_category: 'Datacenter Server OS',
    supplier: 'DBUY',
    supplier_cost_zar: 6200.00,
    recommended_selling_price_zar: 9900.00,
    profit_zar: 3700.00,
    markup_percentage: 59.68,
    description: 'Modern hybrid datacenter server operating system enabling extreme file shares, domain authentication, with advanced multi-layer host security security.',
    key_features: [
      'Secure-core server protection with dynamic hardware-root trust modules',
      'High accuracy system management via Windows Admin Center browser tools',
      'Integrated nested virtualization features and container workflows',
      'Optimized file storage tiering for high speed NVMe setups',
      'Full core architecture mapping up to 16-Core server processors'
    ],
    ideal_client: 'IT Technicians',
    license_type: 'License',
    billing_cycle: 'Once-off',
    tags: ['windows-server', 'server-2022', 'microsoft-license', 'file-share', 'active-directory'],
    recommended_badge: 'Premium',
    upsell_services: ['Server Assembly & Installation', 'Active Directory Schema Config', 'Failover Cloud Storage Backup SLA']
  },
  {
    product_id: 'dbuy-sql-server-std',
    product_name: 'Microsoft SQL Server 2022 Standard',
    category: 'Operating Systems & Server Software',
    sub_category: 'Database Engines',
    supplier: 'DBUY',
    supplier_cost_zar: 14500.00,
    recommended_selling_price_zar: 21900.00,
    profit_zar: 7400.00,
    markup_percentage: 51.03,
    description: 'Robust database systems engine delivering premium structured database workloads, analytics platforms, and support for ERP/Accounting systems.',
    key_features: [
      'High performance SQL processing engine for high workload concurrency',
      'Advanced security with Ledger, verifying change data records compliance via cryptographic proof',
      'Accelerated database recovery systems reducing fail times to instances',
      'Outstanding analytics integrations matching Microsoft PowerBI suites',
      'Requires standard Windows server environments'
    ],
    ideal_client: 'Corporates',
    license_type: 'License',
    billing_cycle: 'Once-off',
    tags: ['sql-server', 'database-engine', 'microsoft-sql', 'ledger-security', 'enterprise'],
    recommended_badge: 'Premium',
    upsell_services: ['SQL Cluster High-Availability Setup', 'Performance Execution Index Tuning', 'Weekly Schema Integrity Monitoring']
  },

  // 7. Business & Accounting Software
  {
    product_id: 'dbuy-sage-50cloud-pastel',
    product_name: 'Sage 50cloud Pastel Xpress',
    category: 'Business & Accounting Software',
    sub_category: 'SME Accounting Suites',
    supplier: 'DBUY',
    supplier_cost_zar: 3500.00,
    recommended_selling_price_zar: 5490.00,
    profit_zar: 1990.00,
    markup_percentage: 56.86,
    description: 'The preferred desktop finance software package in South Africa. Streamlines tax invoicing, VAT tracking, bank feeds, with full SARS compliance modules.',
    key_features: [
      'Comprehensive customer receipts processing and automated supplier payments tracking',
      'Fully compliant South African SARS VAT calculation templates',
      'Integrated automated bank feeds securely categorizing commercial statements',
      'Multi-user networking environments support out of the box',
      'Interactive customer age analysis reports aiding balance collections'
    ],
    ideal_client: 'SMEs',
    license_type: 'Subscription',
    billing_cycle: 'Annual',
    tags: ['sage', 'pastel-accounting', 'vat-sars', 'tax-invoicing', 'sme-finance'],
    recommended_badge: 'Popular',
    upsell_services: ['Pastel Multi-User Server Installation', 'VAT E-Filing Setup Consulting', 'Chartered Accountant Integration']
  },
  {
    product_id: 'dbuy-zoho-crm-ent',
    product_name: 'Zoho CRM Enterprise Cloud',
    category: 'Business & Accounting Software',
    sub_category: 'Customer Relationship Systems',
    supplier: 'DBUY',
    supplier_cost_zar: 420.00,
    recommended_selling_price_zar: 699.00,
    profit_zar: 279.00,
    markup_percentage: 66.43,
    description: 'Full-featured Customer Relationship Management (CRM) platform to automate lead captures, tracking sales pipelines, and customer histories.',
    key_features: [
      'Advanced lead profiling with AI sales path automated builders',
      'Central workflow automation triggers executing instant emails',
      'Full visual sales pipelines tracking deals across stages',
      'Includes Zia, the built-in AI sales assistant prediction engine',
      'Custom roles and page layouts tailored to remote teams'
    ],
    ideal_client: 'SMEs',
    license_type: 'Subscription',
    billing_cycle: 'Monthly',
    tags: ['zoho', 'crm', 'sales-pipeline', 'lead-capture', 'automation-cloud'],
    recommended_badge: 'Best Value',
    upsell_services: ['Sales Funnel Setup & Configuration', 'Mailchimp / WhatsApp API Gateway Integrations', 'Weekly Leads Flow Review']
  },

  // 8. Cloud & Hosting Services
  {
    product_id: 'dbuy-linux-shared-hosting',
    product_name: 'Professional Linux Shared Hosting Pro',
    category: 'Cloud & Hosting Services',
    sub_category: 'Web Hosting Services',
    supplier: 'DBUY',
    supplier_cost_zar: 49.00,
    recommended_selling_price_zar: 99.00,
    profit_zar: 50.00,
    markup_percentage: 102.04,
    description: 'Fast, secure, and budget-friendly NVMe SSD shared hosting tailored for South African starting SMMEs. Includes free cPanel setup and automated systems tools.',
    key_features: [
      '15GB superfast NVMe SSD storage space layout',
      'Unlimited professional email accounts hosted on custom domains',
      'Free Let\'s Encrypt SSL certificate applied automatically',
      'One-click installer for WordPress, Wix API, and CRM modules',
      'Direct, fast database processing optimized for South African latency'
    ],
    ideal_client: 'SMEs',
    license_type: 'Subscription',
    billing_cycle: 'Monthly',
    tags: ['hosting', 'linux-web', 'ssl-free', 'wordpress-pro', 'cpanel-access'],
    recommended_badge: 'High Margin',
    upsell_services: ['WordPress Complete Website Build', 'Domain Registry Migration Support', 'Weekly Core Security Patch Maintenance']
  },
  {
    product_id: 'dbuy-acronis-cyber-protect',
    product_name: 'Acronis Cyber Protect Cloud Storage',
    category: 'Cloud & Hosting Services',
    sub_category: 'Secured Remote Backup',
    supplier: 'DBUY',
    supplier_cost_zar: 190.00,
    recommended_selling_price_zar: 349.00,
    profit_zar: 159.00,
    markup_percentage: 83.68,
    description: 'Fully automated, bare-metal offsite cloud replication vault. Protects essential systems state, file servers, SQL engines, and registers against ransomware.',
    key_features: [
      'Fully automated scheduled execution plans syncing data offsite',
      'AES-256 military-grade file system encryption with custom key management',
      'Active cyber threat protection isolating server threats in real-time',
      'Multi-platform backups including physical workstations and server VMs',
      'Zero bandwidth penalties with advanced storage compression compression'
    ],
    ideal_client: 'IT Technicians',
    license_type: 'Subscription',
    billing_cycle: 'Monthly',
    tags: ['acronis', 'cloud-backup', 'disaster-recovery', 'encryption-saas', 'server-backup'],
    recommended_badge: 'Best Value',
    upsell_services: ['Bare-Metal Disaster Recovery Plan', 'Scheduled Monthly Trial Boot Run', 'Active Cloud Storage Auditing']
  },

  // 9. Connectivity & Communication Tools
  {
    product_id: 'dbuy-3cx-ippbx-pro',
    product_name: '3CX Phone System Professional IP PBX',
    category: 'Connectivity & Communication Tools',
    sub_category: 'Digital PBX Systems',
    supplier: 'DBUY',
    supplier_cost_zar: 2100.00,
    recommended_selling_price_zar: 3900.00,
    profit_zar: 1800.00,
    markup_percentage: 85.71,
    description: 'Turnkey software IP PBX phone systems. Features unified messaging, video conferencing, softphones for iOS/Android, with complete SIP trunk compatibility.',
    key_features: [
      'Unified cloud digital switchboard routing desktop and mobile connections',
      'Full iOS, Android, and Web browsers software telephone clients',
      'Complete, easy integrations with South African VOIP providers (MTN, Telkom, Vodacom)',
      'Built-in call queues, call recording, and auto-attendant menus',
      'Seamless multi-user extension deployments over WAN web connections'
    ],
    ideal_client: 'SMEs',
    license_type: 'Subscription',
    billing_cycle: 'Annual',
    tags: ['3cx', 'pbx-phone', 'voip', 'telephony', 'video-conference', 'call-queue'],
    recommended_badge: 'High Margin',
    upsell_services: ['Sip Trunk VoIP Provider Account Config', 'IP Desk Phone Hardware Setup', 'Weekly Extensions Routing Management']
  },
  {
    product_id: 'dbuy-zoom-wp-pro',
    product_name: 'Zoom Workplace Pro License Plan',
    category: 'Connectivity & Communication Tools',
    sub_category: 'Online Video Conferencing',
    supplier: 'DBUY',
    supplier_cost_zar: 190.00,
    recommended_selling_price_zar: 299.00,
    profit_zar: 109.00,
    markup_percentage: 57.37,
    description: 'The premier cloud meeting experience. Allows meetings up to 30 hours, holds up to 100 participants per call, with advanced whiteboarding features.',
    key_features: [
      'Group video calling up to 30 consecutive hours per conference run',
      'Integrated active cloud meeting recording with automatic audio transcribing',
      'Interactive team whiteboarding and co-annotation markers',
      'Dynamic dashboard monitoring meeting quality stats across offices',
      'Full, secure user permissions locking meetings against intrusions'
    ],
    ideal_client: 'SMEs',
    license_type: 'Subscription',
    billing_cycle: 'Monthly',
    tags: ['zoom', 'video-meetings', 'webinar', 'collaboration-tool', 'transcripts'],
    recommended_badge: 'Popular',
    upsell_services: ['Conference Room Dual Display Integration', 'Broadband Connection Speed Optimization']
  }
];

export interface GroupedDBUYCatalog {
  [categoryName: string]: DBUYProduct[];
}

export function getGroupedCatalog(): GroupedDBUYCatalog {
  const groups: GroupedDBUYCatalog = {};
  DBUY_PRODUCTS.forEach((prod) => {
    if (!groups[prod.category]) {
      groups[prod.category] = [];
    }
    groups[prod.category].push(prod);
  });
  return groups;
}
