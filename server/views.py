from .serializer import GameListSerializer, UserSerializer, GameSerializer
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from .models import GameList, Game
from django.contrib.auth import authenticate, login,logout
from django.http import JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.http import require_POST
from django.contrib.auth.models import User
import json

class RegisterView(APIView):
    def post(self,request):
        username = request.data.get('username')
        password = request.data.get('password')

        if User.objects.filter(username=username).exists():
            return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.create_user(username=username, password=password)
        return Response({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)

class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(username=username, password=password)
        if user:
            login(request, user)
            refresh = RefreshToken.for_user(user)
            return Response({'access': str(refresh.access_token), 'refresh': str(refresh)}, status=status.HTTP_200_OK)

        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

class LogoutView(APIView):
    def post(self, request):
        logout(request)
        return Response({'message': 'Logged out successfully'}, status=status.HTTP_200_OK)

class SessionView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response({'isAuthenticated': True, 'username': user.username}, status=status.HTTP_200_OK)



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

    def get(self, request):
        queryset = Game.objects.all()
        print(request)

        paginator = PageNumberPagination()
        result_page = paginator.paginate_queryset(queryset, request)

        serializer = GameSerializer(result_page, many=True)

        return paginator.get_paginated_response(serializer.data)

    def get_queryset(self):
        queryset = Game.objects.all()
        game_id = self.request.query_params.get("id")
        if game_id is not None:
            queryset = queryset.filter(id=game_id)
        return queryset
