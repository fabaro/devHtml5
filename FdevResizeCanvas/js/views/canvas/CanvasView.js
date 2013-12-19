define([
  'jquery',
  'underscore',
  'backbone',
  'fabric',
  'models/canvas/CanvasResizeModel',
  'text!templates/canvas/canvasTemplate.html'
], function($, _, Backbone, Fabric, CanvasResizeModel, canvasTemplate){

  var CanvasView = Backbone.View.extend({
    el: $("#page"),
    initialize: function(){

      // init del modelo CanvasResizeModel
      window.canvasResizeModel = new CanvasResizeModel();
      console.log('Mostrar botonera: '+canvasResizeModel.get('widgetButtons'));

    },
    
    render: function(){
      
      var that = this;    
      
      // function resize esta siempre preguntando tamño de pantalla
      $(window).resize(function() {
          var canvasWidth = window.innerWidth;
          var canvasHeight = window.innerHeight;
          canvasResizeModel.setSize(canvasWidth, canvasHeight);
          //console.log(canvasWidth+'x'+canvasHeight);
          // se vuelve a hacer render de canvas con nuevas medidas
          that.callRender();
      });
      
      
      // Init del render para generar canvas
      that.callRender();
      
    },

    callRender: function(){
      var that = this;
      var showButtons = canvasResizeModel.get('widgetButtons');    
      canvasResizeModel.setTemplate(showButtons);
      that.$el.html(compiledTemplate); 
      canvasResizeModel.setWrapper('canvasWrapper');
      canvasResizeModel.setCanvas('canvasGame');
    }


  });
  return CanvasView;
  
});