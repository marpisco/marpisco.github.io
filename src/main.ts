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
          <li><a href="#writeups">Writeups</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
    </div>
  </header>

  <main class="container">
    <section id="home" class="hero">
      <div class="hero-grid"></div>
      <img class="avatar" src="/images/marco-profile.png" alt="Marco Pisco" />
      <h1>
        Hi, I am <span class="gradient-name">Marco Pisco</span>.
      </h1>
      <p>
        Student and Developer based in Torres Vedras, Lisbon, Portugal.
      </p>
    </section>

    <hr />

    <section id="about" class="split-section">
      <div>
        <p class="section-id">// 01.</p>
        <h2>About Me</h2>
      </div>
      <div class="section-content">
        <p>
          I am a student and developer focused on building practical software,
          learning fast, and shipping reliable solutions.
        </p>
        <p>
          My current work spans full-stack development, backend systems,
          and continuous improvement of production-ready engineering skills.
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
        <h2>Writeups</h2>
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
      <a class="cta" href="mailto:marco@marcopisco.com">Email Me</a>
    </section>
  </main>

  <footer>
    <div class="container footer-wrap">
      <p>&copy; ${new Date().getFullYear()} Marco Pisco. All rights reserved.</p>
      <div>
        <a href="https://github.com/marpisco" target="_blank" rel="noreferrer">GitHub</a>
        <a href="https://www.linkedin.com/in/marco-p-440068329/" target="_blank" rel="noreferrer">LinkedIn</a>
      </div>
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
  } catch {
    list.innerHTML = '<article class="card"><p class="summary">Writeups index missing. Add files to public/writeups.</p></article>';
  }
}

void loadWriteups();
