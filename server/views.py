from django.shortcuts import render
from .serializer import GameListSerializer, UserSerializer, GameSerializer
from rest_framework import viewsets, status, views
from rest_framework.response import Response
from .models import GameList, Game
from django.contrib.auth.models import User
import json


# Create your views here.
class GameListView(viewsets.ModelViewSet):
    serializer_class = GameListSerializer
    queryset = GameList.objects.all()

    def get_queryset(self):
        queryset = GameList.objects.all()

        game_id = self.request.query_params.get("game")
        user_id = self.request.query_params.get("user")

        if game_id is not None:
            queryset = queryset.filter(game__id=game_id)
        if user_id is not None:
            queryset = queryset.filter(user__id=user_id)

        return queryset


class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()

    def get_queryset(self):
        queryset = User.objects.all()
        user_id = self.request.query_params.get("id")
        if user_id is not None:
            queryset = queryset.filter(user__id=user_id)
        return queryset


class GameView(viewsets.ModelViewSet):
    serializer_class = GameSerializer
    queryset = Game.objects.all()

    def get_queryset(self):
        queryset = Game.objects.all()
        game_id = self.request.query_params.get("id")
        if game_id is not None:
            queryset = queryset.filter(id=game_id)
        return queryset
