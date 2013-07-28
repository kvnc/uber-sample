Uber sample project built using Flask and SQLAlchemy

2 components -

1. API: API is a RESTful API built using flask-restful which pull form the SQLAlchemy database

2. Mobile: Mobile simply renders a template which serves up require.js and backbone.js; mobile is a single load app and the rest is handled on the client side

This project can be executed using run.py in the root folder.

It is also setup for heroku using gunicorn and the Procfile in the root folder.