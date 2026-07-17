import type { IncomingMessage, ServerResponse } from "http";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

function getAiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY environment variable is not defined.");
  }

  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

async function readJsonBody(req: IncomingMessage & { body?: any }) {
  if (req.body !== undefined) {
    return req.body;
  }

  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }

  const rawBody = Buffer.concat(chunks).toString("utf8");
  if (!rawBody) {
    return {};
  }

  try {
    return JSON.parse(rawBody);
  } catch {
    return {};
  }
}

function sendJson(res: ServerResponse, statusCode: number, payload: unknown) {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(payload));
}

async function sleep(ms: number) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

export default async function handler(req: IncomingMessage & { body?: any }, res: ServerResponse) {
  if (req.method !== "POST") {
    sendJson(res, 405, { error: "Method not allowed." });
    return;
  }

  try {
    const body = await readJsonBody(req);
    const { message, history, artworkContext } = body || {};

    if (!message) {
      sendJson(res, 400, { error: "Message is required." });
      return;
    }

    const ai = getAiClient();
    const contents = [] as Array<{ role: string; parts: Array<{ text: string }> }>;

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

    let response;
    const modelsToTry = ["gemini-3.5-flash", "gemini-3-flash"];

    for (let index = 0; index < modelsToTry.length; index += 1) {
      try {
        response = await ai.models.generateContent({
          model: modelsToTry[index],
          contents,
          config: {
            systemInstruction,
            temperature: 0.7,
          },
        });
        break;
      } catch (error: any) {
        const status = error?.status || error?.statusCode;
        const isOverloaded503 = status === 503;

        if (isOverloaded503 && index === 0) {
          console.error("Gemini 503 overload on primary model, retrying in 1.5s", error);
          await sleep(1500);
          continue;
        }

        if (isOverloaded503 && index === 1) {
          console.error("Gemini 503 overload on fallback model, giving up", error);
          throw error;
        }

        console.error("Gemini request failed", error);
        throw error;
      }
    }

    sendJson(res, 200, { reply: response.text });
  } catch (error: any) {
    console.error("Collector Chat Error:", error);
    sendJson(res, 500, {
      error: "Our studio concierge is temporarily offline. Please try again shortly.",
      details: error.message,
    });
  }
}
