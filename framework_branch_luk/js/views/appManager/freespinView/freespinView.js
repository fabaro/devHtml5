define([
  'jquery',
  'underscore',
  'backbone',
  'fabric',
  'models/appManager/resizeModel/CanvasResizeModel',
  'models/appManager/appModel/freespinModel/freespinModel'
], function($, _, Backbone, Fabric, CanvasResizeModel, FreespinModel){

  var freespinView = Backbone.View.extend({
    el: $("#page"),
    initialize: function(){

      // init del modelo slotModel
      window.canvasResizeModel = new CanvasResizeModel();
      window.freespinModel = new FreespinModel();
      slotModel.taskManagerActive();      

      console.log(slotCollecttion);            

    },
    
    render: function(){
      
      var that = this;
      
      // function resize esta siempre preguntando tamño de pantalla
      $(window).resize(function() {
          var canvasWidth = window.innerWidth;
          var canvasHeight = window.innerHeight;
          canvasResizeModel.setSize(canvasWidth, canvasHeight);
          
          // se vuelve a hacer render de canvas con nuevas medidas
          that.callRender();
      });      
      
      // Init del render para generar canvas
      that.callRender();      
      //that.spin();
      
    },

    callRender: function(){
      var that = this;      
      that.$el.html(compiledTemplate); 
      freespinModel.callRender();
    }


  });
  return freespinView;
  
});