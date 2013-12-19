 define([
  'jquery',
  'underscore',
  'backbone',
  'fabric',
], function($, _, Backbone, Fabric){

  var externalService = Backbone.Model.extend({

    defaults:{
      doSpin: false
    },

    initialize: function(){
      console.log("se inicio el externalService");      
    },
    
    open: function() {
      console.log("se abrio externalService");
      this.doSpin();
    },

    close: function(){
      console.log("se cerro externalService");
    },

    onSpinResponse: function(data){
      console.log("paso por onSpinResponse");
      switch (data.ff){
        case '1':
          this.set('doSpin', true);
          console.log('doSpin a '+this.get('doSpin'));
        break;

        default:
          console.log("no se hizo el onSpinResponse");
        break;
      }
    },

    doSpin: function (betdata){
      var data = { ff: '1' };      
      this.onSpinResponse(data);
    },

    callRender: function(){
        mainSlotModel.callRender();
        this.setSlot('canvasGame');
    }    

  });

  return externalService;

});