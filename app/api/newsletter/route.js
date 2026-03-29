export async function POST(request) {
  const { email, name } = await request.json();

  if (!email) {
    return Response.json({ error: "E-Mail fehlt" }, { status: 400 });
  }

  const response = await fetch("https://api.brevo.com/v3/contacts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": process.env.BREVO_API_KEY,
    },
    body: JSON.stringify({
      email,
      attributes: { FIRSTNAME: name || "" },
      listIds: [2],
      updateEnabled: true,
    }),
  });

  if (!response.ok && response.status !== 204) {
    return Response.json({ error: "Fehler beim Eintragen" }, { status: 500 });
  }

  return Response.json({ success: true });
}