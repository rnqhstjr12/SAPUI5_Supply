sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], function (Controller, JSONModel, Fragment, Filter, FilterOperator) {
    "use strict";

    return Controller.extend("project1.controller.ProgramProtectionDetail", {
        onInit: function () {
            const myRoute = this.getOwnerComponent().getRouter().getRoute("ProgramProtectionDetail");
            myRoute.attachPatternMatched(this.onMyRoutePatternMatched, this);
        },
        onMyRoutePatternMatched: function (oEvent) {
            const DetailData = JSON.parse(decodeURIComponent(oEvent.getParameter("arguments").DetailData));
            this.getView().setModel(new JSONModel(DetailData), 'DetailData');
            this.onSelectData();
        },
        onSelectData: function () {
            let title = {
                title : [
                    {
                        key : '0001 : Ms.', text : '0001 : Ms.'
                    },
                    {
                        key : '0002 : Mr.', text : '0002 : Mr.'
                    },
                ],
            };
            let selectTitle = this.byId("selectTitle");
            let selectSex = this.byId("selectYas");

            let DetailData = this.getView().getModel("DetailData");
            
            let cloneDetail = JSON.parse(JSON.stringify(this.getView().getModel("DetailData").getData()));
            this.getView().setModel(cloneDetail, 'cloneDetailData'); // 보존용
            
            selectTitle.setSelectedKey(DetailData.getData().Title);
            selectSex.setSelectedKey(DetailData.getData().Sex);
            this.getView().setModel(new JSONModel(title), 'mainTitleModel');
            this.getView().setModel(new JSONModel(title), 'titleModel');
        },
        onEdit: function (oEvent) {
            let DetailData = this.getView().getModel('DetailData');
            DetailData.setProperty('/onEdit', 'yEdit');
            DetailData.setProperty('/EditState', 'None');
        },
        onList: function (oEvent) {
            this.getView().getController().getOwnerComponent().getRouter().navTo("ProgramProtectionList");
        },
        onSave: function (oEvent) {


            let oView = this.getView();
            if (!this.nameDialog) {
                this.nameDialog = Fragment.load({
                    id: oView.getId(),
                    name: "project1.view.fragment.ProgramProtectionDetailSaveDialog",
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
        onSaveYesDialog: function () {

            this.onSaveNoDialog();
        },
        onSaveNoDialog: function () {
            this.byId("ProgramProtectionDetailSaveDialog").destroy();
            this.nameDialog = null;
        },
        onCancelYesDialog: function () {
            let DetailData = this.getView().getModel('DetailData');
            let cloneDetailData = this.getView().getModel('cloneDetailData');
            DetailData.setProperty('/onEdit', 'nEdit');
            DetailData.setProperty('/EditState', 'None');
            
            let selectRadio = this.byId('radio').getSelectedButton().getText();
            console.log(selectRadio);
            if (selectRadio === 'Person') {
                this.byId("CMLabelId").setVisible(false);
                this.byId("CMVBoxId").setVisible(false);
            } else if (selectRadio === 'Business') {
                this.byId("FNLabelId").setVisible(false);
                this.byId("FNVBoxId").setVisible(false);
                this.byId("LNLabelId").setVisible(false);
                this.byId("LNVBoxId").setVisible(false);
            }
            DetailData.setData(cloneDetailData);
            this.onCancelNoDialog();
        },
        onCancelNoDialog: function () {
            this.byId("ProgramProtectionDetailCancelDialog").destroy();
            this.nameDialog = null;
        },
        onEditName: function (oEvent) {
            let DetailData = this.getView().getModel('DetailData');
            DetailData.setProperty('/EditState', 'Name');
        },
        onEditAddress: function (oEvent) {
            let DetailData = this.getView().getModel('DetailData');
            DetailData.setProperty('/EditState', 'Address');

            let lang = this.byId("selectLang");
            let province = this.byId("selectProvince");
            let ageGroup = this.byId("selectAge");

            lang.setSelectedKey(DetailData.getData().Language);
            province.setSelectedKey(DetailData.getData().Province);
            ageGroup.setSelectedKey(DetailData.getData()['Age Group']);
        },
        onCancel: function (oEvent) {
            let oView = this.getView();
            if (!this.nameDialog) {
                this.nameDialog = Fragment.load({
                    id: oView.getId(),
                    name: "project1.view.fragment.ProgramProtectionDetailCancelDialog",
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
        onCheckCustomerType: function (oEvent) {
            let oCheck = oEvent.getParameter("selected");
            let title = this.byId("selectTitle");
            let sex = this.byId("selectYas");
            let mainTitleModel = JSON.parse(JSON.stringify(this.getView().getModel("mainTitleModel").getData()));
            let DetailData = this.getView().getModel("DetailData");

            if (!oCheck) {
                DetailData.setProperty("/Radio", 'Person');
                sex.setSelectedKey('None');

                let aTitle = {key : 'Company', text : '0005 : Company.'};

                mainTitleModel.title.push(aTitle);
                this.getView().getModel("titleModel").setData(mainTitleModel);
                title.setSelectedKey('Company');
                console.log(this.getView().getModel('mainTitleModel').getData());
                console.log(this.getView().getModel('titleModel').getData());
                
            } else {
                DetailData.setProperty("/Radio", 'Business');

                sex.setSelectedKey(DetailData.getData().Sex);
                
                mainTitleModel.title.pop();
                this.getView().getModel("titleModel").setData(mainTitleModel);
                title.setSelectedKey(DetailData.getData().Title);
            }

            DetailData.refresh();
        },
    });
});
