const TelegramApi = require('node-telegram-bot-api');
const {gameOptions, againOptions} = require('./options.js');
const token = "5369504283:AAEvWgroPGGxSDXzp5Y_cz54bTopx3snGYU";

const bot = new TelegramApi(token, {polling: true});

const chats = {}


const startGame = async (chatId) => {
   await bot.sendMessage(chatId, 'Сейчас я загадаю цифру от 0 до 9, а ты попробуй её угадать.');
   const randomNumber = Math.floor(Math.random() * 10)
   chats[chatId] = randomNumber;
   await bot.sendMessage(chatId, 'Отгадывай', gameOptions);
}

const start = async () => {
   bot.setMyCommands([
      { command: '/start', description: 'Greeting' },
      { command: '/info', description: 'Get user info' },
      { command: '/game', description: 'Guess the number' }
   ])

   bot.on('message', async msg => {
      const text = msg.text;
      const chatId = msg.chat.id;

      if (text === '/start') {
         await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/ccd/a8d/ccda8d5d-d492-4393-8bb7-e33f77c24907/7.webp')
         return bot.sendMessage(chatId, `Здравствуйте, меня зовут Johnny!`)
      }
      if (text === '/info') {
         return bot.sendMessage(chatId, `Я знаю тебя, Ты ${msg.from.first_name}!`)
      }
      if (text === '/game') {
         return startGame(chatId);
      }
      return bot.sendMessage(chatId, 'Я тебя не понимаю, попробуй ещё раз)')

   })

   bot.on('callback_query', async msg => {
      const data = msg.data;
      const chatId = msg.message.chat.id;
      if (data === '/again') {
         return startGame(chatId);
      }
      if (data == chats[chatId]) {
         return await bot.sendMessage(chatId, `Поздравляю, ты отгадал цифру ${chats[chatId]}`, againOptions)
      } else {
         await bot.sendMessage(chatId, `К сожалению ты не угадал, я загадал число ${chats[chatId]}`, againOptions)
      }
   })

}

start();