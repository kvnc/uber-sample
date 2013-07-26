define([
  'backbone',
  'text!/public/templates/mobile/locationTemplate.html'
], function(Backbone, LocationTemplate){

  var LocationView = Backbone.View.extend({

    el: '#location-panel',

    initialize: function (options) {
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
        "webkitAnimationEnd .panel.panel-slide-right" : "postRightSlide"
    },

    postRightSlide: function(event) {
      this.unbind();
      this.remove();
    },

    goToLocations: function(event) {
      this.$el.find('.panel').addClass('panel-slide-right');
    },

    edit: function(event) {
      this.$el.find('input').removeAttr('disabled');
      this.$el.find('.edit').addClass('save').html('Save');
      this.$el.find('.delete-button').hide();
    },

    save:function () {
      var name = $('#name').val();
      var street = $('#street').val();
      var city = $('#city').val();
      var state = $('#state').val();
      var zip = $('#zip').val();
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