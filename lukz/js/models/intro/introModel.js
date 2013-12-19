define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone){

  var IntroJuegoModel = Backbone.Model.extend({    

    default: {
      audio: {
        url: '',
        introLoaded: false        
      },
      imgCanvasArray: {
        url: {},
        imgsLoaded: false
      }
    },

    initialize: function(){          
      this.audModel = new Audio();
      this.imgCanvasModel = [];    
    }

  });

  return IntroJuegoModel;

});