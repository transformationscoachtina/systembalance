"use client";
import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState("idle");

  const handleSubmit = async () => {
    if (!email) return;
    setStatus("loading");
    const res = await fetch("/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, name }),
    });
    if (res.ok) {
      setStatus("success");
    } else {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div style={{ background: "#EEF6F3", border: "1px solid #C8E0D8", borderRadius: 16, padding: "28px 32px" }}>
        <p style={{ fontFamily: "'League Spartan', sans-serif", fontSize: 18, color: "#4A7C6F", fontWeight: 600, marginBottom: 8 }}>
          Willkommen! ✓
        </p>
        <p style={{ fontFamily: "'Lato', sans-serif", fontSize: 15, color: "#6B8C82" }}>
          Du bist jetzt dabei. Schau in dein Postfach!
        </p>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <input
        type="text"
        placeholder="Dein Vorname"
        value={name}
        onChange={e => setName(e.target.value)}
        style={{ padding: "14px 18px", border: "1px solid #C8E0D8", borderRadius: 100, fontSize: 15, fontFamily: "'Lato', sans-serif", outline: "none", textAlign: "center" }}
      />
      <input
        type="email"
        placeholder="deine@email.de"
        value={email}
        onChange={e => setEmail(e.target.value)}
        style={{ padding: "14px 18px", border: "1px solid #C8E0D8", borderRadius: 100, fontSize: 15, fontFamily: "'Lato', sans-serif", outline: "none", textAlign: "center" }}
      />
      <button
        onClick={handleSubmit}
        disabled={status === "loading"}
        style={{ background: "#4A7C6F", color: "#fff", border: "none", borderRadius: 100, padding: "14px", fontSize: 14, fontFamily: "'League Spartan', sans-serif", letterSpacing: "0.08em", fontWeight: 600, cursor: "pointer", opacity: status === "loading" ? 0.7 : 1 }}
      >
        {status === "loading" ? "Wird eingetragen..." : "Jetzt eintragen"}
      </button>
      {status === "error" && (
        <p style={{ fontSize: 13, color: "#991B1B", textAlign: "center" }}>
          Etwas ist schiefgelaufen. Bitte versuche es nochmal.
        </p>
      )}
      <p style={{ fontFamily: "'Lato', sans-serif", fontSize: 12, color: "#6B8C82", textAlign: "center" }}>
        Kein Spam. Jederzeit abmeldbar.
      </p>
    </div>
  );
}
