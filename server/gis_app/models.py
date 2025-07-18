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
    
    geom = gis_models.MultiPolygonField(
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
    
class EnrollmentZone(models.Model):
    """Enrollment Zone model (Vùng tuyển sinh)"""
    code = models.CharField(
        max_length=50,
        unique=True,
        help_text="Mã vùng tuyển sinh (Enrollment zone code)"
    )
    name = models.CharField(
        max_length=255,
        help_text="Tên vùng tuyển sinh (Enrollment zone name)"
        
    )
    school_id = models.ForeignKey(
        School,
        on_delete=models.CASCADE,
        related_name="enrollment_zones",
        to_field='id',
        help_text= "Trường học tuyển sinh (Linked school)"
    )
    geom = gis_models.MultiPolygonField(
        help_text="Ranh giới vùng tuyển sinh (Enrollment zone boundary polygon)"
    )
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = "Enrollment Zone"
        verbose_name_plural = "Enrollment Zones"
        ordering = ['name']
        indexes = [
            models.Index(fields=['code']),
        ]
    def __str__(self):
        return f"{self.name} ({self.code})"
    
    
class Infrastructure(models.Model):
    """Infrastructure model (Cơ sở vật chất)"""
    school_id = models.ForeignKey(
        School,
        on_delete=models.CASCADE,
        to_field='id',
        help_text="Mã trường (School code)"
    )
    photo = models.ImageField(
        upload_to='infrastructure_photos',
        help_text="Ảnh chụp thực tế (Real photo)"
    )
    
    description = models.TextField(
        blank=True,
        help_text="Mô tả thêm về cơ sở vật chất (Optional description)"
    )
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    class Meta:
        verbose_name = "Infrastructure"
        verbose_name_plural = "Infrastructures"
        
    def __str__(self):
        return f"Infrastructure for {self.school_id.name}"
    
    
class PolicyAndActivity(models.Model):
    """Chính sách và hoạt động của trường"""
    school_id = models.ForeignKey(
        School,
        on_delete=models.CASCADE,
        to_field='id',
        help_text='Mã trường (School code)'
    )
    benchmark_score = models.FloatField(
        help_text="Benchmark score (điểm chuẩn)"
    )
    admission_method = models.CharField(
        max_length=255,
        help_text="Admission method (phương thức xét tuyển)"
    )
    tuition_fee = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        help_text="Tuition fee (học phí)"
    )
    university_pass_rate = models.FloatField(
        help_text="Annual university pass rate (tỷ lệ đậu đại học)"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    class Meta:
        verbose_name = "Policy and Activity"
        verbose_name_plural = "Policies and Activities"

    def __str__(self):
        return f"Policy & Activity - {self.school_id.name}"
    
class Road(models.Model):
    """Road model (Giao thông)"""
    name = models.CharField(
        max_length=255,
        help_text= "Road name"
    )
    type = models.CharField(
        max_length=100,
        help_text="Road type"
    )
    goem = gis_models.LineStringField(
        help_text="Geographic line of the road"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    class Meta:
        verbose_name = "Road"
        verbose_name_plural = "Roads"
        ordering = ['name']

    def __str__(self):
        return self.name
    
class UserRole(models.Model):
    """User Role model"""
    name = models.CharField(
        max_length=100,
        unique=True,
        help_text="Role_name"
    )
    description = models.TextField(
        blank=True,
        help_text="Role description"
    )
    class Meta:
        verbose_name = "User Role"
        verbose_name_plural = "User Roles"
        ordering = ['name']
    def __str__(self):
        return self.name
    
class UserAccount(models.Model):
    username = models.CharField(
        max_length=150,
        unique=True,
        help_text= "Username"
    )
    password_hash = models.CharField(
        max_length=255,
        help_text="Password hash"
    )
    role = models.ForeignKey(
        UserRole,
        on_delete=models.CASCADE,
        to_field='id',
        help_text="User role"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    class Meta:
        verbose_name = "User Account"
        verbose_name_plural = "User Accounts"
        ordering = ['username']

    def __str__(self):
        return self.username