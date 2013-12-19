define([
  'jquery',
  'underscore',
  'backbone',
  'fabric',
  'models/appManager/appModel/MainSlotModel',
  'models/appManager/appModel/slotModel/SlotModel'
], function($, _, Backbone, Fabric, MainSlotModel, SlotModel){

	var modelManager = Backbone.Collection.extend({

		initialize: function(){
			//var modelManager = Backbone.Collection.extend();
			var slotModel = new SlotModel();

			this.on("change:callfreeSpin", function(model){
			    console.log("Changed my mind! I should " + model.get('callfreeSpin'));			    
			});		
		},

	});

	return modelManager;

});