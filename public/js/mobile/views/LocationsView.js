define([
  'backbone',
  'text!/public/templates/mobile/locationsTemplate.html',
  'models/location',
  'views/LocationView'
], function(Backbone, LocationsTemplate, Location, LocationView){

  var LocationsView = Backbone.View.extend({

    el: '#locations-panel',

    initialize: function (options) {
      _.bindAll(this, "addToCollection");
      this.eventAggr = _.extend({}, Backbone.Events);
      this.eventAggr.bind("addToCollection", this.addToCollection);

      this.collection = options.collection;
      this.collection.on('sync destroy', this.refresh, this);
    },

    render: function(){
      this.$el.html(_.template(LocationsTemplate, {locations:this.collection.models}));
      this.$el.find('.panel').addClass('panel-slide-left');
    },

    refresh: function(){
      this.$el.html(_.template(LocationsTemplate, {locations:this.collection.models}));
    },

    events : {
      "click .go-back" : "goToHome",
      "click .add-location" : "addLocation",
      "click .location" : "goToLocation",
      "webkitAnimationEnd .panel.panel-slide-right" : "postRightSlide",
      "webkitAnimationEnd .panel.panel-slide-left" : "postLeftSlide"
    },

    postRightSlide: function(event) {
      this.unbind();
      this.remove();
    },

    postLeftSlide: function(event) {
      this.$el.find('.panel').removeClass('panel-slide-left');
    },

    goToHome: function(event) {
      this.$el.find('.panel').addClass('panel-slide-right');
    },

    addLocation: function(event) {
      var div = document.createElement('div');
      div.id = 'location-panel';
      document.getElementById('panels').appendChild(div);
      var locationView = new LocationView({model: new Location(), eventAggr : this.eventAggr});
      locationView.render();
    },

    goToLocation: function(event) {
      var div = document.createElement('div');
      div.id = 'location-panel';
      document.getElementById('panels').appendChild(div);
      var id = $(event.currentTarget).data("id");
      var item = this.collection.get(id);
      var locationView = new LocationView({model:item, eventAggr : this.eventAggr});
      locationView.render();
    },

    addToCollection: function(model) {
      this.collection.create(model);
    }

  });

  return LocationsView;
  
});