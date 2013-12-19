define([
  'underscore',
  'backbone',
  'fabric',
  'models/canvas/CanvasModel'
], function(_, Backbone, Fabric, canvasModel) {

  var CanvasButtonsModel = Backbone.Model.extend({
  	// FUNCTION CONTROL OBJECT IN CANVAS
    initialize: function(model, object, change, option){
      //initialize: function(){

          console.log(model+' '+object+' '+change+' '+option)
                //sum = (sum==true) ? > : < ;
                model.set(change, change+1);
                var option= model.get(option);
                var change = model.get(change);
                var userBet = change*option
                changeText = change+'Text';
                //console.log(changeText);
                changeText.set({text:'COINS: '+change});
                model.set('userBet', userBet);
                userBetText.set({text:'BET: '+userBet});
          
    },
    render: function() {
            model.set(change, change+1);
            var option= model.get(option);
            var change = model.get(change);
            var userBet = change*option
            changeText = change+'Text';
            //console.log(changeText);
            changeText.set({text:'COINS: '+change});
            model.set('userBet', userBet);
            userBetText.set({text:'BET: '+userBet});
    }

  });
  
  return CanvasButtonsModel;

});