import os
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Config:
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://event-show:event1234@10.9.120.5:3306/event-show'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
