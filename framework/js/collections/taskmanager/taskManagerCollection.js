define([
  'jquery',
  'underscore',
  'backbone',
], function($, _, Backbone, SlotModel, FreespinModel){

  var TaskManagerCollection = Backbone.Collection.extend({
    initialize: function() {

      console.log("se inicializo el TaskManagerModel");

      //creamos los objetos para luego llamarlos      
      this.listenerSlotModel();

      //window.freespinModel = new FreespinModel();
    },

    listenerSlotModel: function(){
      
      this.on('change:callfreeSpin', function(model){        
        console.log('callfreeSpin - TaskManagerModel');
        
        var callFreeSpinState = model.get('callfreeSpin');
        switch(callFreeSpinState){
          case false:
            model.open();
          break;

          case true:
            model.close();
          break;
        }
        
      });

      this.on('change:slotModelClosed', function(model){
        var slotModelClosedState = model.get('slotModelClosed');
        switch(slotModelClosedState) {
          case true:
        }
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


  return TaskManagerCollection;

});