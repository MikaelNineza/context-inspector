from sqlalchemy import create_engine, text
from sqlalchemy.exc import OperationalError
from sqlalchemy.orm import Session
from .config import settings

engine = create_engine(settings.database_url, echo=True)

def database_status() -> str:
    check = text("SELECT 1")
    try:
        with Session(engine) as session:
            session.execute(check)
            return "ok"
    except OperationalError as e:
        print(e)
        return "down"
    except Exception as e:
        print(e)
        return "unknown error"
    
    