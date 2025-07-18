from fastapi import APIRouter,Depends
from sqlalchemy.orm import Session
from .database import get_db
from .models import GisAppSchool
from .shema import SchoolOut
from geoalchemy2.shape import to_shape
from sqlalchemy import func

school_router = APIRouter(prefix="/school", tags=["school"])

@school_router.get("/", response_model=list[SchoolOut])
async def get_schools(db: Session = Depends(get_db)):
    schools = db.query(
        GisAppSchool,
        func.ST_AsGeoJSON(GisAppSchool.geom).label("geom_geojson")
    ).all()
    result = []
    for school, geom_geojson in schools:
        school_dict = school.__dict__.copy()
        school_dict["geom"] = geom_geojson
        result.append(school_dict)
    return result


