require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const { TOKEN, SERVER_URL } = process.env;
const TELEGRAM_API = `https://api.telegram.org/bot${TOKEN}`;
const URI = `/webhook/${TOKEN}`;
const WEBHOOK_URL = `${SERVER_URL}${URI}`;

const app = express();
app.use(bodyParser.json());

const init = async () => {
  try {
    await axios.get(`${TELEGRAM_API}/setWebhook?url=${WEBHOOK_URL}`);
    console.log("Webhook was set successfully");
  } catch (error) {
    console.error("Error setting webhook: ", error.message);
  }
};

app.post(URI, async (req, res) => {
  console.log("Request received: ", req.body);

  const chatId = req.body.message.chat.id;
  const message = req.body.message.text;

  switch (message) {
    case "/start":
      await axios.post(`${TELEGRAM_API}/sendMessage`, {
        chat_id: chatId,
        text: "Hello, welcome Yosua and Ellena Dokimos Ark 🏠!",
      });
      break;
    case "/instagram":
      await axios.post(`${TELEGRAM_API}/sendMessage`, {
        chat_id: chatId,
        text: "Feel free to follow us on Instagram: dokimos.ark",
      });
      break;
    default:
      break;
  }

  res.status(200).send("OK");
});

app.listen(5000, async () => {
  console.log("Server is running on port 5000");
  await init();
});
