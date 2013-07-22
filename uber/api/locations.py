from flask import Flask, jsonify, abort, make_response, request, json
from flask.ext import restful
from flask.ext.restful import abort, Api, Resource
from uber import app, db
import models

api = restful.Api(app);

def user_id_404(user_id):
    abort(404, message="User {} does not exist".format(user_id))

class Location(Resource):
    def post(self):
        j = json.loads(request.data)
        u = models.Location(user_id=1,name='home',lat=-175.3,lng=-65.2,number=1927,street='E Hawthorne St',city='Tucson',state='AZ',zip='85719')
        u = models.Location(name=j["name"])
        db.session.add(u)
        db.session.commit()
        return u.id, 201

class Locations(Resource):
    def get(self, user_id):
        return [i.serialize for i in db.session.query(models.Location).filter(models.Location.user_id == user_id)]

    def delete(self, location_id):
        u = models.Location.query.get(location_id)
        if u is None:
            location_404(location_id)
        
        db.session.delete(u)
        db.session.commit()            
        return location_404, 204

    def put(self, location_id):
        u = models.Location.query.get(location_id)
        if u is None:
            location_404(location_id)

        j = json.loads(request.data)
        u.name = j["name"]
        db.session.commit()

        return location_id, 201

api.add_resource(Location, '/api/location')
api.add_resource(Locations, '/api/location/<string:user_id>')
