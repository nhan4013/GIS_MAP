import geoalchemy2

from typing import Any, List, Optional

from geoalchemy2.types import Geometry
from sqlalchemy import BigInteger, Boolean, CheckConstraint, Column, DateTime, Double, ForeignKeyConstraint, Identity, Index, Integer, Numeric, PrimaryKeyConstraint, SmallInteger, String, Table, Text, UniqueConstraint
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship
import datetime
import decimal

class Base(DeclarativeBase):
    pass


class AuthGroup(Base):
    __tablename__ = 'auth_group'
    __table_args__ = (
        PrimaryKeyConstraint('id', name='auth_group_pkey'),
        UniqueConstraint('name', name='auth_group_name_key'),
        Index('auth_group_name_a6ea08ec_like', 'name'),
        {'schema': 'public'}
    )

    id: Mapped[int] = mapped_column(Integer, Identity(start=1, increment=1, minvalue=1, maxvalue=2147483647, cycle=False, cache=1), primary_key=True)
    name: Mapped[str] = mapped_column(String(150))

    auth_user_groups: Mapped[List['AuthUserGroups']] = relationship('AuthUserGroups', back_populates='group')
    auth_group_permissions: Mapped[List['AuthGroupPermissions']] = relationship('AuthGroupPermissions', back_populates='group')


class AuthUser(Base):
    __tablename__ = 'auth_user'
    __table_args__ = (
        PrimaryKeyConstraint('id', name='auth_user_pkey'),
        UniqueConstraint('username', name='auth_user_username_key'),
        Index('auth_user_username_6821ab7c_like', 'username'),
        {'schema': 'public'}
    )

    id: Mapped[int] = mapped_column(Integer, Identity(start=1, increment=1, minvalue=1, maxvalue=2147483647, cycle=False, cache=1), primary_key=True)
    password: Mapped[str] = mapped_column(String(128))
    is_superuser: Mapped[bool] = mapped_column(Boolean)
    username: Mapped[str] = mapped_column(String(150))
    first_name: Mapped[str] = mapped_column(String(150))
    last_name: Mapped[str] = mapped_column(String(150))
    email: Mapped[str] = mapped_column(String(254))
    is_staff: Mapped[bool] = mapped_column(Boolean)
    is_active: Mapped[bool] = mapped_column(Boolean)
    date_joined: Mapped[datetime.datetime] = mapped_column(DateTime(True))
    last_login: Mapped[Optional[datetime.datetime]] = mapped_column(DateTime(True))

    auth_user_groups: Mapped[List['AuthUserGroups']] = relationship('AuthUserGroups', back_populates='user')
    django_admin_log: Mapped[List['DjangoAdminLog']] = relationship('DjangoAdminLog', back_populates='user')
    auth_user_user_permissions: Mapped[List['AuthUserUserPermissions']] = relationship('AuthUserUserPermissions', back_populates='user')


class DjangoContentType(Base):
    __tablename__ = 'django_content_type'
    __table_args__ = (
        PrimaryKeyConstraint('id', name='django_content_type_pkey'),
        UniqueConstraint('app_label', 'model', name='django_content_type_app_label_model_76bd3d3b_uniq'),
        {'schema': 'public'}
    )

    id: Mapped[int] = mapped_column(Integer, Identity(start=1, increment=1, minvalue=1, maxvalue=2147483647, cycle=False, cache=1), primary_key=True)
    app_label: Mapped[str] = mapped_column(String(100))
    model: Mapped[str] = mapped_column(String(100))

    auth_permission: Mapped[List['AuthPermission']] = relationship('AuthPermission', back_populates='content_type')
    django_admin_log: Mapped[List['DjangoAdminLog']] = relationship('DjangoAdminLog', back_populates='content_type')


class DjangoMigrations(Base):
    __tablename__ = 'django_migrations'
    __table_args__ = (
        PrimaryKeyConstraint('id', name='django_migrations_pkey'),
        {'schema': 'public'}
    )

    id: Mapped[int] = mapped_column(BigInteger, Identity(start=1, increment=1, minvalue=1, maxvalue=9223372036854775807, cycle=False, cache=1), primary_key=True)
    app: Mapped[str] = mapped_column(String(255))
    name: Mapped[str] = mapped_column(String(255))
    applied: Mapped[datetime.datetime] = mapped_column(DateTime(True))


class DjangoSession(Base):
    __tablename__ = 'django_session'
    __table_args__ = (
        PrimaryKeyConstraint('session_key', name='django_session_pkey'),
        Index('django_session_expire_date_a5c62663', 'expire_date'),
        Index('django_session_session_key_c0390e0f_like', 'session_key'),
        {'schema': 'public'}
    )

    session_key: Mapped[str] = mapped_column(String(40), primary_key=True)
    session_data: Mapped[str] = mapped_column(Text)
    expire_date: Mapped[datetime.datetime] = mapped_column(DateTime(True))


t_geography_columns = Table(
    'geography_columns', Base.metadata,
    Column('f_table_catalog', String),
    Column('f_table_schema', String),
    Column('f_table_name', String),
    Column('f_geography_column', String),
    Column('coord_dimension', Integer),
    Column('srid', Integer),
    Column('type', Text),
    schema='public'
)


t_geometry_columns = Table(
    'geometry_columns', Base.metadata,
    Column('f_table_catalog', String(256)),
    Column('f_table_schema', String),
    Column('f_table_name', String),
    Column('f_geometry_column', String),
    Column('coord_dimension', Integer),
    Column('srid', Integer),
    Column('type', String(30)),
    schema='public'
)


class GisAppAdministrativeboundary(Base):
    __tablename__ = 'gis_app_administrativeboundary'
    __table_args__ = (
        PrimaryKeyConstraint('code', name='gis_app_administrativeboundary_pkey'),
        Index('gis_app_adm_distric_b57458_idx', 'district'),
        Index('gis_app_administrativeboundary_code_82a8e16d_like', 'code'),
        Index('gis_app_administrativeboundary_geom_6ecf6f71_id', 'geom'),
        {'schema': 'public'}
    )

    code: Mapped[str] = mapped_column(String(20), primary_key=True)
    address: Mapped[str] = mapped_column(Text)
    district: Mapped[str] = mapped_column(String(255))
    geom: Mapped[Any] = mapped_column(Geometry('MULTIPOLYGON', 4326, from_text='ST_GeomFromEWKT', name='geometry', nullable=False))
    created_at: Mapped[datetime.datetime] = mapped_column(DateTime(True))
    updated_at: Mapped[datetime.datetime] = mapped_column(DateTime(True))

    gis_app_school: Mapped[List['GisAppSchool']] = relationship('GisAppSchool', back_populates='district_code')


class GisAppRoad(Base):
    __tablename__ = 'gis_app_road'
    __table_args__ = (
        PrimaryKeyConstraint('id', name='gis_app_road_pkey'),
        Index('gis_app_road_goem_bcbb4458_id', 'goem'),
        {'schema': 'public'}
    )

    id: Mapped[int] = mapped_column(BigInteger, Identity(start=1, increment=1, minvalue=1, maxvalue=9223372036854775807, cycle=False, cache=1), primary_key=True)
    name: Mapped[str] = mapped_column(String(255))
    type: Mapped[str] = mapped_column(String(100))
    goem: Mapped[Any] = mapped_column(Geometry('LINESTRING', 4326, from_text='ST_GeomFromEWKT', name='geometry', nullable=False))
    created_at: Mapped[datetime.datetime] = mapped_column(DateTime(True))
    updated_at: Mapped[datetime.datetime] = mapped_column(DateTime(True))


class GisAppUserrole(Base):
    __tablename__ = 'gis_app_userrole'
    __table_args__ = (
        PrimaryKeyConstraint('id', name='gis_app_userrole_pkey'),
        UniqueConstraint('name', name='gis_app_userrole_name_key'),
        Index('gis_app_userrole_name_ddecf4df_like', 'name'),
        {'schema': 'public'}
    )

    id: Mapped[int] = mapped_column(BigInteger, Identity(start=1, increment=1, minvalue=1, maxvalue=9223372036854775807, cycle=False, cache=1), primary_key=True)
    name: Mapped[str] = mapped_column(String(100))
    description: Mapped[str] = mapped_column(Text)

    gis_app_useraccount: Mapped[List['GisAppUseraccount']] = relationship('GisAppUseraccount', back_populates='role')


class SpatialRefSys(Base):
    __tablename__ = 'spatial_ref_sys'
    __table_args__ = (
        CheckConstraint('srid > 0 AND srid <= 998999', name='spatial_ref_sys_srid_check'),
        PrimaryKeyConstraint('srid', name='spatial_ref_sys_pkey'),
        {'schema': 'public'}
    )

    srid: Mapped[int] = mapped_column(Integer, primary_key=True)
    auth_name: Mapped[Optional[str]] = mapped_column(String(256))
    auth_srid: Mapped[Optional[int]] = mapped_column(Integer)
    srtext: Mapped[Optional[str]] = mapped_column(String(2048))
    proj4text: Mapped[Optional[str]] = mapped_column(String(2048))


class AuthPermission(Base):
    __tablename__ = 'auth_permission'
    __table_args__ = (
        ForeignKeyConstraint(['content_type_id'], ['public.django_content_type.id'], deferrable=True, initially='DEFERRED', name='auth_permission_content_type_id_2f476e4b_fk_django_co'),
        PrimaryKeyConstraint('id', name='auth_permission_pkey'),
        UniqueConstraint('content_type_id', 'codename', name='auth_permission_content_type_id_codename_01ab375a_uniq'),
        Index('auth_permission_content_type_id_2f476e4b', 'content_type_id'),
        {'schema': 'public'}
    )

    id: Mapped[int] = mapped_column(Integer, Identity(start=1, increment=1, minvalue=1, maxvalue=2147483647, cycle=False, cache=1), primary_key=True)
    name: Mapped[str] = mapped_column(String(255))
    content_type_id: Mapped[int] = mapped_column(Integer)
    codename: Mapped[str] = mapped_column(String(100))

    content_type: Mapped['DjangoContentType'] = relationship('DjangoContentType', back_populates='auth_permission')
    auth_group_permissions: Mapped[List['AuthGroupPermissions']] = relationship('AuthGroupPermissions', back_populates='permission')
    auth_user_user_permissions: Mapped[List['AuthUserUserPermissions']] = relationship('AuthUserUserPermissions', back_populates='permission')


class AuthUserGroups(Base):
    __tablename__ = 'auth_user_groups'
    __table_args__ = (
        ForeignKeyConstraint(['group_id'], ['public.auth_group.id'], deferrable=True, initially='DEFERRED', name='auth_user_groups_group_id_97559544_fk_auth_group_id'),
        ForeignKeyConstraint(['user_id'], ['public.auth_user.id'], deferrable=True, initially='DEFERRED', name='auth_user_groups_user_id_6a12ed8b_fk_auth_user_id'),
        PrimaryKeyConstraint('id', name='auth_user_groups_pkey'),
        UniqueConstraint('user_id', 'group_id', name='auth_user_groups_user_id_group_id_94350c0c_uniq'),
        Index('auth_user_groups_group_id_97559544', 'group_id'),
        Index('auth_user_groups_user_id_6a12ed8b', 'user_id'),
        {'schema': 'public'}
    )

    id: Mapped[int] = mapped_column(BigInteger, Identity(start=1, increment=1, minvalue=1, maxvalue=9223372036854775807, cycle=False, cache=1), primary_key=True)
    user_id: Mapped[int] = mapped_column(Integer)
    group_id: Mapped[int] = mapped_column(Integer)

    group: Mapped['AuthGroup'] = relationship('AuthGroup', back_populates='auth_user_groups')
    user: Mapped['AuthUser'] = relationship('AuthUser', back_populates='auth_user_groups')


class DjangoAdminLog(Base):
    __tablename__ = 'django_admin_log'
    __table_args__ = (
        CheckConstraint('action_flag >= 0', name='django_admin_log_action_flag_check'),
        ForeignKeyConstraint(['content_type_id'], ['public.django_content_type.id'], deferrable=True, initially='DEFERRED', name='django_admin_log_content_type_id_c4bce8eb_fk_django_co'),
        ForeignKeyConstraint(['user_id'], ['public.auth_user.id'], deferrable=True, initially='DEFERRED', name='django_admin_log_user_id_c564eba6_fk_auth_user_id'),
        PrimaryKeyConstraint('id', name='django_admin_log_pkey'),
        Index('django_admin_log_content_type_id_c4bce8eb', 'content_type_id'),
        Index('django_admin_log_user_id_c564eba6', 'user_id'),
        {'schema': 'public'}
    )

    id: Mapped[int] = mapped_column(Integer, Identity(start=1, increment=1, minvalue=1, maxvalue=2147483647, cycle=False, cache=1), primary_key=True)
    action_time: Mapped[datetime.datetime] = mapped_column(DateTime(True))
    object_repr: Mapped[str] = mapped_column(String(200))
    action_flag: Mapped[int] = mapped_column(SmallInteger)
    change_message: Mapped[str] = mapped_column(Text)
    user_id: Mapped[int] = mapped_column(Integer)
    object_id: Mapped[Optional[str]] = mapped_column(Text)
    content_type_id: Mapped[Optional[int]] = mapped_column(Integer)

    content_type: Mapped[Optional['DjangoContentType']] = relationship('DjangoContentType', back_populates='django_admin_log')
    user: Mapped['AuthUser'] = relationship('AuthUser', back_populates='django_admin_log')


class GisAppSchool(Base):
    __tablename__ = 'gis_app_school'
    __table_args__ = (
        CheckConstraint('student_count >= 0', name='gis_app_school_student_count_check'),
        CheckConstraint('teacher_count >= 0', name='gis_app_school_teacher_count_check'),
        ForeignKeyConstraint(['district_code_id'], ['public.gis_app_administrativeboundary.code'], deferrable=True, initially='DEFERRED', name='gis_app_school_district_code_id_e56f18bd_fk_gis_app_a'),
        PrimaryKeyConstraint('id', name='gis_app_school_pkey'),
        Index('gis_app_sch_distric_b2e688_idx', 'district_code_id'),
        Index('gis_app_sch_school__207e0f_idx', 'school_type'),
        Index('gis_app_school_district_code_id_e56f18bd', 'district_code_id'),
        Index('gis_app_school_district_code_id_e56f18bd_like', 'district_code_id'),
        Index('gis_app_school_geom_7e82cd46_id', 'geom'),
        {'schema': 'public'}
    )

    id: Mapped[int] = mapped_column(BigInteger, Identity(start=1, increment=1, minvalue=1, maxvalue=9223372036854775807, cycle=False, cache=1), primary_key=True)
    name: Mapped[str] = mapped_column(String(255))
    address: Mapped[str] = mapped_column(Text)
    student_count: Mapped[int] = mapped_column(Integer)
    teacher_count: Mapped[int] = mapped_column(Integer)
    school_type: Mapped[str] = mapped_column(String(20))
    created_at: Mapped[datetime.datetime] = mapped_column(DateTime(True))
    updated_at: Mapped[datetime.datetime] = mapped_column(DateTime(True))
    geom: Mapped[Any] = mapped_column(Geometry('POINT', 4326, from_text='ST_GeomFromEWKT', name='geometry', nullable=False))
    district_code_id: Mapped[str] = mapped_column(String(20))
    phone: Mapped[Optional[str]] = mapped_column(String(20))
    website: Mapped[Optional[str]] = mapped_column(String(200))

    district_code: Mapped['GisAppAdministrativeboundary'] = relationship('GisAppAdministrativeboundary', back_populates='gis_app_school')
    gis_app_enrollmentzone: Mapped[List['GisAppEnrollmentzone']] = relationship('GisAppEnrollmentzone', back_populates='school_id')
    gis_app_infrastructure: Mapped[List['GisAppInfrastructure']] = relationship('GisAppInfrastructure', back_populates='school_id')
    gis_app_policyandactivity: Mapped[List['GisAppPolicyandactivity']] = relationship('GisAppPolicyandactivity', back_populates='school_id')


class GisAppUseraccount(Base):
    __tablename__ = 'gis_app_useraccount'
    __table_args__ = (
        ForeignKeyConstraint(['role_id'], ['public.gis_app_userrole.id'], deferrable=True, initially='DEFERRED', name='gis_app_useraccount_role_id_b9a04e90_fk_gis_app_userrole_id'),
        PrimaryKeyConstraint('id', name='gis_app_useraccount_pkey'),
        UniqueConstraint('username', name='gis_app_useraccount_username_key'),
        Index('gis_app_useraccount_role_id_b9a04e90', 'role_id'),
        Index('gis_app_useraccount_username_e89410c8_like', 'username'),
        {'schema': 'public'}
    )

    id: Mapped[int] = mapped_column(BigInteger, Identity(start=1, increment=1, minvalue=1, maxvalue=9223372036854775807, cycle=False, cache=1), primary_key=True)
    username: Mapped[str] = mapped_column(String(150))
    password_hash: Mapped[str] = mapped_column(String(255))
    created_at: Mapped[datetime.datetime] = mapped_column(DateTime(True))
    role_id: Mapped[int] = mapped_column(BigInteger)

    role: Mapped['GisAppUserrole'] = relationship('GisAppUserrole', back_populates='gis_app_useraccount')


class AuthGroupPermissions(Base):
    __tablename__ = 'auth_group_permissions'
    __table_args__ = (
        ForeignKeyConstraint(['group_id'], ['public.auth_group.id'], deferrable=True, initially='DEFERRED', name='auth_group_permissions_group_id_b120cbf9_fk_auth_group_id'),
        ForeignKeyConstraint(['permission_id'], ['public.auth_permission.id'], deferrable=True, initially='DEFERRED', name='auth_group_permissio_permission_id_84c5c92e_fk_auth_perm'),
        PrimaryKeyConstraint('id', name='auth_group_permissions_pkey'),
        UniqueConstraint('group_id', 'permission_id', name='auth_group_permissions_group_id_permission_id_0cd325b0_uniq'),
        Index('auth_group_permissions_group_id_b120cbf9', 'group_id'),
        Index('auth_group_permissions_permission_id_84c5c92e', 'permission_id'),
        {'schema': 'public'}
    )

    id: Mapped[int] = mapped_column(BigInteger, Identity(start=1, increment=1, minvalue=1, maxvalue=9223372036854775807, cycle=False, cache=1), primary_key=True)
    group_id: Mapped[int] = mapped_column(Integer)
    permission_id: Mapped[int] = mapped_column(Integer)

    group: Mapped['AuthGroup'] = relationship('AuthGroup', back_populates='auth_group_permissions')
    permission: Mapped['AuthPermission'] = relationship('AuthPermission', back_populates='auth_group_permissions')


class AuthUserUserPermissions(Base):
    __tablename__ = 'auth_user_user_permissions'
    __table_args__ = (
        ForeignKeyConstraint(['permission_id'], ['public.auth_permission.id'], deferrable=True, initially='DEFERRED', name='auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm'),
        ForeignKeyConstraint(['user_id'], ['public.auth_user.id'], deferrable=True, initially='DEFERRED', name='auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id'),
        PrimaryKeyConstraint('id', name='auth_user_user_permissions_pkey'),
        UniqueConstraint('user_id', 'permission_id', name='auth_user_user_permissions_user_id_permission_id_14a6b632_uniq'),
        Index('auth_user_user_permissions_permission_id_1fbb5f2c', 'permission_id'),
        Index('auth_user_user_permissions_user_id_a95ead1b', 'user_id'),
        {'schema': 'public'}
    )

    id: Mapped[int] = mapped_column(BigInteger, Identity(start=1, increment=1, minvalue=1, maxvalue=9223372036854775807, cycle=False, cache=1), primary_key=True)
    user_id: Mapped[int] = mapped_column(Integer)
    permission_id: Mapped[int] = mapped_column(Integer)

    permission: Mapped['AuthPermission'] = relationship('AuthPermission', back_populates='auth_user_user_permissions')
    user: Mapped['AuthUser'] = relationship('AuthUser', back_populates='auth_user_user_permissions')


class GisAppEnrollmentzone(Base):
    __tablename__ = 'gis_app_enrollmentzone'
    __table_args__ = (
        ForeignKeyConstraint(['school_id_id'], ['public.gis_app_school.id'], deferrable=True, initially='DEFERRED', name='gis_app_enrollmentzo_school_id_id_c48d645a_fk_gis_app_s'),
        PrimaryKeyConstraint('id', name='gis_app_enrollmentzone_pkey'),
        UniqueConstraint('code', name='gis_app_enrollmentzone_code_key'),
        Index('gis_app_enr_code_c78c5e_idx', 'code'),
        Index('gis_app_enrollmentzone_code_0a79484f_like', 'code'),
        Index('gis_app_enrollmentzone_geom_f8730455_id', 'geom'),
        Index('gis_app_enrollmentzone_school_id_id_c48d645a', 'school_id_id'),
        {'schema': 'public'}
    )

    id: Mapped[int] = mapped_column(BigInteger, Identity(start=1, increment=1, minvalue=1, maxvalue=9223372036854775807, cycle=False, cache=1), primary_key=True)
    code: Mapped[str] = mapped_column(String(50))
    name: Mapped[str] = mapped_column(String(255))
    geom: Mapped[Any] = mapped_column(Geometry('MULTIPOLYGON', 4326, from_text='ST_GeomFromEWKT', name='geometry', nullable=False))
    created_at: Mapped[datetime.datetime] = mapped_column(DateTime(True))
    updated_at: Mapped[datetime.datetime] = mapped_column(DateTime(True))
    school_id_id: Mapped[int] = mapped_column(BigInteger)

    school_id: Mapped['GisAppSchool'] = relationship('GisAppSchool', back_populates='gis_app_enrollmentzone')


class GisAppInfrastructure(Base):
    __tablename__ = 'gis_app_infrastructure'
    __table_args__ = (
        ForeignKeyConstraint(['school_id_id'], ['public.gis_app_school.id'], deferrable=True, initially='DEFERRED', name='gis_app_infrastructu_school_id_id_c2273687_fk_gis_app_s'),
        PrimaryKeyConstraint('id', name='gis_app_infrastructure_pkey'),
        Index('gis_app_infrastructure_school_id_id_c2273687', 'school_id_id'),
        {'schema': 'public'}
    )

    id: Mapped[int] = mapped_column(BigInteger, Identity(start=1, increment=1, minvalue=1, maxvalue=9223372036854775807, cycle=False, cache=1), primary_key=True)
    photo: Mapped[str] = mapped_column(String(100))
    description: Mapped[str] = mapped_column(Text)
    created_at: Mapped[datetime.datetime] = mapped_column(DateTime(True))
    updated_at: Mapped[datetime.datetime] = mapped_column(DateTime(True))
    school_id_id: Mapped[int] = mapped_column(BigInteger)

    school_id: Mapped['GisAppSchool'] = relationship('GisAppSchool', back_populates='gis_app_infrastructure')


class GisAppPolicyandactivity(Base):
    __tablename__ = 'gis_app_policyandactivity'
    __table_args__ = (
        ForeignKeyConstraint(['school_id_id'], ['public.gis_app_school.id'], deferrable=True, initially='DEFERRED', name='gis_app_policyandact_school_id_id_3d90b3fd_fk_gis_app_s'),
        PrimaryKeyConstraint('id', name='gis_app_policyandactivity_pkey'),
        Index('gis_app_policyandactivity_school_id_id_3d90b3fd', 'school_id_id'),
        {'schema': 'public'}
    )

    id: Mapped[int] = mapped_column(BigInteger, Identity(start=1, increment=1, minvalue=1, maxvalue=9223372036854775807, cycle=False, cache=1), primary_key=True)
    benchmark_score: Mapped[float] = mapped_column(Double(53))
    admission_method: Mapped[str] = mapped_column(String(255))
    tuition_fee: Mapped[decimal.Decimal] = mapped_column(Numeric(12, 2))
    university_pass_rate: Mapped[float] = mapped_column(Double(53))
    created_at: Mapped[datetime.datetime] = mapped_column(DateTime(True))
    updated_at: Mapped[datetime.datetime] = mapped_column(DateTime(True))
    school_id_id: Mapped[int] = mapped_column(BigInteger)

    school_id: Mapped['GisAppSchool'] = relationship('GisAppSchool', back_populates='gis_app_policyandactivity')
