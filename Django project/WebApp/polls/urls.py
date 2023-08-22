from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("<int:question_id>/", views.detail, name="detail"),
    path("results/<int:question_id>/", views.results, name="results"),
    path("vote/<int:question_id>/", views.vote, name="vote"),
]