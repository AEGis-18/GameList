from django.shortcuts import render
from .serializer import GameListSerializer, UserSerializer
from rest_framework import viewsets
from .models import GameList
from django.contrib.auth.models import User


# Create your views here.
class GameListView(viewsets.ModelViewSet):
    serializer_class = GameListSerializer
    queryset = GameList.objects.all()


class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()
