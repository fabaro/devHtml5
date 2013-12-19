define([
  'underscore',
  'backbone'
], function(_, Backbone) {

  var CanvasModel = Backbone.Model.extend({
    defaults: {
          balanceStart: 1000,
          userBet: 10,
          userCoins: 5,
          lineBet: 1,	
          bonusTrigger: 225
    }

  });
  
  return CanvasModel;

});
