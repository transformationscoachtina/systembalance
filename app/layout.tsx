import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SystemBalance – Der innere Raum",
  description: "8-Wochen-Programm für Yogalehrerinnen & Coaches",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <head>
        <script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="87f4c169-9b4c-4881-87a7-9571c31ef6bd"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}