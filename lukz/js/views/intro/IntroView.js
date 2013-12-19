define([
  'jquery',
  'underscore',
  'backbone',
  'html5sql',
  'models/inicio/InicioJuegoModel',
  'models/intro/introModel',
  'text!templates/intro/introView.html'  
], function($, _, Backbone, Html5sql, InicioJuegoModel, introModel, introView){

  var IntroView = Backbone.View.extend({
    el: $("#page"),

    initialize: function(){
      console.log("IntroView fue inicializado");

      //este despues se va a comunicar con el wrapper service
      window.inicioJuegoModel = new InicioJuegoModel(); 
      window.aud = new introModel();      
      window.imgCanvas = new introModel();    

      //creo el contenedor para la base de datos
      //html5sql.openDatabase("imgListLoad", "Demo Database", 5*1024*1024);

      window.db = openDatabase('imagesList', '1.0', 'Database of images', 2 * 1024 * 1024);
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
      console.log(imgCanvas);
      $('#loader').hide();      

      //Secuencia para la carga en la base de datos localstorage --------------------------
      /*html5sql.process(
         [        
          "CREATE TABLE IF NOT EXISTS imagesList (id INTEGER PRIMARY KEY AUTOINCREMENT, url VARCHAR(255))",
          "INSERT INTO imagesList VALUES ('1','http://blogs.transparent.com/arabic/files/2013/04/new.jpg')",
          "INSERT INTO imagesList VALUES ('2','http://desktopwallpapersonline.info/Wallpapers%20HD/Full%20HD%20Wallpapers%20(19).jpg')",
          "INSERT INTO imagesList VALUES ('3','http://iwritealot.com/wp-content/uploads/2010/06/Wallpaper-1080p-27.jpg')",
          "INSERT INTO imagesList VALUES ('4','http://images2.fanpop.com/images/photos/7800000/Nature-Full-HD-Wallpaper-national-geographic-7822268-1920-1080.jpg')",
          "INSERT INTO imagesList VALUES ('5','http://www.rinconeame.net/wp-content/gallery/paisajes/imagenes%20en%20HD%20x%20scorpion/Nature-Full-HD-Wallpaper-national-geographic-7822272-1920-1080.jpg')",
          "INSERT INTO imagesList VALUES ('6','http://theneglectedratio.files.wordpress.com/2012/05/wallpaper-desktop-nature-hd.jpg')"                    
         ],
         function(){
             console.log("Success, urls cargadas en localStorage...");
         },
         function(error, statement){
             console.error("Error: " + error.message + " when processing " + statement);
         }        
      );*/

      db.transaction(function (tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS imagesList (id INTEGER PRIMARY KEY AUTOINCREMENT, url VARCHAR(255))');
        tx.executeSql('INSERT INTO imagesList VALUES ("1","http://blogs.transparent.com/arabic/files/2013/04/new.jpg")');
        tx.executeSql('INSERT INTO imagesList VALUES ("2","http://desktopwallpapersonline.info/Wallpapers%20HD/Full%20HD%20Wallpapers%20(19).jpg")',[], function(){console.log('succes');}, function(){console.log('error');});
        tx.executeSql('INSERT INTO imagesList VALUES ("3","http://iwritealot.com/wp-content/uploads/2010/06/Wallpaper-1080p-27.jpg")');
        tx.executeSql('INSERT INTO imagesList VALUES ("4","http://images2.fanpop.com/images/photos/7800000/Nature-Full-HD-Wallpaper-national-geographic-7822268-1920-1080.jpg")');
        tx.executeSql('INSERT INTO imagesList VALUES ("5","http://www.rinconeame.net/wp-content/gallery/paisajes/imagenes%20en%20HD%20x%20scorpion/Nature-Full-HD-Wallpaper-national-geographic-7822272-1920-1080.jpg")');
        tx.executeSql('INSERT INTO imagesList VALUES ("6","http://theneglectedratio.files.wordpress.com/2012/05/wallpaper-desktop-nature-hd.jpg")');
      });

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

      var imagenesLoaded = true; 
      
      $.each( imagesList, function( i, l ){           
        imgCanvas.imgCanvasModel[i] = new Image();
        imgCanvas.imgCanvasModel[i].src = imagesList[i];
        imgCanvas.imgCanvasModel[i].onload = function() {                                
          console.log("succes on: "+i);            
        }
        imgCanvas.imgCanvasModel[i].onerror = function() {
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
