sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/export/Spreadsheet"
], function (Controller, JSONModel, Fragment, Filter, FilterOperator, Spreadsheet) {
    "use strict";

    return Controller.extend("project1.controller.DisplayDealerOrder", {
        onInit: function () {
            const myRoute = this.getOwnerComponent().getRouter().getRoute("DisplayDealerOrder");
            myRoute.attachPatternMatched(this.onMyRoutePatternMatched, this);
        },
        onMyRoutePatternMatched: function () {
            this.getView().setModel(new JSONModel([]),"state");
            let items = [
                { 
                    'Car Line' : 'Elantra', 
                    'Submitted' : {
                        'Dealer Order': 1,
                        'Supplemental': 0,
                    },
                    'Confirmed' : {
                        'Dealer Order': 1,
                        'Supplemental': 0,
                    },
                    'Cancelled' : {
                        'Dealer Order': 0,
                        'Supplemental': 0,
                    },
                    'Allocated' : {
                        'Dealer Order': 1,
                        'Supplemental': 0,
                    },
                    'Delivered' : {
                        'Dealer Order': 0,
                        'Supplemental': 0,
                    },
                    'Detail' : [
                        {
                            'Order' : '1000249021',
                            'Type' : 'Dealer Order',
                            'Model Year' : '2021',
                            'HSC' : 'EL74IF20A100',
                            'Description' : 'Ela 4Dr IVT FWD MPI Ess -',
                            'Exterior Colour' : 'SAW-ATLAS WHITE',
                            'Interior Colour' : 'NNB-BLACK',
                            'Status' : 'Factory Ordered',
                            'VIN' : '1',
                            'Qty' : 1
                        },
                        {
                            'Order' : '1000249021',
                            'Type' : 'Dealer Order',
                            'Model Year' : '2022',
                            'HSC' : 'EL74IF20A300',
                            'Description' : 'Ela 4Dr IVT FWD MPI Lux -',
                            'Exterior Colour' : 'A5G-AMAZON GREY',
                            'Interior Colour' : 'NNB-BLACK',
                            'Status' : 'Factory Ordered',
                            'VIN' : '1',
                            'Qty' : 1
                        },
                    ]
                },
                { 
                    'Car Line' : 'Kona', 
                    'Submitted' : {
                        'Dealer Order': 2,
                        'Supplemental': 0,
                    },
                    'Confirmed' : {
                        'Dealer Order': 2,
                        'Supplemental': 0,
                    },
                    'Cancelled' : {
                        'Dealer Order': 0,
                        'Supplemental': 0,
                    },
                    'Allocated' : {
                        'Dealer Order': 2,
                        'Supplemental': 0,
                    },
                    'Delivered' : {
                        'Dealer Order': 0,
                        'Supplemental': 0,
                    },
                    'Detail' : [
                        {
                            'Order' : '1000249021',
                            'Type' : 'Dealer Order',
                            'Model Year' : '2023',
                            'HSC' : 'EL74IF20A100',
                            'Description' : 'Ela 4Dr IVT FWD MPI Ess -',
                            'Exterior Colour' : 'SAW-ATLAS WHITE',
                            'Interior Colour' : 'NNB-BLACK',
                            'Status' : 'Factory Ordered',
                            'VIN' : '2',
                            'Qty' : 1
                        },
                        {
                            'Order' : '1000249021',
                            'Type' : 'Dealer Order',
                            'Model Year' : '2024',
                            'HSC' : 'EL74IF20A300',
                            'Description' : 'Ela 4Dr IVT FWD MPI Lux -',
                            'Exterior Colour' : 'A5G-AMAZON GREY',
                            'Interior Colour' : 'NNB-BLACK',
                            'Status' : 'Factory Ordered',
                            'VIN' : '2',
                            'Qty' : 1
                        },
                    ]
                },
            ];

            this.getView().setModel(new JSONModel(items), "mainCarModel");
            let aTotalCarModel = JSON.parse(JSON.stringify(this.getView().getModel("mainCarModel").getData()));
            let totalSub_DO = 0, 
            totalSub_Sup = 0, 
            totalCon_DO = 0, 
            totalCon_Sup = 0, 
            totalCan_DO = 0, 
            totalCan_Sup = 0, 
            totalAll_DO = 0, 
            totalAll_Sup = 0, 
            totalDel_DO = 0, 
            totalDel_Sup = 0,
            totalDetail = [];
            console.log(this.getView().getModel("mainCarModel").getData().length);
            for (let i = 0; i < this.getView().getModel("mainCarModel").getData().length; i++) {
                const data = this.getView().getModel("mainCarModel").getData()[i];
                totalSub_DO += parseInt(data.Submitted['Dealer Order']);
                totalSub_Sup += parseInt(data.Submitted.Supplemental);
                totalCon_DO += parseInt(data.Confirmed['Dealer Order']);
                totalCon_Sup += parseInt(data.Confirmed.Supplemental);
                totalCan_DO += parseInt(data.Cancelled['Dealer Order']);
                totalCan_Sup += parseInt(data.Cancelled.Supplemental);
                totalAll_DO += parseInt(data.Allocated['Dealer Order']);
                totalAll_Sup += parseInt(data.Allocated.Supplemental);
                totalDel_DO += parseInt(data.Delivered['Dealer Order']);
                totalDel_Sup += parseInt(data.Delivered.Supplemental);
                for (let j = 0; j < data.Detail.length; j++) {
                    totalDetail.push(data.Detail[j]);
                    console.log(data.Detail[j]);
                }
            }
            console.log(totalDetail);
            aTotalCarModel.push({ 
                'Car Line' : 'Total', 
                    'Submitted' : {
                        'Dealer Order': totalSub_DO,
                        'Supplemental': totalSub_Sup,
                    },
                    'Confirmed' : {
                        'Dealer Order': totalCon_DO,
                        'Supplemental': totalCon_Sup,
                    },
                    'Cancelled' : {
                        'Dealer Order': totalCan_DO,
                        'Supplemental': totalCan_Sup,
                    },
                    'Allocated' : {
                        'Dealer Order': totalAll_DO,
                        'Supplemental': totalAll_Sup,
                    },
                    'Delivered' : {
                        'Dealer Order': totalDel_DO,
                        'Supplemental': totalDel_Sup,
                    },
                    'Detail' : totalDetail
            });
            this.byId("carTabBar").setEnabled(true);
            this.byId("trimTabBar").setEnabled(false);
            this.byId("tcTabBar").setEnabled(false);
            this.byId("tabHeader").setSelectedKey("car");

            this.getView().setModel(new JSONModel(aTotalCarModel), "CarModel");
            this.getView().getModel("CarModel").setProperty("/SubDealerOrder", 0);
            this.getView().getModel("CarModel").setProperty("/ConDealerOrder", 0);
            this.getView().getModel("CarModel").setProperty("/SubSupOrder", 0);
            this.getView().getModel("CarModel").setProperty("/ConSupOrder", 0);
            console.log(this.getView().getModel("CarModel").getData());
        },
        onSelectTab: function (oEvent) {
            let state = this.getView().getModel("state");
            if (oEvent.getParameter('key') === 'car') {
                state.setProperty("/carState", 'true');
                state.setProperty("/trimState", 'false');
                state.setProperty("/tcState", 'false');
                this.byId("carTabBar").setEnabled(true);
                this.byId("trimTabBar").setEnabled(false);
                this.byId("tcTabBar").setEnabled(false);
            } else if (oEvent.getParameter('key') === 'trim') {
                state.setProperty("/carState", 'false');
                state.setProperty("/trimState", 'true');
                state.setProperty("/tcState", 'false');
                this.byId("trimTabBar").setEnabled(true);
                this.byId("tcTabBar").setEnabled(false);
            } else if (oEvent.getParameter('key') === 'tc') {
                state.setProperty("/carState", 'false');
                state.setProperty("/trimState", 'false');
                state.setProperty("/tcState", 'true');

            }
        },
        onSort: function (oEvent) {
            let oModel;
            let selecteTab = this.byId("tabHeader").getSelectedKey();
            if (selecteTab === 'car') {
                oModel = this.getView().getModel('CarModel');
            } else if (selecteTab === 'trim') {
                oModel = this.getView().getModel('TrimModel');
            } else if (selecteTab === 'tc') {
                oModel = this.getView().getModel('TrimColourModel');
            }
            let aData = oModel.getData();
            let oTotal = aData.pop();

            oEvent.preventDefault();

            let sortColumn = oEvent.getParameter("column").getSortProperty();
            let sortOrder = oEvent.getParameter("sortOrder");

            aData.sort(function(a, b) {
                let aValue = a[sortColumn];
                let bValue = b[sortColumn];

                switch(sortColumn) {
                    case "Submitted/Dealer Order":
                    case "Submitted/Supplemental":
                    case "Confirmed/Dealer Order":
                    case "Confirmed/Supplemental":
                    case "Cancelled/Dealer Order":
                    case "Cancelled/Supplemental":
                    case "Allocated/Dealer Order":
                    case "Allocated/Supplemental":
                    case "Delivered/Dealer Order":
                    case "Delivered/Supplemental":
                        aValue = a[sortColumn.split("/")[0]][sortColumn.split("/")[1]];
                        bValue = b[sortColumn.split("/")[0]][sortColumn.split("/")[1]];
                        break;
                    default:
                        aValue = a[sortColumn];
                        bValue = b[sortColumn];
                        break;
                }
        
                if (sortOrder === "Descending") {
                    return (aValue < bValue) ? 1 : ((aValue > bValue) ? -1 : 0);
                } else {
                    return (aValue > bValue) ? 1 : ((aValue < bValue) ? -1 : 0);
                }
            });

            aData.push(oTotal);
            
            oModel.setData(aData);
            console.log(aData);
            oModel.refresh();
        },
        onFilter: function (oEvent) {
            let oModel;
            let oMainModel;
            let selecteTab = this.byId("tabHeader").getSelectedKey();
            if (selecteTab === 'car') {
                oModel = this.getView().getModel('CarModel');
                oMainModel = this.getView().getModel('mainCarModel');
            } else if (selecteTab === 'trim') {
                oModel = this.getView().getModel('TrimModel');
                oMainModel = this.getView().getModel('mainTrimModel');
            } else if (selecteTab === 'tc') {
                oModel = this.getView().getModel('TrimColourModel');
                oMainModel = this.getView().getModel('mainTrimColourModel');
            }
            let aMainData = oMainModel.getData();
            let aData = oModel.getData();
            let oTotal = aData.pop();


            oEvent.preventDefault();

            let filterValue = oEvent.getParameters().value;
            let filterColumn = oEvent.getParameter("column").getFilterProperty();
            console.log("filterValue..." + filterValue);
            console.log("filterColumn..." + filterColumn);

            // let aFilter = new Filter(filterColumn, FilterOperator.Contains, filterValue);
            // console.log(aFilter);
            // let filters = [aFilter];

            // aData.filter(filters);
            // aData.push(oTotal);

            // oModel.setData(aData);

            let filteredData = aMainData.filter(function(item) {
                let columnValue;
                switch(filterColumn) {
                    case "Submitted/Dealer Order":
                    case "Submitted/Supplemental":
                    case "Confirmed/Dealer Order":
                    case "Confirmed/Supplemental":
                    case "Cancelled/Dealer Order":
                    case "Cancelled/Supplemental":
                    case "Allocated/Dealer Order":
                    case "Allocated/Supplemental":
                    case "Delivered/Dealer Order":
                    case "Delivered/Supplemental":
                        columnValue = item[filterColumn.split("/")[0]][filterColumn.split("/")[1]];
                        break;
                    default:
                        columnValue = item[filterColumn];
                        break;
                }
                return columnValue.includes(filterValue);
            });
            

            let totalSub_DO = 0, 
            totalSub_Sup = 0, 
            totalCon_DO = 0, 
            totalCon_Sup = 0, 
            totalCan_DO = 0, 
            totalCan_Sup = 0, 
            totalAll_DO = 0, 
            totalAll_Sup = 0, 
            totalDel_DO = 0, 
            totalDel_Sup = 0,
            totalDetail = [];

            for (let i = 0; i < filteredData.length; i++) {
                const data = filteredData[i];
                totalSub_DO += parseInt(data.Submitted['Dealer Order']);
                totalSub_Sup += parseInt(data.Submitted.Supplemental);
                totalCon_DO += parseInt(data.Confirmed['Dealer Order']);
                totalCon_Sup += parseInt(data.Confirmed.Supplemental);
                totalCan_DO += parseInt(data.Cancelled['Dealer Order']);
                totalCan_Sup += parseInt(data.Cancelled.Supplemental);
                totalAll_DO += parseInt(data.Allocated['Dealer Order']);
                totalAll_Sup += parseInt(data.Allocated.Supplemental);
                totalDel_DO += parseInt(data.Delivered['Dealer Order']);
                totalDel_Sup += parseInt(data.Delivered.Supplemental);
                totalDetail.push(data.Detail);
            }

            oTotal.Submitted['Dealer Order'] = totalSub_DO;
            oTotal.Submitted.Supplemental = totalSub_Sup;
            oTotal.Confirmed['Dealer Order'] = totalCon_DO;
            oTotal.Confirmed.Supplemental = totalCon_Sup;
            oTotal.Cancelled['Dealer Order'] = totalCan_DO;
            oTotal.Cancelled.Supplemental = totalCan_Sup;
            oTotal.Allocated['Dealer Order'] = totalAll_DO;
            oTotal.Allocated.Supplemental = totalAll_Sup;
            oTotal.Delivered['Dealer Order'] = totalDel_DO;
            oTotal.Delivered.Supplemental = totalDel_Sup;
            oTotal.Detail = totalDetail;

            
            filteredData.push(oTotal);
            
            oModel.setData(filteredData);
            this.getView().getModel("CarModel").setProperty("/SubDealerOrder", totalSub_DO);
            this.getView().getModel("CarModel").setProperty("/ConDealerOrder", totalCon_DO);
            this.getView().getModel("CarModel").setProperty("/SubSupOrder", totalSub_Sup);
            this.getView().getModel("CarModel").setProperty("/ConSupOrder", totalCon_Sup);
            oModel.refresh();

            console.log(oModel.getData());
        },
        onInquiry: function () {
            let panelId = this.byId("tablePanel");
            this.onSearch();
            sap.ui.core.Fragment.load({
                name : "project1.view.fragment.ByCarLine",
                controller : this
            }).then(function (oFragment) {
                panelId.removeAllContent();
                panelId.addContent(oFragment);
            })
            let state = this.getView().getModel("state");
            state.setProperty("/carState", 'true');
            state.setProperty("/trimState", 'false');
            state.setProperty("/tcState", 'false');

            this.byId("trimTabBar").setEnabled(false);
            this.byId("tcTabBar").setEnabled(false);
        },
        onSearch: function () {
            // let productionMonth = this.byId("productMonth").getValue();
            let modelYear = this.byId("SelectMYId").getSelectedKey();
            let carLine = this.byId("SelectCLId").getSelectedKey();
            let oMainModel = this.getView().getModel('mainCarModel');
            let oModel = this.getView().getModel('CarModel');

            let aMainData = oMainModel.getData();
            let aData = oModel.getData();
            let oTotal = aData.pop();
            
            let searchData = [];
            for (let i = 0; i < aMainData.length; i++) {
                const mainDataItem = aMainData[i];
                if (carLine === "all" && modelYear === "all") {
                    searchData.push(mainDataItem);
                } else if (carLine === "all" && modelYear !== "all") {
                    for (let j = 0; j < mainDataItem.Detail.length; j++) {
                        const detailItem = mainDataItem.Detail[j];
                        if (detailItem['Model Year'] === modelYear) {
                            searchData.push(mainDataItem);
                            break;
                        }
                    }
                } else if (carLine !== "all" && modelYear === "all") {
                    if (mainDataItem['Car Line'] === carLine) {
                        searchData.push(mainDataItem);
                    }
                } else {
                    if (mainDataItem['Car Line'] === carLine) {
                        for (let j = 0; j < mainDataItem.Detail.length; j++) {
                            const detailItem = mainDataItem.Detail[j];
                            if (detailItem['Model Year'] === modelYear) {
                                searchData.push(mainDataItem);
                                break;
                            }
                        }
                    }
                }
            }

            let totalSub_DO = 0, 
            totalSub_Sup = 0, 
            totalCon_DO = 0, 
            totalCon_Sup = 0, 
            totalCan_DO = 0, 
            totalCan_Sup = 0, 
            totalAll_DO = 0, 
            totalAll_Sup = 0, 
            totalDel_DO = 0, 
            totalDel_Sup = 0,
            totalDetail = [];

            for (let i = 0; i < searchData.length; i++) {
                const data = searchData[i];
                totalSub_DO += parseInt(data.Submitted['Dealer Order']);
                totalSub_Sup += parseInt(data.Submitted.Supplemental);
                totalCon_DO += parseInt(data.Confirmed['Dealer Order']);
                totalCon_Sup += parseInt(data.Confirmed.Supplemental);
                totalCan_DO += parseInt(data.Cancelled['Dealer Order']);
                totalCan_Sup += parseInt(data.Cancelled.Supplemental);
                totalAll_DO += parseInt(data.Allocated['Dealer Order']);
                totalAll_Sup += parseInt(data.Allocated.Supplemental);
                totalDel_DO += parseInt(data.Delivered['Dealer Order']);
                totalDel_Sup += parseInt(data.Delivered.Supplemental);
                totalDetail.push(data.Detail);
            }

            oTotal.Submitted['Dealer Order'] = totalSub_DO;
            oTotal.Submitted.Supplemental = totalSub_Sup;
            oTotal.Confirmed['Dealer Order'] = totalCon_DO;
            oTotal.Confirmed.Supplemental = totalCon_Sup;
            oTotal.Cancelled['Dealer Order'] = totalCan_DO;
            oTotal.Cancelled.Supplemental = totalCan_Sup;
            oTotal.Allocated['Dealer Order'] = totalAll_DO;
            oTotal.Allocated.Supplemental = totalAll_Sup;
            oTotal.Delivered['Dealer Order'] = totalDel_DO;
            oTotal.Delivered.Supplemental = totalDel_Sup;
            oTotal.Detail = totalDetail;

            
            searchData.push(oTotal);
            
            oModel.setData(searchData);
            oModel.setProperty("/SubDealerOrder", totalSub_DO);
            oModel.setProperty("/ConDealerOrder", totalCon_DO);
            oModel.setProperty("/SubSupOrder", totalSub_Sup);
            oModel.setProperty("/ConSupOrder", totalCon_Sup);
            oModel.refresh();

            console.log(oModel.getData());
        },
        onDealerOrderDetail: function (oEvent) {
            let buttonRow = oEvent.getSource().getBindingContext("CarModel").getProperty();
            this.getView().getModel("CarModel").setProperty("/Detail", buttonRow.Detail);
            let oView = this.getView();
            if (!this.nameDialog) {
                this.nameDialog = Fragment.load({
                    id: oView.getId(),
                    name: "project1.view.fragment.DealerOrderDetailDialog",
                    controller: this
                }).then(function (oDialog) {
                    oView.addDependent(oDialog);
                    return oDialog;
                });
            }

            this.nameDialog.then(function (oDialog) {
                oDialog.open();
            });
        },
        onCloseDetail: function () {
            this.byId("DealerOrderDialog").destroy();
            this.nameDialog = null;
        },
        setState: function () {
            let state = this.getView().getModel("state");
            let selecteTab = this.byId("tabHeader").getSelectedKey();
            if (selecteTab === 'car') {
                state.setProperty("/carState", 'true');
                state.setProperty("/trimState", 'false');
                state.setProperty("/tcState", 'false');
                this.byId("carTabBar").setEnabled(true);
                this.byId("trimTabBar").setEnabled(false);
                this.byId("tcTabBar").setEnabled(false);
            } else if (selecteTab === 'trim') {
                state.setProperty("/carState", 'false');
                state.setProperty("/trimState", 'true');
                state.setProperty("/tcState", 'false');
                this.byId("trimTabBar").setEnabled(true);
                this.byId("tcTabBar").setEnabled(false);
            } else if (selecteTab === 'tc') {
                state.setProperty("/carState", 'false');
                state.setProperty("/trimState", 'false');
                state.setProperty("/tcState", 'true');
            }
        },
        onTrim: function (oEvent) {
            let buttonRow = oEvent.getSource().getBindingContext("CarModel").getProperty();
            this.onTrimData(buttonRow);
            
            this.byId("trimTabBar").setEnabled(true);
            this.byId("tabHeader").setSelectedKey("trim");
            this.setState();
            let panelId = this.byId("tablePanel");
            sap.ui.core.Fragment.load({
                name : "project1.view.fragment.ByTrim",
                controller : this
            }).then(function (oFragment) {
                panelId.addContent(oFragment);
            })
        },
        onTrimData: function (aData) {
            let items = [
                {
                    'Model Year' : aData.Detail[0]['Model Year'],
                    'Trim' : aData.Detail[0].Description,
                    'Submitted' : {
                        'Dealer Order': aData.Detail[0].Qty,
                        'Supplemental': 0,
                    },
                    'Confirmed' : {
                        'Dealer Order': aData.Detail[0].Qty,
                        'Supplemental': 0,
                    },
                    'Cancelled' : {
                        'Dealer Order': 0,
                        'Supplemental': 0,
                    },
                    'Allocated' : {
                        'Dealer Order': 0,
                        'Supplemental': 0,
                    },
                    'Delivered' : {
                        'Dealer Order': 0,
                        'Supplemental': 0,
                    },
                    'Detail' : {
                        'HSC' : aData.Detail[0].HSC,
                        'Description' : aData.Detail[0].Description,
                        'Exterior Colour' : aData.Detail[0]['Exterior Colour'],
                        'Interior Colour' : aData.Detail[0]['Interior Colour']
                    }
                },
                {
                    'Model Year' : aData.Detail[1]['Model Year'],
                    'Trim' : aData.Detail[1].Description,
                    'Submitted' : {
                        'Dealer Order': aData.Detail[1].Qty,
                        'Supplemental': 0,
                    },
                    'Confirmed' : {
                        'Dealer Order': aData.Detail[1].Qty,
                        'Supplemental': 0,
                    },
                    'Cancelled' : {
                        'Dealer Order': 0,
                        'Supplemental': 0,
                    },
                    'Allocated' : {
                        'Dealer Order': 0,
                        'Supplemental': 0,
                    },
                    'Delivered' : {
                        'Dealer Order': 0,
                        'Supplemental': 0,
                    },
                    'Detail' : {
                        'HSC' : aData.Detail[1].HSC,
                        'Description' : aData.Detail[1].Description,
                        'Exterior Colour' : aData.Detail[1]['Exterior Colour'],
                        'Interior Colour' : aData.Detail[1]['Interior Colour']
                    }
                }
            ]
            this.getView().setModel(new JSONModel(items), "mainTrimModel");
            let aTotalTrimModel = JSON.parse(JSON.stringify(this.getView().getModel("mainTrimModel").getData()));
            let totalSub_DO = 0, 
            totalSub_Sup = 0, 
            totalCon_DO = 0, 
            totalCon_Sup = 0, 
            totalCan_DO = 0, 
            totalCan_Sup = 0, 
            totalAll_DO = 0, 
            totalAll_Sup = 0, 
            totalDel_DO = 0, 
            totalDel_Sup = 0;
            console.log(this.getView().getModel("mainTrimModel").getData().length);
            for (let i = 0; i < this.getView().getModel("mainTrimModel").getData().length; i++) {
                const data = this.getView().getModel("mainTrimModel").getData()[i];
                totalSub_DO += parseInt(data.Submitted['Dealer Order']);
                totalSub_Sup += parseInt(data.Submitted.Supplemental);
                totalCon_DO += parseInt(data.Confirmed['Dealer Order']);
                totalCon_Sup += parseInt(data.Confirmed.Supplemental);
                totalCan_DO += parseInt(data.Cancelled['Dealer Order']);
                totalCan_Sup += parseInt(data.Cancelled.Supplemental);
                totalAll_DO += parseInt(data.Allocated['Dealer Order']);
                totalAll_Sup += parseInt(data.Allocated.Supplemental);
                totalDel_DO += parseInt(data.Delivered['Dealer Order']);
                totalDel_Sup += parseInt(data.Delivered.Supplemental);
            }
            aTotalTrimModel.push({ 
                'Model Year' : 'Total', 
                    'Submitted' : {
                        'Dealer Order': totalSub_DO,
                        'Supplemental': totalSub_Sup,
                    },
                    'Confirmed' : {
                        'Dealer Order': totalCon_DO,
                        'Supplemental': totalCon_Sup,
                    },
                    'Cancelled' : {
                        'Dealer Order': totalCan_DO,
                        'Supplemental': totalCan_Sup,
                    },
                    'Allocated' : {
                        'Dealer Order': totalAll_DO,
                        'Supplemental': totalAll_Sup,
                    },
                    'Delivered' : {
                        'Dealer Order': totalDel_DO,
                        'Supplemental': totalDel_Sup,
                    }
            });
            this.getView().getModel("CarModel").setProperty("/SubDealerOrder", totalSub_DO);
            this.getView().getModel("CarModel").setProperty("/ConDealerOrder", totalCon_DO);
            this.getView().getModel("CarModel").setProperty("/SubSupOrder", totalSub_Sup);
            this.getView().getModel("CarModel").setProperty("/ConSupOrder", totalCon_Sup);

            this.getView().setModel(new JSONModel(aTotalTrimModel), "TrimModel");
        },
        onTrimColour: function (oEvent) {
            let buttonRow = oEvent.getSource().getBindingContext("TrimModel").getProperty();
            this.onTrimColourData(buttonRow);
            this.byId("tcTabBar").setEnabled(true);
            this.byId("tabHeader").setSelectedKey("tc");
            this.setState();
            let panelId = this.byId("tablePanel");
            sap.ui.core.Fragment.load({
                name : "project1.view.fragment.ByTrimColour",
                controller : this
            }).then(function (oFragment) {
                panelId.addContent(oFragment);
            });
        },
        onTrimColourData: function (aData) {
            let items = [
                {
                    'Model Year' : aData['Model Year'],
                    'HSC' : aData.Detail.HSC,
                    'Description' : aData.Detail.Description,
                    'Exterior Colour' : aData.Detail['Exterior Colour'],
                    'Interior Colour' : aData.Detail['Interior Colour'],
                    'Submitted' : {
                        'Dealer Order': aData.Submitted['Dealer Order'],
                        'Supplemental': 0,
                    },
                    'Confirmed' : {
                        'Dealer Order': aData.Confirmed['Dealer Order'],
                        'Supplemental': 0,
                    },
                    'Cancelled' : {
                        'Dealer Order': 0,
                        'Supplemental': 0,
                    },
                    'Allocated' : {
                        'Dealer Order': 0,
                        'Supplemental': 0,
                    },
                    'Delivered' : {
                        'Dealer Order': 0,
                        'Supplemental': 0,
                    }
                },
            ];

            this.getView().setModel(new JSONModel(items), "mainTrimColourModel");
            let aTotalTrimColourModel = JSON.parse(JSON.stringify(this.getView().getModel("mainTrimColourModel").getData()));
            let totalSub_DO = 0, 
            totalSub_Sup = 0, 
            totalCon_DO = 0, 
            totalCon_Sup = 0, 
            totalCan_DO = 0, 
            totalCan_Sup = 0, 
            totalAll_DO = 0, 
            totalAll_Sup = 0, 
            totalDel_DO = 0, 
            totalDel_Sup = 0;
            console.log(this.getView().getModel("mainTrimColourModel").getData().length);
            for (let i = 0; i < this.getView().getModel("mainTrimColourModel").getData().length; i++) {
                const data = this.getView().getModel("mainTrimColourModel").getData()[i];
                totalSub_DO += parseInt(data.Submitted['Dealer Order']);
                totalSub_Sup += parseInt(data.Submitted.Supplemental);
                totalCon_DO += parseInt(data.Confirmed['Dealer Order']);
                totalCon_Sup += parseInt(data.Confirmed.Supplemental);
                totalCan_DO += parseInt(data.Cancelled['Dealer Order']);
                totalCan_Sup += parseInt(data.Cancelled.Supplemental);
                totalAll_DO += parseInt(data.Allocated['Dealer Order']);
                totalAll_Sup += parseInt(data.Allocated.Supplemental);
                totalDel_DO += parseInt(data.Delivered['Dealer Order']);
                totalDel_Sup += parseInt(data.Delivered.Supplemental);
            }
            aTotalTrimColourModel.push({ 
                'Model Year' : 'Total', 
                    'Submitted' : {
                        'Dealer Order': totalSub_DO,
                        'Supplemental': totalSub_Sup,
                    },
                    'Confirmed' : {
                        'Dealer Order': totalCon_DO,
                        'Supplemental': totalCon_Sup,
                    },
                    'Cancelled' : {
                        'Dealer Order': totalCan_DO,
                        'Supplemental': totalCan_Sup,
                    },
                    'Allocated' : {
                        'Dealer Order': totalAll_DO,
                        'Supplemental': totalAll_Sup,
                    },
                    'Delivered' : {
                        'Dealer Order': totalDel_DO,
                        'Supplemental': totalDel_Sup,
                    }
            });
            this.getView().getModel("CarModel").setProperty("/SubDealerOrder", totalSub_DO);
            this.getView().getModel("CarModel").setProperty("/ConDealerOrder", totalCon_DO);
            this.getView().getModel("CarModel").setProperty("/SubSupOrder", totalSub_Sup);
            this.getView().getModel("CarModel").setProperty("/ConSupOrder", totalCon_Sup);

            this.getView().setModel(new JSONModel(aTotalTrimColourModel), "TrimColourModel");
        },
        onBack: function () {
            let seletedTab = this.byId("tabHeader").getSelectedKey();
            if (seletedTab === 'car') {
                this.getView().getController().getOwnerComponent().getRouter().navTo("OrderInquiry");
            } else if (seletedTab === 'trim') {
                this.byId("tabHeader").setSelectedKey("car");
                let totalSub_DO = 0, 
                totalSub_Sup = 0, 
                totalCon_DO = 0, 
                totalCon_Sup = 0;
                for (let i = 0; i < this.getView().getModel("mainCarModel").getData().length; i++) {
                    const data = this.getView().getModel("mainCarModel").getData()[i];
                    totalSub_DO += parseInt(data.Submitted['Dealer Order']);
                    totalSub_Sup += parseInt(data.Submitted.Supplemental);
                    totalCon_DO += parseInt(data.Confirmed['Dealer Order']);
                    totalCon_Sup += parseInt(data.Confirmed.Supplemental);
                }
                this.getView().getModel("CarModel").setProperty("/SubDealerOrder", totalSub_DO);
                this.getView().getModel("CarModel").setProperty("/ConDealerOrder", totalCon_DO);
                this.getView().getModel("CarModel").setProperty("/SubSupOrder", totalSub_Sup);
                this.getView().getModel("CarModel").setProperty("/ConSupOrder", totalCon_Sup);
                this.setState();
            } else if (seletedTab === 'tc') {
                this.byId("tabHeader").setSelectedKey("trim");
                let totalSub_DO = 0, 
                totalSub_Sup = 0, 
                totalCon_DO = 0, 
                totalCon_Sup = 0;
                for (let i = 0; i < this.getView().getModel("mainTrimModel").getData().length; i++) {
                    const data = this.getView().getModel("mainTrimModel").getData()[i];
                    totalSub_DO += parseInt(data.Submitted['Dealer Order']);
                    totalSub_Sup += parseInt(data.Submitted.Supplemental);
                    totalCon_DO += parseInt(data.Confirmed['Dealer Order']);
                    totalCon_Sup += parseInt(data.Confirmed.Supplemental);
                }
                this.getView().getModel("CarModel").setProperty("/SubDealerOrder", totalSub_DO);
                this.getView().getModel("CarModel").setProperty("/ConDealerOrder", totalCon_DO);
                this.getView().getModel("CarModel").setProperty("/SubSupOrder", totalSub_Sup);
                this.getView().getModel("CarModel").setProperty("/ConSupOrder", totalCon_Sup);
                this.setState();
            }
        },
        onExcelExport: function () {
            let oTable = this.byId('DetailTable');
            let oRowBinding = oTable.getBinding('rows');
            const aCols = [
                {
                    label: 'Order',
                    property: 'Order',
                    type: 'String'
                },
                {
                    label: 'Type',
                    property: 'Type',
                    type: 'String'
                },
                {
                    label: 'Model Year',
                    property: 'Model Year',
                    type: 'String'
                },
                {
                    label: 'HSC',
                    property: 'HSC',
                    type: 'String'
                },
                {
                    label: 'Description',
                    property: 'Description',
                    type: 'String'
                },
                {
                    label: 'Exterior Colour',
                    property: 'Exterior Colour',
                    type: 'String'
                },
                {
                    label: 'Interior Colour',
                    property: 'Interior Colour',
                    type: 'String'
                },
                {
                    label: 'Status',
                    property: 'Status',
                    type: 'String'
                },
                {
                    label: 'VIN',
                    property: 'VIN',
                    type: 'String'
                },
                {
                    label: 'Qty',
                    property: 'Qty',
                    type: 'Integer'
                },
            ];

            let oList = [];

            for (let i = 0; i < oRowBinding.oList.length; i++) {
                oList.push(oRowBinding.oList[i]);
            }

            let oSettings = {
                workbook: {
                    columns: aCols,
                    hierarchyLevel: 'Level'
                },
                dataSource: oList,
                fileName: 'DealerOrderDetail.xlsx',
                worker: false

            };

            let oSheet = new Spreadsheet(oSettings);
            oSheet.build().finally(function () {
                oSheet.destroy();
            });
        },
    });
});
