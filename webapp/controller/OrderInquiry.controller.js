sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("project1.controller.OrderInquiry", {
        onInit: function () {
            const myRoute = this.getOwnerComponent().getRouter().getRoute("OrderInquiry");
            myRoute.attachPatternMatched(this.onMyRoutePatternMatched, this);
        },
        onMyRoutePatternMatched: function () {
            let items = [
                { 
                    'HSC VIN' : 'EL74DF16DO20\nKMHLR4DFXRU710274', 
                    'Status' : '-', 
                    'Model Year' : 2024, 
                    'Description' : 'Ela 4Dr DCT\nFWD T-GDI\nN-Line Ult', 
                    'Ext.' : 'A2B', 
                    'Int.' : 'NNB',
                    'Trim' : 'O', 
                    'Order Type' : 'N4', 
                    'Order No' : '0011546071', 
                    'AlloCation Type': 2, 
                    'Order Date': '2023-12-18\n2023-12-18', 
                    'Location': 130, 
                    'Dealership ETA': '2024-03-06',
                },
                { 
                    'HSC VIN' : 'EL74DF16I3AA\nKMHLN4DJ7RU099586', 
                    'Status' : '-', 
                    'Model Year' : 2024, 
                    'Description' : 'Ela 4Dr DCT\nFWD HEV\nLux HEV', 
                    'Ext.' : 'PE2', 
                    'Int.' : 'NNB',
                    'Trim' : '3', 
                    'Order Type' : 'N3', 
                    'Order No' : '0011548828', 
                    'AlloCation Type': 2, 
                    'Order Date': '2023-12-28\n2023-12-28', 
                    'Location': 130, 
                    'Dealership ETA': '2024-03-14',
                },
            
            ];

            this.getView().setModel(new JSONModel(items), "mainModel");
        },
        onInquiry: function () {

        },
        onChange: function () {

        },
        onExcel: function () {

        },
        handleClick: function () {
            
        }
    });
});
