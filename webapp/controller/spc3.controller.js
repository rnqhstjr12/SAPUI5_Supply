sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox"
], function (Controller, JSONModel, MessageBox) {
    "use strict";
    let _this, DetailData, Search_IT_DetailData;
    return Controller.extend("project1.controller.spc3", {
        onInit: function () {
            const myRoute = this.getOwnerComponent().getRouter().getRoute("spc3");
            myRoute.attachPatternMatched(this.onMyRoutePatternMatched, this);
        },
        onMyRoutePatternMatched: function () {
            DetailData = JSON.parse(localStorage.getItem("DetailData"));
            Search_IT_DetailData = JSON.parse(localStorage.getItem("Search_IT_DetailData"));

            
            this.getView().setModel(new JSONModel(DetailData),"IT_HEADER_DETAIL_MODEL");
            this.getView().setModel(new JSONModel(Search_IT_DetailData),"Search_IT_DetailData");

            this._ViewData();
            this._tableSet();
            this._globalVarSet();
        },

        _globalVarSet: function () {
            _this = this;
            this.byId("tableId").setMinAutoRowCount(this.getView().getModel("IT_DETAIL_DETAIL_MODEL").getProperty("/IT_MULTI").length);
        },
        
        _ViewData: function () {
            let detailData = this.getView().getModel("IT_HEADER_DETAIL_MODEL").getData();
            let oData = this.getView().getModel("Search_IT_DetailData").getData();
            let headerDetail;
            for (let i = 0; i < oData.length; i++) {
                let value = oData[i];
                if (String(value["IT_DETAIL_PRUEFLOS"]) === String(detailData["IT_HEADER_PRUEFLOS"])) {
                    headerDetail = value;
                    break;
                }
            }
            this.getView().setModel(new JSONModel(headerDetail), "IT_DETAIL_DETAIL_MODEL");
        },

        _tableSet: function () {
            let oModel = this.getView().getModel("IT_DETAIL_DETAIL_MODEL");
            let headerDetailData = this.getView().getModel("IT_HEADER_DETAIL_MODEL").getData();

            let IT_MULTI = [
                {
                    "PRUEFLOS" : headerDetailData["IT_HEADER_PRUEFLOS"],
                    "MERKNR" : 1,
                    "ORIGINAL_INPUT" : "",
                    "DETAILERG" : null,
                },
            ]
            oModel.setProperty("/IT_MULTI", IT_MULTI)
        },

        // onValueInputChange: function (oEvent) {
        //     let iInput = oEvent.getSource().getValue();

        //     let tableData = this.getView().getModel("IT_DETAIL_DETAIL_MODEL").getProperty("/IT_MULTI");
        //     let tableDataLength = tableData.length;
        //     let inputRows = oEvent.getSource().getBindingContext("IT_DETAIL_DETAIL_MODEL").getObject().MERKNR;

        //     let inputRowData;
        //     for (let i = 0; i < tableDataLength; i++) {
        //         let data = tableData[i];
        //         if (data.MERKNR === inputRows) {
        //             inputRowData = data;
        //             break;
        //         }
        //     }
        //     console.log(iInput);
            
        // },

        onValueInputLiveChange: function (oEvent) {
            let iInput = oEvent.getSource().getValue();
            let detailData = this.getView().getModel("IT_DETAIL_DETAIL_MODEL").getData();
            let headerDetailData = this.getView().getModel("IT_HEADER_DETAIL_MODEL").getData();
            let tableData = this.getView().getModel("IT_DETAIL_DETAIL_MODEL").getProperty("/IT_MULTI");
            let tableDataLength = tableData.length;
            let inputRows = oEvent.getSource().getBindingContext("IT_DETAIL_DETAIL_MODEL").getObject().MERKNR;
            let oTable = this.byId("tableId");
            let inputRowData;
            for (let i = 0; i < tableDataLength; i++) {
                let data = tableData[i];
                if (data.MERKNR === inputRows) {
                    inputRowData = data;
                    break;
                }
            }
            if (iInput) {
                if (iInput >= parseInt(detailData["IT_DETAIL_TOLERANZOB"]) && iInput <= parseInt(detailData["IT_DETAIL_TOLERANZUN"])) {
                    inputRowData.DETAILERG = true;
                    console.log("true");
                } else if (iInput < parseInt(detailData["IT_DETAIL_TOLERANZOB"]) || iInput > parseInt(detailData["IT_DETAIL_TOLERANZUN"])) {
                    inputRowData.DETAILERG = false;
                    console.log("false");
                } else {
                    inputRowData.DETAILERG = null;
                    console.log("null");
                } 
                if (inputRows === tableDataLength && tableDataLength < 10) {
                    tableData.push({
                        "PRUEFLOS" : headerDetailData["IT_HEADER_PRUEFLOS"],
                        "MERKNR" : tableDataLength + 1,
                        "ORIGINAL_INPUT" : "",
                        "DETAILERG" : null,
                    });
                    oTable.setMinAutoRowCount(tableDataLength + 1);
                }
            }
            this.getView().getModel("IT_DETAIL_DETAIL_MODEL").setProperty("/IT_MULTI", tableData);
            this.getView().getModel("IT_DETAIL_DETAIL_MODEL").refresh();
        },

        onSave: function () {
            let oData = this.getView().getModel("IT_DETAIL_DETAIL_MODEL").getProperty(("/IT_MULTI"))
            let headerData = this.getView().getModel("IT_HEADER_DETAIL_MODEL").getData();
            
            let cnt = 0;
            for (let i = 0; i < oData.length; i++) {
                let data = oData[i];
                if (data.DETAILERG === null) {
                    oData.pop(i);
                }
            }
            console.log(cnt);

            MessageBox.show(
                '저장하시겠습니까?',
                {
                    title : '저장 확인',
                    actions: [MessageBox.Action.OK, MessageBox.Action.NO],
                    emphasizedAction: MessageBox.Action.OK,
                    onClose: function (oAction) {
                        if (oAction === "OK") {
                            if (oData.length <= 0) {
                                MessageBox.show("한 개 이상의 결과를 입력해주세요");
                                return;
                            }
                            console.log(oData);
                            console.log(headerData);
                            _this.getView().getController().getOwnerComponent().getRouter().navTo("spc2");
                        }
                    }
                }
            )
        },

        onBack: function () {
            MessageBox.show(
                '취소 시 입력한 데이터는 저장되지 않습니다. \n이전으로 돌아가시겠습니까?',
                {
                    title : '취소 확인',
                    actions: [MessageBox.Action.OK, MessageBox.Action.NO],
                    emphasizedAction: MessageBox.Action.OK,
                    onClose: function (oAction) {
                        if (oAction === "OK") {
                            _this.getView().getController().getOwnerComponent().getRouter().navTo("spc2");
                        }
                    }

                }
            )
            
        },
    });
});
