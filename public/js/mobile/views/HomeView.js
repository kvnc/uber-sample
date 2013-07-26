define([
  'backbone',
  'text!/public/templates/mobile/homeTemplate.html',
  'collections/locationsCollection',
  'views/LocationsView'
], function(Backbone, HomeTemplate, LocationsCollection, LocationsView){

  var HomeView = Backbone.View.extend({

    el: $("#content"),

    render: function(){
    	this.$el.html(HomeTemplate);
      this.locationsCollection = new LocationsCollection;
      this.locationsCollection.fetch();
    }, 

    events : {
    	"click .home-page-img" : "goToLocations"
    },

    goToLocations: function(event) {
      var div = document.createElement('div');
      div.id = 'locations-panel';
      document.getElementById('panels').appendChild(div);
      var locationsView = new LocationsView( {collection:this.locationsCollection});
      locationsView.render();
    }

  });

  return HomeView;
  
});