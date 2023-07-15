package main

import (
	"engineerbot/bot"
	"engineerbot/ticket"
	"errors"
	"log"
	"net/http"
	"os"
)

func main() {
	tlgChatBot := os.Getenv("tlg_chat_bot")
	if tlgChatBot == "" {
		log.Panic(errors.New("TLG Key not set"))
	}
	myBot, err := bot.NewBot(tlgChatBot)
	if err != nil {
		log.Panic(err)
	}

	ticketHandler := ticket.NewHandler(myBot)

	http.HandleFunc("/send-ticket", ticketHandler.HandleNewTicket)

	log.Fatal(http.ListenAndServe(":8080", nil))
}
