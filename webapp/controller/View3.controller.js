sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("project1.controller.View3", {
        onInit: function () {
            const myRoute = this.getOwnerComponent().getRouter().getRoute("View3");
            myRoute.attachPatternMatched(this.onMyRoutePatternMatched, this);
        },
        onMyRoutePatternMatched: function () {
            let card4 = new JSONModel({
                items : [
                   { first : "Workflow 개발 기본교육", sec : "수강 대기", state : "Warning"},
                   { first : "SAP UI5 개발 과정", sec : "수강 중", state : "Error"},
                   { first : "소프트웨어 공략의 이해", sec : "이수 완료", state : "Information"},
                   { first : "SAP 클라우드의 이해", sec : "이수 완료", state : "Information"}
                ]
            });

            this.getView().setModel(card4, "card4");

            let card5 = new JSONModel({
                items : [
                    { first : "회사 기본 예절 교육", state : "Error"},
                    { first : "재택 근무에 따른 협업 진행 교육", state : "Warning"}
                ]
            });
            
            this.getView().setModel(card5, "card5");

            let card6 = new JSONModel({
                items : [
                    { first : "신입 사원을 업무 교육"},
                    { first : "직무 역량 강화를 위한 정기 직무 교육"},
                    { first : "팀장 급 관리 교육"},
                    { first : "전사 ERP적용에 따른 실무 ERP 사용자 교육"}
                ]
            });

            this.getView().setModel(card6, "card6");

            let card7 = new JSONModel({
                items : [
                    { first : "전사 프로세스 메뉴얼"},
                    { first : "구매 업무 프로세스 메뉴얼"},
                    { first : "자재 관리 프로세스 메뉴얼"},
                    { first : "지식 관리 프로세스 메뉴얼"}
                ]
            });

            this.getView().setModel(card7, "card7");

            let card8 = new JSONModel({
                items : [
                    { first : "공통 지식관리 업무" },
                    { first : "전문 업무 영역별 교육" },
                    { first : "Order to Cash 프로세스 혁신 교육" },
                    { first : "디자인 씽킹 개발 방법론 교육" }
                ]
            });

            this.getView().setModel(card8, "card8");
        },
        onBack: function () {
            this.getOwnerComponent().getRouter().navTo("View1");
        }
    });
});
