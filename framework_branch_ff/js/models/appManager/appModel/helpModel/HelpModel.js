define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone){

  var HelpModel = Backbone.Model.extend({
    
    open: function() {
      console.log("se abrio HelpModel");
    },

    close: function(){
      console.log("se cerro HelpModel");
    },
    pause: function(){
      console.log("se hizo pause HelpModel");
    },
    resume: function(){
      console.log("se hizo resume HelpModel");
    }

  });

  return HelpModel;

});