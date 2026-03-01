(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function r(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(s){if(s.ep)return;s.ep=!0;const i=r(s);fetch(s.href,i)}})();const d=["Git","C#",".NET Framework","Python","SIP","Primavera ERP","Windows Server 2022","Active Directory","MySQL","MariaDB","PostgreSQL","C++","Java","HTML/CSS","Linux","Proxmox","Docker","Cloudflare","Authentik"],u=[{years:"Jan 2026 - Present",role:"Software Developer (Internship)",company:"Quantinfor - Consultoria Informatica",summary:"Internship role focused on software development in a hybrid setup in Malveira.",tags:["Git",".NET Framework","C#","Python","Software Prototyping"]},{years:"Apr 2025 - Aug 2025",role:"Software Developer (Internship)",company:"Visao Logica - Comercio Artigos de Informatica, Lda.",summary:"Developed with C# and Python, created SIP protocol demos, prepared customer computers and software, and built Primavera ERP extensions/forms.",tags:["C#","Python","SIP","Primavera ERP","On-site"]},{years:"2025 - Present",role:"Chief Information Security Officer",company:"LunarLabs LLC",summary:"Lead enterprise security strategy and infrastructure governance, hardening production systems and enforcing resilient, policy-driven IT operations.",tags:["Proxmox","Linux","Authentik","Cloudflare","Docker","Security Operations"]},{years:"2025 - Present",role:"System Administrator",company:"Darkless LTD",summary:"Management of hosting systems, administration of the Microsoft 365 tenant, and direct customer support across operational and service issues.",tags:["Proxmox","Microsoft 365","Linux","Docker"]}],h=[{years:"Sep 2023 - Jun 2026",school:"Agrupamento de Escolas Joaquim Inacio da Cruz Sobral",program:"Professional Course, IT Systems",summary:"Grade 12th. Training includes Office/VBA, web development (HTML/CSS), hardware and networking, Windows Server 2022 Active Directory, ERP deployment, programming (C++, C#, .NET, Java), SQL databases, and Apache/IIS administration.",tags:["Windows Server 2022","Active Directory","SQL","C++","C#","Java"]}],l=document.querySelector("#app");if(!l)throw new Error("Missing #app container");l.innerHTML=`
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
      <div class="avatar" aria-hidden="true">M</div>
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
        ${d.map(e=>`<span class="pill">${e}</span>`).join("")}
      </div>
    </section>

    <hr />

    <section id="experience" class="stack-section">
      <div>
        <p class="section-id">// 03.</p>
        <h2>Experience</h2>
      </div>
      <div class="cards">
        ${u.map(e=>`
              <article class="card">
                <p class="years">${e.years}</p>
                <h3>${e.role}</h3>
                <p class="company">${e.company}</p>
                <p class="summary">${e.summary}</p>
                <div class="tags">
                  ${e.tags.map(t=>`<span>${t}</span>`).join("")}
                </div>
              </article>
            `).join("")}
      </div>
    </section>

    <hr />

    <section id="education" class="stack-section">
      <div>
        <p class="section-id">// 04.</p>
        <h2>Education</h2>
      </div>
      <div class="cards">
        ${h.map(e=>`
              <article class="card">
                <p class="years">${e.years}</p>
                <h3>${e.school}</h3>
                <p class="company">${e.program}</p>
                <p class="summary">${e.summary}</p>
                <div class="tags">
                  ${e.tags.map(t=>`<span>${t}</span>`).join("")}
                </div>
              </article>
            `).join("")}
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
`;function n(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function m(e){const t=e.replace(/\r\n/g,`
`).split(`
`),r=[];let o=!1,s=!1;for(const i of t){const a=i.trim();if(a.startsWith("```")){o?(r.push("</code></pre>"),o=!1):(s&&(r.push("</ul>"),s=!1),r.push("<pre><code>"),o=!0);continue}if(o){r.push(`${n(i)}
`);continue}if(!a){s&&(r.push("</ul>"),s=!1);continue}if(a.startsWith("# ")){s&&(r.push("</ul>"),s=!1),r.push(`<h1>${n(a.slice(2))}</h1>`);continue}if(a.startsWith("## ")){s&&(r.push("</ul>"),s=!1),r.push(`<h2>${n(a.slice(3))}</h2>`);continue}if(a.startsWith("### ")){s&&(r.push("</ul>"),s=!1),r.push(`<h3>${n(a.slice(4))}</h3>`);continue}if(a.startsWith("- ")){s||(r.push("<ul>"),s=!0),r.push(`<li>${n(a.slice(2))}</li>`);continue}s&&(r.push("</ul>"),s=!1);const c=n(a).replace(/`([^`]+)`/g,"<code>$1</code>");r.push(`<p>${c}</p>`)}return s&&r.push("</ul>"),o&&r.push("</code></pre>"),r.join("")}function f(e){const t=document.querySelector("#writeup-viewer");t&&(t.classList.remove("hidden"),t.innerHTML=`<p class="summary">Loading ${n(e.title)}...</p>`,fetch(`/writeups/${e.slug}.md`).then(r=>{if(!r.ok)throw new Error("Writeup file not found");return r.text()}).then(r=>{const o=new Date(e.date).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"});t.innerHTML=`
        <p class="years">${n(o)}</p>
        <h3>${n(e.title)}</h3>
        <p class="summary">${n(e.summary)}</p>
        <div class="tags">${e.tags.map(s=>`<span>${n(s)}</span>`).join("")}</div>
        <div class="writeup-content">${m(r)}</div>
      `,t.scrollIntoView({behavior:"smooth",block:"start"})}).catch(()=>{t.innerHTML='<p class="summary">Failed to load this writeup file.</p>'}))}function v(){const e=document.querySelector("#writeup-viewer");e&&(e.classList.add("hidden"),e.innerHTML="")}async function y(){const e=document.querySelector("#writeups-list");if(!e)return;let t=null;try{const r=await fetch("/writeups/index.json");if(!r.ok)throw new Error("index not found");const o=await r.json();if(!Array.isArray(o)||o.length===0){e.innerHTML='<article class="card"><p class="summary">No writeups yet... :(</p></article>';return}e.innerHTML=o.map(i=>`
          <article class="card writeup-card" data-slug="${n(i.slug)}">
            <p class="years">${n(i.date)}</p>
            <h3>${n(i.title)}</h3>
            <p class="summary">${n(i.summary)}</p>
            <div class="tags">${i.tags.map(a=>`<span>${n(a)}</span>`).join("")}</div>
          </article>
        `).join("");const s=e.querySelectorAll(".writeup-card");for(const i of s)i.style.cursor="pointer",i.addEventListener("click",()=>{const a=i.dataset.slug;if(a&&a===t){v(),t=null;return}const c=o.find(p=>p.slug===a);c&&(f(c),t=c.slug)})}catch{e.innerHTML='<article class="card"><p class="summary">Writeups index missing. Add files to public/writeups.</p></article>'}}y();
