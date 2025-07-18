from django.contrib import admin
from django.contrib.gis.admin import GISModelAdmin
# Register your models here.
from .models import School , AdministrativeBoundary, EnrollmentZone,Infrastructure,PolicyAndActivity,Road,UserAccount,UserRole

arr =[School , AdministrativeBoundary, EnrollmentZone,Infrastructure,PolicyAndActivity,Road,UserAccount,UserRole]

class AdministrativeBoundaryAdmin(GISModelAdmin):
     list_display = ('code', 'district', 'address')
    
class EnrollmentZone(GISModelAdmin):
    list_display = ('code', 'name', 'school_id')

for x in arr :
    if x == AdministrativeBoundary:
        admin.site.register(x, AdministrativeBoundaryAdmin)
    elif x == EnrollmentZone:
        admin.site.register(x, EnrollmentZone)
    else:
        admin.site.register(x)

