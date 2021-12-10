const TelegramBot = require('node-telegram-bot-api');
const config = require('./config');


const bot = new TelegramBot(config.TOKEN, {
  polling: true,
});

const start = async () => {
  bot.setMyCommands([
    { command: '/start', description: 'Начальное приветствие' },
    { command: '/info', description: 'Получить информацию по чат-боту' },
  ]);

  // bot.on('message', (msg) => {
  //   const chatId = msg.chat.id;
  //   bot.sendMessage(chatId, `Вы написали ${msg}`);
  // });

  bot.onText(/\/start/, (msg) => {
    const text = `Здравствуйте, ${msg.from.first_name}\nВыберете команду для начала общения`;
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, text);
  });
};

start();
