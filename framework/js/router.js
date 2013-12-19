// Filename: router.js
define([
  'jquery',
  'underscore',
  'backbone',
  'fabric',
  'collections/taskmanager/taskManagerCollection',
  'views/appManager/slotView/SlotView',
  'views/appManager/freespinView/freespinView'
], function($, _, Backbone, Fabric, taskManagerCollection, SlotView, FreespinView) {
  
  var AppRouter = Backbone.Router.extend({
    routes: {
      // Default
      '*actions': 'defaultAction'
    }
  });
  
  var initialize = function(){

    var app_router = new AppRouter;
    
    app_router.on('route:defaultAction', function (actions) {
     
      window.slotCollecttion = new taskManagerCollection([]);
      
      var slotView = new SlotView();
      slotView.render();

      var freespinView = new FreespinView();
      freespinView.render();
      
    });

    Backbone.history.start();
  };
  return { 
    initialize: initialize
  };
});
