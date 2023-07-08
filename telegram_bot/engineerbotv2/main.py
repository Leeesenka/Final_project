from flask import Flask, request
from bot import Bot
import ticket

app = Flask(__name__)
bot = Bot("5616686460:AAEfCgQK5aPRkS_oOy4yeC8x_buZ807t5gM")
ticket_handler = ticket.Handler(bot)

@app.route('/send-ticket', methods=['POST', 'OPTIONS'])
def handle_new_ticket():
    return ticket_handler.handle_new_ticket(request)

if __name__ == "__main__":
    bot.start_updates_loop()
    app.run(port=8080)
