from flask import render_template
from uber import app

@app.route('/mobile')
def mobile():
	return render_template('mobile/index.html')
