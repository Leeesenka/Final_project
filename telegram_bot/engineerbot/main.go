package main

import (
	"log"
	"net/http"
	"engineerbot/ticket"
	"engineerbot/bot"
)

func main() {
	myBot, err := bot.NewBot("5616686460:AAEfCgQK5aPRkS_oOy4yeC8x_buZ807t5gM")
	if err != nil {
		log.Panic(err)
	}

	ticketHandler := ticket.NewHandler(myBot)

	http.HandleFunc("/send-ticket", ticketHandler.HandleNewTicket)

	log.Fatal(http.ListenAndServe(":8080", nil))
}
