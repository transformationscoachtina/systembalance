"use client";
import { useEffect, useState } from "react";
import { createClient } from "../../../../lib/supabase";
import { useRouter, useParams } from "next/navigation";

const musterInhalte = {
  1: {
    titel: "Stabilität",
    phase: "Phase 1",
    beschreibung: "In dieser Woche lernst du dein Nervensystem kennen und verstehen. Du bekommst erste einfache Werkzeuge, um dich zu regulieren.",
    audios: [
      { id: 1, titel: "Einführung: Dein Nervensystem", dauer: "18 min" },
      { id: 2, titel: "Hypnose: Ankommen & Sicherheit", dauer: "24 min" },
      { id: 3, titel: "Atemübung: 4-7-8 Technik", dauer: "8 min" },
    ],
    pdfs: [
      { id: 1, titel: "Workbook Woche 1", seiten: "12 Seiten" },
      { id: 2, titel: "Nervensystem Cheatsheet", seiten: "2 Seiten" },
    ],
    yoga: [
      { id: 1, titel: "Sanfte Erdungssequenz", dauer: "20 min" },
    ],
  },
  2: {
    titel: "Körperwahrnehmung",
    phase: "Phase 1",
    beschreibung: "Du vertiefst die Verbindung zu deinem Körper und lernst seine Signale zu lesen.",
    audios: [
      { id: 1, titel: "Body-Scan Meditation", dauer: "22 min" },
      { id: 2, titel: "Hypnose: Körpervertrauen", dauer: "26 min" },
    ],
    pdfs: [
      { id: 1, titel: "Workbook Woche 2", seiten: "10 Seiten" },
    ],
    yoga: [
      { id: 1, titel: "Yin Yoga: Hüfte & Boden", dauer: "35 min" },
    ],
  },
};

export default function WochePage() {
  const params = useParams();
  const nr = parseInt(params.nr) || 1;
  const [user, setUser] = useState(null);
  const [spielend, setSpielend] = useState(null);
  const supabase = createClient();
  const router = useRouter();
  const inhalt = musterInhalte[nr] || musterInhalte[1];

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) router.push("/login");
      else setUser(user);
    };
    getUser();
  }, []);

  if (!user) return null;

  return (
    <main style={{ minHeight: "100vh", background: "#F7FAF9", fontFamily: "'Lato', sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=League+Spartan:wght@600;700&family=Lato:wght@300;400;700&display=swap');`}</style>

      {/* Header */}
      <nav style={{ background: "#fff", borderBottom: "1px solid #C8E0D8", padding: "16px 48px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <button onClick={() => router.push("/dashboard")} style={{ background: "none", border: "none", color: "#4A7C6F", fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
          ← Zurück zum Dashboard
        </button>
        <div>
          <span style={{ fontFamily: "'League Spartan', sans-serif", fontSize: 14, color: "#2C3E35", fontWeight: 700, letterSpacing: "0.04em" }}>SYSTEMBALANCE</span>
        </div>
      </nav>

      <div style={{ maxWidth: 800, margin: "0 auto", padding: "48px 32px" }}>

        {/* Woche Header */}
        <div style={{ marginBottom: 40 }}>
          <p style={{ fontSize: 11, letterSpacing: "0.2em", color: "#7AADA0", textTransform: "uppercase", marginBottom: 8 }}>
            {inhalt.phase} · Woche {nr}
          </p>
          <h1 style={{ fontFamily: "'League Spartan', sans-serif", fontSize: 36, color: "#2C3E35", fontWeight: 700, marginBottom: 12 }}>
            {inhalt.titel}
          </h1>
          <p style={{ fontSize: 16, color: "#6B8C82", lineHeight: 1.7, maxWidth: 560 }}>
            {inhalt.beschreibung}
          </p>
        </div>

        {/* Audios */}
        <div style={{ marginBottom: 36 }}>
          <h2 style={{ fontFamily: "'League Spartan', sans-serif", fontSize: 18, color: "#2C3E35", fontWeight: 600, marginBottom: 16, letterSpacing: "0.04em" }}>
            🎧 AUDIOS & HYPNOSE
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {inhalt.audios.map((a) => (
              <div key={a.id} style={{ background: spielend === a.id ? "#4A7C6F" : "#fff", border: "1px solid #C8E0D8", borderRadius: 14, padding: "18px 22px", display: "flex", justifyContent: "space-between", alignItems: "center", transition: "all 0.2s" }}>
                <div>
                  <p style={{ fontSize: 15, fontWeight: 700, color: spielend === a.id ? "#fff" : "#2C3E35", marginBottom: 4 }}>{a.titel}</p>
                  <p style={{ fontSize: 13, color: spielend === a.id ? "rgba(255,255,255,0.7)" : "#7AADA0" }}>{a.dauer}</p>
                </div>
                <button
                  onClick={() => setSpielend(spielend === a.id ? null : a.id)}
                  style={{ background: spielend === a.id ? "rgba(255,255,255,0.2)" : "#EEF6F3", border: "none", borderRadius: 100, width: 44, height: 44, fontSize: 18, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                >
                  {spielend === a.id ? "⏸" : "▶"}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* PDFs */}
        <div style={{ marginBottom: 36 }}>
          <h2 style={{ fontFamily: "'League Spartan', sans-serif", fontSize: 18, color: "#2C3E35", fontWeight: 600, marginBottom: 16, letterSpacing: "0.04em" }}>
            📄 WORKBOOK & MATERIALIEN
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {inhalt.pdfs.map((p) => (
              <div key={p.id} style={{ background: "#fff", border: "1px solid #C8E0D8", borderRadius: 14, padding: "18px 22px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <p style={{ fontSize: 15, fontWeight: 700, color: "#2C3E35", marginBottom: 4 }}>{p.titel}</p>
                  <p style={{ fontSize: 13, color: "#7AADA0" }}>{p.seiten}</p>
                </div>
                <button style={{ background: "#EEF6F3", border: "none", borderRadius: 100, padding: "10px 20px", fontSize: 13, color: "#4A7C6F", cursor: "pointer", fontWeight: 700 }}>
                  Download
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Yoga */}
        <div style={{ marginBottom: 36 }}>
          <h2 style={{ fontFamily: "'League Spartan', sans-serif", fontSize: 18, color: "#2C3E35", fontWeight: 600, marginBottom: 16, letterSpacing: "0.04em" }}>
            🧘 YOGA-SEQUENZ
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {inhalt.yoga.map((y) => (
              <div key={y.id} style={{ background: "#fff", border: "1px solid #C8E0D8", borderRadius: 14, padding: "18px 22px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <p style={{ fontSize: 15, fontWeight: 700, color: "#2C3E35", marginBottom: 4 }}>{y.titel}</p>
                  <p style={{ fontSize: 13, color: "#7AADA0" }}>{y.dauer}</p>
                </div>
                <button style={{ background: "#EEF6F3", border: "none", borderRadius: 100, padding: "10px 20px", fontSize: 13, color: "#4A7C6F", cursor: "pointer", fontWeight: 700 }}>
                  Starten
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Abgeschlossen Button */}
        <div style={{ textAlign: "center", paddingTop: 20 }}>
          <button
            onClick={() => router.push("/dashboard")}
            style={{ background: "#4A7C6F", color: "#fff", border: "none", borderRadius: 100, padding: "14px 48px", fontSize: 15, fontFamily: "'League Spartan', sans-serif", letterSpacing: "0.06em", cursor: "pointer" }}
          >
            ✓ Woche abgeschlossen
          </button>
        </div>

      </div>
    </main>
  );
}