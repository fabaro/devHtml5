define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone){

  var InicioJuegoModel = Backbone.Model.extend({
    default : {
      contentSize: {
        contentWidth: 0,
        contentHeight: 0
      },      
      canvasIntroContent: '',
      audio: {
        audioMp3Loaded: 'false',
        audioPlayPause: 'false'        
      },
      imagenesLoaded: '',
      canvasImagesCreated: 'null'
    },

    initialize: function(){
      console.log("InicioJuegoModel fue inicializado");
      this.on('change', function(){
        console.log('- Values for this model have changed.');
      });
    }

  });

  return InicioJuegoModel;

});