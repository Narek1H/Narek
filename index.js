const TelegramBot = require('node-telegram-bot-api')
require('dotenv').config()
const token = process.env.TOKEN

const bot = new TelegramBot(token, { polling: true })

const inline_keyboard = [
  [
    { text: 'audio', callback_data: 'audio' },
  ],
  [
    { text: 'video', callback_data: 'video' }
  ],
  [
    { text: 'photo', callback_data: 'photo' },
  ]
]

bot.on('text', (msg) => {
  const chatId = msg.chat.id

  if (msg.text === '/start') {
    bot.sendMessage(chatId, "received your time")
  }

  else if (msg.text === '/help') {
    bot.sendMessage(chatId, "This bot is designed for the user to wake up on time or do their work on time.\nIt also sends the type of alarm you choose.\n In a word, a WARNING.")
  }

  else if (msg.text === '/types') {
    bot.sendMessage(chatId, "these are the alarm types", {
      reply_markup: { inline_keyboard }
    })
  } else if (!isNaN(+msg.text)) {
    timeout = +msg.text
    bot.sendMessage(chatId, "these are the alarm types", {
      reply_markup: { inline_keyboard }
    })
  }
})

bot.on('callback_query', (query) => {
  if (query.data === 'audio') {
    setTimeout(() => {
      bot.sendAudio(query.message.chat.id, './audio.mp3');
    }, timeout * 1000);
  }

  else if (query.data === 'video') {
    setTimeout(() => {
      bot.sendVideo(query.message.chat.id, './video.mp4');
    }, timeout * 1000);
  }
  else if (query.data === 'photo') {
    setTimeout(() => {
      bot.sendPhoto(query.message.chat.id, './image.jpg');
    }, timeout * 1000);
  }
})
