define([
  'backbone',
  'views/HomeView'
], function(Backbone, HomeView) {
  
  var AppRouter = Backbone.Router.extend({
    routes: {
      '*actions': 'defaultAction'
    }
  });
  
  var initialize = function(){
    var app_router = new AppRouter;

    app_router.on('route:defaultAction', function () {
        this.homeView = new HomeView();
        this.homeView.render();
    });

    Backbone.history.start();
  };

  return { 
    initialize: initialize
  };
});