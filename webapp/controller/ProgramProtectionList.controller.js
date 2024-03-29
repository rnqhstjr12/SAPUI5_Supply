sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], function (Controller, JSONModel, Fragment, Filter, FilterOperator) {
    "use strict";

    return Controller.extend("project1.controller.ProgramProtectionList", {
        onInit: function () {
            const myRoute = this.getOwnerComponent().getRouter().getRoute("ProgramProtectionList");
            myRoute.attachPatternMatched(this.onMyRoutePatternMatched, this);
        },
        onMyRoutePatternMatched: function () {
            this.onMainData();
        },
        onMainData: function () {
            let items = [
                {
                    'Status' : 'R',
                    'Protection No' : '1000297042',
                    'VIN' : 'KM8JBCAE2PUZ40191',
                    'HSC' : 'TU45AA25B200',
                    'Description' : 'Tuc CUV AT AWD GDI Pre -',
                    'Model Year' : '2023',
                    'Body Type' : 'S',
                    'Order Date' : '01/30/2023',
                    'Start Date' : '01/30/2023',
                    'End Date' : '05/31/2023',
                    'Customer Name' : 'Glenda Bruney',
                    'Detail' : {
                        'Hyundai Program' : '1000297042',
                        'VIN' : 'KM8JBCAE2PU240191',
                        'Model Year' : '2023',
                        "Exterior Colour" : 'A5G : A5G-AMAZON GREY',
                        'Sale Type' : '4',
                        'Car Line' : 'TU : Tucson',
                        'Body Type' : 'S : Truck CUV/SUV',
                        'Interior Colour' : 'NNB : NNB-BLACK',
                        'Sale Sub Type' : 'H',
                        'Order Date' : '01/30/2023',
                        'Finance Portal Deal' : '717611',
                        'Remark' : '',
                        'Protection Start' : '01/30/2023',
                        'Protection End' : '05/31/2023',
                        'First Name' : 'Glenda',
                        'Last Name' : 'Brundy',
                        'Company Name' : 'Hyundai',
                        'Address' : '78 Tesla Cres',
                        'City' : 'Holland Landing',
                        'Postal Code' : 'L9N 0T3',
                        'Title' : '0002 : Mr.',
                        'Language' : 'E',
                        'email' : 'glenda.bruney@yahoo.ca',
                        'Province' : 'ON : Ontario',
                        'Telephone' : '6474569606',
                        'Sex' : '1 : Male',
                        'Age Group' : '7 : Senior'
                    }
                }
            ];

            this.getView().setModel(new JSONModel(items), 'ProgramProtectionList');
        },
        onInquiry: function () {
            let oModel = this.getView().getModel('ProgramProtectionList');
            let vinValue = this.byId('VINInput').getValue();

            let searchData = oModel.getData().filter(function(item) {
                return item['VIN'].includes(vinValue);
            });

            console.log(searchData);
            this.getView().setModel(new JSONModel(searchData), 'InquiryList');
        },
        onCreate: function () {

        },
        onExcel: function () {

        },
        onECSearch: function () {

        },
        onDetail: function (oEvent) {
            let buttonRow = oEvent.getSource().getBindingContext('InquiryList').getProperty();

            this.getView().getController().getOwnerComponent().getRouter().navTo("ProgramProtectionDetail", {
                DetailData : encodeURIComponent(JSON.stringify(buttonRow.Detail))
            });
            // this.getView().getController().getOwnerComponent().getRouter().navTo("ProgramProtectionDetail");
        },
    });
});
