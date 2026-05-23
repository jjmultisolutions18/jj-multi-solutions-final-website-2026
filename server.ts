import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Use JSON middleware for POST body parsing
  app.use(express.json());

  // Initialize Gemini API
  const apiKey = process.env.GEMINI_API_KEY;
  const ai = apiKey 
    ? new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      })
    : null;

  // AI Chatbot endpoint proxy
  app.post("/api/chat", async (req, res) => {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Messages array is required." });
    }

    if (!ai) {
      return res.status(503).json({ 
        error: "AI service is currently unavailable. Please verify the Gemini API key." 
      });
    }

    try {
      // Map contents for Gemini
      const formattedContents = messages.map(m => ({
        role: m.role === 'assistant' ? 'model' : m.role,
        parts: [{ text: m.content }]
      }));

      const systemInstruction = `You are "JJMS Assistant", an exquisite, polite, and highly knowledgeable AI chat assistant representing JJ Multi Solutions (Pty) Ltd in Upington, Northern Cape, South Africa.
Your goal is to answer visitor enquiries regarding our corporate branding, web design, connectivity data packages, rapid lab prototyping, software distribution, and SME support services.

--- CORPORATE DETAILS ---
Company: JJ Multi Solutions (Pty) Ltd (JJMS)
Location: Upington, Northern Cape, South Africa
Email: info@jjmultisolutions.co.za
Phone: 062 542 5434
Tagline: "From Idea to Digital Implementation"

--- NAVIGATION PATHS AVAILABLE FROM THE NAV ---
- Home Page (/)
- About Us (/about) - outlines local commitments, company vision
- Services Catalog (/services) - outlines full ecosystem, rapid prototyping, hosting, ICT packages
- SME Solutions (/solutions) - addresses incubation and tech integration for local enterprises
- Projects (/projects) - showcases active and past tech delivery
- News & Events (/news) - includes interactive calendar, fiber rollouts, community training briefings
- Tech Blog (/blog) - tech tips, advice, and updates
- E-Shop / Digital Store (/store) - direct distribution of Microsoft 365, CAD software, and technical SLA retainers
- Client Area (/dashboard) - manage billing, submit quotation queries, track custom implementation items
- Direct Contact (/contact) - custom feedback form

--- KEY CAPABILITIES & SERVICES ---
1. Innovation Ecosystem: Hosting hackathons, planning innovation programs, planning design thinking exercises.
2. Rapid Prototyping: 3D CAD modeling, 3D printing and parts fabrication, reverse engineering.
3. Broadband Connectivity: Partnered with MTN, Telkom, and Vodacom for Fixed LTE/5G packages and business fibre backup links.
4. Professional Web Hosting & Email: Secure servers, email configurations, and WordPress support.
5. System Automation: CRM databases, automated custom apps, performance metrics charts, lab metrics tracker.
6. Responsive Graphic/Logo Design: Social contents, pitch structures, video showcases.
7. Commercial Sourcing: Manufacturing banners, pull-ups, vehicle wrap designs.
8. Interactive Tutoring: AI guidelines training, Canva usage, Maker workshop orientations.

--- LICENSES DISTRIBUTED IN THE STORE (/store) ---
Microsoft 365, Adobe Acrobat Pro DC, system licenses for Windows 10/11, specialized engineering software like CAD packages and Fusion 360.

--- RULES OF CONDUCT ---
- Answer truthfully based on our services list. Be friendly and professional.
- Use clean formatting, spacing, and short bullet points. Do not write oversized text walls.
- Encourage users to check out the Store page (/store) for software packages, contact page (/contact) for urgent tasks, or Client Area (/dashboard) to draft automated quote requests instantly.
- Speak in the first person plural (e.g., "We at JJ Multi Solutions offer...") and proudly reflect our South African roots.
`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: formattedContents,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.65,
        }
      });

      const responseText = response.text || "I apologize, I didn't catch that. How can we help you roll out your technology or prototype solutions today?";
      return res.json({ reply: responseText });

    } catch (err: any) {
      console.error("Gemini API error:", err);
      return res.status(500).json({ error: "Sorry, I am having trouble connecting to my knowledge base right now. " + err.message });
    }
  });

  // Serve static files in production or delegate to Vite in development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Express server running on http://localhost:${PORT}`);
  });
}

startServer();
