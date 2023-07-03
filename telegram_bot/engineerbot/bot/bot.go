package bot

import (
	"bytes"
	"encoding/json"
	"log"
	"net/http"
	"strings"
	"time"

	tgbotapi "github.com/go-telegram-bot-api/telegram-bot-api"
)

type Bot struct {
	*tgbotapi.BotAPI
}

type EndData struct {
	Timestamp string  `json:"completion_date"`
	Comment   string `json:"comment,omitempty"`
}

type StartData struct {
	Timestamp string `json:"start_date"`
}

func NewBot(token string) (*Bot, error) {
	tgBot, err := tgbotapi.NewBotAPI(token)
	if err != nil {
		return nil, err
	}

	bot := &Bot{tgBot}

	go bot.startUpdatesLoop()

	return bot, nil
}

func (b *Bot) startUpdatesLoop() {
	u := tgbotapi.NewUpdate(0)
	u.Timeout = 60

	updates, err := b.BotAPI.GetUpdatesChan(u)
	if err != nil {
		log.Panic(err)
	}

	for update := range updates {
		// Handle updates here
		if update.CallbackQuery != nil {
			callbackData := update.CallbackQuery.Data
			callbackParts := strings.Split(callbackData, ":")
			action := callbackParts[0]
			ticketID := callbackParts[1]

			// Call your corresponding methods for each action
			switch action {
			case "TookTicket":
				actionData := StartData{
					Timestamp: time.Now().UTC().Format("2006-01-02T15:04:05.999Z07:00"),
				}
				jsonData, err := json.Marshal(actionData)
				if err != nil {
					log.Panic(err)
				}
				log.Println("Starting sending request")
				req, err := http.NewRequest("PUT", "http://localhost:3030/update_start_date/"+ticketID, bytes.NewBuffer(jsonData))
				if err != nil {
					log.Panic(err)
				}
				req.Header.Set("Content-Type", "application/json")

				client := &http.Client{}
				resp, err := client.Do(req)
				if err != nil {
					log.Panic(err)
				}
				if resp.StatusCode == http.StatusOK{
					msg := tgbotapi.NewMessage(update.CallbackQuery.Message.Chat.ID, "You took the ticket!")
					if _, err := b.BotAPI.Send(msg); err != nil {
						log.Panic(err)
					}
					break
				}
				resp.Body.Close()

			case "Finished":
				msg := tgbotapi.NewMessage(update.CallbackQuery.Message.Chat.ID, "Would you like to add a comment?")
				msg.ReplyMarkup = tgbotapi.NewInlineKeyboardMarkup(
					tgbotapi.NewInlineKeyboardRow(
						tgbotapi.NewInlineKeyboardButtonData("Add comment", "AddComment:"+ticketID),
						tgbotapi.NewInlineKeyboardButtonData("Skip comment", "SkipComment:"+ticketID),
					),
				)

				if _, err := b.BotAPI.Send(msg); err != nil {
					log.Panic(err)
				}
				

			case "AddComment":
				// do nothing, just wait for the next message

			case "SkipComment":
				actionData := EndData{
					Timestamp: time.Now().UTC().Format("2006-01-02T15:04:05.999Z07:00"),
				}
				jsonData, err := json.Marshal(actionData)
				if err != nil {
					log.Panic(err)
				}
				log.Println("Starting sending request")
				req, err := http.NewRequest("PUT", "http://localhost:3030/update_completion_date/"+ticketID, bytes.NewBuffer(jsonData))
				if err != nil {
					log.Panic(err)
				}
				req.Header.Set("Content-Type", "application/json")

				client := &http.Client{}
				resp, err := client.Do(req)
				if err != nil {
					log.Panic(err)
				}
				if resp.StatusCode == http.StatusOK{
					msg := tgbotapi.NewMessage(update.CallbackQuery.Message.Chat.ID, "You finished the ticket!")
					if _, err := b.BotAPI.Send(msg); err != nil {
						log.Panic(err)
					}
					break
				} else {
					msg := tgbotapi.NewMessage(update.CallbackQuery.Message.Chat.ID, "Problem with update request")
					if _, err := b.BotAPI.Send(msg); err != nil {
						log.Panic(err)
					}
				}
				resp.Body.Close()

			}

			continue
		}

		if update.Message != nil && update.Message.IsCommand() {
			// Handle comments
			ticketID := update.Message.Command()
			//comment := update.Message.CommandArguments()

			actionData := EndData{
				Timestamp: time.Now().UTC().Format("2006-01-02T15:04:05.999Z07:00"),
			}

			jsonData, err := json.Marshal(actionData)
			if err != nil {
				log.Panic(err)
			}

			log.Println("Starting sending request")
				req, err := http.NewRequest("PUT", "http://localhost:3030/update_completion_date/"+ticketID, bytes.NewBuffer(jsonData))
				if err != nil {
					log.Panic(err)
				}
				req.Header.Set("Content-Type", "application/json")

				client := &http.Client{}
				resp, err := client.Do(req)
				if err != nil {
					log.Panic(err)
				}
				if resp.StatusCode == http.StatusOK{
					msg := tgbotapi.NewMessage(update.CallbackQuery.Message.Chat.ID, "You finished the ticket!")
					if _, err := b.BotAPI.Send(msg); err != nil {
						log.Panic(err)
					}
					break
				} else {
					msg := tgbotapi.NewMessage(update.CallbackQuery.Message.Chat.ID, "Problem with update request")
					if _, err := b.BotAPI.Send(msg); err != nil {
						log.Panic(err)
					}
				}
				resp.Body.Close()
			continue
		}
	}
}
