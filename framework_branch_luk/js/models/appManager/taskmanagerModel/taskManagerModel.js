define([
  'jquery',
  'underscore',
  'backbone',
  'models/appManager/appModel/freespinModel/FreespinModel',
  'models/appManager/appModel/helpModel/HelpModel'
], function($, _, Backbone, SlotModel, FreespinModel, HelpModel){

  var TaskManagerModel = Backbone.Model.extend({
    
    initialize: function() {

      console.log("se inicializo el TaskManagerModel");

      //creamos los objetos para luego llamarlos
      window.slotModel = new SlotModel();      
      window.freespinModel = new FreespinModel();
      window.helpModel = new HelpModel();

      //this.listenerSlotModel();

      slotModel.on('change:callfreeSpin', function(){        
        console.log('cambio en slotModel del TaskManagerModel');      
      });

    },

    listenerSlotModel: function(){
      console.log('listenerSlotModel open');
      slotModel.on('change', function(){
        console.log();        
      });
    },

    llamarModelo: function(nombreModelo, estado){
      console.log('llamarModelo ABRIO');
      switch(estado){
        case "open":
          nombreModelo.open();
        break;

        case "false":
          nombreModelo.close();
        break;

        default:
          // no pasa nada
          console.log('no pasa nada');
        break;
      }
    }

  });

  return TaskManagerModel;

});