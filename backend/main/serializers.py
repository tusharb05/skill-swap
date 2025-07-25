from rest_framework import serializers
from .models import Skill, UserSkill, SwapRequest, Feedback, PlatformMessage
from django.contrib.auth import get_user_model

User = get_user_model()

class UpdateSkillsSerializer(serializers.Serializer):
    add_offered = serializers.ListField(
        child=serializers.CharField(allow_blank=True),
        required=False,
        default=list
    )
    remove_offered = serializers.ListField(
        child=serializers.CharField(allow_blank=True),
        required=False,
        default=list
    )
    add_wanted = serializers.ListField(
        child=serializers.CharField(allow_blank=True),
        required=False,
        default=list
    )
    remove_wanted = serializers.ListField(
        child=serializers.CharField(allow_blank=True),
        required=False,
        default=list
    )


class CreateSwapRequestSerializer(serializers.Serializer):
    receiver_id = serializers.IntegerField()
    message = serializers.CharField(required=False, allow_blank=True)
    offered_skills = serializers.ListField(child=serializers.CharField())
    wanted_skills = serializers.ListField(child=serializers.CharField())


class UpdateSwapRequestStatusSerializer(serializers.Serializer):
    status = serializers.ChoiceField(choices=['accepted', 'rejected', 'cancelled'])


class FeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feedback
        fields = ['swap_request', 'rating', 'comment']
        extra_kwargs = {
            'swap_request': {'required': True},
            'rating': {'required': True, 'min_value': 1, 'max_value': 5},
            'comment': {'required': True, 'allow_blank': False}, 
        }


class BanUserSerializer(serializers.Serializer):
    user_id = serializers.IntegerField()
    is_banned = serializers.BooleanField()

class SwapRequestMonitorSerializer(serializers.ModelSerializer):
    offered_skills = serializers.SerializerMethodField()
    wanted_skills  = serializers.SerializerMethodField()
    requester_email = serializers.CharField(source='requester.email')
    receiver_email  = serializers.CharField(source='receiver.email')

    class Meta:
        model = SwapRequest
        fields = [
            'id', 'requester_email', 'receiver_email',
            'offered_skills', 'wanted_skills',
            'message', 'status', 'created_at'
        ]

    def get_offered_skills(self, obj):
        return [s.skill.name for s in obj.offered_skills.all()]

    def get_wanted_skills(self, obj):
        return [s.skill.name for s in obj.wanted_skills.all()]

class PlatformMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlatformMessage
        fields = ['id', 'title', 'body', 'created_at']

from .models import CustomUser

class FeedbackDisplaySerializer(serializers.ModelSerializer):
    reviewer_name = serializers.CharField(source='reviewer.full_name')

    class Meta:
        model = Feedback
        fields = ['id', 'reviewer_name', 'rating', 'comment', 'created_at']


class UserProfileSerializer(serializers.ModelSerializer):
    average_rating = serializers.FloatField(source='rating_summary.average_rating', read_only=True)
    total_reviews = serializers.IntegerField(source='rating_summary.total_reviews', read_only=True)
    offered_skills = serializers.SerializerMethodField()
    wanted_skills = serializers.SerializerMethodField()
    is_self = serializers.SerializerMethodField()
    feedbacks = serializers.SerializerMethodField()

    class Meta:
        model = CustomUser
        fields = [
            'id', 'full_name', 'email', 'location', 'availability', 'is_public',
            'average_rating', 'total_reviews', 'offered_skills', 'wanted_skills',
            'is_self', 'feedbacks'
        ]

    def get_offered_skills(self, obj):
        return list(UserSkill.objects.filter(user=obj, type="offered").values_list("skill__name", flat=True))

    def get_wanted_skills(self, obj):
        return list(UserSkill.objects.filter(user=obj, type="wanted").values_list("skill__name", flat=True))

    def get_is_self(self, obj):
        request_user = self.context.get("request_user")
        return request_user.id == obj.id if request_user else False

    def get_feedbacks(self, obj):
        feedbacks = Feedback.objects.filter(reviewee=obj).select_related('reviewer').order_by('-created_at')
        return FeedbackDisplaySerializer(feedbacks, many=True).data
    

class UserListSerializer(serializers.ModelSerializer):
    average_rating = serializers.FloatField(source='rating_summary.average_rating', default=0.0)
    total_reviews = serializers.IntegerField(source='rating_summary.total_reviews', default=0)

    offered_skills = serializers.SerializerMethodField()
    wanted_skills = serializers.SerializerMethodField()

    class Meta:
        model = CustomUser
        fields = ['id', 'full_name', 'email', 'location', 'availability', 'is_public', 'is_banned',
                  'average_rating', 'total_reviews', 'offered_skills', 'wanted_skills']

    def get_offered_skills(self, obj):
        return list(obj.userskill_set.filter(type="offered").values_list("skill__name", flat=True))

    def get_wanted_skills(self, obj):
        return list(obj.userskill_set.filter(type="wanted").values_list("skill__name", flat=True))
    


class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ['id', 'name']

class SwapRequestSerializer(serializers.ModelSerializer):
    requester_id = serializers.IntegerField(source='requester.id')
    requester_name = serializers.CharField(source='requester.full_name')

    receiver_id = serializers.IntegerField(source='receiver.id')
    receiver_name = serializers.CharField(source='receiver.full_name')

    offered_skills = serializers.SerializerMethodField()
    wanted_skills = serializers.SerializerMethodField()

    class Meta:
        model = SwapRequest
        fields = [
            'id', 'requester_id', 'requester_name',
            'receiver_id', 'receiver_name',
            'message', 'status', 'created_at',
            'offered_skills', 'wanted_skills',
        ]

    def get_offered_skills(self, obj):
        return list(obj.offered_skills.values_list('skill__name', flat=True))

    def get_wanted_skills(self, obj):
        return list(obj.wanted_skills.values_list('skill__name', flat=True))