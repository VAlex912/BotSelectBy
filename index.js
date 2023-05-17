const TelegramApi = require("node-telegram-bot-api");
const { gameOptions, againOptions } = require("./options");

const token = "6279702532:AAEp2G8zxUI85hIi61bGOYsatztsDVdlDNw";

const bot = new TelegramApi(token, { polling: true });

const chats = {};

const startGame = async (chatId) => {
  await bot.sendMessage(
    chatId,
    "Сейчас я загадаю цифру от 0 до 9. И ты должен её отгадать"
  );
  const randomNumber = Math.floor(Math.random() * 10);
  chats[chatId] = randomNumber;
  await bot.sendMessage(chatId, `Отгадывай..`, gameOptions);
};

const start = () => {
  bot.setMyCommands([
    { command: "/start", description: "Начальное приветсвие" },
    { command: "/info", description: "Получить информацию" },
    { command: "/game", description: "Игра угадай цифру" },
  ]);

  bot.on("message", async (msg) => {
    const text = msg.text;
    const chatId = msg.chat.id;

    if (text === "/start") {
      await bot.sendSticker(
        chatId,
        `https://tlgrm.ru/_/stickers/4ec/793/4ec79310-b3d4-3fab-bd2e-0681d2563e07/11.webp`
      );
      return bot.sendMessage(chatId, "Добро пожаловать в телеграм бот");
    }

    if (text === "/game") {
      return startGame(chatId);
    }

    if (text === "/info") {
      await bot.sendSticker(
        chatId,
        `https://tlgrm.ru/_/stickers/4ec/793/4ec79310-b3d4-3fab-bd2e-0681d2563e07/9.webp`
      );
      if (typeof msg.from.last_name !== "undefined") {
        return bot.sendMessage(
          chatId,
          `Тебя зовут ${msg.from.first_name} ${msg.from.last_name}`
        );
      } else {
        return bot.sendMessage(chatId, `Тебя зовут ${msg.from.first_name} `);
      }
    }

    return bot.sendMessage(chatId, `Я тебя не понимаю`);
  });

  bot.on("callback_query", async (msg) => {
    const data = msg.data;
    const chatId = msg.message.chat.id;
    if (data === "/again") {
      return startGame(chatId);
    }
    if (data === chats[chatId]) {
      return bot.sendMessage(
        chatId,
        `Поздравляю, ты отгадал цифру ${chats[chatId]}`,
        againOptions
      );
    } else {
      return bot.sendMessage(
        chatId,
        `К сожалению ты не отгадал, бот загадал цифру ${chats[chatId]}`,
        againOptions
      );
    }
  });
};

start();
