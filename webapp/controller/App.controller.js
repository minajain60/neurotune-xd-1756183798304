sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/core/UIComponent"
], function (Controller, UIComponent) {
  "use strict";

  /**
   * @name converted.transactionsoverviewview.controller.App
   * @class This is the main application controller
   * @extends sap.ui.core.mvc.Controller
   */
  return Controller.extend("converted.transactionsoverviewview.controller.App", {

    /**
     * Called when the app controller is initialized.
     * @public
     */
    onInit: function () {
      // Log initialization message
      console.log("App controller initialized");

      // Get the router instance
      var oRouter = UIComponent.getRouterFor(this);

      // Check if the router is available
      if (oRouter) {
        // Log successful router retrieval
        console.log("Router found, initializing navigation");

        // Attach a handler for bypassed routes (routes that don't match any defined route)
        oRouter.attachBypassed(function (oEvent) {
          // Log the bypassed route
          console.warn("Route bypassed:", oEvent.getParameter("hash"));
        });

        // Check if there is no hash or the hash is empty, then navigate to the main route
        if (!window.location.hash || window.location.hash === "#") {
          // Log navigation to the main route
          console.log("No hash found, navigating to main route");

          // Use a timeout to ensure the router is fully initialized before navigating
          setTimeout(function () {
            oRouter.navTo("main"); // Navigate to the main route
          }, 100);
        }
      } else {
        // Log an error if the router is not found
        console.error("Router not found in App controller");
      }
    }
  });
});
