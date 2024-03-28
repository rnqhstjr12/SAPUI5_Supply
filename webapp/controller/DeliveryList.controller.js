sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function (Controller) {
    "use strict";

    return Controller.extend("project1.controller.DeliveryList", {
        onInit: function () {
            const myRoute = this.getOwnerComponent().getRouter().getRoute("DeliveryList");
            myRoute.attachPatternMatched(this.onMyRoutePatternMatched, this);
        },
        onMyRoutePatternMatched: function () {
            
        },
        onCreate: function () {
            let VBox = this.byId("DeleteVBox");
            let HBox = VBox.getItems()[0];
            let newHBox = new sap.m.HBox();

            for (let i = 0; i < HBox.getItems().length; i++) {
                newHBox.addItem(HBox.getItems()[i].clone());
            }
            newHBox.getItems()[0].setValue('');
            // newHBox.addItem(HBox.clone()); // 이건 왜안되징?
            // console.log(VBox.getItems()[0]);
            VBox.addItem(newHBox);
        },
        onDelete: function (oEvent) {
            let button = oEvent.getSource();
            let parentHBox = button.getParent();
            let parentVBox = this.byId("DeleteVBox");
            console.log(parentHBox);
            console.log(parentVBox);
            console.log(parentVBox.getItems());
            console.log(parentVBox.getItems().length);

            if (parentVBox.getItems().length === 1) {
                return;
            }

            parentVBox.removeItem(parentHBox);
            // parentHBox.removeAllItems();
        },
        onConfirm: function () {
            let VBox = this.byId("DeleteVBox");
            console.log(VBox.getItems());

            let sList = [];
            for (let i = 0; i < VBox.getItems().length; i++) {
                let sValue = VBox.getItems()[i].getItems()[0].getValue();
                sList.push(sValue);
            }
            console.log(sList);
            console.log("----------Confirm----------");
            for (let i = 0; i < sList.length; i++) {
                console.log((i + 1) + "번 VIN : " + sList[i]);
            }
            console.log("---------------------------");
        },
        onInquiry: function () {
            this.globalCheck('Input', this);
        },
        onLiveChange: function (oEvent) {
            let inputValue = oEvent.getParameter("value");
            if (inputValue) {
                oEvent.getSource().setValueState("None");
            }
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
