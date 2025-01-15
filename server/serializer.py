from rest_framework import serializers
from django.contrib.auth.models import User
from .models import GameList, PENDING


class GameListSerializer(serializers.ModelSerializer):
    class Meta:
        model = GameList
        fields = "__all__"

    def validate(self, attrs):
        game_state = attrs.get("game_state")
        score = attrs.get("score")
        played_time = attrs.get("played_time")

        if game_state == PENDING:
            if score is not None:
                raise serializers.ValidationError(
                    "Score cannot be assigned if state is PENDING"
                )
            if played_time is not None:
                raise serializers.ValidationError(
                    "Played time cannot be assigned if state is PENDING"
                )

        return attrs


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"
