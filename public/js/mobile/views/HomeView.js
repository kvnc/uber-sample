define([
  'backbone',
  'text!/public/templates/mobile/homeTemplate.html',
], function(Backbone, HomeTemplate){

  var HomeView = Backbone.View.extend({

    el: $("#content"),

    render: function(){
    	this.$el.html(HomeTemplate);
    }

  });

  return HomeView;
  
});