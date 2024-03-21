sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function (Controller) {
    "use strict";

    return Controller.extend("project1.controller.View2", {
        onInit: function () {
            const myRoute = this.getOwnerComponent().getRouter().getRoute("View2");
            myRoute.attachPatternMatched(this.onMyRoutePatternMatched, this);
        },
        onMyRoutePatternMatched: function () {
            
        },
        onBack: function () {
            this.getOwnerComponent().getRouter().navTo("View1");
        }
    });
});
