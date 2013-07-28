from flask import Flask, jsonify, abort, make_response, request, json
from flask.ext import restful
from flask.ext.restful import abort, Api, Resource
from uber import app, db
import models, urllib, urllib2

api = restful.Api(app);

def location_404(id):
    abort(404, message="Location {} does not exist".format(id))

# get lat and lng from google based on location that user entered
def getGeoCode(street,city,state,zip):
    address = '{0}+{1}+{2}+{3}'.format(street,city,state,zip) 
    url="http://maps.googleapis.com/maps/api/geocode/json?address=%s&sensor=false" % urllib.quote(address)
    response = urllib2.urlopen(url)
    try:
        return json.loads(response.read())
    except:
        return None

class Location(Resource):
    def post(self):
        j = json.loads(request.data)
        geocode = getGeoCode(j["street"],j["city"],j["state"],j["zip"])
        lat = geocode["results"][0]["geometry"]["location"]["lat"]
        lng = geocode["results"][0]["geometry"]["location"]["lng"]
        u = models.Location(user_id=j["user_id"],name=j["name"],lat=lat,lng=lng,street=j["street"],city=j["city"],state=j["state"],zip=j["zip"])
        db.session.add(u)
        db.session.commit()
        return u.serialize, 201

class Locations(Resource):
    def get(self, id):
        return [i.serialize for i in db.session.query(models.Location).filter(models.Location.user_id == id)]

    def delete(self, id):
        u = models.Location.query.get(id)
        if u is None:
            location_404(id)
        
        db.session.delete(u)
        db.session.commit()            
        return id, 204

    def put(self, id):
        u = models.Location.query.get(id)
        if u is None:
            location_404(id)

        j = json.loads(request.data)
        geocode = getGeoCode(j["street"],j["city"],j["state"],j["zip"])

        u.user_id = j["user_id"]
        u.name = j["name"]
        u.street = j["street"]
        u.city = j["city"]
        u.state = j["state"]
        u.zip = j["zip"]

        if geocode is not None:
            u.lat = geocode["results"][0]["geometry"]["location"]["lat"]
            u.lng = geocode["results"][0]["geometry"]["location"]["lng"]
        else:
            u.lat = 0
            u.ng = 0
     
        db.session.commit()
        return u.serialize, 201

api.add_resource(Location, '/api/location')
api.add_resource(Locations, '/api/location/<string:id>')
