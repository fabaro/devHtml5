define([
  'jquery',
  'underscore',
  'backbone',
  'fabric',
  'models/defaults/DefaultsModel',
  'text!templates/defaults/DefaultsTemplate.html'
], function($, _, Backbone, Fabric, DefaultsModel, DefaultsTemplate){

  var DefaultsView = Backbone.View.extend({
    el: $("#page"),
    events: {
        'click .play': 'doPlay',
        'click .line': 'doLine',
        'click .defaults': 'doDefaults',
        'click .canvas': 'showCanvas',
        'click .observer': 'showObserver',
        //'click .intro': 'goIntro'
    },

    initialize: function(){
      var that = this;
      // genera un nuevo DefaultsModel
      that.defaultsModel = new DefaultsModel();
      console.log('Observer VIEW Iniciado');
      
      // se agrega un Observer del modelo
      var observer =  'onSetDefaultBalance';
      that.defaultsModel.addObserver(observer);

      // si hay un cambio en el modelo el Observer llama a la function Update
      that.defaultsModel.on('change', function(){
          that.updateData(observer);
      });
      
    },
    
    render: function() {
      this.$el.html(DefaultsTemplate);
      return this;
    },

    // EVENTOS TRIGGER si hay un click llama a estas funciones del defaultsModel-------------------------------------------------------------
    doPlay: function() {
      this.defaultsModel.setDefaults('userBalance', 255);
    },
    doLine: function() {
      this.defaultsModel.setDefaults('lineBet', 13);
    },
    doDefaults: function() {
      this.defaultsModel.setDefaults(); 
    },
    showCanvas: function() {
      this.defaultsModel.goCanvas();
    },
    showObserver: function() {
      this.defaultsModel.goObserver();
    },

    goIntro: function() {
      this.defaultsModel.setIntro(true);
    },

    // UPDATE DE DATOS si se realizo un cambio en el modelo esta funcione hace la actualizacion en la vista
    updateData:function (objectcontent){
      switch (objectcontent){
        case "onSetDefaultBalance":
          console.log('observer detecto un cambio en : '+ objectcontent);
        break;
        default:
          console.log('default observer, no hace nada');
        break;
      }
    }

  });

  return DefaultsView;
  
});