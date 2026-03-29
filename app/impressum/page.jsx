export default function Impressum() {
  return (
    <main style={{ minHeight: "100vh", background: "#F7FAF9", fontFamily: "'Lato', sans-serif", padding: "120px 48px 80px" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=League+Spartan:wght@600;700&family=Lato:wght@300;400;700&display=swap');`}</style>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <a href="/" style={{ fontSize: 13, color: "#4A7C6F", textDecoration: "none", letterSpacing: "0.04em" }}>
          &larr; Zurück
        </a>
        <h1 style={{ fontFamily: "'League Spartan', sans-serif", fontSize: 36, color: "#2C3E35", fontWeight: 700, margin: "24px 0 40px" }}>
          IMPRESSUM
        </h1>

        <div style={{ fontSize: 15, lineHeight: 2, color: "#4A5C52" }}>

          <p style={{ marginBottom: 8 }}>Angaben gemäß § 5 DDG</p>

          <p style={{ marginBottom: 4 }}>Tina Nowack</p>
          <p style={{ marginBottom: 4 }}>Otterstadter Weg 121</p>
          <p style={{ marginBottom: 24 }}>67346 Speyer</p>

          <p style={{ marginBottom: 4 }}>
            <strong style={{ color: "#2C3E35" }}>Vertreten durch:</strong>
          </p>
          <p style={{ marginBottom: 24 }}>Tina Nowack</p>

          <p style={{ marginBottom: 4 }}>
            <strong style={{ color: "#2C3E35" }}>Kontakt:</strong>
          </p>
          <p style={{ marginBottom: 4 }}>Telefon: +49-017630179867</p>
          <p style={{ marginBottom: 24 }}>E-Mail: transformationscoachtina@gmail.com</p>

          <p style={{ marginBottom: 16, color: "#7AADA0", fontSize: 13 }}>
            Quelle: Impressum-Generator von impressum-generator.de
          </p>

        </div>
      </div>
    </main>
  );
}
