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
        onMyRoutePatternMatched: async function () {
            DetailData = JSON.parse(localStorage.getItem("DetailData"));
            Search_IT_DetailData = JSON.parse(localStorage.getItem("Search_IT_DetailData"));

            
            this.getView().setModel(new JSONModel(DetailData),"IT_HEADER_DETAIL_MODEL");
            this.getView().setModel(new JSONModel(Search_IT_DetailData),"Search_IT_DetailData");

            this._ViewData();
            this._tableSet();
            this._globalVarSet();
        },

        // onAfterRendering: function () {
        //     let oTable = this.byId("tableId");
        //     let aRows = oTable.getRows();

        //     aRows.forEach(function(oRow) {
        //         oRow.attachBrowserEvent('blur', function () {
        //             oRow.setValueState("None");
        //         });
        //     });
        //     console.log(aRows);
        // },

        _globalVarSet: async function () {
            _this = this;
            let oTable = this.byId("tableId");
            oTable.setMinAutoRowCount(this.getView().getModel("IT_DETAIL_DETAIL_MODEL").getProperty("/IT_MULTI").length);
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

        onValueInputChange: function (oEvent) {
            let iInput = oEvent.getSource().getValue();
            let tableData = this.getView().getModel("IT_DETAIL_DETAIL_MODEL").getProperty("/IT_MULTI");
            let tableDataLength = tableData.length;
            let inputRows = oEvent.getSource().getBindingContext("IT_DETAIL_DETAIL_MODEL").getObject().MERKNR;

            let inputRowData;
            for (let i = 0; i < tableDataLength; i++) {
                let data = tableData[i];
                if (data.MERKNR === inputRows) {
                    inputRowData = data;
                    break;
                }
            }

            if (String(iInput).length <= 0){
                inputRowData.DETAILERG = null;
                oEvent.getSource().setValueState("None");
            } else {
                oEvent.getSource().setValueState("None");
            }
        },

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
                let check = /^[0-9]+$/;
                if (!check.test(iInput)) {
                    oEvent.getSource().setValue(iInput.replace(/\D/g, ''));
                    oEvent.getSource().setValueState("Error");
                    oEvent.getSource().setValueStateText("숫자만 입력할 수 있습니다.");
                    setTimeout(function() {
                        oEvent.getSource().setValueState("None");
                    }, 500);
                } else {
                    oEvent.getSource().setValueState("None");
                }

                if (String(iInput).length <= 0) {
                    inputRowData.DETAILERG = null;
                } else {
                    if (iInput >= parseInt(detailData["IT_DETAIL_TOLERANZOB"]) && iInput <= parseInt(detailData["IT_DETAIL_TOLERANZUN"])) {
                        inputRowData.DETAILERG = true;
                    } else if (String(iInput).length > 0 && (iInput < parseInt(detailData["IT_DETAIL_TOLERANZOB"]) || iInput > parseInt(detailData["IT_DETAIL_TOLERANZUN"]))) {
                        inputRowData.DETAILERG = false;
                    } 
                }
                
                if (parseInt(inputRows) === tableDataLength && tableDataLength < 10) {
                    tableData.push({
                        "PRUEFLOS" : headerDetailData["IT_HEADER_PRUEFLOS"],
                        "MERKNR" : String(tableDataLength + 1).padStart(8, "0"),
                        "ORIGINAL_INPUT" : "",
                        "DETAILERG" : null,
                    });
                    oTable.setMinAutoRowCount(tableDataLength + 1);
                }
            } else {
                oEvent.getSource().setValueState("None");
            }
            this.getView().getModel("IT_DETAIL_DETAIL_MODEL").setProperty("/IT_MULTI", tableData);
            this.getView().getModel("IT_DETAIL_DETAIL_MODEL").refresh();
        },

        onSave: function () {
            let oData = this.getView().getModel("IT_DETAIL_DETAIL_MODEL").getProperty(("/IT_MULTI"))
            let headerDetailData = this.getView().getModel("IT_HEADER_DETAIL_MODEL").getData();
            let searchData = JSON.parse(localStorage.getItem("SearchData"));
            let headerData = JSON.parse(localStorage.getItem("IT_HEADER_MODEL"));
            // console.log(headerData);
            let cnt = [];
            for (let i = oData.length - 1; i >= 0; i--) {
                let data = oData[i];
                if (data.DETAILERG === null || String(data.ORIGINAL_INPUT).length <= 0) {
                    cnt.push(i);
                    console.log(cnt[i]);
                }
            }
            // console.log(cnt);
            // console.log(oData);
            if (oData.length === cnt.length) {
                MessageBox.show("한 개 이상의 결과를 입력해주세요");
                return;
            }
            MessageBox.show(
                '저장하시겠습니까?',
                {
                    title : '저장 확인',
                    actions: [MessageBox.Action.OK, MessageBox.Action.NO],
                    emphasizedAction: MessageBox.Action.OK,
                    onClose: function (oAction) {
                        if (oAction === "OK") {
                            cnt.forEach(indexToRemove => {
                                oData.splice(indexToRemove, 1);
                            });
                            for (let i = 0; i < oData.length; i++) {
                                let data = oData[i];
                                // console.log(i);

                                data.MERKNR = String(i + 1).padStart(8, "0");
                            }

                            localStorage.setItem(headerDetailData["IT_HEADER_PRUEFLOS"], JSON.stringify(oData));
                            headerDetailData.TEST_CHECK = true;
                            headerDetailData.ERP_CHECK = false;

                            for (let i = 0; i < headerData.length; i++) {
                                if (headerData[i].IT_HEADER_PRUEFLOS === headerDetailData.IT_HEADER_PRUEFLOS) {
                                    headerData[i] = headerDetailData;
                                    break;
                                }
                            }
                            localStorage.setItem("IT_HEADER_MODEL", JSON.stringify(headerData));

                            for (let i = 0; i < searchData.length; i++) {
                                if (searchData[i].IT_HEADER_PRUEFLOS === headerDetailData.IT_HEADER_PRUEFLOS) {
                                    searchData[i] = headerDetailData;
                                    break;
                                }
                            }
                            localStorage.setItem("SearchData", JSON.stringify(searchData));

                            console.log(oData);
                            console.log(headerDetailData);
                            _this.getView().getController().getOwnerComponent().getRouter().navTo("spc2");
                        }
                    }
                }
            )
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
                _this.getView().getController().getOwnerComponent().getRouter().navTo("spc2");
            } else {
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
            }
        },
    });
});
