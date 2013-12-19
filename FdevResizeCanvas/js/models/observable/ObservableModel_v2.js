define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone) {

  var ObservableModel_v2 = Backbone.Model.extend({
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

  return ObservableModel_v2;

});