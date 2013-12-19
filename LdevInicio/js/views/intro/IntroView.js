define([
  'jquery',
  'underscore',
  'backbone',
  'models/inicio/InicioJuegoModel',
  'models/intro/introModel',
  'text!templates/intro/introView.html'
], function($, _, Backbone, InicioJuegoModel, introModel, introView){

  var IntroView = Backbone.View.extend({
    el: $("#page"),

    initialize: function(){
      console.log("IntroView fue inicializado");
      
      //este despues se va a comunicar con el wrapper service
      window.inicioJuegoModel = new InicioJuegoModel();

      window.aud = new introModel();
      console.log(aud.audModel);

      window.imgCanvas = new introModel();
        console.log(imgCanvas.toJSON());
    },

    render: function() {
      $('#loader').hide();      

      //Obtengo las medidas del contenedor------------------------------------------------
      var contentWidth = this.$el.width();
      var contentHeight = this.$el.height();      
      //Obtengo el contexto 
      var canvasIntroContent = this.$el;

      //Seteo las medidas en el modelo que se las pasa al wrapper service      
      inicioJuegoModel.set('contentWidth',contentWidth);
      inicioJuegoModel.set('contentHeight',contentHeight);
      inicioJuegoModel.set('canvasIntroContent', canvasIntroContent);      

      // Array de imagenes para cargar-----------------------------------------------------
      var imagesList = [
          'http://blogs.transparent.com/arabic/files/2013/04/new.jpg',
          'http://desktopwallpapersonline.info/Wallpapers%20HD/Full%20HD%20Wallpapers%20(19).jpg',
          'http://iwritealot.com/wp-content/uploads/2010/06/Wallpaper-1080p-27.jpg',
          'http://images2.fanpop.com/images/photos/7800000/Nature-Full-HD-Wallpaper-national-geographic-7822268-1920-1080.jpg',
          'http://www.rinconeame.net/wp-content/gallery/paisajes/imagenes%20en%20HD%20x%20scorpion/Nature-Full-HD-Wallpaper-national-geographic-7822272-1920-1080.jpg',
          'http://theneglectedratio.files.wordpress.com/2012/05/wallpaper-desktop-nature-hd.jpg'
      ];      
      
      //Hago la precarga------------------------------------------------------------------
      $('#loader').show();
      this.preCargaAudio(aud);
      this.preCargaImagenes(imgCanvas, imagesList);
      $('#loader').hide();

      this.$el.html(introView);

      //Termina de cargar la intro y va a la pagina de inicio      
      //this.navigate("inicio", {trigger: true, replace: true});
    },

    //Precarga del audio-----------------------------------------------------------------
    preCargaAudio: function(aud){      
      var loaded = false;                      
      aud.audModel.addEventListener('loadeddata', function() 
      {
          loaded = true;           
          console.log("mp3 cargado");
          inicioJuegoModel.set('audioMp3Loaded', loaded);
      }, false);         
      aud.audModel.addEventListener('error' , function() 
      {
          alert('error loading audio');
           inicioJuegoModel.set('audioMp3Loaded', loaded);
      }, false);         
      aud.audModel.src = 'http://server11.fulltono.com/047dd428-5000-4651-a383-671aaceecc35-738944.mp3';       
    },

    //Precarga de las imagenes del array-------------------------------------------------
    preCargaImagenes: function(imgCanvas, imagesList){        
      
      //var imgCanvas = new introModel();
      //console.log(imgCanvas.toJSON());

      console.log(imgCanvas, imagesList);

      var imagenesLoaded = true; 
      
      $.each( imagesList, function( i, l ){           
        imgCanvas[i] = new Image();
        imgCanvas[i].src = imagesList[i];
        imgCanvas[i].onload = function() {                                
          console.log("succes on: "+i);            
        }
        imgCanvas[i].onerror = function() {
          console.log("error on: "+i);
          imagenesLoaded = false;
        }
      });
      inicioJuegoModel.set('imagenesLoaded', imagenesLoaded);       
             
      return imgCanvas;
    } 

  });

  return IntroView;
  
});
