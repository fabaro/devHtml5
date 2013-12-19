define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone) {

  var DefaultsModel = Backbone.Model.extend({
    defaults: {
          userBalance: 1000,
          userBet: 10,
          userCoins: 5,
          lineBet: 1,	
          bonusTrigger: 225
    },

    initialize: function(){
      console.log('Observable MODEL Iniciado');
      
      
      var that = this;
      window.listObservers = [];
    },

    // function agrega un nuevo Observer al array listObservers
    addObserver:function (observer){
      listObservers.push(observer);
      console.log('Se agrego el Observer: '+listObservers);
    },

    // function set el cambio en las variables defaults
    setDefaults: function(variable, str) {
      switch (variable) {
        case 'userBalance':
          this.set({ userBalance: str });
          console.log('Hubo un cambio en: '+variable);
          break;
        case 'userBet':
          this.set({ userBet: str });
          console.log('Hubo un cambio en: '+variable);
          break;
        case 'userCoins':
          this.set({ userCoins: str });
          console.log('Hubo un cambio en: '+variable);
          break;
        case 'lineBet':
          this.set({ lineBet: str });
          console.log('Hubo un cambio en: '+variable);
          break;
        case 'bonusTrigger':
          this.set({ bonusTrigger: str });
          console.log('Hubo un cambio en: '+variable);
          break;
        default:
          console.log('no hizo cambios en variables');
          break;
      }

    },

    // functiones trigger de botones
    goCanvas: function(){
      location.href = "#/canvas";
    },

    goObserver: function(){
      location.href = "#/observer";
    },

    setIntro: function(str){
      switch (str) {
        case true:
          location.href = "#/main";
          break;
        default:
          console.log('intro no cargada todavia');
          break;
      }
    }
    

  });

  return DefaultsModel;

});
