define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone) {

  var ObservableModel = Backbone.Model.extend({
    defaults: {
        status: 'constructed',
    },
    initialize: function() {
    },

    getStatus: function() {
        return this.get('status');
    },

    changeStatus: function(change){
        this.set('status', change);
    }
  
  });

  return ObservableModel;

});