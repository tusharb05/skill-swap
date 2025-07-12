from django.urls import path
from .views import AllUsersListView, UserProfileView, RegisterView, LoginView, UpdateSkillsView, CreateSwapRequestView, UpdateSwapRequestStatusView, SubmitFeedbackView, BanUserView, MonitorSwapRequestsView, PlatformMessageView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('update-skills/', UpdateSkillsView.as_view(), name='update-skills'),
    path('create-swap-request/', CreateSwapRequestView.as_view(), name='create-swap-request'),
    path('update-swap-request-status/<int:swap_id>/', UpdateSwapRequestStatusView.as_view(), name='update-swap-request-status'),
    path('feedback-rating/', SubmitFeedbackView.as_view(), name='feedback-rating'),
    path('admin-post-message/', PlatformMessageView.as_view(), name='admin-post-message'),
    path('ban-user/', BanUserView.as_view(), name='ban-user'),
    path('user-profile/', UserProfileView.as_view(), name='user-profile'),
    path('all-users/', AllUsersListView.as_view(), name='all-users'),
]
