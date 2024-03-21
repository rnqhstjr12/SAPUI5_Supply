sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("project1.controller.View1", {
            onInit: function () {
            },
            onView2: function () {
                this.getView().getController().getOwnerComponent().getRouter().navTo("View2");
            },
            onView3: function () {
                this.getView().getController().getOwnerComponent().getRouter().navTo("View3");
            },
            onView4: function () {
                this.getView().getController().getOwnerComponent().getRouter().navTo("View4");
            },
            onView6: function () {
                this.getView().getController().getOwnerComponent().getRouter().navTo("View6");
            },
            onStudy1: function () {
                this.getView().getController().getOwnerComponent().getRouter().navTo("Study1");
            },
            onView7: function () {
                this.getView().getController().getOwnerComponent().getRouter().navTo("View7");
            },
        });
    });
