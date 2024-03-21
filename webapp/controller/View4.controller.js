sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("project1.controller.View3", {
        onInit: function () {
            const myRoute = this.getOwnerComponent().getRouter().getRoute("View4");
            myRoute.attachPatternMatched(this.onMyRoutePatternMatched, this);
        },
        onMyRoutePatternMatched: function () {
            let card1 = new JSONModel({
                items : [
                    { first : "판매 오더 처리 알람", sec : "판매 오더 생성에 따른...", thd}
                ]
            })
        },
        onBack: function () {
            this.getOwnerComponent().getRouter().navTo("View1");
        }
    });
});
