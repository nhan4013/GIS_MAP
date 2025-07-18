from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .school_endpoint import school_router as school_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Or specify your frontend URL(s)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



app.include_router(school_router)