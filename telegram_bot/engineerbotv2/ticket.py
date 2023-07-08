import json
from flask import jsonify, make_response
from telegram import InlineKeyboardMarkup, InlineKeyboardButton

class Ticket:
    def __init__(self, data):
        self.data = data

class Handler:
    
    def __init__(self, bot):
        self.bot = bot

    def handle_new_ticket(self, request):
        if request.method == 'OPTIONS':
            # This is a preflight request. Reply successfully:
            response = make_response()
            response.headers.add("Access-Control-Allow-Origin", "http://localhost:3000")
            response.headers.add('Access-Control-Allow-Headers', "Content-Type")
            response.headers.add('Access-Control-Allow-Methods', "POST")
            return response

        ticket = Ticket(request.json)
        ticket_id_str = str(ticket.data['id'])

        message_text = f"""New ticket:
ID: {ticket_id_str}
Subject: {ticket.data['subject']}
Created At: {ticket.data['created_at']}
Client: {ticket.data['client']}
Equipment Name: {ticket.data['equipment_name']}
Serial Number: {ticket.data['serial_number']}
Criticality Name: {ticket.data['criticality_name']}
Hours: {ticket.data['hours']}
Description: {ticket.data['description']}
Address: {ticket.data['address']}
Additional Information: {ticket.data['additional_information']}"""

        keyboard = [
            [
                InlineKeyboardButton("Took the ticket", callback_data='TookTicket:'+ticket_id_str),
                InlineKeyboardButton("Finished", callback_data='Finished:'+ticket_id_str),
            ]
        ]
        reply_markup = InlineKeyboardMarkup(keyboard)
        self.bot.send_message(chat_id=ticket.data['chat_id'], text=message_text, reply_markup=reply_markup)