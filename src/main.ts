import './styles.css';

type Experience = {
  years: string;
  role: string;
  company: string;
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

type LanyardActivity = {
  type: number;
  name: string;
  application_id?: string;
  details?: string;
  state?: string;
  assets?: {
    large_image?: string;
    large_text?: string;
    small_image?: string;
    small_text?: string;
  };
  emoji?: {
    name: string;
  };
};

type LanyardData = {
  discord_status: 'online' | 'idle' | 'dnd' | 'offline';
  active_on_discord_web?: boolean;
  active_on_discord_desktop?: boolean;
  active_on_discord_mobile?: boolean;
  listening_to_spotify: boolean;
  spotify?: {
    album?: string;
    album_art_url?: string;
    song: string;
    artist: string;
  };
  activities: LanyardActivity[];
};

type LanyardSocketMessage = {
  op: number;
  t?: string;
  d?: unknown;
};

const techStack = [
  'Git',
  'C#',
  '.NET Framework',
  'Python',
  'SIP',
  'Primavera ERP',
  'Windows Server 2022',
  'Active Directory',
  'MySQL',
  'MariaDB',
  'PostgreSQL',
  'C++',
  'Java',
  'HTML/CSS',
  'Linux',
  'Proxmox',
  'Docker',
  'Cloudflare',
  'Authentik',
];

const experience: Experience[] = [
  {
    years: 'Jan 2026 - Present',
    role: 'Software Developer (Internship)',
    company: 'Quantinfor - Consultoria Informatica',
    summary: 'Internship role focused on software development in a hybrid setup in Malveira.',
    tags: ['Git', '.NET Framework', 'C#', 'Python', 'Software Prototyping'],
  },
  {
    years: 'Apr 2025 - Aug 2025',
    role: 'Software Developer (Internship)',
    company: 'Visao Logica - Comercio Artigos de Informatica, Lda.',
    summary:
      'Developed with C# and Python, created SIP protocol demos, prepared customer computers and software, and built Primavera ERP extensions/forms.',
    tags: ['C#', 'Python', 'SIP', 'Primavera ERP', 'On-site'],
  },
  {
    years: '2025 - Present',
    role: 'Chief Information Security Officer',
    company: 'LunarLabs LLC',
    summary:
      'Lead enterprise security strategy and infrastructure governance, hardening production systems and enforcing resilient, policy-driven IT operations.',
    tags: ['Proxmox', 'Linux', 'Authentik', 'Cloudflare', 'Docker', 'Security Operations'],
  },
  {
    years: '2025 - Present',
    role: 'System Administrator',
    company: 'Darkless LTD',
    summary:
      'Management of hosting systems, administration of the Microsoft 365 tenant, and direct customer support across operational and service issues.',
    tags: ['Proxmox', 'Microsoft 365', 'Linux', 'Docker'],
  },
];

const education: Education[] = [
  {
    years: 'Sep 2023 - Jun 2026',
    school: 'Agrupamento de Escolas Joaquim Inacio da Cruz Sobral',
    program: 'Professional Course, IT Systems',
    summary:
      'Grade 12th. Training includes Office/VBA, web development (HTML/CSS), hardware and networking, Windows Server 2022 Active Directory, ERP deployment, programming (C++, C#, .NET, Java), SQL databases, and Apache/IIS administration.',
    tags: ['Windows Server 2022', 'Active Directory', 'SQL', 'C++', 'C#', 'Java'],
  },
];

const app = document.querySelector<HTMLDivElement>('#app');

if (!app) {
  throw new Error('Missing #app container');
}

app.innerHTML = `
  <div class="page-bg"></div>
  <header class="topbar">
    <div class="container nav-wrap">
      <a class="brand" href="#home"><span class="brand-accent">marco</span>pisco.com</a>
      <nav>
        <ul class="nav-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#experience">Experience</a></li>
          <li><a href="#education">Education</a></li>
          <li><a href="#writeups">Posts</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
    </div>
  </header>

  <main class="container">
    <section id="home" class="hero">
      <div class="hero-grid"></div>
      <div class="avatar-wrap">
        <img class="avatar" src="/images/marco-profile.png" alt="Marco Pisco" />
        <span id="discord-avatar-status" class="status-dot offline avatar-status"></span>
      </div>
      <h1>
        Hi, I am <span class="gradient-name">Marco Pisco</span>.
      </h1>
      <p class="hero-alias">aka <span class="alias-name" data-tip="nvld">neverland</span></p>
      <p>
        Student, Developer and System Administrator based in Portugal.
      </p>
      <div id="hero-status" class="hero-status hidden"></div>
    </section>

    <hr />

    <section id="about" class="split-section">
      <div>
        <p class="section-id">// 01.</p>
        <h2>About Me</h2>
      </div>
      <div class="section-content">
        <p>
          I am a student, software developer, and system administrator focused on
          secure infrastructure, practical product delivery, and dependable operations.
        </p>
        <p>
          I work across software engineering, systems administration, and security-focused
          infrastructure, with a strong focus on reliability, automation, and maintainable operations.
        </p>
      </div>
    </section>

    <hr />

    <section id="skills" class="split-section">
      <div>
        <p class="section-id">// 02.</p>
        <h2>Tech Stack</h2>
      </div>
      <div class="pill-wrap">
        ${techStack.map((skill) => `<span class="pill">${skill}</span>`).join('')}
      </div>
    </section>

    <hr />

    <section id="experience" class="stack-section">
      <div>
        <p class="section-id">// 03.</p>
        <h2>Experience</h2>
      </div>
      <div class="cards">
        ${experience
          .map(
            (item) => `
              <article class="card">
                <p class="years">${item.years}</p>
                <h3>${item.role}</h3>
                <p class="company">${item.company}</p>
                <p class="summary">${item.summary}</p>
                <div class="tags">
                  ${item.tags.map((tag) => `<span>${tag}</span>`).join('')}
                </div>
              </article>
            `,
          )
          .join('')}
      </div>
    </section>

    <hr />

    <section id="education" class="stack-section">
      <div>
        <p class="section-id">// 04.</p>
        <h2>Education</h2>
      </div>
      <div class="cards">
        ${education
          .map(
            (item) => `
              <article class="card">
                <p class="years">${item.years}</p>
                <h3>${item.school}</h3>
                <p class="company">${item.program}</p>
                <p class="summary">${item.summary}</p>
                <div class="tags">
                  ${item.tags.map((tag) => `<span>${tag}</span>`).join('')}
                </div>
              </article>
            `,
          )
          .join('')}
      </div>
    </section>

    <hr />

    <section id="writeups" class="stack-section">
      <div>
        <p class="section-id">// 05.</p>
        <h2>Posts</h2>
      </div>
      <div id="writeups-list" class="cards"></div>
      <article id="writeup-viewer" class="writeup-viewer hidden"></article>
    </section>

    <hr />

    <section id="contact" class="contact">
      <p class="section-id">// 06.</p>
      <h2>Get In Touch</h2>
      <p>
        If you need help with platform engineering, production hardening,
        or full-stack delivery, I am available for collaborations.
      </p>
      <div class="contact-actions">
        <a class="social-btn" href="mailto:marco@marcopisco.com" aria-label="Email Marco">
          <svg viewBox="0 0 24 24" class="social-icon" aria-hidden="true">
            <path d="M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm0 2v.5l9 6 9-6V7H3zm18 10V9.7l-8.4 5.6a1 1 0 0 1-1.2 0L3 9.7V17h18z" />
          </svg>
          Email
        </a>
        <a class="social-btn discord-btn" href="https://discord.com/users/1060304285457448970" target="_blank" rel="noreferrer" aria-label="Discord">
          <svg viewBox="0 0 24 24" class="social-icon" aria-hidden="true">
            <path d="M20.3 4.4A16.5 16.5 0 0 0 16.2 3c-.2.4-.5 1-.6 1.4a15 15 0 0 0-7.1 0c-.2-.4-.4-1-.6-1.4A16.4 16.4 0 0 0 3.7 4.4C1 8.4.3 12.2.7 16c1.8 1.3 3.5 2.1 5.2 2.6.4-.6.7-1.2 1-1.9-.6-.2-1.1-.5-1.6-.8l.4-.3c3.1 1.4 6.5 1.4 9.5 0l.4.3c-.5.3-1 .6-1.6.8.3.7.6 1.3 1 1.9 1.7-.5 3.4-1.3 5.2-2.6.5-4.5-.9-8.3-3.9-11.6zM9.6 13.7c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2zm4.8 0c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2z" />
          </svg>
          Discord
        </a>
        <a class="social-btn" href="https://www.linkedin.com/in/marco-p-440068329/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
          <svg viewBox="0 0 24 24" class="social-icon" aria-hidden="true">
            <path d="M6.9 8.2a2 2 0 1 1 0-4 2 2 0 0 1 0 4zM5 9.8h3.8V20H5V9.8zm6.1 0h3.6v1.4h.1c.5-1 1.7-1.7 3.5-1.7 3.7 0 4.4 2.4 4.4 5.6V20h-3.8v-4.4c0-1 0-2.4-1.5-2.4s-1.7 1.1-1.7 2.3V20h-3.8V9.8z" />
          </svg>
          LinkedIn
        </a>
        <a class="social-btn" href="https://github.com/marpisco" target="_blank" rel="noreferrer" aria-label="GitHub">
          <svg viewBox="0 0 24 24" class="social-icon" aria-hidden="true">
            <path d="M12 2C6.5 2 2 6.6 2 12.2c0 4.5 2.9 8.3 6.9 9.6.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.2-3.4-1.2-.5-1.1-1.1-1.4-1.1-1.4-.9-.7.1-.7.1-.7 1 .1 1.6 1 1.6 1 .9 1.5 2.4 1.1 3 .8.1-.7.4-1.1.7-1.4-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.8-.1-.2-.4-1.3.1-2.8 0 0 .8-.3 2.8 1 .8-.2 1.7-.3 2.5-.3.9 0 1.7.1 2.5.3 1.9-1.3 2.8-1 2.8-1 .5 1.5.2 2.6.1 2.8.6.8 1 1.7 1 2.8 0 3.9-2.4 4.7-4.7 5 .4.3.7 1 .7 1.9v2.8c0 .3.2.6.7.5 4-1.3 6.9-5.1 6.9-9.6C22 6.6 17.5 2 12 2z" />
          </svg>
          GitHub
        </a>
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
      viewer.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
  const targets = root.querySelectorAll<HTMLElement>(
    '#about h2, #about p, #skills h2, #skills .pill, #experience h2, #experience .card, #education h2, #education .card, #writeups h2, #writeups .card, #contact h2, #contact p, #contact .social-btn',
  );

  if (targets.length === 0) {
    return;
  }

  let stagger = 0;
  for (const target of targets) {
    if (!target.classList.contains('reveal-text')) {
      target.classList.add('reveal-text');
      target.style.setProperty('--reveal-delay', `${Math.min(stagger * 55, 260)}ms`);
      stagger += 1;
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
      threshold: 0.18,
      rootMargin: '0px 0px -8% 0px',
    },
  );

  for (const target of targets) {
    if (!target.classList.contains('in-view')) {
      observer.observe(target);
    }
  }
}

function statusLabel(status: LanyardData['discord_status']): string {
  if (status === 'online') {
    return 'Online';
  }
  if (status === 'idle') {
    return 'Idle';
  }
  if (status === 'dnd') {
    return 'Do Not Disturb';
  }
  return 'Offline';
}

function activityIcon(activity: LanyardActivity): string {
  const name = activity.name.toLowerCase();
  if (name.includes('visual studio code')) {
    return '💻';
  }
  if (name.includes('spotify')) {
    return '🎵';
  }
  if (activity.type === 0) {
    return '🎮';
  }
  if (activity.type === 2) {
    return '🎧';
  }
  return '✨';
}

function activityImageUrl(activity: LanyardActivity, data: LanyardData): string | null {
  const large = activity.assets?.large_image;
  if (!large) {
    return null;
  }

  if (large.startsWith('spotify:') && data.spotify?.album_art_url) {
    return data.spotify.album_art_url;
  }

  if (large.startsWith('mp:')) {
    const path = large.slice(3);
    if (path.startsWith('http://') || path.startsWith('https://')) {
      return path;
    }
    return `https://media.discordapp.net/${path}`;
  }

  if (activity.application_id) {
    return `https://cdn.discordapp.com/app-assets/${activity.application_id}/${large}.png`;
  }

  return null;
}

function normalizeMeta(value: string): string {
  return value.trim().toLowerCase();
}

function embedDetails(activity: LanyardActivity, title: string, subtitle: string): string {
  const details: string[] = [];
  const titleKey = normalizeMeta(title);
  const subtitleKey = normalizeMeta(subtitle);

  if (activity.assets?.large_text) {
    const large = activity.assets.large_text.trim();
    const largeKey = normalizeMeta(large);
    if (largeKey !== titleKey && largeKey !== subtitleKey) {
      details.push(large);
    }
  }
  if (activity.assets?.small_text) {
    const small = activity.assets.small_text.trim();
    const smallKey = normalizeMeta(small);
    if (smallKey !== titleKey && smallKey !== subtitleKey) {
      details.push(small);
    }
  }
  return details.join(' • ');
}

function applyDiscordPresence(data: LanyardData): void {
  const dot = document.querySelector<HTMLElement>('#discord-avatar-status');
  const heroStatus = document.querySelector<HTMLElement>('#hero-status');
  if (!dot || !heroStatus) {
    return;
  }

  dot.className = `status-dot ${data.discord_status} avatar-status`;
  dot.setAttribute('data-tip', statusLabel(data.discord_status));
  dot.setAttribute('aria-label', `Discord status: ${statusLabel(data.discord_status)}`);

  const cards: string[] = [];

  for (const activity of data.activities) {
    if (activity.type === 4 || activity.name.toLowerCase() === 'spotify') {
      continue;
    }
    const title = activity.details ?? activity.name;
    const subtitle = activity.state ?? activity.name;
    const extra = embedDetails(activity, title, subtitle);
    const image = activityImageUrl(activity, data);
    cards.push(`
      <article class="status-card">
        <div class="status-card-icon ${image ? 'status-card-image-wrap' : ''}" aria-hidden="true">
          ${
            image
              ? `<img class="status-card-image" src="${escapeHtml(image)}" alt="" />`
              : activityIcon(activity)
          }
        </div>
        <div class="status-card-body">
          <p class="hero-status-line status-card-title">${escapeHtml(title)}</p>
          <p class="hero-status-line status-card-sub">${escapeHtml(subtitle)}</p>
          ${extra ? `<p class="hero-status-line status-card-meta">${escapeHtml(extra)}</p>` : ''}
        </div>
      </article>
    `);
  }

  if (data.listening_to_spotify && data.spotify) {
    cards.push(`
      <article class="status-card">
        <div class="status-card-icon status-card-image-wrap" aria-hidden="true">
          <img class="status-card-image" src="${escapeHtml(data.spotify.album_art_url ?? '')}" alt="" />
        </div>
        <div class="status-card-body">
          <p class="hero-status-line status-card-label">Spotify</p>
          <p class="hero-status-line status-card-title">${escapeHtml(data.spotify.song)}</p>
          <p class="hero-status-line status-card-sub">${escapeHtml(data.spotify.artist)}</p>
        </div>
      </article>
    `);
  }

  if (cards.length === 0) {
    heroStatus.classList.add('hidden');
    heroStatus.innerHTML = '';
    return;
  }

  heroStatus.classList.remove('hidden');
  heroStatus.innerHTML = cards.join('');
}

function connectLanyardWebSocket(): void {
  const socket = new WebSocket('wss://api.lanyard.rest/socket');
  let heartbeatId: ReturnType<typeof setInterval> | null = null;

  socket.addEventListener('message', (event) => {
    const payload = JSON.parse(event.data) as LanyardSocketMessage;

    if (payload.op === 1 && payload.d && typeof payload.d === 'object' && 'heartbeat_interval' in payload.d) {
      const interval = Number((payload.d as { heartbeat_interval: number }).heartbeat_interval);

      if (heartbeatId) {
        clearInterval(heartbeatId);
      }
      heartbeatId = setInterval(() => {
        socket.send(JSON.stringify({ op: 3 }));
      }, interval);

      socket.send(
        JSON.stringify({
          op: 2,
          d: {
            subscribe_to_id: '1060304285457448970',
          },
        }),
      );
      return;
    }

    if (payload.op === 0 && payload.d && typeof payload.d === 'object') {
      const data = payload.d as Partial<LanyardData>;
      if (typeof data.discord_status === 'string' && Array.isArray(data.activities)) {
        applyDiscordPresence(data as LanyardData);
      }
    }
  });

  socket.addEventListener('close', () => {
    if (heartbeatId) {
      clearInterval(heartbeatId);
    }
    setTimeout(connectLanyardWebSocket, 3000);
  });

  socket.addEventListener('error', () => {
    socket.close();
  });
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
      list.innerHTML = '<article class="card"><p class="summary">No writeups yet... :(</p></article>';
      setupScrollReveal(list);
      return;
    }

    list.innerHTML = writeups
      .map(
        (item) => `
          <article class="card writeup-card" data-slug="${escapeHtml(item.slug)}">
            <p class="years">${escapeHtml(item.date)}</p>
            <h3>${escapeHtml(item.title)}</h3>
            <p class="summary">${escapeHtml(item.summary)}</p>
            <div class="tags">${item.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join('')}</div>
          </article>
        `,
      )
      .join('');

    const cards = list.querySelectorAll<HTMLElement>('.writeup-card');
    for (const card of cards) {
      card.style.cursor = 'pointer';
      card.addEventListener('click', () => {
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
      });
    }

    setupScrollReveal(list);
  } catch {
    list.innerHTML = '<article class="card"><p class="summary">Writeups index missing. Add files to public/writeups.</p></article>';
    setupScrollReveal(list);
  }
}

setupScrollReveal();
connectLanyardWebSocket();
void loadWriteups();
