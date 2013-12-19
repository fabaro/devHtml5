// Filename: router.js
define([
  'jquery',
  'underscore',
  'backbone',
  'fabric',
  'collections/taskmanager/taskManagerCollection',
  'models/appManager/appModel/MainSlotModel',
  'views/appManager/slotView/SlotView',
  'views/appManager/bonusView/BonusView'
], function($, _, Backbone, Fabric, taskManagerCollection, MainSlotModel, SlotView, BonusView) {
  
  var AppRouter = Backbone.Router.extend({
    
    initialize: function(el) {
      console.log('INICIO ROUTER');
      this.el = el;
      // inicio del Task Manager
      window.slotCollection = new taskManagerCollection([]);
      //inicio de MainModel (carga: CanvasResize/ButtonBar/SlotTemplate)
      window.mainSlotModel = new MainSlotModel();
      
      
    },

    routes: {
      //"bonus": "bonus",
      "*actions": "defaultAction"
    },

    currentView: null,
  });


  var initialize = function(){

    var app_router = new AppRouter;
    

    app_router.on('route:defaultAction', function (actions) {
       

      slotCollection.on('change:changeActiveView', function(){
        console.log('-------- cambio changeActiveView value = ---------'+slotCollection.models[0].get('changeActiveView'));
        callView(slotCollection.models[0].get('changeActiveView'));
      });
      
      if (this.currentView==null){
        callView(slotCollection.models[0].get('activeView'));
      }
    });
    

    Backbone.history.start();
  };
  
  var callView = function(activeCallView){
      switch (activeCallView){
        case 'slot':
          console.log('ROUTER CALL SLOT-VIEW');
          removeOldView();
          var slotView = new SlotView();
          switchView(slotView);
        break;

        case 'bonus':
          console.log('ROUTER CALL BONUS-VIEW');
          removeOldView();
          var bonusView = new BonusView();
          switchView(bonusView);
        break;

        default:
          console.log('ROUTER CALL DEFAULT VIEW');
          var slotView = new SlotView();
          switchView(slotView);
        break;
      }
  };

  var removeOldView = function() {
      if (this.currentView) {
        // saca vista anterior
        console.log('Hace REMOVE de la VIEW PREVIA AQUI');
        this.currentView.doRemove();
        //this.currentView.remove();
        //this.currentView = null;
      }
  };


  // funcion que hace el render de la vista y cambia var currentView
  var switchView = function(view) {
      //console.log(this.currentView);
      // set valor de var  currentView de nueva vista
      this.currentView = view;
      console.log('valor de currentView: '+this.currentView.name);
      //console.log(this.currentView);
      // Render de la nueva vista
      view.render();
  };

  return { 
    initialize: initialize
  };

});
