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