var TelegramBot = require('node-telegram-bot-api');

var token = '223267047:AAEoMQoywNJOiPkhYpojSSMUtCFA6SQlgpk';
var bot = new TelegramBot(token, {polling: true});

bot.on('text', function (msg) {
  var chatId = msg.chat.id;
  bot.sendMessage(chatId,msg.from.first_name + " ha enviado " + msg.text);
});
