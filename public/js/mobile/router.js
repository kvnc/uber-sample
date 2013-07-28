// very minimal backbone router because app is designed for non-browser use where URL is irrelevant.  user always
// has to start from the homepage so all routes lead to the home page.  Direct URL access to certain views is not needed
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