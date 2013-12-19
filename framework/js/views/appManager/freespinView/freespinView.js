define([
  'jquery',
  'underscore',
  'backbone',
  'fabric',
  'models/appManager/appModel/freespinModel/freespinModel'
], function($, _, Backbone, Fabric, FreespinModel){

  var freespinView = Backbone.View.extend({
    el: $("#page"),
    initialize: function(){

      // init del modelo slotModel
      window.freespinModel = new FreespinModel();
      freespinModel.taskManagerActive();      
      this.callRender();      
      
      console.log(slotCollecttion);            

    },
    
    render: function(){
      
      var that = this;
      
      // function resize esta siempre preguntando tamño de pantalla
      $(window).resize(function() {
          
          canvasResizeModel.resizeScale(canvas);
          that.callRender();
      });
      
      // Init del render para generar canvas
     //that.spin();
      
    },

    callRender: function(){
      this.$el.html(compiledTemplate); 
      freespinModel.callRender();
    }


  });
  return freespinView;
  
});