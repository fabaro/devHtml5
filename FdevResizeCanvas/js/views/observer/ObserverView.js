define([
  'jquery',
  'underscore',
  'backbone',
  'models/observable/ObservableModel',
  'models/observable/ObserverModel',
  'text!templates/observer/observerTemplate.html'
], function($, _, Backbone, ObservableModel, ObserverModel, observerTemplate){

  var ObserverView = Backbone.View.extend({
    el: $("#page"),
    events: {
      'click .status': 'callChangeStatus',
    },
    initialize: function(){
       
      window.observer = new ObserverModel();
      window.observable = new ObservableModel();
      observer.subscribeTo('status', observable.attributes.status);
      
    },
    
    render: function() {
      observable.on('change', function(){
        observer.changeSuscribers('ok');
        observer.doSomethingIfOk();
      });

      this.$el.html(observerTemplate);
      return this;
    },

    callChangeStatus: function(){
      observable.changeStatus('ok');
      
    }

  });

  return ObserverView;
  
});