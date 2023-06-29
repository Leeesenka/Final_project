const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
const path = require('path');
const jsonFilePath = path.join('./json_files/ticketData.json');

const bot = new TelegramBot('5616686460:AAEfCgQK5aPRkS_oOy4yeC8x_buZ807t5gM', { polling: true });

bot.onText(/\/sendjson/, (msg) => {
  const chatId = msg.chat.id;
  console.log('Script executed successfully')
  // Read the JSON file
  fs.readFile(jsonFilePath, 'utf8', (err, data) => {

    if (err) {
      console.error('Error reading JSON file:', err);
      bot.sendMessage(chatId, 'Error reading JSON file');
      return;
    }

    // Send the JSON file to the chat
    bot.sendDocument(chatId, Buffer.from(data), {
      filename: 'ticketData.json',
    })
      .then(() => {
        console.log('JSON file sent successfully');
        bot.sendMessage(chatId, 'JSON file sent successfully');
      })
      .catch((error) => {
        console.error('Error sending JSON file:', error);
        bot.sendMessage(chatId, 'Error sending JSON file');
      });
  });
});
