from django.urls import path
from .views import RegisterView, LoginView, UpdateSkillsView, CreateSwapRequestView, UpdateSwapRequestStatusView, SubmitFeedbackView, BanUserView, MonitorSwapRequestsView, PlatformMessageView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('update-skills/', UpdateSkillsView.as_view(), name='update-skills'),
    path('create-swap-request/', CreateSwapRequestView.as_view(), name='create-swap-request'),
    path('update-swap-request-status/<int:swap_id>/', UpdateSwapRequestStatusView.as_view(), name='update-swap-request-status'),
    path('feedback-rating/', SubmitFeedbackView.as_view(), name='feedback-rating'),
    path('admin-post-message/', PlatformMessageView.as_view(), name='admin-post-message'),
    path('ban-user/', BanUserView.as_view(), name='ban-user')
]
