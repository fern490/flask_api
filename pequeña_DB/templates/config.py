from flask_sqlalchemy import SQLAlchemy

class Config:
    SQLALCHEMY_DATABASE_URI = 'sqlite:///salon_event.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False

db = SQLAlchemy()
