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
  createVisibilityPolling,
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

type LanyardRestResponse = {
  success: boolean;
  data?: LanyardPresence;
};

function isLanyardPresence(value: unknown): value is LanyardPresence {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const candidate = value as Partial<LanyardPresence>;
  return typeof candidate.discord_status === 'string' && Array.isArray(candidate.activities);
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

function setupLanyardPresence(): void {
  let activeRequest: AbortController | null = null;

  const loadLanyardPresence = async (): Promise<void> => {
    if (activeRequest) {
      return;
    }

    const controller = new AbortController();
    activeRequest = controller;

    try {
      const response = await fetch(LANYARD_REST_ENDPOINT, { signal: controller.signal });
      if (!response.ok) {
        throw new Error('Lanyard REST request failed');
      }

      const payload = (await response.json()) as LanyardRestResponse;
      if (!payload.success || !isLanyardPresence(payload.data)) {
        throw new Error('Lanyard returned no presence');
      }

      renderLanyardPresence(payload.data);
    } catch {
      if (!controller.signal.aborted) {
        renderLanyardUnavailable();
      }
    } finally {
      if (activeRequest === controller) {
        activeRequest = null;
      }
    }
  };

  const polling = createVisibilityPolling(() => {
    void loadLanyardPresence();
  }, {
    isVisible: () => document.visibilityState !== 'hidden',
    addVisibilityListener: (listener) => {
      document.addEventListener('visibilitychange', listener);
      return () => document.removeEventListener('visibilitychange', listener);
    },
    setInterval: (callback, delay) => window.setInterval(callback, delay),
    clearInterval: (id) => window.clearInterval(id),
  });

  window.addEventListener('beforeunload', () => {
    polling.stop();
    activeRequest?.abort();
  }, { once: true });

  polling.start();
}

function setupScrollReveal(root: ParentNode = document): void {
  const textTargets = Array.from(
    root.querySelectorAll<HTMLElement>(
      '.hero-copy h1, .hero-copy p, .discord-presence, .code-section h2, .about-copy p, .skill, .record, .code-button',
    ),
  );
  const blockTargets = Array.from(
    root.querySelectorAll<HTMLElement>(
      '.hero-media, .avatar-frame, .code-section, .contact-actions',
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
  let state: TypingState = { ...INITIAL_TYPING_STATE };

  const render = (): void => {
    const message = HERO_MESSAGES[state.messageIndex];
    subtitle.textContent = message.slice(0, state.visibleCharacters);
  };

  const scheduleNextCharacter = (): void => {
    const message = HERO_MESSAGES[state.messageIndex];
    if (state.direction === 'typing' && state.visibleCharacters >= message.length) {
      state = nextTypingState(state, HERO_MESSAGES);
      render();
      cursor.classList.add('is-hidden');
      return;
    }

    window.setTimeout(() => {
      state = nextTypingState(state, HERO_MESSAGES);
      render();
      scheduleNextCharacter();
    }, typingDelay);
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

setupTypingSubtitle();
setupThemeControl();
setupScrollReveal();
setupLanyardPresence();
