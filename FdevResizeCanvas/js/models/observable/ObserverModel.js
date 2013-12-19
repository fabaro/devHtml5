define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone) {

  var ObserverModel = Backbone.Model.extend({
    defaults: {
      hayChange: false,
    },
    initialize: function() {
      this.subscriptions = [];
    },

    subscribeTo: function(status, observable) {
        this.subscriptions.push({status:observable});
        console.log('observer status = '+this.subscriptions[0].status);
    },

    unsubscribeFrom: function(observable) {
        var i = 0;
        var len = this.subscriptions.length;
       
        for (; i < len; i++) {
            if (this.subscriptions[i] === observable) {
                this.subscriptions.splice(i, 1);
                return;
            }
        }        
    },

    doSomethingIfOk: function() {
        var i = 0;
        var len = this.subscriptions.length;
       
        for (; i < len; i++) {
              console.log('observer '+i+' tiene estatus = '+this.subscriptions[i].status);
                
              if (this.subscriptions[i].status === "ok") {
                this.set('hayChange', true);
                console.log('observer '+i+' cambio variable --hayChange = '+this.attributes.hayChange);

              }
        }
    },

    changeSuscribers: function(change){
      this.subscriptions.pop();
      //this.subscriptions.push({status:change});
      this.subscribeTo('status', change);
    }

  
  });

  return ObserverModel;

});

