from flask import Flask
from flask_cors import CORS
from config import Config, db
from routes import routes

app = Flask(__name__)
app.config.from_object(Config)
CORS(app)
db.init_app(app)

app.register_blueprint(routes)

with app.app_context():

 if __name__ == '__main__':
    app.run(debug=True)
    app.run(debug=True)