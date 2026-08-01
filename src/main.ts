import './styles.css';
import {
  nextThemePreference,
  parseThemePreference,
  resolveTheme,
  THEME_STORAGE_KEY,
  type ThemePreference,
} from './theme';

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

const repositorySourceUrl = 'https://github.com/marpisco/marpisco.github.io/blob/main';

function sourceFileUrl(path: string): string {
  return `${repositorySourceUrl}/${path}`;
}

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

const experience: Experience[] = [
  {
    years: 'Jan 2026 - Apr 2026',
    role: 'Software Developer (Internship)',
    company: 'Quantinfor - Consultoria Informatica',
    summary: 'Internship role focused on software development in a hybrid setup in Malveira.',
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
  // {
  //   years: '2025 - Present',
  //   role: 'Chief Information Security Officer',
  //   company: 'LunarLabs LLC',
  //   summary:
  //   'Lead enterprise security strategy and infrastructure governance, hardening production systems and enforcing resilient, policy-driven IT operations.',
  //   tags: ['Proxmox', 'Linux', 'Authentik', 'Cloudflare', 'Docker', 'Security Operations'],
  // },
  // {
  //   years: '2025 - Present',
  //   role: 'System Administrator',
  //   company: 'Darkless LTD',
  //   summary:
  //   'Management of hosting systems, administration of the Microsoft 365 tenant, and direct customer support across operational and service issues.',
  //   tags: ['Proxmox', 'Microsoft 365', 'Linux', 'Docker'],
  // },
  // {
  //   years: '2024 - 2025',
  //   role: 'Infrastructure Engineer',
  //   company: 'Scala Studios',
  //   summary:
  //     'Managed game server deployments and a dedicated hypervisor; operated internal developer services including TeamCity, YouTrack, Jenkins, and Mailcow; built an intranet over Headscale VPN; and supported Scala project tickets.',
  //   tags: ['Linux', 'Proxmox', 'TeamCity', 'YouTrack', 'Jenkins', 'Mailcow', 'Headscale'],
  // },
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
          <h1>
            <span class="hero-declaration">const introduction =</span>
            Hi, I am <strong>Marco Pisco</strong>.
          </h1>
          <p class="hero-subtitle">
            <strong>Developer and System Administrator</strong> based in
            <span class="location-inline">
              Portugal
              <img class="inline-flag" src="/images/portugal-flag.svg" alt="Portugal flag" />
            </span>.
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
        <aside class="repository-explorer" aria-label="Repository Explorer">
          <p class="explorer-heading">Explorer</p>
          <p class="explorer-root">MARCOPISCO.GITHUB.IO</p>
          <ul class="repository-tree">
            <li>
              <span class="tree-folder">.github</span>
              <ul>
                <li>
                  <span class="tree-folder">workflows</span>
                  <ul>
                    <li><a class="tree-file yaml" href="${sourceFileUrl('.github/workflows/deploy-pages.yml')}" target="_blank" rel="noreferrer">deploy-pages.yml</a></li>
                  </ul>
                </li>
              </ul>
            </li>
            <li>
              <span class="tree-folder">public</span>
              <ul>
                <li>
                  <span class="tree-folder">images</span>
                  <ul>
                    <li><a class="tree-file image" href="/images/marco-profile.png" target="_blank" rel="noreferrer">marco-profile.png</a></li>
                    <li><a class="tree-file image" href="/images/portugal-flag.svg" target="_blank" rel="noreferrer">portugal-flag.svg</a></li>
                  </ul>
                </li>
                <li>
                  <span class="tree-folder">writeups</span>
                  <ul>
                    <li><a class="tree-file json" href="/writeups/index.json" target="_blank" rel="noreferrer">index.json</a></li>
                  </ul>
                </li>
              </ul>
            </li>
            <li>
              <span class="tree-folder">src</span>
              <ul>
                <li><a class="tree-file typescript" href="${sourceFileUrl('src/main.ts')}" target="_blank" rel="noreferrer">main.ts</a></li>
                <li><a class="tree-file css" href="${sourceFileUrl('src/styles.css')}" target="_blank" rel="noreferrer">styles.css</a></li>
              </ul>
            </li>
            <li><a class="tree-file" href="${sourceFileUrl('CNAME')}" target="_blank" rel="noreferrer">CNAME</a></li>
            <li><a class="tree-file markdown" href="${sourceFileUrl('README.md')}" target="_blank" rel="noreferrer">README.md</a></li>
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
      '.hero-copy h1, .hero-copy p, .code-section h2, .about-copy p, .skill, .record, .code-button',
    ),
  );
  const blockTargets = Array.from(
    root.querySelectorAll<HTMLElement>(
      '.workspace-window, .hero-media, .avatar-frame, .code-section, .contact-actions, .writeup-viewer',
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

setupThemeControl();
setupScrollReveal();
void loadWriteups();
