const TelegramBot = require('node-telegram-bot-api');
const helper = require('./helper');
const config = require('./config');
const keyboard = require('./keyboard');
const buttons = require('./keyboard-buttons');
const { greetingOptions } = require('./options');


const bot = new TelegramBot(config.TOKEN, {
  polling: true,
});

const start = async () => {
  bot.setMyCommands([
    { command: '/start', description: 'Начальное приветствие' },
    { command: '/info', description: 'Получить информацию по чат-боту' },
  ]);

  bot.on('message', (msg) => {
    const text = msg.text;
    const chatId = msg.chat.id;

    if (text === '/start') {
      bot.sendSticker(chatId, 'https://cdn.tlgrm.app/stickers/607/0b2/6070b2d6-7eba-493f-a921-589c24208b7a/256/1.webp');
      const text = `Здравствуйте, ${msg.from.first_name}\nВы студент или работодатель?`;
      return bot.sendMessage(helper.getChatId(msg), text, greetingOptions);
    }
    if (text === '/info') {
      const text = 'Бот для матчинга студентов и работодателей';
      return bot.sendMessage(helper.getChatId(msg), text);
    }
    bot.sendMessage(chatId, `Вы написали ${text}`);
  });

  bot.on('callback_query', async (msg) => {
    const data = msg.data;
    const chatId = msg.message.chat.id;
    if (data === 'employer') {
      return bot.sendMessage(chatId, `Вы работодатель`);
    } else {
      return bot.sendMessage(chatId, `Вы студент`);
    }
  });
};

start();
