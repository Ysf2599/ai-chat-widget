import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import OpenAI from "openai";

dotenv.config();
const app = express();
const port = 3000;

// Serve static files from public folder
app.use(express.static("public"));

// Parse JSON & enable CORS
app.use(cors());
app.use(express.json());

// OpenAI client
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Chat endpoint
app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;
    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: [
        { role: "system", content: "You are an AI chatbot assistant for businesses." },
        { role: "user", content: userMessage }
      ]
    });

    res.json({ reply: response.output_text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ reply: "Something went wrong." });
  }
});

app.listen(port, () => {
  console.log(`🌐 Chat server running at http://localhost:${port}`);
});
