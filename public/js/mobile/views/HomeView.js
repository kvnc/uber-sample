// home view that is initially displayed and always present in this app.  other views slide in/out over this initial view.
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
      // get the users locations on initial load of app, this is the only time that we fetch from the server.
      this.locationsCollection = new LocationsCollection;
      this.locationsCollection.fetch();
    }, 

    events : {
    	"click .home-page-img" : "goToLocations"
    },

    // render locations view which will display the locations collection and will have a css animation attached to it for 
    // the slide in effect.  I create a new div for this view which is discarded whenever the user comes back to 
    // the homepage.  This cleans up the DOM and will allow more panels (besides locations) to be added
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