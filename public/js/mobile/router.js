define([
  'backbone',
  'views/HomeView'
], function(Backbone, HomeView) {
  
  var AppRouter = Backbone.Router.extend({
    routes: {
      'home/:user_id': 'userHome',
      '*actions': 'defaultAction'
    }
  });
  
  var initialize = function(){
    var app_router = new AppRouter;
    
    app_router.on('route:userHome', function (user_id) {
        var view = new HomeView( {user_id: user_id});
        view.render();
    });

    app_router.on('route:defaultAction', function () {
        var view = new HomeView();
        view.render();
    });

    Backbone.history.start();
  };

  return { 
    initialize: initialize
  };
});