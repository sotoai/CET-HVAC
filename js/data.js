// CET — Placeholder Data
// All data structures for the demo UI

// ── Role Definitions ──
const ROLES = {
  student: { label: 'Student', icon: 'graduation-cap', defaultView: 'dashboard' },
  teacher: { label: 'Instructor', icon: 'book-open', defaultView: 'teacher-dashboard' },
  admin:   { label: 'Administrator', icon: 'shield', defaultView: 'admin-dashboard' }
};

const ROLE_VIEWS = {
  student: ['dashboard', 'chat', 'phases', 'analytics', 'notifications'],
  teacher: ['teacher-dashboard', 'roster', 'tasks', 'messages'],
  admin:   ['admin-dashboard', 'admin-students', 'faculty', 'program-analytics', 'enrollment']
};

// ── Demo Users ──
const DEMO_USERS = {
  student: {
    firstName: 'Jorge',
    lastName: 'Arellano',
    email: 'jorge.arellano@cet.edu',
    avatarInitials: 'JA',
    role: 'student'
  },
  teacher: {
    firstName: 'Maria',
    lastName: 'Santos',
    email: 'maria.santos@cet.edu',
    avatarInitials: 'MS',
    role: 'teacher'
  },
  admin: {
    firstName: 'David',
    lastName: 'Chen',
    email: 'david.chen@cet.edu',
    avatarInitials: 'DC',
    role: 'admin'
  }
};

let CURRENT_USER = null;

// ── Student Data ──
const STUDENT = {
  name: 'Jorge',
  firstName: 'Jorge',
  lastName: 'Arellano',
  email: 'jorge.arellano@cet.edu',
  enrollmentDate: '2025-08-18',
  avatarInitials: 'JA',
  currentPhase: 6,
  overallProgress: 46,
  lmsId: 'STU-2025-0847',
  lmsStatus: 'synced',
  lastSync: '2 min ago'
};

// Pre-enrollment steps (all completed for this student)
const ONBOARDING = [
  { id: 'outreach', name: 'Outreach & Recruitment', icon: 'megaphone', completedDate: '2025-06-10', status: 'completed' },
  { id: 'admissions', name: 'Admissions', icon: 'clipboard-check', completedDate: '2025-06-28', status: 'completed' },
  { id: 'tour', name: 'Tour & Orientation', icon: 'map-pin', completedDate: '2025-07-12', status: 'completed' },
  { id: 'enrollment', name: 'Enrollment Process', icon: 'file-text', completedDate: '2025-07-20', status: 'completed' },
  { id: 'financial', name: 'Financial Aid', icon: 'wallet', completedDate: '2025-08-01', status: 'completed' }
];

const PHASES = [
  {
    id: 1,
    name: 'HVAC Safety & Tools',
    subtitle: 'Orientation, safety protocols, hand tools, power tools',
    status: 'completed',
    completedDate: '2025-09-15',
    progress: 100,
    modules: 8,
    modulesCompleted: 8,
    icon: 'shield-check',
    color: '#22c55e',
    competencies: [
      'Program orientation & HVAC industry overview',
      'OSHA safety standards & PPE protocols',
      'Hand tool identification, use, and maintenance',
      'Power tool operation and safety procedures'
    ],
    caStandard: 'CA HVAC Standards §1.1–1.4',
    description: 'Build your foundation in HVAC safety, tools, and workplace readiness. This competency ensures you can operate safely and handle the essential tools of the trade.'
  },
  {
    id: 2,
    name: 'Trade Math',
    subtitle: 'Basic math review, HVAC-specific math operations',
    status: 'completed',
    completedDate: '2025-10-08',
    progress: 100,
    modules: 6,
    modulesCompleted: 6,
    icon: 'calculator',
    color: '#f59e0b',
    competencies: [
      'Basic math review — fractions, decimals, percentages',
      'Unit conversions (BTU, CFM, PSI, tons)',
      'HVAC math operations — heat load, airflow, pressure',
      'Applied calculations for system sizing and performance'
    ],
    caStandard: 'CA HVAC Standards §2.1–2.3',
    description: 'Master the math that drives every HVAC calculation. From basic conversions to applied system sizing, these skills underpin your technical work.'
  },
  {
    id: 3,
    name: 'Electricity',
    subtitle: 'Electrical theory, circuits, components, lab activities',
    status: 'completed',
    completedDate: '2025-11-22',
    progress: 100,
    modules: 10,
    modulesCompleted: 10,
    icon: 'zap',
    color: '#eab308',
    competencies: [
      'Electrical theory — voltage, current, resistance, Ohm\'s Law',
      'AC/DC circuits, series & parallel configurations',
      'Electrical components — capacitors, relays, contactors, transformers',
      'Multimeter use and electrical diagnostic techniques',
      'Hands-on lab activities and wiring exercises'
    ],
    caStandard: 'CA HVAC Standards §3.1–3.5',
    description: 'Master the electrical backbone of HVAC systems. From circuit theory to hands-on wiring, this competency gives you the skills to safely work with electrical components in every unit.'
  },
  {
    id: 4,
    name: 'AC Fundamentals',
    subtitle: 'Heat transfer, refrigeration, compressors, AC systems, EPA 608 certification',
    status: 'completed',
    completedDate: '2026-01-10',
    progress: 100,
    modules: 14,
    modulesCompleted: 14,
    icon: 'snowflake',
    color: '#3b82f6',
    competencies: [
      'Heat transfer principles — conduction, convection, radiation',
      'Refrigeration cycle — compression, condensation, expansion, evaporation',
      'Temperature-pressure relationships and P-T charts',
      'Compressor types, operation, and troubleshooting',
      'AC system installation and troubleshooting procedures',
      'Refrigerant handling, recovery, and reclamation',
      'EPA 608 Universal Certification preparation and exam'
    ],
    caStandard: 'CA HVAC Standards §4.1–4.7, EPA Section 608',
    description: 'Dive deep into the heart of air conditioning — from heat transfer fundamentals to full system installation. Culminates in your EPA 608 Universal Certification.'
  },
  {
    id: 5,
    name: 'Heating Equipment',
    subtitle: 'Heating fundamentals, furnaces, gas heating, chimney/vents/flues, installation & repair',
    status: 'completed',
    completedDate: '2026-02-08',
    progress: 100,
    modules: 10,
    modulesCompleted: 10,
    icon: 'flame',
    color: '#ef4444',
    competencies: [
      'Heating fundamentals — combustion, heat exchangers, efficiency ratings',
      'Furnace types, components, and sequence of operation',
      'Gas heating systems — natural gas and LP operation',
      'Chimney, vent, and flue systems — sizing and safety',
      'Installation, repair, and troubleshooting procedures'
    ],
    caStandard: 'CA HVAC Standards §5.1–5.5',
    description: 'Master heating systems from combustion theory to real-world furnace service. Learn to install, diagnose, and repair gas heating equipment safely and to California code.'
  },
  {
    id: 6,
    name: 'Heat Pumps',
    subtitle: 'Systems & components, electric resistance heating, installation & troubleshooting',
    status: 'active',
    completedDate: null,
    progress: 55,
    modules: 8,
    modulesCompleted: 4,
    icon: 'refresh-cw',
    color: '#00d4ff',
    competencies: [
      'Heat pump systems — types, components, and operation',
      'Reversing valve operation and diagnostic procedures',
      'Electric resistance and heating element systems',
      'Heat pump installation and commissioning',
      'Troubleshooting heat pump failures and defrost cycles'
    ],
    caStandard: 'CA HVAC Standards §6.1–6.5',
    description: 'Apply your refrigeration knowledge to heat pump systems. Understand reversing valves, defrost cycles, and electric heating — the fastest-growing technology in California HVAC.'
  },
  {
    id: 7,
    name: 'Brazing & Soldering',
    subtitle: 'Iron & steel pipe/fittings, soldering & brazing piping systems',
    status: 'locked',
    completedDate: null,
    progress: 0,
    modules: 6,
    modulesCompleted: 0,
    icon: 'wrench',
    color: '#f97316',
    competencies: [
      'Types of iron and steel pipe and fittings',
      'Soldering techniques — soft solder joints and flux',
      'Brazing techniques — silver brazing and nitrogen purge',
      'Piping system assembly and pressure testing'
    ],
    caStandard: 'CA HVAC Standards §7.1–7.4',
    description: 'Develop essential fabrication skills. Learn proper soldering and brazing techniques used in refrigerant piping, ensuring leak-free joints that last.'
  },
  {
    id: 8,
    name: 'Air Distribution',
    subtitle: 'Airflow measurement, duct work installation, installation methods',
    status: 'locked',
    completedDate: null,
    progress: 0,
    modules: 8,
    modulesCompleted: 0,
    icon: 'wind',
    color: '#06b6d4',
    competencies: [
      'Airflow measurement — anemometers, manometers, CFM calculations',
      'Duct types, materials, and sizing methods',
      'Ductwork installation techniques and best practices',
      'Air balancing and system commissioning'
    ],
    caStandard: 'CA HVAC Standards §8.1–8.4',
    description: 'Master the delivery side of HVAC. Learn to measure, design, and install ductwork systems that deliver proper airflow to every space.'
  },
  {
    id: 9,
    name: 'Green Technology',
    subtitle: 'Green concepts, ESCO\'s green awareness certification, energy efficiency',
    status: 'locked',
    completedDate: null,
    progress: 0,
    modules: 6,
    modulesCompleted: 0,
    icon: 'leaf',
    color: '#10b981',
    competencies: [
      'Green building concepts and sustainability in HVAC',
      'Energy efficiency ratings — SEER, EER, AFUE, HSPF',
      'California Title 24 energy standards overview',
      'ESCO\'s Green Awareness Certification preparation'
    ],
    caStandard: 'CA HVAC Standards §9.1–9.4, Title 24 Part 6',
    description: 'California leads the nation in energy standards. Learn green building concepts, energy efficiency best practices, and prepare for your Green Awareness Certification.'
  },
  {
    id: 10,
    name: 'Basic Computer Skills',
    subtitle: 'Operating systems, productivity software, internet, AI tools',
    status: 'locked',
    completedDate: null,
    progress: 0,
    modules: 6,
    modulesCompleted: 0,
    icon: 'monitor',
    color: '#8b5cf6',
    competencies: [
      'Operating systems and file management',
      'Word processing, spreadsheets, and email',
      'Internet navigation and online resources',
      'AI tools and technology in the HVAC industry'
    ],
    caStandard: 'CA HVAC Standards §10.1–10.4',
    description: 'Build digital literacy for the modern HVAC workplace. From documentation to AI-powered diagnostics, technology skills give you a competitive edge.'
  },
  {
    id: 11,
    name: 'Customer Service',
    subtitle: 'Role & importance, personal skills, effective strategies',
    status: 'locked',
    completedDate: null,
    progress: 0,
    modules: 4,
    modulesCompleted: 0,
    icon: 'users',
    color: '#ec4899',
    competencies: [
      'Role and importance of customer service in HVAC',
      'Personal skills — communication, professionalism, empathy',
      'Effective customer interaction strategies',
      'Handling complaints and building client relationships'
    ],
    caStandard: 'CA HVAC Standards §11.1–11.4',
    description: 'Technical skills get you hired — customer service skills build your career. Learn to communicate professionally and create exceptional client experiences.'
  },
  {
    id: 12,
    name: 'Job Preparedness',
    subtitle: 'Skills assessment, job search, resumes, interviews, follow-up',
    status: 'locked',
    completedDate: null,
    progress: 0,
    modules: 6,
    modulesCompleted: 0,
    icon: 'briefcase',
    color: '#f43f5e',
    competencies: [
      'Skills assessment and career readiness evaluation',
      'Job search documents — resume, cover letter, portfolio',
      'Job search strategies and networking',
      'Mock interviews and professional presentation',
      'Follow-up techniques and career launch planning'
    ],
    caStandard: 'CA HVAC Standards §12.1–12.5',
    description: 'The final competency. Prepare your professional toolkit — resume, interview skills, and job search strategy — and launch your HVAC career with confidence.'
  }
];

const QUICK_STATS = [
  { label: 'Completion', value: '46%', icon: 'target', trend: '+4% this week' },
  { label: 'Skills Mastered', value: '42', icon: 'award', trend: '3 new this week' },
  { label: 'Day Streak', value: '12', icon: 'flame', trend: 'Personal best!' },
  { label: 'Hours Logged', value: '214', icon: 'clock', trend: '+9.5 this week' }
];

const RECENT_ACTIVITY = [
  { type: 'module', title: 'Completed: Heat Pump Reversing Valves', detail: 'Comp. 6 — Heat Pumps', time: '2 hours ago', icon: 'check-circle' },
  { type: 'quiz', title: 'Quiz Score: 94%', detail: 'Defrost Cycle Diagnostics', time: '5 hours ago', icon: 'file-check' },
  { type: 'chat', title: 'AI Session: Reversing Valve Troubleshooting', detail: '23 min session — 12 questions answered', time: 'Yesterday', icon: 'message-square' },
  { type: 'module', title: 'Completed: Electric Resistance Heating', detail: 'Comp. 6 — Heat Pumps', time: 'Yesterday', icon: 'check-circle' },
  { type: 'achievement', title: 'Achievement Unlocked: EPA 608 Certified', detail: 'Passed EPA 608 Universal Certification exam', time: '3 days ago', icon: 'trophy' }
];

const DASHBOARD_RESOURCES = [
  {
    type: 'video', title: 'Heat Pump Operation', subtitle: 'Reversing valve animation & system overview',
    duration: '12:34', phase: 'Comp. 6',
    gradient: 'linear-gradient(135deg, #0c2d48 0%, #145374 50%, #00d4ff 100%)', icon: 'play'
  },
  {
    type: 'lab', title: 'Virtual Defrost Lab', subtitle: 'Interactive heat pump defrost cycle simulator',
    badge: 'Interactive', phase: 'Comp. 6',
    gradient: 'linear-gradient(135deg, #1a0a2e 0%, #2d1b69 50%, #7c3aed 100%)', icon: 'box'
  },
  {
    type: 'video', title: 'Service Call Walkthrough', subtitle: 'Real-world heat pump troubleshooting scenario',
    duration: '18:07', phase: 'Comp. 6',
    gradient: 'linear-gradient(135deg, #1a2a0a 0%, #2d4a1b 50%, #22c55e 100%)', icon: 'play'
  }
];

const CHAT_MESSAGES = [
  { role: 'system', content: 'Session linked to Competency 6: Heat Pumps', time: null },
  {
    role: 'user',
    content: 'Can you explain how a heat pump reversing valve works? I understand the basic refrigeration cycle but I\'m confused about how the valve switches between heating and cooling modes.',
    time: '2:14 PM'
  },
  {
    role: 'assistant',
    content: `Great question, Jorge. The reversing valve — also called a four-way valve — is what makes a heat pump different from a standard AC unit. Let me break it down.

**In cooling mode**, refrigerant flows the same way as a regular AC:
- Compressor → Outdoor coil (condenser) → Metering device → Indoor coil (evaporator)

**In heating mode**, the reversing valve redirects the flow:
- Compressor → Indoor coil (now the condenser) → Metering device → Outdoor coil (now the evaporator)

Here's a diagram showing both modes side by side:`,
    time: '2:14 PM',
    media: [
      { type: 'diagram', id: 'reversing-valve' },
      { type: 'video', title: 'Reversing Valve — 3D Animation', subtitle: 'See the internal sliding mechanism in motion', duration: '3:42', gradient: 'linear-gradient(135deg, #0c2d48 0%, #145374 100%)' }
    ],
    contentAfterMedia: `The valve itself is a cylindrical body with a sliding mechanism inside. It has four ports:
1. **Suction line** (to compressor)
2. **Discharge line** (from compressor)
3. **To outdoor coil**
4. **To indoor coil**

A solenoid pilot valve controls which position the main valve is in. When energized, it shifts one way; when de-energized, it shifts the other.

The key insight: the indoor and outdoor coils don't change — what changes is the *direction of refrigerant flow*, which swaps which coil acts as the condenser and which acts as the evaporator.

Want me to walk through the pressure dynamics at each stage, or would a troubleshooting scenario be more helpful?`
  },
  {
    role: 'user',
    content: 'That makes sense! What happens if the reversing valve gets stuck? How would I diagnose that?',
    time: '2:16 PM'
  },
  {
    role: 'assistant',
    content: `A stuck reversing valve is one of the most common heat pump issues you'll encounter in the field. Here's how to diagnose it:

**Symptoms of a stuck valve:**
- System blows cool air in heating mode (or warm air in cooling mode)
- Both the suction and discharge lines at the valve feel similar temperatures
- The system runs but doesn't produce the expected output

**Diagnostic procedure:**
1. **Temperature test** — Feel the four lines connected to the valve. In normal operation, you should have a clear hot line (discharge) and a clear cold line (suction). If they're close in temperature, the valve may be stuck mid-position.

2. **Solenoid check** — Verify the solenoid pilot valve is energizing. Use your multimeter to check for 24V at the solenoid coil. Listen for a click when power is applied.

3. **Pressure readings** — With gauges connected, compare high-side and low-side pressures. A stuck valve often shows abnormal pressure differentials.

4. **The tap test** — Gently tap the valve body with a wrench handle while the system runs. Sometimes a stuck valve will free up temporarily, confirming the diagnosis.

Here's the diagnostic flow:`,
    time: '2:17 PM',
    media: [
      { type: 'diagram', id: 'diagnostic-flow' },
      { type: 'model', title: 'Reversing Valve — 3D Component', subtitle: 'Explore the internal mechanism interactively', icon: 'rotate-3d' },
      { type: 'callout', icon: 'bookmark', title: 'Competency 6, Module 3', text: 'This topic is covered in your current module. Complete the interactive quiz to test your diagnostic skills.' }
    ],
    contentAfterMedia: `**Important:** Before condemning the valve, always verify the thermostat is sending the correct signal. A wiring issue at the O/B terminal is a much cheaper fix.

Want to try a practice diagnostic scenario?`
  }
];

const CHAT_SUGGESTIONS = [
  { text: 'Explain heat pump defrost cycles', icon: 'thermometer' },
  { text: 'Show me a reversing valve diagram', icon: 'image' },
  { text: 'Quiz me on heat pump components', icon: 'help-circle' },
  { text: 'Walk me through a service call', icon: 'play-circle' }
];

const VOICE_TRANSCRIPT = [
  { role: 'user', text: 'Hey CET, can you walk me through the steps for charging a residential R-410A system?' },
  { role: 'assistant', text: 'Absolutely, Jorge. Charging an R-410A system has a few critical steps. First, you need to verify the system is leak-free and has been properly evacuated to at least 500 microns. Then you\'ll connect your manifold gauges and weigh in the charge. R-410A must always be charged as a liquid from the cylinder — never vapor. The exact charge amount is on the unit\'s data plate. Want me to walk through the superheat and subcooling targets for verification?' },
  { role: 'user', text: 'Yes, what should my subcooling be?' },
  { role: 'assistant', text: 'For most residential R-410A systems with a TXV metering device, you\'re targeting 10 to 12 degrees of subcooling. Measure your liquid line temperature at the condenser outlet and compare it to your saturated condensing temperature from your high-side pressure. The difference is your subcooling. If it\'s low, you need more refrigerant. If it\'s high, you may be overcharged. This was covered in Competency 4 — AC Fundamentals, Module 10.' }
];

const VOICE_PROMPTS = [
  'Walk me through a system startup',
  'Quiz me on electrical safety',
  'Explain superheat vs subcooling',
  'Describe a typical service call'
];

const ANALYTICS_DATA = {
  skillRadar: {
    labels: ['Safety & Tools', 'Electrical', 'Refrigeration', 'Heating', 'Technical Skills', 'Professional'],
    values: [95, 88, 85, 82, 55, 15]
  },
  phaseTimeline: {
    labels: ['Safety', 'Math', 'Electrical', 'AC Fund.', 'Heating', 'Heat Pumps', 'Brazing', 'Air Dist.', 'Green Tech', 'Computer', 'Cust. Svc', 'Job Prep'],
    actual: [3.8, 3.2, 6.5, 7.0, 4.8, 2.5, 0, 0, 0, 0, 0, 0],
    expected: [3.5, 2.5, 4.5, 6, 4, 3.5, 2.5, 3.5, 2.5, 2.5, 2, 2.5]
  },
  masteryBreakdown: [
    { skill: 'Safety & Compliance', level: 95 },
    { skill: 'Trade Math', level: 92 },
    { skill: 'Electrical Diagnostics', level: 88 },
    { skill: 'Refrigeration Theory', level: 85 },
    { skill: 'AC System Service', level: 83 },
    { skill: 'Heating Systems', level: 82 },
    { skill: 'Heat Pump Systems', level: 55 },
    { skill: 'EPA 608 Knowledge', level: 96 },
    { skill: 'Brazing & Piping', level: 10 },
    { skill: 'Air Distribution', level: 5 }
  ],
  sessions: [
    { date: 'Feb 17', topic: 'Heat Pump Reversing Valves', duration: '23 min', questions: 12 },
    { date: 'Feb 16', topic: 'Defrost Cycle Diagnostics', duration: '34 min', questions: 18 },
    { date: 'Feb 15', topic: 'Electric Resistance Heating', duration: '19 min', questions: 8 },
    { date: 'Feb 14', topic: 'Furnace Troubleshooting Review', duration: '41 min', questions: 22 },
    { date: 'Feb 13', topic: 'EPA 608 Exam Prep', duration: '28 min', questions: 14 },
    { date: 'Feb 11', topic: 'R-410A Charging Procedures', duration: '15 min', questions: 6 }
  ]
};

// ── Student Notifications ──
const STUDENT_NOTIFICATIONS = [
  { id: 1, type: 'task', from: 'Maria Santos', title: 'New Assignment: EPA 608 Practice Exam', body: 'Complete by Feb 20 — submit through Canvas LMS.', time: '1 hour ago', read: false, icon: 'clipboard-list' },
  { id: 2, type: 'message', from: 'Maria Santos', title: 'Great work on the Heat Pump module!', body: 'Keep up the momentum, Jorge. You\'re making excellent progress.', time: '3 hours ago', read: false, icon: 'message-square' },
  { id: 3, type: 'system', from: 'CET System', title: 'Competency 5 Completed', body: 'Congratulations! You have completed Heating Equipment.', time: 'Yesterday', read: true, icon: 'check-circle' },
  { id: 4, type: 'task', from: 'Maria Santos', title: 'Heat Load Calculation Worksheet Due', body: 'Due Feb 22 — submit through Canvas LMS.', time: '2 days ago', read: true, icon: 'clipboard-list' },
  { id: 5, type: 'announcement', from: 'CET Administration', title: 'Campus Closed Monday, Feb 24', body: 'Presidents\' Day observed. Online resources remain available.', time: '3 days ago', read: true, icon: 'megaphone' }
];

// ── Teacher Portal Data ──
const TEACHER_STUDENTS = [
  { id: 'stu-001', name: 'Jorge Arellano', initials: 'JA', currentPhase: 6, phaseName: 'Heat Pumps', progress: 46, status: 'on-track', lastActive: '2 hours ago', riskLevel: 'none', hoursLogged: 214, streak: 12 },
  { id: 'stu-002', name: 'Samantha Lee', initials: 'SL', currentPhase: 4, phaseName: 'AC Fundamentals', progress: 31, status: 'on-track', lastActive: '1 day ago', riskLevel: 'none', hoursLogged: 148, streak: 5 },
  { id: 'stu-003', name: 'Marcus Thompson', initials: 'MT', currentPhase: 3, phaseName: 'Electricity', progress: 22, status: 'at-risk', lastActive: '5 days ago', riskLevel: 'high', hoursLogged: 89, streak: 0 },
  { id: 'stu-004', name: 'Priya Patel', initials: 'PP', currentPhase: 7, phaseName: 'Brazing & Soldering', progress: 54, status: 'ahead', lastActive: '3 hours ago', riskLevel: 'none', hoursLogged: 267, streak: 18 },
  { id: 'stu-005', name: 'Carlos Mendez', initials: 'CM', currentPhase: 5, phaseName: 'Heating Equipment', progress: 38, status: 'behind', lastActive: '3 days ago', riskLevel: 'medium', hoursLogged: 156, streak: 1 },
  { id: 'stu-006', name: 'Ashley Kim', initials: 'AK', currentPhase: 2, phaseName: 'Trade Math', progress: 14, status: 'on-track', lastActive: '1 hour ago', riskLevel: 'none', hoursLogged: 52, streak: 8 }
];

const TEACHER_STATS = [
  { label: 'Active Students', value: '6', icon: 'users', trend: '1 new this month' },
  { label: 'Avg. Progress', value: '34%', icon: 'trending-up', trend: '+3% this week' },
  { label: 'At Risk', value: '1', icon: 'alert-triangle', trend: 'Marcus Thompson' },
  { label: 'Tasks Due', value: '8', icon: 'clipboard-list', trend: '3 overdue' }
];

const TEACHER_TASKS = [
  { id: 1, title: 'Review EPA 608 Practice Exam', assignedTo: 'Jorge Arellano', assignedInitials: 'JA', dueDate: 'Feb 20', status: 'pending', priority: 'high' },
  { id: 2, title: 'Complete Wiring Lab Assessment', assignedTo: 'Samantha Lee', assignedInitials: 'SL', dueDate: 'Feb 18', status: 'overdue', priority: 'high' },
  { id: 3, title: 'Heat Load Calculation Worksheet', assignedTo: 'All Students', assignedInitials: 'ALL', dueDate: 'Feb 22', status: 'pending', priority: 'medium' },
  { id: 4, title: 'Safety Protocol Quiz Retake', assignedTo: 'Marcus Thompson', assignedInitials: 'MT', dueDate: 'Feb 15', status: 'overdue', priority: 'high' },
  { id: 5, title: 'Refrigerant Handling Lab Report', assignedTo: 'Carlos Mendez', assignedInitials: 'CM', dueDate: 'Feb 25', status: 'pending', priority: 'medium' },
  { id: 6, title: 'Brazing Practical Exam', assignedTo: 'Priya Patel', assignedInitials: 'PP', dueDate: 'Feb 28', status: 'pending', priority: 'low' },
  { id: 7, title: 'Trade Math Final Assessment', assignedTo: 'Ashley Kim', assignedInitials: 'AK', dueDate: 'Mar 1', status: 'pending', priority: 'medium' },
  { id: 8, title: 'Mid-Program Skills Check', assignedTo: 'All Students', assignedInitials: 'ALL', dueDate: 'Mar 5', status: 'pending', priority: 'low' }
];

const TEACHER_MESSAGES = [
  { id: 1, from: 'Jorge Arellano', initials: 'JA', preview: 'Quick question about the reversing valve lab — do I need to bring my own gauges?', time: '2:30 PM', unread: true },
  { id: 2, from: 'Marcus Thompson', initials: 'MT', preview: 'I need to reschedule the safety quiz retake. Can we do Thursday?', time: '11:15 AM', unread: true },
  { id: 3, from: 'Priya Patel', initials: 'PP', preview: 'Completed the extra credit brazing assignment. Attached my photos.', time: 'Yesterday', unread: false },
  { id: 4, from: 'Admin Office', initials: 'AO', preview: 'Updated enrollment numbers for spring cohort attached.', time: '2 days ago', unread: false },
  { id: 5, from: 'Carlos Mendez', initials: 'CM', preview: 'Having trouble accessing the Canvas module for Heating Equipment.', time: '3 days ago', unread: false }
];

const TEACHER_RECENT_ACTIVITY = [
  { title: 'Jorge Arellano completed Module 4: Reversing Valves', time: '2 hours ago', icon: 'check-circle', color: '#22c55e' },
  { title: 'Ashley Kim started Competency 2: Trade Math', time: '4 hours ago', icon: 'play', color: '#00d4ff' },
  { title: 'Priya Patel scored 98% on Brazing Practical', time: 'Yesterday', icon: 'award', color: '#f59e0b' },
  { title: 'Marcus Thompson missed Safety Quiz deadline', time: '2 days ago', icon: 'alert-triangle', color: '#ef4444' },
  { title: 'Samantha Lee logged 3.5 hours on AC Fundamentals', time: '2 days ago', icon: 'clock', color: '#8b5cf6' }
];

// ── Admin Portal Data ──
const ADMIN_STATS = [
  { label: 'Total Enrolled', value: '47', icon: 'users', trend: '+5 this quarter' },
  { label: 'Completion Rate', value: '78%', icon: 'award', trend: '+2% vs last cohort' },
  { label: 'Avg. Time to Complete', value: '9.2 mo', icon: 'clock', trend: 'On target' },
  { label: 'Job Placement', value: '92%', icon: 'briefcase', trend: '+4% YoY' }
];

const ADMIN_FACULTY = [
  { id: 'fac-001', name: 'Maria Santos', initials: 'MS', role: 'Lead Instructor', students: 6, avgProgress: 34, department: 'HVAC', status: 'active', email: 'maria.santos@cet.edu' },
  { id: 'fac-002', name: 'Robert Williams', initials: 'RW', role: 'Instructor', students: 8, avgProgress: 41, department: 'HVAC', status: 'active', email: 'robert.williams@cet.edu' },
  { id: 'fac-003', name: 'Jennifer Park', initials: 'JP', role: 'Lab Supervisor', students: 12, avgProgress: 38, department: 'HVAC', status: 'active', email: 'jennifer.park@cet.edu' },
  { id: 'fac-004', name: 'Thomas Garcia', initials: 'TG', role: 'Adjunct Instructor', students: 4, avgProgress: 29, department: 'HVAC', status: 'active', email: 'thomas.garcia@cet.edu' }
];

const ADMIN_ENROLLMENT_PIPELINE = [
  { stage: 'Inquiries', count: 23, icon: 'message-circle', color: '#8b5cf6' },
  { stage: 'Applications', count: 15, icon: 'file-text', color: '#3b82f6' },
  { stage: 'Accepted', count: 11, icon: 'check-circle', color: '#22c55e' },
  { stage: 'Enrolled', count: 8, icon: 'user-plus', color: '#00d4ff' },
  { stage: 'Orientation', count: 5, icon: 'map-pin', color: '#f59e0b' }
];

const ADMIN_ALL_STUDENTS = [
  { name: 'Jorge Arellano', initials: 'JA', instructor: 'Maria Santos', currentPhase: 6, phaseName: 'Heat Pumps', progress: 46, status: 'on-track', enrollDate: '2025-08-18' },
  { name: 'Samantha Lee', initials: 'SL', instructor: 'Maria Santos', currentPhase: 4, phaseName: 'AC Fundamentals', progress: 31, status: 'on-track', enrollDate: '2025-08-18' },
  { name: 'Marcus Thompson', initials: 'MT', instructor: 'Maria Santos', currentPhase: 3, phaseName: 'Electricity', progress: 22, status: 'at-risk', enrollDate: '2025-08-18' },
  { name: 'Priya Patel', initials: 'PP', instructor: 'Maria Santos', currentPhase: 7, phaseName: 'Brazing & Soldering', progress: 54, status: 'ahead', enrollDate: '2025-08-18' },
  { name: 'Carlos Mendez', initials: 'CM', instructor: 'Maria Santos', currentPhase: 5, phaseName: 'Heating Equipment', progress: 38, status: 'behind', enrollDate: '2025-08-18' },
  { name: 'Ashley Kim', initials: 'AK', instructor: 'Maria Santos', currentPhase: 2, phaseName: 'Trade Math', progress: 14, status: 'on-track', enrollDate: '2025-09-15' },
  { name: 'Daniel Foster', initials: 'DF', instructor: 'Robert Williams', currentPhase: 8, phaseName: 'Air Distribution', progress: 62, status: 'ahead', enrollDate: '2025-06-10' },
  { name: 'Maria Gonzalez', initials: 'MG', instructor: 'Robert Williams', currentPhase: 5, phaseName: 'Heating Equipment', progress: 40, status: 'on-track', enrollDate: '2025-08-18' },
  { name: 'James Wilson', initials: 'JW', instructor: 'Robert Williams', currentPhase: 6, phaseName: 'Heat Pumps', progress: 48, status: 'on-track', enrollDate: '2025-08-18' },
  { name: 'Lisa Chen', initials: 'LC', instructor: 'Jennifer Park', currentPhase: 9, phaseName: 'Green Technology', progress: 71, status: 'ahead', enrollDate: '2025-06-10' },
  { name: 'Kevin Brown', initials: 'KB', instructor: 'Jennifer Park', currentPhase: 4, phaseName: 'AC Fundamentals', progress: 28, status: 'behind', enrollDate: '2025-08-18' },
  { name: 'Rachel Adams', initials: 'RA', instructor: 'Thomas Garcia', currentPhase: 1, phaseName: 'HVAC Safety & Tools', progress: 8, status: 'on-track', enrollDate: '2025-11-01' }
];

const ADMIN_PROGRAM_STATS = {
  completionByPhase: {
    labels: ['Safety', 'Math', 'Electrical', 'AC Fund.', 'Heating', 'Heat Pumps', 'Brazing', 'Air Dist.', 'Green Tech', 'Computer', 'Cust. Svc', 'Job Prep'],
    students: [42, 38, 33, 27, 21, 15, 8, 5, 3, 1, 0, 0]
  },
  monthlyEnrollment: {
    labels: ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'],
    values: [12, 8, 6, 3, 10, 8]
  }
};
