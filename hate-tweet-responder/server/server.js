import express from "express";
import cors from "cors";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

app.post("/respond", async (req, res) => {
    const { tweet } = req.body;

    const prompt = `This is a rude tweet: "${tweet}"\nRespond in a calm, smart, and empathetic way:`;

    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "You are a helpful assistant skilled at defusing online arguments." },
                { role: "user", content: prompt },
            ],
            max_tokens: 100,
            temperature: 0.7,
        });

        const response = completion.choices[0].message.content.trim();
        res.json({ response });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to generate response" });
    }
});

app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});

