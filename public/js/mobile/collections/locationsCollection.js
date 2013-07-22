define([
  'backbone',
  'models/location'
], function(Backbone, Location){
	var Locations = Backbone.Collection.extend({
		model: Location,
		url: '/app/services/location',
		initialize: function() {
			console.log('Locations Collection Initialized');
		}
	})
	return Locations;
});