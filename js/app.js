// CET — App Controller
// Login, navigation, routing, event handlers

let currentRole = null;
let currentView = null;
let selectedStudentId = null;
let tutorMode = 'text'; // 'text' or 'voice'
let voiceState = 'idle'; // 'idle', 'listening', 'processing', 'speaking'
let voiceStateTimer = null;
let typewriterTimer = null;
let isStreaming = false;


// ── Login / Logout ──

function login(role) {
  currentRole = role;
  CURRENT_USER = DEMO_USERS[role];

  document.getElementById('loginScreen').classList.remove('active');
  document.getElementById('app').classList.add('active');
  document.getElementById('mobileHeader').classList.add('active');

  // Build sidebar for this role
  const sidebar = document.getElementById('sidebar');
  sidebar.innerHTML = renderSidebar(role);
  lucide.createIcons();

  // Create view containers for this role
  setupPortal(role);

  // Navigate to default view
  const defaultView = ROLES[role].defaultView;
  navigate(defaultView);

  if (role === 'student') {
    updateSettingsStatus();
  }
}

function logout() {
  currentRole = null;
  CURRENT_USER = null;
  currentView = null;
  selectedStudentId = null;
  tutorMode = 'text';
  voiceState = 'idle';
  clearVoiceTimers();

  document.getElementById('loginScreen').classList.add('active');
  document.getElementById('app').classList.remove('active');
  document.getElementById('mobileHeader').classList.remove('active');

  // Clear portal
  document.getElementById('mainContent').innerHTML = '';
  document.getElementById('sidebar').innerHTML = '';

  closeSidebar();
}

function setupPortal(role) {
  const main = document.getElementById('mainContent');
  const views = ROLE_VIEWS[role];
  main.innerHTML = views.map(v => `<div class="view" id="view-${v}"></div>`).join('');
}


// ── Navigation ──

function navigate(view) {
  currentView = view;

  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.toggle('active', item.dataset.view === view);
  });

  document.querySelectorAll('.view').forEach(v => {
    v.classList.remove('active');
  });

  const target = document.getElementById(`view-${view}`);
  if (target) {
    target.classList.add('active');
    renderView(view);
  }

  closeSidebar();
  const main = document.getElementById('mainContent');
  if (main) main.scrollTop = 0;
}

function renderView(view) {
  const container = document.getElementById(`view-${view}`);
  if (!container) return;

  switch (view) {
    // Student views
    case 'dashboard':
      container.innerHTML = renderDashboard();
      break;
    case 'chat':
      if (tutorMode === 'voice') {
        container.innerHTML = renderVoiceMode();
      } else {
        container.innerHTML = renderChat();
        scrollChatToBottom();
      }
      break;
    case 'phases':
      container.innerHTML = renderPhases();
      break;
    case 'analytics':
      container.innerHTML = renderAnalytics();
      requestAnimationFrame(() => initCharts());
      break;
    case 'notifications':
      container.innerHTML = renderNotifications();
      break;

    // Teacher views
    case 'teacher-dashboard':
      container.innerHTML = renderTeacherDashboard();
      break;
    case 'roster':
      container.innerHTML = renderRoster();
      break;
    case 'student-detail':
      container.innerHTML = renderStudentDetail(selectedStudentId);
      break;
    case 'tasks':
      container.innerHTML = renderTasks();
      break;
    case 'messages':
      container.innerHTML = renderMessages();
      break;

    // Admin views
    case 'admin-dashboard':
      container.innerHTML = renderAdminDashboard();
      break;
    case 'admin-students':
      container.innerHTML = renderAdminStudents();
      break;
    case 'faculty':
      container.innerHTML = renderFaculty();
      break;
    case 'program-analytics':
      container.innerHTML = renderProgramAnalytics();
      requestAnimationFrame(() => initAdminCharts());
      break;
    case 'enrollment':
      container.innerHTML = renderEnrollment();
      break;
  }

  lucide.createIcons();
}

function viewStudentDetail(studentId) {
  selectedStudentId = studentId;

  // Ensure the student-detail view container exists
  let detailView = document.getElementById('view-student-detail');
  if (!detailView) {
    detailView = document.createElement('div');
    detailView.className = 'view';
    detailView.id = 'view-student-detail';
    document.getElementById('mainContent').appendChild(detailView);
  }

  // Hide all views, show detail
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  detailView.classList.add('active');
  detailView.innerHTML = renderStudentDetail(studentId);
  lucide.createIcons();

  // Update nav active state
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.remove('active');
  });

  document.getElementById('mainContent').scrollTop = 0;
}


// ── Chat Interactions ──

function handleChatKeydown(event) {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    sendMessage();
  }
}

let msgCounter = 0;

function sendMessage() {
  const input = document.getElementById('chatInput');
  const text = input.value.trim();
  if (!text || isStreaming) return;

  const messagesContainer = document.getElementById('chatMessages');
  const now = new Date();
  const timeStr = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

  // Add user message
  const userMsg = document.createElement('div');
  userMsg.className = 'chat-message user';
  userMsg.innerHTML = `
    <div class="chat-message-avatar">${STUDENT.avatarInitials}</div>
    <div class="chat-message-body">
      <div class="chat-message-bubble"><p>${escapeHtml(text)}</p></div>
      <div class="chat-message-time">${timeStr}</div>
    </div>
  `;
  messagesContainer.appendChild(userMsg);
  lucide.createIcons();

  input.value = '';
  scrollChatToBottom();

  // Unique IDs for this message
  const id = ++msgCounter;
  const bubbleId = `bubble-${id}`;
  const dotsId = `dots-${id}`;

  // Show typing / streaming indicator
  const aiMsg = document.createElement('div');
  aiMsg.className = 'chat-message assistant';
  aiMsg.innerHTML = `
    <div class="chat-message-avatar">CET</div>
    <div class="chat-message-body">
      <div class="chat-message-bubble" id="${bubbleId}">
        <div class="typing-indicator" id="${dotsId}">
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
        </div>
      </div>
      <div class="chat-message-time">${timeStr}</div>
    </div>
  `;
  messagesContainer.appendChild(aiMsg);
  scrollChatToBottom();

  if (vertexAI.isConfigured) {
    streamResponse(text, bubbleId, dotsId);
  } else {
    setTimeout(() => {
      const bubble = document.getElementById(bubbleId);
      if (bubble) {
        bubble.innerHTML = `
          <p>To get real AI responses, add your OpenAI API key in <strong>Settings</strong> (bottom of the sidebar).</p>
          <p>Once configured, I'll provide detailed, contextual answers about HVAC systems, California codes, and your current curriculum.</p>
        `;
      }
    }, 1200);
  }
}

async function streamResponse(userMessage, bubbleId, dotsId) {
  isStreaming = true;
  const bubble = document.getElementById(bubbleId);
  const dots = document.getElementById(dotsId);
  let responseText = '';
  let firstChunk = true;

  await vertexAI.chatStream(
    userMessage,
    (chunk) => {
      if (firstChunk && dots) {
        dots.remove();
        firstChunk = false;
      }
      responseText += chunk;
      if (bubble) {
        bubble.innerHTML = formatStreamedContent(stripSuggestions(responseText));
      }
      scrollChatToBottom();
    },
    () => {
      isStreaming = false;
      const suggestions = parseSuggestions(responseText);
      const cleanText = stripSuggestions(responseText);
      if (bubble) {
        bubble.innerHTML = formatStreamedContent(cleanText);
      }
      if (suggestions.length) {
        updateSuggestionChips(suggestions);
      }
      scrollChatToBottom();
    }
  );
}

function formatStreamedContent(text) {
  return markdownToHtml(text);
}

// ── Dynamic Suggestions ──

function parseSuggestions(text) {
  const match = text.match(/<suggestions>(.*?)<\/suggestions>/s);
  if (!match) return [];
  return match[1].split('|').map(s => s.trim()).filter(Boolean).slice(0, 4);
}

function stripSuggestions(text) {
  return text.replace(/<suggestions>.*?<\/suggestions>/s, '').trimEnd();
}

function stripMarkdownForTTS(text) {
  return text
    .replace(/```[\s\S]*?```/g, '')        // code blocks
    .replace(/`([^`]+)`/g, '$1')           // inline code
    .replace(/#{1,6}\s+/g, '')             // headings
    .replace(/\*\*\*(.+?)\*\*\*/g, '$1')  // bold italic
    .replace(/\*\*(.+?)\*\*/g, '$1')      // bold
    .replace(/\*(.+?)\*/g, '$1')          // italic
    .replace(/^[-*+]\s+/gm, '')            // unordered list markers
    .replace(/^\d+\.\s+/gm, '')            // ordered list markers
    .replace(/^---+$/gm, '')               // horizontal rules
    .replace(/\n{3,}/g, '\n\n')            // collapse extra newlines
    .trim();
}

function suggestionIcon(text) {
  const t = text.toLowerCase();
  if (/quiz|test|check/.test(t)) return 'help-circle';
  if (/explain|what|how|why/.test(t)) return 'book-open';
  if (/diagram|show|draw/.test(t)) return 'image';
  if (/walk|step|procedure|troubleshoot/.test(t)) return 'play-circle';
  if (/calculate|math|formula/.test(t)) return 'calculator';
  if (/compare|vs|difference/.test(t)) return 'git-branch';
  if (/practice|scenario|service call/.test(t)) return 'wrench';
  if (/next|continue|move on/.test(t)) return 'arrow-right';
  return 'message-square';
}

function updateSuggestionChips(suggestions) {
  const container = document.querySelector('.chat-suggestions');
  if (!container) return;
  container.innerHTML = suggestions.map(s =>
    `<button class="chat-suggestion" onclick="insertSuggestion(this, '${s.replace(/'/g, "\\'")}')">
      <i data-lucide="${suggestionIcon(s)}" width="12" height="12"></i>
      ${s}
    </button>`
  ).join('');
  lucide.createIcons();
}

function insertSuggestion(btn, text) {
  const input = document.getElementById('chatInput');
  input.value = text;
  input.focus();
}

function scrollChatToBottom() {
  requestAnimationFrame(() => {
    const container = document.getElementById('chatMessages');
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  });
}


// ── Voice Mode ──

function setTutorMode(mode) {
  tutorMode = mode;
  clearVoiceTimers();
  voiceState = 'idle';
  vertexAI.stopSpeaking();

  const container = document.getElementById('view-chat');
  if (mode === 'voice') {
    container.innerHTML = renderVoiceMode();
  } else {
    container.innerHTML = renderChat();
    scrollChatToBottom();
  }
  lucide.createIcons();
}

async function toggleVoiceMic() {
  if (voiceState === 'idle') {
    if (vertexAI.isConfigured) {
      await startRealVoiceSession();
    } else {
      setVoiceState('listening');
      voiceStateTimer = setTimeout(() => {
        setVoiceState('processing');
        voiceStateTimer = setTimeout(() => {
          setVoiceState('speaking');
          typewriteResponse();
        }, 2200);
      }, 3500);
    }
  } else if (voiceState === 'listening' && vertexAI.isConfigured) {
    await stopAndProcessVoice();
  } else {
    clearVoiceTimers();
    vertexAI.abortChat();
    vertexAI.stopSpeaking();
    if (voiceState === 'listening') {
      await vertexAI.stopRecording();
    }
    setVoiceState('idle');
    updateVoiceLiveText('');
  }
}

async function startRealVoiceSession() {
  setVoiceState('listening');
  const micBtn = document.getElementById('voiceMicBtn');
  if (micBtn) micBtn.classList.add('active');

  const started = await vertexAI.startRecording();
  if (!started) {
    setVoiceState('idle');
    updateVoiceLiveText('Microphone access denied. Check browser permissions.');
    return;
  }
}

async function stopAndProcessVoice() {
  setVoiceState('processing');
  const audioBlob = await vertexAI.stopRecording();

  if (!audioBlob || audioBlob.size < 1000) {
    setVoiceState('idle');
    updateVoiceLiveText('No audio detected. Try again.');
    setTimeout(() => updateVoiceLiveText(''), 2000);
    return;
  }

  updateVoiceLiveText('Transcribing...');
  const transcript = await vertexAI.transcribe(audioBlob);

  if (!transcript) {
    setVoiceState('idle');
    updateVoiceLiveText('Could not transcribe audio. Try again.');
    setTimeout(() => updateVoiceLiveText(''), 2000);
    return;
  }

  addVoiceTranscriptLine('user', transcript);
  updateVoiceLiveText('');
  setVoiceState('processing');

  // Collect the full streamed response — voice mode gets a conversational nudge
  const voicePrompt = `[VOICE MODE — The student is speaking aloud. Respond like you're talking back: warm, conversational, 2-4 sentences max. Use simple language. Light markdown is fine (bold key terms) but skip headers, lists, and code blocks. Be encouraging and direct.]\n\n${transcript}`;
  let fullResponse = '';
  await vertexAI.chatStream(
    voicePrompt,
    (chunk) => { fullResponse += chunk; },
    () => {} // handled below
  );

  if (!fullResponse) {
    setVoiceState('idle');
    return;
  }

  // Strip suggestions tag before display and speech
  const cleanText = stripSuggestions(fullResponse);
  const suggestions = parseSuggestions(fullResponse);

  addVoiceTranscriptLine('assistant', cleanText);
  setVoiceState('speaking');
  updateVoiceLiveText(cleanText);

  // Speak the response (strip markdown for natural TTS)
  await vertexAI.speak(stripMarkdownForTTS(cleanText));

  setVoiceState('idle');
  updateVoiceLiveText('');

  // Update chat suggestions if user switches back to text mode
  if (suggestions.length) {
    updateSuggestionChips(suggestions);
  }
}

function addVoiceTranscriptLine(role, text) {
  const body = document.querySelector('.voice-transcript-body');
  if (!body) return;

  const line = document.createElement('div');
  line.className = `voice-transcript-line ${role}`;
  const content = role === 'assistant' ? markdownToHtml(text) : escapeHtml(text);
  line.innerHTML = `
    <span class="voice-transcript-speaker">${role === 'user' ? STUDENT.firstName : 'CET'}</span>
    <div class="voice-transcript-text">${content}</div>
  `;
  body.appendChild(line);
  lucide.createIcons({ nodes: [line] });

  const count = document.querySelector('.voice-transcript-count');
  if (count) {
    const lines = body.querySelectorAll('.voice-transcript-line').length;
    count.textContent = `${lines} exchanges`;
  }

  const transcript = document.getElementById('voiceTranscript');
  if (transcript) transcript.scrollTop = transcript.scrollHeight;
}

function updateVoiceLiveText(text) {
  const el = document.getElementById('voiceLiveText');
  if (!el) return;
  if (!text) { el.innerHTML = ''; return; }
  el.innerHTML = markdownToHtml(text);
}

function cycleVoiceState() {
  clearVoiceTimers();
  const states = ['idle', 'listening', 'processing', 'speaking'];
  const nextIdx = (states.indexOf(voiceState) + 1) % states.length;
  setVoiceState(states[nextIdx]);

  if (states[nextIdx] === 'speaking') {
    typewriteResponse();
  }
}

function setVoiceState(state) {
  voiceState = state;

  const stage = document.getElementById('voiceStage');
  const label = document.getElementById('voiceStateLabel');
  const micBtn = document.getElementById('voiceMicBtn');
  const orbIcon = document.getElementById('voiceOrbIcon');
  if (!stage) return;

  stage.className = 'voice-stage';
  stage.classList.add('voice-state-' + state);

  if (micBtn) {
    micBtn.classList.toggle('active', state === 'listening');
  }

  // Update orb icon per state
  const iconMap = { idle: 'mic', listening: 'mic-off', processing: 'loader', speaking: 'volume-2' };
  if (orbIcon) {
    orbIcon.innerHTML = `<i data-lucide="${iconMap[state]}" width="28" height="28"></i>`;
    lucide.createIcons({ nodes: [orbIcon] });
  }

  switch (state) {
    case 'idle':
      if (label) { label.textContent = 'Tap to speak'; label.className = 'voice-state-label'; }
      break;
    case 'listening':
      if (label) { label.textContent = 'Listening — tap to stop'; label.className = 'voice-state-label listening'; }
      break;
    case 'processing':
      if (label) { label.textContent = 'Thinking'; label.className = 'voice-state-label processing'; }
      break;
    case 'speaking':
      if (label) { label.textContent = 'Speaking'; label.className = 'voice-state-label speaking'; }
      break;
  }
}

function typewriteResponse() {
  const liveText = document.getElementById('voiceLiveText');
  if (!liveText) return;

  const response = VOICE_TRANSCRIPT[VOICE_TRANSCRIPT.length - 1].text;
  let i = 0;
  liveText.textContent = '';

  function type() {
    if (i < response.length && voiceState === 'speaking') {
      liveText.textContent = response.substring(0, i + 1);
      i++;
      const delay = response[i - 1] === '.' ? 120 : response[i - 1] === ',' ? 80 : 22;
      typewriterTimer = setTimeout(type, delay);
    } else if (i >= response.length) {
      setTimeout(() => {
        if (voiceState === 'speaking') setVoiceState('idle');
      }, 1500);
    }
  }
  type();
}

function clearVoiceTimers() {
  if (voiceStateTimer) { clearTimeout(voiceStateTimer); voiceStateTimer = null; }
  if (typewriterTimer) { clearTimeout(typewriterTimer); typewriterTimer = null; }
}


// ── Settings ──

function openSettings() {
  const overlay = document.getElementById('settingsOverlay');
  overlay.classList.add('active');

  document.getElementById('settingApiKey').value = vertexAI.apiKey;
  document.getElementById('settingModel').value = vertexAI.model;

  document.querySelectorAll('.voice-option').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.voice === vertexAI.ttsVoice);
  });

  document.getElementById('settingTestResult').textContent = '';
  lucide.createIcons();
}

function closeSettings(event) {
  if (event && event.target !== event.currentTarget) return;
  document.getElementById('settingsOverlay').classList.remove('active');
}

function saveSettings() {
  const apiKey = document.getElementById('settingApiKey').value.trim();
  const model = document.getElementById('settingModel').value;
  const activeVoice = document.querySelector('.voice-option.active');
  const ttsVoice = activeVoice ? activeVoice.dataset.voice : 'nova';

  vertexAI.saveSettings({ apiKey, model, ttsVoice });
  updateSettingsStatus();
  closeSettings();
}

function selectVoice(voice) {
  document.querySelectorAll('.voice-option').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.voice === voice);
  });
}

function toggleKeyVisibility() {
  const input = document.getElementById('settingApiKey');
  const isPassword = input.type === 'password';
  input.type = isPassword ? 'text' : 'password';
}

async function testApiConnection() {
  const btn = document.getElementById('settingTestBtn');
  const result = document.getElementById('settingTestResult');

  const tempKey = document.getElementById('settingApiKey').value.trim();
  const originalKey = vertexAI.apiKey;
  vertexAI.apiKey = tempKey;

  btn.disabled = true;
  btn.querySelector('span').textContent = 'Testing...';
  result.textContent = '';
  result.className = 'setting-test-result';

  const test = await vertexAI.testConnection();

  btn.disabled = false;
  btn.querySelector('span').textContent = 'Test Connection';
  result.textContent = test.message;
  result.className = 'setting-test-result ' + (test.ok ? 'success' : 'error');

  vertexAI.apiKey = originalKey;
}

function updateSettingsStatus() {
  const dot = document.getElementById('settingsStatus');
  if (dot) {
    if (vertexAI.isConfigured) {
      dot.className = 'settings-status connected';
      dot.title = 'API key configured';
    } else {
      dot.className = 'settings-status';
      dot.title = '';
    }
  }
}


// ── Phase Card Toggle ──

function togglePhaseCard(card) {
  const wasOpen = card.classList.contains('open');
  document.querySelectorAll('.phase-card').forEach(c => c.classList.remove('open'));
  if (!wasOpen) card.classList.add('open');
}


// ── Mobile Sidebar ──

function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');
  sidebar.classList.toggle('open');
  overlay.classList.toggle('active');
}

function closeSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');
  sidebar.classList.remove('open');
  overlay.classList.remove('active');
}


// ── Utilities ──

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}


// ── Initialize ──

function init() {
  // Render login screen
  const loginScreen = document.getElementById('loginScreen');
  loginScreen.innerHTML = renderLogin();
  lucide.createIcons();
}

document.addEventListener('DOMContentLoaded', init);
