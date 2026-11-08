from app.schemas.health import HealthResponse
from fastapi import APIRouter
from app.core.db import database_status

router = APIRouter(
    prefix="/health",
    tags=["health"],
)

@router.get("", response_model=HealthResponse)
def health_check():
    return {
        "status": "ok",
        "database": database_status()
    }