const express = require("express");
const app = express();
const postInfos = require("./postQuery");
const { API_KEY } = require("./config.json");
const bodyParser = require("body-parser");
app.use(express.static(__dirname));
app.use(bodyParser.json());

app
  .get("/", (req, res) => {
    res.sendFile(__dirname + "/" + "public" + "/" + "index.html");
  })
  .post("/chatGPT", async (req, res) => {
    const chatGPTrequest = req.body.query;

    console.log(`'${chatGPTrequest}' is being searched in chatGPT database`);
    postInfos(chatGPTrequest, API_KEY)
      .then((response) => {
        res.status(200).send({ response });
      })
      .catch((err) => {
        console.log(err);
        res
          .status(500)
          .send({ message: "Failed to fetch response from OpenAI API" });
      });
  });

app.listen(8080, () => {
  console.log("server started");
});
