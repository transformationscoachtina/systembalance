"use client";
import { useEffect, useState } from "react";
import { createClient } from "../../lib/supabase";
import { useRouter } from "next/navigation";

const wochen = [
  { nr: 1, titel: "Stabilität", phase: "Phase 1", beschreibung: "Nervensystem verstehen & erste Regulation" },
  { nr: 2, titel: "Körperwahrnehmung", phase: "Phase 1", beschreibung: "Tiefer in die Körperverbindung" },
  { nr: 3, titel: "Innere Muster", phase: "Phase 2", beschreibung: "Muster erkennen & verstehen" },
  { nr: 4, titel: "Emotionale Klarheit", phase: "Phase 2", beschreibung: "Hypnose zur Tiefe" },
  { nr: 5, titel: "Grenzen setzen", phase: "Phase 3", beschreibung: "Nein sagen lernen" },
  { nr: 6, titel: "Energetische Grenzen", phase: "Phase 3", beschreibung: "Umsetzung im Alltag" },
  { nr: 7, titel: "Neue Gewohnheiten", phase: "Phase 4", beschreibung: "Verkörperung & Integration" },
  { nr: 8, titel: "Innere Stabilität", phase: "Phase 4", beschreibung: "Abschluss & Festigung" },
];

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [aktuelleWoche, setAktuelleWoche] = useState(1);
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
      } else {
        setUser(user);
      }
    };
    getUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  if (!user) return null;

  return (
    <main style={{ minHeight: "100vh", background: "#F7FAF9", fontFamily: "'Lato', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=League+Spartan:wght@600;700&family=Lato:wght@300;400;700&display=swap');
      `}</style>

      {/* Header */}
      <nav style={{ background: "#fff", borderBottom: "1px solid #C8E0D8", padding: "16px 48px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <span style={{ fontFamily: "'Dancing Script', cursive", fontSize: 20, color: "#4A7C6F" }}>System</span>
          <span style={{ fontFamily: "'League Spartan', sans-serif", fontSize: 15, color: "#2C3E35", fontWeight: 700 }}>Balance</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <span style={{ fontSize: 14, color: "#7AADA0" }}>{user.email}</span>
          <button onClick={handleLogout} style={{ background: "none", border: "1px solid #C8E0D8", borderRadius: 100, padding: "8px 20px", fontSize: 13, color: "#4A7C6F", cursor: "pointer" }}>
            Abmelden
          </button>
        </div>
      </nav>

      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "48px 32px" }}>

        {/* Begrüssung */}
        <div style={{ marginBottom: 40 }}>
          <p style={{ fontSize: 13, letterSpacing: "0.2em", color: "#7AADA0", textTransform: "uppercase", marginBottom: 8 }}>Dein Programm</p>
          <h1 style={{ fontFamily: "'League Spartan', sans-serif", fontSize: 32, color: "#2C3E35", fontWeight: 700, marginBottom: 8 }}>
            SYSTEMBALANCE
          </h1>
          <p style={{ fontSize: 16, color: "#6B8C82", fontStyle: "italic" }}>
            8 Wochen · Innerer Raum
          </p>
        </div>

        {/* Fortschrittsbalken */}
        <div style={{ background: "#fff", border: "1px solid #C8E0D8", borderRadius: 16, padding: "24px 28px", marginBottom: 40 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
            <span style={{ fontSize: 14, color: "#2C3E35", fontWeight: 700 }}>Dein Fortschritt</span>
            <span style={{ fontSize: 14, color: "#7AADA0" }}>Woche {aktuelleWoche} von 8</span>
          </div>
          <div style={{ background: "#EEF6F3", borderRadius: 100, height: 8 }}>
            <div style={{ background: "#4A7C6F", borderRadius: 100, height: 8, width: `${(aktuelleWoche / 8) * 100}%`, transition: "width 0.5s ease" }} />
          </div>
        </div>

        {/* Wochen Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          {wochen.map((w) => {
            const aktiv = w.nr === aktuelleWoche;
            const abgeschlossen = w.nr < aktuelleWoche;
            const gesperrt = w.nr > aktuelleWoche;
            return (
              <div
                key={w.nr}
                onClick={() => !gesperrt && router.push(`/dashboard/woche/${w.nr}`)}
                style={{
                  background: aktiv ? "#4A7C6F" : abgeschlossen ? "#EEF6F3" : "#fff",
                  border: `1px solid ${aktiv ? "#4A7C6F" : "#C8E0D8"}`,
                  borderRadius: 16, padding: "20px 18px",
                  cursor: gesperrt ? "not-allowed" : "pointer",
                  opacity: gesperrt ? 0.45 : 1,
                  transition: "all 0.2s ease",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                  <span style={{ fontSize: 11, color: aktiv ? "rgba(255,255,255,0.7)" : "#7AADA0", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                    {w.phase}
                  </span>
                  <span style={{ fontSize: 18 }}>
                    {abgeschlossen ? "✓" : gesperrt ? "🔒" : ""}
                  </span>
                </div>
                <p style={{ fontSize: 11, color: aktiv ? "rgba(255,255,255,0.6)" : "#A8C5BC", marginBottom: 4 }}>
                  Woche {w.nr}
                </p>
                <h3 style={{ fontFamily: "'League Spartan', sans-serif", fontSize: 15, fontWeight: 600, color: aktiv ? "#fff" : "#2C3E35", marginBottom: 6 }}>
                  {w.titel}
                </h3>
                <p style={{ fontSize: 12, color: aktiv ? "rgba(255,255,255,0.75)" : "#7AADA0", lineHeight: 1.5 }}>
                  {w.beschreibung}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </main>
  );
}