import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Safe lazy-loader for GoogleGenAI to prevent crashes if key is initially absent
  let aiClient: GoogleGenAI | null = null;
  function getAiClient() {
    if (!aiClient) {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("GEMINI_API_KEY environment variable is not defined.");
      }
      aiClient = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });
    }
    return aiClient;
  }

  // API Route: Collector Concierge Dialogue
  app.post("/api/collector/chat", async (req, res) => {
    try {
      const { message, history, artworkContext } = req.body;

      if (!message) {
        res.status(400).json({ error: "Message is required." });
        return;
      }

      const ai = getAiClient();

      // Format history into the SDK-expected format
      const contents = [];
      if (history && Array.isArray(history)) {
        for (const turn of history) {
          contents.push({
            role: turn.role === "user" ? "user" : "model",
            parts: [{ text: turn.text }],
          });
        }
      }
      contents.push({
        role: "user",
        parts: [{ text: message }],
      });

      const systemInstruction = `You are the Adelana Studio Concierge, an elegant, refined, and highly knowledgeable art advisor representing the premium mixed-media fine art brand Adelana.
Your tone is quiet, sophisticated, confident, and timeless. You speak clearly and with poise, like an experienced gallery curator in an intimate, contemporary art museum.
Avoid any loud marketing jargon, hyperbole, exclamation marks, sales pitch vocabulary (e.g. "Hurry!", "Buy now"), or emojis. Let your confidence and the artwork's soul speak for themselves.

When discussing the artwork:
- Reference the active artwork: ${artworkContext ? JSON.stringify(artworkContext) : "The Adelana Fine Art Collection"}.
- Frame the artwork as a masterfully handcrafted physical process: Preliminary studies/sketching -> Canvas stretching/gesso preparation -> Topological relief mapping -> Hand plaster and marble-dust sculpting -> Hand painting/gesso and charcoal washes -> 24k Gold/Metal Leaf gilding -> UV varnish protection -> Floating oak wood frames.
- Emphasize the tactile nature of the work: how the texture catches side-lighting, how the gold leaf shimmers under different angles of light.
- For acquisition questions, explain that artworks are available in highly exclusive, signed, and numbered limited editions of 5, or as unique physical originals (mixed media on canvas). Invite the collector to complete their inquiry with details of their space, and we will coordinate museum-grade white-glove shipping.

Please keep responses relatively concise (2-4 paragraphs) to maintain a spacious, gallery-like conversation.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: contents,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
        },
      });

      res.json({ reply: response.text });
    } catch (error: any) {
      console.error("Collector Chat Error:", error);
      res.status(500).json({
        error: "Our studio concierge is temporarily offline. Please try again shortly.",
        details: error.message,
      });
    }
  });

  // Serve static assets in /src/assets/images
  app.use("/src/assets/images", express.static(path.join(__dirname, "src/assets/images")));

  // Vite integration
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
    console.log(`Adelana Art Museum Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
