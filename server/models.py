from django.db import models
from django.core.exceptions import ValidationError
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator, MaxValueValidator


class Game(models.Model):
    game = models.CharField(max_length=100)
    year = models.IntegerField(blank=True, null=True)
    genre = models.CharField(max_length=100, blank=True, null=True)
    dev = models.CharField(max_length=100, blank=True, null=True)
    publisher = models.CharField(max_length=100, blank=True, null=True)
    platform = models.CharField(max_length=100)


PENDING = 0
PLAYING = 1
FINISHED = 2

STATES = [(PENDING, "pending"), (PLAYING, "playing"), (FINISHED, "finished")]


# Create your models here.
class GameList(models.Model):

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="game_lists")
    game = models.ForeignKey(Game, on_delete=models.CASCADE, related_name="game_lists")
    score = models.IntegerField(
        null=True, blank=True, validators=[MinValueValidator(1), MaxValueValidator(10)]
    )
    game_state = models.IntegerField(choices=STATES, default=PENDING)
    played_time = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0)])

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=["user", "game_id"], name="user_game_key")
        ]

    def clean(self):
        if self.game_state == PENDING and self.score is not None:
            raise ValidationError("Score cannot be assigned if state is PENDING")

        if self.game_state == PENDING and self.played_time is not None:
            raise ValidationError("Played time cannot be assigned if state is PENDING")
