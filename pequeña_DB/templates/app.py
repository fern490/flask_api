from flask import Flask
from flask_cors import CORS
from pequeña_DB.templates.config import Config, db
from pequeña_DB.templates.routes import routes

app = Flask(__name__)
app.config.from_object(Config)
CORS(app, supports_credentials=True)
db.init_app(app)

app.register_blueprint(routes)

def create_app():
    return app

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
