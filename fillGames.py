import os
import django


os.environ.setdefault(
    "DJANGO_SETTINGS_MODULE", "GameList.settings"
)

django.setup()

import json
from server.models import Game

with open("./Games/AllGames.json") as file:
    game_data = json.load(file)
    print(game_data)

for game in game_data:
    Game.objects.create(
        game=game.get("Game"),
        year=game.get("Year"),
        genre=game.get("Genre"),
        dev=game.get("Dev"),
        publisher=game.get("Publisher"),
        platform=game.get("Platform"),
    )
