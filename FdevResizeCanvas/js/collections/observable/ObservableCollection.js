define([
  'jquery',
  'underscore',
  'backbone',
  'models/observable/ObservableModel'
], function($, _, Backbone, ObservableModel){

  var ObservableCollection = Backbone.Collection.extend({
      
    model: ObservableModel,
    initialize: function() {

    }

  });

  return ObservableCollection;

});