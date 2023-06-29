# import asyncio
# import os
# import json
# import requests
# from aiogram import Bot, Dispatcher, types
# from watchdog.observers import Observer
# from watchdog.events import FileSystemEventHandler

# # Класс-обработчик событий файловой системы
# class FileEventHandler(FileSystemEventHandler):
#     def __init__(self, bot):
#         self.bot = bot

#     def on_created(self, event):
#         if not event.is_directory:
#             if event.src_path.endswith('.json'):
#                 self.process_json_file(event.src_path)

#     def process_json_file(self, file_path):
#         with open(file_path) as json_file:
#             data = json.load(json_file)
#             # Отправляем данные из JSON-файла
#             self.send_data(data)

#     def send_data(self, data):
#         # Здесь вы можете настроить отправку данных куда вам нужно
#         # Например, используя библиотеку requests, отправить данные на определенный URL
#         response = requests.post('https://example.com/api/endpoint', json=data)
#         if response.status_code == 200:
#             print('Data sent successfully')
#         else:
#             print('Error sending data')

# async def main():
#     bot = Bot(token='5616686460:AAEfCgQK5aPRkS_oOy4yeC8x_buZ807t5gM')
#     # Создаем экземпляр класса обработчика событий файловой системы
#     file_event_handler = FileEventHandler(bot)
#     # Указываем путь к директории, которую нужно отслеживать
#     path = '/json_files/ticketData.json'
#     observer = Observer()
#     observer.schedule(file_event_handler, path, recursive=False)
#     observer.start()
#     try:
#         while True:
#             await asyncio.sleep(1)
#     except KeyboardInterrupt:
#         observer.stop()
#     observer.join()
#     await bot.close()

# asyncio.run(main())
import asyncio
import os
import json
from aiogram import Bot, Dispatcher, types
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

# Класс-обработчик событий файловой системы
class FileEventHandler(FileSystemEventHandler):
    def __init__(self, bot, chat_id):
        self.bot = bot
        self.chat_id = chat_id

    def on_created(self, event):
        if not event.is_directory:
            if event.src_path.endswith('.json'):
                self.process_json_file(event.src_path)

    def process_json_file(self, file_path):
        with open(file_path) as json_file:
            data = json.load(json_file)
            # Отправляем данные из JSON-файла в чат
            self.send_data(data)

    async def send_data(self, data):
        # Отправляем сообщение с данными в чат Telegram
        message = f"Новые данные:\n{json.dumps(data, indent=2)}"
        await self.bot.send_message(chat_id=self.chat_id, text=message)

async def main():
    bot_token = '5616686460:AAEfCgQK5aPRkS_oOy4yeC8x_buZ807t5gM'
    chat_id = '5616686460'  # Идентификатор чата, куда будут отправляться данные
    bot = Bot(token=bot_token)
    dispatcher = Dispatcher(bot)
    # Создаем экземпляр класса обработчика событий файловой системы
    file_event_handler = FileEventHandler(bot, chat_id)
    # Указываем путь к директории, которую нужно отслеживать
    path = '/json_files/ticketData.json'
    observer = Observer()
    observer.schedule(file_event_handler, path, recursive=False)
    observer.start()
    try:
        while True:
            await asyncio.sleep(1)
    except KeyboardInterrupt:
        observer.stop()
    observer.join()
    await bot.close()

asyncio.run(main())
