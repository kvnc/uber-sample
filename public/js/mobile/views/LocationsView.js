// view to display the users locations.  it is treated as a 'panel' that slides in/out over the homepage view.
define([
  'backbone',
  'text!/public/templates/mobile/locationsTemplate.html',
  'models/location',
  'views/LocationView'
], function(Backbone, LocationsTemplate, Location, LocationView){

  var LocationsView = Backbone.View.extend({

    el: '#locations-panel',

    initialize: function (options) {
      // using an event aggregator pattern so I can add to this collection from another view without passing the collection
      _.bindAll(this, "addToCollection");
      this.eventAggr = _.extend({}, Backbone.Events);
      this.eventAggr.bind("addToCollection", this.addToCollection);

      this.collection = options.collection;

      // render updated version of view on every update to the collection
      this.collection.on('sync destroy', this.refresh, this);
    },

    render: function(){
      this.$el.html(_.template(LocationsTemplate, {locations:this.collection.models}));
      // panel-slide-left is a css3 animation so the panel slides in from the left
      this.$el.find('.panel').addClass('panel-slide-left');
    },

    refresh: function(){
      this.$el.html(_.template(LocationsTemplate, {locations:this.collection.models}));
    },

    events : {
      "click .go-back" : "goToHome",
      "click .add-location" : "addLocation",
      "click .location" : "goToLocation",
      "animationend .panel.panel-slide-right" : "postRightSlide",
      "animationend .panel.panel-slide-left" : "postLeftSlide",
      "webkitAnimationEnd .panel.panel-slide-right" : "postRightSlide",
      "webkitAnimationEnd .panel.panel-slide-left" : "postLeftSlide"
    },

    // destory this model when the css animation is complete that slides the panel to the right and off the screen, this
    // event has been attached the animationend
    postRightSlide: function(event) {
      this.unbind();
      this.remove();
    },

    // remove css animation class when this panel slides into the screen to get rid of unwanted classes
    postLeftSlide: function(event) {
      this.$el.find('.panel').removeClass('panel-slide-left');
    },

    // go back to home page so add animation so panel is sent off screen and then destroyed
    goToHome: function(event) {
      this.$el.find('.panel').addClass('panel-slide-right');
    },

    // render location view with a blank model, pass in the event aggregator so I can access the collection from this view
    // new div is created with this view which has a css animation and will slide in from the left
    addLocation: function(event) {
      var div = document.createElement('div');
      div.id = 'location-panel';
      document.getElementById('panels').appendChild(div);
      var locationView = new LocationView({model: new Location(), eventAggr : this.eventAggr});
      locationView.render();
    },

    // render location view with the selected model, pass in the event aggregator so I can access the collection from this view
    // new div is created with this view which has a css animation and will slide in from the left
    goToLocation: function(event) {
      var div = document.createElement('div');
      div.id = 'location-panel';
      document.getElementById('panels').appendChild(div);
      var id = $(event.currentTarget).data("id");
      var item = this.collection.get(id);
      console.log(id);
      var locationView = new LocationView({model:item, eventAggr : this.eventAggr});
      locationView.render();
    },

    // event attached to the event aggregrator which allows adding to the collection from other views without passing in the collection
    addToCollection: function(model) {
      this.collection.create(model);
    }

  });

  return LocationsView;
  
});