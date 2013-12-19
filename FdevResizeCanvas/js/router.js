// Filename: router.js
define([
  'jquery',
  'underscore',
  'backbone',
  'fabric',
  'views/defaults/DefaultsView',
  'views/main/MainView',
  'views/canvas/CanvasView',
  'views/observer/ObserverView'
], function($, _, Backbone, Fabric, DefaultsView, MainView, CanvasView, ObserverView) {
  
  var AppRouter = Backbone.Router.extend({
    routes: {
      'main': 'showMain',
      'canvas': 'showCanvas',
      'observer': 'showObserver',
      // Default
      '*actions': 'defaultAction'
    }
  });
  
  var initialize = function(){

    var app_router = new AppRouter;
    
    app_router.on('route:showMain', function(){
   
        // Call render on the module we loaded in via the dependency array
        var mainView = new MainView();
        mainView.render();

    });

    app_router.on('route:showCanvas', function(){
   
        // Call render on the module we loaded in via the dependency array
        var canvasView = new CanvasView();
        canvasView.render();

    });

    app_router.on('route:showObserver', function(){
   
        // Call render on the module we loaded in via the dependency array
        var observerView = new ObserverView();
        observerView.render();

    });

    app_router.on('route:defaultAction', function (actions) {
     
       // We have no matching route, lets display the home page 
        //var mainView = new MainView();
        var defaultsView = new DefaultsView();
        defaultsView.render();
    });

    
    Backbone.history.start();
  };
  return { 
    initialize: initialize
  };
});
