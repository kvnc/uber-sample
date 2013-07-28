// view to allow editing, adding and deleting of location models in the locations collection
define([
  'backbone',
  'text!/public/templates/mobile/locationTemplate.html'
], function(Backbone, LocationTemplate){

  var LocationView = Backbone.View.extend({

    el: '#location-panel',

    initialize: function (options) {
      // setup event aggregator to allow interaction with objects in other views
      this.eventAggr = options.eventAggr;
    },

    render:function (eventName) {
      this.$el.html(_.template(LocationTemplate, this.model.toJSON()));
    },
 
    events:{
        "click .go-back" : "goToLocations",
        "click .edit" : "edit",
        "click .save" : "save",
        "click .delete-button" : "delete",
        "webkitAnimationEnd .panel.panel-slide-right" : "postRightSlide",
        "animationend .panel.panel-slide-right" : "postRightSlide"
    },

    // destroy model after it has been slide off the screen
    postRightSlide: function(event) {
      this.unbind();
      this.remove();
    },

    // go back to locations view by adding css animation to current view causing it to slide off screen
    goToLocations: function(event) {
      this.$el.find('.panel').addClass('panel-slide-right');
    },

    // enable inputs for editing when user clicks edit button
    edit: function(event) {
      this.$el.find('input').removeAttr('disabled');
      this.$el.find('.edit').addClass('save').html('Save');
      this.$el.find('.delete-button').hide();
    },

    // save or update model by passing updated model to the event aggregator which will update the collection
    save:function () {
      var name = $('#name').val();
      var street = $('#street').val();
      var city = $('#city').val();
      var state = $('#state').val();
      var zip = $('#zip').val();
      // quick validation to make sure all inputs have a value, TODO - need to use better validation and validate actual address
      if (name != '' && street != '' && city != '' && state != '' && zip != '') {
        this.model.set({
              user_id:1,
              name:name,
              street:street,
              city:city,
              state:state,
              zip:zip
        });
        this.eventAggr.trigger('addToCollection', this.model);
        this.goToLocations();
      } else {
        this.$el.find('.notification').html('All fields are required').show();
      }
    },
 
    delete:function () {
        this.model.destroy();
        this.goToLocations();
    }

  });

  return LocationView;
  
});