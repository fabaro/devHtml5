define([
  'jquery',
  'underscore',
  'backbone',
  'html5sql',
  'models/inicio/InicioJuegoModel',
  'models/intro/introModel',
  'views/intro/IntroView',
  'text!templates/intro/introView.html',
  'text!templates/inicio/inicioJuegoView.html'
], function($, _, Backbone, Html5sql, inicioJuegoModel, introModel, IntroView, introView, inicioJuegoView){

  var InicioJuegoView = Backbone.View.extend({
    el: $("#page"),

    initialize: function(){
    	console.log("InicioJuegoView fue inicializado");

      //este despues se va a comunicar con el wrapper service
      window.inicioJuegoModel = new inicioJuegoModel(); 
      window.aud = new introModel();      
      window.imgCanvas = new introModel();

      console.log(inicioJuegoModel);
      console.log(aud);
    },

    events: {
		'click #mostrar' : 'mostrar',
		'click #pause' : 'pause'
	},

	mostrar: function(e, aud, imgCanvas) {

		console.log('click en mostrar');
		console.log(e);
    console.log(aud);
    console.log(imgCanvas);

    html5sql.process(
         [  
          //"DROP TABLE table2",
          "SELECT * FROM  imagesList "          
          //"DROP TABLE table1",                 
         ],
         function(){
             console.log("Success, urls cargadas en localStorage...");
             console.log(sql);
         },
         function(error, statement){
             console.error("Error: " + error.message + " when processing " + statement);
         }        
      );

		/*e.preventDefault(); 
    aud.play();
    audioPlayPause = true;
    inicioJuegoModel.set('audioPlayPause', audioPlayPause);

    $.each( imgCanvas, function( k, m ){           
      //Creo el canvas para darle el contexto de la imagen
      canvasIntroContent.append('<canvas id="canvasImgContent'+k+'" height="'+(contentHeight/5)+'" width="'+contentWidth/2+'" style="display:block; float: left;"></canvas>');
      var c=document.getElementById("canvasImgContent"+k+"");
      var ctx=c.getContext("2d");
      ctx.drawImage(imgCanvas[k],10,10);
      console.log(imgCanvas[k]);            
    });

    var canvasImagesCreated = true;          
    inicioJuegoModel.set('canvasImagesCreated', canvasImagesCreated);
    */
    console.log(inicioJuegoModel);
	},

	pause: function() {
		console.log("click en pausa");
    aud.pause()
    audioPlayPause = false;
    inicioJuegoModel.set('audioPlayPause', audioPlayPause);
	},

    render: function(){ 		
  		this.$el.html(inicioJuegoView);
    }
  });

	return InicioJuegoView;
});