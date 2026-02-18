// CET — UI Components
// Render functions for each view

// ── Brand Logo Mark ──

function cetLogoMark(size = 48) {
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="${size}" height="${size}" class="cet-logo-mark">
      <path d="M24 6 L38 26 L31 26 L24 15 L17 26 L10 26 Z" fill="#00d4ff"/>
      <rect x="13" y="31" width="22" height="3" rx="1.5" fill="#00d4ff" opacity="0.4"/>
      <rect x="17" y="37" width="14" height="2.2" rx="1.1" fill="#00d4ff" opacity="0.18"/>
    </svg>`;
}

// ── SVG Technical Diagrams ──

function getDiagramSvg(id) {
  switch (id) {
    case 'reversing-valve': return reversingValveDiagram();
    case 'diagnostic-flow': return diagnosticFlowDiagram();
    default: return '';
  }
}

function reversingValveDiagram() {
  return `
  <svg viewBox="0 0 720 340" xmlns="http://www.w3.org/2000/svg" class="diagram-svg">
    <defs>
      <marker id="arrow-hot" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#ef6446"/>
      </marker>
      <marker id="arrow-cold" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#00d4ff"/>
      </marker>
      <marker id="arrow-hot2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#ef6446"/>
      </marker>
      <marker id="arrow-cold2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#00d4ff"/>
      </marker>
    </defs>

    <!-- Labels -->
    <text x="180" y="20" fill="#555" font-size="11" font-family="Inter, sans-serif" text-anchor="middle" font-weight="600" letter-spacing="0.1em">COOLING MODE</text>
    <text x="540" y="20" fill="#555" font-size="11" font-family="Inter, sans-serif" text-anchor="middle" font-weight="600" letter-spacing="0.1em">HEATING MODE</text>

    <!-- ═══ COOLING MODE (Left) ═══ -->
    <!-- Compressor -->
    <rect x="140" y="38" width="80" height="40" rx="8" fill="#1e1e1e" stroke="#333" stroke-width="1.5"/>
    <text x="180" y="63" fill="#fafafa" font-size="10" font-family="Inter, sans-serif" text-anchor="middle" font-weight="500">Compressor</text>

    <!-- Reversing Valve -->
    <rect x="115" y="120" width="130" height="44" rx="10" fill="#1a1a2e" stroke="#00d4ff" stroke-width="1.5" stroke-opacity="0.6"/>
    <text x="180" y="147" fill="#00d4ff" font-size="9" font-family="Inter, sans-serif" text-anchor="middle" font-weight="600" letter-spacing="0.05em">4-WAY VALVE</text>

    <!-- Outdoor Coil -->
    <rect x="50" y="220" width="90" height="44" rx="8" fill="#1e1e1e" stroke="#ef6446" stroke-width="1.5" stroke-opacity="0.5"/>
    <text x="95" y="239" fill="#aaa" font-size="9" font-family="Inter, sans-serif" text-anchor="middle">Outdoor Coil</text>
    <text x="95" y="254" fill="#ef6446" font-size="8" font-family="Inter, sans-serif" text-anchor="middle" font-weight="600">CONDENSER</text>

    <!-- Indoor Coil -->
    <rect x="220" y="220" width="90" height="44" rx="8" fill="#1e1e1e" stroke="#00d4ff" stroke-width="1.5" stroke-opacity="0.5"/>
    <text x="265" y="239" fill="#aaa" font-size="9" font-family="Inter, sans-serif" text-anchor="middle">Indoor Coil</text>
    <text x="265" y="254" fill="#00d4ff" font-size="8" font-family="Inter, sans-serif" text-anchor="middle" font-weight="600">EVAPORATOR</text>

    <!-- Metering Device -->
    <rect x="152" y="296" width="56" height="24" rx="6" fill="#1e1e1e" stroke="#333" stroke-width="1"/>
    <text x="180" y="312" fill="#888" font-size="7" font-family="Inter, sans-serif" text-anchor="middle">TXV</text>

    <!-- Flow Lines — Cooling -->
    <!-- Compressor discharge (hot) down to valve -->
    <line x1="160" y1="78" x2="160" y2="120" stroke="#ef6446" stroke-width="2" marker-end="url(#arrow-hot)"/>
    <!-- Valve to outdoor (hot) -->
    <line x1="145" y1="164" x2="95" y2="220" stroke="#ef6446" stroke-width="2" marker-end="url(#arrow-hot)"/>
    <!-- Outdoor to TXV -->
    <line x1="95" y1="264" x2="152" y2="300" stroke="#ef6446" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#arrow-hot)"/>
    <!-- TXV to indoor (cold) -->
    <line x1="208" y1="300" x2="265" y2="264" stroke="#00d4ff" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#arrow-cold)"/>
    <!-- Indoor to valve (cold) -->
    <line x1="265" y1="220" x2="215" y2="164" stroke="#00d4ff" stroke-width="2" marker-end="url(#arrow-cold)"/>
    <!-- Valve suction (cold) up to compressor -->
    <line x1="200" y1="120" x2="200" y2="78" stroke="#00d4ff" stroke-width="2" marker-end="url(#arrow-cold)"/>

    <!-- Temp labels -->
    <text x="146" y="102" fill="#ef6446" font-size="7" font-family="monospace" font-weight="700">HOT</text>
    <text x="206" y="102" fill="#00d4ff" font-size="7" font-family="monospace" font-weight="700">COLD</text>

    <!-- Divider -->
    <line x1="360" y1="30" x2="360" y2="330" stroke="#262626" stroke-width="1" stroke-dasharray="4 4"/>

    <!-- ═══ HEATING MODE (Right) ═══ -->
    <!-- Compressor -->
    <rect x="500" y="38" width="80" height="40" rx="8" fill="#1e1e1e" stroke="#333" stroke-width="1.5"/>
    <text x="540" y="63" fill="#fafafa" font-size="10" font-family="Inter, sans-serif" text-anchor="middle" font-weight="500">Compressor</text>

    <!-- Reversing Valve -->
    <rect x="475" y="120" width="130" height="44" rx="10" fill="#1a1a2e" stroke="#00d4ff" stroke-width="1.5" stroke-opacity="0.6"/>
    <text x="540" y="147" fill="#00d4ff" font-size="9" font-family="Inter, sans-serif" text-anchor="middle" font-weight="600" letter-spacing="0.05em">4-WAY VALVE</text>

    <!-- Outdoor Coil (now evaporator) -->
    <rect x="410" y="220" width="90" height="44" rx="8" fill="#1e1e1e" stroke="#00d4ff" stroke-width="1.5" stroke-opacity="0.5"/>
    <text x="455" y="239" fill="#aaa" font-size="9" font-family="Inter, sans-serif" text-anchor="middle">Outdoor Coil</text>
    <text x="455" y="254" fill="#00d4ff" font-size="8" font-family="Inter, sans-serif" text-anchor="middle" font-weight="600">EVAPORATOR</text>

    <!-- Indoor Coil (now condenser) -->
    <rect x="580" y="220" width="90" height="44" rx="8" fill="#1e1e1e" stroke="#ef6446" stroke-width="1.5" stroke-opacity="0.5"/>
    <text x="625" y="239" fill="#aaa" font-size="9" font-family="Inter, sans-serif" text-anchor="middle">Indoor Coil</text>
    <text x="625" y="254" fill="#ef6446" font-size="8" font-family="Inter, sans-serif" text-anchor="middle" font-weight="600">CONDENSER</text>

    <!-- Metering Device -->
    <rect x="512" y="296" width="56" height="24" rx="6" fill="#1e1e1e" stroke="#333" stroke-width="1"/>
    <text x="540" y="312" fill="#888" font-size="7" font-family="Inter, sans-serif" text-anchor="middle">TXV</text>

    <!-- Flow Lines — Heating (reversed!) -->
    <!-- Compressor discharge (hot) down to valve -->
    <line x1="560" y1="78" x2="560" y2="120" stroke="#ef6446" stroke-width="2" marker-end="url(#arrow-hot2)"/>
    <!-- Valve to indoor (hot) — reversed direction -->
    <line x1="575" y1="164" x2="625" y2="220" stroke="#ef6446" stroke-width="2" marker-end="url(#arrow-hot2)"/>
    <!-- Indoor to TXV (warm→metering) -->
    <line x1="625" y1="264" x2="568" y2="300" stroke="#ef6446" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#arrow-hot2)"/>
    <!-- TXV to outdoor (cold) -->
    <line x1="512" y1="300" x2="455" y2="264" stroke="#00d4ff" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#arrow-cold2)"/>
    <!-- Outdoor to valve (cold) -->
    <line x1="455" y1="220" x2="505" y2="164" stroke="#00d4ff" stroke-width="2" marker-end="url(#arrow-cold2)"/>
    <!-- Valve suction (cold) up to compressor -->
    <line x1="520" y1="120" x2="520" y2="78" stroke="#00d4ff" stroke-width="2" marker-end="url(#arrow-cold2)"/>

    <!-- Temp labels -->
    <text x="566" y="102" fill="#ef6446" font-size="7" font-family="monospace" font-weight="700">HOT</text>
    <text x="506" y="102" fill="#00d4ff" font-size="7" font-family="monospace" font-weight="700">COLD</text>

    <!-- Legend -->
    <line x1="260" y1="335" x2="280" y2="335" stroke="#ef6446" stroke-width="2"/>
    <text x="286" y="338" fill="#888" font-size="8" font-family="Inter, sans-serif">High pressure / Hot</text>
    <line x1="400" y1="335" x2="420" y2="335" stroke="#00d4ff" stroke-width="2"/>
    <text x="426" y="338" fill="#888" font-size="8" font-family="Inter, sans-serif">Low pressure / Cold</text>
  </svg>`;
}

function diagnosticFlowDiagram() {
  return `
  <svg viewBox="0 0 600 380" xmlns="http://www.w3.org/2000/svg" class="diagram-svg">
    <!-- Start -->
    <rect x="200" y="8" width="200" height="36" rx="18" fill="#1a1a2e" stroke="#00d4ff" stroke-width="1.5"/>
    <text x="300" y="31" fill="#00d4ff" font-size="10" font-family="Inter, sans-serif" text-anchor="middle" font-weight="600">System not heating/cooling?</text>
    <line x1="300" y1="44" x2="300" y2="68" stroke="#333" stroke-width="1.5"/>

    <!-- Step 1: Temperature Test -->
    <rect x="195" y="68" width="210" height="40" rx="8" fill="#1e1e1e" stroke="#333" stroke-width="1.5"/>
    <text x="300" y="84" fill="#fafafa" font-size="9.5" font-family="Inter, sans-serif" text-anchor="middle" font-weight="500">1. Feel the four valve lines</text>
    <text x="300" y="100" fill="#888" font-size="8" font-family="Inter, sans-serif" text-anchor="middle">Compare discharge vs suction temp</text>

    <!-- Branch -->
    <line x1="300" y1="108" x2="300" y2="130" stroke="#333" stroke-width="1.5"/>
    <!-- Diamond -->
    <polygon points="300,130 340,152 300,174 260,152" fill="#1a1a2e" stroke="#f59e0b" stroke-width="1.5"/>
    <text x="300" y="156" fill="#f59e0b" font-size="8" font-family="Inter, sans-serif" text-anchor="middle" font-weight="600">Similar?</text>

    <!-- NO branch (right) - not stuck -->
    <line x1="340" y1="152" x2="460" y2="152" stroke="#22c55e" stroke-width="1.5"/>
    <text x="390" y="145" fill="#22c55e" font-size="8" font-family="Inter, sans-serif" font-weight="600">NO</text>
    <rect x="460" y="136" width="120" height="32" rx="8" fill="#0a1f0a" stroke="#22c55e" stroke-width="1" stroke-opacity="0.5"/>
    <text x="520" y="157" fill="#22c55e" font-size="8.5" font-family="Inter, sans-serif" text-anchor="middle" font-weight="500">Valve likely OK</text>

    <!-- YES branch (down) -->
    <line x1="300" y1="174" x2="300" y2="198" stroke="#ef4444" stroke-width="1.5"/>
    <text x="312" y="190" fill="#ef4444" font-size="8" font-family="Inter, sans-serif" font-weight="600">YES</text>

    <!-- Step 2: Check solenoid -->
    <rect x="195" y="198" width="210" height="40" rx="8" fill="#1e1e1e" stroke="#333" stroke-width="1.5"/>
    <text x="300" y="214" fill="#fafafa" font-size="9.5" font-family="Inter, sans-serif" text-anchor="middle" font-weight="500">2. Check solenoid coil</text>
    <text x="300" y="230" fill="#888" font-size="8" font-family="Inter, sans-serif" text-anchor="middle">Verify 24V at coil • Listen for click</text>

    <line x1="300" y1="238" x2="300" y2="258" stroke="#333" stroke-width="1.5"/>

    <!-- Diamond 2 -->
    <polygon points="300,258 336,278 300,298 264,278" fill="#1a1a2e" stroke="#f59e0b" stroke-width="1.5"/>
    <text x="300" y="282" fill="#f59e0b" font-size="8" font-family="Inter, sans-serif" text-anchor="middle" font-weight="600">24V?</text>

    <!-- NO branch - solenoid issue -->
    <line x1="336" y1="278" x2="460" y2="278" stroke="#ef4444" stroke-width="1.5"/>
    <text x="390" y="271" fill="#ef4444" font-size="8" font-family="Inter, sans-serif" font-weight="600">NO</text>
    <rect x="460" y="262" width="120" height="32" rx="8" fill="#1f0a0a" stroke="#ef4444" stroke-width="1" stroke-opacity="0.5"/>
    <text x="520" y="278" fill="#ef4444" font-size="8" font-family="Inter, sans-serif" text-anchor="middle" font-weight="500">Check wiring /</text>
    <text x="520" y="290" fill="#ef4444" font-size="8" font-family="Inter, sans-serif" text-anchor="middle" font-weight="500">O/B terminal</text>

    <!-- YES branch (down) -->
    <line x1="300" y1="298" x2="300" y2="318" stroke="#333" stroke-width="1.5"/>

    <!-- Step 3: Tap test + pressure -->
    <rect x="180" y="318" width="240" height="40" rx="8" fill="#1e1e1e" stroke="#333" stroke-width="1.5"/>
    <text x="300" y="334" fill="#fafafa" font-size="9.5" font-family="Inter, sans-serif" text-anchor="middle" font-weight="500">3. Pressure test + Tap test</text>
    <text x="300" y="350" fill="#888" font-size="8" font-family="Inter, sans-serif" text-anchor="middle">Abnormal ΔP + frees on tap → stuck valve</text>

    <!-- Result -->
    <line x1="300" y1="358" x2="300" y2="372" stroke="#333" stroke-width="1.5"/>
    <text x="300" y="380" fill="#ef4444" font-size="9" font-family="Inter, sans-serif" text-anchor="middle" font-weight="700">→ Replace reversing valve</text>

    <!-- Left annotation -->
    <rect x="20" y="198" width="130" height="56" rx="8" fill="#161616" stroke="#262626" stroke-width="1"/>
    <text x="85" y="218" fill="#555" font-size="8" font-family="Inter, sans-serif" text-anchor="middle" font-weight="600">TOOLS NEEDED</text>
    <text x="85" y="232" fill="#888" font-size="8" font-family="Inter, sans-serif" text-anchor="middle">Multimeter</text>
    <text x="85" y="244" fill="#888" font-size="8" font-family="Inter, sans-serif" text-anchor="middle">Manifold gauges</text>
  </svg>`;
}


// ── Media Block Renderers ──

function renderMediaBlock(item) {
  switch (item.type) {
    case 'diagram':
      return `
        <div class="media-diagram">
          <div class="media-diagram-header">
            <i data-lucide="git-branch" width="14" height="14"></i>
            <span>Technical Diagram</span>
            <button class="media-action-btn" title="Fullscreen">
              <i data-lucide="maximize-2" width="12" height="12"></i>
            </button>
          </div>
          <div class="media-diagram-body">
            ${getDiagramSvg(item.id)}
          </div>
        </div>`;

    case 'video':
      return `
        <div class="media-video" onclick="this.classList.toggle('playing')">
          <div class="media-video-thumb" style="background: ${item.gradient}">
            <div class="media-video-play">
              <i data-lucide="play" width="22" height="22"></i>
            </div>
            <div class="media-video-duration">${item.duration}</div>
          </div>
          <div class="media-video-info">
            <div class="media-video-title">${item.title}</div>
            <div class="media-video-subtitle">${item.subtitle}</div>
          </div>
        </div>`;

    case 'model':
      return `
        <div class="media-model">
          <div class="media-model-preview">
            <div class="media-model-graphic">
              ${modelPreviewSvg()}
            </div>
            <div class="media-model-badge">
              <i data-lucide="${item.icon || 'rotate-3d'}" width="12" height="12"></i>
              3D Model
            </div>
          </div>
          <div class="media-model-info">
            <div class="media-model-title">${item.title}</div>
            <div class="media-model-subtitle">${item.subtitle}</div>
          </div>
        </div>`;

    case 'callout':
      return `
        <div class="media-callout">
          <div class="media-callout-icon">
            <i data-lucide="${item.icon}" width="16" height="16"></i>
          </div>
          <div class="media-callout-content">
            <div class="media-callout-title">${item.title}</div>
            <div class="media-callout-text">${item.text}</div>
          </div>
        </div>`;

    default:
      return '';
  }
}

function modelPreviewSvg() {
  return `
  <svg viewBox="0 0 160 120" xmlns="http://www.w3.org/2000/svg" class="model-svg">
    <!-- Valve body -->
    <rect x="40" y="30" width="80" height="35" rx="6" fill="#1a1a2e" stroke="#00d4ff" stroke-width="1" stroke-opacity="0.4"/>
    <!-- Ports -->
    <rect x="30" y="40" width="12" height="14" rx="3" fill="#1e1e1e" stroke="#333" stroke-width="1"/>
    <rect x="118" y="40" width="12" height="14" rx="3" fill="#1e1e1e" stroke="#333" stroke-width="1"/>
    <rect x="72" y="18" width="16" height="14" rx="3" fill="#1e1e1e" stroke="#333" stroke-width="1"/>
    <rect x="72" y="63" width="16" height="14" rx="3" fill="#1e1e1e" stroke="#333" stroke-width="1"/>
    <!-- Solenoid -->
    <rect x="55" y="8" width="50" height="12" rx="4" fill="#262626" stroke="#555" stroke-width="0.5"/>
    <text x="80" y="17" fill="#888" font-size="6" text-anchor="middle" font-family="Inter, sans-serif">SOLENOID</text>
    <!-- Internal slide -->
    <rect x="55" y="42" width="24" height="10" rx="2" fill="#00d4ff" fill-opacity="0.3" stroke="#00d4ff" stroke-width="0.5"/>
    <!-- Labels -->
    <text x="80" y="100" fill="#555" font-size="7" text-anchor="middle" font-family="Inter, sans-serif">Click to explore</text>
    <!-- Rotation indicator -->
    <circle cx="135" cy="100" r="10" fill="none" stroke="#333" stroke-width="1" stroke-dasharray="3 2"/>
    <path d="M140 96 L143 100 L139 100" fill="#555"/>
  </svg>`;
}


// ── Login Screen ──

function renderLogin() {
  return `
    <div class="login-container">
      <div class="login-card">
        <div class="login-brand">
          <div class="login-mark">${cetLogoMark(56)}</div>
          <div class="login-logo">CET</div>
          <div class="login-tagline">Center for Employment Training</div>
          <div class="login-subtitle">AI-Powered HVAC Training Platform</div>
        </div>

        <div class="login-roles">
          <button class="role-card" onclick="login('student')">
            <div class="role-card-icon">
              <i data-lucide="graduation-cap" width="28" height="28"></i>
            </div>
            <div class="role-card-label">Student</div>
            <div class="role-card-desc">Access your courses, AI tutor, and progress tracking</div>
            <div class="role-card-demo">Demo: Jorge Arellano</div>
          </button>

          <button class="role-card" onclick="login('teacher')">
            <div class="role-card-icon">
              <i data-lucide="book-open" width="28" height="28"></i>
            </div>
            <div class="role-card-label">Instructor</div>
            <div class="role-card-desc">Manage students, assignments, and communications</div>
            <div class="role-card-demo">Demo: Maria Santos</div>
          </button>

          <button class="role-card" onclick="login('admin')">
            <div class="role-card-icon">
              <i data-lucide="shield" width="28" height="28"></i>
            </div>
            <div class="role-card-label">Administrator</div>
            <div class="role-card-desc">Program oversight, enrollment, and analytics</div>
            <div class="role-card-demo">Demo: David Chen</div>
          </button>
        </div>

        <div class="login-footer">
          <div class="login-footer-sync">
            <span class="sync-dot"></span>
            Canvas LMS Connected
          </div>
        </div>
      </div>
    </div>
  `;
}


// ── Dynamic Sidebar ──

function renderSidebar(role) {
  const user = CURRENT_USER;
  const unreadNotifications = STUDENT_NOTIFICATIONS.filter(n => !n.read).length;
  const unreadMessages = TEACHER_MESSAGES.filter(m => m.unread).length;

  let navItems = '';
  switch (role) {
    case 'student':
      navItems = `
        <button class="nav-item active" data-view="dashboard" onclick="navigate('dashboard')">
          <i data-lucide="layout-dashboard" width="18" height="18"></i> Dashboard
        </button>
        <button class="nav-item" data-view="chat" onclick="navigate('chat')">
          <i data-lucide="message-square" width="18" height="18"></i> AI Tutor
        </button>
        <button class="nav-item" data-view="phases" onclick="navigate('phases')">
          <i data-lucide="route" width="18" height="18"></i> Phases
        </button>
        <button class="nav-item" data-view="analytics" onclick="navigate('analytics')">
          <i data-lucide="bar-chart-3" width="18" height="18"></i> Analytics
        </button>
        <button class="nav-item" data-view="notifications" onclick="navigate('notifications')">
          <i data-lucide="bell" width="18" height="18"></i> Notifications
          ${unreadNotifications > 0 ? `<span class="nav-badge">${unreadNotifications}</span>` : ''}
        </button>
      `;
      break;
    case 'teacher':
      navItems = `
        <button class="nav-item active" data-view="teacher-dashboard" onclick="navigate('teacher-dashboard')">
          <i data-lucide="layout-dashboard" width="18" height="18"></i> Dashboard
        </button>
        <button class="nav-item" data-view="roster" onclick="navigate('roster')">
          <i data-lucide="users" width="18" height="18"></i> My Students
        </button>
        <button class="nav-item" data-view="tasks" onclick="navigate('tasks')">
          <i data-lucide="clipboard-list" width="18" height="18"></i> Assignments
        </button>
        <button class="nav-item" data-view="messages" onclick="navigate('messages')">
          <i data-lucide="mail" width="18" height="18"></i> Messages
          ${unreadMessages > 0 ? `<span class="nav-badge">${unreadMessages}</span>` : ''}
        </button>
      `;
      break;
    case 'admin':
      navItems = `
        <button class="nav-item active" data-view="admin-dashboard" onclick="navigate('admin-dashboard')">
          <i data-lucide="layout-dashboard" width="18" height="18"></i> Dashboard
        </button>
        <button class="nav-item" data-view="admin-students" onclick="navigate('admin-students')">
          <i data-lucide="users" width="18" height="18"></i> Students
        </button>
        <button class="nav-item" data-view="faculty" onclick="navigate('faculty')">
          <i data-lucide="book-open" width="18" height="18"></i> Faculty
        </button>
        <button class="nav-item" data-view="program-analytics" onclick="navigate('program-analytics')">
          <i data-lucide="bar-chart-3" width="18" height="18"></i> Analytics
        </button>
        <button class="nav-item" data-view="enrollment" onclick="navigate('enrollment')">
          <i data-lucide="user-plus" width="18" height="18"></i> Enrollment
        </button>
      `;
      break;
  }

  const roleBadge = ROLES[role].label;

  return `
    <div class="sidebar-header">
      <div class="sidebar-brand">
        ${cetLogoMark(28)}
        <div class="sidebar-logo">CET</div>
      </div>
      <div class="sidebar-tagline">Center for Employment Training</div>
    </div>

    <nav class="sidebar-nav">
      ${navItems}
    </nav>

    <div class="sidebar-bottom">
      ${role === 'student' ? `
        <button class="nav-item" onclick="openSettings()">
          <i data-lucide="settings" width="18" height="18"></i>
          Settings
          <span class="settings-status" id="settingsStatus"></span>
        </button>
      ` : ''}
      <button class="nav-item logout" onclick="logout()">
        <i data-lucide="log-out" width="18" height="18"></i>
        Sign Out
      </button>
    </div>

    <div class="sidebar-footer">
      <div class="avatar" id="sidebarAvatar">${user.avatarInitials}</div>
      <div class="sidebar-user-info">
        <div class="sidebar-user-name" id="sidebarUserName">${user.firstName} ${user.lastName}</div>
        <div class="sidebar-sync">
          <span class="sync-dot"></span>
          <span>Canvas LMS Connected</span>
        </div>
      </div>
    </div>
  `;
}


// ── Notifications View ──

function renderNotifications() {
  const unread = STUDENT_NOTIFICATIONS.filter(n => !n.read).length;

  return `
    <div class="notifications-header">
      <h1>Notifications</h1>
      <p>${unread} unread &middot; ${STUDENT_NOTIFICATIONS.length} total</p>
    </div>

    <div class="notifications-list">
      ${STUDENT_NOTIFICATIONS.map(n => `
        <div class="notification-item ${n.read ? 'read' : 'unread'}">
          <div class="notification-icon notification-type-${n.type}">
            <i data-lucide="${n.icon}" width="16" height="16"></i>
          </div>
          <div class="notification-content">
            <div class="notification-title">${n.title}</div>
            <div class="notification-body">${n.body}</div>
            <div class="notification-meta">
              <span class="notification-from">${n.from}</span>
              <span class="notification-time">${n.time}</span>
            </div>
          </div>
          ${!n.read ? '<div class="notification-unread-dot"></div>' : ''}
        </div>
      `).join('')}
    </div>
  `;
}


// ── Dashboard View ──

function renderDashboard() {
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  const currentPhase = PHASES[STUDENT.currentPhase - 1];
  const circumference = 2 * Math.PI * 50;
  const progressOffset = circumference - (currentPhase.progress / 100) * circumference;

  return `
    <div class="greeting">
      <h1>Welcome back, ${STUDENT.firstName}</h1>
      <div class="greeting-date">${dateStr}</div>
    </div>

    <div class="phase-hero">
      <div class="progress-ring">
        <svg viewBox="0 0 120 120">
          <circle class="progress-ring-bg" cx="60" cy="60" r="50"/>
          <circle class="progress-ring-fill" cx="60" cy="60" r="50"
            stroke-dasharray="${circumference}"
            stroke-dashoffset="${progressOffset}"/>
        </svg>
        <div class="progress-ring-text">
          <div class="progress-ring-value">${currentPhase.progress}%</div>
          <div class="progress-ring-label">Comp. ${currentPhase.id}</div>
        </div>
      </div>
      <div class="phase-hero-info">
        <div class="phase-hero-label">Current Competency</div>
        <div class="phase-hero-title">${currentPhase.name}</div>
        <div class="phase-hero-subtitle">${currentPhase.subtitle}</div>
        <div class="phase-hero-modules">
          <span>${currentPhase.modulesCompleted}</span> / ${currentPhase.modules} modules completed
        </div>
      </div>
    </div>

    <div class="stats-grid">
      ${QUICK_STATS.map(stat => `
        <div class="stat-card">
          <div class="stat-card-header">
            <span class="stat-card-label">${stat.label}</span>
            <span class="stat-card-icon"><i data-lucide="${stat.icon}" width="16" height="16"></i></span>
          </div>
          <div class="stat-card-value">${stat.value}</div>
          <div class="stat-card-trend">${stat.trend}</div>
        </div>
      `).join('')}
    </div>

    <div class="tutor-cta" onclick="navigate('chat')">
      <div class="tutor-cta-content">
        <div class="tutor-cta-title">Continue with AI Tutor</div>
        <div class="tutor-cta-subtitle">Pick up where you left off — ${currentPhase.name}</div>
      </div>
      <div class="tutor-cta-arrow">
        <i data-lucide="arrow-right" width="20" height="20"></i>
      </div>
    </div>

    <div class="section-header">Continue Learning</div>
    <div class="resource-grid">
      ${DASHBOARD_RESOURCES.map(res => `
        <div class="resource-card">
          <div class="resource-thumb" style="background: ${res.gradient}">
            <div class="resource-thumb-icon">
              <i data-lucide="${res.icon}" width="24" height="24"></i>
            </div>
            ${res.duration ? `<div class="resource-thumb-duration">${res.duration}</div>` : ''}
            ${res.badge ? `<div class="resource-thumb-badge">${res.badge}</div>` : ''}
          </div>
          <div class="resource-info">
            <div class="resource-title">${res.title}</div>
            <div class="resource-subtitle">${res.subtitle}</div>
            <div class="resource-phase">${res.phase}</div>
          </div>
        </div>
      `).join('')}
    </div>

    <div class="section-header">Recent Activity</div>
    <div class="activity-list">
      ${RECENT_ACTIVITY.map(item => `
        <div class="activity-item" data-type="${item.type}">
          <div class="activity-icon">
            <i data-lucide="${item.icon}" width="16" height="16"></i>
          </div>
          <div class="activity-content">
            <div class="activity-title">${item.title}</div>
            <div class="activity-detail">${item.detail}</div>
          </div>
          <div class="activity-time">${item.time}</div>
        </div>
      `).join('')}
    </div>
  `;
}


// ── Chat Formatting ──

function formatChatContent(text) {
  return markdownToHtml(text);
}

function markdownToHtml(text) {
  // Extract code blocks first to protect them from other formatting
  const codeBlocks = [];
  text = text.replace(/```(\w*)\n?([\s\S]*?)```/g, (_, lang, code) => {
    const idx = codeBlocks.length;
    codeBlocks.push(`<pre class="chat-code-block"><code${lang ? ` class="lang-${lang}"` : ''}>${escapeForCode(code.trim())}</code></pre>`);
    return `%%CODEBLOCK_${idx}%%`;
  });

  // Inline code
  text = text.replace(/`([^`]+)`/g, '<code class="chat-inline-code">$1</code>');

  // Bold and italic (bold first to avoid conflicts)
  text = text.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>');
  text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  text = text.replace(/\*(.+?)\*/g, '<em>$1</em>');

  // Process line by line
  const lines = text.split('\n');
  let html = '';
  let inList = null; // 'ol' | 'ul' | null
  let listBuffer = [];

  function flushList() {
    if (inList && listBuffer.length) {
      html += `<${inList}>${listBuffer.map(li => `<li>${li}</li>`).join('')}</${inList}>`;
      listBuffer = [];
      inList = null;
    }
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    if (!trimmed) {
      flushList();
      continue;
    }

    // Headers
    const headerMatch = trimmed.match(/^(#{1,4})\s+(.+)$/);
    if (headerMatch) {
      flushList();
      const level = Math.min(headerMatch[1].length + 2, 6); // ### → h5, ## → h4, # → h3
      html += `<h${level} class="chat-heading">${headerMatch[2]}</h${level}>`;
      continue;
    }

    // Horizontal rule
    if (/^(-{3,}|\*{3,}|_{3,})$/.test(trimmed)) {
      flushList();
      html += '<hr class="chat-hr">';
      continue;
    }

    // Ordered list item
    const olMatch = trimmed.match(/^\d+\.\s+(.+)$/);
    if (olMatch) {
      if (inList !== 'ol') { flushList(); inList = 'ol'; }
      listBuffer.push(olMatch[1]);
      continue;
    }

    // Unordered list item
    const ulMatch = trimmed.match(/^[-•*]\s+(.+)$/);
    if (ulMatch) {
      if (inList !== 'ul') { flushList(); inList = 'ul'; }
      listBuffer.push(ulMatch[1]);
      continue;
    }

    // Code block placeholder
    if (/^%%CODEBLOCK_\d+%%$/.test(trimmed)) {
      flushList();
      html += trimmed;
      continue;
    }

    // Regular text — merge consecutive non-blank lines into a paragraph
    flushList();
    let pText = trimmed;
    while (i + 1 < lines.length) {
      const next = lines[i + 1].trim();
      if (!next || /^#{1,4}\s/.test(next) || /^\d+\.\s/.test(next) || /^[-•*]\s/.test(next) || /^(-{3,}|\*{3,}|_{3,})$/.test(next) || /^%%CODEBLOCK/.test(next)) break;
      pText += '<br>' + next;
      i++;
    }
    html += `<p>${pText}</p>`;
  }

  flushList();

  // Restore code blocks
  for (let i = 0; i < codeBlocks.length; i++) {
    html = html.replace(`%%CODEBLOCK_${i}%%`, codeBlocks[i]);
  }

  return html;
}

function escapeForCode(text) {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}


// ── Chat View ──

function renderChat() {
  const messagesHtml = CHAT_MESSAGES.map(msg => {
    if (msg.role === 'system') {
      return `<div class="chat-system-message"><i data-lucide="link" width="12" height="12"></i> ${msg.content}</div>`;
    }

    const isUser = msg.role === 'user';
    const avatarContent = isUser ? STUDENT.avatarInitials : 'CET';

    let mediaHtml = '';
    if (msg.media && msg.media.length > 0) {
      mediaHtml = `<div class="chat-media-grid">${msg.media.map(m => renderMediaBlock(m)).join('')}</div>`;
    }

    let afterMediaHtml = '';
    if (msg.contentAfterMedia) {
      afterMediaHtml = `<div class="chat-message-bubble chat-message-bubble-continued">${formatChatContent(msg.contentAfterMedia)}</div>`;
    }

    return `
      <div class="chat-message ${msg.role}">
        <div class="chat-message-avatar">${avatarContent}</div>
        <div class="chat-message-body">
          <div class="chat-message-bubble">
            ${formatChatContent(msg.content)}
          </div>
          ${mediaHtml}
          ${afterMediaHtml}
          <div class="chat-message-time">${msg.time}</div>
        </div>
      </div>
    `;
  }).join('');

  const currentPhase = PHASES[STUDENT.currentPhase - 1];
  const completedPhases = PHASES.filter(p => p.status === 'completed').length;
  const totalModulesCompleted = PHASES.reduce((sum, p) => sum + p.modulesCompleted, 0);
  const totalModules = PHASES.reduce((sum, p) => sum + p.modules, 0);

  return `
    <div class="chat-container">
      <div class="chat-header">
        <div class="chat-header-left">
          <div class="chat-header-title">AI Tutor</div>
          <div class="chat-mode-toggle">
            <button class="mode-toggle-btn active" data-mode="text" onclick="setTutorMode('text')">
              <i data-lucide="message-square" width="13" height="13"></i>
              Text
            </button>
            <button class="mode-toggle-btn" data-mode="voice" onclick="setTutorMode('voice')">
              <i data-lucide="mic" width="13" height="13"></i>
              Voice
            </button>
          </div>
        </div>
        <div class="chat-header-session">
          <i data-lucide="link" width="10" height="10"></i>
          Competency ${STUDENT.currentPhase}: ${PHASES[STUDENT.currentPhase - 1].name}
        </div>
      </div>

      <div class="chat-progress">
        <div class="chat-progress-track">
          ${PHASES.map(phase => {
            let segClass = 'chat-progress-seg';
            if (phase.status === 'completed') segClass += ' completed';
            else if (phase.status === 'active') segClass += ' active';
            else segClass += ' locked';

            const fillWidth = phase.status === 'completed' ? 100 : (phase.status === 'active' ? phase.progress : 0);

            return `
              <div class="${segClass}" title="Comp. ${phase.id}: ${phase.name}" style="--seg-color: ${phase.color}">
                <div class="chat-progress-seg-fill" style="width: ${fillWidth}%"></div>
                <div class="chat-progress-seg-label">${phase.id}</div>
              </div>`;
          }).join('')}
        </div>
        <div class="chat-progress-info">
          <div class="chat-progress-current">
            <span class="chat-progress-phase-name">${currentPhase.name}</span>
            <span class="chat-progress-divider"></span>
            <span class="chat-progress-detail">${currentPhase.modulesCompleted} of ${currentPhase.modules} modules</span>
          </div>
          <div class="chat-progress-overall">
            <span>${totalModulesCompleted}</span> / ${totalModules} total
          </div>
        </div>
      </div>

      <div class="chat-messages" id="chatMessages">
        ${messagesHtml}
      </div>

      <div class="chat-input-area">
        <div class="chat-suggestions">
          ${CHAT_SUGGESTIONS.map(s => `
            <button class="chat-suggestion" onclick="insertSuggestion(this, '${s.text.replace(/'/g, "\\'")}')">
              <i data-lucide="${s.icon}" width="12" height="12"></i>
              ${s.text}
            </button>
          `).join('')}
        </div>
        <div class="chat-input-wrapper">
          <div class="chat-input-actions">
            <button class="chat-attach-btn" title="Attach image">
              <i data-lucide="image" width="16" height="16"></i>
            </button>
            <button class="chat-attach-btn" title="Upload file">
              <i data-lucide="paperclip" width="16" height="16"></i>
            </button>
          </div>
          <input type="text" class="chat-input" id="chatInput"
            placeholder="Ask anything about HVAC..."
            onkeydown="handleChatKeydown(event)">
          <button class="chat-send-btn" onclick="sendMessage()">
            <i data-lucide="arrow-up" width="18" height="18"></i>
          </button>
        </div>
      </div>
    </div>
  `;
}


// ── Voice Mode View ──

function renderVoiceMode() {
  const currentPhase = PHASES[STUDENT.currentPhase - 1];
  const totalModulesCompleted = PHASES.reduce((sum, p) => sum + p.modulesCompleted, 0);
  const totalModules = PHASES.reduce((sum, p) => sum + p.modules, 0);

  const transcriptHtml = VOICE_TRANSCRIPT.map(t => `
    <div class="voice-transcript-line ${t.role}">
      <span class="voice-transcript-speaker">${t.role === 'user' ? STUDENT.firstName : 'CET'}</span>
      <span class="voice-transcript-text">${t.text}</span>
    </div>
  `).join('');

  return `
    <div class="voice-container">
      <div class="chat-header">
        <div class="chat-header-left">
          <div class="chat-header-title">AI Tutor</div>
          <div class="chat-mode-toggle">
            <button class="mode-toggle-btn" data-mode="text" onclick="setTutorMode('text')">
              <i data-lucide="message-square" width="13" height="13"></i>
              Text
            </button>
            <button class="mode-toggle-btn active" data-mode="voice" onclick="setTutorMode('voice')">
              <i data-lucide="mic" width="13" height="13"></i>
              Voice
            </button>
          </div>
        </div>
        <div class="chat-header-session">
          <i data-lucide="link" width="10" height="10"></i>
          Competency ${STUDENT.currentPhase}: ${PHASES[STUDENT.currentPhase - 1].name}
        </div>
      </div>

      <div class="chat-progress">
        <div class="chat-progress-track">
          ${PHASES.map(phase => {
            let segClass = 'chat-progress-seg';
            if (phase.status === 'completed') segClass += ' completed';
            else if (phase.status === 'active') segClass += ' active';
            else segClass += ' locked';
            const fillWidth = phase.status === 'completed' ? 100 : (phase.status === 'active' ? phase.progress : 0);
            return `
              <div class="${segClass}" title="Comp. ${phase.id}: ${phase.name}" style="--seg-color: ${phase.color}">
                <div class="chat-progress-seg-fill" style="width: ${fillWidth}%"></div>
                <div class="chat-progress-seg-label">${phase.id}</div>
              </div>`;
          }).join('')}
        </div>
        <div class="chat-progress-info">
          <div class="chat-progress-current">
            <span class="chat-progress-phase-name">${currentPhase.name}</span>
            <span class="chat-progress-divider"></span>
            <span class="chat-progress-detail">${currentPhase.modulesCompleted} of ${currentPhase.modules} modules</span>
          </div>
          <div class="chat-progress-overall">
            <span>${totalModulesCompleted}</span> / ${totalModules} total
          </div>
        </div>
      </div>

      <div class="voice-stage" id="voiceStage">
        <!-- Background grid -->
        <div class="voice-grid"></div>

        <!-- Orbital rings -->
        <div class="voice-orbit voice-orbit-1"></div>
        <div class="voice-orbit voice-orbit-2"></div>
        <div class="voice-orbit voice-orbit-3"></div>

        <!-- Central orb -->
        <div class="voice-orb" id="voiceOrb" onclick="toggleVoiceMic()">
          <div class="voice-orb-glow"></div>
          <div class="voice-orb-core">
            <div class="voice-orb-icon" id="voiceOrbIcon">
              <i data-lucide="mic" width="28" height="28"></i>
            </div>
          </div>
          <!-- Waveform bars -->
          <div class="voice-waveform" id="voiceWaveform">
            ${Array.from({length: 24}, (_, i) => `<div class="voice-wave-bar" style="animation-delay: ${i * 0.06}s"></div>`).join('')}
          </div>
        </div>

        <!-- State label -->
        <div class="voice-state-label" id="voiceStateLabel">Tap to speak</div>

        <!-- Live transcript line -->
        <div class="voice-live-text" id="voiceLiveText"></div>
      </div>

      <!-- Transcript history -->
      <div class="voice-transcript" id="voiceTranscript">
        <div class="voice-transcript-header">
          <span>Conversation</span>
          <span class="voice-transcript-count">${VOICE_TRANSCRIPT.length} exchanges</span>
        </div>
        <div class="voice-transcript-body">
          ${transcriptHtml}
        </div>
      </div>

      <!-- Bottom controls -->
      <div class="voice-controls">
        <div class="voice-controls-left">
          <button class="voice-ctrl-btn" onclick="vertexAI.stopSpeaking(); setVoiceState('idle'); updateVoiceLiveText('');" title="Stop">
            <i data-lucide="square" width="16" height="16"></i>
          </button>
        </div>
        <button class="voice-mic-btn" id="voiceMicBtn" onclick="toggleVoiceMic()">
          <div class="voice-mic-pulse"></div>
          <i data-lucide="mic" width="24" height="24"></i>
        </button>
        <div class="voice-controls-right">
          <button class="voice-ctrl-btn" onclick="setTutorMode('text')" title="Switch to text">
            <i data-lucide="keyboard" width="16" height="16"></i>
          </button>
        </div>
      </div>
    </div>
  `;
}


// ── Phases View ──

function renderPhases() {
  const completedCount = PHASES.filter(p => p.status === 'completed').length;
  const totalPhases = PHASES.length;
  const overallProgress = ((completedCount + (PHASES.find(p => p.status === 'active')?.progress || 0) / 100) / totalPhases) * 100;

  const onboardingHtml = ONBOARDING.map(step => `
    <div class="onboarding-step completed">
      <div class="onboarding-step-icon">
        <i data-lucide="${step.icon}" width="14" height="14"></i>
      </div>
      <div class="onboarding-step-info">
        <span class="onboarding-step-name">${step.name}</span>
        <span class="onboarding-step-date">${step.completedDate}</span>
      </div>
      <div class="onboarding-step-check">
        <i data-lucide="check" width="12" height="12"></i>
      </div>
    </div>
  `).join('');

  const phasesHtml = PHASES.map(phase => {
    let statusLabel = '';
    if (phase.status === 'completed') statusLabel = 'Completed';
    else if (phase.status === 'active') statusLabel = 'In Progress';
    else statusLabel = 'Locked';

    return `
      <div class="phase-card ${phase.status}" onclick="togglePhaseCard(this)">
        <div class="phase-card-inner">
          <div class="phase-card-top">
            <div class="phase-card-top-left">
              <div class="phase-card-icon" style="background: ${phase.color}15; color: ${phase.color}">
                <i data-lucide="${phase.icon}" width="16" height="16"></i>
              </div>
              <span class="phase-card-number">Comp. ${String(phase.id).padStart(2, '0')}</span>
            </div>
            <span class="phase-card-status">${statusLabel}</span>
          </div>
          <div class="phase-card-title">${phase.name}</div>
          <div class="phase-card-subtitle">${phase.subtitle}</div>
          <div class="phase-card-progress">
            <div class="phase-card-progress-bar">
              <div class="phase-card-progress-fill" style="width: ${phase.progress}%"></div>
            </div>
            <span class="phase-card-progress-text">${phase.modulesCompleted}/${phase.modules}</span>
          </div>

          <div class="phase-card-expanded">
            <div class="phase-card-detail">
              <div class="phase-card-description">${phase.description}</div>
              <ul class="phase-card-competencies">
                ${phase.competencies.map(c => `<li>${c}</li>`).join('')}
              </ul>
              <div class="phase-card-meta">
                <div class="phase-card-standard"><i data-lucide="file-text" width="12" height="12"></i> ${phase.caStandard}</div>
                ${phase.completedDate ? `<div class="phase-card-date"><i data-lucide="check-circle" width="12" height="12"></i> Completed ${phase.completedDate}</div>` : ''}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');

  return `
    <div class="phases-header">
      <h1>Competency Roadmap</h1>
      <p>12 competencies to HVAC mastery — aligned to California credentialing standards</p>
      <div class="phases-progress-bar">
        <div class="phases-progress-fill" style="width: ${overallProgress.toFixed(1)}%"></div>
      </div>
    </div>

    <div class="onboarding-track">
      <div class="onboarding-track-label">Pre-Enrollment</div>
      <div class="onboarding-steps">
        ${onboardingHtml}
      </div>
    </div>

    <div class="phases-timeline">
      ${phasesHtml}
    </div>
  `;
}


// ── Analytics View ──

function renderAnalytics() {
  return `
    <div class="analytics-header">
      <h1>Performance</h1>
      <p>Track your mastery across all HVAC competency areas</p>
    </div>

    <div class="analytics-grid">
      <div class="analytics-card">
        <div class="analytics-card-title">Skill Radar</div>
        <div class="chart-container">
          <canvas id="skillRadarChart"></canvas>
        </div>
      </div>

      <div class="analytics-card">
        <div class="analytics-card-title">Phase Timeline — Actual vs Expected (weeks)</div>
        <div class="chart-container">
          <canvas id="phaseTimelineChart"></canvas>
        </div>
      </div>

      <div class="analytics-card">
        <div class="analytics-card-title">Mastery Breakdown</div>
        <div class="mastery-list">
          ${ANALYTICS_DATA.masteryBreakdown.map(item => `
            <div class="mastery-item">
              <div class="mastery-label">${item.skill}</div>
              <div class="mastery-bar-wrapper">
                <div class="mastery-bar-fill" style="width: ${item.level}%;
                  background: ${item.level >= 80 ? 'var(--success)' : item.level >= 50 ? 'var(--accent)' : 'var(--text-tertiary)'};">
                </div>
              </div>
              <div class="mastery-value">${item.level}%</div>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="analytics-card">
        <div class="analytics-card-title">Recent AI Tutor Sessions</div>
        <table class="sessions-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Topic</th>
              <th>Duration</th>
              <th>Questions</th>
            </tr>
          </thead>
          <tbody>
            ${ANALYTICS_DATA.sessions.map(s => `
              <tr>
                <td>${s.date}</td>
                <td>${s.topic}</td>
                <td>${s.duration}</td>
                <td>${s.questions}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}


function initCharts() {
  Chart.defaults.color = '#555555';
  Chart.defaults.borderColor = '#262626';
  Chart.defaults.font.family = "'Inter', sans-serif";
  Chart.defaults.font.size = 11;

  const radarCtx = document.getElementById('skillRadarChart');
  if (radarCtx) {
    new Chart(radarCtx, {
      type: 'radar',
      data: {
        labels: ANALYTICS_DATA.skillRadar.labels,
        datasets: [{
          data: ANALYTICS_DATA.skillRadar.values,
          backgroundColor: 'rgba(0, 212, 255, 0.1)',
          borderColor: 'rgba(0, 212, 255, 0.8)',
          borderWidth: 2,
          pointBackgroundColor: '#00d4ff',
          pointBorderColor: '#00d4ff',
          pointRadius: 4,
          pointHoverRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          r: {
            beginAtZero: true,
            max: 100,
            ticks: { stepSize: 25, display: false },
            grid: { color: '#1e1e1e' },
            angleLines: { color: '#1e1e1e' },
            pointLabels: { color: '#888888', font: { size: 11, weight: 450 } }
          }
        }
      }
    });
  }

  const timelineCtx = document.getElementById('phaseTimelineChart');
  if (timelineCtx) {
    new Chart(timelineCtx, {
      type: 'bar',
      data: {
        labels: ANALYTICS_DATA.phaseTimeline.labels,
        datasets: [
          {
            label: 'Actual',
            data: ANALYTICS_DATA.phaseTimeline.actual,
            backgroundColor: 'rgba(0, 212, 255, 0.6)',
            borderColor: 'rgba(0, 212, 255, 0.8)',
            borderWidth: 1,
            borderRadius: 4,
            barPercentage: 0.6
          },
          {
            label: 'Expected',
            data: ANALYTICS_DATA.phaseTimeline.expected,
            backgroundColor: 'rgba(85, 85, 85, 0.3)',
            borderColor: 'rgba(85, 85, 85, 0.5)',
            borderWidth: 1,
            borderRadius: 4,
            barPercentage: 0.6
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            align: 'end',
            labels: {
              boxWidth: 8, boxHeight: 8,
              usePointStyle: true, pointStyle: 'circle',
              padding: 16, color: '#888888', font: { size: 11 }
            }
          }
        },
        scales: {
          x: { ticks: { color: '#555555', font: { size: 10 }, maxRotation: 45 }, grid: { display: false } },
          y: { beginAtZero: true, ticks: { color: '#555555', font: { size: 10 } }, grid: { color: '#1e1e1e' } }
        }
      }
    });
  }
}
