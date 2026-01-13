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
    console.log("📩 Incoming:", message, threadId);

    const result = await generate(message, threadId);

    console.log("✅ Generated:", result);

    res.json({ message: result });
  } catch (error) {
    console.error("🔥 BACKEND CRASH:", error);
    res.status(500).json({
      error: error.message || "Internal Server Error",
    });
  }
});


export default app; 
