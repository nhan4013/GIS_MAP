from pydantic import BaseModel
from datetime import datetime
from typing import Any, Dict

class AdministrativeBoundaryOut(BaseModel):
    code :str
    address : str
    district :str
    geom: Dict[str, Any]
    created_at : datetime
    updated_at : datetime
    class Config:
        orm_mode = True
        
class SchoolOut(BaseModel):
    id:int
    name:str
    address:str
    student_count:int
    teacher_count:int
    school_type : str
    created_at : datetime
    updated_at : datetime
    geom : str
    district_code_id : str
    phone : str
    website : str

    class Config:
        orm_mode = True