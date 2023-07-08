package ticket

import (
	"encoding/json"
	"engineerbot/bot"
	"io"
	"log"
	"net/http"
	"strconv"
	"time"

	tgbotapi "github.com/go-telegram-bot-api/telegram-bot-api"
)

type Ticket struct {
	ID                    int64  `json:"id"`
	Subject               string `json:"subject"`
	CreatedAt             time.Time `json:"created_at"`
	Client                string `json:"client"`
	EquipmentName         string `json:"equipment_name"`
	SerialNumber          string `json:"serial_number"`
	CriticalityName       string `json:"criticality_name"`
	Hours                 string `json:"hours"`
	Description           string `json:"description"`
	Engineer              string `json:"engineer"`
	AdditionalInformation string `json:"additional_information"`
	Address               string `json:"address"`
	ChatID                int64  `json:"chat_id"`
}


type Handler struct {
	bot *bot.Bot
}

func NewHandler(bot *bot.Bot) *Handler {
	return &Handler{bot}
}

func (h *Handler) HandleNewTicket(w http.ResponseWriter, r *http.Request) {

	// Set CORS headers
    w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
	w.Header().Set("Access-Control-Allow-Methods", "POST")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	// If this is a preflight request, we only need to return the headers above.
	if r.Method == http.MethodOptions {
		return
	}

	body, err := io.ReadAll(r.Body)
	if err != nil {
		http.Error(w, "Failed to read request body", http.StatusBadRequest)
		return
	}
	defer r.Body.Close()

	var ticket Ticket
	err = json.Unmarshal(body, &ticket)
	if err != nil {
		http.Error(w, "Failed to parse JSON", http.StatusBadRequest)
		return
	}
	ticketIDStr := strconv.FormatInt(ticket.ID, 10)
	messageText := "New ticket:\n" +
		"ID: " + ticketIDStr + "\n" +
		"Subject: " + ticket.Subject + "\n" +
		"Created At: " + ticket.CreatedAt.String() + "\n" +
		"Client: " + ticket.Client + "\n" +
		"Equipment Name: " + ticket.EquipmentName + "\n" +
		"Serial Number: " + ticket.SerialNumber + "\n" +
		"Criticality Name: " + ticket.CriticalityName + "\n" +
		"Hours: " + ticket.Hours + "\n" +
		"Description: " + ticket.Description + "\n" +
		"Address: " + ticket.Address + "\n" +
		"Additional Information: " + ticket.AdditionalInformation + "\n"

	msg := tgbotapi.NewMessage(ticket.ChatID, messageText)
	msg.ReplyMarkup = tgbotapi.NewInlineKeyboardMarkup(
		tgbotapi.NewInlineKeyboardRow(
			tgbotapi.NewInlineKeyboardButtonData("Took the ticket", "TookTicket:"+ticketIDStr),
			tgbotapi.NewInlineKeyboardButtonData("Finished", "Finished:"+ticketIDStr),
		),
	)

	if _, err := h.bot.BotAPI.Send(msg); err != nil {
		log.Panic(err)
	}
}
