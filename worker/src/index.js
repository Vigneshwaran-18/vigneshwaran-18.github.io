export default {
  async fetch(request, env, ctx) {
    // Handle CORS preflight: Allows your GitHub Pages domain to make requests
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    }

    if (request.method !== "POST") {
      return new Response("Method not allowed", { status: 405 });
    }

    try {
      const { name, email, message } = await request.json();

      if (!name || !email || !message) {
        return new Response(JSON.stringify({ error: "Missing fields" }), {
          status: 400,
          headers: { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json" },
        });
      }

      // Configuration: 
      // TARGET_EMAIL should be where you receive the emails.
      // SENDER_EMAIL should be an email associated with the domain this worker runs on (to pass spam filters).
      const TARGET_EMAIL = env.TARGET_EMAIL || "YOUR_PERSONAL_EMAIL@example.com";
      const SENDER_EMAIL = env.SENDER_EMAIL || "contact@vigneshwaran.dev"; // Placeholder, change in Wrangler or Cloudflare UI

      const mailData = {
        personalizations: [{
          to: [{ email: TARGET_EMAIL, name: "Vic" }],
        }],
        from: {
          email: SENDER_EMAIL,
          name: "Portfolio Contact Form",
        },
        subject: `New Message from ${name}`,
        content: [{
          type: "text/plain",
          value: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        }],
      };

      // MailChannels is fully integrated into Cloudflare Workers and is completely free
      const mailResponse = await fetch("https://api.mailchannels.net/tx/v1/send", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(mailData),
      });

      if (!mailResponse.ok) {
        const errorText = await mailResponse.text();
        return new Response(JSON.stringify({ error: "Email delivery failed", details: errorText }), {
          status: 500,
          headers: { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json" },
        });
      }

      return new Response(JSON.stringify({ success: true, message: "Email Sent Successfully" }), {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        },
      });

    } catch (err) {
      return new Response(JSON.stringify({ error: err.message }), {
        status: 500,
        headers: { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json" },
      });
    }
  },
};
