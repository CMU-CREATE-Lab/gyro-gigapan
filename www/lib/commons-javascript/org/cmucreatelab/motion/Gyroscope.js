//======================================================================================================================
// A utility class for working with a device's gyroscope.
//
// Supported events:
// * rotation(rotations, deltas)
//
// Dependencies:
// * org.cmucreatelab.events.EventManager
//
// Author: Chris Bartley (bartley@cmu.edu)
//======================================================================================================================

//======================================================================================================================
// VERIFY NAMESPACE
//======================================================================================================================
// Create the global symbol "org" if it doesn't exist.  Throw an error if it does exist but is not an object.
var org;
if (!org) {
   org = {};
}
else {
   if (typeof org != "object") {
      var orgExistsMessage = "Error: failed to create org namespace: org already exists and is not an object";
      alert(orgExistsMessage);
      throw new Error(orgExistsMessage);
   }
}

// Repeat the creation and type-checking for the next level
if (!org.cmucreatelab) {
   org.cmucreatelab = {};
}
else {
   if (typeof org.cmucreatelab != "object") {
      var orgCmucreatelabExistsMessage = "Error: failed to create org.cmucreatelab namespace: org.cmucreatelab already exists and is not an object";
      alert(orgCmucreatelabExistsMessage);
      throw new Error(orgCmucreatelabExistsMessage);
   }
}

// Repeat the creation and type-checking for the next level
if (!org.cmucreatelab.motion) {
   org.cmucreatelab.motion = {};
}
else {
   if (typeof org.cmucreatelab.motion != "object") {
      var orgCmucreatelabUtilExistsMessage = "Error: failed to create org.cmucreatelab.motion namespace: org.cmucreatelab.motion already exists and is not an object";
      alert(orgCmucreatelabUtilExistsMessage);
      throw new Error(orgCmucreatelabUtilExistsMessage);
   }
}
//======================================================================================================================

//======================================================================================================================
// DEPENDECIES
//======================================================================================================================
if (!org.cmucreatelab.events.EventManager) {
   var noEventManagerMsg = "The org.cmucreatelab.events.EventManager library is required by org.cmucreatelab.motion.Gyroscope.js";
   alert(noEventManagerMsg);
   throw new Error(noEventManagerMsg);
}
//======================================================================================================================

//======================================================================================================================
// CODE
//======================================================================================================================
(function() {
   org.cmucreatelab.motion.Gyroscope = function() {

      var eventManager = new org.cmucreatelab.events.EventManager();
      var isGryoSupported = false;

      var previousRotations = {alpha : 0, beta : 0, gamma : 0};

      (function() {
         if (typeof window['DeviceMotionEvent'] !== 'undefined') {
            window.ondeviceorientation = function(event) {
               isGryoSupported = true;

               if (eventManager.hasListenersFor('rotation')) {
                  var rotations = {
                     alpha : event['alpha'],
                     beta : event['beta'],
                     gamma : event['gamma']
                  };
                  var deltas = {
                     alpha : previousRotations['alpha'] == null ? 0 : event['alpha'] - previousRotations['alpha'],
                     beta: previousRotations['beta'] == null ? 0 : event['beta'] - previousRotations['beta'],
                     gamma: previousRotations['gamma'] == null ? 0 : event['gamma'] - previousRotations['gamma']
                  };
                  eventManager.publishEvent('rotation', rotations, deltas);
                  previousRotations = rotations;
               }
            }
         }
      })();

      /**
       * Returns whether the gyroscope is supported.  You'll most likely need to call this with some delay after
       * the instance is constructed because support is determined by whether the ondeviceorientation event
       * listener is called.
       *
       * @returns {boolean} true if supported, false otherwise
       */
      this.isSupported = function() {
         return isGryoSupported;
      };

      this.addEventListener = eventManager.addEventListener;
      this.removeEventListener = eventManager.removeEventListener;
   }
})();