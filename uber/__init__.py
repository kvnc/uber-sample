import os
from flask import Flask, render_template, request, redirect, url_for

PROJECT_ROOT = os.path.join( os.path.dirname( __file__ ), '..' )

app = Flask(__name__, template_folder='templates', static_folder=os.path.join(PROJECT_ROOT, 'public'), static_url_path="/public")
app.config.from_object('config')

if __name__ == '__main__':
    app.run(debug=True)

import mobile
