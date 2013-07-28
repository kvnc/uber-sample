// setup require.js settings and initialize app which will initialize the backbone 
// router, can add more calls to app if needed in future
require.config({
  paths: {
    jquery: '/public/js/libraries/jquery-min',
    underscore: '/public/js/libraries/underscore-min',
    backbone: '/public/js/libraries/backbone-min',
    templates: '/templates'
  },
  shim: {
  	backbone: {
  		deps: ["underscore", "jquery"],
  		exports: "Backbone"
  	},
  	underscore: { 
  		exports: "_"
  	}
  }
});

require(['app'], function(App){
  App.initialize();
});