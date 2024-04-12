sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageToast",
], function (Controller, JSONModel, Filter, FilterOperator, MessageToast) {
    "use strict";
    let _this;
    return Controller.extend("project1.controller.spc1", {
        onInit: function () {
            const myRoute = this.getOwnerComponent().getRouter().getRoute("spc1");
            myRoute.attachPatternMatched(this.onMyRoutePatternMatched, this);
        },
        onMyRoutePatternMatched: function () {
            this._globalVarSet();
            this._ViewData();
        },

        _globalVarSet: function () {
            _this = this;
            let ersteller_pastrterm1 = this.byId("ersteller_pastrterm1");
            let ersteller_pastrterm2 = this.byId("ersteller_pastrterm2");
            let now = this._DateSet(new Date());
            ersteller_pastrterm1.setValue(now);
            let nowDate2 = this._DateSet(ersteller_pastrterm1.getDateValue());
            ersteller_pastrterm2.setMinDate(new Date(nowDate2));
            ersteller_pastrterm2.setMaxDate(new Date(this._DateSet2(nowDate2)));
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
            
            let IT_HEADER = [
                {
                    "IT_HEADER_WERKS" : "1002",      // 플랜트
                    "IT_HEADER_NAME1" : "SL-시화생산센터",      // 플랜트 내역
                    "IT_HEADER_MDV01" : "SLS101",      // 생산라인
                    "IT_HEADER_KTEXT" : "(1-1호)",      // 생산라인명
                    "IT_HEADER_MATNR" : "127528",      // 자재코드
                    "IT_HEADER_MAKTX" : "샌드위치 토스트",      // 자재내역
                    "IT_HEADER_ZZGUB2" : "완제품",      // 구분
                    "IT_HEADER_ZZGUB1" : "주간",      // 근무조
                    "IT_HEADER_ZZLOTID" : "202403290001",      // LOT No.
                    "IT_HEADER_PRUEFLOS" : "40000000012",      // 검사로트(PK)
                    "IT_HEADER_LOSMENGE" : 100,      // 검사수량
                    "IT_HEADER_MENGENEINH" : "EA",      // 단위
                    "IT_HEADER_STATUSTEXT" : "REL CALC",      // 검사로트 상태
                    "IT_HEADER_ERSTELLER_PASTRTERM" : "2024.03.01",      // 검사시작일
                    "IT_HEADER_ERSTELLER_NAME" : "BATCH",      // 생성자
                    "IT_HEADER_ERSTELDAT" : "2024.03.01",      // 생성일

                    "TEST_CHECK" : false,  // 검사 여부
                    "ERP_CHECK" : false, // erp 전송 여부

                    "IT_HEADER_REASON" : "",
                    "IT_HEADER_SOLVE" : "",
                    "IT_HEADER_RESULT" : "",
                },
                {
                    "IT_HEADER_WERKS" : "1003",      // 플랜트
                    "IT_HEADER_NAME1" : "SL-시화생산센터",      // 플랜트 내역
                    "IT_HEADER_MDV01" : "SLS102",      // 생산라인
                    "IT_HEADER_KTEXT" : "(1-2호)각형식빵",      // 생산라인명
                    "IT_HEADER_MATNR" : "127529",      // 자재코드
                    "IT_HEADER_MAKTX" : "햄버거 번",      // 자재내역
                    "IT_HEADER_ZZGUB2" : "충전",      // 구분
                    "IT_HEADER_ZZGUB1" : "주간",      // 근무조
                    "IT_HEADER_ZZLOTID" : "202403290001",      // LOT No.
                    "IT_HEADER_PRUEFLOS" : "40000000013",      // 검사로트
                    "IT_HEADER_LOSMENGE" : 300,      // 검사수량
                    "IT_HEADER_MENGENEINH" : "EA",      // 단위
                    "IT_HEADER_STATUSTEXT" : "REL CALC",      // 검사로트 상태
                    "IT_HEADER_ERSTELLER_PASTRTERM" : "2024.03.01",      // 검사시작일
                    "IT_HEADER_ERSTELLER_NAME" : "BATCH",      // 생성자
                    "IT_HEADER_ERSTELDAT" : "2024.03.02",      // 생성일

                    "TEST_CHECK" : false, // 검사 여부
                    "ERP_CHECK" : false, // erp 전송 여부

                    "IT_HEADER_REASON" : "",
                    "IT_HEADER_SOLVE" : "",
                    "IT_HEADER_RESULT" : "",
                },
                {
                    "IT_HEADER_WERKS" : "1004",      // 플랜트
                    "IT_HEADER_NAME1" : "SL-시화생산센터",      // 플랜트 내역
                    "IT_HEADER_MDV01" : "SLS103",      // 생산라인
                    "IT_HEADER_KTEXT" : "(1-3호)햄버거",      // 생산라인명
                    "IT_HEADER_MATNR" : "127530",      // 자재코드
                    "IT_HEADER_MAKTX" : "사누끼면",      // 자재내역
                    "IT_HEADER_ZZGUB2" : "완제품",      // 구분
                    "IT_HEADER_ZZGUB1" : "야간",      // 근무조
                    "IT_HEADER_ZZLOTID" : "202403290001",      // LOT No.
                    "IT_HEADER_PRUEFLOS" : "40000000014",      // 검사로트
                    "IT_HEADER_LOSMENGE" : 120,      // 검사수량
                    "IT_HEADER_MENGENEINH" : "EA",      // 단위
                    "IT_HEADER_STATUSTEXT" : "REL CALC",      // 검사로트 상태
                    "IT_HEADER_ERSTELLER_PASTRTERM" : "2024.03.01",      // 검사시작일
                    "IT_HEADER_ERSTELLER_NAME" : "BATCH",      // 생성자
                    "IT_HEADER_ERSTELDAT" : "2024.03.03",      // 생성일

                    "TEST_CHECK" : false, // 검사 여부
                    "ERP_CHECK" : false, // erp 전송 여부

                    "IT_HEADER_REASON" : "",
                    "IT_HEADER_SOLVE" : "",
                    "IT_HEADER_RESULT" : "",
                },
                {
                    "IT_HEADER_WERKS" : "1005",      // 플랜트
                    "IT_HEADER_NAME1" : "SL-시화생산센터",      // 플랜트 내역
                    "IT_HEADER_MDV01" : "SLS104",      // 생산라인
                    "IT_HEADER_KTEXT" : "(1-4호)패스츄리",      // 생산라인명
                    "IT_HEADER_MATNR" : "127531",      // 자재코드
                    "IT_HEADER_MAKTX" : "대니쉬",      // 자재내역
                    "IT_HEADER_ZZGUB2" : "충전",      // 구분
                    "IT_HEADER_ZZGUB1" : "야간",      // 근무조
                    "IT_HEADER_ZZLOTID" : "202403290001",      // LOT No.
                    "IT_HEADER_PRUEFLOS" : "40000000015",      // 검사로트
                    "IT_HEADER_LOSMENGE" : 200,      // 검사수량
                    "IT_HEADER_MENGENEINH" : "EA",      // 단위
                    "IT_HEADER_STATUSTEXT" : "REL CALC",      // 검사로트 상태
                    "IT_HEADER_ERSTELLER_PASTRTERM" : "2024.03.01",      // 검사시작일
                    "IT_HEADER_ERSTELLER_NAME" : "BATCH",      // 생성자
                    "IT_HEADER_ERSTELDAT" : "2024.03.04",      // 생성일

                    "TEST_CHECK" : false, // 검사 여부
                    "ERP_CHECK" : false, // erp 전송 여부

                    "IT_HEADER_REASON" : "",
                    "IT_HEADER_SOLVE" : "",
                    "IT_HEADER_RESULT" : "",
                },
                {
                    "IT_HEADER_WERKS" : "1006",      // 플랜트
                    "IT_HEADER_NAME1" : "SL-시화생산센터",      // 플랜트 내역
                    "IT_HEADER_MDV01" : "SLS105",      // 생산라인
                    "IT_HEADER_KTEXT" : "(1-5호)일반1호",      // 생산라인명
                    "IT_HEADER_MATNR" : "127532",      // 자재코드
                    "IT_HEADER_MAKTX" : "발효종 식빵",      // 자재내역
                    "IT_HEADER_ZZGUB2" : "충전",      // 구분
                    "IT_HEADER_ZZGUB1" : "주간",      // 근무조
                    "IT_HEADER_ZZLOTID" : "202403290001",      // LOT No.
                    "IT_HEADER_PRUEFLOS" : 40000000016,      // 검사로트
                    "IT_HEADER_LOSMENGE" : 400,      // 검사수량
                    "IT_HEADER_MENGENEINH" : "EA",      // 단위
                    "IT_HEADER_STATUSTEXT" : "REL CALC",      // 검사로트 상태
                    "IT_HEADER_ERSTELLER_PASTRTERM" : "2024.03.01",      // 검사시작일
                    "IT_HEADER_ERSTELLER_NAME" : "BATCH",      // 생성자
                    "IT_HEADER_ERSTELDAT" : "2024.03.05",      // 생성일

                    "TEST_CHECK" : false, // 검사 여부
                    "ERP_CHECK" : false, // erp 전송 여부

                    "IT_HEADER_REASON" : "",
                    "IT_HEADER_SOLVE" : "",
                    "IT_HEADER_RESULT" : "",
                }
            ]
            let IT_DETAIL = [
                {
                    "IT_DETAIL_PRUEFLOS": "40000000012", // 검사로트 번호
                    "IT_DETAIL_MERKNR": "임시 검사항목 번호 1", // 검사항목 번호
                    "IT_DETAIL_VERWMERKM": "1002", // 검사항목 코드
                    "IT_DETAIL_KURZTEXT": "SL-시화생산센터", // 검사항목 내역
                    "IT_DETAIL_QMSPEC": "샌드위치 토스트", // 사양
                    "IT_DETAIL_SOLLWERT": "40", // 목표값
                    "IT_DETAIL_TOLERANZOB": "38", // 사양 하한값
                    "IT_DETAIL_TOLERANZUN": "42", // 사양 상한값
                    "IT_DETAIL_PRUEFUMF": "100", // 검사 수량
                    "IT_DETAIL_PROBEMGEH": "EA", // 단위
                    "IT_DETAIL_ORIGINAL_INPUT": "" // 입력
                },
                {
                    "IT_DETAIL_PRUEFLOS": "40000000013",
                    "IT_DETAIL_MERKNR": "임시 검사항목 번호 2",
                    "IT_DETAIL_VERWMERKM": "1003",
                    "IT_DETAIL_KURZTEXT": "SL-시화생산센터",
                    "IT_DETAIL_QMSPEC": "햄버거 번",
                    "IT_DETAIL_SOLLWERT": "30",
                    "IT_DETAIL_TOLERANZOB": "28",
                    "IT_DETAIL_TOLERANZUN": "32",
                    "IT_DETAIL_PRUEFUMF": "300",
                    "IT_DETAIL_PROBEMGEH": "EA",
                    "IT_DETAIL_ORIGINAL_INPUT": ""
                },
                {
                    "IT_DETAIL_PRUEFLOS": "40000000014",
                    "IT_DETAIL_MERKNR": "임시 검사항목 번호 3",
                    "IT_DETAIL_VERWMERKM": "1004",
                    "IT_DETAIL_KURZTEXT": "SL-시화생산센터",
                    "IT_DETAIL_QMSPEC": "사누끼면",
                    "IT_DETAIL_SOLLWERT": "25",
                    "IT_DETAIL_TOLERANZOB": "22",
                    "IT_DETAIL_TOLERANZUN": "28",
                    "IT_DETAIL_PRUEFUMF": "120",
                    "IT_DETAIL_PROBEMGEH": "EA",
                    "IT_DETAIL_ORIGINAL_INPUT": ""
                },
                {
                    "IT_DETAIL_PRUEFLOS": "40000000015",
                    "IT_DETAIL_MERKNR": "임시 검사항목 번호 4",
                    "IT_DETAIL_VERWMERKM": "1005",
                    "IT_DETAIL_KURZTEXT": "SL-시화생산센터",
                    "IT_DETAIL_QMSPEC": "대니쉬",
                    "IT_DETAIL_SOLLWERT": "50",
                    "IT_DETAIL_TOLERANZOB": "48",
                    "IT_DETAIL_TOLERANZUN": "52",
                    "IT_DETAIL_PRUEFUMF": "200",
                    "IT_DETAIL_PROBEMGEH": "EA",
                    "IT_DETAIL_ORIGINAL_INPUT": ""
                },
                {
                    "IT_DETAIL_PRUEFLOS": "40000000016",
                    "IT_DETAIL_MERKNR": "임시 검사항목 번호 5",
                    "IT_DETAIL_VERWMERKM": "1006",
                    "IT_DETAIL_KURZTEXT": "SL-시화생산센터",
                    "IT_DETAIL_QMSPEC": "발효종 식빵",
                    "IT_DETAIL_SOLLWERT": "60",
                    "IT_DETAIL_TOLERANZOB": "58",
                    "IT_DETAIL_TOLERANZUN": "62",
                    "IT_DETAIL_PRUEFUMF": "400",
                    "IT_DETAIL_PROBEMGEH": "EA",
                    "IT_DETAIL_ORIGINAL_INPUT": ""
                }
            ];
            this.getView().setModel(new JSONModel(IT_HEADER), "IT_HEADER_MODEL")
            this.getView().setModel(new JSONModel(IT_DETAIL), "IT_DETAIL_MODEL")
            console.log(this.getView().getModel("IT_HEADER_MODEL"));
        },
        onDateCheck: function (oEvent) {
            let selectObj = oEvent.getSource().getId();
            let ersteldat1 = this.byId("ersteldat1").getDateValue();
            let ersteldat2 = this.byId("ersteldat2").getDateValue();
            let ersteller_pastrterm1 = this.byId("ersteller_pastrterm1").getDateValue();
            let ersteller_pastrterm2 = this.byId("ersteller_pastrterm2").getDateValue();

            let nowDate2 = this._DateSet(ersteller_pastrterm1);
            this.byId("ersteller_pastrterm2").setMinDate(new Date(nowDate2));
            this.byId("ersteller_pastrterm2").setMaxDate(new Date(this._DateSet2(nowDate2)));
            console.log(ersteldat1 > ersteldat2);
            if (selectObj.includes("ersteldat1")) {
                if (ersteldat1 && ersteldat2) {
                    if (ersteldat1 > ersteldat2) {
                        oEvent.getSource().setValueState("Error");
                        oEvent.getSource().setValue("");
                        this.byId("ersteller_pastrterm2").setValue("");
                    } else {
                        oEvent.getSource().setValueState("None");
                        let nowDate2 = this._DateSet(ersteller_pastrterm1);
                        this.byId("ersteller_pastrterm2").setMinDate(new Date(nowDate2));
                        this.byId("ersteller_pastrterm2").setMaxDate(new Date(this._DateSet2(nowDate2)));
                    }
                }
            } else if (selectObj.includes("ersteldat2")) { 
                if (ersteldat1 && ersteldat2) {
                    if (ersteldat1 > ersteldat2) {
                        oEvent.getSource().setValueState("Error");
                        oEvent.getSource().setValue("");
                    } else {
                        oEvent.getSource().setValueState("None");
                    }
                }
            } else if (selectObj.includes("ersteller_pastrterm1")) {
                if (ersteller_pastrterm1 && ersteller_pastrterm2) {
                    if (ersteller_pastrterm1 > ersteller_pastrterm2) {
                        oEvent.getSource().setValueState("Error");
                        oEvent.getSource().setValue("");
                    } else {
                        oEvent.getSource().setValueState("None");
                        let nowDate2 = this._DateSet(ersteller_pastrterm1);
                        this.byId("ersteller_pastrterm2").setMinDate(new Date(nowDate2));
                        this.byId("ersteller_pastrterm2").setMaxDate(new Date(this._DateSet2(nowDate2)));
                    }
                }
            } else if (selectObj.includes("ersteller_pastrterm2")) {
                if (ersteller_pastrterm1 && ersteller_pastrterm2) {
                    if (ersteller_pastrterm1 > ersteller_pastrterm2) {
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
            if (sValue) {
                oEvent.getSource().setValueState("None")
            }
        },
        
        onSearchBtn: function () {
            let werks = this.byId("werks").getValue();
            let matnr = this.byId("matnr").getValue();
            let prueflos = this.byId("prueflos").getValue();
            let mdv = this.byId("mdv").getSelectedKeys();
            let gub2 = this.byId("gub2").getSelectedKeys();
            let gub1 = this.byId("gub1").getSelectedKeys();
            let ersteldat1 = this.byId("ersteldat1").getDateValue();
            let ersteldat2 = this.byId("ersteldat2").getDateValue();
            let ersteller_pastrterm1 = this.byId("ersteller_pastrterm1").getDateValue();
            let ersteller_pastrterm2 = this.byId("ersteller_pastrterm2").getDateValue();

            console.log(werks);
            console.log(matnr);
            console.log(prueflos);
            console.log(mdv);
            console.log(gub2);
            console.log(gub1);
            console.log(ersteldat1);
            console.log(ersteldat2);
            console.log(ersteller_pastrterm1);
            console.log(ersteller_pastrterm2);
            if (!this.globalCheck("Search", _this)){
                MessageToast.show("값이 올바르지 않습니다.");
                return;
            }


            let oHeaderData = this.getView().getModel("IT_HEADER_MODEL").getData();
            let oDetailData = this.getView().getModel("IT_DETAIL_MODEL").getData();

            let filterData = oHeaderData.filter(function(item) {
                return String(item["IT_HEADER_PRUEFLOS"]).includes(prueflos);
            })
            let filterDetailData = oDetailData.filter(function(item) {
                return String(item["IT_HEADER_PRUEFLOS"]).includes(prueflos);
            })
            console.log(filterData);
            // let oFilter = [];
            // oFilter.push(new Filter("IT_HEADER_WERKS", FilterOperator.Contains, werks));
            // oFilter.push(new Filter("IT_HEADER_MATNR", FilterOperator.Contains, matnr));
            // oFilter.push(new Filter("IT_HEADER_PRUEFLOS", FilterOperator.Contains, prueflos));
            // oFilter.push(new Filter("IT_HEADER_MDV01", FilterOperator.BT, mdv1_1, mdv1_2));
            // oFilter.push(new Filter("IT_HEADER_ZZGUB2", FilterOperator.BT, gub2_1, gub2_2));
            // oFilter.push(new Filter("IT_HEADER_ZZGUB1", FilterOperator.BT, gub1_1, gub1_2));
            // oFilter.push(new Filter("IT_HEADER_ERSTELDAT", FilterOperator.BT, ersteldat1, ersteldat2));
            // oFilter.push(new Filter("IT_HEADER_ERSTELLER_PASTRTERM", FilterOperator.BT, ersteller_pastrterm1, ersteller_pastrterm2));


            let sortData = this._SortData(filterData, "IT_HEADER_PRUEFLOS", "IT_HEADER_MATNR", "IT_HEADER_MDV01");
            localStorage.setItem("SearchData", JSON.stringify(sortData));
            localStorage.setItem("Search_IT_DetailData", JSON.stringify(filterDetailData));
            this.getOwnerComponent().getRouter().navTo("spc2");
        },

        _SortData: function (jData, sortName1, sortName2, sortName3) {
            let sortData = jData.sort((a, b) => a[sortName3].localeCompare(b[sortName3]) || a[sortName2].localeCompare(b[sortName2]) ||  a[sortName1].localeCompare(b[sortName1]));
            console.log(sortData);
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
