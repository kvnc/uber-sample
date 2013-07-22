from uber import db

ROLE_USER = 0
ROLE_ADMIN = 1

class Location(db.Model):
    __tablename__ = 'Locations'
    id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.Integer, nullable="False")
    name = db.Column(db.String(40), nullable="False")
    lat = db.Column(db.Float, nullable="False")
    lng = db.Column(db.Float, nullable="False")
    number = db.Column(db.Integer, nullable="False")
    street = db.Column(db.String(20), nullable="False")
    city = db.Column(db.String(20), nullable="False")
    state = db.Column(db.String(20), nullable="False")
    zip = db.Column(db.String(15), nullable="False")

    @property
    def serialize(self):
        return {
            'id' : self.id,
            'user_id' : self.user_id,
            'name' : self.name,
            'lat' : self.lat,
            'lng' : self.lng,
            'number' : self.number,
            'street' : self.street,
            'city' : self.city,
            'state' : self.state,
            'zip' : self.zip
        }
