from django.urls import path, include
from rest_framework import routers
from server import views

router = routers.DefaultRouter()
router.register(r"game-lists", views.GameListView, "GameLists")
router.register(r"users", views.UserView)
router.register(r"games", views.GameView)

urlpatterns = [
    path("api/v1/", include(router.urls)),
    path('api/v1/signin/', views.RegisterView.as_view(), name='signin'),
    path('api/v1/login/', views.LoginView.as_view(), name='login'),
    path('api/v1/logout/', views.LogoutView.as_view(), name='logout'),
    path('api/v1/session/', views.SessionView.as_view(), name='session'),
    path('api/v1/user-id/', views.GetUserIdView.as_view(), name='session'),
]
