define([
  'jquery',
  'underscore',
  'backbone',
  'fabric',
], function($, _, Backbone, Fabric){

  var externalService = Backbone.Model.extend({

    defaults:{
      openBonus: false
    },

    initialize: function(){
      console.log(" -- --- INICIO EXTERNAL-SERVICE BONUS-MODULE");      
    },
    
    open: function() {
      console.log("se abrio externalService");
    },

    close: function(){
      console.log("se cerro externalService");
    },

    // function que le dice al External-Service que hubo un Spin
    doSpin: function (betdata){
      console.log("llega al External-Service pedido de Spin");  
      var data = { ff: '1' };      
      this.onSpinResponse(data);
    },

    // Respuesta del External-Service al Spin: dice que ahora debe OpenFreeSpin
    onSpinResponse: function(data){
      switch (data.ff){
        case '1':
          console.log("La response del External-Service");  
          this.set('openBonus', true);
        break;

        default:
          console.log("no se hizo el onSpinResponse");
        break;
      }
    }

      

  });

  return externalService;

});