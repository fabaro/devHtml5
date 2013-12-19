define([
  'underscore',
  'backbone',
  'fabric'
], function(_, Backbone, Fabric) {

  var CanvasObjectsModel = Backbone.Model.extend({
  	// FUNCTION CONTROL OBJECT IN CANVAS
    initialize: function(object, selector){
          object.hasControls = object.hasBorders = false;
          
          if (selector!=true){
          	object.selectable = false;
            object.hasRotatingPoint = object.lockRotation = true;
    		    object.lockMovementY = object.lockMovementX = true;
    		    object.lockScalingX = object.lockScalingY = true;

          } else {
          	object.selectable = true;
  	      	object.hasRotatingPoint = object.lockRotation = true;
  	      	object.lockMovementY = object.lockMovementX = true;
  	      	object.lockScalingX = object.lockScalingY = true;
  	      	object.hoverCursor = 'pointer';
          }
    }

  });
  
  return CanvasObjectsModel;

});