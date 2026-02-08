from django.urls import path
from . import views

urlpatterns = [
    path('api/tekst/', views.api_moj_tekst, name='api_tekst'),
]