const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const { API_KEY } = require("./config.json");
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: API_KEY,
});
const openai = new OpenAIApi(configuration);

app.use(express.static(__dirname));
app.use(bodyParser.json());

app
  .get("/", (req, res) => {
    res.sendFile(__dirname + "/" + "public" + "/" + "index.html");
  })
  .post("/chatGPT", async (req, res) => {
    const prompt = req.body.query;

    console.log(`'${prompt}' is being searched in chatGPT database`);

    try {
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        temperature: 0.9,
        max_tokens: 3000,
      });
      res.status(200).send({ response });
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .send({ response: "Failed to fetch response from OpenAI API" });
    }
  });

app.listen(8080, () => {
  console.log("server started");
});
