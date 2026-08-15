import './styles.css';
import {
  nextThemePreference,
  parseThemePreference,
  resolveTheme,
  THEME_STORAGE_KEY,
  type ThemePreference,
} from './theme';
import {
  HERO_MESSAGES,
  INITIAL_TYPING_STATE,
  nextTypingState,
  type TypingState,
} from './typing';
import {
  getPresenceActivity,
  getStatusLabel,
  type LanyardPresence,
} from './lanyard';

type Experience = {
  years: string;
  role: string;
  company: string;
  location?: string;
  summary: string;
  tags: string[];
};

type Education = {
  years: string;
  school: string;
  program: string;
  summary: string;
  tags: string[];
};

type WriteupMeta = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  tags: string[];
};

const techStack = [
  'Git',
  'C#',
  'Python',
  'PHP',
  '.NET Framework',
  'HTML/CSS',
  'Bootstrap',
  'Arduino IDE',
  'ERP Implementations',
  'ERP Software',
  'SQL',
  'MySQL',
  'PostgreSQL',
  'Primavera ERP',
  'SIP',
  'Linux',
  'Proxmox',
  'Docker',
  'Jenkins',
  'TeamCity',
  'YouTrack',
  'Headscale',
  'Cloudflare',
  'Authentik',
  'IIS',
  'C++'
];

const LANYARD_USER_ID = '1060304285457448970';
const LANYARD_REST_ENDPOINT = `https://api.lanyard.rest/v1/users/${LANYARD_USER_ID}`;
const LANYARD_SOCKET_ENDPOINT = 'wss://api.lanyard.rest/socket';

const experience: Experience[] = [
  {
    years: 'Jul 2026 - Present',
    role: 'Developer',
    company: 'Quantinfor - Consultoria Informática',
    location: 'Malveira · Hybrid',
    summary:
      'Software development for multiple environments, including PHC Web and Primavera ERP. Maintenance and creation of software projects, internal tools, and platforms using repository history tracking, such as Git.',
    tags: ['Informatics', 'Software Prototyping', 'Git', 'PHC Web', 'Primavera ERP'],
  },
  {
    years: 'Oct 2025 - Present',
    role: 'Head of Systems / System Administrator',
    company: 'LunarLabs LLC',
    summary:
      'Creating and maintaining company systems isolated within Proxmox containers, while maintaining and creating developer systems and platforms. Managing Microsoft 365 for single sign-on (SSO) environments.',
    tags: ['Informatics', 'Docker', 'Proxmox', 'Microsoft 365', 'Single Sign-On'],
  },
  {
    years: 'Aug 2025 - Present',
    role: 'System Administrator and Operations Manager',
    company: 'Darkless Ltd.',
    location: 'Remote',
    summary:
      'Managing remote infrastructure, including hypervisors and client environments such as Pterodactyl Game Panel for Minecraft and Discord-related deployments. Handling support tickets, assisting with automations, and managing Office 365 for single sign-on (SSO).',
    tags: ['Server Administration', 'Proxmox', 'Pterodactyl', 'Microsoft 365', 'Automation'],
  },
  {
    years: 'Feb 2025 - Present',
    role: 'Senior System Administrator',
    company: 'Scala Studios',
    location: 'Remote',
    summary:
      'Managed game server deployments and a dedicated hypervisor; operated internal developer services including TeamCity, YouTrack, Jenkins, and Mailcow; built an intranet over Headscale VPN; and supported Scala project tickets.',
    tags: ['Infrastructure Management', 'Linux', 'Proxmox', 'TeamCity', 'YouTrack', 'Jenkins', 'Mailcow', 'Headscale'],
  },
  {
    years: 'Jan 2026 - Apr 2026',
    role: 'Software Developer Intern',
    company: 'Quantinfor - Consultoria Informática',
    location: 'Malveira · Hybrid',
    summary: 'Software development internship focused on multiple environments and internal platform tooling.',
    tags: ['Git', '.NET Framework', 'C#', 'Python', 'Software Prototyping'],
  },
  {
    years: 'Apr 2025 - Jun 2025',
    role: 'Software Developer (Internship)',
    company: 'Visao Logica - Comercio Artigos de Informatica, Lda.',
    summary:
    'Worked on Primavera WebAPI and PEX Advanced extensibility (C# and Python), built middleware for WebAPI integrations, developed SIP/PBX and internal tooling concepts, configured Sophos Firewall, and implemented Primavera ERP synchronization flows.',
    tags: ['C#', 'Python', 'PHP', 'SIP', 'PBX', 'Primavera ERP', 'Sophos Firewall'],
  },
  {
    years: 'Apr 2023',
    role: 'Volunteer',
    company: 'Academia Digital para Pais - AEJICS',
    summary:
      'Volunteered in a program funded by the Portuguese Ministry of Education and E-Redes where students taught parents foundational digital literacy skills.',
    tags: ['Volunteer', 'Digital Literacy', 'Community'],
  }
];

const education: Education[] = [
  {
    years: 'Sep 2023 - Jul 2026',
    school: 'Agrupamento de Escolas Joaquim Inacio da Cruz Sobral',
    program: 'Professional Course, IT Systems',
    summary:
      'Grade 12th. Advanced computer training including Microsoft Office (Excel with VBA, Word, PowerPoint), web development (HTML/CSS), computer architecture, TCP/IP networking, and Windows installation/setup. Hands-on Windows Server 2022 Active Directory work with user management, file sharing, GPOs, and security groups. ERP deployment with Primavera, programming in C++, C#, .NET, Java, and Python, SQL database management (MySQL, MariaDB, PostgreSQL), web server administration with Apache and IIS, and development practice with tools such as Arduino IDE and PHP.',
    tags: [
      'Git',
      'Informatics',
      'Information Technology Training',
      'Programming Languages',
      'Programming',
      'Fundamentals',
      'Computer Architecture',
      'Mathematics',
      'Windows Server 2022',
      'Active Directory',
      'TCP/IP',
      'GPO',
      'File Sharing',
      'Primavera ERP',
      'SQL',
      'MySQL',
      'MariaDB',
      'PostgreSQL',
      'Apache',
      'IIS',
      'Python',
      'PHP',
      'Arduino IDE',
      'C++',
      'C#',
      '.NET Framework',
      'Java',
      'VBA',
    ],
  },
];

const app = document.querySelector<HTMLDivElement>('#app');

if (!app) {
  throw new Error('Missing #app container');
}

app.innerHTML = `
  <div class="page-bg"></div>
  <header class="topbar">
    <nav class="container nav-wrap" aria-label="Primary navigation">
      <a class="brand" href="#home"><span>&lt;</span>marcopisco.com<span> /&gt;</span></a>
      <p class="repository-path" aria-label="Current file">
        portfolio <span>/</span> src <span>/</span> <strong>main.ts</strong>
      </p>
      <div class="nav-actions">
        <div class="nav-links">
          <a href="#about">about()</a>
          <a href="#skills">stack[]</a>
          <a href="#experience">experience[]</a>
          <a href="#education">education</a>
          <a href="#writeups">posts()</a>
          <a href="#contact">contact()</a>
        </div>
        <button id="theme-toggle" class="theme-toggle" type="button">
          <span id="theme-icon" aria-hidden="true">◐</span>
          <span id="theme-label">System</span>
        </button>
      </div>
    </nav>
  </header>

  <main class="container page-shell">
    <section id="home" class="workspace-window hero-window">
      <div class="workspace-bar" aria-hidden="true">
        <span class="window-dot"></span>
        <span class="window-dot"></span>
        <span class="window-dot"></span>
        <span class="file-tab">home.ts</span>
      </div>
      <div class="hero">
        <div class="hero-copy">
          <p class="code-comment">Portfolio entry point</p>
          <div id="discord-presence" class="discord-presence" data-status="offline" data-state="loading" aria-live="polite">
            <span class="presence-indicator" aria-hidden="true"></span>
            <span id="discord-presence-label">Discord · Connecting...</span>
            <span id="discord-presence-activity" class="presence-activity hidden"></span>
          </div>
          <h1>
            <span class="hero-declaration">const introduction =</span>
            Hi, I am <strong>Marco Pisco</strong>.
          </h1>
          <p class="hero-subtitle">
            <span class="typed-declaration" aria-hidden="true">
              <span class="typed-keyword">const</span>
              <span class="typed-variable">subtitle</span>
              <span class="typed-operator"> = </span>
              <span class="typed-string">&quot;<span id="typed-subtitle"></span><span class="typing-cursor"></span>&quot;</span>;
            </span>
            <span class="sr-only">${HERO_MESSAGES[0]}</span>
          </p>
          <div class="hero-actions">
            <a class="code-button primary" href="#experience">View experience <span>→</span></a>
            <a class="code-button" href="#contact">Get in touch</a>
          </div>
        </div>
        <aside class="hero-media">
          <div class="avatar-frame">
            <img class="avatar" src="/images/marco-profile.png" alt="Marco Pisco" />
          </div>
          <pre class="profile-code" aria-label="Profile summary"><code><span>interface</span> Profile {
  <strong>role</strong>: "Developer";
  <strong>focus</strong>: "Systems";
  <strong>location</strong>: "Portugal";
}</code></pre>
        </aside>
      </div>
    </section>

    <section class="workspace-window content-window">
      <div class="workspace-bar" aria-hidden="true">
        <span class="window-dot"></span>
        <span class="window-dot"></span>
        <span class="window-dot"></span>
        <span class="file-tab">workspace</span>
      </div>
      <div class="workspace-layout">
        <aside class="repository-explorer" aria-label="Portfolio Explorer">
          <p class="explorer-heading">Explorer</p>
          <p class="explorer-root">MARCOPISCO.COM</p>
          <ul class="repository-tree">
            <li><a class="tree-file typescript" href="#about">about.ts</a></li>
            <li><a class="tree-file json" href="#skills">stack.json</a></li>
            <li><a class="tree-file typescript" href="#experience">experience.ts</a></li>
            <li><a class="tree-file markdown" href="#education">education.md</a></li>
            <li><a class="tree-file folder" href="#writeups">writeups/</a></li>
            <li><a class="tree-file typescript" href="#contact">contact.ts</a></li>
          </ul>
        </aside>

        <div class="workspace-content">
          <article id="about" class="code-section">
            <p class="section-comment">About me</p>
            <h2><span>export</span> About Me</h2>
            <div class="about-copy">
              <p>
                I am a software developer and system administrator focused on
                secure infrastructure, practical product delivery, and dependable operations.
              </p>
              <p>
                I work across software engineering, systems administration, and security-focused
                infrastructure, with a strong focus on reliability, automation, and maintainable operations.
              </p>
            </div>
          </article>

          <article id="skills" class="code-section">
            <p class="section-comment">Tech stack</p>
            <h2><span>const</span> Tech Stack[]</h2>
            <div class="skills">
              ${techStack.map((skill) => `<span class="skill">${skill}</span>`).join('')}
            </div>
          </article>

          <article id="experience" class="code-section">
            <p class="section-comment">Experience records</p>
            <h2><span>export</span> Experience[]</h2>
            <div class="records">
              ${experience
                .map(
                  (item) => `
                    <article class="record">
                      <p class="record-date">${item.years}</p>
                      <div class="record-content">
                        <h3>${item.role}</h3>
                        <p class="company">${item.company}</p>
                        ${item.location ? `<p class="record-location">${item.location}</p>` : ''}
                        <p class="summary">${item.summary}</p>
                        <div class="tags">
                          ${item.tags.map((tag) => `<span>${tag}</span>`).join('')}
                        </div>
                      </div>
                    </article>
                  `,
                )
                .join('')}
            </div>
          </article>

          <article id="education" class="code-section">
            <p class="section-comment">Education</p>
            <h2><span>read</span> Education.md</h2>
            <div class="records">
              ${education
                .map(
                  (item) => `
                    <article class="record education-record">
                      <p class="record-date">${item.years}</p>
                      <div class="record-content">
                        <h3>${item.school}</h3>
                        <p class="company">${item.program}</p>
                        <p class="summary">${item.summary}</p>
                        <div class="tags">
                          ${item.tags.map((tag) => `<span>${tag}</span>`).join('')}
                        </div>
                      </div>
                    </article>
                  `,
                )
                .join('')}
            </div>
          </article>

          <article id="writeups" class="code-section">
            <p class="section-comment">Posts</p>
            <h2><span>fetch</span> Posts/</h2>
            <div id="writeups-list" class="records"></div>
            <article id="writeup-viewer" class="writeup-viewer hidden"></article>
          </article>

          <article id="contact" class="code-section contact-section">
            <p class="section-comment">Contact</p>
            <h2><span>await</span> Get In Touch()</h2>
            <p class="contact-copy">
              If you need help with platform engineering, production hardening,
              or full-stack delivery, I am available for collaborations.
            </p>
            <div class="contact-actions">
              <a class="code-button primary" href="mailto:marco@marcopisco.com">Email</a>
              <a class="code-button" href="https://www.linkedin.com/in/marco-p-440068329/" target="_blank" rel="noreferrer">LinkedIn</a>
              <a class="code-button" href="https://github.com/marpisco" target="_blank" rel="noreferrer">GitHub</a>
            </div>
          </article>
        </div>
      </div>
    </section>
  </main>

  <footer>
    <div class="container footer-wrap">
      <p>&copy; ${new Date().getFullYear()} Marco Pisco. All rights reserved.</p>
    </div>
  </footer>
`;

function escapeHtml(text: string): string {
  return text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

type LanyardRestResponse = {
  success: boolean;
  data?: LanyardPresence;
};

type LanyardSocketMessage = {
  op: number;
  t?: string;
  d?: unknown;
};

function isLanyardPresence(value: unknown): value is LanyardPresence {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const candidate = value as Partial<LanyardPresence>;
  return typeof candidate.discord_status === 'string' && Array.isArray(candidate.activities);
}

function findPresence(value: unknown): LanyardPresence | null {
  if (isLanyardPresence(value)) {
    return value;
  }

  if (value && typeof value === 'object') {
    const presence = (value as Record<string, unknown>)[LANYARD_USER_ID];
    if (isLanyardPresence(presence)) {
      return presence;
    }
  }

  return null;
}

function renderLanyardPresence(presence: LanyardPresence): void {
  const root = document.querySelector<HTMLElement>('#discord-presence');
  const label = document.querySelector<HTMLElement>('#discord-presence-label');
  const activity = document.querySelector<HTMLElement>('#discord-presence-activity');
  if (!root || !label || !activity) {
    return;
  }

  const activityText = getPresenceActivity(presence);
  root.dataset.status = presence.discord_status;
  root.dataset.state = 'ready';
  label.textContent = `Discord · ${getStatusLabel(presence.discord_status)}`;

  if (activityText) {
    activity.textContent = activityText;
    activity.classList.remove('hidden');
  } else {
    activity.textContent = '';
    activity.classList.add('hidden');
  }
}

function renderLanyardUnavailable(): void {
  const root = document.querySelector<HTMLElement>('#discord-presence');
  const label = document.querySelector<HTMLElement>('#discord-presence-label');
  const activity = document.querySelector<HTMLElement>('#discord-presence-activity');
  if (!root || !label || !activity) {
    return;
  }

  root.dataset.status = 'offline';
  root.dataset.state = 'unavailable';
  label.textContent = 'Discord · Unavailable';
  activity.textContent = '';
  activity.classList.add('hidden');
}

async function loadLanyardPresence(): Promise<void> {
  try {
    const response = await fetch(LANYARD_REST_ENDPOINT);
    if (!response.ok) {
      throw new Error('Lanyard REST request failed');
    }

    const payload = (await response.json()) as LanyardRestResponse;
    if (!payload.success || !isLanyardPresence(payload.data)) {
      throw new Error('Lanyard returned no presence');
    }

    renderLanyardPresence(payload.data);
  } catch {
    renderLanyardUnavailable();
  }
}

function setupLanyardPresence(): void {
  let socket: WebSocket | null = null;
  let heartbeatId: number | null = null;
  let reconnectId: number | null = null;
  let stopped = false;

  const clearHeartbeat = (): void => {
    if (heartbeatId !== null) {
      window.clearInterval(heartbeatId);
      heartbeatId = null;
    }
  };

  const scheduleReconnect = (): void => {
    if (stopped || reconnectId !== null) {
      return;
    }

    reconnectId = window.setTimeout(() => {
      reconnectId = null;
      connect();
    }, 15_000);
  };

  function connect(): void {
    if (stopped || typeof WebSocket === 'undefined') {
      return;
    }

    socket = new WebSocket(LANYARD_SOCKET_ENDPOINT);
    socket.addEventListener('open', () => {
      socket?.send(
        JSON.stringify({
          op: 2,
          d: { subscribe_to_id: LANYARD_USER_ID },
        }),
      );
    });
    socket.addEventListener('message', (event: MessageEvent<string>) => {
      let message: LanyardSocketMessage;
      try {
        message = JSON.parse(event.data) as LanyardSocketMessage;
      } catch {
        return;
      }

      if (message.op === 1 && message.d && typeof message.d === 'object') {
        const heartbeatInterval = (message.d as { heartbeat_interval?: unknown }).heartbeat_interval;
        if (typeof heartbeatInterval === 'number' && heartbeatInterval > 0) {
          clearHeartbeat();
          heartbeatId = window.setInterval(() => {
            socket?.send(JSON.stringify({ op: 3, d: null }));
          }, heartbeatInterval);
        }
        return;
      }

      if (message.op === 0 && (message.t === 'INIT_STATE' || message.t === 'PRESENCE_UPDATE')) {
        const presence = findPresence(message.d);
        if (presence) {
          renderLanyardPresence(presence);
        }
      }
    });
    socket.addEventListener('close', () => {
      clearHeartbeat();
      scheduleReconnect();
    });
    socket.addEventListener('error', () => {
      socket?.close();
    });
  }

  window.addEventListener('beforeunload', () => {
    stopped = true;
    clearHeartbeat();
    if (reconnectId !== null) {
      window.clearTimeout(reconnectId);
    }
    socket?.close();
  });

  void loadLanyardPresence();
  connect();
}

function markdownToHtml(markdown: string): string {
  const lines = markdown.replace(/\r\n/g, '\n').split('\n');
  const html: string[] = [];
  let inCode = false;
  let inList = false;

  for (const line of lines) {
    const trimmed = line.trim();

    if (trimmed.startsWith('```')) {
      if (!inCode) {
        if (inList) {
          html.push('</ul>');
          inList = false;
        }
        html.push('<pre><code>');
        inCode = true;
      } else {
        html.push('</code></pre>');
        inCode = false;
      }
      continue;
    }

    if (inCode) {
      html.push(`${escapeHtml(line)}\n`);
      continue;
    }

    if (!trimmed) {
      if (inList) {
        html.push('</ul>');
        inList = false;
      }
      continue;
    }

    if (trimmed.startsWith('# ')) {
      if (inList) {
        html.push('</ul>');
        inList = false;
      }
      html.push(`<h1>${escapeHtml(trimmed.slice(2))}</h1>`);
      continue;
    }

    if (trimmed.startsWith('## ')) {
      if (inList) {
        html.push('</ul>');
        inList = false;
      }
      html.push(`<h2>${escapeHtml(trimmed.slice(3))}</h2>`);
      continue;
    }

    if (trimmed.startsWith('### ')) {
      if (inList) {
        html.push('</ul>');
        inList = false;
      }
      html.push(`<h3>${escapeHtml(trimmed.slice(4))}</h3>`);
      continue;
    }

    if (trimmed.startsWith('- ')) {
      if (!inList) {
        html.push('<ul>');
        inList = true;
      }
      html.push(`<li>${escapeHtml(trimmed.slice(2))}</li>`);
      continue;
    }

    if (inList) {
      html.push('</ul>');
      inList = false;
    }

    const withInlineCode = escapeHtml(trimmed).replace(/`([^`]+)`/g, '<code>$1</code>');
    html.push(`<p>${withInlineCode}</p>`);
  }

  if (inList) {
    html.push('</ul>');
  }
  if (inCode) {
    html.push('</code></pre>');
  }

  return html.join('');
}

function renderWriteup(writeup: WriteupMeta): void {
  const viewer = document.querySelector<HTMLElement>('#writeup-viewer');
  if (!viewer) {
    return;
  }

  viewer.classList.remove('hidden');
  viewer.innerHTML = `<p class="summary">Loading ${escapeHtml(writeup.title)}...</p>`;

  fetch(`/writeups/${writeup.slug}.md`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Writeup file not found');
      }
      return response.text();
    })
    .then((markdown) => {
      const dateText = new Date(writeup.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });

      viewer.innerHTML = `
        <p class="years">${escapeHtml(dateText)}</p>
        <h3>${escapeHtml(writeup.title)}</h3>
        <p class="summary">${escapeHtml(writeup.summary)}</p>
        <div class="tags">${writeup.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join('')}</div>
        <div class="writeup-content">${markdownToHtml(markdown)}</div>
      `;
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      viewer.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    })
    .catch(() => {
      viewer.innerHTML = '<p class="summary">Failed to load this writeup file.</p>';
    });
}

function closeWriteup(): void {
  const viewer = document.querySelector<HTMLElement>('#writeup-viewer');
  if (!viewer) {
    return;
  }
  viewer.classList.add('hidden');
  viewer.innerHTML = '';
}

function setupScrollReveal(root: ParentNode = document): void {
  const textTargets = Array.from(
    root.querySelectorAll<HTMLElement>(
      '.hero-copy h1, .hero-copy p, .discord-presence, .code-section h2, .about-copy p, .skill, .record, .code-button',
    ),
  );
  const blockTargets = Array.from(
    root.querySelectorAll<HTMLElement>(
      '.hero-media, .avatar-frame, .code-section, .contact-actions, .writeup-viewer',
    ),
  );
  const targets = Array.from(new Set([...textTargets, ...blockTargets]));

  if (targets.length === 0) {
    return;
  }

  let textStagger = 0;
  for (const target of textTargets) {
    if (!target.classList.contains('reveal-text')) {
      target.classList.add('reveal-text');
      target.style.setProperty('--reveal-delay', `${Math.min(textStagger * 55, 260)}ms`);
      textStagger += 1;
    }
  }

  let blockStagger = 0;
  for (const target of blockTargets) {
    if (!target.classList.contains('reveal-block')) {
      target.classList.add('reveal-block');
      target.style.setProperty('--reveal-delay', `${Math.min(blockStagger * 70, 320)}ms`);
      blockStagger += 1;
    }
  }

  if (!('IntersectionObserver' in window)) {
    for (const target of targets) {
      target.classList.add('in-view');
    }
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      }
    },
    {
      threshold: 0,
      rootMargin: '0px 0px -4% 0px',
    },
  );

  for (const target of targets) {
    if (!target.classList.contains('in-view')) {
      observer.observe(target);
    }
  }
}

function setupTypingSubtitle(): void {
  const subtitle = document.querySelector<HTMLElement>('#typed-subtitle');
  const cursor = document.querySelector<HTMLElement>('.typing-cursor');
  if (!subtitle || !cursor) {
    return;
  }

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) {
    subtitle.textContent = HERO_MESSAGES[0];
    cursor.classList.add('is-hidden');
    return;
  }

  const typingDelay = 48;
  const deletingDelay = 28;
  const messageHold = 1600;
  const messageGap = 350;
  let state: TypingState = { ...INITIAL_TYPING_STATE };

  const render = (): void => {
    const message = HERO_MESSAGES[state.messageIndex];
    subtitle.textContent = message.slice(0, state.visibleCharacters);
  };

  const scheduleNextCharacter = (): void => {
    const message = HERO_MESSAGES[state.messageIndex];
    let delay = state.direction === 'typing' ? typingDelay : deletingDelay;

    if (state.direction === 'typing' && state.visibleCharacters >= message.length) {
      delay = messageHold;
    } else if (state.direction === 'deleting' && state.visibleCharacters === 0) {
      delay = messageGap;
    }

    window.setTimeout(() => {
      state = nextTypingState(state, HERO_MESSAGES);
      render();
      scheduleNextCharacter();
    }, delay);
  };

  render();
  scheduleNextCharacter();
}

function setupThemeControl(): void {
  const button = document.querySelector<HTMLButtonElement>('#theme-toggle');
  const label = document.querySelector<HTMLElement>('#theme-label');
  const icon = document.querySelector<HTMLElement>('#theme-icon');
  if (!button || !label || !icon) {
    return;
  }

  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
  let preference: ThemePreference = 'system';

  try {
    preference = parseThemePreference(localStorage.getItem(THEME_STORAGE_KEY));
  } catch {
    preference = 'system';
  }

  const applyTheme = (): void => {
    const resolved = resolveTheme(preference, systemTheme.matches);
    document.documentElement.dataset.theme = resolved;
    document.documentElement.style.colorScheme = resolved;
    label.textContent = preference[0].toUpperCase() + preference.slice(1);
    icon.textContent = preference === 'dark' ? '●' : preference === 'light' ? '○' : '◐';
    button.setAttribute(
      'aria-label',
      `Theme: ${label.textContent}. Activate to change theme.`,
    );
  };

  button.addEventListener('click', () => {
    preference = nextThemePreference(preference);
    try {
      if (preference === 'system') {
        localStorage.removeItem(THEME_STORAGE_KEY);
      } else {
        localStorage.setItem(THEME_STORAGE_KEY, preference);
      }
    } catch {
      // Theme still works for the current page when storage is unavailable.
    }
    applyTheme();
  });

  systemTheme.addEventListener('change', () => {
    if (preference === 'system') {
      applyTheme();
    }
  });

  applyTheme();
}

async function loadWriteups(): Promise<void> {
  const list = document.querySelector<HTMLElement>('#writeups-list');
  if (!list) {
    return;
  }
  let openSlug: string | null = null;

  try {
    const response = await fetch('/writeups/index.json');
    if (!response.ok) {
      throw new Error('index not found');
    }

    const writeups = (await response.json()) as WriteupMeta[];
    if (!Array.isArray(writeups) || writeups.length === 0) {
      list.innerHTML = '<article class="record empty-state"><p class="summary">No writeups yet... :(</p></article>';
      setupScrollReveal(list);
      return;
    }

    list.innerHTML = writeups
      .map(
        (item) => `
          <article class="record writeup-card" data-slug="${escapeHtml(item.slug)}">
            <p class="record-date">${escapeHtml(item.date)}</p>
            <div class="record-content">
              <h3>${escapeHtml(item.title)}</h3>
              <p class="summary">${escapeHtml(item.summary)}</p>
              <div class="tags">${item.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join('')}</div>
            </div>
          </article>
        `,
      )
      .join('');

    const cards = list.querySelectorAll<HTMLElement>('.writeup-card');
    for (const card of cards) {
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');

      const toggleWriteup = (): void => {
        const slug = card.dataset.slug;
        if (slug && slug === openSlug) {
          closeWriteup();
          openSlug = null;
          return;
        }
        const writeup = writeups.find((w) => w.slug === slug);
        if (writeup) {
          renderWriteup(writeup);
          openSlug = writeup.slug;
        }
      };

      card.addEventListener('click', toggleWriteup);
      card.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          toggleWriteup();
        }
      });
    }

    setupScrollReveal(list);
  } catch {
    list.innerHTML = '<article class="record empty-state"><p class="summary">Writeups index missing. Add files to public/writeups.</p></article>';
    setupScrollReveal(list);
  }
}

setupTypingSubtitle();
setupThemeControl();
setupScrollReveal();
setupLanyardPresence();
void loadWriteups();
