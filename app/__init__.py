from flask import Flask
from flask_sqlalchemy import SQLAlchemy

import os

app = Flask(__name__)
app.config.from_object('config')

if os.environ.get('DATABASE_URL'):
    app.config['SQLALCHEMY_DATABASE_URI'] = os.environ['DATABASE_URL']
else:
    basedir = os.path.abspath(os.path.dirname(__file__))
    SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(basedir, 'app.db')

class DataBase():
    session = None;

    def __init__(self, session):
        self.session = session

db = SQLAlchemy(app)

from app import views, models