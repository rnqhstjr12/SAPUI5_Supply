sap.ui.define([
	"sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
], function(
	Controller, JSONModel
) {
	"use strict";
	let _this, SearchData, Search_IT_DetailData;
	return Controller.extend("project1.controller.spc2_2", {
		onInit: function () {
            const myRoute = this.getOwnerComponent().getRouter().getRoute("spc2_2");
            myRoute.attachPatternMatched(this.onMyRoutePatternMatched, this);
        },
        onMyRoutePatternMatched: function () {
            SearchData = JSON.parse(localStorage.getItem("SearchData"));
            Search_IT_DetailData = JSON.parse(localStorage.getItem("Search_IT_DetailData"));
            this._globalVarSet();
            this._ViewData();
            this.getView().setModel(new JSONModel(SearchData),"IT_HEADER_MODEL");
        },

		_globalVarSet: function () {
            _this = this;
        },

        _ViewData: function () {

            
        },

		onHeaderSearchRefresh: function () {
            let resSelect = this.byId("resSelect");
            let erpSelect = this.byId("erpSelect");

            resSelect.setSelectedKey("all");
            erpSelect.setSelectedKey("all");
            this.onHeaderSearch();
        },

		onHeaderSearch: function () {
            this.getView().setModel(new JSONModel(SearchData),"IT_HEADER_MODEL");

            let resSelect = this.byId("resSelect");
            let erpSelect = this.byId("erpSelect");

            let res, erp;

            if (resSelect.getSelectedKey() === 'O') {
                res = true;
            } else if (resSelect.getSelectedKey() === 'X') {
                res = false;
            } else {
                res = null;
            }

            if (erpSelect.getSelectedKey() === 'O') {
                erp = true;
            } else if (erpSelect.getSelectedKey() === 'X') {
                erp = false;
            } else {
                erp = null;
            }

            let oHeaderData = this.getView().getModel("IT_HEADER_MODEL").getData();
            let filterData = oHeaderData.filter(function(item) {
                return res === null ? item : item["TEST_CHECK"] === res;
            });

            filterData = filterData.filter(function(item) {
                return erp === null ? item : item["ERP_CHECK"] === erp;
            });

            // console.log(filterData);
            this.getView().setModel(new JSONModel(filterData),"IT_HEADER_MODEL");
            this.getView().getModel("IT_HEADER_MODEL").refresh();
            // console.log(this.getView().getModel("IT_HEADER_MODEL"));
        },

		onSelectRow: function (oEvent) {
            let buttonRows = oEvent.getParameter("listItem").getBindingContext("IT_HEADER_MODEL");
            let selectRowIdx = buttonRows.sPath.split("/")[1];
            let selectRow = buttonRows.oModel.oData[selectRowIdx];
            localStorage.setItem("DetailData", JSON.stringify(selectRow));
            this.getView().getController().getOwnerComponent().getRouter().navTo("spc2_3");

        },

		onERPTransfer: function () {
            let headerData = JSON.parse(localStorage.getItem("IT_HEADER_MODEL"));
            let oModel = this.getView().getModel("IT_HEADER_MODEL").getData();
            for (let i = 0; i < SearchData.length; i++) {
                if (SearchData[i].TEST_CHECK) {
                    SearchData[i].ERP_CHECK = true;
                    oModel[i].ERP_CHECK = true;
                    console.log("----------------- ERP전송")
                    console.log(JSON.parse(localStorage.getItem(headerData.IT_HEADER_PRUEFLOS)));
                    console.log(SearchData[i]);
                    console.log("-------------------------")
                }
            }
            for (let i = 0; i < headerData.length; i++) {
                if (headerData[i].TEST_CHECK) {
                    headerData[i].ERP_CHECK = true;
                }
            }
            localStorage.setItem("SearchData", JSON.stringify(SearchData));
            localStorage.setItem("IT_HEADER_MODEL", JSON.stringify(headerData));
            this.getView().getModel("IT_HEADER_MODEL").refresh();
        },

        onBack: function () {
            this.getView().getController().getOwnerComponent().getRouter().navTo("spc2_1");
        },


	});
});