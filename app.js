import express from "express";
import cors from "cors";
import { generate } from "../vatalap.js";

const app = express();

app.use(cors({
  origin: "*",
  methods: ["GET", "POST"],
}));

app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.json({ status: "Backend is live 🚀" });
});

// ✅ FRONTEND IS CALLING /chat
app.post("/chat", async (req, res) => {
  try {
    const { message, threadId } = req.body;

    if (!message) {
      return res.status(400).json({ message: "Message is required" });
    }

    const result = await generate(message, threadId);

    res.json({ message: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

export default app; 
