define([
  'underscore',
  'backbone',
  'fabric',
  'models/canvas/CanvasModel',
  'models/canvas/CanvasObjectsModel',
  'models/canvas/CanvasButtonsModel',
  'text!templates/main/mainTemplate.html'
], function(_, Backbone, Fabric, CanvasModel, CanvasObjectsModel, CanvasButtonsModel, mainTemplate){

  var MainView = Backbone.View.extend({
    el: $("#page"),

    render: function(){
      var that = this;
      this.$el.html(mainTemplate);
      
      // CREAR CANVAS ---------------------------------------------------------------------------
      var canvasModel = new CanvasModel();
      var canvas = this.__canvas = new fabric.Canvas('canvas', {selection: false, backgroundImage:'imgs/background.jpg'});
      
      // CREAR OBJETOS --------------------------------------------------------------------------
      var balanceStart = canvasModel.get('balanceStart');
      var userBet      = canvasModel.get('userBet');
      var userCoins   = canvasModel.get('userCoins');
      var lineBet    = canvasModel.get('lineBet');
      var userBet = userCoins*lineBet;
          
      var railObject  = new fabric.Circle({ top: 100, left: 100, radius: 50, fill: '#f0f' });
      var btnSpin     = new fabric.Rect({name:'btnSpin', top: 400, left: 500, width: 150, height: 50, fill: '#f55', index: 20});
      var btnSpinText = new fabric.Text('SPIN', {top:400, left:500, fontSize: 18, textAlign:'left', fontFamily: 'Arial'});
      var balanceText = new fabric.Text('BALANCE: '+balanceStart+' Coins', {top:50, left:500, fontSize: 18, textAlign:'left', fontFamily: 'Arial',  textBackgroundColor: 'rgb(225,225,225)'});
      var userBetText = new fabric.Text('BET: '+userBet, {top:100, left:500, fontSize: 16, textAlign:'left', fontFamily: 'Arial',  textBackgroundColor: 'rgb(200,200,0)'});
      var userCoinsText = new fabric.Text('COINS: '+userCoins, {top:150, left:500, fontSize: 16, textAlign:'left', fontFamily: 'Arial',  textBackgroundColor: 'rgb(200,200,0)'});
      var btnUpBet    = new fabric.Text('UP', {name:'btnUpBet', top:150, left:575, fontSize: 16, textAlign:'left', fontFamily: 'Arial',  textBackgroundColor: 'rgb(0,200,0)', fill:'#fff'});
      var btnDownBet  = new fabric.Text('DOWN', {name:'btnDownBet', top:150, left:425, fontSize: 16, textAlign:'left', fontFamily: 'Arial',  textBackgroundColor: 'rgb(0,200,0)', fill:'#fff'});
      var lineBetText = new fabric.Text('LINES: '+lineBet, {top:200, left:500, fontSize: 16, textAlign:'left', fontFamily: 'Arial',  textBackgroundColor: 'rgb(200,200,0)'});
      var btnUpLine   = new fabric.Text('UP', {name:'btnUpLine', top:200, left:575, fontSize: 16, textAlign:'left', fontFamily: 'Arial',  textBackgroundColor: 'rgb(0,200,0)', fill:'#fff'});
      var btnDownLine = new fabric.Text('DOWN', {name:'btnDownLine', top:200, left:425, fontSize: 16, textAlign:'left', fontFamily: 'Arial',  textBackgroundColor: 'rgb(0,200,0)', fill:'#fff'});
      canvas.add(railObject, btnSpin, btnSpinText, balanceText, userBetText, userCoinsText, btnUpBet, btnDownBet, lineBetText, btnUpLine, btnDownLine);
      
      // OPTIONES DE OBJETOS --------------------------------------------------------------------
      var canvasObjectsModel = new CanvasObjectsModel(railObject, false);
      var canvasObjectsModel = new CanvasObjectsModel(btnSpin, true);
      var canvasObjectsModel = new CanvasObjectsModel(btnSpinText, false);
      var canvasObjectsModel = new CanvasObjectsModel(balanceText, false);
      var canvasObjectsModel = new CanvasObjectsModel(userBetText, false);
      var canvasObjectsModel = new CanvasObjectsModel(userCoinsText, false);
      var canvasObjectsModel = new CanvasObjectsModel(btnUpBet, true);
      var canvasObjectsModel = new CanvasObjectsModel(btnDownBet, true);
      var canvasObjectsModel = new CanvasObjectsModel(lineBetText, false);
      var canvasObjectsModel = new CanvasObjectsModel(btnUpLine, true);
      var canvasObjectsModel = new CanvasObjectsModel(btnDownLine, true);
      
      // ONCLICK BOTON UP/DOWN LINES PLAY FUNCTION ----------------------------------------------
      

      // ONCLICK BOTON SPIN FUNCTION -----------------------------------------------------------
      canvas.on('mouse:down', function(el) {
          var balanceStart = canvasModel.get('balanceStart');
          var userBet      = canvasModel.get('userBet');
          var userCoins   = canvasModel.get('userCoins');
          var lineBet    = canvasModel.get('lineBet');
          var userBet = userCoins*lineBet;
          if (el.target) {
              //console.log(el.target);
              /*
              if (el.target.name=='btnUpBet' && userCoins<10) {
                  that.botonOptions('btnUpBet', 'userCoins', 'lineBet');
              }
              */
              // ONCLICK BOTON UP/DOWN COINS PLAY FUNCTION ----------------------------------------------
              if (el.target.name=='btnUpBet' && userCoins<10) {
                canvasModel.set('userCoins', userCoins+1);
                var lineBet = canvasModel.get('lineBet');
                var userCoins = canvasModel.get('userCoins');
                var userBet = userCoins*lineBet;
                userCoinsText.set({text:'COINS: '+userCoins});
                canvasModel.set('userBet', userBet);
                userBetText.set({text:'BET: '+userBet});
              }
              if (el.target.name=='btnDownBet' && userCoins>1) {
                canvasModel.set('userCoins', userCoins-1);
                var lineBet = canvasModel.get('lineBet');
                var userCoins = canvasModel.get('userCoins');
                var userBet = userCoins*lineBet;
                userCoinsText.set({text:'COINS: '+userCoins});
                canvasModel.set('userBet', userBet);
                userBetText.set({text:'BET: '+userBet});
              }
              
              // ONCLICK BOTON UP/DOWN LINES PLAY FUNCTION ----------------------------------------------
              if (el.target.name=='btnUpLine' && lineBet<20) {
                canvasModel.set('lineBet', lineBet+1);
                var lineBet = canvasModel.get('lineBet');
                var userCoins = canvasModel.get('userCoins');
                var userBet = userCoins*lineBet;
                lineBetText.set({text:'LINES: '+lineBet});
                canvasModel.set('userBet', userBet);
                userBetText.set({text:'BET: '+userBet});
              } 
              if (el.target.name=='btnDownLine' && lineBet>1) {
                canvasModel.set('lineBet', lineBet-1);
                var lineBet = canvasModel.get('lineBet');
                var userCoins = canvasModel.get('userCoins');
                var userBet = userCoins*lineBet;
                lineBetText.set({text:'LINES: '+lineBet});
                canvasModel.set('userBet', userBet);
                userBetText.set({text:'BET: '+userBet});
              }
              
              // ONCLICK BOTON SPIN PLAYS FUNCTION ----------------------------------------------
              if (el.target.name=='btnSpin'){

                // ANIMATION RAILS----------------------------------------------------------------
                railObject.animate('top', railObject.getTop() === 400 ? '100' : '400', { 
                    duration: 500,
                    onChange: canvas.renderAll.bind(canvas),
                    easing: fabric.util.ease.easeInElastic
                    //onComplete: animate
                    /*
                    Notice fabric.util.ease.easeOutBounce as an easing option. 
                    Other notable ones include easeInCubic, easeOutCubic, easeInElastic, easeOutElastic, easeInBounce, easeOutBounce, easeOutExpo.
                    */
                });

                // WIN/LOSE PLAY AND CHANGE BALANCE -----------------------------------------------
                var randomNumber = fabric.util.getRandomInt(0, 1);
                if (randomNumber==1){
                  canvasModel.set('balanceStart', balanceStart+userBet);
                  console.log('Ganaste:'+userBet+'!!! BALANCE: '+canvasModel.attributes.balanceStart);
                } else {
                  canvasModel.set('balanceStart', balanceStart-userBet);
                  console.log('Perdiste:'+userBet+' Intentalo de nuevo!!! BALANCE: '+canvasModel.attributes.balanceStart);
                }
                var balanceStart = canvasModel.get('balanceStart');
                balanceText.set({text:'BALANCE: '+balanceStart+' Coins'});
              }

              canvas.renderAll();
          }
      });

      // FUNCTION DETECT OVER/OUT FOR ALL OBJECTS)------------------------------------------------
      canvas.findTarget = (function(originalFn) {
        return function() {
          var target = originalFn.apply(this, arguments);
          if (target) {
            if (this._hoveredTarget !== target) {
              canvas.fire('object:over', { target: target });
              if (this._hoveredTarget) {
                canvas.fire('object:out', { target: this._hoveredTarget });
              }
              this._hoveredTarget = target;
            }
          }
          else if (this._hoveredTarget) {
            canvas.fire('object:out', { target: this._hoveredTarget });
            this._hoveredTarget = null;
          }
          return target;
        };
      })(canvas.findTarget);

      // ON OVER/OUT BOTON SPIN CHANGE COLOR ---------------------------------------------------------
      canvas.on('object:over', function(e) {
        if (e.target) {
          if (e.target.name=='btnSpin'){
            btnSpin.set({fill:'#f00'});
            canvas.renderAll();
          }
        }
      });

      canvas.on('object:out', function(e) {
        btnSpin.set({fill:'#f55'});
        canvas.renderAll();
      });
      
    },
    botonOptions: function(object, change, option){
        var that = this;
        var model = new CanvasModel();
        model.set('"'+change+'"', change+1);
        var option= model.get('"'+option+'"');
        var change = model.get('"'+change+'"');
        var userBet = change*option;
        var changeText = change+'Text';
        //console.log(changeText);
        changeText.set({text:'COINS: '+change});
        model.set('userBet', userBet);
        userBetText.set({text:'BET: '+userBet});

    }

  });

  return MainView;
  
});