import os
import django

# Establecer la configuración del proyecto Django
os.environ.setdefault(
    "DJANGO_SETTINGS_MODULE", "GameList.settings"
)  # Cambia 'tu_proyecto' por el nombre de tu proyecto

# Inicializar Django
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
