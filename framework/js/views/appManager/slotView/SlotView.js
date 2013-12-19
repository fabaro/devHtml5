define([
  'jquery',
  'underscore',
  'backbone',
  'fabric',
  'models/appManager/appModel/slotModel/SlotModel'
], function($, _, Backbone, Fabric, SlotModel){

  var SlotView = Backbone.View.extend({
    el: $("#page"),
    initialize: function(){

      //window.canvasResizeModel = new CanvasResizeModel();
      window.slotModel = new SlotModel();
      slotModel.taskManagerActive();
      this.callRender();
    },
    
    render: function(){
      
      var that = this;
      that.spin();

      $(window).resize(function() {
          
          canvasResizeModel.resizeScale(canvas);
          that.callRender();
      });

    },

    spin: function() {
        slotModel.doSpin();
    },

    callRender: function(){
      this.$el.html(compiledTemplate); 
      slotModel.callRender();
    }


  });
  return SlotView;
  
});