sap.ui.define([
	"sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox"
], function(
	Controller, JSONModel, MessageBox
) {
	"use strict";
	let _this, DetailData, Search_IT_DetailData;
	return Controller.extend("project1.controller.spc2_3", {
		onInit: function () {
            const myRoute = this.getOwnerComponent().getRouter().getRoute("spc2_3");
            myRoute.attachPatternMatched(this.onMyRoutePatternMatched, this);
        },
        onMyRoutePatternMatched: async function () {
            DetailData = JSON.parse(localStorage.getItem("DetailData"));
            Search_IT_DetailData = JSON.parse(localStorage.getItem("Search_IT_DetailData"));

            
            this.getView().setModel(new JSONModel(DetailData),"IT_HEADER_DETAIL_MODEL");
            this.getView().setModel(new JSONModel(Search_IT_DetailData),"Search_IT_DetailData");

            this._ViewData();
            this._tableSet();
            this._globalVarSet();
        },

		_globalVarSet: async function () {
            _this = this;
            let oTable = this.byId("tableId");
            oTable.setMinAutoRowCount(this.getView().getModel("IT_DETAIL_DETAIL_MODEL").getProperty("/IT_MULTI").length);
        },

		_ViewData: function () {
            let detailData = this.getView().getModel("IT_HEADER_DETAIL_MODEL").getData();
            let oData = this.getView().getModel("Search_IT_DetailData").getData();
            let headerDetail = [];
            for (let i = 0; i < oData.length; i++) {
                let value = oData[i];
                if (String(value["IT_DETAIL_PRUEFLOS"]) === String(detailData["IT_HEADER_PRUEFLOS"])) {
                    headerDetail.push(value);
                }
            }
            this.getView().setModel(new JSONModel(headerDetail), "IT_DETAIL_DETAIL_MODEL");
			console.log(this.getView().getModel("IT_DETAIL_DETAIL_MODEL"));
            
        },

		_tableSet: function () {
            let oModel = this.getView().getModel("IT_DETAIL_DETAIL_MODEL");
            let headerDetailData = this.getView().getModel("IT_HEADER_DETAIL_MODEL").getData();
            let IT_MULTI;

            if (localStorage.getItem(headerDetailData["IT_HEADER_PRUEFLOS"])) {
                IT_MULTI = JSON.parse(localStorage.getItem(headerDetailData["IT_HEADER_PRUEFLOS"]));
                if (IT_MULTI.length < 10) {
                    IT_MULTI.push({
                        "PRUEFLOS" : headerDetailData["IT_HEADER_PRUEFLOS"],
                        "MERKNR" : String(IT_MULTI.length + 1).padStart(8, "0"),
                        "ORIGINAL_INPUT" : "",
                        "DETAILERG" : null,
                    })
                }
            } else {
                IT_MULTI = [
                    {
                        "PRUEFLOS" : headerDetailData["IT_HEADER_PRUEFLOS"],
                        "MERKNR" : "00000001",
                        "ORIGINAL_INPUT" : "",
                        "DETAILERG" : null,
                    },
                ]
            }
            
            oModel.setProperty("/IT_MULTI", IT_MULTI);

            this.getView().getModel("IT_DETAIL_DETAIL_MODEL").refresh();
        },

		onBack: function () {
            let oData = this.getView().getModel("IT_DETAIL_DETAIL_MODEL").getProperty(("/IT_MULTI"))
            let headerDetailData = this.getView().getModel("IT_HEADER_DETAIL_MODEL").getData();
            let searchData = JSON.parse(localStorage.getItem("SearchData"));
            let beforeData = JSON.parse(localStorage.getItem(headerDetailData["IT_HEADER_PRUEFLOS"]));
            let check = true;
            if (beforeData === null) {
                for (let i = 0; i < oData.length; i++) {
                    let data = oData[i];
                    if (String(data.ORIGINAL_INPUT).length > 0) {
                        check = false;
                    }
                }
            } else {
                if ((oData.length - 1) === beforeData.length) {
                    for (let i = 0; i < beforeData.length; i++) {
                        let data = oData[i];
                        if (data.ORIGINAL_INPUT !== beforeData[i].ORIGINAL_INPUT) {
                            check = false;
                            
                        }
                    }
                } else {
                    if (beforeData.length + 1 < oData.length) {
                        check = false;
                    }
                    if (beforeData.length + 1 === oData.length) {
                        if (String(oData[beforeData.length].ORIGINAL_INPUT).length > 0) {
                            check = false;
                        }
                    }
                }
            }
            for (let i = 0; i < searchData.length; i++) {
                let data = searchData[i];
                if (data.IT_HEADER_PRUEFLOS === headerDetailData.IT_HEADER_PRUEFLOS) {
                    if (data.IT_HEADER_REASON !== headerDetailData.IT_HEADER_REASON) {
                        check = false;
                    }
                    if (data.IT_HEADER_SOLVE !== headerDetailData.IT_HEADER_SOLVE) {
                        check = false;
                    }
                    if (data.IT_HEADER_RESULT !== headerDetailData.IT_HEADER_RESULT) {
                        check = false;
                    }
                }
            }
            if (check) {
                _this.getView().getController().getOwnerComponent().getRouter().navTo("spc2_2");
            } else {
                MessageBox.show(
                    '취소 시 입력한 데이터는 저장되지 않습니다. \n이전으로 돌아가시겠습니까?',
                    {
                        title : '취소 확인',
                        actions: [MessageBox.Action.OK, MessageBox.Action.NO],
                        emphasizedAction: MessageBox.Action.OK,
                        onClose: function (oAction) {
                            if (oAction === "OK") {
                                _this.getView().getController().getOwnerComponent().getRouter().navTo("spc2_2");
                            }
                        }
    
                    }
                )
            }
        },


	});
});