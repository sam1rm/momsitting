from sqlalchemy import String, Integer, Column, ForeignKey, Float,\
 SmallInteger, Boolean, Table, Unicode, DateTime
from sqlalchemy.orm import relationship, backref
from app.database import Base
from app import db
from datetime import datetime

incoming_request_table = Table('incoming-request_assoc',
    Base.metadata,
    Column('user_id', Integer, ForeignKey('user.id')),
    Column('request_id', Integer, ForeignKey('request.id'))
)

outgoing_request_table = Table('outgoing-request_assoc',
    Base.metadata,
    Column('user_id', Integer, ForeignKey('user.id')),
    Column('request_id', Integer, ForeignKey('request.id'))
)

class User(Base):
    __tablename__ = 'user'
    id = Column(Integer, primary_key = True)
    name = Column(String)
    email = Column(String, index = True, unique = True)
    zip_code = Column(String)
    password = Column(String)
    time_created = Column(DateTime)
    profile_url = Column(String)
    introduction = Column(String(1000))

    #momsitter traits
    address = Column(String)
    childcare_experience = Column(String)
    languages = Column(String)
    age_group_0_2 = Column(Boolean)
    age_group_3_5 = Column(Boolean)
    age_group_6_8 = Column(Boolean)
    age_group_9_11 = Column(Boolean)
    age_group_12 = Column(Boolean)
    licensed = Column(Boolean)
    private = Column(Boolean)
    background_check = Column(Boolean)
    cpr_certified = Column(Boolean)
    part_time = Column(Boolean)
    full_time = Column(Boolean)
    weekly_full_time_rate = Column(Integer)
    displayed = Column(Boolean, default = False)

    outgoing_requests = relationship("Request",
        secondary = outgoing_request_table
        )

    incoming_requests = relationship("Request",
        secondary = incoming_request_table
        )

    def __init__(self, name, email, password, zip_code):
        self.name = name
        self.email = email
        self.password = password
        self.zip_code = zip_code
        self.time_created = datetime.now()

    def __repr__(self):
        return "<Name: %s, Email: %s, Zip: %s, Date: %s>" % (self.name, self.email,\
            str(self.zip_code), self.time_created.strftime('%b %d,%Y'))

class Request(Base):
    __tablename__ = 'request'
    id = Column(Integer, primary_key = True)
    user_id = Column(Integer)
    momsitter_id = Column(Integer)
    urgency = Column(Integer)
    start_date = Column(DateTime)
    time_created = Column(DateTime)

    def __init__(self, user_id, momsitter_id, urgency, start_date):
        self.user_id = user_id
        self.momsitter_id = momsitter_id
        self.urgency = urgency
        self.start_date = datetime.now()
        self.time_created = datetime.now()
