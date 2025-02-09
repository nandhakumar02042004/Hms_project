from rest_framework.routers import DefaultRouter
from hms.views import DoctorViewSet, PatientViewSet, AppointmentViewSet

router = DefaultRouter()
router.register("doctors", DoctorViewSet)
router.register("patients", PatientViewSet)
router.register("appointments", AppointmentViewSet)
