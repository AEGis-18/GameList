from rest_framework import serializers
from django.contrib.auth.models import User
from .models import GameList, PENDING, Game


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


# class GameSerializer(serializers.Serializer):
#     game_id = serializers.IntegerField(source="id")
#     game = serializers.CharField(source="Game")
#     year = serializers.IntegerField(source="Year", required=False, allow_null=True)
#     genre = serializers.CharField(source="Genre", required=False, allow_null=True)
#     dev = serializers.CharField(source="Dev", required=False, allow_null=True)
#     publisher = serializers.CharField(
#         source="Publisher", required=False, allow_null=True
#     )
#     platform = serializers.CharField(source="Platform")


class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = "__all__"


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"
