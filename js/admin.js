// CET — Admin Portal Components
// Render functions for admin views

function renderAdminDashboard() {
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  const user = CURRENT_USER;

  return `
    ${demoBanner('admin')}

    <div class="greeting">
      <h1>Welcome back, ${user.firstName}</h1>
      <div class="greeting-date">${dateStr}</div>
    </div>

    <div class="stats-grid">
      ${ADMIN_STATS.map(stat => `
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

    <div class="section-header">Enrollment Pipeline</div>
    <div class="pipeline-container">
      ${ADMIN_ENROLLMENT_PIPELINE.map((stage, i) => {
        const maxCount = ADMIN_ENROLLMENT_PIPELINE[0].count;
        const widthPct = Math.max(30, (stage.count / maxCount) * 100);
        return `
          <div class="pipeline-stage">
            <div class="pipeline-stage-bar" style="width: ${widthPct}%; background: ${stage.color}20; border: 1px solid ${stage.color}40;">
              <div class="pipeline-stage-icon" style="color: ${stage.color}">
                <i data-lucide="${stage.icon}" width="14" height="14"></i>
              </div>
              <span class="pipeline-stage-name">${stage.stage}</span>
              <span class="pipeline-stage-count" style="color: ${stage.color}">${stage.count}</span>
            </div>
            ${i < ADMIN_ENROLLMENT_PIPELINE.length - 1 ? `<div class="pipeline-conversion">${Math.round((ADMIN_ENROLLMENT_PIPELINE[i + 1].count / stage.count) * 100)}% →</div>` : ''}
          </div>
        `;
      }).join('')}
    </div>

    <div class="section-header">Quick Links</div>
    <div class="admin-quick-links">
      <button class="admin-quick-link" onclick="navigate('admin-students')">
        <i data-lucide="users" width="20" height="20"></i>
        <span>All Students</span>
        <span class="admin-quick-link-count">${ADMIN_ALL_STUDENTS.length}</span>
      </button>
      <button class="admin-quick-link" onclick="navigate('faculty')">
        <i data-lucide="book-open" width="20" height="20"></i>
        <span>Faculty</span>
        <span class="admin-quick-link-count">${ADMIN_FACULTY.length}</span>
      </button>
      <button class="admin-quick-link" onclick="navigate('program-analytics')">
        <i data-lucide="bar-chart-3" width="20" height="20"></i>
        <span>Analytics</span>
      </button>
      <button class="admin-quick-link" onclick="navigate('enrollment')">
        <i data-lucide="user-plus" width="20" height="20"></i>
        <span>Enrollment</span>
        <span class="admin-quick-link-count">${ADMIN_ENROLLMENT_PIPELINE[3].count} new</span>
      </button>
    </div>

    <div class="section-header">Faculty Overview</div>
    <div class="admin-faculty-summary">
      ${ADMIN_FACULTY.map(f => `
        <div class="admin-faculty-row">
          <div class="avatar avatar-sm">${f.initials}</div>
          <div class="admin-faculty-row-info">
            <div class="admin-faculty-row-name">${f.name}</div>
            <div class="admin-faculty-row-role">${f.role}</div>
          </div>
          <div class="admin-faculty-row-stats">
            <span>${f.students} students</span>
            <span>${f.avgProgress}% avg</span>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}


function renderAdminStudents() {
  const statusCounts = {
    total: ADMIN_ALL_STUDENTS.length,
    onTrack: ADMIN_ALL_STUDENTS.filter(s => s.status === 'on-track').length,
    ahead: ADMIN_ALL_STUDENTS.filter(s => s.status === 'ahead').length,
    behind: ADMIN_ALL_STUDENTS.filter(s => s.status === 'behind').length,
    atRisk: ADMIN_ALL_STUDENTS.filter(s => s.status === 'at-risk').length
  };

  return `
    <div class="admin-students-header">
      <div>
        <h1>All Students</h1>
        <p>${statusCounts.total} enrolled &middot; ${statusCounts.onTrack + statusCounts.ahead} on track &middot; ${statusCounts.behind + statusCounts.atRisk} need attention</p>
      </div>
      <div class="admin-search">
        <i data-lucide="search" width="14" height="14"></i>
        <input type="text" placeholder="Search students..." class="admin-search-input">
      </div>
    </div>

    <table class="admin-table">
      <thead>
        <tr>
          <th>Student</th>
          <th>Instructor</th>
          <th>Current Phase</th>
          <th>Progress</th>
          <th>Status</th>
          <th>Enrolled</th>
        </tr>
      </thead>
      <tbody>
        ${ADMIN_ALL_STUDENTS.map(s => `
          <tr>
            <td>
              <div class="admin-table-student">
                <div class="avatar avatar-xs">${s.initials}</div>
                <span>${s.name}</span>
              </div>
            </td>
            <td>${s.instructor}</td>
            <td>Comp. ${s.currentPhase}: ${s.phaseName}</td>
            <td>
              <div class="admin-table-progress">
                <div class="admin-table-progress-bar">
                  <div class="admin-table-progress-fill" style="width: ${s.progress}%; background: ${s.status === 'at-risk' ? '#ef4444' : s.status === 'behind' ? '#f59e0b' : 'var(--accent)'}"></div>
                </div>
                <span>${s.progress}%</span>
              </div>
            </td>
            <td><span class="status-badge status-${s.status}">${s.status === 'on-track' ? 'On Track' : s.status === 'ahead' ? 'Ahead' : s.status === 'behind' ? 'Behind' : 'At Risk'}</span></td>
            <td>${s.enrollDate}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}


function renderFaculty() {
  const totalStudents = ADMIN_FACULTY.reduce((sum, f) => sum + f.students, 0);

  return `
    <div class="faculty-header">
      <div>
        <h1>Faculty</h1>
        <p>${ADMIN_FACULTY.length} instructors &middot; ${totalStudents} total students</p>
      </div>
    </div>

    <div class="faculty-grid">
      ${ADMIN_FACULTY.map(f => `
        <div class="faculty-card">
          <div class="faculty-card-top">
            <div class="avatar avatar-md">${f.initials}</div>
            <div class="faculty-card-info">
              <div class="faculty-card-name">${f.name}</div>
              <div class="faculty-card-role">${f.role}</div>
              <div class="faculty-card-email">${f.email}</div>
            </div>
          </div>
          <div class="faculty-card-stats">
            <div class="faculty-card-stat">
              <div class="faculty-card-stat-value">${f.students}</div>
              <div class="faculty-card-stat-label">Students</div>
            </div>
            <div class="faculty-card-stat">
              <div class="faculty-card-stat-value">${f.avgProgress}%</div>
              <div class="faculty-card-stat-label">Avg. Progress</div>
            </div>
            <div class="faculty-card-stat">
              <div class="faculty-card-stat-value">${f.department}</div>
              <div class="faculty-card-stat-label">Department</div>
            </div>
          </div>
          <div class="faculty-card-status">
            <span class="sync-dot"></span> ${f.status === 'active' ? 'Active' : 'Inactive'}
          </div>
        </div>
      `).join('')}
    </div>
  `;
}


function renderProgramAnalytics() {
  return `
    <div class="analytics-header">
      <h1>Program Analytics</h1>
      <p>Program-wide performance metrics and trends</p>
    </div>

    <div class="stats-grid" style="margin-bottom: 32px;">
      ${ADMIN_STATS.map(stat => `
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

    <div class="analytics-grid">
      <div class="analytics-card">
        <div class="analytics-card-title">Students by Phase</div>
        <div class="chart-container">
          <canvas id="adminPhaseChart"></canvas>
        </div>
      </div>

      <div class="analytics-card">
        <div class="analytics-card-title">Monthly Enrollment</div>
        <div class="chart-container">
          <canvas id="adminEnrollChart"></canvas>
        </div>
      </div>

      <div class="analytics-card">
        <div class="analytics-card-title">Student Status Distribution</div>
        <div class="admin-status-breakdown">
          ${[
            { label: 'On Track', count: ADMIN_ALL_STUDENTS.filter(s => s.status === 'on-track').length, color: '#22c55e' },
            { label: 'Ahead', count: ADMIN_ALL_STUDENTS.filter(s => s.status === 'ahead').length, color: '#00d4ff' },
            { label: 'Behind', count: ADMIN_ALL_STUDENTS.filter(s => s.status === 'behind').length, color: '#f59e0b' },
            { label: 'At Risk', count: ADMIN_ALL_STUDENTS.filter(s => s.status === 'at-risk').length, color: '#ef4444' }
          ].map(item => `
            <div class="admin-status-row">
              <div class="admin-status-label">
                <span class="admin-status-dot" style="background: ${item.color}"></span>
                ${item.label}
              </div>
              <div class="admin-status-bar-wrapper">
                <div class="admin-status-bar" style="width: ${(item.count / ADMIN_ALL_STUDENTS.length) * 100}%; background: ${item.color}"></div>
              </div>
              <span class="admin-status-count">${item.count}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="analytics-card">
        <div class="analytics-card-title">Instructor Performance</div>
        <table class="sessions-table">
          <thead>
            <tr>
              <th>Instructor</th>
              <th>Students</th>
              <th>Avg. Progress</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${ADMIN_FACULTY.map(f => `
              <tr>
                <td>${f.name}</td>
                <td>${f.students}</td>
                <td>${f.avgProgress}%</td>
                <td><span class="status-badge status-on-track">Active</span></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}


function renderEnrollment() {
  const totalPipeline = ADMIN_ENROLLMENT_PIPELINE.reduce((sum, s) => sum + s.count, 0);

  return `
    <div class="enrollment-header">
      <div>
        <h1>Enrollment</h1>
        <p>Current admissions pipeline and enrollment tracking</p>
      </div>
    </div>

    <div class="pipeline-container pipeline-large">
      ${ADMIN_ENROLLMENT_PIPELINE.map((stage, i) => {
        const maxCount = ADMIN_ENROLLMENT_PIPELINE[0].count;
        const widthPct = Math.max(35, (stage.count / maxCount) * 100);
        const convRate = i < ADMIN_ENROLLMENT_PIPELINE.length - 1
          ? Math.round((ADMIN_ENROLLMENT_PIPELINE[i + 1].count / stage.count) * 100)
          : null;

        return `
          <div class="pipeline-stage-lg">
            <div class="pipeline-stage-bar-lg" style="width: ${widthPct}%; background: ${stage.color}15; border: 1px solid ${stage.color}40;">
              <div class="pipeline-stage-icon-lg" style="background: ${stage.color}20; color: ${stage.color}">
                <i data-lucide="${stage.icon}" width="18" height="18"></i>
              </div>
              <div class="pipeline-stage-info-lg">
                <div class="pipeline-stage-name-lg">${stage.stage}</div>
                <div class="pipeline-stage-count-lg" style="color: ${stage.color}">${stage.count}</div>
              </div>
            </div>
            ${convRate !== null ? `<div class="pipeline-conversion-lg">${convRate}% conversion →</div>` : ''}
          </div>
        `;
      }).join('')}
    </div>

    <div class="section-header" style="margin-top: 40px;">Recent Enrollees</div>
    <div class="enrollment-recent">
      ${ADMIN_ALL_STUDENTS.slice(0, 6).map(s => `
        <div class="enrollment-recent-row">
          <div class="avatar avatar-sm">${s.initials}</div>
          <div class="enrollment-recent-info">
            <div class="enrollment-recent-name">${s.name}</div>
            <div class="enrollment-recent-meta">Enrolled ${s.enrollDate} &middot; Instructor: ${s.instructor}</div>
          </div>
          <span class="status-badge status-${s.status}">${s.status === 'on-track' ? 'On Track' : s.status === 'ahead' ? 'Ahead' : s.status === 'behind' ? 'Behind' : 'At Risk'}</span>
        </div>
      `).join('')}
    </div>
  `;
}


function initAdminCharts() {
  Chart.defaults.color = '#555555';
  Chart.defaults.borderColor = '#262626';
  Chart.defaults.font.family = "'Inter', sans-serif";
  Chart.defaults.font.size = 11;

  const phaseCtx = document.getElementById('adminPhaseChart');
  if (phaseCtx) {
    new Chart(phaseCtx, {
      type: 'bar',
      data: {
        labels: ADMIN_PROGRAM_STATS.completionByPhase.labels,
        datasets: [{
          label: 'Students',
          data: ADMIN_PROGRAM_STATS.completionByPhase.students,
          backgroundColor: 'rgba(0, 212, 255, 0.6)',
          borderColor: 'rgba(0, 212, 255, 0.8)',
          borderWidth: 1,
          borderRadius: 4
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { beginAtZero: true, grid: { color: '#1e1e1e' }, ticks: { color: '#555' } },
          y: { grid: { display: false }, ticks: { color: '#888', font: { size: 10 } } }
        }
      }
    });
  }

  const enrollCtx = document.getElementById('adminEnrollChart');
  if (enrollCtx) {
    new Chart(enrollCtx, {
      type: 'bar',
      data: {
        labels: ADMIN_PROGRAM_STATS.monthlyEnrollment.labels,
        datasets: [{
          label: 'New Enrollments',
          data: ADMIN_PROGRAM_STATS.monthlyEnrollment.values,
          backgroundColor: 'rgba(34, 197, 94, 0.6)',
          borderColor: 'rgba(34, 197, 94, 0.8)',
          borderWidth: 1,
          borderRadius: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { display: false }, ticks: { color: '#555' } },
          y: { beginAtZero: true, grid: { color: '#1e1e1e' }, ticks: { color: '#555', stepSize: 5 } }
        }
      }
    });
  }
}
