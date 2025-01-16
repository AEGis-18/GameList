from django.urls import path, include
from rest_framework import routers
from server import views

router = routers.DefaultRouter()
router.register(r"game-lists", views.GameListView, "GameLists")
router.register(r"users", views.UserView)
router.register(r"games", views.GameView)

urlpatterns = [
    path("api/v1/", include(router.urls)),
]
