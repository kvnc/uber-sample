define([
  'backbone',
  'text!/static/templates/locationsTemplate.html'
], function(Backbone, LocationsTemplate){

  var LocationsView = Backbone.View.extend({

    el: $("#home-content"),

    initialize: function () {
		console.log('Locations View Initialized');
		_.bindAll(this, "render");
     	this.collection.bind("reset", this.render);
    },

    render: function(){
      	var compiledTemplate = _.template(LocationsTemplate, {locations:this.collection.models});
		$("#home-content").html(compiledTemplate);
    }
    
  });

  return LocationsView;
  
});





