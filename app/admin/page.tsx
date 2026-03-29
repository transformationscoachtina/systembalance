"use client";
import { useEffect, useState } from "react";
import { createClient } from "../../lib/supabase";
import { useRouter } from "next/navigation";

function AddKlientin({ supabase, onAdd }: { supabase: any; onAdd: () => void }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const handleAdd = async () => {
    if (!email) return;
    setLoading(true);
    setMsg("");

    const { error } = await supabase.from("enrollments").insert({
      user_id: null,
      status: "active",
      stripe_payment_id: "manual-" + email,
    });

    if (error) {
      setMsg("Bitte erstelle zuerst einen Account für diese E-Mail in Supabase Authentication.");
    } else {
      setMsg("Klientin erfolgreich hinzugefügt!");
      setEmail("");
      onAdd();
    }
    setLoading(false);
  };

  return (
    <div style={{ background: "#fff", border: "1px solid #C8E0D8", borderRadius: 16, padding: "28px" }}>
      <h2 style={{ fontFamily: "'League Spartan', sans-serif", fontSize: 18, color: "#2C3E35", fontWeight: 600, marginBottom: 20, letterSpacing: "0.04em" }}>
        KLIENTIN HINZUFÜGEN
      </h2>
      <p style={{ fontFamily: "'Lato', sans-serif", fontSize: 14, color: "#7AADA0", marginBottom: 16, fontStyle: "italic" }}>
        Erstelle zuerst einen Account unter Authentication → Users in Supabase, dann trage die E-Mail hier ein.
      </p>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <input
          type="email"
          placeholder="E-Mail der Klientin"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={{ flex: 1, minWidth: 260, padding: "12px 16px", border: "1px solid #C8E0D8", borderRadius: 10, fontSize: 15, fontFamily: "'Lato', sans-serif", outline: "none" }}
        />
        <button
          onClick={handleAdd}
          disabled={loading}
          style={{ background: "#4A7C6F", color: "#fff", border: "none", borderRadius: 10, padding: "12px 28px", fontSize: 14, fontFamily: "'League Spartan', sans-serif", letterSpacing: "0.06em", cursor: "pointer", opacity: loading ? 0.7 : 1 }}
        >
          {loading ? "Wird hinzugefügt..." : "Hinzufügen"}
        </button>
      </div>
      {msg && (
        <p style={{ marginTop: 12, fontSize: 14, color: msg.includes("Fehler") || msg.includes("Bitte") ? "#991B1B" : "#4A7C6F" }}>{msg}</p>
      )}
    </div>
  );
}

export default function AdminPage() {
  const [user, setUser] = useState<any>(null);
  const [klientinnen, setKlientinnen] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user || user.email !== "transformationscoachtina@gmail.com") {
        router.push("/");
        return;
      }
      setUser(user);

      const { data } = await supabase
        .from("enrollments")
        .select("*")
        .order("enrolled_at", { ascending: false });

      setKlientinnen(data || []);
      setLoading(false);
    };
    init();
  }, []);

  if (loading) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Lato', sans-serif", color: "#4A7C6F" }}>
      Wird geladen...
    </div>
  );

  return (
    <main style={{ minHeight: "100vh", background: "#F7FAF9", fontFamily: "'Lato', sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=League+Spartan:wght@600;700&family=Lato:wght@300;400;700&display=swap');`}</style>

      {/* Header */}
      <nav style={{ background: "#2C3E35", padding: "18px 48px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <span style={{ fontFamily: "'League Spartan', sans-serif", fontSize: 16, color: "#A8D5C8", fontWeight: 700, letterSpacing: "0.08em" }}>ADMIN</span>
          <span style={{ fontSize: 13, color: "#5A8A7E", marginLeft: 12 }}>SystemBalance</span>
        </div>
        <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
          <a href="/dashboard" style={{ fontSize: 13, color: "#7AADA0", textDecoration: "none" }}>Zum Dashboard</a>
          <button
            onClick={async () => { await supabase.auth.signOut(); router.push("/"); }}
            style={{ background: "none", border: "1px solid #3A5A50", borderRadius: 100, padding: "8px 20px", fontSize: 13, color: "#7AADA0", cursor: "pointer" }}
          >
            Abmelden
          </button>
        </div>
      </nav>

      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "48px 32px" }}>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginBottom: 48 }}>
          {[
            { label: "Klientinnen gesamt", wert: klientinnen.length },
            { label: "Aktive Teilnahmen", wert: klientinnen.filter((k: any) => k.status === "active").length },
            { label: "Wochen im Programm", wert: 8 },
          ].map(s => (
            <div key={s.label} style={{ background: "#fff", border: "1px solid #C8E0D8", borderRadius: 16, padding: "24px 28px" }}>
              <p style={{ fontSize: 13, color: "#7AADA0", marginBottom: 8, letterSpacing: "0.04em" }}>{s.label}</p>
              <p style={{ fontFamily: "'League Spartan', sans-serif", fontSize: 36, color: "#2C3E35", fontWeight: 700 }}>{s.wert}</p>
            </div>
          ))}
        </div>

        {/* Klientinnen Liste */}
        <div style={{ marginBottom: 48 }}>
          <h2 style={{ fontFamily: "'League Spartan', sans-serif", fontSize: 20, color: "#2C3E35", fontWeight: 600, marginBottom: 20, letterSpacing: "0.04em" }}>
            KLIENTINNEN
          </h2>
          {klientinnen.length === 0 ? (
            <div style={{ background: "#fff", border: "1px solid #C8E0D8", borderRadius: 16, padding: "40px", textAlign: "center" }}>
              <p style={{ color: "#7AADA0", fontStyle: "italic" }}>Noch keine Klientinnen eingetragen.</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {klientinnen.map((k: any) => (
                <div key={k.id} style={{ background: "#fff", border: "1px solid #C8E0D8", borderRadius: 14, padding: "18px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <p style={{ fontSize: 15, fontWeight: 700, color: "#2C3E35", marginBottom: 4 }}>{k.stripe_payment_id || "–"}</p>
                    <p style={{ fontSize: 13, color: "#7AADA0" }}>Eingetragen: {new Date(k.enrolled_at).toLocaleDateString("de-DE")}</p>
                  </div>
                  <span style={{ background: k.status === "active" ? "#EEF6F3" : "#FEE2E2", color: k.status === "active" ? "#4A7C6F" : "#991B1B", borderRadius: 100, padding: "6px 16px", fontSize: 12, fontWeight: 700, letterSpacing: "0.06em" }}>
                    {k.status === "active" ? "AKTIV" : "INAKTIV"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Klientin hinzufügen */}
        <AddKlientin supabase={supabase} onAdd={() => window.location.reload()} />

      </div>
    </main>
  );
}
