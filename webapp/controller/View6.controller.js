sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment",
    "sap/m/MessageToast",
    "sap/m/MessageBox",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/export/Spreadsheet",
    "sap/m/PDFViewer",
    "sap/base/security/URLWhitelist",
], function (Controller,
	JSONModel,
	Fragment,
	MessageToast,
	MessageBox,
	Filter,
	FilterOperator,
	Spreadsheet,
	PDFViewer,
	URLWhitelist,) {
    "use strict";


    return Controller.extend("project1.controller.View6", {
        onInit: function () {
            const myRoute = this.getOwnerComponent().getRouter().getRoute("View6");
            myRoute.attachPatternMatched(this.onMyRoutePatternMatched, this);
        },
        onMyRoutePatternMatched: function () {
            let check = {
                'DS' : 'JIT'
            };

            var save = {
                'save' : 'notSave'
            };





            this.getView().setModel(new JSONModel(save), "save");
            this.getView().setModel(new JSONModel(check), "check");

            this.onDataView();

        },
        onDataView: function () {
            this.byId("miTablebox").setVisible(true);
            this.byId("dsiTable").setVisible(true);
            this.byId("bliTable").setVisible(true);
            let vender = [
                { vendorName : 'Hyundai Auto Parts' },
                { vendorName : 'Kia Auto Parts' },
                { vendorName : 'Samsung Auto Parts' }
            ];

            let plant = [
                { plantName : 'Yangjae Plant' },
                { plantName : 'Ulsan Plant' },
                { plantName : 'Asan Plant' }
            ];

            let material = [
                { materialName : 'HX1245' },
                { materialName : 'HM6723' },
                { materialName : 'HP8311' },
                { materialName : 'HW5620' },
                { materialName : 'HT3422' }
            ];

            let gate = [
                { gateName : 'Gate A' },
                { gateName : 'Gate B' },
                { gateName : 'Gate C' },
                { gateName : 'Gate D' }
            ]

            this.getView().setModel(new JSONModel(vender), "vendorList");
            this.getView().setModel(new JSONModel(plant), "plantList");
            this.getView().setModel(new JSONModel(material), "materialList");
            this.getView().setModel(new JSONModel(gate), "gateList");
            this.getView().getModel("check").setProperty("/check", 'DS')
        },
        onExecute: function () {
            let radioCheck = this.getView().getModel("check").getProperty("/check");

            let venderValue = this.byId("vendorSearch").getValue();
            let plantValue = this.byId("plantSearch").getValue();
            let matValue = this.byId("matSearch").getValue();

            if (!venderValue || !plantValue || !matValue) {
                if (!venderValue) {
                    this.byId("vendorSearch").setValueState('Error');
                } else {
                    this.byId("vendorSearch").setValueState('None');
                }
                if (!plantValue) {
                    this.byId("plantSearch").setValueState('Error');
                } else {
                    this.byId("plantSearch").setValueState('None');
                }
                if (!matValue) {
                    this.byId("matSearch").setValueState('Error');
                } else {
                    this.byId("matSearch").setValueState('None');
                }
                
                MessageBox.show("검색 조건을 확인해주세요.");
                return;
            }

            this.getView().getModel("save").setProperty("/save", 'notSave');

            this.getView().getModel("save").refresh();

            this.byId("vendorSearch").setValueState('None');
            this.byId("plantSearch").setValueState('None');
            this.byId("matSearch").setValueState('None');

            this.globalClear('Save',this);
            this.byId("pdf").setEnabled(false);
            this.byId("excel").setEnabled(false);
            this.byId("dp1_1").setMinDate(new Date());

            if (radioCheck === 'DS') {
                if (this.getView().getModel("subData")) {
                    this.getView().getModel("subData").setData([]);
                }
                this.onExecuteDataDS();
                this.getView().getModel("mainData").refresh()
            } else {
                if (this.getView().getModel("mainData")) {
                    this.getView().getModel("mainData").setData([]);
                }
                this.onExecuteDataJIT();
                this.getView().getModel("subData").refresh()
            }
            MessageToast.show("검색 되었습니다.");
        },
        onCheckDate: function (oEvent) {
            let sId = oEvent.getSource().getId();
            console.log();
            let dd = this.byId("dp1_1").getDateValue();
            let ad = this.byId("dp2_1").getDateValue();
            if (sId.includes('dp1_1')) {
                this.getView().byId("dp2_1").setMinDate(dd);
                this.getView().byId("dp1_1").setValueState("None");
            } else if (sId.includes('dp2_1')) {
                this.getView().byId("dp1_1").setMaxDate(ad);
                this.getView().byId("dp2_1").setValueState("None");
            }

            if (dd && ad) {
                if (sId.includes('dp1_1') && ad) {
                    if(oEvent.getSource().getDateValue() > ad) {
                        oEvent.getSource().setDateValue("");
                        MessageBox.show("날짜을 다시 설정해주세요");
                        return;
                    }
                } else if (sId.includes('dp2_1') && dd) {
                    if(oEvent.getSource().getDateValue() < dd) {
                        oEvent.getSource().setDateValue("");
                        MessageBox.show("날짜을 다시 설정해주세요");
                        return;
                    }
                }
            }
        },
        onCheckTime: function (oEvent) {
            let sId = oEvent.getSource().getId();
            console.log(sId);
            let dd = this.byId("dp1_1").getDateValue();
            let ad = this.byId("dp2_1").getDateValue();
            let dt = this.byId("dp1_2").getDateValue();
            let at = this.byId("dp2_2").getDateValue();
            if (dd === ad) {
                if (sId.includes('dp1_2')) {
                    this.getView().byId("dp1_2").setValueState("None");
                } else if (sId.includes('dp2_2')) {
                    this.getView().byId("dp2_2").setValueState("None");
                }

                if (dt && at) {
                    if (sId.includes('dp1_2') && at) {
                        if(oEvent.getSource().getDateValue() > at) {
                            oEvent.getSource().setDateValue("");
                            MessageBox.show("시간을 다시 설정해주세요");
                            return;
                        }
                    } else if (sId.includes('dp2_2') && dt) {
                        if(oEvent.getSource().getDateValue() < dt) {
                            oEvent.getSource().setDateValue("");
                            MessageBox.show("시간을 다시 설정해주세요");
                            return;
                        }
                    }
                }
            }
            if (oEvent.getSource().getValue()) {
                let sIdValue = oEvent.getSource().getId().split('--');
                this.byId(sIdValue[2]).setValueState("None");
            }
        },
        onInputLiveChange: function(oEvent) {
            var sNewValue = oEvent.getParameter("value") || oEvent.getParameter("seletedItem");
            if (sNewValue) {
                if (oEvent.getSource().getId().includes("Phone")) {
                    let phone = oEvent.getSource().getValue();
                    console.log(String(phone).length);
                    if (String(phone).length !== 11) {
                        return;
                    }
                    this.byId("textDPhone").setText(phone.slice(0, 3) + "-" + phone.slice(3, 7) + "-" + phone.slice(7, 11));
                }
                oEvent.getSource().setValueState("None");
            }
        },
        onSaveData: function () {
            let radioCheck = this.getView().getModel("check").getProperty("/check");
            let oTable = this.getView().byId("DSTable");
            if (radioCheck === 'DS') {
                oTable = this.getView().byId("DSTable");
            } else {
                oTable = this.getView().byId("JITTable");
            }
            console.log(oTable.getRows().length);
            if (oTable.getRows().length < 1) {
                MessageBox.show("Execute를 먼저 실행해 주세요.");
                return;
            }


            let Vendor = this.byId("vendorSave").getValue();
            let dp1_1 = this.byId("dp1_1").getValue();
            let dp1_2 = this.byId("dp1_2").getValue();
            let Gate = this.byId("gateSave").getValue();
            let dp2_1 = this.byId("dp2_1").getValue();
            let dp2_2 = this.byId("dp2_2").getValue();
            let InvoiceNo = this.byId("inputInvoiceNo").getValue();
            let DTL = this.byId("selectDTL").getSelectedKey();
            let CarNo = this.byId("inputCarNo").getValue();
            let DName = this.byId("inputDName").getValue();
            let DPhone = this.byId("inputDPhone").getValue();

            if (!this.globalCheck('Save',this)) {
                MessageBox.show("입력값이 빈값이 존재하면 안됩니다.\n전부 입력(선택)해주세요.");
                return;
            }
            if (DName) {
                const regexString = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/\s-]/;
                if (regexString.test(DName) || !isNaN(parseInt(DName, 10))) {
                    MessageBox.show("이름엔 숫자 또는 특수문자가 포함될수 없습니다.\n다시 입력해주세요.");
                    this.byId("inputDName").setValue('');
                    return;
                }
            }
            if (DTL === "None") {
                MessageBox.show("Delivery to Location을 선택해주세요.");
                this.byId("selectDTL").setValueState("Error");
                return;
            }

            if (String(DPhone).length !== 11) {
                MessageBox.show("전화번호의 길이가 다릅니다.");
                this.byId("inputDPhone").setValue('');
                this.byId("inputDPhone").setValueState("Error");
                return;
            }
            let ASNnum = 1000000001;
            let ASNNO = Vendor.slice(0, 4) + Gate.slice(0, 4) + ASNnum;
            if (this.getView().getModel("save").getProperty("/saveASNNO") === ASNNO) {
                ASNnum++;
                ASNNO = Vendor.slice(0, 4) + Gate.slice(0, 4) + ASNnum;
            }
            this.byId("ASNNO").setText(ASNNO);
            console.log(ASNNO);
            this.getView().getModel("save").setProperty("/saveASNNO", ASNNO);
            this.getView().getModel("save").setProperty("/saveVendor", Vendor);
            this.getView().getModel("save").setProperty("/savedp1_1", dp1_1);
            this.getView().getModel("save").setProperty("/savedp1_2", dp1_2);
            this.getView().getModel("save").setProperty("/saveGate", Gate);
            this.getView().getModel("save").setProperty("/savedp2_1", dp2_1);
            this.getView().getModel("save").setProperty("/savedp2_2", dp2_2);
            this.getView().getModel("save").setProperty("/saveInvoiceNo", InvoiceNo);
            this.getView().getModel("save").setProperty("/saveCarNo", CarNo);
            this.getView().getModel("save").setProperty("/saveDTL", DTL);
            this.getView().getModel("save").setProperty("/saveDName", DName);
            this.getView().getModel("save").setProperty("/saveDPhone", DPhone);

            console.log(
                "---Save---\n" +
                "Vendor : " + Vendor + "\n" +
                "Departure Date : " + dp1_1 + " / " + dp1_2 + "\n" +
                "Gate : " + Gate + "\n" +
                "Arrival Date : " + dp2_1 + " / " + dp2_2 + "\n" +
                "ASN No : " + ASNNO + "\n" +
                "Invoice No : " + InvoiceNo + "\n" +
                "Car No : " + CarNo + "\n" +
                "Delivery to Location : " + DTL + "\n" +
                "Driver Name : " + DName + "\n" +
                "Driver Phone : " + DPhone + "\n" +
                "----------"
            );
            this.getView().getModel("save").setProperty("/save", 'save');
            this.byId("pdf").setEnabled(true);
            this.byId("excel").setEnabled(true);
            this.getView().getModel("save").refresh();
        },
        onSaveRefresh: function () {
            this.globalClear('Save',this);
            this.getView().setModel(null, "none");
            this.getView().getModel("save").setProperty("/save", 'notSave');
            this.byId("pdf").setEnabled(false);
            this.byId("excel").setEnabled(false);
            this.byId("dp1_1").setMinDate(new Date());
            this.getView().getModel("mainData").setData([]);
            this.getView().getModel("subData").setData([]);
            this.getView().getModel("none").refresh();
            this.getView().getModel("save").refresh();
        },
        onExecuteDataDS: function () {
            let data = [
                {
                    material : 'HX1245',
                    Description : 'Front Bumper Assembly',
                    ReqQty : '100',
                    ASNQty : '90',
                    Stock : '10',
                    perCase : '1',
                    BoxQty : '1',
                    DeliveryQty : '90',
                    GRType : 'Inbound',
                    Detail : 'DS1',
                    DeliverySchedule : [
                        {
                            Date : '2023.04.20',
                            Time : '10:30',
                            Req : '20'
                        },
                        {
                            Date : '2023.04.20',
                            Time : '15:30',
                            Req : '40'
                        }
                    ],
                    BoxLabel : [
                        {
                            boxLabel: 'DS1'
                        },
                        {
                            boxLabel: '10'
                        }
                    ]
                },
                {
                    material : 'HM6723',
                    Description : 'Rearview Mirror',
                    ReqQty : '200',
                    ASNQty : '180',
                    Stock : '20',
                    perCase : '1',
                    BoxQty : '1',
                    DeliveryQty : '180',
                    GRType : 'Inbound',
                    Detail : 'DS2',
                    DeliverySchedule : [
                        {
                            Date : '2023.05.30',
                            Time : '12:40',
                            Req : '50'
                        },
                        {
                            Date : '2023.05.30',
                            Time : '21:40',
                            Req : '100'
                        }
                    ],
                    BoxLabel : [
                        {
                            boxLabel: 'DS2'
                        },
                        {
                            boxLabel: '50'
                        }
                    ]
                },
                {
                    material : 'HP8311',
                    Description : 'Engine Oil Filter',
                    ReqQty : '150',
                    ASNQty : '140',
                    Stock : '10',
                    perCase : '1',
                    BoxQty : '1',
                    DeliveryQty : '10',
                    GRType : 'Inbound',
                    Detail : 'DS3',
                    DeliverySchedule : [
                        {
                            Date : '2023.07.30',
                            Time : '12:40',
                            Req : '50'
                        },
                        {
                            Date : '2023.07.30',
                            Time : '21:40',
                            Req : '100'
                        }
                    ],
                    BoxLabel : [
                        {
                            boxLabel: 'DS3'
                        },
                        {
                            boxLabel: '20'
                        }
                    ]
                },
                {
                    material : 'HW5620',
                    Description : 'Brake Pad Set',
                    ReqQty : '300',
                    ASNQty : '280',
                    Stock : '20',
                    perCase : '1',
                    BoxQty : '1',
                    DeliveryQty : '280',
                    GRType : 'Inbound',
                    Detail : 'DS4',
                    DeliverySchedule : [
                        {
                            Date : '2023.10.30',
                            Time : '12:40',
                            Req : '50'
                        },
                        {
                            Date : '2023.10.30',
                            Time : '21:40',
                            Req : '100'
                        }
                    ],
                    BoxLabel : [
                        {
                            boxLabel: 'DS4'
                        },
                        {
                            boxLabel: '25'
                        }
                    ]
                },
                {
                    material : 'HT3422',
                    Description : 'Headlight Assembly',
                    ReqQty : '250',
                    ASNQty : '240',
                    Stock : '10',
                    perCase : '1',
                    BoxQty : '1',
                    DeliveryQty : '240',
                    GRType : 'Inbound',
                    Detail : 'DS5',
                    DeliverySchedule : [
                        {
                            Date : '2023.12.30',
                            Time : '12:40',
                            Req : '50'
                        },
                        {
                            Date : '2023.12.30',
                            Time : '21:40',
                            Req : '100'
                        }
                    ],
                    BoxLabel : [
                        {
                            boxLabel: 'DS5'
                        },
                        {
                            boxLabel: '30'
                        }
                    ]
                }
            ];

            this.getView().setModel(new JSONModel(data), "mainData");
        },
        onExecuteDataJIT: function () {
            let data = [
                {
                    JITCallOrder : 'JIT001',
                    Material : 'HX1245',
                    Description : 'Front Bumper Assembly',
                    DeliveryDate : '2024-03-21',
                    DeliveryTime : '09:00',
                    RequestQty : '100',
                    DeliveryQty : '90',
                    BoxLabel : 'JIT1',
                    BoxQty : '1',
                    Stock : '10',
                    SafetyStock : '5'
                },
                {
                    JITCallOrder : 'JIT002',
                    Material : 'HM6723',
                    Description : 'Rearview Mirror',
                    DeliveryDate : '2024-03-22',
                    DeliveryTime : '10:30',
                    RequestQty : '150',
                    DeliveryQty : '120',
                    BoxLabel : 'JIT2',
                    BoxQty : '1',
                    Stock : '15',
                    SafetyStock : '6'
                }
            ];

            this.getView().setModel(new JSONModel(data), "subData");
        },
        onExecuteRefresh: function () {
            this.globalClear('Search', this);
            
            MessageToast.show("새로고침 되었습니다.");
        },
        onVendorValueHelp: function (oEvent) {
            let oView = this.getView();
            let InputValue = oEvent.getSource().getValue();

            console.log("VendorInputValue", InputValue);

            if (!this.nameDialog) {
                this.nameDialog = sap.ui.core.Fragment.load({
                    id : oView.getId(),
                    name : "project1.view.fragment.VendorValueHelpDialog",
                    controller : this
                }).then(function (oDialog) {
                    oView.addDependent(oDialog);
                    return oDialog;
                })
            }

            this.nameDialog.then(function (oDialog) {
                oDialog.open(InputValue);
            })
        },
        onVendorValueHelpSearch: function (oEvent) {
            let sValue = oEvent.getParameter("value");
            let oFilter = new Filter("vendorName", FilterOperator.Contains, sValue);
            oEvent.getSource().getBinding("items").filter([oFilter]);
        },
        onVendorValueHelpClose: function (oEvent) {
            let oSelectItem = oEvent.getParameter("selectedItem");
            oEvent.getSource().getBinding("items").filter([]);

            if (!oSelectItem) {
                return;
            }
            this.byId("vendorSearch").setValue(oSelectItem.getTitle());
            this.byId("vendorSearch").setValueState("None");

            // this.globalCheck('Search', this);
            this.byId("VendorValueHelp").destroy();
            this.nameDialog = null;

        },
        onVendor2ValueHelp: function (oEvent) {
            let oView = this.getView();
            let InputValue = oEvent.getSource().getValue();

            console.log("Vendor2InputValue", InputValue);

            if (!this.nameDialog) {
                this.nameDialog = sap.ui.core.Fragment.load({
                    id : oView.getId(),
                    name : "project1.view.fragment.Vendor2ValueHelpDialog",
                    controller : this
                }).then(function (oDialog) {
                    oView.addDependent(oDialog);
                    return oDialog;
                })
            }

            this.nameDialog.then(function (oDialog) {
                oDialog.open(InputValue);
            })
        },
        onVendor2ValueHelpClose: function (oEvent) {
            let oSelectItem = oEvent.getParameter("selectedItem");
            oEvent.getSource().getBinding("items").filter([]);

            if (!oSelectItem) {
                return;
            }
            this.byId("vendorSave").setValue(oSelectItem.getTitle());
            this.byId("vendorSave").setValueState("None");

            // this.globalCheck('Search', this);
            this.byId("Vendor2ValueHelp").destroy();
            this.nameDialog = null;

        },
        onPlantValueHelp: function (oEvent) {
            let oView = this.getView();
            let InputValue = oEvent.getSource().getValue();

            console.log("PlantInputValue", InputValue);

            if (!this.nameDialog) {
                this.nameDialog = sap.ui.core.Fragment.load({
                    id : oView.getId(),
                    name : "project1.view.fragment.PlantValueHelpDialog",
                    controller : this
                }).then(function (oDialog) {
                    oView.addDependent(oDialog);
                    return oDialog;
                })
            }

            this.nameDialog.then(function (oDialog) {
                oDialog.open(InputValue);
            })
        },
        onPlantValueHelpSearch: function (oEvent) {
            let sValue = oEvent.getParameter("value");
            let oFilter = new Filter("plantName", FilterOperator.Contains, sValue);
            oEvent.getSource().getBinding("items").filter([oFilter]);
        },
        onPlantValueHelpClose: function (oEvent) {
            let oSelectItem = oEvent.getParameter("selectedItem");
            oEvent.getSource().getBinding("items").filter([]);

            if (!oSelectItem) {
                return;
            }
            this.byId("plantSearch").setValue(oSelectItem.getTitle());
            this.byId("plantSearch").setValueState("None");
            // this.globalCheck('Search', this);
            this.byId("PlantValueHelp").destroy();
            this.nameDialog = null;
        },
        onMaterialValueHelp: function (oEvent) {
            let oView = this.getView();
            let InputValue = oEvent.getSource().getValue();

            console.log("MaterialInputValue", InputValue);

            if (!this.nameDialog) {
                this.nameDialog = sap.ui.core.Fragment.load({
                    id : oView.getId(),
                    name : "project1.view.fragment.MaterialValueHelpDialog",
                    controller : this
                }).then(function (oDialog) {
                    oView.addDependent(oDialog);
                    return oDialog;
                })
            }

            this.nameDialog.then(function (oDialog) {
                oDialog.open(InputValue);
            })
        },
        onMaterialValueHelpSearch: function (oEvent) {
            let sValue = oEvent.getParameter("value");
            let oFilter = new Filter("materialName", FilterOperator.Contains, sValue);
            oEvent.getSource().getBinding("items").filter([oFilter]);
        },
        onMaterialValueHelpClose: function (oEvent) {
            let oSelectItem = oEvent.getParameter("selectedItem");
            oEvent.getSource().getBinding("items").filter([]);

            if (!oSelectItem) {
                return;
            }
            this.byId("matSearch").setValue(oSelectItem.getTitle());
            this.byId("matSearch").setValueState("None");
            
            this.byId("MaterialValueHelp").destroy();
            this.nameDialog = null;
        },
        onGateValueHelp : function (oEvent) {
            let oView = this.getView();
            let InputValue = oEvent.getSource().getValue();

            console.log("GateInputValue", InputValue);

            if (!this.nameDialog) {
                this.nameDialog = sap.ui.core.Fragment.load({
                    id : oView.getId(),
                    name : "project1.view.fragment.GateValueHelpDialog",
                    controller : this
                }).then(function (oDialog) {
                    oView.addDependent(oDialog);
                    return oDialog;
                })
            }

            this.nameDialog.then(function (oDialog) {
                oDialog.open(InputValue);
            })
        },
        onGateValueHelpSearch: function (oEvent) {
            let sValue = oEvent.getParameter("value");
            let oFilter = new Filter("gateName", FilterOperator.Contains, sValue);
            oEvent.getSource().getBinding("items").filter([oFilter]);
        },
        onGateValueHelpClose: function (oEvent) {
            let oSelectItem = oEvent.getParameter("selectedItem");
            oEvent.getSource().getBinding("items").filter([]);

            if (!oSelectItem) {
                return;
            }
            this.byId("gateSave").setValue(oSelectItem.getTitle());
            this.byId("gateSave").setValueState("None");
            
            this.byId("GateValueHelp").destroy();
            this.nameDialog = null;
        },
        onCheck: function (oEvent) {
            let oCheck = oEvent.getParameter("selected");

            let oModel = this.getView().getModel("check");
            
            if (!oCheck) {
                oModel.setProperty("/check", 'DS');
            } else {
                oModel.setProperty("/check", 'JIT');
            }

            this.getView().getModel("check").refresh();
        },
        onDetail: function (oEvent) {
            let buttonRow = oEvent.getSource().getBindingContext("mainData").getProperty();
            this.getView().getModel("mainData").setProperty("/detailDS", buttonRow.DeliverySchedule);
            this.getView().getModel("mainData").setProperty("/detailBL", buttonRow.BoxLabel);
        },
        onShowPDF: function () {
            let currentDate = new Date();

            let formattedDate = currentDate.getFullYear() + '-' +
                                ('0' + (currentDate.getMonth() + 1)).slice(-2) + '-' +
                                ('0' + currentDate.getDate()).slice(-2);

            let hours = currentDate.getHours();
            let minutes = currentDate.getMinutes();
            let seconds = currentDate.getSeconds();
            let meridiem = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12;
            hours = hours ? hours : 12;

            let formattedHours = String(hours);
            let formattedMinutes = ('0' + minutes).slice(-2);
            let formattedSeconds = ('0' + seconds).slice(-2);

            let formattedDateTime = formattedDate + '/' + meridiem + ' ' +
                                    formattedHours + ':' + formattedMinutes + ':' + formattedSeconds;

            var tableRows = 
                "<Row1>" +
                "<Cell1>" + "<![CDATA[" + this.getView().getModel("save").getProperty("/saveInvoiceNo") + "]]>" + "</Cell1>" +
                "<Cell2>" + "<![CDATA[" + this.getView().getModel("save").getProperty("/saveDName") + "]]>" + "</Cell2>" +
                "<Cell3>" + "<![CDATA[" + this.getView().getModel("save").getProperty("/saveCarNo") + "]]>" + "</Cell3>" +
                "<Cell4>" + "<![CDATA[" + this.getView().getModel("save").getProperty("/saveDTL") + "]]>" + "</Cell4>" +
                "<Cell5>" + "<![CDATA[" + this.getView().getModel("save").getProperty("/savedp2_1") + "/" + this.getView().getModel("save").getProperty("/savedp2_2") + "]]>" + "</Cell5>" +
                "<Cell6>" + "<![CDATA[" + formattedDateTime + "]]>" + "</Cell6>" +
                "</Row1>";


            let tableData;
            var table2Rows = "";
            let radioCheck = this.getView().getModel("check").getProperty("/check");

            if (radioCheck === 'DS') {
                tableData = this.getView().getModel("mainData").getData();
                for (let i = 0; i < tableData.length; i++) {
                    console.log(tableData[i]);
                    table2Rows += "<Row" + (i + 1) + ">" +
                    "<Cell1>" + "<![CDATA[" + (i + 1) + "]]>" + "</Cell1>" +
                    "<Cell2>" + "<![CDATA[" + tableData[i].ReqQty + "]]>" + "</Cell2>" +
                    "<Cell3>" + "<![CDATA[" + tableData[i].Description + "]]>" + "</Cell3>" +
                    "<Cell4>" + "<![CDATA[" + tableData[i].perCase + "]]>" + "</Cell4>" +
                    "<Cell5>" + "<![CDATA[" + tableData[i].BoxQty + "]]>" + "</Cell5>" +
                    "<Cell6>" + "<![CDATA[" + tableData[i].DeliveryQty + "]]>" + "</Cell6>" +
                    "<Cell7>" + "<![CDATA[" + tableData[i].GRType + "]]>" + "</Cell7>" +
                    "<Cell8>" + "<![CDATA[" + tableData[i].Stock + "]]>" + "</Cell8>" +
                    "</Row" + (i + 1) + ">";
                }
            } else {
                tableData = this.getView().getModel("subData").getData();
                for (let i = 0; i < tableData.length; i++) {
                    console.log(tableData[i]);
                    table2Rows += "<Row" + (i + 1) + ">" +
                    "<Cell1>" + "<![CDATA[" + (i + 1) + "]]>" + "</Cell1>" +
                    "<Cell2>" + "<![CDATA[" + tableData[i].RequestQty + "]]>" + "</Cell2>" +
                    "<Cell3>" + "<![CDATA[" + tableData[i].Description + "]]>" + "</Cell3>" +
                    "<Cell4>" + "<![CDATA[" + tableData[i].BoxLabel + "]]>" + "</Cell4>" +
                    "<Cell5>" + "<![CDATA[" + tableData[i].BoxQty + "]]>" + "</Cell5>" +
                    "<Cell6>" + "<![CDATA[" + tableData[i].DeliveryQty + "]]>" + "</Cell6>" +
                    "<Cell7>" + "<![CDATA[" + tableData[i].Material + "]]>" + "</Cell7>" +
                    "<Cell8>" + "<![CDATA[" + tableData[i].SafetyStock + "]]>" + "</Cell8>" +
                    "</Row" + (i + 1) + ">";
                }
            }
            
            let printd =
            "<?xml version='1.0' encoding='UTF-8'?>" +
            "<form1>" +
                "<Table1>" +
                    "<HeaderRow/>" +
                    tableRows +
                "</Table1>" +
                "<Table2>" +
                    "<HeaderRow/>" +
                    table2Rows +
                "</Table2>" +
                "<Code128BarCode1>" + "<![CDATA[" + this.getView().getModel("save").getProperty("/saveASNNO") + "]]>" + "</Code128BarCode1>" +
                "<Code128BarCode1>" + "<![CDATA[" + this.getView().getModel("save").getProperty("/saveASNNO") + "]]>" + "</Code128BarCode1>" +
            "</form1>";

            var encoder = new TextEncoder();
            var data = encoder.encode(printd);
            var printdb64 = this.base64FromArrayBuffer(data);
            console.log(printdb64);
            var pdfcontent = {
                enbedFont: 0,
                formLocale: "en_US",
                formType: "print",
                taggedPdf: 1,
                xdpTemplate: "form_BS/form_BS",
                xmlData: printdb64
            };

            $.ajax({
                url: jQuery.sap.getModulePath("project1", "/v1/adsRender/pdf?templateSource=storageName&TraceLevel=0"),
                // url: jQuery.sap.getModulePath("project1", "https://adsrestapi-formsprocessing.cfapps.jp10.hana.ondemand.com/v1/adsRender/pdf?templateSource=storageName&TraceLevel=0"),
                type: "POST",
                data: JSON.stringify(pdfcontent),
                contentType: "application/json",
                async: false,
                success: function (data) {
                    console.log(data);
                    const deccont = atob(data.fileContent);
                    const byteNumbers = new Array(deccont.length);
                    
                    for (let i = 0; i < deccont.length; i++) {
                        byteNumbers[i] = deccont.charCodeAt(i);
                    }
                    
                    const byteArray = new Uint8Array(byteNumbers);
                    
                    const blob = new Blob([byteArray], { type: "application/pdf" });
                    
                    var pdfDocumentURL = URL.createObjectURL(blob);
                    if (!this._pdfViewer) {
                        this._pdfViewer = new PDFViewer();
                        this._pdfViewer.attachError(event => ErrorHandlerSingleton.getInstance().onError(event));
                        URLWhitelist.add("blob");
                    }
                    this._pdfViewer.setSource(pdfDocumentURL);
                    this._pdfViewer.open();
                },
                error: function (err) {
                    console.log(err);
                    MessageBox.information(JSON.stringify(err));
                }
            });
        },
        base64FromArrayBuffer: function (arrayBuffer) {
            let binary = '';
            let bytes = new Uint8Array(arrayBuffer);
            let len = bytes.byteLength;
            for (let i = 0; i < len; i++) {
                binary += String.fromCharCode(bytes[i]);
            }
            return btoa(binary);
        },
        onUploadFormat: function () {
            let aRows = [
                {
                    'Material': '',
                    'Description': '',
                    'Req-Qty': '',
                    'ASN Qty': '',
                    'Stock': '',
                    'Per Case': '',
                    'Box Qty': '',
                    'Delivery Qty': '',
                    'GR Type': '',
                    'BoxLabel': ''
                }
            ];
            let aCols = [
                {
                    label: 'material',
                    property: 'material',
                    type: 'String'
                },
                {
                    label: 'ReqQty',
                    property: 'ReqQty',
                    type: 'Integer'
                },
                {
                    label: 'ASNQty',
                    property: 'ASNQty',
                    type: 'Integer'
                },
                {
                    label: 'Stock',
                    property: 'Stock',
                    type: 'Integer'
                },
                {
                    label: 'perCase',
                    property: 'perCase',
                    type: 'Integer'
                },
                {
                    label: 'BoxQty',
                    property: 'BoxQty',
                    type: 'Integer'
                },
                {
                    label: 'DeliveryQty',
                    property: 'DeliveryQty',
                    type: 'Integer'
                },
                {
                    label: 'GRType',
                    property: 'GRType',
                    type: 'String'
                },
                {
                    label: 'boxLabel',
                    property: 'boxLabel',
                    type: 'String'
                },
            ];

            let oSettings = {
                workbook: {
                    columns: aCols,
                    hierarchyLevel: 'Level'
                },
                dataSource: aRows,
                fileName: 'Material information format.xlsx',
                worker: false
            };

            let oSheet = new Spreadsheet(oSettings);
            oSheet.build().finally(function () {
                oSheet.destroy();
            });
        },
        onUpload: function (oEvent) {
            var mainData = this.getView().getModel("mainData").getData();
            console.log(mainData);
            var reader = new FileReader(); //파일 읽기위해 객체생성
            var text = "엑셀 파일의\n";
            reader.onload = function () { // 정상적으로 읽히게 된다면 onload 호출
                let data = reader.result; // 들어온 값을 변수에 저장
                let workBook = XLSX.read(data, { type: 'binary' }); // 들어온값을 XLSX.read로 엑셀파일로 변환
                let rows = [];
                workBook.SheetNames.forEach(function (sheetName) { 
                    rows = XLSX.utils.sheet_to_json(workBook.Sheets[sheetName]); // 각 시트데이터를 JSON형태로 변환
                    for (let i = 0; i < rows.length; i++) {
                        let bCheck = false;
                        for (let j = 0; j < mainData.length; j++) {
                            if (mainData[j].material === rows[i].material) {
                                if (mainData[j].GRType !== rows[i].GRType) {
                                    text += (i + 1) + " 번째 열" + " GR Type : " + rows[i].GRType + "\n";
                                    break;
                                } else {
                                    let cnt = 0;
                                    for (let k = 0; k < mainData[j].BoxLabel.length; k++) {
                                        if (mainData[j].BoxLabel[k].boxLabel === String(rows[i].boxLabel)) {
                                            cnt++;
                                        }
                                    }
                                    if (cnt < 1) {
                                        console.log(cnt);
                                        mainData[j].BoxLabel.push({boxLabel: rows[i].boxLabel});
                                    }
                                    mainData[j].ReqQty = parseInt(mainData[j].ReqQty) + parseInt(rows[i].ReqQty);
                                    mainData[j].ASNQty = parseInt(mainData[j].ASNQty) + parseInt(rows[i].ASNQty);
                                    mainData[j].Stock = parseInt(mainData[j].Stock) + parseInt(rows[i].Stock);
                                    mainData[j].perCase = parseInt(mainData[j].perCase) + parseInt(rows[i].perCase);
                                    mainData[j].BoxQty = parseInt(mainData[j].BoxQty) + parseInt(rows[i].BoxQty);
                                    mainData[j].DeliveryQty = parseInt(mainData[j].DeliveryQty) + parseInt(rows[i].DeliveryQty);
                                    bCheck = false;
                                    break;
                                }
                            } else {
                                bCheck = true;
                            }
                        }
                        if (bCheck) {
                            mainData.push(rows[i]);
                        }
                    }
                });
                this.getView().getModel("mainData").setData(mainData);
                this.getView().getModel("mainData").refresh(true);
                text += "이(가) 맞지 않아 제외 되었습니다.";
                MessageBox.show(text);
                console.log(this.getView().getModel("mainData").getData());
            }.bind(this);
            
            var files = oEvent.getParameter("files");
            reader.readAsBinaryString(files[0]);

        },
        // fieldGroupId를 기반으로 유효성 검사 ---------------------------------------------------
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
            }else if (object.isA("sap.m.TextArea")) {
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

        // fieldGroupId를 기반으로 필드 초기화
        globalClear: function (fieldGroupId, _this) {
            let that = this;
            let grouparray = fieldGroupId.split(",");
            for (let i = 0; i < grouparray.length; i++) {
                _this.getView().getControlsByFieldGroupId(grouparray[i]).forEach(function (object) {
                    that.fieldClear(object);
                })
            }
        },

        // 각 필드의 초기화
        fieldClear: function (object) {
            if (object.isA("sap.m.MultiInput")) {
                object.removeAllTokens();
                object.setValueState("None");
            } else if (object.isA(["sap.m.Input", "sap.m.DatePicker", "sap.m.TimePicker","sap.m.TextArea"])) {
                object.setValue(null);
                object.setValueState("None");
            } else if (object.isA("sap.m.Select")) {
                object.setSelectedKey(null);
                object.setValueState("None");
                // object.removeAllItems();
            } else if (object.isA("sap.ui.richtexteditor.RichTextEditor")) {
                object.setValue(null);
            } else if (object.isA("sap.m.upload.UploadSet")) {
                object.removeAllItems();
                object.setUploadEnabled(true);
            } else if (object.isA("sap.m.CheckBox")) {
                object.setSelected(false);
            } else if (object.isA("sap.m.ComboBox")) {
                object.setValue(null);
                object.setValueState("None");
                object.setSelectedKey(null);
            }
        },

    });
});
