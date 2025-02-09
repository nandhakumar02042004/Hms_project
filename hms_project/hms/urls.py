from django.urls import path,include
from hms.routers import router


urlpatterns = [
    path('hms2/', include(router.urls)),
]