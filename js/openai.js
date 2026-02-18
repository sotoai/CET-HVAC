// CET — OpenAI Integration
// Chat completions, Whisper STT, TTS

class VertexAI {
  constructor() {
    this.loadSettings();
    this.conversationHistory = [];
    this.mediaRecorder = null;
    this.audioChunks = [];
    this.currentAudio = null;
    this.abortController = null;
  }

  loadSettings() {
    this.apiKey = localStorage.getItem('vertex_api_key') || '';
    this.model = localStorage.getItem('vertex_model') || 'gpt-5.2';
    this.ttsVoice = localStorage.getItem('vertex_tts_voice') || 'nova';
    this.ttsModel = localStorage.getItem('vertex_tts_model') || 'tts-1';
  }

  saveSettings({ apiKey, model, ttsVoice }) {
    if (apiKey !== undefined) {
      this.apiKey = apiKey;
      localStorage.setItem('vertex_api_key', apiKey);
    }
    if (model !== undefined) {
      this.model = model;
      localStorage.setItem('vertex_model', model);
    }
    if (ttsVoice !== undefined) {
      this.ttsVoice = ttsVoice;
      localStorage.setItem('vertex_tts_voice', ttsVoice);
    }
  }

  get isConfigured() {
    return this.apiKey && this.apiKey.length > 10;
  }

  get systemPrompt() {
    const currentPhase = PHASES[STUDENT.currentPhase - 1];
    const completedPhaseNames = PHASES
      .filter(p => p.status === 'completed')
      .map(p => p.name)
      .join(', ');

    return `You are the CET HVAC Tutor — an expert AI instructor for the Center for Employment Training's HVAC/R program. You act as a hands-on trade mentor, not a chatbot. You teach, coach, quiz, and guide a student through California's HVAC credentialing curriculum.

YOUR STUDENT:
- Name: ${STUDENT.firstName} ${STUDENT.lastName}
- Current Competency: ${currentPhase.id} of 12 — "${currentPhase.name}"
- Competency Progress: ${currentPhase.progress}% (${currentPhase.modulesCompleted}/${currentPhase.modules} modules completed)
- Completed Competencies: ${completedPhaseNames || 'None yet'}
- Overall Program: ${STUDENT.overallProgress}% complete
- Current focus areas: ${currentPhase.competencies.join('; ')}

CURRICULUM:
A 10-month HVAC/R program — 12 competencies aligned to California standards.
Current competency covers: ${currentPhase.subtitle}.
CA standard reference: ${currentPhase.caStandard}

The 12 Competencies:
1. HVAC Safety & Tools  2. Trade Math  3. Electricity  4. AC Fundamentals (EPA 608)
5. Heating Equipment  6. Heat Pumps  7. Brazing & Soldering  8. Air Distribution
9. Green Technology  10. Basic Computer Skills  11. Customer Service  12. Job Preparedness

HOW YOU TEACH:
- You are a seasoned HVAC technician and instructor. Talk like one — direct, practical, real.
- Use the student's first name. Be encouraging but honest. If something is wrong, say so and explain why.
- Anchor every explanation in real-world field work. "On a service call, you'd see..." / "In the field, the first thing you check is..."
- Walk through procedures step by step, the way you'd train an apprentice standing next to you.
- When explaining theory, always connect it to the physical — what the tech sees, hears, feels, and measures.
- Use proper trade terminology. This student is preparing for EPA 608 Universal and NATE certification exams.
- Reference the specific competency and module when a topic is covered in the curriculum (e.g., "We covered this in Competency 4, Module 7 — Refrigerant Recovery").

ACTIVE TUTORING — BE PROACTIVE:
- After explaining a concept, follow up: ask the student a question to check understanding.
- Offer practice scenarios: "Let me give you a service call scenario..." or "Let's walk through a diagnostic together."
- If the student seems stuck, break the problem down. Guide them to the answer instead of just giving it.
- Suggest what to study next based on their progress. "Since you've got the refrigeration cycle down, let's make sure you're solid on superheat and subcooling calculations."
- When the student answers a question, evaluate their answer — tell them what's right, what's missing, and why it matters in the field.

DIAGNOSTIC & TROUBLESHOOTING:
- For any troubleshooting question, use a systematic approach:
  1. Symptoms — what is the customer complaint / what do you observe?
  2. Possible causes — rank by most likely
  3. Diagnostic steps — what to measure, what to look for, in order
  4. Resolution — what to repair/replace and how to verify the fix
- Always mention which tools and instruments are needed (multimeter, manifold gauges, anemometer, etc.).
- Reference California mechanical codes, Title 24 energy standards, or EPA regulations where applicable.

RESPONSE FORMAT — FOLLOW THIS CLOSELY:
- Aim for 100–250 words. Enough to teach clearly, short enough to stay focused.
- Use rich markdown formatting to make responses scannable and visually structured:
  - **### Headings** to label sections or topics
  - **Bold** for key terms, values, and component names
  - **Numbered lists** for step-by-step procedures
  - **Bullet points** for lists of symptoms, causes, components, or tools
  - \`Inline code\` for specific values, formulas, or settings (e.g. \`410 psig\`, \`R-410A\`, \`24VAC\`)
- Answer the question directly up front, then add context or a follow-up.
- One main concept per response. If the topic is big, cover the core and offer to go deeper.
- No long intros, no repeating the question back. Get to the point.

FOLLOW-UP SUGGESTIONS — REQUIRED:
At the very end of every response, include exactly 3 short follow-up prompts the student might want to ask next. Format them on the last line like this:
<suggestions>Ask about X|Explain Y|Quiz me on Z</suggestions>
Keep each suggestion under 6 words. Make them contextual to what was just discussed. Do NOT include this line in your visible answer — it will be parsed and displayed as clickable buttons.`;
  }

  // ── Chat Completions ──

  async chatStream(userMessage, onChunk, onDone) {
    if (!this.isConfigured) {
      onChunk('Please add your OpenAI API key in Settings to enable AI responses.');
      onDone();
      return;
    }

    this.conversationHistory.push({ role: 'user', content: userMessage });

    // Keep conversation history manageable
    if (this.conversationHistory.length > 30) {
      this.conversationHistory = this.conversationHistory.slice(-24);
    }

    this.abortController = new AbortController();

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: this.model,
          messages: [
            { role: 'system', content: this.systemPrompt },
            ...this.conversationHistory
          ],
          stream: true,
          temperature: 0.7,
          max_completion_tokens: 800
        }),
        signal: this.abortController.signal
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        const msg = err.error?.message || `API error: ${response.status}`;
        onChunk(msg);
        onDone();
        return;
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullResponse = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n').filter(l => l.startsWith('data: '));

        for (const line of lines) {
          const data = line.slice(6);
          if (data === '[DONE]') continue;

          try {
            const parsed = JSON.parse(data);
            const delta = parsed.choices?.[0]?.delta?.content;
            if (delta) {
              fullResponse += delta;
              onChunk(delta);
            }
          } catch (e) {
            // skip malformed chunks
          }
        }
      }

      this.conversationHistory.push({ role: 'assistant', content: fullResponse });
      onDone(fullResponse);

    } catch (err) {
      if (err.name !== 'AbortError') {
        onChunk(`Connection error: ${err.message}`);
        onDone();
      }
    }
  }

  abortChat() {
    if (this.abortController) {
      this.abortController.abort();
      this.abortController = null;
    }
  }

  // ── Whisper Speech-to-Text ──

  async startRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.audioChunks = [];
      this.mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });

      this.mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) this.audioChunks.push(e.data);
      };

      this.mediaRecorder.start();
      return true;
    } catch (err) {
      console.error('Microphone access denied:', err);
      return false;
    }
  }

  stopRecording() {
    return new Promise((resolve) => {
      if (!this.mediaRecorder || this.mediaRecorder.state === 'inactive') {
        resolve(null);
        return;
      }

      this.mediaRecorder.onstop = () => {
        const blob = new Blob(this.audioChunks, { type: 'audio/webm' });
        // Stop all tracks
        this.mediaRecorder.stream.getTracks().forEach(t => t.stop());
        this.mediaRecorder = null;
        resolve(blob);
      };

      this.mediaRecorder.stop();
    });
  }

  async transcribe(audioBlob) {
    if (!this.isConfigured || !audioBlob) return null;

    const formData = new FormData();
    formData.append('file', audioBlob, 'recording.webm');
    formData.append('model', 'whisper-1');
    formData.append('language', 'en');

    try {
      const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${this.apiKey}` },
        body: formData
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        console.error('Whisper error:', err);
        return null;
      }

      const data = await response.json();
      return data.text;
    } catch (err) {
      console.error('Transcription error:', err);
      return null;
    }
  }

  // ── Text-to-Speech ──

  async speak(text) {
    if (!this.isConfigured) return;

    // Stop any currently playing audio
    this.stopSpeaking();

    try {
      const response = await fetch('https://api.openai.com/v1/audio/speech', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: this.ttsModel,
          input: text,
          voice: this.ttsVoice,
          response_format: 'mp3'
        })
      });

      if (!response.ok) {
        console.error('TTS error:', response.status);
        return;
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      this.currentAudio = new Audio(audioUrl);

      return new Promise((resolve) => {
        this.currentAudio.onended = () => {
          URL.revokeObjectURL(audioUrl);
          this.currentAudio = null;
          resolve();
        };
        this.currentAudio.onerror = () => {
          URL.revokeObjectURL(audioUrl);
          this.currentAudio = null;
          resolve();
        };
        this.currentAudio.play();
      });
    } catch (err) {
      console.error('TTS error:', err);
    }
  }

  stopSpeaking() {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio = null;
    }
  }

  // ── Connection Test ──

  async testConnection() {
    if (!this.isConfigured) return { ok: false, message: 'No API key provided' };

    try {
      const response = await fetch('https://api.openai.com/v1/models', {
        headers: { 'Authorization': `Bearer ${this.apiKey}` }
      });

      if (response.ok) {
        return { ok: true, message: 'Connected' };
      } else {
        const err = await response.json().catch(() => ({}));
        return { ok: false, message: err.error?.message || `Error ${response.status}` };
      }
    } catch (err) {
      return { ok: false, message: err.message };
    }
  }
}

// Global instance
const vertexAI = new VertexAI();
