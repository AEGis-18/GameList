from django.urls import path, include
from rest_framework import routers
from server import views

router = routers.DefaultRouter()
router.register(r"game-list", views.GameListView, "GameLists")
router.register(r"user", views.UserView)


urlpatterns = [
    path("api/v1/", include(router.urls)),
]
