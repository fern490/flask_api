from flask_sqlalchemy import SQLAlchemy

class Config:
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://event-show:event1234@10.9.120.5:3306/salon_event'
    SQLALCHEMY_TRACK_MODIFICATIONS = False

db = SQLAlchemy()
