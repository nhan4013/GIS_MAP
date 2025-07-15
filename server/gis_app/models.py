from django.db import models
from django.contrib.gis.db import models as gis_models
# Create your models here.

class AdministrativeBoundary(models.Model):
    """Administrative boundary model for districts (Ranh giới hành chính)"""
    code  = models.CharField(
        max_length=20,
        primary_key=True,
        help_text="Mã quận/huyện (District code)"
    )  
    address = models.TextField(
        help_text="Địa chỉ hành chính (Administrative address)"
    )
    
    district = models.CharField(
        max_length=255,
        help_text="Tên quận/huyện (District/Ward name)"
    )
    
    geom = gis_models.PolygonField(
        help_text="Ranh giới địa lý của quận/huyện (Geographic boundary polygon)"
    )
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = "Administrative Boundary"
        verbose_name_plural = "Administrative Boundaries"
        ordering = ['district']
        indexes = [
            models.Index(fields=['district']),
        ]
    
    def __str__(self):
        return f"{self.district} ({self.code})"
    
class School(models.Model):
    """School model with geographic information"""
    SCHOOL_TYPE_CHOICES = [
        ('public', 'Public School'),
        ('private', 'Private School'),
        ('international', 'International School'),
    ]
    
    name = models.CharField(max_length=255, help_text="School name")
    address = models.TextField(help_text="Complete school address")
    phone = models.CharField(max_length=20, blank=True, null=True, help_text="Contact phone number")
    student_count = models.PositiveIntegerField(default=0, help_text="Total number of students")
    teacher_count = models.PositiveIntegerField(default=0, help_text="Total number of teachers")
    school_type = models.CharField(
        max_length=20, 
        choices=SCHOOL_TYPE_CHOICES, 
        default='public',
        help_text="Type of school"
    )
    website = models.URLField(blank=True,null=True,help_text="School website URL")
    district_code = models.ForeignKey(
        AdministrativeBoundary,
        on_delete=models.CASCADE,
        to_field='code',
        help_text="Mã quận/huyện (Administrative district code)"
    ) 
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    geom = gis_models.PointField(help_text="Geographic location of the school")

    class Meta:
        verbose_name = "School"
        verbose_name_plural = "Schools"
        ordering = ['name']
        indexes = [
            models.Index(fields=['school_type']),
            models.Index(fields=['district_code']),
        ]
        
    def __str__(self):
        return self.name
    
