//collection of Location models
// url is set to always pull for userid=1 for this sample project otherwise it would pull for the user that is logged in
define([
  'backbone',
  'models/location'
], function(Backbone, Location){
	var Locations = Backbone.Collection.extend({
		model: Location,
		url: '/api/location/1'
	})
	return Locations;
});