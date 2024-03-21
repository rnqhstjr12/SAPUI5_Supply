sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("project1.controller.Study1", {
        onInit: function () {
            const myRoute = this.getOwnerComponent().getRouter().getRoute("Study1");
            myRoute.attachPatternMatched(this.onMyRoutePatternMatched, this);
        },
        onMyRoutePatternMatched: function () {
            let items = [
                { 
                    data1 : '1', data2 : '1', data3 : 1, data4 : 1, data5 : 1, data6 : 1,
                    data7 : 1, data8 : 1, data9 : 1, data10: 1, data11: 1, data12: 1
                },
                { 
                    data1 : '2', data2 : '2', data3 : 2, data4 : 2, data5 : 2, data6 : 2,
                    data7 : 2, data8 : 2, data9 : 2, data10: 2, data11: 2, data12: 2
                },
                { 
                    data1 : '3', data2 : '3', data3 : 3, data4 : 3, data5 : 3, data6 : 3,
                    data7 : 3, data8 : 3, data9 : 3, data10: 3, data11: 3, data12: 3
                },
                { 
                    data1 : '4', data2 : '4', data3 : 4, data4 : 4, data5 : 4, data6 : 4,
                    data7 : 4, data8 : 4, data9 : 4, data10: 4, data11: 4, data12: 4
                },
                { 
                    data1 : '5', data2 : '5', data3 : 5, data4 : 5, data5 : 5, data6 : 5,
                    data7 : 5, data8 : 5, data9 : 5, data10: 5, data11: 5, data12: 5
                },
                { 
                    data1 : '6', data2 : '6', data3 : 6, data4 : 6, data5 : 6, data6 : 6,
                    data7 : 6, data8 : 6, data9 : 6, data10: 6, data11: 6, data12: 6
                }
            ];

            this.getView().setModel(new JSONModel(items), "mainTrimModel");
            let aTotalModel = JSON.parse(JSON.stringify(this.getView().getModel("mainTrimModel").getData()));
            let iData3 = 0, iData4 = 0, iData5 = 0, iData6 = 0, iData7 = 0, iData8 = 0, iData9 = 0, iData10 = 0, iData11 = 0, iData12 = 0;
            console.log(this.getView().getModel("mainTrimModel").getData().length);
            for (let i = 0; i < this.getView().getModel("mainTrimModel").getData().length; i++) {
                iData3 += this.getView().getModel("mainTrimModel").getData()[i].data3;
                iData4 += this.getView().getModel("mainTrimModel").getData()[i].data4;
                iData5 += this.getView().getModel("mainTrimModel").getData()[i].data5;
                iData6 += this.getView().getModel("mainTrimModel").getData()[i].data6;
                iData7 += this.getView().getModel("mainTrimModel").getData()[i].data7;
                iData8 += this.getView().getModel("mainTrimModel").getData()[i].data8;
                iData9 += this.getView().getModel("mainTrimModel").getData()[i].data9;
                iData10 += this.getView().getModel("mainTrimModel").getData()[i].data10;
                iData11 += this.getView().getModel("mainTrimModel").getData()[i].data11;
                iData12 += this.getView().getModel("mainTrimModel").getData()[i].data12;
                console.log(iData3);
            }

            aTotalModel.push({ 
                data1 : 'Total', data2 : 'Total', data3: iData3, data4: iData4, data5: iData5, data6: iData6, data7: iData7, data8: iData8, data9: iData9, data10: iData10, data11: iData11, data12: iData12 
            });

            this.getView().setModel(new JSONModel(aTotalModel), "TrimModel");
            console.log(this.getView().getModel("TrimModel").getData());
        },
        onBack: function () {
            this.getOwnerComponent().getRouter().navTo("View1");
        }
    });
});
