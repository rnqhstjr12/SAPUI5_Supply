sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageToast",
    'sap/m/MessagePopover',
	'sap/m/MessageItem',
    "sap/ui/core/Messaging",
    'sap/ui/core/message/Message',
    'sap/ui/core/library',
    "sap/ui/dom/isBehindOtherElement",
    'sap/ui/core/Element'
], function(
	Controller, 
    JSONModel, 
    Filter, 
    FilterOperator, 
    MessageToast, 
    MessagePopover, 
    MessageItem, 
    Messaging, 
    Message, 
    library, 
    isBehindOtherElement, 
    Element
) {
	"use strict";
    let _this;
	return Controller.extend("project1.controller.spc2_1", {
        onInit: function() {
            const myRoute = this.getOwnerComponent().getRouter().getRoute("spc2_1");
            myRoute.attachPatternMatched(this.onMyRoutePatternMatched, this);
            
        
        },
        onMyRoutePatternMatched: function () {
            localStorage.clear();
            this._globalVarSet();
            this._ViewData();
        },

        _globalVarSet: function () {
            _this = this;
            let PASTRTERM = this.byId("PASTRTERM");
            let PAENDTERM = this.byId("PAENDTERM");
            let now = this._DateSet(new Date());
            PASTRTERM.setValue(now);
            let nowDate2 = this._DateSet(PASTRTERM.getDateValue());
            PAENDTERM.setMinDate(new Date(nowDate2));
            PAENDTERM.setMaxDate(new Date(this._DateSet2(nowDate2)));
        },

        _DateSet: function (oDate) {
            const date = oDate || new Date();
            const year = date.getFullYear();
            const month = ('0' + (date.getMonth() + 1)).slice(-2);
            const day = ('0' + date.getDate()).slice(-2);
            const dateStr = year + '.' + month + '.' + day;
            return dateStr;
        },

        _DateSet2: function (oDate) {
            const date = oDate;
            const yearMonth = date.slice(0, 4) + "-" + date.slice(5, 7) + "-";
            let day = date.slice(-2);
            const newDay = parseInt(day) + 7;
           
            const dateStr = yearMonth + (newDay < 10 ? '0' + newDay : newDay);
            
            console.log(dateStr);
        
            return dateStr;
        },

        _ViewData: function () {
            const IT_HEADER = [
                {
                    "IT_HEADER_WERKS": "1002",
                    "IT_HEADER_WERKS_TX": "SL-시화생산센터",
                    "IT_HEADER_MATNR": "127528",
                    "IT_HEADER_MAKTX": "샌드위치 토스트",
                    "IT_HEADER_AUFNR": "1000004",
                    "IT_HEADER_MDV01": "SLS101",
                    "IT_HEADER_KTEXT": "1-3라인",
                    "IT_HEADER_KTEXTLOS": "2024.03.19 공정순회검사",
                    "IT_HEADER_LOSMENGE": "100",
                    "IT_HEADER_MENGENEINH": "EA",
                    "IT_HEADER_STATUSTEXT": "REL CALC",
                    "IT_HEADER_PASTRTERM": "2024.03.01",
                    "IT_HEADER_PAENDTERM": "2024.03.01",
                    "IT_HEADER_PRUEFLOS": "40000000012",
                    "IT_HEADER_ERSTELLER": "",
                    "IT_HEADER_ERSTELLER_NAME": "BATCH",
                    "IT_HEADER_ERSTELDAT": "2024.03.01",
                    "IT_HEADER_SNOTE":"",

                    "TEST_CHECK" : false, // 검사 여부
                    "ERP_CHECK" : false, // erp 전송 여부
                },
                {
                    "IT_HEADER_WERKS": "1002",
                    "IT_HEADER_WERKS_TX": "SL-시화생산센터",
                    "IT_HEADER_MATNR": "127530",
                    "IT_HEADER_MAKTX": "사누끼 면",
                    "IT_HEADER_AUFNR": "1000006",
                    "IT_HEADER_MDV01": "SLS103",
                    "IT_HEADER_KTEXT": "1-3라인",
                    "IT_HEADER_KTEXTLOS": "2024.03.19 공정순회검사",
                    "IT_HEADER_LOSMENGE": "120",
                    "IT_HEADER_MENGENEINH": "EA",
                    "IT_HEADER_STATUSTEXT": "REL CALC",
                    "IT_HEADER_PASTRTERM": "2024.03.01",
                    "IT_HEADER_PAENDTERM": "2024.03.01",
                    "IT_HEADER_PRUEFLOS": "40000000014",
                    "IT_HEADER_ERSTELLER": "",
                    "IT_HEADER_ERSTELLER_NAME": "BATCH",
                    "IT_HEADER_ERSTELDAT": "2024.03.01",
                    "IT_HEADER_SNOTE":"",

                    "TEST_CHECK" : false, // 검사 여부
                    "ERP_CHECK" : false, // erp 전송 여부
                }
            ]

            const IT_DETAIL = [{
                "IT_DETAIL_PRUEFLOS": "40000000012",
                "IT_DETAIL_MERKNR": "10000001",
                "IT_DETAIL_VERWMERKM": "",
                "IT_DETAIL_KURZTEXT": "1차 온도",
                "IT_DETAIL_QMSPEC": "22 ~ 31",
                "IT_DETAIL_TOLERANZOB": "22",
                "IT_DETAIL_TOLERANZUN": "31",
                "IT_DETAIL_PRUEFUMF": "10",
                "IT_DETAIL_PROBEMGEH": "",
                "IT_DETAIL_ORIGINAL_INPUT": "",
                "IT_DETAIL_ORIGINAL_INPUT_R": "",
                "IT_DETAIL_CONF": "",
                "IT_DETAIL_INVALID" : "",
                "IT_DETAIL_VALUATION" : "A",
                "IT_DETAIL_PRUEFBEMKT": "",
                "IT_DETAIL_PROBLEM": "",
                "IT_DETAIL_REASON": "",
                "IT_DETAIL_SOLVE": "",
            },
            {
                "IT_DETAIL_PRUEFLOS": "40000000012",
                "IT_DETAIL_MERKNR": "10000002",
                "IT_DETAIL_VERWMERKM": "",
                "IT_DETAIL_INVALID" : "",
                "IT_DETAIL_KURZTEXT": "분할 중량",
                "IT_DETAIL_QMSPEC": "500 ~ 520",
                "IT_DETAIL_TOLERANZOB": "500",
                "IT_DETAIL_TOLERANZUN": "520",
                "IT_DETAIL_PRUEFUMF": "10",
                "IT_DETAIL_PROBEMGEH": "",
                "IT_DETAIL_VALUATION" : "A",
                "IT_DETAIL_ORIGINAL_INPUT": "",
                "IT_DETAIL_ORIGINAL_INPUT_R": "",
                "IT_DETAIL_CONF": "",
                "IT_DETAIL_PRUEFBEMKT": "",
                "IT_DETAIL_PROBLEM": "",
                "IT_DETAIL_REASON": "",
                "IT_DETAIL_SOLVE": "",
            },
            {

                "IT_DETAIL_PRUEFLOS": "40000000014",
                "IT_DETAIL_MERKNR": "10000001",
                "IT_DETAIL_VERWMERKM": "",
                "IT_DETAIL_KURZTEXT": "1차 온도",
                "IT_DETAIL_QMSPEC": "",
                "IT_DETAIL_INVALID" : "",
                "IT_DETAIL_TOLERANZOB": "22",
                "IT_DETAIL_TOLERANZUN": "31",
                "IT_DETAIL_PRUEFUMF": "1",
                "IT_DETAIL_VALUATION" : "A",
                "IT_DETAIL_PROBEMGEH": "",
                "IT_DETAIL_ORIGINAL_INPUT": "",
                "IT_DETAIL_ORIGINAL_INPUT_R": "",
                "IT_DETAIL_CONF": "",
                "IT_DETAIL_PRUEFBEMKT": "",
                "IT_DETAIL_PROBLEM": "",
                "IT_DETAIL_REASON": "",
                "IT_DETAIL_SOLVE": "",
            }
            ]

            const IT_MULTI = [{
                "IT_MULTI_MERKNR": "10000001",
                "IT_MULTI_DETAILERG": "10",
                "IT_MULTI_ORIGINAL_INPUT": "",
                "IT_MULTI_MBEWERTG": "",
                "IT_MULTI_BEFORE_INPUT": "",
                "IT_MULTI_TOLERANZOB": 22,
                "IT_MULTI_TOLERANZUN": 31
            },
            {
                "IT_MULTI_MERKNR": "10000002",
                "IT_MULTI_DETAILERG": "10",
                "IT_MULTI_ORIGINAL_INPUT": "",
                "IT_MULTI_MBEWERTG": "",
                "IT_MULTI_BEFORE_INPUT": "",
                "IT_MULTI_TOLERANZOB": 500,
                "IT_MULTI_TOLERANZUN": 520
            }]

            if (!localStorage.getItem("IT_HEADER_MODEL")) {
                localStorage.setItem("IT_HEADER_MODEL", JSON.stringify(IT_HEADER));
                this.getView().setModel(new JSONModel(IT_HEADER), "IT_HEADER_MODEL");
            } else {
                this.getView().setModel(new JSONModel(JSON.parse(localStorage.getItem("IT_HEADER_MODEL"))), "IT_HEADER_MODEL");
            }
            if (!localStorage.getItem("IT_DETAIL_MODEL")) {
                localStorage.setItem("IT_DETAIL_MODEL", JSON.stringify(IT_DETAIL));
                this.getView().setModel(new JSONModel(IT_DETAIL), "IT_DETAIL_MODEL");
            } else {
                this.getView().setModel(new JSONModel(JSON.parse(localStorage.getItem("IT_DETAIL_MODEL"))), "IT_DETAIL_MODEL");
            }
            
        },

        onDateCheck: function (oEvent) {
            let check = true;
            if (!this.globalCheck("Input", _this) && !this.globalCheck("Date", _this)) {
                check = false
            }
            this._onEnabled(this.globalCheck("Input", _this), this.globalCheck("Date", _this), check);


            let selectObj = oEvent.getSource().getId();
            let I_GSTRP = this.byId("I_GSTRP").getDateValue();
            let I_GLTRP = this.byId("I_GLTRP").getDateValue();
            let PASTRTERM = this.byId("PASTRTERM").getDateValue();
            let PAENDTERM = this.byId("PAENDTERM").getDateValue();

            let nowDate2 = this._DateSet(PASTRTERM);
            this.byId("PAENDTERM").setMinDate(new Date(nowDate2));
            this.byId("PAENDTERM").setMaxDate(new Date(this._DateSet2(nowDate2)));
            if (selectObj.includes("I_GSTRP")) {
                if (I_GSTRP && I_GLTRP) {
                    if (I_GSTRP > I_GLTRP) {
                        oEvent.getSource().setValueState("Error");
                        oEvent.getSource().setValue("");
                        this.byId("PAENDTERM").setValue("");
                    } else {
                        oEvent.getSource().setValueState("None");
                        let nowDate2 = this._DateSet(PASTRTERM);
                        this.byId("PAENDTERM").setMinDate(new Date(nowDate2));
                        this.byId("PAENDTERM").setMaxDate(new Date(this._DateSet2(nowDate2)));
                    }
                }
            } else if (selectObj.includes("I_GLTRP")) { 
                if (I_GSTRP && I_GLTRP) {
                    if (I_GSTRP > I_GLTRP) {
                        oEvent.getSource().setValueState("Error");
                        oEvent.getSource().setValue("");
                    } else {
                        oEvent.getSource().setValueState("None");
                    }
                }
            } else if (selectObj.includes("PASTRTERM")) {
                if (PASTRTERM && PAENDTERM) {
                    if (PASTRTERM > PAENDTERM) {
                        oEvent.getSource().setValueState("Error");
                        oEvent.getSource().setValue("");
                    } else {
                        oEvent.getSource().setValueState("None");
                        let nowDate2 = this._DateSet(PASTRTERM);
                        this.byId("PAENDTERM").setMinDate(new Date(nowDate2));
                        this.byId("PAENDTERM").setMaxDate(new Date(this._DateSet2(nowDate2)));
                    }
                }
            } else if (selectObj.includes("PAENDTERM")) {
                if (PASTRTERM && PAENDTERM) {
                    if (PASTRTERM > PAENDTERM) {
                        oEvent.getSource().setValueState("Error");
                        oEvent.getSource().setValue("");
                    } else {
                        oEvent.getSource().setValueState("None");
                    }
                }
            }

            
        },

        onLiveChange: function (oEvent) {
            let sValue = oEvent.getSource().getValue();
            let oModel = this.getView().getModel("IT_HEADER_MODEL");
            let oData = oModel.getData();

            if (sValue) {
                if (!this.globalCheck("Input", _this) && !this.globalCheck("Date", _this)) {
                    this._onEnabled(true, true, false);
                } else {
                    this._onEnabled(true, true, true);
                }
                for (let i = 0; i < oData.length; i++) {
                    if (String(sValue) === String(oData[i].IT_HEADER_WERKS)){
                        oEvent.getSource().setValueState("None")
                        break;
                    } else {
                        oEvent.getSource().setValueState("Error")
                        oEvent.getSource().setValueStateText("플랜트가 일치하지 않습니다.");
                    }
                }
            }
            
        },

        _onEnabled: function (first, second, bool) {
            if (first) {
                this.byId("I_WERKS").setEnabled(true);
            } else {
                this.byId("I_WERKS").setEnabled(false);
            }
            this.byId("I_MATNR").setEnabled(bool);
            this.byId("I_AUFNR").setEnabled(bool);
            this.byId("mdv").setEnabled(bool);
            this.byId("I_GSTRP").setEnabled(bool);
            this.byId("I_GLTRP").setEnabled(bool);
            this.byId("PAENDTERM").setEnabled(bool);
            if (second) {
                this.byId("PASTRTERM").setEnabled(true);
            } else {
                this.byId("PASTRTERM").setEnabled(false);
            }
        },

        onSearchBtn: function () {
            let I_WERKS = this.byId("I_WERKS").getValue();
            let I_MATNR = this.byId("I_MATNR").getValue();
            let I_AUFNR = this.byId("I_AUFNR").getValue();
            let mdv = this.byId("mdv").getSelectedKeys();
            let I_GSTRP = this.byId("I_GSTRP").getDateValue();
            let I_GLTRP = this.byId("I_GLTRP").getDateValue();
            let PASTRTERM = this.byId("PASTRTERM").getDateValue();
            let PAENDTERM = this.byId("PAENDTERM").getDateValue();

            let oHeaderData = this.getView().getModel("IT_HEADER_MODEL").getData();
            let oDetailData = this.getView().getModel("IT_DETAIL_MODEL").getData();

            let check = true;
            for (let i = 0; i < oHeaderData.length; i++) {
                if (String(I_WERKS) === String(oHeaderData[i].IT_HEADER_WERKS)){
                    check = true;
                    break;
                } else {
                    check = false;
                }

            }
            if (!this.globalCheck("Input", _this) && !this.globalCheck("Date", _this)) {
                this._onEnabled(true, true, false);
                return;
            } else if (!this.globalCheck("Input", _this) || !this.globalCheck("Date", _this)){
                this._onEnabled(true, true, false);
                return;
            } else {
                if (check) {
                    this.byId("I_WERKS").setValueState("None")
                } else {
                    this.byId("I_WERKS").setValueState("Error")
                    this.byId("I_WERKS").setValueStateText("플랜트가 일치하지 않습니다.");
                    this._onEnabled(true, true, false);
                    return;
                }
            }
            // this._Popover();

            // console.log(I_WERKS);
            // console.log(I_MATNR);
            // console.log(I_AUFNR);
            // console.log(mdv);
            // console.log(gub2);
            // console.log(gub1);
            // console.log(I_GSTRP);
            // console.log(I_GLTRP);
            // console.log(PASTRTERM);
            // console.log(PAENDTERM);
            if (!this.globalCheck("Search", _this)){
                MessageToast.show("값이 올바르지 않습니다.");
                return;
            }

            let filterData = oHeaderData.filter(function(item) {
                return String(item["IT_HEADER_AUFNR"]).includes(I_AUFNR);
            })
            let filterDetailData = oDetailData.filter(function(item) {
                return String(item["IT_HEADER_AUFNR"]).includes(I_AUFNR);
            })
            // console.log(filterData);
            // let oFilter = [];
            // oFilter.push(new Filter("IT_HEADER_WERKS", FilterOperator.Contains, I_WERKS));
            // oFilter.push(new Filter("IT_HEADER_MATNR", FilterOperator.Contains, I_MATNR));
            // oFilter.push(new Filter("IT_HEADER_PRUEFLOS", FilterOperator.Contains, I_AUFNR));
            // oFilter.push(new Filter("IT_HEADER_MDV01", FilterOperator.BT, mdv1_1, mdv1_2));
            // oFilter.push(new Filter("IT_HEADER_ZZGUB2", FilterOperator.BT, gub2_1, gub2_2));
            // oFilter.push(new Filter("IT_HEADER_ZZGUB1", FilterOperator.BT, gub1_1, gub1_2));
            // oFilter.push(new Filter("IT_HEADER_ERSTELDAT", FilterOperator.BT, I_GSTRP, I_GLTRP));
            // oFilter.push(new Filter("IT_HEADER_ERSTELLER_PASTRTERM", FilterOperator.BT, PASTRTERM, PAENDTERM));


            let sortData = this._SortData(filterData, "IT_HEADER_PRUEFLOS", "IT_HEADER_MDV01", "IT_HEADER_MATNR", "IT_HEADER_WERKS");
            localStorage.setItem("SearchData", JSON.stringify(sortData));
            console.log(sortData);
            localStorage.setItem("Search_IT_DetailData", JSON.stringify(filterDetailData));
            this.getOwnerComponent().getRouter().navTo("spc2_2");
        },

        _SortData: function (jData, sortName1, sortName2, sortName3, sortName4) {
            let sortData = jData.sort((a, b) => a[sortName4].localeCompare(b[sortName4]) || a[sortName3].localeCompare(b[sortName3]) || a[sortName2].localeCompare(b[sortName2]) ||  a[sortName1].localeCompare(b[sortName1]));
            // console.log(sortData);
            return sortData;
        },

        // fieldGroupId를 기반으로 유효성 검사
        globalCheck: function (fieldGroupId, _this) {
            let that = this;
            let checkList = [];
            let grouparray = fieldGroupId.split(",");
            for (let i = 0; i < grouparray.length; i++) {
                _this.getView().getControlsByFieldGroupId(grouparray[i]).forEach(function (object) {
                    checkList.push(that.fieldCheck(object));
                })
            }

            for (let i = 0; i < checkList.length; i++) {
                if (!checkList[i]) {
                    return false;
                }
            }
            return true;
        },

        // 각 필드의 유효성 검사
        fieldCheck: function (object) {
            let check = false;

            if (object.isA("sap.m.MultiInput")) {
                if (!object.getTokens().length) {
                    check = this.requiredcheck(object);
                } else {
                    object.setValueState("None");
                    check = true;
                }
            } else if (object.isA("sap.m.TextArea")) {
                if (!object.getValue().length) {
                    check = this.requiredcheck(object);
                } else {
                    object.setValueState("None");
                    check = true;
                }
            } else if (object.isA(["sap.m.Input"])) {
                if (object.getValue().length == 0) {
                    check = this.requiredcheck(object);
                } else if (object.getFieldGroupIds().includes("Title")) {
                    if (object.getValue().length < 2) {
                        object.setValueState("Error");
                        object.setValueStateText("Enter a value with at least 2 characters.");
                    } else if (object.getValue().length > 50) {
                        object.setValueState("Error");
                        object.setValueStateText("Enter a value with no more than 50 characters.");
                    } else {
                        object.setValueState("None");
                        check = true;
                    }
                } else if (object.getFieldGroupIds().includes("Quantity")) {
                    if (object.getValue() == 0) {
                        object.setValueState("Error");
                        object.setValueStateText("Please enter an integer greater than 0.");
                    } else {
                        object.setValueState("None");
                        check = true;
                    }
                } else if (object.getFieldGroupIds().includes("Email")) {
                    let emailExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
                    if (object.getValue().match(emailExp) == null) {
                        object.setValueState("Error");
                        object.setValueStateText("Invalid email format.");
                    } else {
                        object.setValueState("None");
                        check = true;
                    }
                } else {
                    object.setValueState("None");
                    check = true;
                }
            } else if (object.isA("sap.m.ComboBox")) {
                if (object.getValue().length == 0) {
                    check = this.requiredcheck(object);
                } else {
                    object.setValueState("None");
                    check = true;
                }
            } else if (object.isA("sap.m.DatePicker")) {
                let dataValid = object.isValidValue();
                if (object.getValue().length == 0) {
                    check = this.requiredcheck(object);
                } else if (!dataValid) {
                    object.setValueState("Error");
                } else {
                    object.setValueState("None");
                    check = true;
                }
            } else if (object.isA("sap.m.TimePicker")) {
                if (object.getValue().length == 0) {
                    check = this.requiredcheck(object);
                } else {
                    object.setValueState("None");
                    check = true;
                }
            } else if (object.isA("sap.m.Select")) {
                if (object.getSelectedItem() == null) {
                    check = this.requiredcheck(object);
                } else {
                    object.setValueState("None");
                    check = true;
                }
            } else if (object.isA("sap.ui.richtexteditor.RichTextEditor")) {
                if (!!object.getValue().length) {
                    check = true;
                }
            } else if (object.isA("sap.m.CheckBox")) {
                check = object.getSelected();
            } else {
                check = true;
            }

            return check;
        },

        // fieldGroupId에 Required가 포함되어 있는지 체크
        requiredcheck: function (object) {
            if (object.getFieldGroupIds().includes("Required")) {
                object.setValueState("Error");
                return false;
            } else if (object.getFieldGroupIds().includes("Required2")) {
                object.setValueState("Error");
                return false;
            } else {
                object.setValueState("None");
                return true;
            }
        },
	});
});