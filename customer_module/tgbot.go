package main

import (
	"log"

	tgbotapi "github.com/go-telegram-bot-api/telegram-bot-api"
)

const (
	botToken     = "5616686460:AAEfCgQK5aPRkS_oOy4yeC8x_buZ807t5gM"
	operatorChat = 68020168
	engineerChat = 173086
)

func main() {
	bot, err := tgbotapi.NewBotAPI(botToken)
	if err != nil {
		log.Panic(err)
	}

	bot.Debug = true

	log.Printf("Authorized on account %s", bot.Self.UserName)

	msg := tgbotapi.NewMessage(engineerChat, "Hello, engineer!")
	msg.ParseMode = "markdown"
	_, err = bot.Send(msg) 
	// u := tgbotapi.NewUpdate(0)
	// u.Timeout = 60

	// updates, err := bot.GetUpdatesChan(u)
	
	// for update := range updates {
	// 	if update.Message == nil { 
	// 		continue
	// 	}

	// 	if update.Message.Chat.ID == operatorChat {
	//     	update.Message.Text = "Leska Zopa"
	// 		msg := tgbotapi.NewMessage(engineerChat, update.Message.Text)
	// 		bot.Send(msg)
	// 	}
	// }
}
