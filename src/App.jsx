import { useEffect, useRef, useState } from "react";
import "./App.css";

/* ── Scroll reveal hooks ─────────────────────── */
function useReveal(threshold = 0.12, delay = 0) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setTimeout(() => el.classList.add("v"), delay);
          io.disconnect();
        }
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay, threshold]);
  return ref;
}

function useDivider() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add("rev"); io.disconnect(); } },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

/* ── Components ──────────────────────────────── */
function R({ children, delay = 0, style = {} }) {
  const ref = useReveal(0.12, delay);
  return <div className="r" ref={ref} style={style}>{children}</div>;
}

function Div() {
  const ref = useDivider();
  return <div className="divider" ref={ref} />;
}

/* Project card — iframe preview with fallback */
function ProjCard({ url, name, type, delay = 0 }) {
  const [failed, setFailed] = useState(false);
  const iframeRef = useRef(null);

  useEffect(() => {
    // Give iframe 4s to load, show fallback if blocked
    const timer = setTimeout(() => setFailed(true), 4000);
    const el = iframeRef.current;
    if (el) {
      el.onload = () => clearTimeout(timer);
      el.onerror = () => { clearTimeout(timer); setFailed(true); };
    }
    return () => clearTimeout(timer);
  }, []);

  return (
    <R delay={delay}>
      <a
        className="proj-card"
        href={url}
        target="_blank"
        rel="noreferrer"
      >
        <div className="proj-preview">
          <div className="proj-iframe-wrap">
            <iframe
              ref={iframeRef}
              src={url}
              title={name}
              loading="lazy"
              sandbox="allow-scripts allow-same-origin"
            />
          </div>
          {/* Fallback shown if iframe is blocked */}
          <div className={`proj-fallback${failed ? " show" : ""}`}>
            <div className="proj-fallback-icon">
              <svg viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="9"/>
                <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2z"/>
              </svg>
            </div>
            <span className="proj-fallback-name">{name}</span>
          </div>
          {/* Hover overlay */}
          <div className="proj-overlay">
            <span className="proj-overlay-btn">Ver sitio ↗</span>
          </div>
        </div>
        <div className="proj-info">
          <span className="proj-name">{name}</span>
          <span className="proj-type">{type}</span>
        </div>
      </a>
    </R>
  );
}

const MARQUEE = [
  "React", "Spring Boot", "JavaScript", "MySQL",
  "PHP", "Laravel 12", "Node.js", "UX · UI",
  "Full Stack", "Git", "Postman", "Lima · Perú",
];

/* ── App ─────────────────────────────────────── */
export default function App() {
  return (
    <>
      {/* ── NAV ── */}
      <nav className="nav">
        <span className="nav-logo">AT · Portfolio</span>
        <ul className="nav-links">
          <li><a href="#sobre">Sobre mí</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#experiencia">Experiencia</a></li>
          <li><a href="#proyectos">Proyectos</a></li>
          <li><a href="#contacto">Contacto</a></li>
        </ul>
      </nav>

      {/* ══════ HERO ══════ */}
      <section className="hero">
        <div className="hero-inner">

          {/* Left */}
          <div className="hero-left">
            <div className="hero-eyebrow">
              <span className="hero-eyebrow-line" />
              <span>Desarrollador · Jr Level</span>
            </div>

            <p className="hero-greeting">Hola, soy</p>

            <h1 className="hero-name">
              Adriano<br />
              <span className="accent">Jhamir</span><br />
              Tocas James
            </h1>

            <div className="hero-role-row">
              <span className="hero-role-badge">Frontend & Backend</span>
              <span className="hero-role-text">Rímac, Lima · Perú</span>
            </div>

            <p className="hero-desc">
              Construyo sistemas completos — diseño, código y lógica de negocio.
              Me interesa que cada producto se sienta pensado.
            </p>

            <div className="hero-cta">
              <a className="btn-primary" href="#contacto">Contactar</a>
              <a className="btn-ghost" href="https://github.com/Adrianolm28" target="_blank" rel="noreferrer">
                <span>→</span> Ver GitHub
              </a>
            </div>
          </div>

          {/* Right — photo */}
          <div className="hero-photo-wrap">
            <div className="hero-photo-frame">
              {/*
                FOTO: Reemplaza el src con tu imagen.
                Opción 1: import foto from './assets/foto.jpg'  →  src={foto}
                Opción 2: URL directa a tu foto online
              */}
              <img
                className="hero-photo"
                src="https://keepcoding.io/wp-content/smush-webp/2025/04/fx34keqiew-1-1024x683.jpg.webp"
                alt="Adriano Tocas James"
              />
            </div>
            <p className="hero-photo-label">Adriano Tocas · {new Date().getFullYear()}</p>
          </div>

        </div>
      </section>

      {/* ══════ MARQUEE ══════ */}
      <div className="marquee-strip">
        <div className="marquee-track" aria-hidden>
          {[...MARQUEE, ...MARQUEE].map((item, i) => (
            <span key={i} className="marquee-item">
              {item}<span className="marquee-sep"> · </span>
            </span>
          ))}
        </div>
      </div>

      <div className="content">

        {/* ══════ ABOUT ══════ */}
        <section className="about" id="sobre">
          <R>
            <div className="sec-header">
              <span className="sec-num">01</span>
              <span className="sec-label">Sobre mí</span>
            </div>
          </R>

          <div className="about-grid">
            <R delay={80}>
              <p className="about-text">
                Desarrollador con <strong>7 meses de experiencia</strong> en
                entorno real. Me encargo del frontend, backend, diseño UX/UI y
                sistemas administrables. Trabajo con <strong>React y Spring Boot</strong> sin
                asistencia de IA — y con Laravel, PHP y Node.js cuando la situación
                lo requiere.
              </p>
            </R>

            <R delay={160}>
              <div className="about-stats">
                <div className="stat-box">
                  <div className="stat-n">7<sup>m</sup></div>
                  <div className="stat-d">Experiencia real</div>
                </div>
                <div className="stat-box">
                  <div className="stat-n">2</div>
                  <div className="stat-d">Stacks dominados</div>
                </div>
                <div className="stat-box">
                  <div className="stat-n">5<sup>to</sup></div>
                  <div className="stat-d">Ciclo universitario</div>
                </div>
                <div className="stat-box">
                  <div className="stat-n">360°</div>
                  <div className="stat-d">Dev + UX + DB</div>
                </div>
              </div>
            </R>
          </div>
        </section>

        <Div />

        {/* ══════ SKILLS ══════ */}
        <section className="skills" id="skills">
          <R>
            <div className="sec-header">
              <span className="sec-num">02</span>
              <span className="sec-label">Tecnologías</span>
            </div>
          </R>

          <R delay={100}>
            <div className="skills-grid">

              <div className="skill-col">
                <p className="skill-col-title">Sin IA · Dominio propio</p>
                <div className="skill-list">
                  {["React", "JavaScript", "Spring Boot", "MySQL"].map(s => (
                    <span className="skill-item" key={s}>
                      <span className="skill-dot" />{s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="skill-col">
                <p className="skill-col-title">Con apoyo de IA</p>
                <div className="skill-list">
                  {["PHP", "Laravel 12", "CodeIgniter", "Node.js"].map(s => (
                    <span className="skill-item" key={s}>
                      <span className="skill-dot" />{s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="skill-col">
                <p className="skill-col-title">Herramientas</p>
                <div className="skill-list">
                  {["Git / GitHub", "VS Code", "IntelliJ IDEA", "Postman", "cPanel · XAMPP"].map(s => (
                    <span className="skill-item" key={s}>
                      <span className="skill-dot" />{s}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </R>
        </section>

        <Div />

        {/* ══════ EXPERIENCE ══════ */}
        <section className="experience" id="experiencia">
          <R>
            <div className="sec-header">
              <span className="sec-num">03</span>
              <span className="sec-label">Experiencia</span>
            </div>
          </R>

          <R delay={100}>
            <div className="exp-card">
              <div className="exp-top">
                <p className="exp-role">Frontend & Backend Developer</p>
                <p className="exp-year">2024 — actual</p>
              </div>
              <p className="exp-company">Siga S.A.C · San Miguel, Lima</p>
              <p className="exp-desc">
                Desarrollo de interfaces y lógica de negocio, diseño UX/UI,
                construcción de sistemas administrables y gestión completa de base de datos.
                Participación en todo el ciclo de vida del producto.
              </p>
              <div className="exp-tags">
                {["React", "Spring Boot", "MySQL", "UX/UI", "Admin Systems", "Full Stack"].map(t => (
                  <span className="exp-tag" key={t}>{t}</span>
                ))}
              </div>
            </div>
          </R>
        </section>

        <Div />

        {/* ══════ PROJECTS ══════ */}
        <section className="projects" id="proyectos">
          <R>
            <div className="sec-header">
              <span className="sec-num">04</span>
              <span className="sec-label">Proyectos reales</span>
            </div>
          </R>

          <div className="projects-grid">
            <ProjCard
              url="https://clinicabariaesthetic.com/"
              name="Clínica Baria Esthetic"
              type="Clínica - Ecommerce · Web"
              delay={60}
            />
            <ProjCard
              url="https://jcspremiun.pe/"
              name="JCS Premiun"
              type="Empresa - Ecommerce · Web"
              delay={160}
            />
            <ProjCard
              url="https://comprapapaya.com/"
              name="Compra Papaya"
              type="Reserva · Web"
              delay={260}
            />
          </div>
        </section>

        <Div />

        {/* ══════ EDUCATION ══════ */}
        <section className="education">
          <R>
            <div className="sec-header">
              <span className="sec-num">05</span>
              <span className="sec-label">Educación</span>
            </div>
          </R>

          <R delay={80}>
            <div className="edu-row">
              <span className="edu-num">01</span>
              <div className="edu-sep" />
              <div>
                <p className="edu-name">Ingeniería de Software</p>
                <p className="edu-detail">
                  En curso · Lima, Perú
                  <span>5to Ciclo</span>
                </p>
              </div>
            </div>
          </R>
        </section>

        <Div />

        {/* ══════ CONTACT ══════ */}
        <section className="contact" id="contacto">
          <R>
            <div className="sec-header">
              <span className="sec-num">06</span>
              <span className="sec-label">Contacto</span>
            </div>
          </R>

          <div className="contact-grid">
            <R delay={60}>
              <h2 className="contact-headline">
                Hablemos<br />de algo<br /><span className="gold">real.</span>
              </h2>
              <p className="contact-sub">
                Estoy disponible para proyectos freelance,
                oportunidades de empleo o simplemente para hablar de código.
              </p>
            </R>

            <R delay={160}>
              <div className="contact-list">
                <a
                  className="contact-item"
                  href="https://github.com/Adrianolm28"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="ci-key">GitHub</span>
                  <span className="ci-val">
                    github.com/Adrianolm28
                    <span className="ci-arrow">↗</span>
                  </span>
                </a>
                <a className="contact-item" href="tel:+51970742235">
                  <span className="ci-key">Teléfono</span>
                  <span className="ci-val">
                    +51 970 742 235
                    <span className="ci-arrow">↗</span>
                  </span>
                </a>
                <div className="contact-item">
                  <span className="ci-key">Ubicación</span>
                  <span className="ci-val">Rímac, Lima · Perú</span>
                </div>
                <div className="contact-item">
                  <span className="ci-key">Nivel</span>
                  <span className="ci-val">Junior Developer</span>
                </div>
              </div>
            </R>
          </div>
        </section>

      </div>

      {/* ══════ FOOTER ══════ */}
      <footer className="footer">
        <span className="footer-logo">Adriano Tocas James</span>
        <span className="footer-copy">Portfolio · {new Date().getFullYear()} · Lima, Perú</span>
      </footer>
    </>
  );
}