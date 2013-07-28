from flask import render_template
from uber import app

## render the home page template for the mobile site which is a single page app.
@app.route('/mobile')
def mobile():
	return render_template('mobile/index.html')
