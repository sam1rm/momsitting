from sqlalchemy import String, Integer, Column, ForeignKey, Float,\
 SmallInteger, Boolean, Table, Unicode, DateTime
from sqlalchemy.orm import relationship, backref
from app.database import Base
from app import db
from datetime import datetime

class User(Base):
    __tablename__ = 'user'
    id = Column(Integer, primary_key = True)
    name = Column(String)
    email = Column(String, index = True, unique = True)
    zip_code = Column(String)
    password = Column(String)
    time_created = Column(DateTime)
    profile_url = Column(String)