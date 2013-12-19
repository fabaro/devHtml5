define([
  'jquery',
  'underscore',
  'backbone',
  'models/inicio/InicioJuegoModel',
  'views/intro/IntroView',
  'text!templates/intro/introView.html',
  'text!templates/inicio/inicioJuegoView.html'
], function($, _, Backbone, inicioJuegoModel, IntroView, introView, inicioJuegoView){

  var InicioJuegoView = Backbone.View.extend({
    el: $("#page"),

    initialize: function(){
    	console.log("InicioJuegoView fue inicializado");
    },

    events: {
		'click #mostrar' : 'mostrar',
		'click #pause' : 'pause'
	},

	mostrar: function(e) {

		console.log('click en mostrar');

		console.log(IntroView());

		e.preventDefault(); 
      aud.play();
      audioPlayPause = true;
      inicioJuegoModel.set('audioPlayPause', audioPlayPause);            
        
        console.log("click");

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

      console.log(inicioJuegoModel);
	},

	pause: function() {
		console.log("click en pausa");
	},

    render: function(){
    	
    	alert("entro al render");

    	$(function(){
    		$('#mostrar').click(function(e){
	          e.preventDefault(); 
	          aud.play();
	          audioPlayPause = true;
	          inicioJuegoModel.set('audioPlayPause', audioPlayPause);            
	            
	            console.log("click");

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

	          console.log(inicioJuegoModel);
	        });

	        $('#pause').click(function(){
	          aud.pause()
	          audioPlayPause = false;
	          inicioJuegoModel.set('audioPlayPause', audioPlayPause);                  
	        });
	    })		
  		
  		this.$el.html(inicioJuegoView);
    }
  });

	return InicioJuegoView;
});