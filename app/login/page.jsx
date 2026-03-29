"use client";
import { useState } from "react";
import { createClient } from "../../lib/supabase";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError("E-Mail oder Passwort falsch.");
    } else {
      router.push("/dashboard");
    }
    setLoading(false);
  };

  return (
    <main style={{ minHeight: "100vh", background: "#F7FAF9", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Lato', sans-serif" }}>
      <div style={{ background: "#fff", border: "1px solid #C8E0D8", borderRadius: 20, padding: "48px 40px", width: "100%", maxWidth: 400 }}>
        <h1 style={{ fontFamily: "'League Spartan', sans-serif", fontSize: 24, color: "#2C3E35", marginBottom: 8, textAlign: "center" }}>
          Willkommen zurück
        </h1>
        <p style={{ fontSize: 14, color: "#7AADA0", textAlign: "center", marginBottom: 32 }}>
          Melde dich an, um dein Programm fortzusetzen.
        </p>

        {error && (
          <p style={{ background: "#FEE2E2", color: "#991B1B", padding: "10px 14px", borderRadius: 8, fontSize: 14, marginBottom: 20 }}>
            {error}
          </p>
        )}

        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 13, color: "#4A7C6F", letterSpacing: "0.04em", display: "block", marginBottom: 6 }}>E-Mail</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{ width: "100%", padding: "12px 14px", border: "1px solid #C8E0D8", borderRadius: 10, fontSize: 15, outline: "none", fontFamily: "'Lato', sans-serif" }}
            placeholder="deine@email.de"
          />
        </div>

        <div style={{ marginBottom: 28 }}>
          <label style={{ fontSize: 13, color: "#4A7C6F", letterSpacing: "0.04em", display: "block", marginBottom: 6 }}>Passwort</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{ width: "100%", padding: "12px 14px", border: "1px solid #C8E0D8", borderRadius: 10, fontSize: 15, outline: "none", fontFamily: "'Lato', sans-serif" }}
            placeholder="••••••••"
          />
        </div>

        <button
          onClick={handleLogin}
          disabled={loading}
          style={{ width: "100%", background: "#4A7C6F", color: "#fff", padding: "14px", borderRadius: 100, border: "none", fontSize: 15, fontFamily: "'League Spartan', sans-serif", letterSpacing: "0.06em", cursor: "pointer", opacity: loading ? 0.7 : 1 }}
        >
          {loading ? "Wird geladen..." : "Anmelden"}
        </button>
      </div>
    </main>
  );
}