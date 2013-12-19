// Filename: app.js
define([
  'jquery', 
  'underscore', 
  'backbone',
  'html5sql',
  'router', // Request router.js
], function($, _, Backbone, Html5sql, Router){
  var initialize = function(){
    // Pass in our Router module and call it's initialize function
    Router.initialize();
  };

  return { 
    initialize: initialize
  };
});
