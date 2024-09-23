require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const TelegramBot = require("node-telegram-bot-api");

const { TOKEN, SERVER_URL } = process.env;
const TELEGRAM_API = `https://api.telegram.org/bot${TOKEN}`;
const URI = `/webhook/${TOKEN}`;
const WEBHOOK_URL = `${SERVER_URL}${URI}`;

const app = express();
app.use(bodyParser.json());

const bot = new TelegramBot(TOKEN);
bot.setWebHook(WEBHOOK_URL);

// bot.on("message", (message) => {
//   console.log("Request received: ", message);

//   const chatId = message.from.id;
//   const text = message.text;

//   switch (text) {
//     case "/start":
//       bot.sendMessage(
//         chatId,
//         "Hello, welcome Yosua and Ellena Dokimos Ark 🏠!"
//       );

//       break;
//     case "/instagram":
//       bot.sendMessage(
//         chatId,
//         "Feel free to follow us on Instagram: dokimos.ark https://www.instagram.com/dokimos.ark?igsh=ajZiODkyZHJpYWlo"
//       );

//       break;
//     default:
//       break;
//   }
// });

app.post(URI, async (req, res) => {
  console.log("Request received: ", req.body);

  bot.processUpdate(req.body);

  const chatId = req.body.message.from.id;
  const message = req.body.message.text;

  switch (message) {
    case "/start":
      bot.sendMessage(
        chatId,
        "Hello, welcome to Yosua and Ellena Dokimos Ark 🏠!"
      );
      break;
    case "/instagram":
      bot.sendMessage(
        chatId,
        "Feel free to follow us on Instagram: dokimos.ark https://www.instagram.com/dokimos.ark?igsh=ajZiODkyZHJpYWlo"
      );
      break;
    default:
      bot.sendMessage(
        chatId,
        `Here is our command: \n/start: To start \n/instagram: To see our instagram profile`
      );
      break;
  }

  res.status(200).send("OK");
});

app.listen(5000, async () => {
  console.log("Server is running on port 5000");
});
