define([
  'jquery',
  'underscore',
  'backbone',
  'models/observable/ObservableModel_v2',
  'models/observable/ObserverModel',
  'text!templates/observer/observerTemplate_v2.html'
], function($, _, Backbone, ObservableModel_v2, ObserverModel, observerTemplate_v2){

  var ObserverView_v2 = Backbone.View.extend({
    el: $("#page"),
    events: {
      'click .status': 'callChangeStatus',
    },
    initialize: function(){
       
      window.observer = new ObserverModel();
      window.observable = new ObservableModel_v2();
      observer.subscribeTo('status', observable.attributes.status);
      
    },
    
    render: function() {
      observable.on('change', function(){
        observer.changeSuscribers('ok');
        observer.doSomethingIfOk();
      });

      this.$el.html(observerTemplate_v2);
      return this;
    },

    callChangeStatus: function(){
      observable.changeStatus('ok');
      
    }

  });

  return ObserverView_v2;
  
});