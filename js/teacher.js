// CET — Teacher Portal Components
// Render functions for teacher views

function renderTeacherDashboard() {
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  const user = CURRENT_USER;
  const atRisk = TEACHER_STUDENTS.filter(s => s.riskLevel === 'high').length;
  const overdue = TEACHER_TASKS.filter(t => t.status === 'overdue').length;

  return `
    ${demoBanner('teacher')}

    <div class="greeting">
      <h1>Welcome back, ${user.firstName}</h1>
      <div class="greeting-date">${dateStr}</div>
    </div>

    <div class="stats-grid">
      ${TEACHER_STATS.map(stat => `
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

    <div class="section-header">Student Overview</div>
    <div class="teacher-student-grid">
      ${TEACHER_STUDENTS.map(s => `
        <div class="teacher-student-card ${s.riskLevel !== 'none' ? 'risk-' + s.riskLevel : ''}" onclick="viewStudentDetail('${s.id}')">
          <div class="teacher-student-card-top">
            <div class="avatar avatar-sm">${s.initials}</div>
            <div class="teacher-student-card-info">
              <div class="teacher-student-card-name">${s.name}</div>
              <div class="teacher-student-card-phase">Comp. ${s.currentPhase}: ${s.phaseName}</div>
            </div>
            ${s.riskLevel !== 'none' ? `<span class="risk-badge risk-${s.riskLevel}">${s.riskLevel === 'high' ? 'At Risk' : 'Behind'}</span>` : ''}
          </div>
          <div class="teacher-student-card-progress">
            <div class="teacher-student-card-bar">
              <div class="teacher-student-card-bar-fill" style="width: ${s.progress}%; background: ${s.riskLevel === 'high' ? '#ef4444' : s.riskLevel === 'medium' ? '#f59e0b' : 'var(--accent)'}"></div>
            </div>
            <span class="teacher-student-card-pct">${s.progress}%</span>
          </div>
          <div class="teacher-student-card-meta">
            <span><i data-lucide="clock" width="11" height="11"></i> ${s.lastActive}</span>
            <span><i data-lucide="flame" width="11" height="11"></i> ${s.streak} day streak</span>
          </div>
        </div>
      `).join('')}
    </div>

    <div class="section-header">Recent Activity</div>
    <div class="activity-list">
      ${TEACHER_RECENT_ACTIVITY.map(item => `
        <div class="activity-item">
          <div class="activity-icon" style="color: ${item.color}">
            <i data-lucide="${item.icon}" width="16" height="16"></i>
          </div>
          <div class="activity-content">
            <div class="activity-title">${item.title}</div>
          </div>
          <div class="activity-time">${item.time}</div>
        </div>
      `).join('')}
    </div>
  `;
}


function renderRoster() {
  const onTrack = TEACHER_STUDENTS.filter(s => s.status === 'on-track' || s.status === 'ahead').length;
  const atRisk = TEACHER_STUDENTS.filter(s => s.riskLevel !== 'none').length;

  return `
    <div class="roster-header">
      <div>
        <h1>My Students</h1>
        <p>${TEACHER_STUDENTS.length} students assigned &middot; ${onTrack} on track &middot; ${atRisk} need attention</p>
      </div>
    </div>

    <div class="roster-list">
      ${TEACHER_STUDENTS.map(s => `
        <div class="roster-row" onclick="viewStudentDetail('${s.id}')">
          <div class="roster-row-left">
            <div class="avatar avatar-sm">${s.initials}</div>
            <div class="roster-row-info">
              <div class="roster-row-name">${s.name}</div>
              <div class="roster-row-phase">Comp. ${s.currentPhase}: ${s.phaseName}</div>
            </div>
          </div>
          <div class="roster-row-center">
            <div class="roster-row-progress-bar">
              <div class="roster-row-progress-fill" style="width: ${s.progress}%; background: ${s.riskLevel === 'high' ? '#ef4444' : s.riskLevel === 'medium' ? '#f59e0b' : 'var(--accent)'}"></div>
            </div>
            <span class="roster-row-pct">${s.progress}%</span>
          </div>
          <div class="roster-row-right">
            <div class="roster-row-meta">${s.lastActive}</div>
            ${s.riskLevel !== 'none' ? `<span class="risk-badge risk-${s.riskLevel}">${s.riskLevel === 'high' ? 'At Risk' : 'Behind'}</span>` : `<span class="status-badge status-${s.status}">${s.status === 'ahead' ? 'Ahead' : 'On Track'}</span>`}
          </div>
          <div class="roster-row-arrow">
            <i data-lucide="chevron-right" width="16" height="16"></i>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}


function renderStudentDetail(studentId) {
  const student = TEACHER_STUDENTS.find(s => s.id === studentId);
  if (!student) return '<p>Student not found.</p>';

  const phaseData = PHASES[student.currentPhase - 1];
  const completedPhases = student.currentPhase - 1;

  return `
    <div class="detail-back" onclick="navigate('roster')">
      <i data-lucide="arrow-left" width="16" height="16"></i>
      Back to Roster
    </div>

    <div class="detail-header">
      <div class="avatar avatar-lg">${student.initials}</div>
      <div class="detail-header-info">
        <h1>${student.name}</h1>
        <div class="detail-header-meta">
          <span>Comp. ${student.currentPhase}: ${student.phaseName}</span>
          <span class="detail-header-divider"></span>
          <span>${student.hoursLogged} hours logged</span>
          <span class="detail-header-divider"></span>
          <span>${student.streak} day streak</span>
        </div>
      </div>
      ${student.riskLevel !== 'none' ? `<span class="risk-badge risk-${student.riskLevel}" style="font-size: 0.8rem; padding: 6px 14px;">${student.riskLevel === 'high' ? 'At Risk' : 'Behind'}</span>` : ''}
    </div>

    <div class="stats-grid" style="margin-bottom: 32px;">
      <div class="stat-card">
        <div class="stat-card-header">
          <span class="stat-card-label">Overall Progress</span>
          <span class="stat-card-icon"><i data-lucide="target" width="16" height="16"></i></span>
        </div>
        <div class="stat-card-value">${student.progress}%</div>
        <div class="stat-card-trend">${completedPhases} of 12 competencies</div>
      </div>
      <div class="stat-card">
        <div class="stat-card-header">
          <span class="stat-card-label">Current Phase</span>
          <span class="stat-card-icon"><i data-lucide="book-open" width="16" height="16"></i></span>
        </div>
        <div class="stat-card-value">${student.phaseName}</div>
        <div class="stat-card-trend">Competency ${student.currentPhase} of 12</div>
      </div>
      <div class="stat-card">
        <div class="stat-card-header">
          <span class="stat-card-label">Hours Logged</span>
          <span class="stat-card-icon"><i data-lucide="clock" width="16" height="16"></i></span>
        </div>
        <div class="stat-card-value">${student.hoursLogged}</div>
        <div class="stat-card-trend">Last active: ${student.lastActive}</div>
      </div>
      <div class="stat-card">
        <div class="stat-card-header">
          <span class="stat-card-label">Day Streak</span>
          <span class="stat-card-icon"><i data-lucide="flame" width="16" height="16"></i></span>
        </div>
        <div class="stat-card-value">${student.streak}</div>
        <div class="stat-card-trend">${student.streak > 0 ? 'Active' : 'Inactive'}</div>
      </div>
    </div>

    <div class="section-header">Competency Progress</div>
    <div class="detail-phase-grid">
      ${PHASES.map(phase => {
        let status = 'locked';
        let progress = 0;
        if (phase.id < student.currentPhase) { status = 'completed'; progress = 100; }
        else if (phase.id === student.currentPhase) { status = 'active'; progress = student.progress; }

        return `
          <div class="detail-phase-item ${status}">
            <div class="detail-phase-num">${phase.id}</div>
            <div class="detail-phase-info">
              <div class="detail-phase-name">${phase.name}</div>
              <div class="detail-phase-bar">
                <div class="detail-phase-bar-fill" style="width: ${progress}%"></div>
              </div>
            </div>
            <div class="detail-phase-status">
              ${status === 'completed' ? '<i data-lucide="check-circle" width="14" height="14"></i>' : status === 'active' ? `${progress}%` : '<i data-lucide="lock" width="14" height="14"></i>'}
            </div>
          </div>
        `;
      }).join('')}
    </div>

    <div class="detail-actions">
      <button class="detail-action-btn" onclick="navigate('tasks')">
        <i data-lucide="clipboard-list" width="16" height="16"></i>
        Assign Task
      </button>
      <button class="detail-action-btn" onclick="navigate('messages')">
        <i data-lucide="message-square" width="16" height="16"></i>
        Send Message
      </button>
    </div>
  `;
}


function renderTasks() {
  const pending = TEACHER_TASKS.filter(t => t.status === 'pending').length;
  const overdue = TEACHER_TASKS.filter(t => t.status === 'overdue').length;

  return `
    <div class="tasks-header">
      <div>
        <h1>Assignments</h1>
        <p>${TEACHER_TASKS.length} total &middot; ${pending} pending &middot; ${overdue} overdue</p>
      </div>
      <button class="tasks-create-btn">
        <i data-lucide="plus" width="16" height="16"></i>
        Create Assignment
      </button>
    </div>

    <div class="tasks-list">
      ${TEACHER_TASKS.map(task => `
        <div class="task-item ${task.status}">
          <div class="task-item-left">
            <div class="task-item-priority priority-${task.priority}"></div>
            <div class="task-item-info">
              <div class="task-item-title">${task.title}</div>
              <div class="task-item-meta">
                <span class="task-item-assignee">
                  <span class="avatar avatar-xs">${task.assignedInitials}</span>
                  ${task.assignedTo}
                </span>
              </div>
            </div>
          </div>
          <div class="task-item-right">
            <div class="task-item-due ${task.status === 'overdue' ? 'overdue' : ''}">
              <i data-lucide="calendar" width="12" height="12"></i>
              ${task.dueDate}
            </div>
            <span class="task-status-badge status-${task.status}">${task.status === 'overdue' ? 'Overdue' : task.status === 'completed' ? 'Done' : 'Pending'}</span>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}


function renderMessages() {
  const unread = TEACHER_MESSAGES.filter(m => m.unread).length;

  return `
    <div class="messages-header">
      <div>
        <h1>Messages</h1>
        <p>${unread} unread &middot; ${TEACHER_MESSAGES.length} total</p>
      </div>
      <button class="tasks-create-btn">
        <i data-lucide="edit" width="16" height="16"></i>
        New Message
      </button>
    </div>

    <div class="messages-list">
      ${TEACHER_MESSAGES.map(msg => `
        <div class="message-item ${msg.unread ? 'unread' : ''}">
          <div class="avatar avatar-sm">${msg.initials}</div>
          <div class="message-item-content">
            <div class="message-item-top">
              <span class="message-item-from">${msg.from}</span>
              <span class="message-item-time">${msg.time}</span>
            </div>
            <div class="message-item-preview">${msg.preview}</div>
          </div>
          ${msg.unread ? '<div class="message-unread-dot"></div>' : ''}
        </div>
      `).join('')}
    </div>
  `;
}
