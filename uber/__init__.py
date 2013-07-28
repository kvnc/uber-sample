import os
from flask import Flask
from flask.ext.sqlalchemy import SQLAlchemy

## need to specify the folder for static images which needs to be in the root and called public for heroku deploy
PROJECT_ROOT = os.path.join( os.path.dirname( __file__ ), '..' )

app = Flask(__name__, template_folder='templates', static_folder=os.path.join(PROJECT_ROOT, 'public'), static_url_path="/public")
app.config.from_object('config')
db = SQLAlchemy(app)

import mobile
import api

if __name__ == '__main__':
    app.run(debug=True)
