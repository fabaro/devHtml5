 define([
  'jquery',
  'underscore',
  'backbone',
  'fabric',
  'models/appManager/appModel/MainSlotModel',
  'models/appManager/appModel/slotModel/externalService/externalService',
  'models/appManager/appModel/modelManager/modelManager'
], function($, _, Backbone, Fabric, MainSlotModel, ExternalService, ModelManager){

  var SlotModel = Backbone.Model.extend({

    defaults: {
      callfreeSpin: false,
      callHelp: false,
      slotModelClosed: false
    },

    initialize: function(){
      console.log("se inicio el SLOTMODEL");

      window.mainSlotModel = new MainSlotModel();
      mainSlotModel.setTemplate(this.get('widgetButtons'));
      window.externalService = new ExternalService();      
      this.externalServiceOnChange();    
    },      

    open: function() {
      console.log("se abrio SlotModel");
    },

    close: function(modelClose){
      console.log("se cerro SlotModel");


      this.set('slotModelClosed', true);
    },
    pause: function(){
      console.log("se hizo pause SlotModel");
    },
    resume: function(){
      console.log("se hizo resume SlotModel");
    },

    openFreespin: function() {
      console.log("peticion de abrir freespin al taskmanager");      
      this.set('callfreeSpin', true);
      console.log(this.get('callfreeSpin'));
    },

    doSpin: function(){
      externalService.open();
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
        console.log('hizo add de model');
        
    }    

  });

  return SlotModel;

});