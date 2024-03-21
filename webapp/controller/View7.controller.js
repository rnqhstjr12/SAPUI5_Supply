sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("project1.controller.View7", {
        onInit: function () {
            const myRoute = this.getOwnerComponent().getRouter().getRoute("View7");
            myRoute.attachPatternMatched(this.onMyRoutePatternMatched, this);
        },
        onMyRoutePatternMatched: function () {

        },
        onSearch: function () {
            let facData = [
                {
                    number : '21810-25020', name : 'BRKT ASSY-ENGINE NTG',
                    car : 'DDuBug', option : 'S 중포장(SIM.대상)', submitCheck : '일반사양',
                    requestNum : 'D005T20230200004', comment : '중포장비 일괄치환',
                    manager : '김효수', progress : 'C 업체접수',
                    cancelComent : '', optionNum : '', ok : ''
                }
            ];

            this.getView().setModel(new JSONModel(facData), "facData");
        },
        onRefresh: function () {
            
        },
        onDetail: function () {
            let data;
            this.getOwnerComponent().getRouter().navTo("View8");
        }
    });
});
