Python, Flask, SQLAlchemy, backbone.js, require.js, CSS3, HTML5

This is a sample project that allows users to manage a set of Favorite Locations.  They are able to add, remove and edit these locations.  It is a single page app with a backbone.js while incorporating require.js to manage file dependencies.  The RESTful API is built using python and flask which takes in and sends back JSON.  It is using SQLAlchemy as the database.

I modeled the design to match the Uber iPhone app.  It is essentially a version of the iPhone app that is to be used on a DESKTOP browser.  It has NOT been optimized for mobile.  It has been written as if you were using an app which is why I do not modify or maintain a URL.


File Breakdown:

/public - all static files are here so they can be hosted on heroku, will be on S3 (time-permitting)
/uber
	/api - RESTful API
	/mobile - mobile project

