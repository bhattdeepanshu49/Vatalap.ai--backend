import express from "express";
import { generate } from "./vatalap.js";
import cors from "cors";


const app = express();
app.use(express.json());
app.use(cors());

const port = 5050;

app.get("/", (req, res) => {
    res.send("Welcome to Vartalap");
});
app.get("/chat",(req,res)=>{
    res.send("Welcome to Chat");
})
app.post("/chat", async (req, res) => {
    try {
        const { message ,threadId} = req.body;

        const result = await generate(message,threadId);

        res.json({ message: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong" });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
