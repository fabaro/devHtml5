 define([
  'jquery',
  'underscore',
  'backbone',
  'fabric'
], function($, _, Backbone, Fabric){

  var buttonBarModel = Backbone.Model.extend({

    initialize: function(){
      console.log("se inicio el buttonBarModel");
    },
    
    open: function() {
      console.log("se abrio buttonBarModel");
    },

    close: function(){
      console.log("se cerro buttonBarModel");
    },
    pause: function(){
      console.log("se hizo pause buttonBarModel");
    },
    resume: function(){
      console.log("se hizo resume buttonBarModel");
    },

    // function set widget buttons y genera nuevo tamaño ----------------------------------------------------------------------------------
    drawButtons: function(canvas){
        var drawX = widthCanvas/2;
        var drawY = heightCanvas-(heightButtons/2);
          
        // crea espacio de la BOTONERA
        var buttonsBox = new fabric.Rect({name:'buttonsBox', top: drawY, left: drawX, width: widthCanvas, height: heightButtons, fill: '#99f', selectable: false});
        var buttonsText = new fabric.Text('Buttons', {top:drawY, left:drawX, fontSize: 18, textAlign:'left', fontFamily: 'Arial'});
        canvas.add(buttonsBox, buttonsText);
    },  

  });

  return buttonBarModel;

});