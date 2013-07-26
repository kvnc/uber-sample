define([
  'backbone'
], function(Backbone){
  var Location = Backbone.Model.extend({
  	urlRoot: '/api/location',
  	defaults: {
  		name: '',
  		lat: '',
  		lng: '',
  		street: '',
  		city: '',
  		state: '',
  		zip: ''
  	}
  });

  return Location;
});

