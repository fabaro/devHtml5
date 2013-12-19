define([
  'jquery',
  'underscore',
  'backbone',
  'models/appManager/appModel/MainSlotModel',
  'models/appManager/appModel/freespinModel/externalService/externalService'
], function($, _, Backbone, MainSlotModel, ExternalService){

  var FreespinModel = Backbone.Model.extend({
    
    initialize: function(){
      window.mainSlotModel = new MainSlotModel();
      mainSlotModel.setTemplate(this.get('widgetButtons'));
      window.externalService = new ExternalService();      
      //this.externalServiceOnChange();
    },

    open: function() {
      console.log("se abrio freespinModel");
    },

    close: function(){
      console.log("se cerro freespinModel");
    },
    pause: function(){
      console.log("se hizo pause freespinModel");
    },
    resume: function(){
      console.log("se hizo resume freespinModel");
    },

    externalServiceOnChange: function(){
      var that = this;
      externalService.on('change', function(){
        console.log('change del ES '+this.get('doSpin'));
        that.openFreespin();
      });
    },

    // function set new canvas y genera figuras ----------------------------------------------------------------------------------
    setSlot: function(nameCanvas){
      var drawX = widthCanvas/2;
      var drawY = heightCanvas/2;
      
      // crea nuevo canvas con fabric.js
      window.canvas = this.__canvas = new fabric.Canvas(nameCanvas, {width: widthCanvas, height: heightCanvas, backgroundColor:'#c6c', selection: false});
      
      // set scale de canvas y dibuja el canvas
      mainSlotModel.setFullscreen(canvas, nameCanvas);
      
      // true/false si debe mostrar la botonera, por defecto es true
      switch (buttons) {
        case false:
          this.drawSlot(canvas);
        break;

        default:
          this.drawSlot(canvas);
          mainSlotModel.drawButtons(canvas);
        break;
      };
      
      // function que persive si la pantalla es Landscape o Portrait
      mainSlotModel.update();
      
    },

    // function set widget game y genera nuevo tamaño ----------------------------------------------------------------------------------
    drawSlot: function(canvas){
        var drawX = widthCanvas/2;
        var drawY = heightGame/2;
        
        // crea espacio del GAME
        var gameBox = new fabric.Rect({name:'gameBox', top: drawY, left: drawX, width: widthCanvas, height: heightGame, fill: '#6f6', selectable: false});
        var gameText = new fabric.Text('Game', {top:drawY, left:drawX, fontSize: 18, textAlign:'left', fontFamily: 'Arial'});
        canvas.add(gameBox, gameText);
    },

    callRender: function(){
        mainSlotModel.callRender();
        this.setSlot('canvasGame');
    },

    taskManagerActive: function() {
        slotCollecttion.add(this);
        console.log('hizo add de FREESPINmodel');
        
    } 

  });

  return FreespinModel;

});