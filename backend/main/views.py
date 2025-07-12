from django.contrib.auth import get_user_model, authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .utils.jwt_utils import generate_jwt
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from .models import Skill, UserSkill, SwapRequest, SwapRequestOfferedSkill, SwapRequestWantedSkill, CustomUser, Feedback, PlatformMessage
from .serializers import UpdateSkillsSerializer, CreateSwapRequestSerializer, UpdateSwapRequestStatusSerializer, FeedbackSerializer, BanUserSerializer, PlatformMessageSerializer, SwapRequestMonitorSerializer
from rest_framework.permissions import IsAuthenticated
from django.db import transaction
from .utils.admin_perm import IsAdminUser

User = get_user_model()

@method_decorator(csrf_exempt, name='dispatch')
class RegisterView(APIView):
    authentication_classes = []
    permission_classes = []

    def post(self, request):
        full_name = request.data.get('full_name')
        email = request.data.get('email')
        password = request.data.get('password')
        location = request.data.get('location') or None
        availability = request.data.get('availability') or None
        is_public = request.data.get('is_public')

        if not all([full_name, email, password]):
            return Response({'detail': 'Full name, email, and password are required.'}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(email=email).exists():
            return Response({'detail': 'Email already registered.'}, status=status.HTTP_400_BAD_REQUEST)

        # Validate is_public as boolean, fallback True
        if str(is_public).lower() in ['false', '0', 'no']:
            is_public = False
        else:
            is_public = True

        user = User.objects.create_user(
            full_name=full_name,
            email=email,
            password=password,
            location=location,
            availability=availability,
            is_public=is_public
        )

        # Ensure rating summary exists
        from .models import UserRatingSummary
        UserRatingSummary.objects.get_or_create(user=user)

        token = generate_jwt(user)
        return Response({'token': token}, status=status.HTTP_201_CREATED)


@method_decorator(csrf_exempt, name='dispatch')
class LoginView(APIView):
    authentication_classes = []
    permission_classes = []

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        if not all([email, password]):
            return Response({'detail': 'Email and password are required.'}, status=status.HTTP_400_BAD_REQUEST)

        user = authenticate(request, email=email, password=password)

        if user is None:
            return Response({'detail': 'Invalid credentials.'}, status=status.HTTP_401_UNAUTHORIZED)

        if not user.is_active:
            return Response({'detail': 'User account is inactive.'}, status=status.HTTP_403_FORBIDDEN)

        if user.is_banned:
            return Response({'detail': 'User account is banned.'}, status=status.HTTP_403_FORBIDDEN)

        token = generate_jwt(user)
        return Response({'token': token}, status=status.HTTP_200_OK)


class UpdateSkillsView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = UpdateSkillsSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        user = request.user
        data = serializer.validated_data

        def handle_skills(skill_names, action, skill_type):
            # Skip empty strings and whitespace-only values
            cleaned_skill_names = [name.strip() for name in skill_names if name.strip()]

            for name in cleaned_skill_names:
                skill, _ = Skill.objects.get_or_create(name=name)

                if action == "add":
                    UserSkill.objects.get_or_create(user=user, skill=skill, type=skill_type)
                elif action == "remove":
                    UserSkill.objects.filter(user=user, skill=skill, type=skill_type).delete()

        handle_skills(data.get("add_offered", []), "add", "offered")
        handle_skills(data.get("remove_offered", []), "remove", "offered")
        handle_skills(data.get("add_wanted", []), "add", "wanted")
        handle_skills(data.get("remove_wanted", []), "remove", "wanted")

        return Response({"detail": "Skills updated successfully."}, status=status.HTTP_200_OK)


class CreateSwapRequestView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = CreateSwapRequestSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        receiver_id = serializer.validated_data['receiver_id']
        offered_skills = serializer.validated_data['offered_skills']
        wanted_skills = serializer.validated_data['wanted_skills']
        message = serializer.validated_data.get('message', '')

        try:
            receiver = CustomUser.objects.get(id=receiver_id)
        except CustomUser.DoesNotExist:
            return Response({"detail": "Receiver not found."}, status=404)

        swap = SwapRequest.objects.create(
            requester=request.user,
            receiver=receiver,
            message=message
        )

        for skill_name in offered_skills:
            skill, _ = Skill.objects.get_or_create(name=skill_name.strip())
            SwapRequestOfferedSkill.objects.create(swap_request=swap, skill=skill)

        for skill_name in wanted_skills:
            skill, _ = Skill.objects.get_or_create(name=skill_name.strip())
            SwapRequestWantedSkill.objects.create(swap_request=swap, skill=skill)

        return Response({"detail": "Swap request created successfully."}, status=status.HTTP_201_CREATED)



class UpdateSwapRequestStatusView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, swap_id):
        serializer = UpdateSwapRequestStatusSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        new_status = serializer.validated_data['status']

        try:
            swap = SwapRequest.objects.get(id=swap_id, receiver=request.user)
        except SwapRequest.DoesNotExist:
            return Response({"detail": "Swap request not found."}, status=404)

        if swap.status != 'pending':
            return Response({"detail": "Only pending requests can be updated."}, status=400)

        swap.status = new_status
        swap.save()

        return Response({"detail": f"Swap request status updated to {new_status}."}, status=200)


class SubmitFeedbackView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = FeedbackSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        swap_request_id = serializer.validated_data['swap_request'].id

        try:
            swap_request = SwapRequest.objects.get(id=swap_request_id, requester=request.user)
        except SwapRequest.DoesNotExist:
            return Response({"detail": "Swap request not found or unauthorized."}, status=404)

        if swap_request.status != 'accepted':
            return Response({"detail": "Cannot leave feedback until swap is completed."}, status=400)

        if Feedback.objects.filter(swap_request=swap_request).exists():
            return Response({"detail": "Feedback already submitted for this swap."}, status=400)

        reviewee = swap_request.receiver
        rating_value = serializer.validated_data['rating']

        with transaction.atomic():
            # Create feedback
            Feedback.objects.create(
                swap_request=swap_request,
                reviewer=request.user,
                reviewee=reviewee,
                rating=rating_value,
                comment=serializer.validated_data['comment']
            )

            # Update rating summary
            summary = reviewee.rating_summary
            total_reviews = summary.total_reviews + 1
            new_average = ((summary.average_rating * summary.total_reviews) + rating_value) / total_reviews

            summary.total_reviews = total_reviews
            summary.average_rating = round(new_average, 2)
            summary.save(update_fields=["total_reviews", "average_rating"])

        return Response({"detail": "Feedback submitted successfully."}, status=201)
    


# class AdminOnlyView(APIView):
#     permission_classes = [IsAuthenticated, IsAdminUser]

#     def get(self, request):
#         return Response({"detail": "You are an admin."})


class BanUserView(APIView):
    permission_classes = [IsAuthenticated, IsAdminUser]

    def post(self, request):
        serializer = BanUserSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        user_id = serializer.validated_data['user_id']
        is_banned = serializer.validated_data['is_banned']

        try:
            u = CustomUser.objects.get(id=user_id)
        except CustomUser.DoesNotExist:
            return Response({'detail': 'User not found.'}, status=404)

        u.is_banned = is_banned
        u.save(update_fields=['is_banned'])
        action = 'banned' if is_banned else 'unbanned'
        return Response({'detail': f'User {action}.'}, status=200)


class MonitorSwapRequestsView(APIView):
    permission_classes = [IsAuthenticated, IsAdminUser]

    def get(self, request):
        status_filter = request.query_params.get('status')
        qs = SwapRequest.objects.all()
        if status_filter in dict(SwapRequest.STATUS_CHOICES):
            qs = qs.filter(status=status_filter)
        serializer = SwapRequestMonitorSerializer(qs.order_by('-created_at'), many=True)
        return Response(serializer.data, status=200)


class PlatformMessageView(APIView):
    permission_classes = [IsAuthenticated, IsAdminUser]

    def get(self, request):
        msgs = PlatformMessage.objects.order_by('-created_at')
        serializer = PlatformMessageSerializer(msgs, many=True)
        return Response(serializer.data, status=200)

    def post(self, request):
        serializer = PlatformMessageSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        serializer.save()
        return Response(serializer.data, status=201)
    

from .serializers import UserProfileSerializer

class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user_id = request.data.get("user_id")
        is_self_flag = request.data.get("is_self", False)

        if is_self_flag:
            target_user = request.user
        else:
            if not user_id:
                return Response({"detail": "user_id is required if is_self is false."}, status=400)

            try:
                target_user = CustomUser.objects.get(id=user_id)
            except CustomUser.DoesNotExist:
                return Response({"detail": "User not found."}, status=404)

            if target_user.is_banned:
                return Response({"detail": "This user is banned."}, status=403)

        serializer = UserProfileSerializer(target_user, context={"request_user": request.user})
        return Response(serializer.data, status=200)
    

from .serializers import UserListSerializer

class AllUsersListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        users = CustomUser.objects.filter(is_active=True, is_banned=False, is_public=True).select_related('rating_summary').prefetch_related('userskill_set__skill')
        serializer = UserListSerializer(users, many=True)
        return Response(serializer.data)
    
from .serializers import SwapRequestSerializer
from django.db import models

class UserSwapRequestsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        swap_requests = SwapRequest.objects.filter(
            models.Q(requester=user) | models.Q(receiver=user)
        ).prefetch_related('offered_skills__skill', 'wanted_skills__skill', 'requester', 'receiver')

        serializer = SwapRequestSerializer(swap_requests, many=True)
        return Response(serializer.data)
    

class AdminMessagesView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        messages = PlatformMessage.objects.all().order_by('-created_at')
        serializer = PlatformMessageSerializer(messages, many=True)
        return Response(serializer.data, status=200)