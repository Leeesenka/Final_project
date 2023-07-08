import json
import logging
import requests
from datetime import datetime
from telegram import Update, InlineKeyboardMarkup, InlineKeyboardButton, Bot
from telegram.ext import Updater, CallbackContext, CommandHandler, CallbackQueryHandler, MessageHandler, Filters

class Bot:

    def __init__(self, token):
        self.updater = Updater(token=token, use_context=True)
        self.bot = Bot(token)

    def start_updates_loop(self):
        dp = self.updater.dispatcher
        dp.add_handler(CallbackQueryHandler(self.handle_callback))
        dp.add_handler(MessageHandler(Filters.command, self.handle_command))
        self.updater.start_polling()

    def handle_callback(self, update: Update, context: CallbackContext):
        query = update.callback_query
        query.answer()

        data_parts = query.data.split(":")
        action = data_parts[0]
        ticket_id = data_parts[1]

        if action == 'TookTicket':
            start_data = {
                'Timestamp': datetime.now().isoformat(),
            }
            self.update_data('http://localhost:3030/update_start_date/'+ticket_id, start_data)
            query.edit_message_text(text="You took the ticket!")

        elif action == 'Finished':
            keyboard = [
                [
                    InlineKeyboardButton("Add comment", callback_data='AddComment:'+ticket_id),
                    InlineKeyboardButton("Skip comment", callback_data='SkipComment:'+ticket_id),
                ]
            ]
            reply_markup = InlineKeyboardMarkup(keyboard)
            context.bot.send_message(chat_id=query.message.chat_id, text="Would you like to add a comment?", reply_markup=reply_markup)

        elif action == 'SkipComment':
            end_data = {
                'Timestamp': datetime.now().isoformat(),
            }
            self.update_data('http://localhost:3030/update_completion_date/'+ticket_id, end_data)
            query.edit_message_text(text="You finished the ticket!")

    def handle_command(self, update: Update, context: CallbackContext):
        ticket_id = update.message.text[1:]  # remove leading '/'
        end_data = {
            'Timestamp': datetime.now().isoformat(),
        }
        self.update_data('http://localhost:3030/update_completion_date/'+ticket_id, end_data)
        context.bot.send_message(chat_id=update.message.chat_id, text="You finished the ticket!")

    def update_data(self, url, data):
        headers = {'content-type': 'application/json'}
        response = requests.put(url, data=json.dumps(data), headers=headers)
        if response.status_code != 200:
            logging.error("Failed to update data.")

    def send_message(self, chat_id, text):
        self.bot.send_message(chat_id=chat_id, text=text)
