"use client";
import { useEffect, useRef, useState, ReactNode } from "react";

const useInView = (threshold = 0.15) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible] as const;
};

const FadeIn = ({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) => {
  const [ref, visible] = useInView();
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(24px)",
      transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s`,
    }}>
      {children}
    </div>
  );
};

const Logo = ({ size = 44 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M40 8 C24 8 14 20 14 34 C14 44 18 52 26 57 L26 64 C26 66 28 68 30 68 L50 68 C52 68 54 66 54 64 L54 57 C62 52 66 44 66 34 C66 20 56 8 40 8 Z" fill="none" stroke="#4A7C6F" strokeWidth="1.8" strokeLinejoin="round"/>
    <line x1="30" y1="68" x2="50" y2="68" stroke="#4A7C6F" strokeWidth="1.8"/>
    <path d="M29 42 L40 32 L51 42" fill="none" stroke="#4A7C6F" strokeWidth="1.4" strokeLinejoin="round"/>
    <rect x="31" y="42" width="18" height="14" rx="0.5" fill="none" stroke="#4A7C6F" strokeWidth="1.4"/>
    <rect x="37" y="49" width="6" height="7" rx="3" fill="none" stroke="#4A7C6F" strokeWidth="1.2"/>
    <rect x="33" y="44" width="4" height="4" rx="0.5" fill="none" stroke="#4A7C6F" strokeWidth="1"/>
    <rect x="43" y="44" width="4" height="4" rx="0.5" fill="none" stroke="#4A7C6F" strokeWidth="1"/>
    <rect x="44" y="29" width="3" height="5" fill="none" stroke="#4A7C6F" strokeWidth="1.2"/>
    <line x1="40" y1="27" x2="40" y2="24" stroke="#4A7C6F" strokeWidth="1" opacity="0.5"/>
    <line x1="35" y1="29" x2="33" y2="27" stroke="#4A7C6F" strokeWidth="1" opacity="0.4"/>
    <line x1="45" y1="29" x2="47" y2="27" stroke="#4A7C6F" strokeWidth="1" opacity="0.4"/>
  </svg>
);

const steps = [
  { n: "01", title: "Ankommen & Verstehen", desc: "Du lernst dein Nervensystem kennen – warum du reagierst wie du reagierst. Erste sanfte Übungen bringen dich in Kontakt mit deinem Körper." },
  { n: "02", title: "Erkennen & Klarheit", desc: "Du entdeckst deine inneren Muster, arbeitest mit Hypnose in die Tiefe und gewinnst emotionale Klarheit über deine Bedürfnisse." },
  { n: "03", title: "Verankern & Leben", desc: "Neue Gewohnheiten werden zur gelebten Realität. Du trägst deine innere Stabilität in den Alltag – dauerhaft und verkörpert." },
];

const features = [
  { icon: "◎", title: "Nervensystem-Regulation", desc: "Konkrete Techniken, um aus dem Überreiz-Modus herauszukommen – sofort anwendbar." },
  { icon: "◇", title: "Hypnose-Audios", desc: "Tiefenwirksame Audios, die dein Unterbewusstsein sanft umprogrammieren." },
  { icon: "○", title: "Grenzen setzen", desc: "Du lernst Nein zu sagen – ohne Schuldgefühle, ohne Erklärungen." },
  { icon: "△", title: "Workbook & Übungen", desc: "Dein persönliches Begleitbuch mit allen Reflexionen und Yoga-Sequenzen." },
  { icon: "□", title: "Live-Begleitung", desc: "Persönliche Calls, damit du nie allein durch deinen Prozess gehst." },
  { icon: "⬡", title: "Innere Sicherheit", desc: "Du gehst ruhiger, klarer und verbundener durch dein Leben – langfristig." },
];

const logos = ["Yoga Journal", "Mindful", "SWR", "Flow", "Achtsamkeit.de", "Breathe"];

const footerCols = [
  {
    titel: "Programm",
    links: [
      { name: "Über mich", href: "#" },
      { name: "8 Wochen", href: "#" },
      { name: "Testimonials", href: "#" },
    ],
  },
  {
    titel: "Info",
    links: [
      { name: "FAQ", href: "#" },
      { name: "Kontakt", href: "mailto:deine@email.de" },
      { name: "Datenschutz", href: "/datenschutz" },
      { name: "Impressum", href: "/impressum" },
    ],
  },
  {
    titel: "Folge mir",
    links: [
      { name: "Instagram", href: "#" },
      { name: "Newsletter", href: "#" },
      { name: "Podcast", href: "#" },
    ],
  },
];

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      <style global jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600&family=League+Spartan:wght@400;600;700&family=Lato:ital,wght@0,300;0,400;0,700;1,300;1,400&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --mint: #4A7C6F;
          --mint-light: #7AADA0;
          --mint-pale: #D6EDE7;
          --mint-bg: #EEF6F3;
          --bg: #F7FAF9;
          --dark: #2C3E35;
          --text: #3A4E45;
          --muted: #6B8C82;
        }
        body { background: var(--bg); color: var(--text); }
        .btn-primary {
          display: inline-block; background: var(--mint); color: #F7FAF9;
          padding: 15px 40px; border-radius: 100px;
          font-family: 'League Spartan', sans-serif; font-size: 14px;
          letter-spacing: 0.08em; font-weight: 600; cursor: pointer; border: none;
          transition: background 0.25s, transform 0.2s, box-shadow 0.25s;
          text-decoration: none;
        }
        .btn-primary:hover { background: #3A6459; transform: translateY(-2px); box-shadow: 0 8px 28px rgba(74,124,111,0.28); }
        .btn-outline {
          display: inline-block; background: transparent; color: var(--mint);
          padding: 13px 38px; border-radius: 100px;
          font-family: 'League Spartan', sans-serif; font-size: 14px;
          letter-spacing: 0.08em; font-weight: 600; cursor: pointer;
          border: 1.5px solid var(--mint);
          transition: all 0.25s; text-decoration: none;
        }
        .btn-outline:hover { background: var(--mint); color: #F7FAF9; transform: translateY(-2px); }
        .feature-card {
          background: #fff; border: 1px solid #C8E0D8; border-radius: 18px;
          padding: 30px 26px; transition: transform 0.25s, box-shadow 0.25s;
        }
        .feature-card:hover { transform: translateY(-4px); box-shadow: 0 12px 36px rgba(74,124,111,0.1); }
        .nav-link { color: var(--mint); font-size: 14px; text-decoration: none; letter-spacing: 0.06em; transition: color 0.2s; font-family: 'Lato', sans-serif; }
        .nav-link:hover { color: var(--dark); }
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .features-grid { grid-template-columns: 1fr !important; }
          .steps-grid { grid-template-columns: 1fr !important; }
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
          .hero-pad { padding: 60px 28px !important; }
        }
      `}</style>

      {typeof document !== "undefined" && (() => {
        const id = "gfonts-sb";
        if (!document.getElementById(id)) {
          const l = document.createElement("link");
          l.id = id; l.rel = "stylesheet";
          l.href = "https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600&family=League+Spartan:wght@400;600;700&family=Lato:ital,wght@0,300;0,400;0,700;1,300;1,400&display=swap";
          document.head.appendChild(l);
        }
        return null;
      })()}

      <div style={{ background: "var(--bg)", color: "var(--text)", overflowX: "hidden" }}>

        {/* NAV */}
        <nav style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          background: scrolled ? "rgba(247,250,249,0.96)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid #C8E0D8" : "none",
          transition: "all 0.35s ease", padding: "16px 48px",
          display: "flex", justifyContent: "space-between", alignItems: "center"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Logo size={38} />
            <div style={{ lineHeight: 1 }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 3 }}>
                <span style={{ fontFamily: "'Dancing Script', cursive", fontSize: 22, color: "var(--mint)", fontWeight: 600 }}>System</span>
                <span style={{ fontFamily: "'League Spartan', sans-serif", fontSize: 16, color: "var(--dark)", fontWeight: 700, letterSpacing: "0.04em" }}>Balance</span>
              </div>
              <div style={{ fontFamily: "'Lato', sans-serif", fontSize: 10, letterSpacing: "0.18em", color: "var(--mint-light)", textTransform: "uppercase", marginTop: 2 }}>
                Der innere Raum
              </div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
            <a href="#programm" className="nav-link">Programm</a>
            <a href="#ablauf" className="nav-link">Ablauf</a>
            <a href="#start" className="btn-primary" style={{ padding: "10px 24px", fontSize: 13 }}>Anmelden</a>
          </div>
        </nav>

        {/* HERO */}
        <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "120px 48px 80px", position: "relative" }}>
          <FadeIn>
            <p style={{ fontFamily: "'Lato', sans-serif", fontSize: 11, letterSpacing: "0.28em", color: "var(--mint-light)", textTransform: "uppercase", marginBottom: 32 }}>
              8-Wochen-Programm · Coaching
            </p>
            <div style={{ marginBottom: 32 }}>
              <div style={{ fontFamily: "'Dancing Script', cursive", fontSize: "clamp(52px, 7vw, 90px)", color: "var(--mint)", lineHeight: 1, fontWeight: 600 }}>
                Raum
              </div>
              <div style={{ fontFamily: "'Lato', sans-serif", fontSize: "clamp(13px, 1.5vw, 16px)", letterSpacing: "0.2em", color: "var(--mint-light)", margin: "4px 0 8px", textTransform: "uppercase" }}>
                für
              </div>
              <div style={{ fontFamily: "'League Spartan', sans-serif", fontSize: "clamp(32px, 5vw, 62px)", fontWeight: 700, color: "var(--dark)", letterSpacing: "0.04em", lineHeight: 1 }}>
                INNERE PROZESSE
              </div>
            </div>
            <p style={{ fontFamily: "'Lato', sans-serif", fontSize: 18, lineHeight: 1.8, color: "var(--text)", maxWidth: 500, margin: "0 auto 12px" }}>
              Finde zurück in deine innere Ruhe – ohne dich weiter zu überfordern.
            </p>
            <p style={{ fontFamily: "'Lato', sans-serif", fontStyle: "italic", fontSize: 15, lineHeight: 1.7, color: "var(--muted)", maxWidth: 460, margin: "0 auto 44px" }}>
              Für Yogalehrerinnen & Coaches, die viel geben, aber sich selbst kaum noch spüren.
            </p>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center", marginBottom: 52 }}>
              <a href="#start" className="btn-primary">8 Wochen Programm</a>
              <a href="#ablauf" className="btn-outline">Mehr erfahren</a>
            </div>
            <div style={{ display: "flex", gap: 36, flexWrap: "wrap", justifyContent: "center" }}>
              {["✔ Ruhiger reagieren", "✔ Klar Nein sagen", "✔ Wieder du sein"].map((t) => (
                <span key={t} style={{ fontFamily: "'Lato', sans-serif", fontSize: 13, color: "var(--muted)" }}>{t}</span>
              ))}
            </div>
          </FadeIn>
          <div style={{ position: "absolute", top: "12%", right: "6%", width: 220, height: 220, borderRadius: "50%", border: "1px solid rgba(122,173,160,0.2)", pointerEvents: "none" }}/>
          <div style={{ position: "absolute", top: "18%", right: "10%", width: 120, height: 120, borderRadius: "50%", border: "1px solid rgba(122,173,160,0.15)", pointerEvents: "none" }}/>
          <div style={{ position: "absolute", bottom: "10%", left: "5%", width: 160, height: 160, borderRadius: "50%", border: "1px solid rgba(122,173,160,0.15)", pointerEvents: "none" }}/>
        </section>

        {/* SOCIAL PROOF */}
        <section style={{ background: "var(--mint-bg)", borderTop: "1px solid #C8E0D8", borderBottom: "1px solid #C8E0D8", padding: "28px 48px" }}>
          <FadeIn>
            <div style={{ maxWidth: 920, margin: "0 auto", display: "flex", alignItems: "center", gap: 44, flexWrap: "wrap", justifyContent: "center" }}>
              <span style={{ fontFamily: "'Lato', sans-serif", fontSize: 11, letterSpacing: "0.2em", color: "var(--mint-light)", textTransform: "uppercase", whiteSpace: "nowrap" }}>Bekannt aus</span>
              {logos.map(l => (
                <span key={l} style={{ fontFamily: "'Lato', sans-serif", fontStyle: "italic", fontSize: 15, color: "var(--mint)", opacity: 0.6 }}>{l}</span>
              ))}
            </div>
          </FadeIn>
        </section>

        {/* HOW IT WORKS */}
        <section id="ablauf" style={{ padding: "100px 48px", maxWidth: 1060, margin: "0 auto" }}>
          <FadeIn>
            <p style={{ fontFamily: "'Lato', sans-serif", fontSize: 11, letterSpacing: "0.24em", color: "var(--mint-light)", textTransform: "uppercase", textAlign: "center", marginBottom: 12 }}>Der Weg</p>
            <h2 style={{ fontFamily: "'League Spartan', sans-serif", fontSize: "clamp(26px, 3vw, 42px)", fontWeight: 600, textAlign: "center", color: "var(--dark)", marginBottom: 12, letterSpacing: "0.02em" }}>
              So läuft dein Prozess ab
            </h2>
            <p style={{ fontFamily: "'Lato', sans-serif", fontStyle: "italic", fontSize: 16, color: "var(--muted)", textAlign: "center", maxWidth: 420, margin: "0 auto 72px" }}>
              Drei Phasen, die dich sanft und nachhaltig verändern.
            </p>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 48 }} className="steps-grid">
            {steps.map((s, i) => (
              <FadeIn key={s.n} delay={i * 0.15}>
                <div style={{ position: "relative" }}>
                  {i < steps.length - 1 && (
                    <div style={{ position: "absolute", top: 26, left: "calc(50% + 28px)", width: "calc(100% - 56px)", height: 1, background: "linear-gradient(90deg, #C8E0D8, transparent)" }} />
                  )}
                  <div style={{ width: 52, height: 52, borderRadius: "50%", background: "var(--mint-pale)", border: "1px solid #A8D5C8", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 22 }}>
                    <span style={{ fontFamily: "'Lato', sans-serif", fontSize: 12, color: "var(--mint)", letterSpacing: "0.06em" }}>{s.n}</span>
                  </div>
                  <h3 style={{ fontFamily: "'League Spartan', sans-serif", fontSize: 17, fontWeight: 600, marginBottom: 10, color: "var(--dark)", letterSpacing: "0.02em" }}>{s.title}</h3>
                  <p style={{ fontFamily: "'Lato', sans-serif", fontSize: 15, lineHeight: 1.75, color: "var(--muted)" }}>{s.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* FEATURES */}
        <section id="programm" style={{ background: "var(--mint-bg)", padding: "100px 48px" }}>
          <div style={{ maxWidth: 1060, margin: "0 auto" }}>
            <FadeIn>
              <p style={{ fontFamily: "'Lato', sans-serif", fontSize: 11, letterSpacing: "0.24em", color: "var(--mint-light)", textTransform: "uppercase", textAlign: "center", marginBottom: 12 }}>Was du bekommst</p>
              <h2 style={{ fontFamily: "'League Spartan', sans-serif", fontSize: "clamp(26px, 3vw, 42px)", fontWeight: 600, textAlign: "center", color: "var(--dark)", marginBottom: 72, letterSpacing: "0.02em" }}>
                Dein vollständiges Programm
              </h2>
            </FadeIn>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 22 }} className="features-grid">
              {features.map((f, i) => (
                <FadeIn key={f.title} delay={i * 0.08}>
                  <div className="feature-card">
                    <div style={{ fontSize: 20, marginBottom: 14, color: "var(--mint)" }}>{f.icon}</div>
                    <h3 style={{ fontFamily: "'League Spartan', sans-serif", fontSize: 16, fontWeight: 600, marginBottom: 8, color: "var(--dark)", letterSpacing: "0.02em" }}>{f.title}</h3>
                    <p style={{ fontFamily: "'Lato', sans-serif", fontSize: 14, lineHeight: 1.75, color: "var(--muted)" }}>{f.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIAL */}
        <section style={{ padding: "80px 48px", maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <FadeIn>
            <div style={{ color: "var(--mint-pale)", fontSize: 64, lineHeight: 1, fontFamily: "Georgia, serif", marginBottom: -12 }}>"</div>
            <p style={{ fontFamily: "'Lato', sans-serif", fontStyle: "italic", fontSize: 20, lineHeight: 1.8, color: "var(--text)", marginBottom: 24 }}>
              Nach 8 Wochen fühle ich mich zum ersten Mal seit Jahren wirklich bei mir. Ich reagiere ruhiger, sage klarer Nein und spüre mich wieder.
            </p>
            <p style={{ fontFamily: "'Lato', sans-serif", fontSize: 13, color: "var(--mint-light)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              Sandra M. — Yogalehrerin
            </p>
          </FadeIn>
        </section>

        {/* BOTTOM CTA */}
        <section id="start" style={{ background: "var(--dark)", padding: "100px 48px", textAlign: "center", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: -60, left: -60, width: 260, height: 260, borderRadius: "50%", border: "1px solid rgba(122,173,160,0.12)", pointerEvents: "none" }}/>
          <div style={{ position: "absolute", bottom: -50, right: -50, width: 200, height: 200, borderRadius: "50%", border: "1px solid rgba(122,173,160,0.12)", pointerEvents: "none" }}/>
          <FadeIn>
            <Logo size={56} />
            <div style={{ marginTop: 28, marginBottom: 20 }}>
              <span style={{ fontFamily: "'Dancing Script', cursive", fontSize: "clamp(36px, 5vw, 58px)", color: "var(--mint-light)", fontWeight: 600 }}>Raum</span>
              <span style={{ fontFamily: "'Lato', sans-serif", fontSize: "clamp(13px, 1.5vw, 15px)", letterSpacing: "0.2em", color: "var(--mint-light)", margin: "0 10px", textTransform: "uppercase" }}>für deinen</span>
              <div style={{ fontFamily: "'League Spartan', sans-serif", fontSize: "clamp(28px, 4vw, 50px)", fontWeight: 700, color: "#F7FAF9", letterSpacing: "0.04em", lineHeight: 1.1 }}>
                INNEREN PROZESS
              </div>
            </div>
            <p style={{ fontFamily: "'Lato', sans-serif", fontSize: 17, color: "#A8D5C8", maxWidth: 440, margin: "0 auto 40px", lineHeight: 1.8 }}>
              Beginne jetzt deinen 8-Wochen-Prozess und finde zurück zu dir – nachhaltig und verkörpert.
            </p>
            <a href="#" className="btn-primary" style={{ background: "var(--mint-light)", color: "var(--dark)" }}>
              8 Wochen Programm starten
            </a>
            <p style={{ fontFamily: "'Lato', sans-serif", marginTop: 18, fontSize: 13, color: "#4A7C6F", letterSpacing: "0.04em" }}>
              Nur wenige Plätze verfügbar · Persönliche Begleitung inklusive
            </p>
          </FadeIn>
        </section>

        {/* FOOTER */}
        <footer style={{ background: "#1A2E28", padding: "60px 72px 36px", color: "#5A8A7E" }}>
          <div style={{ maxWidth: 1060, margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48, marginBottom: 48 }} className="footer-grid">
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                  <Logo size={36} />
                  <div>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 3 }}>
                      <span style={{ fontFamily: "'Dancing Script', cursive", fontSize: 18, color: "#7AADA0", fontWeight: 600 }}>System</span>
                      <span style={{ fontFamily: "'League Spartan', sans-serif", fontSize: 13, color: "#A8D5C8", fontWeight: 700, letterSpacing: "0.04em" }}>Balance</span>
                    </div>
                    <div style={{ fontFamily: "'Lato', sans-serif", fontSize: 10, letterSpacing: "0.14em", color: "#4A7C6F", textTransform: "uppercase", fontStyle: "italic" }}>Der innere Raum</div>
                  </div>
                </div>
                <p style={{ fontFamily: "'Lato', sans-serif", fontSize: 14, lineHeight: 1.75, maxWidth: 220 }}>
                  Für Yogalehrerinnen & Coaches auf dem Weg zu sich selbst.
                </p>
              </div>
              {footerCols.map(col => (
                <div key={col.titel}>
                  <p style={{ fontFamily: "'League Spartan', sans-serif", fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "#7AADA0", marginBottom: 16, fontWeight: 600 }}>
                    {col.titel}
                  </p>
                  {col.links.map(l => (
                    <p key={l.name} style={{ marginBottom: 10 }}>
                      <a
                        href={l.href}
                        style={{ fontFamily: "'Lato', sans-serif", fontSize: 14, color: "#5A8A7E", textDecoration: "none", transition: "color 0.2s" }}
                        onMouseOver={e => { e.currentTarget.style.color = "#A8D5C8"; }}
                        onMouseOut={e => { e.currentTarget.style.color = "#5A8A7E"; }}
                      >
                        {l.name}
                      </a>
                    </p>
                  ))}
                </div>
              ))}
            </div>
            <div style={{ borderTop: "1px solid #2C3E35", paddingTop: 24, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
              <p style={{ fontFamily: "'Lato', sans-serif", fontSize: 13 }}>© 2026 SystemBalance – Der innere Raum. Alle Rechte vorbehalten.</p>
              <p style={{ fontFamily: "'Lato', sans-serif", fontSize: 13, fontStyle: "italic" }}>Mit ♡ für deinen inneren Prozess</p>
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}
