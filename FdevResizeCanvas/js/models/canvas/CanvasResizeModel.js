define([
  'jquery',
  'underscore',
  'backbone',
  'fabric',
  'text!templates/canvas/canvasTemplate.html'  
], function($, _, Backbone, Fabric, canvasTemplate) {

  var CanvasResizeModel = Backbone.Model.extend({
    defaults: {
          wrapperW : window.innerWidth,
          wrapperH : window.innerHeight,
          canvasW: 480,
          canvasH: 320,
          widgetButtons : true,
          dbName: 'defaultValues'
    },
   
    
    // function set/change el valor de las variables defaults ----------------------------------------------------------------------------------
    setSize: function(width, height) {
        this.set('wrapperW', width);
        this.set('wrapperH', height);
    },
    
    // function set WIDTH/HEIGHT en el Template/Canvas ----------------------------------------------------------------------------------
    setTemplate: function(buttons){
        // create de variables para enviar al template de canvas Wrapper y canvas Game
        window.buttons = buttons;
        window.widthWrapper  = this.get('wrapperW');
        window.heightWrapper = this.get('wrapperH');
        window.widthCanvas   = this.get('canvasW');
        window.heightCanvas  = this.get('canvasH');
        var datos = {     wrapperW : widthWrapper, 
                             wrapperH : heightWrapper,
                             gameW : widthCanvas, 
                             gameH : heightCanvas
                           };
        window.compiledTemplate = _.template( canvasTemplate, datos );
        
        // true/ false set height del canvas si muestra la botonera en porcentaje
        switch (buttons) {
          case false:
            window.heightGame = heightCanvas;
            window.heightButtons = 0;
          break;

          default:
            window.heightGame = (heightCanvas*85)/100;
            window.heightButtons = (heightCanvas*15)/100;
          break;
        }
        
      
    },





    // function set new canvas y genera figuras ----------------------------------------------------------------------------------
    setWrapper: function(nameCanvas){
      var drawWrapX = widthWrapper/2;
      var drawWrapY = heightWrapper/2;
      
      // crea nuevo canvas con fabric.js
      window.wrapper = this.__canvas = new fabric.Canvas(nameCanvas, {width: widthWrapper, height: heightWrapper, backgroundColor:'#ccc', selection: false});
      
      // set scale de wrapper y dibuja el wrapper X
      this.setFullscreen(wrapper, nameCanvas);
      this.drawWrapper(wrapper, drawWrapX, drawWrapY, widthWrapper, heightWrapper);
      
      // function que persive si la pantalla es Landscape o Portrait
      this.update();
    },

    // function dibuja figura utilizando Fabric.js ----------------------------------------------------------------------------------
    drawWrapper: function(canvas, x, y, width, height) {
        // defino X/Y punto de inio/final de la lineaLeft
        var inicioX = x - width;
        var inicioY = y - height;
        var finalX = x + width;
        var finalY = y + height;
        var arrowLeft = new fabric.Line([inicioX, inicioY, finalX, finalY], {stroke: '#000', strokeWidth: 3, selectable: false});
        
        // defino X/Y punto de inio/final de la lineaRight
        var inicioX = x + width;
        var inicioY = y - height;
        var finalX = x - width;
        var finalY = y + height;
        var arrowRight = new fabric.Line([inicioX, inicioY, finalX, finalY], {stroke: '#000', strokeWidth: 3, selectable: false});
        
        // agrega objetos al canvas
        canvas.add(arrowLeft, arrowRight);
    },







    // function set new canvas y genera figuras ----------------------------------------------------------------------------------
    setCanvas: function(nameCanvas){
          var drawX = widthCanvas/2;
          var drawY = heightCanvas/2;
          
          // crea nuevo canvas con fabric.js
          window.canvas = this.__canvas = new fabric.Canvas(nameCanvas, {width: widthCanvas, height: heightCanvas, backgroundColor:'#c6c', selection: false});
          
          // set scale de canvas y dibuja el canvas
          this.setFullscreen(canvas, nameCanvas);
          
          // true/false si debe mostrar la botonera, por defecto es true
          switch (buttons) {
            case false:
              this.drawGame(canvas);
            break;

            default:
              this.drawGame(canvas);
              this.drawButtons(canvas);
            break;
          }
          
          // function que persive si la pantalla es Landscape o Portrait
          this.update();
      
    },

    // function set widget game y genera nuevo tamaño ----------------------------------------------------------------------------------
    drawGame: function(canvas){
        var drawX = widthCanvas/2;
        var drawY = heightGame/2;
        
        // crea espacio del GAME
        var gameBox = new fabric.Rect({name:'gameBox', top: drawY, left: drawX, width: widthCanvas, height: heightGame, fill: '#6f6', selectable: false});
        var gameText = new fabric.Text('Game', {top:drawY, left:drawX, fontSize: 18, textAlign:'left', fontFamily: 'Arial'});
        canvas.add(gameBox, gameText);
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

    // function que da las proporciones de objetos en canvas segun el tamaño de wrapper ------------------------------------------------------------
    setFullscreen: function(canvas, nameCanvas){
            
            // variables que determinan la scala del canvas
            var w=window.innerWidth/canvas.width;
            var h=window.innerHeight/canvas.height;
            var scale=Math.min(h,w);
            
            // variables que setea WIDTH/HEIGHT segun la escala del canvas
            var container = $('#'+nameCanvas);
            container.css('width',(canvas.width*scale)+'px');
            container.css('height',(canvas.height*scale)+'px');
            
            // variables que centran el canvas al wrapper
            container.css('position','fixed');
            container.css('left','50%');
            container.css('top','50%');
            container.css('margin-left',-(canvas.width*scale)/2+'px');
            container.css('margin-top',-(canvas.height*scale)/2+'px');
            container.css('border', '3px solid #000');
    },

    





    // Update viewport orientation
    //---------------------------------------------------------------------------------------------------------------------------------------------
    updateOrientation : function() {
      this.orientation = window.orientation;
      if(this.orientation === undefined) {
        // No JavaScript orientation support. Work it out.
        if(document.documentElement.innerWidth > document.documentElement.innerHeight) {
          this.orientation = 'landscape';
        } else {
          this.orientation = 'portrait';
        }

      } else if (this.orientation === 0 || this.orientation === 180){
        this.orientation = 'portrait';
      } else {
        this.orientation = 'landscape'; // Assumed default, most laptop and PC screens.
      }
      
    },

    // Get current scale
    //-------------------
    getScale : function() {
      this.viewportScale = undefined;

      // Get viewport width
      var viewportWidth = document.documentElement.innerWidth;

      // Abort. Screen width is greater than the viewport width (not fullscreen).
      if(screen.width > viewportWidth) {
        console.log('Aborted viewport scale measurement. Screen width > viewport width');
        return;

      }

      // Get the orientation corrected screen width
      this.updateOrientation();
      this.screenWidth = screen.width;

      if(this.orientation === 'portrait') {
        // Take smaller of the two dimensions
        if(screen.width > screen.height) this.screenWidth = screen.height;

      }
      else {
        // Take larger of the two dimensions
        if(screen.width < screen.height) this.screenWidth = screen.height;

      }

      // Calculate viewport scale
      this.viewportScale = this.screenWidth / window.innerWidth;
      return this.viewportScale;

    },

    // Update
    //--------  
    update : function(callback) {
      // Clear timeout if already set
      if(this.timeout !== undefined) {
        clearTimeout(this.timeout);
        this.timeout = undefined;

      }

      if(this.delay > 0) {
        // Delay compensates for viewport bounce
        var viewScale = this;

        this.timeout = setTimeout(function() {
          viewScale.getScale();
          if(callback !== undefined) callback();

        }, this.delay);

      }
      else {
        // Immediate scale update
        this.getScale();
        if(callback !== undefined) callback();

      }

    }

     /*
    initialize: function(){
        var dbName = this.get('dbName');
        var num = 1;
        this.createDB(dbName);
        $.each(this.defaults, function(i, l, newNum){
            var newNum = num++;
            db.transaction(function (tx) {
              tx.executeSql('INSERT INTO '+dbName+' VALUES ("'+newNum+'","'+i+'","'+l+'")',[], function(){console.log('success');}, function(){console.log('error');});
            });
            
        });
    },
    
    createDB: function(name){
        window.db = openDatabase(name, '1.0', 'Database of default values', 2 * 1024 * 1024);
        db.transaction(function (tx) {
          tx.executeSql('CREATE TABLE IF NOT EXISTS '+name+' (id INTEGER PRIMARY KEY AUTOINCREMENT, defaultVar VARCHAR(255), valueVar VARCHAR(255))');
        });
    },
    */
    

  });
  
  return CanvasResizeModel;

});
