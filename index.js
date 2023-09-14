const express = require("express");
const OpenAI = require("openai");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({ apiKey: process.env.API_KEY });

app.post("/", async (req, res) => {
  const { topic, category } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You have to generate content according to the given topic and category by user. Category can be Shayari, Joke, Story or Quote. Give the one response at one request and in proper writing convention according to category.",
        },
        {
          role: "user",
          content: `Topic : ${topic} \n Category : ${category}`,
        }
      ],
      temperature: 0.7,
    });
    res.status(200).send(completion.choices[0].message.content);
  } catch (error) {
    res.status(400).send({
      error,
    });
  }
});

app.listen(8080, () => {
  console.log(`Server listening on port 8080`);
});
