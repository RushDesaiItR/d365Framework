(function (document, angular) {
    "use strict";
    var app = angular.module('PGo_MyApp', ['ngAnimate', 'ui.bootstrap']);//ngInputModified
    console.log("Into MyAppDynamic");
    app.controller('PGo_DynamicController', DynamicController);
    function DynamicController($scope) {
        var Xrm = parent.Xrm;
        Xrm.Page.ui.clearFormNotification("1");
        Xrm.Page.ui.clearFormNotification("2");
        var oppguid = Xrm.Page.data.entity.getId();
        var OID = oppguid.substring(1, 37);
        var UserId = Xrm.Page.context.getUserId();
        try {
            Xrm.Utility.closeProgressIndicator();
            // Commented by Shrikant 19 oct to aviod Loader

            //Xrm.Utility.showProgressIndicator("Please wait while Opportunity Details Tab is loading..!!!");
            //window.setTimeout(function LoadProgress() {
            //Xrm.Utility.showProgressIndicator("Please wait while Opportunity Details Tab is loading..!!!");
            //}, 1000);
            var entityName = Xrm.Page.data.entity.getEntityName();
            console.log("entityName:-" + entityName);
        } catch (e) {

        }
        $scope.SelectedTabs = [];
        $scope.fieldCollection = null;
        $scope.approvalStatusLock = false;
        try {
            var isSystemAdmin = getUerRoles();
            if (isSystemAdmin === false) {
                var fedcap_approvalstatus = Xrm.Page.getAttribute("fedcap_approvalstatus").getText();
                if (fedcap_approvalstatus === "Submitted") {
                    $scope.approvalStatusLock = true;
                }
            }
        } catch (e) {
        }
        $scope._fedcap_rfiduedate = false;
        $scope.showcalendar = function (event, fedcap_customizetabid, fedcap_customizesectionid, fedcap_customizefieldid, fedcap_fieldapiname) {
            //for (var tab = 0; tab < $scope.tabs.length; tab++) {
            //    if ($scope.tabs[tab]["fedcap_customizetabid"] === fedcap_customizetabid) {
            //        for (var sec = 0; sec < $scope.tabs[tab].sections.length; sec++) {
            //            if ($scope.tabs[tab].sections[sec]["fedcap_customizesectionid"] === fedcap_customizesectionid) {
            //                for (var field = 0; field < $scope.tabs[tab].sections[sec].fields.length; field++) {
            //                    if ($scope.tabs[tab].sections[sec].fields[field]["fedcap_customizefieldid"] === fedcap_customizefieldid) {
            //                        $scope.tabs[tab].sections[sec].fields[field]["fedcap_isopencalendar"] = true;
            //                    }
            //                    else {
            //                        $scope.tabs[tab].sections[sec].fields[field]["fedcap_isopencalendar"] = false;
            //                    }
            //                }
            //            }
            //        }
            //    }
            //}
        }
        function HideOpportunity(ifShow, ifDisableUser, Msg1, Msg2, isUCI) {
            try {
                if (ifShow === false) {
                    Xrm.Utility.alertDialog(Msg1);
                    if (isUCI) {
                        //parent.document.getElementById("tablist").style.display = "none";
                        //parent.document.getElementById("bpfContainer").style.display = "none";
                        //parent.document.getElementById("outerHeaderContainer").style.display = "none";
                    }
                    $("#btnEditWinPlan").css("display", "none");
                    Xrm.Page.ui.tabs.get("details").setVisible(false);
                    Xrm.Page.ui.tabs.get("CompetitorsNPartners").setVisible(false);
                    Xrm.Page.ui.tabs.get("CallActionPlan").setVisible(false);
                    Xrm.Page.ui.tabs.get("ContactRoles").setVisible(false);
                    Xrm.Page.ui.tabs.get("OpportunityTeam").setVisible(false);
                    Xrm.Page.ui.tabs.get("ApprovalHistory").setVisible(false);
                    Xrm.Page.ui.tabs.get("tab_15").setVisible(false);
                    Xrm.Page.ui.tabs.get("tab_6").setVisible(false);
                    Xrm.Page.ui.tabs.get("tab_5").setVisible(false);
                    var tabListLen = $('#tablist li', window.parent.document).length;
                    $('#rel15', window.parent.document).css('display', 'none');
                }
                else if (ifDisableUser === false) {
                    Xrm.Utility.alertDialog(Msg2);
                    if (isUCI) {
                        //parent.document.getElementById("tablist").style.display = "none";
                        //parent.document.getElementById("bpfContainer").style.display = "none";
                        //parent.document.getElementById("outerHeaderContainer").style.display = "none";
                    }
                    Xrm.Page.ui.tabs.get("details").setVisible(false);
                    Xrm.Page.ui.tabs.get("CompetitorsNPartners").setVisible(false);
                    Xrm.Page.ui.tabs.get("CallActionPlan").setVisible(false);
                    Xrm.Page.ui.tabs.get("ContactRoles").setVisible(false);
                    Xrm.Page.ui.tabs.get("OpportunityTeam").setVisible(false);
                    Xrm.Page.ui.tabs.get("ApprovalHistory").setVisible(false);
                    Xrm.Page.ui.tabs.get("tab_15").setVisible(false);
                    Xrm.Page.ui.tabs.get("tab_6").setVisible(false);
                    Xrm.Page.ui.tabs.get("tab_5").setVisible(false);
                    var tabListLen = $('#tablist li', window.parent.document).length;
                    $('#rel15', window.parent.document).css('display', 'none');
                }
                else {
                    if (isUCI === false) {
                        Xrm.Page.ui.tabs.get("details").setVisible(false);
                    }
                    else {
                        Xrm.Page.ui.tabs.get("details").setVisible(true);
                        Xrm.Page.ui.tabs.get("details").setDisplayState("expanded");
                    }
                    Xrm.Page.ui.tabs.get("CompetitorsNPartners").setVisible(true);
                    Xrm.Page.ui.tabs.get("CallActionPlan").setVisible(true);
                    Xrm.Page.ui.tabs.get("ContactRoles").setVisible(true);
                    Xrm.Page.ui.tabs.get("OpportunityTeam").setVisible(true);
                    Xrm.Page.ui.tabs.get("ApprovalHistory").setVisible(true);
                    Xrm.Page.ui.tabs.get("tab_15").setVisible(true);
                    Xrm.Page.ui.tabs.get("tab_6").setVisible(true);
                    Xrm.Page.ui.tabs.get("tab_5").setVisible(true);
                    //GetSections();
                    //GetFields();
                    //GetTabData();
                }
            } catch (e) {

            }
        }
        function UserAccess() {
            var Msg1 = "You are not licensed to access to Technomile FedCapture Product.";
            var Msg2 = "You have been disabled for Technomile FedCapture Product access.";
            var isUCI = Xrm.Internal.isUci();
            try {
                var UserIdGUID = Xrm.Page.context.getUserId();
                var UserId = UserIdGUID.substring(1, 37);
                UserId = UserId.toLowerCase();
                var userName = "";
                try {
                    var ifShow = false;
                    var ifDisableUser = false;
                    Xrm.WebApi.retrieveMultipleRecords("fedcap_licenseuser", "?$filter=Microsoft.Dynamics.CRM.ContainValues(PropertyName=@p1,PropertyValues=@p2)&@p1='fedcap_productname'&@p2=['1']&$count=true&$top=10")//, "?orderby=createdon desc"
                                               .then(function (dataLicense) {
                                                   for (var count = 0; count < dataLicense.entities.length; count++) {
                                                       var licenseUser = dataLicense.entities[count]["_fedcap_licenseuser_value"];
                                                       licenseUser = licenseUser.toLowerCase();
                                                       var fedcap_userstatus = dataLicense.entities[count]["fedcap_userstatus"];
                                                       if (UserId === licenseUser) {
                                                           ifShow = true;
                                                           if (fedcap_userstatus) {
                                                               ifDisableUser = true;
                                                           }
                                                           else {
                                                               Msg2 = "You have been disabled for Technomile FedCapture Product access.";
                                                           }
                                                       }
                                                       else {
                                                           Msg1 = "You are not licensed to access to Technomile FedCapture Product.";
                                                       }
                                                   }
                                                   HideOpportunity(ifShow, ifDisableUser, Msg1, Msg2, isUCI);
                                               },
                                                function (error) {
                                                    HideOpportunity(ifShow, ifDisableUser, Msg1, Msg2, isUCI);
                                                });

                } catch (e) {
                    HideOpportunity(ifShow, ifDisableUser, Msg1, Msg2, isUCI);
                }

            } catch (e) {
            }
        }
        // Commented opened by Shrikant 19 oct to avoid Loader
        //GetCurrency();
        //GetSections();
        //GetFields();
        //GetTabData();
        ///
        ////UserAccess();
        // Commented by Shrikant 19 oct to avoid Loader
        setTimeout(function GetOppData() {
            // GetCurrency();
            //  GetSections();
            // GetFields();
            GetTabData();
            setTimeout(function myfunction() {
                $('#hdnSaveCount').val("1");
                Xrm.Utility.closeProgressIndicator();
            }, 500);

        }, 650);

        function getUerRolesReadOnly() {
            var roleid = Xrm.Page.context.getUserRoles();
            var name;
            var AmentumReadOnly = false;
            var AmentumOrgExecs = false;
            var ifBDLead_CaptureMngrUser = false;
            for (var i = 0; i < roleid.length; i++) {
                var roleID = roleid[i];
                var RoleName = getRoleName(roleID);
                if (RoleName == 'Amentum Read-Only') {
                    // return true;
                    AmentumReadOnly = true;
                }
                //if (RoleName == 'Amentum Org Execs') {
                //    // return true;
                //    AmentumOrgExecs = true;
                //}
                if (RoleName === 'Amentum BD Lead/Capture Manager') {
                    ifBDLead_CaptureMngrUser = true;
                }
            }
            if (AmentumReadOnly == true) {
                return true;
            }
                //else if (AmentumOrgExecs == true) {
                //    return true;
                //}
            else if (ifBDLead_CaptureMngrUser == true) {
                if (ifBDLead_CaptureMngrUser) {
                    // Read all methods and variables from fedcap_SecurityRolesOnOpportunity.js file for BD Lead Or Capture Mgr
                    //debugger;// fedcap_primarybdlead fedcap_capture_manager
                    //var Xrm = window.parent.Xrm;
                    getLoginUser();

                    try {
                        var BDLeadteam = Xrm.Page.getAttribute("fedcap_primarybdlead").getValue();
                        BDLead = BDLeadteam[0].id;
                        BDLead = BDLead.substring(1, 37);


                    } catch (e) {

                    }
                    try {
                        var CaptureManagerTeam = Xrm.Page.getAttribute("fedcap_capture_manager").getValue();
                        CaptureManager = CaptureManagerTeam[0].id;
                        CaptureManager = CaptureManager.substring(1, 37);
                    } catch (e) {

                    }

                    getOpportunityaccessTeam(OID);
                    //debugger;
                    if (loginUser.toLowerCase() === opportunityOwner.toLowerCase()) {
                        //If Logged In  user is Opportunity Owner.
                    }
                    else if (BDLeadOppAccess != null && captureManagerOppAccess == null) {
                        if (loginUser.toLowerCase() === BDLeadOppAccess.toLowerCase()) {
                            //If Logged in user is BD lead of Opportunity.
                        }
                        else {
                            //LockLayoutforBDLeadCaptureManagerRole();
                            return true;

                        }
                    }
                    else if (captureManagerOppAccess != null && BDLeadOppAccess == null) {
                        if (loginUser.toLowerCase() === captureManagerOppAccess.toLowerCase()) {
                            //If Logged in user is Capture Manager of Opportunity.
                        }
                        else {
                            //LockLayoutforBDLeadCaptureManagerRole();
                            return true;

                        }
                    }
                    else if (captureManagerOppAccess != null && BDLeadOppAccess != null) {
                        if (loginUser.toLowerCase() === BDLeadOppAccess.toLowerCase() || loginUser.toLowerCase() === captureManagerOppAccess.toLowerCase()) {
                            //If Logged in user is BD lead or capture manager of Opportunity.
                        }
                        else {
                            //LockLayoutforBDLeadCaptureManagerRole();
                            return true;

                        }
                    }
                    else {
                        //LockLayoutforBDLeadCaptureManagerRole();
                        return true;

                    }
                }
                return false;
            }
            else {
                return false;
            }
        }
        GetUserSettingsCollection(UserId.substring(1, 37));
        $scope.AllSections;
        $scope.AllFields;
        function getUerRoles() {
            var roleid = Xrm.Page.context.getUserRoles();
            var name;
            var checkRole = false;
            for (var i = 0; i < roleid.length; i++) {
                var roleID = roleid[i];
                var RoleName = getRoleName(roleID);
                if (RoleName == 'System Administrator') {
                    // return true;
                    checkRole = true;
                }
                else {
                    //return false;
                }
            }
            if (checkRole == true) {
                return true;
            }
            else {
                return false;
            }
        }
        function getRoleName(roleID) {
            var roleName = null;
            try {
                var serverUrl = Xrm.Page.context.getClientUrl();
                var OdataURL = serverUrl + "/XRMServices/2011/OrganizationData.svc" + "/" + "RoleSet?$filter=RoleId eq guid'" + roleID + "'";
                $.ajax({
                    type: "GET", async: false, contentType: "application/json; charset=utf-8", datatype: "json", url: OdataURL,
                    beforeSend:
                    function (XMLHttpRequest) {
                        XMLHttpRequest.setRequestHeader("Accept", "application/json");
                    },
                    success:
                    function (data, textStatus, XmlHttpRequest) {
                        var result = data.d;
                        roleName = result.results[0].Name;
                    },
                    error:
                    function (XmlHttpRequest, textStatus, errorThrown) {
                    }
                });
            } catch (e) {

            }
            return roleName;
        }
        function GetSections() {
            $scope.AllSections = null;
            var serverUrl = location.protocol + "//" + location.host;
            var req = new XMLHttpRequest(); // the name of custom entity is = new_trialentity
            req.open("GET", serverUrl + "/api/data/v9.0/fedcap_customizesections?$orderby=fedcap_order asc&$filter=fedcap_ishidesection ne true", false);
            req.setRequestHeader("Accept", "application/json");
            req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
            req.setRequestHeader("Prefer", "odata.include-annotations=*");
            req.setRequestHeader("OData-MaxVersion", "4.0");
            req.setRequestHeader("OData-Version", "4.0");
            req.onreadystatechange = function () {
                if (this.readyState === 4 /* complete */) {
                    req.onreadystatechange = null;
                    if (this.status === 200) {
                        var data = JSON.parse(this.response);
                        $scope.AllSections = data.value;
                    }
                }
            };
            req.send();
        }
        function GetFields() {
            $scope.AllFeilds = null;
            var serverUrl = location.protocol + "//" + location.host;
            var req = new XMLHttpRequest(); // the name of custom entity is = new_trialentity
            req.open("GET", serverUrl + "/api/data/v9.0/fedcap_customizefields?$orderby=fedcap_order asc", false);
            req.setRequestHeader("Accept", "application/json");
            req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
            req.setRequestHeader("Prefer", "odata.include-annotations=*");
            req.setRequestHeader("OData-MaxVersion", "4.0");
            req.setRequestHeader("OData-Version", "4.0");
            req.onreadystatechange = function () {
                if (this.readyState === 4 /* complete */) {
                    req.onreadystatechange = null;
                    if (this.status === 200) {
                        var data = JSON.parse(this.response);
                        $scope.AllFields = data.value;
                    }
                }
            };
            req.send();
        }
        function GetTabData() {
            debugger;
            var data = [{
                fedcap_name: "PGo",
                fedcap_customizetabid: "",
                fedcap_apinameforcongafield: "",
                tabAllFields: ""
            }];
            $scope.tabs = data;
            var tabGUID = "12212";
            GetSectionData(tabGUID, 0);



            console.log("Into GetTabData");
            //var serverUrl = location.protocol + "//" + location.host;
            //var req = new XMLHttpRequest(); // the name of custom entity is = new_trialentity
            ////if (getUerRolesReadOnly()) {
            ////    req.open("GET", serverUrl + "/api/data/v9.0/fedcap_customizetabs?$orderby=fedcap_order asc&$filter=fedcap_ishidetab ne true and fedcap_viewreadonlyrole ne false", false);
            ////}
            ////else {
            ////    req.open("GET", serverUrl + "/api/data/v9.0/fedcap_customizetabs?$orderby=fedcap_order asc&$filter=fedcap_ishidetab ne true", false);
            ////}
            //req.open("GET", serverUrl + "/api/data/v9.0/fedcap_customizetabs?$orderby=fedcap_order asc&$filter=fedcap_ishidetab ne true", false);
            //req.setRequestHeader("Accept", "application/json");
            //req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
            //req.setRequestHeader("Prefer", "odata.include-annotations=*");
            //req.setRequestHeader("OData-MaxVersion", "4.0");
            //req.setRequestHeader("OData-Version", "4.0");
            //req.onreadystatechange = function () {
            //    if (this.readyState === 4 /* complete */) {
            //        req.onreadystatechange = null;
            //        if (this.status === 200) {
            //            var data = JSON.parse(this.response);
            //            $scope.tabs = data.value;
            //            for (var i = 0; i < $scope.tabs.length; i++) {
            //                GetSectionData(data.value[i]["fedcap_customizetabid"], i);
            //                $scope.tabs[i].LoadTabData = true;
            //                //debugger;
            //                if ($scope.fieldCollection === null) {
            //                    $scope.fieldCollection = $scope.tabs[i].tabAllFields;
            //                }
            //                else {
            //                    $scope.fieldCollection = $scope.fieldCollection + ',' + $scope.tabs[i].tabAllFields;
            //                }
            //            }
            //            GetSectionData(data.value[0]["fedcap_customizetabid"], 0);
            //            $scope.tabs[0].LoadTabData = true;
            //            //$scope.SelectedTabs[0] = data.value[0]["fedcap_customizetabid"];
            //            $scope.SelectedTabs.push(data.value[0]["fedcap_customizetabid"]);
            //            //$scope.tabs[0].fedcap_backgroundcoloractive = $scope.tabs[0]["fedcap_backgroundcolor"];
            //            //for (var tab = 0; tab < $scope.tabs.length; tab++) {
            //            //    if (tab === 0) {
            //            //        //$scope.tabs[tab].fedcap_backgroundcoloractive = "tabLink ms-crm-PanelHeader-Color active";
            //            //        $scope.tabs[tab].fedcap_backgroundcoloractive = "active";
            //            //        $scope.tabs[tab].tabcolor = { "background-color": $scope.tabs[tab]["fedcap_backgroundcolor"] };
            //            //    }
            //            //    else {
            //            //        //$scope.tabs[tab].fedcap_backgroundcoloractive = 'tabLink ms-crm-PanelHeader-Color';
            //            //        $scope.tabs[tab].fedcap_backgroundcoloractive = '';
            //            //        $scope.tabs[tab].tabcolor = { "background-color": '' };
            //            //    }
            //            //}
            //            //$scope.tabs[0].fedcap_backgroundcoloractive = "tabLink ms-crm-PanelHeader-Color active";
            //            //$scope.tabs[0].tabcolor = { "background-color": $scope.tabs[0]["fedcap_backgroundcolor"] };
            //            //var height = (parseInt(data.value[0]["fedcap_height"]) + 5);
            //            //var height1 = parseInt(data.value[0]["fedcap_height"]);
            //            //$('#fedcap_div', window.parent.document).height(height);
            //            //$('#fedcap_div1', window.parent.document).height(height1);
            //        }
            //        else {
            //            $('#fedcap_div', window.parent.document).height(550);
            //            $('#fedcap_div1', window.parent.document).height(500);
            //        }
            //    }
            //};
            //req.send();
        }
        function GetSectionData(tabGUID, tab) {
            try {
                $scope.tabs[tab].tabAllFields = '';
                //var data = $scope.AllSections.filter(function (section) {
                //    return (section._fedcap_tab_value == tabGUID);
                //});
                var data = [{
                    fedcap_name: "PGo"
                }];
                $scope.tabs[tab].sections = data;
                         DoubleClickSave = false;
                         GetPGoOpportunityGivenQuestionAnswer(tab, 0);
                         GetPGoQuestion(tab, 0);
                         //GetOptionSetLabelValue(tab, i, "fedcap_pgoquestion", "fedcap_pgo_stage");
                         $scope.$apply();

                //// $scope.tabs[tab].sections = data;
                // for (var i = 0; i < $scope.tabs[tab].sections.length; i++) {
                //     //  $scope.tabs[tab].sections[i].controlwidth = { "width": $scope.tabs[tab].sections[i]["fedcap_controlwidth"] + "px" };
                //     //  GetFieldData($scope.tabs[tab].sections[i]["fedcap_customizesectionid"], tab, i);
                //     if ($scope.tabs[tab].sections[i]["fedcap_name"] === 'PWin' || $scope.tabs[tab].sections[i]["fedcap_name"] === 'CRS') {
                //         debugger;

                //     }
                //     //if ($scope.tabs[tab].sections[i]["fedcap_name"] === 'PGo' || $scope.tabs[tab].sections[i]["fedcap_name"] === 'SGI') {
                //     //    DoubleClickSave = false;
                //     //    GetPGoOpportunityGivenQuestionAnswer(tab, i);
                //     //    GetPGoQuestion(tab, i);
                //     //    //GetOptionSetLabelValue(tab, i, "fedcap_pgoquestion", "fedcap_pgo_stage");

                //     //    $scope.$apply();
                //     //}
                // }

            } catch (e) {

            }
        }
        function GetFieldData(sectionGUID, tab, section) {
            try {
                var data = $scope.AllFields.filter(function (field) {
                    return (field._fedcap_section_value == sectionGUID);
                });
                $scope.tabs[tab].sections[section].fields = data;
                LoadOptionSetAndGetTabFieldsInQuery(tab, section);
                if (data.length > 0) {
                    GetFieldOpportunityData(sectionGUID, tab, section);
                }
                else {
                    $scope.tabs[tab].sections[section].display = "none";// if fields not available
                }
            } catch (e) {

            }
        }
        //var selectQryforMultiPickList = '';
        //var fieldIds = [];

        function LoadOptionSetAndGetTabFieldsInQuery(tab, section) {
            //*******************************************************************************************
            var selectQry = '';
            var selectQryforMultiPickList = '';
            var isMultiPickListExist = false;
            var fieldIds = [];
            for (var i = 0; i < $scope.tabs[tab].sections[section].fields.length; i++) {
                if ($scope.tabs[tab].sections[section].fields[i]['fedcap_fieldtype'] === 'Picklist') {
                    GetOptionSetLabel(tab, section, i, "opportunity", $scope.tabs[tab].sections[section].fields[i]['fedcap_fieldapiname']);
                }
                if ($scope.tabs[tab].sections[section].fields[i]['fedcap_fieldtype'] === 'MultiSelectPicklistType') {
                    isMultiPickListExist = true;
                    fieldIds.push({ 'id': i });
                    if (selectQryforMultiPickList === '') {
                        selectQryforMultiPickList = $scope.tabs[tab].sections[section].fields[i]['fedcap_fieldapiname'];
                    }
                    else {
                        selectQryforMultiPickList = selectQryforMultiPickList + ',' + $scope.tabs[tab].sections[section].fields[i]['fedcap_fieldapiname'];
                    }
                    //setTimeout(GetOptionSetLabelMulti(tab, section, i, "opportunity", $scope.tabs[tab].sections[section].fields[i]['fedcap_fieldapiname']), 3000)
                    GetOptionSetLabelMulti(tab, section, i, "opportunity", $scope.tabs[tab].sections[section].fields[i]['fedcap_fieldapiname']);
                }
                if ($scope.tabs[tab].sections[section].fields[i]['fedcap_fieldtype'] !== 'spacer') {
                    if ($scope.tabs[tab].sections[section].fields[i]['fedcap_fieldtype'] !== 'header') {
                        if (selectQry === '') {
                            selectQry = $scope.tabs[tab].sections[section].fields[i]['fedcap_fieldapiname'];
                        }
                        else {
                            selectQry = selectQry + ',' + $scope.tabs[tab].sections[section].fields[i]['fedcap_fieldapiname'];
                        }
                    }
                }
            }
            if (selectQry !== '') {
                $scope.tabs[tab].tabAllFields = $scope.tabs[tab].tabAllFields + ',' + selectQry;
                //debugger;
                //if ($scope.fieldCollection === null) {
                //    $scope.fieldCollection = $scope.tabs[tab].tabAllFields;
                //}
                //else {
                //    $scope.fieldCollection = fieldCollection + ',' + $scope.tabs[tab].tabAllFields;
                //}
                //$scope.tabs[tab].tabAllMPLFields = $scope.tabs[tab].tabAllMPLFields + ',' + selectQryforMultiPickList;
            }
            //************************************************************************************************
        }
        function setCharAt(str, index, chr) {
            if (index > str.length - 1) return str;
            return str.substr(0, index) + chr + str.substr(index + 1);
        }
        function FormatDate(passedDate) {
            var day = '';
            var month = '';
            var year = '';
            year = passedDate.getFullYear().toString();
            month = (passedDate.getMonth() + 1).toString();
            day = passedDate.getDate().toString();
            if (month.length === 1) {
                month = "0" + (passedDate.getMonth() + 1).toString();
            }
            if (day.length === 1) {
                day = "0" + passedDate.getDate().toString();
            }
            //var convertedDate = year + "-" + month + "-" + day;
            var convertedDate = month + "/" + day + "/" + year;
            return convertedDate;
        }
        function FormatDateUTC(passedDate) {
            var dateformatSplit = $scope.dateformat.split($scope.dateseparator);
            var day = '';
            var month = '';
            var year = '';
            var passedDateSplit = passedDate.split($scope.dateseparator);
            var convertDate = null;
            for (var i = 0; i < dateformatSplit.length; i++) {
                if (dateformatSplit[i].indexOf("y") !== -1) {
                    year = passedDateSplit[i];
                    if (year.length === 2) {
                        year = "20" + year;
                    }
                }
                else if (dateformatSplit[i].indexOf("M") !== -1 || dateformatSplit[i].indexOf("m") !== -1) {
                    month = passedDateSplit[i];
                    if (month === "Jan") {
                        month = "01";
                    }
                    else if (month === "Feb") {
                        month = "02";
                    }
                    else if (month === "Mar") {
                        month = "03";
                    }
                    else if (month === "Apr") {
                        month = "04";
                    }
                    else if (month === "May") {
                        month = "05";
                    }
                    else if (month === "Jun") {
                        month = "06";
                    }
                    else if (month === "Jul") {
                        month = "07";
                    }
                    else if (month === "Aug") {
                        month = "08";
                    }
                    else if (month === "Sep") {
                        month = "09";
                    }
                    else if (month === "Oct") {
                        month = "10";
                    }
                    else if (month === "Nov") {
                        month = "11";
                    }
                    else if (month === "Dec") {
                        month = "12";
                    }
                }
                else if (dateformatSplit[i].indexOf("d") !== -1) {
                    day = passedDateSplit[i];
                    if (day.length === 1) {
                        day = "0" + day;
                    }
                }
            }
            var convertDate = year + '-' + month + '-' + day;
            return convertDate;
        }
        function GetFieldOpportunityData(sectionGUID, tab, section) {
            var selectQry = $scope.tabs[tab].tabAllFields;
            var isMultiPickListExist = false;
            var selectQryforMultiPickList = '';
            var fieldIds = [];
            var fieldsArr = selectQry.split(',');
            if (fieldsArr[0] === '') {
                selectQry = setCharAt(selectQry, 0, "");
            }
            for (var i = 0; i < $scope.tabs[tab].sections[section].fields.length; i++) {
                if ($scope.tabs[tab].sections[section].fields[i]['fedcap_fieldtype'] === 'MultiSelectPicklistType') {
                    var selectedValues = Xrm.Page.getAttribute($scope.tabs[tab].sections[section].fields[i]['fedcap_fieldapiname']).getValue();
                    $scope.tabs[tab].sections[section].fields[i].MultiPickList = [];
                    $scope.tabs[tab].sections[section].fields[i].MultiPickList = selectedValues;
                    isMultiPickListExist = true;
                    fieldIds.push({ 'id': i });
                    if (selectQryforMultiPickList === '') {
                        selectQryforMultiPickList = $scope.tabs[tab].sections[section].fields[i]['fedcap_fieldapiname'];
                    }
                    else {
                        selectQryforMultiPickList = selectQryforMultiPickList + ',' + $scope.tabs[tab].sections[section].fields[i]['fedcap_fieldapiname'];
                    }
                }
            }

            try {
                Xrm.WebApi.retrieveRecord("opportunity", OID, "?$select=" + selectQry + "")
                .then(function success(opportunity) {
                    $scope.tabs[tab].sections[section].fieldValue = opportunity;
                    var filteredfieldValue = $scope.tabs[tab].sections[section].fields.filter(
                                       function (response) {
                                           if ('DateTime' === response["fedcap_fieldtype"]) {
                                               var fieldApiName = response["fedcap_fieldapiname"];
                                               if ($scope.tabs[tab].sections[section].fieldValue[fieldApiName] != null) {
                                                   var dateFormat = (new Date($scope.tabs[tab].sections[section].fieldValue[fieldApiName]));
                                                   var formatedValue = fieldApiName + "@OData.Community.Display.V1.FormattedValue";
                                                   $scope.tabs[tab].sections[section].fieldValue[formatedValue] = localDateToUTC(dateFormat);
                                               }
                                           }
                                           return 'DateTime' === response["fedcap_fieldtype"];
                                       });
                    //************************************Start field level security*************************************************************************************
                    var filteredfieldLevelSecuValue = $scope.tabs[tab].sections[section].fields.filter(
                                       function (response, index) {
                                           var fieldApiName = response["fedcap_fieldapiname"];
                                           try {
                                               //if (fieldApiName === "fedcap_ftes") {
                                               if (Xrm.Page.getAttribute(fieldApiName) != null) {
                                                   var fldLvlSec = Xrm.Page.getAttribute(fieldApiName).getUserPrivilege();
                                                   var canRead = fldLvlSec.canRead;
                                                   var canCreate = fldLvlSec.canCreate;
                                                   var canUpdate = fldLvlSec.canUpdate;
                                                   if (!fldLvlSec.canRead) {
                                                       if (response["fedcap_fieldtype"] === 'Money' || response["fedcap_fieldtype"] === 'Decimal' || response["fedcap_fieldtype"] === 'Integer' ||
                                                           response["fedcap_fieldtype"] === 'BigInt' || response["fedcap_fieldtype"] === 'DateTime' || response["fedcap_fieldtype"] === 'Lookup'
                                                           || response["fedcap_fieldtype"] === 'Customer') {
                                                           var formatedValue = fieldApiName + "@OData.Community.Display.V1.FormattedValue";
                                                           $scope.tabs[tab].sections[section].fieldValue[formatedValue] = "*****";
                                                       }
                                                       else {
                                                           $scope.tabs[tab].sections[section].fieldValue[fieldApiName] = "*****";
                                                       }
                                                       $scope.tabs[tab].sections[section].fields[index].canRead = false;
                                                       $('#' + fieldApiName).attr('disabled', true);

                                                   }
                                                   if (!fldLvlSec.canUpdate) {
                                                       $('#' + fieldApiName).attr('disabled', true);
                                                   }
                                                   if (!fldLvlSec.canCreate) {
                                                       $('#' + fieldApiName).attr('disabled', true);
                                                   }
                                               }
                                               //}
                                               $scope.tabs[tab].sections[section].fields[index].canRead = true;
                                           } catch (e) {
                                           }
                                           return;
                                       });
                    //************************************End field level security*************************************************************************************

                    //filteredfieldValue = $scope.tabs[tab].sections[section].fields.filter(
                    //                                       function (response) {
                    //                                           if ('Picklist' === response["fedcap_fieldtype"]) {
                    //                                               var fieldApiName = response["fedcap_fieldapiname"];
                    //                                               if ($scope.tabs[tab].sections[section].fieldValue[fieldApiName] != null) {
                    //                                                   var valuePicklist = $scope.tabs[tab].sections[section].fieldValue[fieldApiName];
                    //                                                   $scope.tabs[tab].sections[section].fieldValue[fieldApiName] = valuePicklist.toString();
                    //                                               }
                    //                                           }
                    //                                           return 'Picklist' === response["fedcap_fieldtype"];
                    //                                       });

                    if (isMultiPickListExist) {
                        //MultiPickListBind(selectQryforMultiPickList, tab, section, fieldIds);
                    }
                    $scope.$apply();
                }
                , function fail(respose) {
                    console.log(respose);
                })

            } catch (e) {
                console.log(e.message.toString());
            }
        }
        function BindCalenderIE(sectionId) {
            var datefield = document.createElement("input");
            datefield.id = sectionId;
            datefield.setAttribute("type", "date");
            if (datefield.type !== "date") { //if browser doesn't support input type="date", initialize date picker widget:
                jQuery(function ($) { //on
                    $('input[type=date]').datepicker({ dateFormat: 'yy-mm-dd' }).val();
                    $('input[type=date]').attr('placeholder', 'yyyy-mm-dd');
                })
            }
        }
        function localDateToUTC(localDate) {
            return new Date(localDate.getUTCFullYear(), localDate.getUTCMonth(), localDate.getUTCDate(), localDate.getUTCHours(), localDate.getUTCMinutes(), localDate.getUTCSeconds());
        }
        function MultiPickListBind(selectQry, tab, section, fieldIds) {
            try {
                var serverUrl = location.protocol + "//" + location.host;
                var req = new XMLHttpRequest(); // the name of custom entity is = new_trialentity
                req.open("GET", serverUrl + "/api/data/v9.0/opportunities(" + OID + ")?$select=" + selectQry, false);
                req.setRequestHeader("Accept", "application/json");
                req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
                req.setRequestHeader("Prefer", "odata.include-annotations=*");
                req.setRequestHeader("OData-MaxVersion", "4.0");
                req.setRequestHeader("OData-Version", "4.0");
                req.onreadystatechange = function () {
                    if (this.readyState === 4 /* complete */) {
                        req.onreadystatechange = null;
                        if (this.status === 200) {
                            var data = JSON.parse(this.response);
                            for (var field = 0; field < fieldIds.length; field++) {
                                //var value = fieldIds[field];
                                //$scope.tabs[tab].sections[section].fields[value.id].MultiPickList = [];
                                var retrivedFields = selectQry.split(',');
                                for (var retrivedField = 0; retrivedField < retrivedFields.length; retrivedField++) {
                                    var retrivedFieldName = retrivedFields[retrivedField];
                                    var value = fieldIds[retrivedField];
                                    $scope.tabs[tab].sections[section].fields[value.id].MultiPickList = [];
                                    if (data[retrivedFieldName] !== null) {
                                        //$("#Chosen_" + retrivedFieldName).val([]);
                                        $("#Chosen_" + retrivedFieldName + " option[value]").remove();
                                        var dataValue = data[retrivedFieldName].split(',');
                                        var dataText = data[retrivedFieldName + "@OData.Community.Display.V1.FormattedValue"].split('; ');
                                        for (var i = 0; i < dataValue.length; i++) {
                                            $scope.tabs[tab].sections[section].fields[value.id].MultiPickList.push({ "id": dataValue[i], "value": dataText[i] })
                                            $scope.tabs[tab].sections[section].fields[value.id].PickList = removeByKey($scope.tabs[tab].sections[section].fields[value.id].PickList, { key: 'id', value: parseInt(dataValue[i]) });

                                            function removeByKey(array, params) {
                                                array.some(function (item, index) {
                                                    if (array[index][params.key] === params.value) {
                                                        // found it!
                                                        array.splice(index, 1);
                                                    }
                                                });
                                                return array;
                                            }
                                        }
                                    }
                                    $scope.$apply();
                                }
                            }
                        }
                        else {
                            //var error = JSON.parse(this.response).error;
                            //Xrm.Utility.alertDialog(error.message);
                        }
                    }
                };
                req.send();

            } catch (e) {

            }
        }
        function GetOptionSetLabel(tab, section, field, EntityLogicalName, AttributeLogicalName) {
            SDK.Metadata.RetrieveAttribute(EntityLogicalName, AttributeLogicalName, "00000000-0000-0000-0000-000000000000", true,
                function (result) {
                    $scope.tabs[tab].sections[section].fields[field].PickList = [];
                    var optionSet = result.OptionSet.Options;
                    for (var i = 0; i < result.OptionSet.Options.length; i++) {
                        $scope.tabs[tab].sections[section].fields[field].PickList.push({ "id": result.OptionSet.Options[i].Value, "value": result.OptionSet.Options[i].Label.LocalizedLabels[0].Label })
                        //$scope.tabs[tab].sections[section].fields[field].PickList.push({ "id": result.OptionSet.Options[i].Value, "value": result.OptionSet.Options[i].Label.LocalizedLabels[0].Label, "color": result.OptionSet.Options[i].Color, "title": result.OptionSet.Options[i].Description.LocalizedLabels[0].Label })
                    }
                    $scope.$apply();
                },
                function (error) { }
            );
        }
        function GetOptionSetLabelMulti(tab, section, field, EntityLogicalName, AttributeLogicalName) {
            try {
                var multiOptionSet = Xrm.Page.getAttribute(AttributeLogicalName).getOptions();
                $scope.tabs[tab].sections[section].fields[field].PickList = [];
                for (var i = 0; i < multiOptionSet.length; i++) {
                    if (multiOptionSet[i].value != "-1") {
                        $scope.tabs[tab].sections[section].fields[field].PickList.push({ "id": multiOptionSet[i].value, "value": multiOptionSet[i].text })
                    }
                }
                $scope.$apply();
            } catch (e) {
            }
        }
        $scope.LinkChanged = function (height) {
            var heightConverted = parseInt(height);
            $('#fedcap_div', window.parent.document).height(heightConverted);
            $('#fedcap_div1', window.parent.document).height(heightConverted);
        }
        $scope.SelectedDemoValue = "1";
        $scope.OnOptionSetCallACT = function (fromAttribute) {
            var toAttribute = 'Chosen_' + fromAttribute;
            var fromAttribute = document.getElementById(fromAttribute);
            var selectedText = fromAttribute.options[fromAttribute.selectedIndex].text;
            //var selectedValue = document.getElementById(fromAttribute).value;
            var selectedValue = fromAttribute.options[fromAttribute.selectedIndex].value;

            var toAttribute = document.getElementById(toAttribute);
            var opt = document.createElement('option');
            opt.innerHTML = selectedText;
            opt.value = selectedValue;
            toAttribute.appendChild(opt);
            for (var i = 0; i < fromAttribute.length; i++) {
                if (fromAttribute.options[i].value === selectedValue) {
                    fromAttribute.remove(i);
                }
            }
        }
        $scope.OnOptionSetCallACTRev = function (toAttribute) {
            var fromAttribute = toAttribute;
            var toAttribute = 'Chosen_' + toAttribute;
            var toAttribute = document.getElementById(toAttribute);
            var selectedText = toAttribute.options[toAttribute.selectedIndex].text;
            //var selectedValue = document.getElementById(toAttribute).value;
            var selectedValue = toAttribute.options[toAttribute.selectedIndex].value;
            var fromAttribute = document.getElementById(fromAttribute);
            var opt = document.createElement('option');
            opt.innerHTML = selectedText;
            opt.value = selectedValue;
            fromAttribute.appendChild(opt);
            for (var i = 0; i < toAttribute.length; i++) {
                if (toAttribute.options[i].value === selectedValue) {
                    toAttribute.remove(i);
                }
            }
        }
        $scope.OpenLookupRecord = function (entityName, lookupRecordId) {
            try {

                if (lookupRecordId !== '') {
                    var Xrm = parent.Xrm;
                    var windowOptions = { openInNewWindow: false };
                    if (Xrm.Utility != null) {
                        Xrm.Utility.openEntityForm(entityName, lookupRecordId, null, windowOptions);
                    }
                }

            } catch (e) {

            }
        }
        var controlId, control_Id;
        $scope.OpenLookup = function (entityName, cntrlId) {
            controlId = cntrlId + "_id";
            control_Id = cntrlId;
            var lookupObjectParams = {};
            lookupObjectParams.entityTypes = [entityName];
            lookupObjectParams.defaultEntityType = entityName;
            //lookupObjectParams.defaultViewId = "3B24E1B8-438C-4B49-8A68-8748D5291688";
            lookupObjectParams.allowMultiSelect = false;
            lookupObjectParams.disableMru = true;
            //**********************Start Dependent Country-State*************************
            if (cntrlId === "_fedcap_project_stateprovince_value") {
                lookupObjectParams.filters = [{
                    filterXml: "<filter type='and'><condition attribute='fedcap_countryname' operator='eq' value='{" + $("#_fedcap_project_country_value_id").val() + "}' /></filter>",
                    entityLogicalName: entityName
                }];
            }
            //**********************End Dependent Country-State*************************

            Xrm.Utility.lookupObjects(lookupObjectParams).then(CallbackFunctionLookup, LookupCancelCallback)
        }
        function CallbackFunctionLookup(selectedItems) {
            if (selectedItems != null && selectedItems.length > 0) {
                var lookup = [{ id: selectedItems[0].id, typename: selectedItems[0].typename, name: selectedItems[0].name }];
                $("#" + control_Id).val(lookup[0].name);
                $("#" + controlId).val(lookup[0].id.substring(1, 37));
                $("#" + control_Id).removeClass('ng-pristine').addClass('ng-dirty');
                //**********************Start Dependent Country-State*************************
                if (control_Id === "_fedcap_project_country_value") {
                    $("#_fedcap_project_country_value").removeClass('ng-pristine').addClass('ng-dirty');
                    $("#_fedcap_project_stateprovince_value_id").val('');
                    $("#_fedcap_project_stateprovince_value").val('');
                }
                //**********************End Dependent Country-State*************************
            }
        }
        function LookupCancelCallback() { }
        var currencySymbol = '';
        var DoubleClickSave = false;
        $scope.saveForm = function (cntrlId, selectControls, tabName) {
            var currencySymbol = $scope.currencysymbol;
            var btnId = tabName;
            var entityData = {};
            var entityName = '';
            var inValid = false;
            var errormsg = "";
            var ifOpportunityStatus = false;
            var isDirtyCheck = false;
            var OpportunityStatusValue;
            if (OID === '') {
                Xrm.Page.ui.setFormNotification("Please wait while Opportunity is creating..!!!", "WARNING", "1")
            }
            else {
                Xrm.Page.ui.setFormNotification("Please wait while " + tabName + " is updating..!!!", "WARNING", "1")
            }
            try {
                if (tabName === 'PWin' || tabName === "CRS") {
                    if (!DoubleClickSave) {
                        DoubleClickSave = true;
                    }
                    else {
                        DoubleClickSave = false;
                        return;
                    }
                    //var isDirtyCheck = true;
                    var filteredTab = $scope.tabs.filter(
                                        function (response) {
                                            var id = response["fedcap_customizetabid"];
                                            return (id === cntrlId);
                                        });
                    for (var sec = 0; sec < filteredTab[0].sections.length; sec++) {
                        if (filteredTab[0].sections[sec]["fedcap_name"] === 'PWin' || filteredTab[0].sections[sec]["fedcap_name"] === 'CRS') {
                            var PhaseObj = new Object();
                            for (var i = 0; i < $scope.pwintabs.length; i++) {
                                for (var que = 0; que < $scope.pwintabs[i].questions.length; que++) {
                                    try {
                                        var questionId = $scope.pwintabs[i].questions[que]["fedcap_pwinquestionid"];
                                        var questionWt = $scope.pwintabs[i].questions[que]["fedcap_weighting"];
                                        var _questionId = "ans_" + questionId;
                                        var filteredData = filteredTab[0].sections[sec].pwingivenans.filter(
                                                    function (response) {
                                                        var id = response["_fedcap_pwinquestion_value"];
                                                        return (id === questionId);
                                                    })
                                        var questionName = $scope.pwintabs[i].questions[que]["fedcap_name"]
                                        var AnswerId = $('input[name="' + _questionId + '"]:checked').attr('id');
                                        var AnswerWt = $('input[name="' + _questionId + '"]:checked').attr('value');
                                        PhaseObj["fedcap_OpportunityID@odata.bind"] = "/fedcap_opportunitypwinanswers(" + OID + ")";
                                        PhaseObj["fedcap_name"] = questionName;
                                        PhaseObj["fedcap_pwinanswerweighting"] = AnswerWt;
                                        PhaseObj["fedcap_PWinGivenAnswer@odata.bind"] = "/fedcap_opportunitypwinanswers(" + AnswerId + ")";
                                        PhaseObj["fedcap_PWinQuestion@odata.bind"] = "/fedcap_opportunitypwinanswers(" + questionId + ")";
                                        //PhaseObj["fedcap_category"] = $scope.pwintabs[i].questions[que]["fedcap_category"];
                                        //PhaseObj["fedcap_stage"] = $scope.pwintabs[i].questions[que]["fedcap_stage"];
                                        entityName = 'fedcap_opportunitypwinanswers'
                                        var serverUrl = location.protocol + "//" + location.host;
                                        var req = new XMLHttpRequest();
                                        if (filteredData.length === 0) {
                                            req.open("POST", serverUrl + "/api/data/v9.0/fedcap_opportunitypwinanswers", true);
                                        }
                                        else {
                                            req.open("PATCH", serverUrl + "/api/data/v9.0/fedcap_opportunitypwinanswers(" + filteredData[0]["fedcap_opportunitypwinanswerid"] + ")", true);
                                        }
                                        req.setRequestHeader("Accept", "application/json");
                                        req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
                                        req.setRequestHeader("Prefer", "odata.include-annotations=*");
                                        req.setRequestHeader("OData-MaxVersion", "4.0");
                                        req.setRequestHeader("OData-Version", "4.0");
                                        req.onreadystatechange = function () {
                                            if (this.readyState === 4) {
                                                req.onreadystatechange = null;
                                                if (this.status === 204) {
                                                }
                                            }
                                            else {
                                            }
                                        }
                                        var body = JSON.stringify(PhaseObj);
                                        req.send(body);
                                    } catch (e) {
                                    }
                                }

                            }
                        }
                    }
                }
                else if (tabName === 'PGo' || tabName === 'SGI') {
                    //var isDirtyCheck = true;
                    if (!DoubleClickSave) {
                        DoubleClickSave = true;
                    }
                    else {
                        DoubleClickSave = false;
                        return;
                    }
                    ////*********************PGO With Stages*********************************************************************
                    //var filteredTab = $scope.tabs.filter(
                    //                    function (response) {
                    //                        var id = response["fedcap_customizetabid"];
                    //                        return (id === cntrlId);
                    //                    });
                    //for (var sec = 0; sec < filteredTab[0].sections.length; sec++) {
                    //    if (filteredTab[0].sections[sec]["fedcap_name"] === 'PGo' || filteredTab[0].sections[sec]["fedcap_name"] === 'SGI') {
                    //        var PhaseObj = new Object();
                    //        for (var i = 0; i < $scope.pgotabs.length; i++) {
                    //            for (var que = 0; que < $scope.pgotabs[i].questions.length; que++) {
                    //                var questionId = $scope.pgotabs[i].questions[que]["fedcap_pgoquestionid"];
                    //                var questionWt = $scope.pgotabs[i].questions[que]["fedcap_weighting"];
                    //                var _questionId = "ans_" + questionId;
                    //                var filteredData = filteredTab[0].sections[sec].pgogivenans.filter(
                    //                            function (response) {
                    //                                var id = response["_fedcap_pgoquestion_value"];
                    //                                return (id === questionId);
                    //                            })
                    //                var questionName = $scope.pgotabs[i].questions[que]["fedcap_name"]
                    //                var AnswerId = $('input[name="' + _questionId + '"]:checked').attr('id');
                    //                var AnswerWt = $('input[name="' + _questionId + '"]:checked').attr('value');
                    //                PhaseObj["fedcap_OpportunityID@odata.bind"] = "/fedcap_opportunitypgoanswers(" + OID + ")";
                    //                PhaseObj["fedcap_name"] = questionName;
                    //                PhaseObj["fedcap_pgoanswerweighting"] = AnswerWt;
                    //                PhaseObj["fedcap_PGoGivenAnswer@odata.bind"] = "/fedcap_opportunitypgoanswers(" + AnswerId + ")";
                    //                PhaseObj["fedcap_PGoQuestion@odata.bind"] = "/fedcap_opportunitypgoanswers(" + questionId + ")";
                    //                entityName = 'fedcap_opportunitypgoanswers'
                    //                var serverUrl = location.protocol + "//" + location.host;
                    //                var req = new XMLHttpRequest();
                    //                if (filteredData.length === 0) {
                    //                    req.open("POST", serverUrl + "/api/data/v9.0/fedcap_opportunitypgoanswers", true);
                    //                }
                    //                else {
                    //                    req.open("PATCH", serverUrl + "/api/data/v9.0/fedcap_opportunitypgoanswers(" + filteredData[0]["fedcap_opportunitypgoanswerid"] + ")", true);
                    //                }
                    //                req.setRequestHeader("Accept", "application/json");
                    //                req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
                    //                req.setRequestHeader("Prefer", "odata.include-annotations=*");
                    //                req.setRequestHeader("OData-MaxVersion", "4.0");
                    //                req.setRequestHeader("OData-Version", "4.0");
                    //                req.onreadystatechange = function () {
                    //                    if (this.readyState === 4) {
                    //                        req.onreadystatechange = null;
                    //                        if (this.status === 204) {
                    //                        }
                    //                    }
                    //                    else {
                    //                    }
                    //                }
                    //                var body = JSON.stringify(PhaseObj);
                    //                req.send(body);
                    //            }
                    //        }
                    //    }
                    //}
                    ////*********************PGO With Stages*********************************************************************

                    //********************************PGo Without Stage*************************************
                    var PhaseObj = new Object();
                    for (var tab = 0; tab < $scope.tabs.length; tab++) {
                        if ($scope.tabs[tab]["fedcap_name"] === "PGo" || $scope.tabs[tab]["fedcap_name"] === "SGI") {
                            for (var sec = 0; sec < $scope.tabs[tab].sections.length; sec++) {
                                if ($scope.tabs[tab].sections[sec]["fedcap_name"] === 'PGo' || $scope.tabs[tab].sections[sec]["fedcap_name"] === 'SGI') {
                                    for (var que = 0; que < $scope.tabs[tab].sections[sec].pgoquestions.length; que++) {
                                        var questionId = $scope.tabs[tab].sections[sec].pgoquestions[que]["fedcap_pgoquestionid"];
                                        var questionWt = $scope.tabs[tab].sections[sec].pgoquestions[que]["fedcap_weighting"];
                                        var _questionId = "ans_" + questionId;
                                        var questionName = $scope.tabs[tab].sections[sec].pgoquestions[que]["fedcap_name"]
                                        var filteredData = $scope.tabs[tab].sections[sec].pgogivenans.filter(
                                        function (response) {
                                            var id = response["_fedcap_pgoquestion_value"];
                                            return (id === questionId);
                                        })
                                        var AnswerId = $('input[name="' + _questionId + '"]:checked').attr('id');
                                        var AnswerWt = $('input[name="' + _questionId + '"]:checked').attr('value');
                                        PhaseObj["fedcap_OpportunityID@odata.bind"] = "/fedcap_opportunitypgoanswers(" + OID + ")";
                                        PhaseObj["fedcap_name"] = questionName;
                                        PhaseObj["fedcap_pgoanswerweighting"] = AnswerWt;
                                        PhaseObj["fedcap_PGoGivenAnswer@odata.bind"] = "/fedcap_opportunitypgoanswers(" + AnswerId + ")";
                                        PhaseObj["fedcap_PGoQuestion@odata.bind"] = "/fedcap_opportunitypgoanswers(" + questionId + ")";
                                        var serverUrl = location.protocol + "//" + location.host;
                                        var req = new XMLHttpRequest();
                                        if (filteredData.length === 0) {
                                            req.open("POST", serverUrl + "/api/data/v9.0/fedcap_opportunitypgoanswers", true);
                                        }
                                        else {
                                            req.open("PATCH", serverUrl + "/api/data/v9.0/fedcap_opportunitypgoanswers(" + filteredData[0]["fedcap_opportunitypgoanswerid"] + ")", true);
                                        }
                                        req.setRequestHeader("Accept", "application/json");
                                        req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
                                        req.setRequestHeader("Prefer", "odata.include-annotations=*");
                                        req.setRequestHeader("OData-MaxVersion", "4.0");
                                        req.setRequestHeader("OData-Version", "4.0");
                                        req.onreadystatechange = function () {
                                            if (this.readyState === 4) {
                                                req.onreadystatechange = null;
                                                if (this.status === 204) {
                                                }
                                            }
                                        }
                                        var body = JSON.stringify(PhaseObj);
                                        req.send(body);
                                    }
                                }
                            }
                        }
                    }
                    //********************************PGo Without Stage*************************************

                }
                else if (tabName === 'Intelligence') {
                }
                entityName = 'opportunity'
                var tabFields = selectControls.split(',');
                var isrequired = [];
                for (var i = 1; i <= tabFields.length; i++) {
                    if (tabFields[i] === "fedcap_opportunityhealthrating") {
                        entityData[tabFields[i]] = StarRatingCalculation();
                    }
                    var isReadOnly = $("#" + tabFields[i] + "").attr('ng-readonly');
                    if (isReadOnly === "true") {

                    }
                    else {
                        var fieldtype = $("#" + tabFields[i] + "").attr('data-fieldtype');
                        var _isrequired = $("#" + tabFields[i] + "").data('isrequired');
                        if (_isrequired) {
                            if (fieldtype === 'Boolean') {
                                if ($("#" + tabFields[i] + "").prop("checked") !== true) {
                                    $("#" + tabFields[i] + "").css({ "border": "1px solid #DC1616" });
                                    isrequired.push({ "id": tabFields[i], "ValidationMsg": $("#" + tabFields[i] + "").data('label') });
                                }
                                else {
                                    $("#" + tabFields[i] + "").css({ "border": "1px solid #f8f8f8" });
                                }
                            }
                            if ($("#" + tabFields[i] + "").val() === '') {
                                isrequired.push({ "id": tabFields[i], "ValidationMsg": $("#" + tabFields[i] + "").data('label') });
                                $("#" + tabFields[i] + "").css({ "border": "1px solid #DC1616" });
                            }
                            else {
                                $("#" + tabFields[i] + "").css({ "border": "1px solid #f8f8f8" });
                            }
                        }
                        var value = $("#" + tabFields[i] + "").val();
                        var id = $("#" + tabFields[i] + "").attr('id');
                        var isClass = $("#" + tabFields[i] + "").attr('class');
                        if (isClass !== undefined) {
                            //if (isClass.indexOf("ng-not-modified") === -1) {
                            var dirty = isClass.indexOf("ng-dirty");
                            if (isClass.indexOf("ng-dirty") !== -1 || fieldtype === 'Lookup' || fieldtype === 'Customer' || fieldtype === 'MultiSelectPicklistType') {

                                if (fieldtype === 'String' || fieldtype === 'Memo') {
                                    entityData[id] = value;
                                    isDirtyCheck = true;
                                }
                                if (fieldtype === 'DateTime') {
                                    if (value != '') {
                                        entityData[id] = FormatDateUTC(value);
                                    }
                                    else {
                                        entityData[id] = null;
                                    }
                                    isDirtyCheck = true;
                                }
                                if (fieldtype === 'Integer' || fieldtype === 'BigInt') {
                                    value = parseInt(value.replace('$', '').replace(/,/g, '').replace(currencySymbol, ''));
                                    entityData[id] = value;
                                    isDirtyCheck = true;
                                }
                                if (fieldtype === 'Money' || fieldtype === 'Decimal') {
                                    value = parseFloat(value.replace('$', '').replace(/,/g, '').replace(currencySymbol, ''));
                                    entityData[id] = value;
                                    isDirtyCheck = true;
                                }
                                if (fieldtype === 'Picklist') {
                                    var pickListId = value.replace('number:', '').replace('string:', '').replace(/,/g, '');
                                    if (value === "") {
                                        entityData[id] = null;
                                    }
                                    else {
                                        entityData[id] = pickListId;
                                        if (tabFields[i] === "fedcap_opportunitystatus") {
                                            ifOpportunityStatus = true;
                                            OpportunityStatusValue = pickListId;
                                        }
                                    }
                                    isDirtyCheck = true;
                                }
                                if (fieldtype === 'MultiSelectPicklistType') {
                                    var selected = $("#" + tabFields[i]).find("option:selected");
                                    var arrSelected = [];
                                    var multiSelectPicklistSelectedValues = '';
                                    for (var idx = 0; idx < selected.length; idx++) {
                                        var index = idx + 1;
                                        if (selected.length === index) {
                                            multiSelectPicklistSelectedValues = multiSelectPicklistSelectedValues + selected[idx].value.replace('number:', '').replace('string:', '').replace(/,/g, '');

                                        }
                                        else {
                                            multiSelectPicklistSelectedValues = multiSelectPicklistSelectedValues + selected[idx].value.replace('number:', '').replace('string:', '').replace(/,/g, '') + ",";

                                        }
                                    }
                                    //selected.each((idx, val) => {
                                    //    var index = idx + 1;
                                    //    if (selected.length === index) {
                                    //        multiSelectPicklistSelectedValues = multiSelectPicklistSelectedValues + val.value.replace('number:', '').replace('string:', '').replace(/,/g, '');
                                    //    }
                                    //    else {
                                    //        multiSelectPicklistSelectedValues = multiSelectPicklistSelectedValues + val.value.replace('number:', '').replace('string:', '').replace(/,/g, '') + ",";
                                    //    }
                                    //    //arrSelected.push(val.value.replace('number:', '').replace('string:', '').replace(/,/g, ''));
                                    //});
                                    //var multiSelectPicklistId = "Chosen_" + tabFields[i];
                                    //var multiSelectPicklist = document.getElementById(multiSelectPicklistId);
                                    //var multiSelectPicklistSelectedValues = '';
                                    //for (var selected = 0; selected < multiSelectPicklist.length; selected++) {
                                    //    var selectedCheck = selected + 1;
                                    //    if (selectedCheck == multiSelectPicklist.length) {
                                    //        multiSelectPicklistSelectedValues += multiSelectPicklist[selected].value.replace('number:', '').replace('string:', '').replace(/,/g, '');
                                    //    }
                                    //    else {
                                    //        multiSelectPicklistSelectedValues += multiSelectPicklist[selected].value.replace('number:', '').replace('string:', '').replace(/,/g, '') + ",";
                                    //    }
                                    //}
                                    if (multiSelectPicklistSelectedValues == '') {
                                        if (OID === "") {
                                            //on New oppurtunity creation if multipicklist null or does not contain value then leave fill in entityData variable.
                                        }
                                        else {
                                            entityData[id] = null;
                                        }
                                    }
                                    else {
                                        entityData[id] = multiSelectPicklistSelectedValues;

                                    }
                                    isDirtyCheck = true;
                                }
                                if (fieldtype === 'Boolean') {
                                    var check = false;
                                    if ($("#" + tabFields[i] + "").prop("checked") === true) {
                                        var check = true;
                                    }
                                    entityData[id] = check;
                                    isDirtyCheck = true;
                                }
                                //if (fieldtype === 'Lookup' || fieldtype === 'Customer') {
                                //    var idApi = $("#" + tabFields[i] + "").attr('data-webapi');
                                //    var lookupValue = $("#" + tabFields[i] + "_id").val();
                                //    if (lookupValue != '') {
                                //        if (fieldtype === 'Customer') {
                                //            idApi = idApi + '_account';
                                //        }
                                //        entityData["" + idApi + "@odata.bind"] = "/opportunities(" + lookupValue + ")";
                                //        isDirtyCheck = true;
                                //    }
                                //}
                                if (fieldtype === 'Lookup' || fieldtype === 'Customer') {
                                    var idApi = $("#" + tabFields[i] + "").attr('data-webapi');
                                    var lookupValue = $("#" + tabFields[i] + "_id").val();
                                    var lookupText = $("#" + tabFields[i]).val();
                                    if (lookupValue === undefined) {
                                        lookupValue = value.replace('number:', '').replace('string:', '').replace(/,/g, '');
                                    }
                                    if (lookupText === "") {
                                        var lookupId = idApi.toLowerCase();
                                        try {
                                            var chkCtlIfExist = Xrm.Page.getAttribute(idApi.toLowerCase());
                                            if (chkCtlIfExist != null) {
                                                Xrm.Page.getAttribute(idApi.toLowerCase()).setValue(null);
                                            }
                                        } catch (e) {
                                        }
                                    }
                                    else {
                                        if (lookupValue != '') {
                                            if (fieldtype === 'Customer') {
                                                idApi = idApi + '_account';
                                            }
                                            if (idApi === "OwnerId") {
                                            }
                                            else {
                                                entityData["" + idApi + "@odata.bind"] = "/opportunities(" + lookupValue + ")";
                                                isDirtyCheck = true;
                                            }
                                        }
                                        else {
                                        }
                                    }

                                }
                            }
                        }
                    }
                }
                if (isrequired.length > 0) {
                    var validationMsg = '';
                    if (isrequired.length > 1) {
                        for (var i = 0; i < isrequired.length; i++) {
                            validationMsg = validationMsg + isrequired[i]['ValidationMsg'] + ",";
                        }
                        //$("#dvNotificationText").text(validationMsg + " are required.");
                        Xrm.Page.ui.setFormNotification(tabName + '-->' + validationMsg + " are required.", "WARNING", "1")
                    }
                    else {
                        //$("#dvNotificationText").text(isrequired[0]['ValidationMsg'] + " is required.");
                        Xrm.Page.ui.setFormNotification(isrequired[0]['ValidationMsg'] + " is required.", "WARNING", "1")
                    }

                    //$("#dvNotification").toggleClass('warning').removeClass('error').removeClass('info');
                    setTimeout(function () {
                        //$("#dvNotificationText").text(""); $("#dvNotification").removeClass('warning');
                        Xrm.Page.ui.clearFormNotification("1");
                    }, 15000);
                    return;
                }
                if (!Validation(tabName, currencySymbol)) {
                    return;
                }
                if (OID === '') {
                    if ($('#name').length > 0) {
                        var requiredOpportunityName = $("#name").val();
                        if (requiredOpportunityName === "") {
                            Xrm.Page.ui.setFormNotification("Opportunity name is required.", "WARNING", "1")
                            setTimeout(function () {
                                //$("#dvNotificationText").text(""); $("#dvNotification").removeClass('warning');
                                Xrm.Page.ui.clearFormNotification("1");
                            }, 5000);
                            return;
                        }
                        else {
                            entityData.name = requiredOpportunityName;
                        }
                    }
                    Xrm.WebApi.createRecord(entityName, entityData).then(function (result) {
                        var recordId = result.id;
                        Xrm.Page.ui.setFormNotification("Opportunity is created successfully.", "INFO", "1")

                        setTimeout(function () { Xrm.Page.ui.clearFormNotification("1"); }, 2000);
                        var windowOptions = {
                            openInNewWindow: false
                        };
                        if (Xrm.Utility != null) {
                            Xrm.Utility.openEntityForm("opportunity", recordId, null, windowOptions);
                        }
                    },
                    function (error) {
                        //Xrm.Page.ui.setFormNotification("Error while Opportunity creating.", "ERROR", "1")
                        Xrm.Page.ui.setFormNotification(error.message.toString(), "ERROR", "1")
                        setTimeout(function () { Xrm.Page.ui.clearFormNotification("1"); }, 7000);
                    }
                    );

                }
                else {
                    if (ifOpportunityStatus) {
                        var StageChangeOrNot = StageChange(OpportunityStatusValue);
                        if (StageChangeOrNot === false) {
                            Xrm.Page.ui.setFormNotification("Please select stage step by step.\nOR \nPlease fill required field(s) from the page(Header Or Section).", "WARNING", "1")
                            setTimeout(function () { Xrm.Page.ui.clearFormNotification("1"); }, 7000);
                            return;
                        }

                    }
                    if (isDirtyCheck) {
                        Xrm.WebApi.updateRecord(entityName, OID, entityData).then(
                                                function success(result) {
                                                    if (ifOpportunityStatus) {
                                                        setTimeout(function () {
                                                            var recordId = result.id;
                                                            var windowOptions = {
                                                                openInNewWindow: false
                                                            };
                                                            if (Xrm.Utility != null) {
                                                                Xrm.Utility.openEntityForm("opportunity", recordId, null, windowOptions);
                                                            }
                                                        }, 2000);

                                                    }
                                                    for (var tab = 0; tab < $scope.tabs.length; tab++) {
                                                        if ($scope.tabs[tab]["fedcap_customizetabid"] === cntrlId) {
                                                            for (var section = 0; section < $scope.tabs[tab].sections.length; section++) {
                                                                if (tabName === 'Intelligence') {
                                                                    Xrm.Page.ui.setFormNotification("Please wait, System is retrieving GovWin data....", "WARNING", "2");
                                                                    setFBODetailsDate();
                                                                    CallGovWin();
                                                                    //var iFrameObj = $('#GovWinFBO').attr('id');
                                                                    //var id = $('#GovWinFBO').attr('src');
                                                                    //$('#GovWinFBO').attr('src', $('#GovWinFBO').attr('src'));
                                                                }
                                                                if (tabName === 'GOVWIN' || tabName === 'GovWin') {
                                                                    Xrm.Page.ui.setFormNotification("Please wait, System is retrieving GovWin data....", "WARNING", "2");
                                                                    setFBODetailsDate();
                                                                    CallGovWin();
                                                                    //var iFrameObj = $('#GovWinFBO').attr('id');
                                                                    //var id = $('#GovWinFBO').attr('src');
                                                                    //$('#GovWinFBO').attr('src', $('#GovWinFBO').attr('src'));
                                                                }
                                                                if (tabName === 'FBO') {
                                                                    setFBODetailsDate();
                                                                }
                                                                else if (tabName === 'PWin' || tabName === 'CRS') {
                                                                    GetPWinOpportunityGivenQuestionAnswer(tab, section);
                                                                    GetOptionSetLabelValue(tab, section, "fedcap_pwinquestion", "fedcap_stage");
                                                                    $scope.$apply();
                                                                    //    var objArry = {};
                                                                    //    objArry.fedcap_pwin_phase0_score = parseFloat($scope.pwintabs[0]["score"]);
                                                                    //    objArry.fedcap_pwin_phase1_score = parseFloat($scope.pwintabs[1]["score"]);
                                                                    //    Xrm.WebApi.updateRecord("opportunity", OID, objArry).then(
                                                                    //    function success(result) {
                                                                    //        GetFieldOpportunityData($scope.tabs[tab].sections[section]["fedcap_customizesectionid"], tab, section);
                                                                    //    },
                                                                    //    function (error) {
                                                                    //    }
                                                                    //);
                                                                }
                                                                else if (tabName === 'PGo' || tabName === 'SGI') {
                                                                    GetPGoOpportunityGivenQuestionAnswer(tab, section);
                                                                    GetPGoQuestion(tab, section);
                                                                    //GetOptionSetLabelValue(tab, section, "fedcap_pgoquestion", "fedcap_pgo_stage");

                                                                    $scope.$apply();
                                                                    //  var objArry = {};
                                                                    //  objArry.fedcap_pgo_score = parseFloat($scope.tabs[tab].sections[section].pgoquestions.score);
                                                                    //    Xrm.WebApi.updateRecord("opportunity", OID, objArry).then(
                                                                    //    function success(result) {
                                                                    //        GetFieldOpportunityData($scope.tabs[tab].sections[section]["fedcap_customizesectionid"], tab, section);
                                                                    //    },
                                                                    //    function (error) {
                                                                    //    }
                                                                    //);
                                                                }
                                                                else {
                                                                    //GetFieldOpportunityData($scope.tabs[tab].sections[section]["fedcap_customizesectionid"], tab, section);
                                                                    //var save = true;
                                                                    //Xrm.Page.data.refresh(save).then(successDynamicCallback, errorDynamicCallback);
                                                                }
                                                            }
                                                        }
                                                    }
                                                    Xrm.Page.ui.setFormNotification("" + tabName + " is updated successfully.", "INFO", "1");

                                                    setTimeout(function () { Xrm.Page.ui.clearFormNotification("1"); }, 1500);
                                                    if (tabName === 'Intelligence') {
                                                    }
                                                    else if (tabName === 'PGo' || tabName === 'SGI') {

                                                    }
                                                    else if (tabName === 'PWin' || tabName === 'CRS') {

                                                    }
                                                    else {
                                                        //try {
                                                        //    if ($("#_ownerid_value").length > 0) {
                                                        //        Xrm.Page.getAttribute("ownerid").setValue([{ id: $("#_ownerid_value_id").val(), name: $("#_ownerid_value").val(), entityType: "systemuser" }]);
                                                        //    }
                                                        //} catch (e) {
                                                        //}
                                                        setTimeout(function () {
                                                            var save = true;
                                                            //Saurabh
                                                            Xrm.Page.data.refresh(save).then(
                                                                function successDynamicCallback() {
                                                                    for (var tab = 0; tab < $scope.tabs.length; tab++) {
                                                                        $scope.tabs[tab].LoadTabData = false;
                                                                        if ($scope.tabs[tab]["fedcap_customizetabid"] === cntrlId) {
                                                                            for (var section = 0; section < $scope.tabs[tab].sections.length; section++) {
                                                                                GetFieldOpportunityData($scope.tabs[tab].sections[section]["fedcap_customizesectionid"], tab, section);
                                                                            }
                                                                        }
                                                                    }
                                                                },
                                                                function errorDynamicCallback() {
                                                                    for (var tab = 0; tab < $scope.tabs.length; tab++) {
                                                                        $scope.tabs[tab].LoadTabData = false;
                                                                        if ($scope.tabs[tab]["fedcap_customizetabid"] === cntrlId) {
                                                                            for (var section = 0; section < $scope.tabs[tab].sections.length; section++) {
                                                                                GetFieldOpportunityData($scope.tabs[tab].sections[section]["fedcap_customizesectionid"], tab, section);
                                                                            }
                                                                        }
                                                                    }
                                                                });
                                                        }, 1000);
                                                    }
                                                },
                                                function (error) {
                                                    //Xrm.Page.ui.setFormNotification("Error while " + tabName + " is updating.", "ERROR", "1")
                                                    Xrm.Page.ui.setFormNotification(error.message.toString(), "ERROR", "1")

                                                    setTimeout(function () { Xrm.Page.ui.clearFormNotification("1"); }, 7000);
                                                }
                                            );
                    }
                    else {
                        Xrm.Page.ui.setFormNotification("" + tabName + " is updated successfully.", "INFO", "1");
                        //try {
                        //    if ($("#_ownerid_value").length > 0) {
                        //        Xrm.Page.getAttribute("ownerid").setValue([{ id: $("#_ownerid_value_id").val(), name: $("#_ownerid_value").val(), entityType: "systemuser" }]);
                        //    }
                        //} catch (e) {
                        //}
                        setTimeout(function () {
                            var save = true;

                            Xrm.Page.data.refresh(save).then(
                                function successDynamicCallback() {
                                    for (var tab = 0; tab < $scope.tabs.length; tab++) {
                                        $scope.tabs[tab].LoadTabData = false;
                                        if ($scope.tabs[tab]["fedcap_customizetabid"] === cntrlId) {
                                            for (var section = 0; section < $scope.tabs[tab].sections.length; section++) {
                                                if (tabName === "PWin" || tabName === "CRS") {
                                                    GetPWinOpportunityGivenQuestionAnswer(tab, section);
                                                    GetOptionSetLabelValue(tab, section, "fedcap_pwinquestion", "fedcap_stage");
                                                    DoubleClickSave = false;
                                                    $scope.$apply();
                                                }
                                                if (tabName === "PGo" || tabName === "SGI") {
                                                    GetPGoOpportunityGivenQuestionAnswer(tab, section);
                                                    GetPGoQuestion(tab, section);
                                                    //GetOptionSetLabelValue(tab, section, "fedcap_pgoquestion", "fedcap_pgo_stage");
                                                    DoubleClickSave = false;
                                                    $scope.$apply();
                                                }
                                                GetFieldOpportunityData($scope.tabs[tab].sections[section]["fedcap_customizesectionid"], tab, section);
                                            }
                                        }
                                    }
                                },
                                function errorDynamicCallback() {
                                    for (var tab = 0; tab < $scope.tabs.length; tab++) {
                                        $scope.tabs[tab].LoadTabData = false;
                                        if ($scope.tabs[tab]["fedcap_customizetabid"] === cntrlId) {
                                            for (var section = 0; section < $scope.tabs[tab].sections.length; section++) {
                                                if (tabName === "PWin" || tabName === "CRS") {
                                                    GetPWinOpportunityGivenQuestionAnswer(tab, section);
                                                    GetOptionSetLabelValue(tab, section, "fedcap_pwinquestion", "fedcap_stage");
                                                    DoubleClickSave = false;
                                                    $scope.$apply();
                                                }
                                                if (tabName === "PGo" || tabName === "SGI") {
                                                    GetPGoOpportunityGivenQuestionAnswer(tab, section);
                                                    GetPGoQuestion(tab, section);
                                                    //GetOptionSetLabelValue(tab, section, "fedcap_pgoquestion", "fedcap_pgo_stage");
                                                    DoubleClickSave = false;
                                                    $scope.$apply();
                                                }
                                                GetFieldOpportunityData($scope.tabs[tab].sections[section]["fedcap_customizesectionid"], tab, section);
                                            }
                                        }
                                    }
                                });
                        }, 500);
                        setTimeout(function () { Xrm.Page.ui.clearFormNotification("1"); }, 1500);
                    }

                }
            } catch (e) {
                //Xrm.Page.ui.setFormNotification("Error while " + tabName + " is updating.", "ERROR", "1")
                Xrm.Page.ui.setFormNotification(error.message.toString(), "ERROR", "1")

                setTimeout(function () { Xrm.Page.ui.clearFormNotification("1"); }, 7000);
            }
        }
        var lookupArrForNull = [];
        $scope.saveData = function () {
            SaveWinPlan();
        }
        function SaveWinPlan() {
            //debugger;
            lookupArrForNull = [];
            var tabName = $scope.ExternalComponent;
            var tabNameValidation = '';
            var selectControls = "";
            var cntrlId = "";
            var currencySymbol = $scope.currencysymbol;
            var btnId = tabName;
            var entityData = {};
            var entityName = '';
            var inValid = false;
            var errormsg = "";
            var ifOpportunityStatus = false;
            var isDirtyCheck = false;
            var OpportunityStatusValue;
            if (OID === '') {
                Xrm.Page.ui.setFormNotification("Please wait while Opportunity is creating..!!!", "WARNING", "1")
            }
            else {
                Xrm.Page.ui.setFormNotification("Please wait while Opportunity is updating..!!!", "WARNING", "1")
            }
            try {
                //if (tabName === 'PWin') {

                //}
                //else if (tabName === 'PGo')
                //{

                //}
                //else if (tabName === 'Intelligence') {
                //}
                entityName = 'opportunity'
                var isrequired = [];
                for (var tt = 0; tt < $scope.tabs.length; tt++) {
                    if ($scope.tabs[tt].LoadTabData === true) {
                        tabNameValidation = $scope.tabs[tt].fedcap_name;
                        //cntrlId = $scope.tabs[tt].fedcap_customizetabid;
                        selectControls = $scope.tabs[tt].tabAllFields;
                        var tabFields = selectControls.split(',');
                        for (var i = 1; i <= tabFields.length; i++) {
                            var feildCheck = $("#" + tabFields[i]);
                            if (tabFields[i] === "fedcap_opportunityhealthrating") {
                                entityData[tabFields[i]] = StarRatingCalculation();
                            }
                            var isReadOnly = $("#" + tabFields[i] + "").attr('ng-readonly');
                            if (isReadOnly === "true") {

                            }
                            else {
                                var fieldtype = $("#" + tabFields[i] + "").attr('data-fieldtype');
                                var _isrequired = $("#" + tabFields[i] + "").data('isrequired');
                                if (_isrequired) {
                                    if (fieldtype === 'Boolean') {
                                        if ($("#" + tabFields[i] + "").prop("checked") !== true) {
                                            $("#" + tabFields[i] + "").css({ "border": "1px solid #DC1616" });
                                            isrequired.push({ "id": tabFields[i], "ValidationMsg": $("#" + tabFields[i] + "").data('label') });
                                        }
                                        else {
                                            $("#" + tabFields[i] + "").css({ "border": "1px solid #f8f8f8" });
                                        }
                                    }
                                    if ($("#" + tabFields[i] + "").val() === '') {
                                        isrequired.push({ "id": tabFields[i], "ValidationMsg": $("#" + tabFields[i] + "").data('label') });
                                        $("#" + tabFields[i] + "").css({ "border": "1px solid #DC1616" });
                                    }
                                    else {
                                        $("#" + tabFields[i] + "").css({ "border": "1px solid #f8f8f8" });
                                    }
                                }
                                var value = $("#" + tabFields[i] + "").val();
                                var id = $("#" + tabFields[i] + "").attr('id');
                                var isClass = $("#" + tabFields[i] + "").attr('class');
                                if (isClass !== undefined) {
                                    //if (isClass.indexOf("ng-not-modified") === -1) {
                                    var dirty = isClass.indexOf("ng-dirty");
                                    if (isClass.indexOf("ng-dirty") !== -1 || fieldtype === 'Lookup' || fieldtype === 'Customer' || fieldtype === 'MultiSelectPicklistType') {

                                        if (fieldtype === 'String' || fieldtype === 'Memo') {
                                            entityData[id] = value;
                                            isDirtyCheck = true;
                                        }
                                        if (fieldtype === 'DateTime') {
                                            if (value != '') {
                                                entityData[id] = FormatDateUTC(value);
                                            }
                                            else {
                                                entityData[id] = null;
                                            }
                                            isDirtyCheck = true;
                                        }
                                        if (fieldtype === 'Integer' || fieldtype === 'BigInt') {
                                            value = parseInt(value.replace('$', '').replace(/,/g, '').replace(currencySymbol, ''));
                                            entityData[id] = value;
                                            isDirtyCheck = true;
                                        }
                                        if (fieldtype === 'Money' || fieldtype === 'Decimal') {
                                            value = parseFloat(value.replace('$', '').replace(/,/g, '').replace(currencySymbol, ''));
                                            entityData[id] = value;
                                            isDirtyCheck = true;
                                        }
                                        if (fieldtype === 'Picklist') {
                                            var pickListId = value.replace('number:', '').replace('string:', '').replace(/,/g, '');
                                            if (value === "") {
                                                entityData[id] = null;
                                            }
                                            else {
                                                entityData[id] = pickListId;
                                                if (tabFields[i] === "fedcap_opportunitystatus") {
                                                    ifOpportunityStatus = true;
                                                    OpportunityStatusValue = pickListId;
                                                }
                                            }
                                            isDirtyCheck = true;
                                        }
                                        if (fieldtype === 'MultiSelectPicklistType') {
                                            var selected = $("#" + tabFields[i]).find("option:selected");
                                            var arrSelected = [];
                                            var multiSelectPicklistSelectedValues = '';
                                            for (var idx = 0; idx < selected.length; idx++) {
                                                var index = idx + 1;
                                                if (selected.length === index) {
                                                    multiSelectPicklistSelectedValues = multiSelectPicklistSelectedValues + selected[idx].value.replace('number:', '').replace('string:', '').replace(/,/g, '');
                                                }
                                                else {
                                                    multiSelectPicklistSelectedValues = multiSelectPicklistSelectedValues + selected[idx].value.replace('number:', '').replace('string:', '').replace(/,/g, '') + ",";
                                                }
                                            }

                                            //selected.each((idx, val) => {
                                            //    var index = idx + 1;
                                            //    if (selected.length === index) {
                                            //        multiSelectPicklistSelectedValues = multiSelectPicklistSelectedValues + val.value.replace('number:', '').replace('string:', '').replace(/,/g, '');
                                            //    }
                                            //    else {
                                            //        multiSelectPicklistSelectedValues = multiSelectPicklistSelectedValues + val.value.replace('number:', '').replace('string:', '').replace(/,/g, '') + ",";

                                            //    }
                                            //    //arrSelected.push(val.value.replace('number:', '').replace('string:', '').replace(/,/g, ''));
                                            //});


                                            //var multiSelectPicklistId = "Chosen_" + tabFields[i];
                                            //var multiSelectPicklist = document.getElementById(multiSelectPicklistId);
                                            //var multiSelectPicklistSelectedValues = '';
                                            //for (var selected = 0; selected < multiSelectPicklist.length; selected++) {
                                            //    var selectedCheck = selected + 1;
                                            //    if (selectedCheck == multiSelectPicklist.length) {
                                            //        multiSelectPicklistSelectedValues += multiSelectPicklist[selected].value.replace('number:', '').replace('string:', '').replace(/,/g, '');
                                            //    }
                                            //    else {
                                            //        multiSelectPicklistSelectedValues += multiSelectPicklist[selected].value.replace('number:', '').replace('string:', '').replace(/,/g, '') + ",";
                                            //    }
                                            //}
                                            if (multiSelectPicklistSelectedValues == '') {
                                                if (OID === "") {
                                                    //on New oppurtunity creation if multipicklist null or does not contain value then leave fill in entityData variable.
                                                }
                                                else {
                                                    entityData[id] = null;
                                                }
                                            }
                                            else {
                                                entityData[id] = multiSelectPicklistSelectedValues;
                                            }
                                            isDirtyCheck = true;
                                        }
                                        if (fieldtype === 'Boolean') {
                                            var check = false;
                                            if ($("#" + tabFields[i] + "").prop("checked") === true) {
                                                var check = true;
                                            }
                                            entityData[id] = check;
                                            isDirtyCheck = true;
                                        }
                                        //if (fieldtype === 'Lookup' || fieldtype === 'Customer') {
                                        //    var idApi = $("#" + tabFields[i] + "").attr('data-webapi');
                                        //    var lookupValue = $("#" + tabFields[i] + "_id").val();
                                        //    if (lookupValue != '') {
                                        //        if (fieldtype === 'Customer') {
                                        //            idApi = idApi + '_account';
                                        //        }
                                        //        entityData["" + idApi + "@odata.bind"] = "/opportunities(" + lookupValue + ")";
                                        //        isDirtyCheck = true;
                                        //    }
                                        //}
                                        if (fieldtype === 'Lookup' || fieldtype === 'Customer') {
                                            var idApi = $("#" + tabFields[i] + "").attr('data-webapi');
                                            var lookupValue = $("#" + tabFields[i] + "_id").val();
                                            var lookupText = $("#" + tabFields[i]).val();
                                            if (lookupValue === undefined) {
                                                lookupValue = value.replace('number:', '').replace('string:', '').replace(/,/g, '');
                                            }
                                            if (lookupText === "") {
                                                var lookupId = idApi.toLowerCase();
                                                try {
                                                    var chkCtlIfExist = Xrm.Page.getAttribute(idApi.toLowerCase());
                                                    if (chkCtlIfExist != null) {
                                                        lookupArrForNull.push({ 'lookupfield': idApi.toLowerCase() });
                                                        //Xrm.Page.getAttribute(idApi.toLowerCase()).setValue(null);
                                                    }
                                                } catch (e) {
                                                }
                                            }
                                            else {
                                                if (lookupValue != '') {
                                                    if (fieldtype === 'Customer') {
                                                        idApi = idApi + '_account';
                                                    }
                                                    if (idApi === "OwnerId") {
                                                    }
                                                    else {
                                                        entityData["" + idApi + "@odata.bind"] = "/opportunities(" + lookupValue + ")";
                                                        isDirtyCheck = true;
                                                    }
                                                }
                                                else {
                                                }
                                            }

                                        }
                                    }
                                }
                            }
                        }

                    }
                }
                if (isrequired.length > 0) {
                    var validationMsg = '';
                    if (isrequired.length > 1) {
                        for (var i = 0; i < isrequired.length; i++) {
                            validationMsg = validationMsg + isrequired[i]['ValidationMsg'] + ",";
                        }
                        //$("#dvNotificationText").text(validationMsg + " are required.");
                        Xrm.Page.ui.setFormNotification(validationMsg + " are required.", "WARNING", "1")
                    }
                    else {
                        //$("#dvNotificationText").text(isrequired[0]['ValidationMsg'] + " is required.");
                        Xrm.Page.ui.setFormNotification(isrequired[0]['ValidationMsg'] + " is required.", "WARNING", "1")
                    }

                    //$("#dvNotification").toggleClass('warning').removeClass('error').removeClass('info');
                    setTimeout(function () {
                        //$("#dvNotificationText").text(""); $("#dvNotification").removeClass('warning');
                        Xrm.Page.ui.clearFormNotification("1");
                    }, 5000);
                    return;
                }
                if (!Validation(tabNameValidation, currencySymbol)) {
                    return;
                }
                if (OID === '') {
                    Xrm.Page.ui.setFormNotification("Please wait while Opportunity is creating..!!!", "WARNING", "1")
                }
                else {
                    Xrm.Page.ui.setFormNotification("Please wait while Opportunity is updating..!!!", "WARNING", "1")
                }
                if (OID === '') {
                    if ($('#name').length > 0) {
                        var requiredOpportunityName = $("#name").val();
                        if (requiredOpportunityName === "") {
                            Xrm.Page.ui.setFormNotification("Opportunity name is required.", "WARNING", "1")
                            setTimeout(function () {
                                //$("#dvNotificationText").text(""); $("#dvNotification").removeClass('warning');
                                Xrm.Page.ui.clearFormNotification("1");
                            }, 10000);
                            return;
                        }
                        else {
                            entityData.name = requiredOpportunityName;
                        }
                    }
                    Xrm.WebApi.createRecord(entityName, entityData).then(function (result) {
                        var recordId = result.id;
                        OID = recordId;
                        Xrm.Page.ui.setFormNotification("Opportunity is created successfully.", "INFO", "1")

                        setTimeout(function () { Xrm.Page.ui.clearFormNotification("1"); }, 7000);
                        SavePGO();
                        SavePWin();

                        var windowOptions = {
                            openInNewWindow: false
                        };
                        if (Xrm.Utility != null) {
                            // Xrm.Utility.openEntityForm("opportunity", recordId, null, windowOptions);
                        }
                    },
                    function (error) {
                        //Xrm.Page.ui.setFormNotification("Error while Opportunity creating.", "ERROR", "1")
                        Xrm.Page.ui.setFormNotification(error.message.toString(), "ERROR", "1")
                        setTimeout(function () { Xrm.Page.ui.clearFormNotification("1"); }, 20000);
                    }
                    );

                }
                else {
                    if (ifOpportunityStatus) {
                        var StageChangeOrNot = StageChange(OpportunityStatusValue);
                        if (StageChangeOrNot === false) {
                            Xrm.Page.ui.setFormNotification("Please select stage step by step.\nOR \nPlease fill required field(s) from the page(Header Or Section).", "WARNING", "1")
                            setTimeout(function () { Xrm.Page.ui.clearFormNotification("1"); }, 20000);
                            return;
                        }
                    }
                    if (isDirtyCheck) {
                        Xrm.WebApi.updateRecord(entityName, OID, entityData).then(
                                                function success(result) {
                                                    SavePGO();
                                                    SavePWin();
                                                    for (var tab = 0; tab < $scope.tabs.length; tab++) {
                                                        // if ($scope.tabs[tab]["fedcap_customizetabid"] === cntrlId)
                                                        {
                                                            for (var section = 0; section < $scope.tabs[tab].sections.length; section++) {
                                                                //if ($scope.tabs[tab]['fedcap_name'] === 'Intelligence') {//&& tab === $scope.ExternalComponentTabId
                                                                //    Xrm.Page.ui.setFormNotification("Please wait, System is retrieving GovWin data....", "WARNING", "2");
                                                                //    setFBODetailsDate();
                                                                //    CallGovWin();
                                                                //}
                                                                //if ($scope.tabs[tab]['fedcap_name'] === 'GOVWIN' || $scope.tabs[tab]['fedcap_name'] === 'GovWin') {
                                                                //    Xrm.Page.ui.setFormNotification("Please wait, System is retrieving GovWin data....", "WARNING", "2");
                                                                //    setFBODetailsDate();
                                                                //    CallGovWin();
                                                                //}
                                                                //if ($scope.tabs[tab]['fedcap_name'] === 'FBO') {
                                                                //    setFBODetailsDate();
                                                                //}


                                                                if ($scope.tabs[tab]['fedcap_name'] === 'PWin' || $scope.tabs[tab]['fedcap_name'] === 'CRS') {
                                                                    GetPWinOpportunityGivenQuestionAnswer(tab, section);
                                                                    GetOptionSetLabelValue(tab, section, "fedcap_pwinquestion", "fedcap_stage");
                                                                    $scope.$apply();
                                                                }
                                                                if ($scope.tabs[tab]['fedcap_name'] === 'PGo' || $scope.tabs[tab]['fedcap_name'] === 'SGI') {
                                                                    GetPGoOpportunityGivenQuestionAnswer(tab, section);
                                                                    GetPGoQuestion(tab, section);
                                                                    $scope.$apply();
                                                                }
                                                                else {
                                                                    //GetFieldOpportunityData($scope.tabs[tab].sections[section]["fedcap_customizesectionid"], tab, section);
                                                                    //var save = true;
                                                                    //Xrm.Page.data.refresh(save).then(successDynamicCallback, errorDynamicCallback);
                                                                }
                                                            }
                                                        }
                                                    }
                                                    //Xrm.Page.ui.setFormNotification("Opportunity is updated successfully.", "INFO", "1");
                                                    Xrm.Page.ui.clearFormNotification("1");
                                                    Xrm.Page.ui.setFormNotification("Opportunity is updated successfully.", "INFO", "OppUpdate");

                                                    setTimeout(function () {
                                                        Xrm.Page.ui.clearFormNotification("1");
                                                        Xrm.Page.ui.clearFormNotification("OppUpdate");
                                                    }, 1500);
                                                    //if (tabName === 'Intelligence') {
                                                    //}
                                                    //else 
                                                    if (tabName === 'PGo' || tabName === 'SGI') {

                                                    }
                                                    else if (tabName === 'PWin' || tabName === 'CRS') {

                                                    }
                                                    else {
                                                        //try {
                                                        //    if ($("#_ownerid_value").length > 0) {
                                                        //        Xrm.Page.getAttribute("ownerid").setValue([{ id: $("#_ownerid_value_id").val(), name: $("#_ownerid_value").val(), entityType: "systemuser" }]);
                                                        //    }
                                                        //} catch (e) {
                                                        //}
                                                        if (lookupArrForNull.length > 0) {
                                                            for (var i = 0; i < lookupArrForNull.length; i++) {
                                                                var test = lookupArrForNull[i].lookupfield;
                                                                Xrm.Page.getAttribute(lookupArrForNull[i].lookupfield).setValue(null);

                                                            }
                                                        }
                                                        //Xrm.Page.getAttribute(idApi.toLowerCase()).setValue(null);

                                                        setTimeout(function () {
                                                            var save = true;
                                                            Xrm.Page.data.refresh(save).then(
                                                                function successDynamicCallback() {
                                                                    for (var tab = 0; tab < $scope.tabs.length; tab++) {
                                                                        //$scope.tabs[tab].LoadTabData = false;
                                                                        //if ($scope.tabs[tab]["fedcap_customizetabid"] === cntrlId) {
                                                                        for (var section = 0; section < $scope.tabs[tab].sections.length; section++) {
                                                                            GetFieldOpportunityData($scope.tabs[tab].sections[section]["fedcap_customizesectionid"], tab, section);
                                                                        }
                                                                        // }
                                                                    }
                                                                },
                                                                function errorDynamicCallback() {
                                                                    for (var tab = 0; tab < $scope.tabs.length; tab++) {
                                                                        // $scope.tabs[tab].LoadTabData = false;
                                                                        //if ($scope.tabs[tab]["fedcap_customizetabid"] === cntrlId) {
                                                                        for (var section = 0; section < $scope.tabs[tab].sections.length; section++) {
                                                                            GetFieldOpportunityData($scope.tabs[tab].sections[section]["fedcap_customizesectionid"], tab, section);
                                                                        }
                                                                        //}
                                                                    }
                                                                });
                                                        }, 1000);
                                                    }
                                                },
                                                function (error) {
                                                    //Xrm.Page.ui.setFormNotification("Error while " + tabName + " is updating.", "ERROR", "1")
                                                    Xrm.Page.ui.setFormNotification(error.message.toString(), "ERROR", "1")

                                                    setTimeout(function () { Xrm.Page.ui.clearFormNotification("1"); }, 20000);
                                                }
                                            );
                    }
                    else {
                        //Xrm.Page.ui.setFormNotification("Opportunity is updated successfully.", "INFO", "1");
                        Xrm.Page.ui.setFormNotification("Opportunity is updated successfully.", "INFO", "OppUpdate");
                        //try {
                        //    if ($("#_ownerid_value").length > 0) {
                        //        Xrm.Page.getAttribute("ownerid").setValue([{ id: $("#_ownerid_value_id").val(), name: $("#_ownerid_value").val(), entityType: "systemuser" }]);
                        //    }
                        //} catch (e) {
                        //}
                        setTimeout(function () {
                            var save = true;
                            Xrm.Page.data.refresh(save).then(
                                function successDynamicCallback() {
                                    for (var tab = 0; tab < $scope.tabs.length; tab++) {
                                        //$scope.tabs[tab].LoadTabData = false;
                                        //if ($scope.tabs[tab]["fedcap_customizetabid"] === cntrlId) {
                                        for (var section = 0; section < $scope.tabs[tab].sections.length; section++) {
                                            if (tabName === "PWin" || tabName === "CRS") {
                                                GetPWinOpportunityGivenQuestionAnswer(tab, section);
                                                GetOptionSetLabelValue(tab, section, "fedcap_pwinquestion", "fedcap_stage");
                                                DoubleClickSave = false;
                                                $scope.$apply();
                                            }
                                            if (tabName === "PGo" || tabName === "SGI") {
                                                GetPGoOpportunityGivenQuestionAnswer(tab, section);
                                                GetPGoQuestion(tab, section);
                                                DoubleClickSave = false;
                                                $scope.$apply();
                                            }
                                            GetFieldOpportunityData($scope.tabs[tab].sections[section]["fedcap_customizesectionid"], tab, section);
                                        }
                                        //}
                                    }
                                },
                                function errorDynamicCallback() {
                                    for (var tab = 0; tab < $scope.tabs.length; tab++) {
                                        //$scope.tabs[tab].LoadTabData = false;
                                        if ($scope.tabs[tab]["fedcap_customizetabid"] === cntrlId) {
                                            for (var section = 0; section < $scope.tabs[tab].sections.length; section++) {
                                                if (tabName === "PWin" || tabName === "CRS") {
                                                    GetPWinOpportunityGivenQuestionAnswer(tab, section);
                                                    GetOptionSetLabelValue(tab, section, "fedcap_pwinquestion", "fedcap_stage");
                                                    DoubleClickSave = false;
                                                    $scope.$apply();
                                                }
                                                if (tabName === "PGo" || tabName === "SGI") {
                                                    GetPGoOpportunityGivenQuestionAnswer(tab, section);
                                                    GetPGoQuestion(tab, section);
                                                    DoubleClickSave = false;
                                                    $scope.$apply();
                                                }
                                                GetFieldOpportunityData($scope.tabs[tab].sections[section]["fedcap_customizesectionid"], tab, section);
                                            }
                                        }
                                    }
                                });
                        }, 500);
                        setTimeout(function () {
                            Xrm.Page.ui.clearFormNotification("1");
                            Xrm.Page.ui.clearFormNotification("OppUpdate");
                        }, 20000);
                    }

                }

            } catch (e) {
                //Xrm.Page.ui.setFormNotification("Error while " + tabName + " is updating.", "ERROR", "1")
                Xrm.Page.ui.setFormNotification(error.message.toString(), "ERROR", "1")

                setTimeout(function () { Xrm.Page.ui.clearFormNotification("1"); }, 20000);
            }
        }
        function SavePGO() {
            try {
                //debugger;
                //var isDirtyCheck = true;
                if (!DoubleClickSave) {
                    DoubleClickSave = true;
                }
                else {
                    DoubleClickSave = false;
                    return;
                }
                var PhaseObj = new Object();
                for (var tab = 0; tab < $scope.tabs.length; tab++) {
                    if ($scope.tabs[tab]["fedcap_name"] === "PGo" || $scope.tabs[tab]["fedcap_name"] === "SGI") {
                        for (var sec = 0; sec < $scope.tabs[tab].sections.length; sec++) {
                            if ($scope.tabs[tab].sections[sec]["fedcap_name"] === 'PGo') {
                                for (var que = 0; que < $scope.tabs[tab].sections[sec].pgoquestions.length; que++) {
                                    var questionId = $scope.tabs[tab].sections[sec].pgoquestions[que]["fedcap_pgoquestionid"];
                                    var questionWt = $scope.tabs[tab].sections[sec].pgoquestions[que]["fedcap_weighting"];
                                    var _questionId = "ans_" + questionId;
                                    var questionName = $scope.tabs[tab].sections[sec].pgoquestions[que]["fedcap_name"]
                                    var filteredData = $scope.tabs[tab].sections[sec].pgogivenans.filter(
                                    function (response) {
                                        var id = response["_fedcap_pgoquestion_value"];
                                        return (id === questionId);
                                    })
                                    var AnswerId = $('input[name="' + _questionId + '"]:checked').attr('id');
                                    var AnswerWt = $('input[name="' + _questionId + '"]:checked').attr('value');
                                    PhaseObj["fedcap_OpportunityID@odata.bind"] = "/fedcap_opportunitypgoanswers(" + OID + ")";
                                    PhaseObj["fedcap_name"] = questionName;
                                    PhaseObj["fedcap_pgoanswerweighting"] = AnswerWt;
                                    PhaseObj["fedcap_PGoGivenAnswer@odata.bind"] = "/fedcap_opportunitypgoanswers(" + AnswerId + ")";
                                    PhaseObj["fedcap_PGoQuestion@odata.bind"] = "/fedcap_opportunitypgoanswers(" + questionId + ")";
                                    var serverUrl = location.protocol + "//" + location.host;
                                    var req = new XMLHttpRequest();
                                    if (filteredData.length === 0) {
                                        req.open("POST", serverUrl + "/api/data/v9.0/fedcap_opportunitypgoanswers", true);
                                    }
                                    else {
                                        req.open("PATCH", serverUrl + "/api/data/v9.0/fedcap_opportunitypgoanswers(" + filteredData[0]["fedcap_opportunitypgoanswerid"] + ")", false);
                                    }
                                    req.setRequestHeader("Accept", "application/json");
                                    req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
                                    req.setRequestHeader("Prefer", "odata.include-annotations=*");
                                    req.setRequestHeader("OData-MaxVersion", "4.0");
                                    req.setRequestHeader("OData-Version", "4.0");
                                    req.onreadystatechange = function () {
                                        if (this.readyState === 4) {
                                            req.onreadystatechange = null;
                                            if (this.status === 204) {
                                            }
                                        }
                                    }
                                    var body = JSON.stringify(PhaseObj);
                                    req.send(body);
                                }
                            }
                        }
                    }
                }
            } catch (e) {

            }
        }
        function SavePWin() {
            //debugger;
            try {
                //if (!DoubleClickSave) {
                //    DoubleClickSave = true;
                //}
                //else {
                //    DoubleClickSave = false;
                //    return;
                //}
                //var isDirtyCheck = true;
                var filteredTab = $scope.tabs.filter(
                                    function (response) {
                                        //var id = response["fedcap_customizetabid"];
                                        //return (id === cntrlId);
                                        var id = response["fedcap_name"];
                                        return (id === "PWin");
                                    });
                //filteredTab = $scope.tabs.filter(
                //                    function (response) {
                //                        //var id = response["fedcap_customizetabid"];
                //                        //return (id === cntrlId);
                //                        var id = response["fedcap_name"];
                //                        return (id === "CRS");
                //                    });
                for (var sec = 0; sec < filteredTab[0].sections.length; sec++) {
                    if (filteredTab[0].sections[sec]["fedcap_name"] === 'PWin' || filteredTab[0].sections[sec]["fedcap_name"] === 'CRS') {
                        var PhaseObj = new Object();
                        for (var i = 0; i < $scope.pwintabs.length; i++) {
                            for (var que = 0; que < $scope.pwintabs[i].questions.length; que++) {
                                var questionId = $scope.pwintabs[i].questions[que]["fedcap_pwinquestionid"];
                                var questionWt = $scope.pwintabs[i].questions[que]["fedcap_weighting"];
                                var _questionId = "ans_" + questionId;
                                var filteredData = filteredTab[0].sections[sec].pwingivenans.filter(
                                            function (response) {
                                                var id = response["_fedcap_pwinquestion_value"];
                                                return (id === questionId);
                                            })
                                var questionName = $scope.pwintabs[i].questions[que]["fedcap_name"]
                                var AnswerId = $('input[name="' + _questionId + '"]:checked').attr('id');
                                var AnswerWt = $('input[name="' + _questionId + '"]:checked').attr('value');
                                PhaseObj["fedcap_OpportunityID@odata.bind"] = "/fedcap_opportunitypwinanswers(" + OID + ")";
                                PhaseObj["fedcap_name"] = questionName;
                                PhaseObj["fedcap_pwinanswerweighting"] = AnswerWt;
                                PhaseObj["fedcap_PWinGivenAnswer@odata.bind"] = "/fedcap_opportunitypwinanswers(" + AnswerId + ")";
                                PhaseObj["fedcap_PWinQuestion@odata.bind"] = "/fedcap_opportunitypwinanswers(" + questionId + ")";
                                //PhaseObj["fedcap_category"] = $scope.pwintabs[i].questions[que]["fedcap_category"];
                                //PhaseObj["fedcap_stage"] = $scope.pwintabs[i].questions[que]["fedcap_stage"];
                                entityName = 'fedcap_opportunitypwinanswers'
                                var serverUrl = location.protocol + "//" + location.host;
                                var req = new XMLHttpRequest();
                                if (filteredData.length === 0) {
                                    req.open("POST", serverUrl + "/api/data/v9.0/fedcap_opportunitypwinanswers", false);
                                }
                                else {
                                    req.open("PATCH", serverUrl + "/api/data/v9.0/fedcap_opportunitypwinanswers(" + filteredData[0]["fedcap_opportunitypwinanswerid"] + ")", false);
                                }
                                req.setRequestHeader("Accept", "application/json");
                                req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
                                req.setRequestHeader("Prefer", "odata.include-annotations=*");
                                req.setRequestHeader("OData-MaxVersion", "4.0");
                                req.setRequestHeader("OData-Version", "4.0");
                                req.onreadystatechange = function () {
                                    if (this.readyState === 4) {
                                        req.onreadystatechange = null;
                                        if (this.status === 204) {
                                        }
                                    }
                                    else {
                                    }
                                }
                                var body = JSON.stringify(PhaseObj);
                                req.send(body);
                            }
                        }
                    }
                }
            } catch (e) {
            }
        }
        $scope.cancelDetails = function (cntrlId, selectControls, tabName) {
            for (var tab = 0; tab < $scope.tabs.length; tab++) {
                if ($scope.tabs[tab]["fedcap_customizetabid"] === cntrlId) {
                    for (var section = 0; section < $scope.tabs[tab].sections.length; section++) {
                        if ($scope.tabs[tab].sections[section]["fedcap_name"] === 'PWin' || $scope.tabs[tab].sections[section]["fedcap_name"] === 'CRS') {
                            DoubleClickSave = false;
                            GetPWinOpportunityGivenQuestionAnswer(tab, section);
                            GetOptionSetLabelValue(tab, section, "fedcap_pwinquestion", "fedcap_stage");
                            $scope.$apply();
                        }
                        else if ($scope.tabs[tab].sections[section]["fedcap_name"] === 'PGo' || $scope.tabs[tab].sections[section]["fedcap_name"] === 'SGI') {
                            DoubleClickSave = false;
                            GetPGoOpportunityGivenQuestionAnswer(tab, section);
                            GetPGoQuestion(tab, section);
                            //GetOptionSetLabelValue(tab, section, "fedcap_pgoquestion", "fedcap_pgo_stage");

                            $scope.$apply();
                        }
                        else {
                            GetFieldOpportunityData($scope.tabs[tab].sections[section]["fedcap_customizesectionid"], tab, section);
                        }
                    }
                    return;
                }
            }
        }
        $scope.CancelAndRefresh = function () {
            for (var tab = 0; tab < $scope.tabs.length; tab++) {
                //if ($scope.tabs[tab]["fedcap_customizetabid"] === cntrlId) {
                for (var section = 0; section < $scope.tabs[tab].sections.length; section++) {
                    if ($scope.tabs[tab].sections[section]["fedcap_name"] === 'PWin') {
                        DoubleClickSave = false;
                        GetPWinOpportunityGivenQuestionAnswer(tab, section);
                        GetOptionSetLabelValue(tab, section, "fedcap_pwinquestion", "fedcap_stage");
                        $scope.$apply();
                    }
                    else if ($scope.tabs[tab].sections[section]["fedcap_name"] === 'PGo') {
                        DoubleClickSave = false;
                        GetPGoOpportunityGivenQuestionAnswer(tab, section);
                        GetPGoQuestion(tab, section);
                        $scope.$apply();
                    }
                    else {
                        GetFieldOpportunityData($scope.tabs[tab].sections[section]["fedcap_customizesectionid"], tab, section);
                    }
                }
                //return;
                //}
            }
        }
        $scope.LoadTabData = function (cntrlId, selectControls, tabName) {
            for (var tab = 0; tab < $scope.tabs.length; tab++) {

                if ($scope.tabs[tab]["fedcap_customizetabid"] === cntrlId) {
                    //$scope.tabs[tab].fedcap_backgroundcoloractive = $scope.tabs[tab]["fedcap_backgroundcolor"];
                    //$scope.tabs[tab].fedcap_backgroundcoloractive = "tabLink ms-crm-PanelHeader-Color active";
                    $scope.tabs[tab].fedcap_backgroundcoloractive = "active";
                    $scope.tabs[tab].tabcolor = { "background-color": $scope.tabs[tab]["fedcap_backgroundcolor"] };
                }
                else {
                    //$scope.tabs[tab].fedcap_backgroundcoloractive = 'tabLink ms-crm-PanelHeader-Color';
                    $scope.tabs[tab].fedcap_backgroundcoloractive = '';
                    $scope.tabs[tab].tabcolor = { "background-color": '' };
                }
            }
            for (var tab = 0; tab < $scope.tabs.length; tab++) {
                if ($scope.tabs[tab].LoadTabData !== true) {
                    $scope.SelectedTabs.push(cntrlId);
                    if ($scope.tabs[tab]["fedcap_customizetabid"] === cntrlId) {
                        //Xrm.Page.ui.setFormNotification("Please wait while " + tabName + " is retriving..!!!", "WARNING", "1")
                        //setTimeout(function () {
                        //    GetSectionData($scope.tabs[tab]["fedcap_customizetabid"], tab); $scope.tabs[tab].LoadTabData = true; BindCalenderIE($scope.tabs[tab]["fedcap_customizetabid"]);
                        //    Xrm.Page.ui.clearFormNotification("1");
                        //}, 100);
                        GetSectionData($scope.tabs[tab]["fedcap_customizetabid"], tab); $scope.tabs[tab].LoadTabData = true; BindCalenderIE($scope.tabs[tab]["fedcap_customizetabid"]);
                        if (tabName === "Intelligence") {
                            //getFBO();
                            //getdetails();
                            //getopportunity();
                        }

                        setTimeout(function () { SecurityRole(); }, 500);
                        return;
                    }
                }
            }
        }
        $scope.LoadSecurityRole = function (cntrlId, selectControls, tabName) { SecurityRole(); }
        //***************************PWin*************************************************
        $scope.LoadTabPWin = function (PWinStageId) {
            try {
                //debugger;
                for (var i = 0; i < $scope.pwintabs.length; i++) {
                    if ($scope.pwintabs[i].id === PWinStageId) {
                        $scope.pwintabs[i].selectedpwintab = true;
                    }
                    else {
                        $scope.pwintabs[i].selectedpwintab = false;

                    }
                }
            } catch (e) {

            }
        }
        $scope.pwintabs = [];
        $scope.pgotabs = [];
        function GetOptionSetLabelValue(tab, section, EntityLogicalName, AttributeLogicalName) {
            try {
                SDK.Metadata.RetrieveAttribute(EntityLogicalName, AttributeLogicalName, "00000000-0000-0000-0000-000000000000", true,
                    function (result) {
                        debugger;
                        if (EntityLogicalName === 'fedcap_pwinquestion') {
                            $scope.pwintabs = [];
                            for (var i = 0; i < result.OptionSet.Options.length; i++) {
                                var sum = 0.00;
                                var value = result.OptionSet.Options[i].Label.LocalizedLabels[0].Label;
                                $scope.pwintabs.push({ "id": result.OptionSet.Options[i].Value, "value": result.OptionSet.Options[i].Label.LocalizedLabels[0].Label, "score": 0.00, "selectedpwintab": false })
                            }
                            $scope.pwintabs[0].selectedpwintab = true;
                            GetPWinQuestionWebAPI(tab, section, 0.00);
                        }
                        if (EntityLogicalName === 'fedcap_pgoquestion') {
                            $scope.pgotabs = [];
                            for (var i = 0; i < result.OptionSet.Options.length; i++) {
                                var sum = 0.00;
                                var value = result.OptionSet.Options[i].Label.LocalizedLabels[0].Label;
                                $scope.pgotabs.push({ "id": result.OptionSet.Options[i].Value, "value": result.OptionSet.Options[i].Label.LocalizedLabels[0].Label, "score": 0.00 })
                            }
                            //GetPWinQuestionWebAPI(tab, section, 0.00);

                            GetPGoQuestionWebAPI_Stage(tab, section, 0.00);
                        }
                        $scope.$apply();
                    },
                    function (error) {
                    }
                );
            }
            catch (e) {

            }
        }
        function GetPWinOpportunityGivenQuestionAnswer(tab, section) {
            try {
                Xrm.WebApi.retrieveMultipleRecords("fedcap_opportunitypwinanswer", "?$filter=_fedcap_opportunityid_value eq " + OID + "")
                   .then(function (response) {
                       $scope.tabs[tab].sections[section].pwingivenans = response.entities;
                   })
                //.fail(function (error) {
                //});
            } catch (e) {
            }
        }
        function GetPWinQuestionWebAPI(tab, section, sum) {
            try {
                Xrm.WebApi.retrieveMultipleRecords("fedcap_pwinquestion", "?$orderby=fedcap_sequence asc")
                    .then(function (response) {
                        GetPWinAnswerWebAPI(tab, section, response.entities, sum);
                    })
                //.fail(function (error) {
                //});

            } catch (e) {
            }
        }
        function GetPWinAnswerWebAPI(tab, section, AllPWinQuestion, sum) {
            try {
                Xrm.WebApi.retrieveMultipleRecords("fedcap_pwinanswer")
                .then(function (AllPWinAnswerResponse) {
                    var AllPWinAnswer = AllPWinAnswerResponse.entities;
                    for (var StageIndex = 0; StageIndex < $scope.pwintabs.length; StageIndex++) {
                        sum = 0.00;
                        var filteredStageQuestion = AllPWinQuestion.filter(
                                       function (filteredResponse) {
                                           return filteredResponse["fedcap_stage"] === $scope.pwintabs[StageIndex]["id"];
                                       });
                        $scope.pwintabs[StageIndex].questions = filteredStageQuestion;
                        for (var QueIndex = 0; QueIndex < filteredStageQuestion.length; QueIndex++) {

                            if ($scope.tabs[tab].sections[section].pwingivenans.length > 0) {
                                var filteredData = $scope.tabs[tab].sections[section].pwingivenans.filter(
                                    function (responseAns) {
                                        var id = responseAns["_fedcap_pwinquestion_value"];
                                        if (id === filteredStageQuestion[QueIndex]["fedcap_pwinquestionid"]) {
                                            sum += (parseFloat(responseAns["fedcap_pwinanswerweighting"]) / 5) * parseFloat($scope.pwintabs[StageIndex].questions[QueIndex]["fedcap_weighting"]);
                                            //(3 - 1) because Option Value of Ans is = 0
                                            $scope.pwintabs[StageIndex]["score"] = sum.toFixed(2);
                                            if (StageIndex === 0) {
                                                $("#fedcap_pwin_phase0_score").val(sum.toFixed(2));
                                                try {
                                                    $scope.tabs[tab].sections[section].fieldValue["fedcap_pwin_phase0_score@OData.Community.Display.V1.FormattedValue"] = sum.toFixed(2);
                                                } catch (e) {
                                                }
                                            }
                                            if (StageIndex === 1) {
                                                try {
                                                    $scope.tabs[tab].sections[section].fieldValue["fedcap_pwin_phase1_score@OData.Community.Display.V1.FormattedValue"] = sum.toFixed(2);
                                                } catch (e) {
                                                }
                                                $("#fedcap_pwin_phase1_score").val(sum.toFixed(2));
                                            }
                                            if (StageIndex === 2) {
                                                try {
                                                    $scope.tabs[tab].sections[section].fieldValue["fedcap_gate3preliminarybidscore@OData.Community.Display.V1.FormattedValue"] = sum.toFixed(2);
                                                } catch (e) {
                                                }
                                                $("#fedcap_gate3preliminarybidscore").val(sum.toFixed(2));
                                            }
                                            if (StageIndex === 3) {
                                                try {
                                                    $scope.tabs[tab].sections[section].fieldValue["fedcap_gate4bidvalidationscore@OData.Community.Display.V1.FormattedValue"] = sum.toFixed(2);
                                                } catch (e) {
                                                }
                                                $("#fedcap_gate4bidvalidationscore").val(sum.toFixed(2));
                                            }
                                            $scope.pwintabs[StageIndex].questions[QueIndex]["fedcap_answerid"] = responseAns["_fedcap_pwingivenanswer_value"];
                                        }
                                        return id === filteredStageQuestion[QueIndex]["fedcap_pwinquestionid"];
                                    })
                            }
                            var filteredAns = AllPWinAnswer.filter(
                                        function (response) {
                                            return response["_fedcap_question_value"] === filteredStageQuestion[QueIndex]["fedcap_pwinquestionid"];
                                        });
                            $scope.pwintabs[StageIndex].questions[QueIndex].answers = filteredAns;
                        }
                    }
                    $scope.$apply();

                    try {
                        var selQryPWinFld = "fedcap_pwin_phase0_score";
                        selQryPWinFld = selQryPWinFld + ",fedcap_pwin_phase1_score";
                        selQryPWinFld = selQryPWinFld + ",fedcap_gate3preliminarybidscore";
                        selQryPWinFld = selQryPWinFld + ",fedcap_gate4bidvalidationscore";
                        Xrm.WebApi.retrieveRecord("opportunity", OID, "?$select=" + selQryPWinFld)
                                        .then(function (data) {
                                            //debugger;
                                            var objArry = {};
                                            var objArryTrue = false;
                                            var PreValGate1 = parseFloat(data["fedcap_pwin_phase0_score"]);
                                            var PostValGate1 = parseFloat($scope.pwintabs[0]["score"]);
                                            if (PreValGate1 !== PostValGate1) {
                                                objArry.fedcap_pwin_phase0_score = parseFloat($scope.pwintabs[0]["score"]);
                                                objArryTrue = true;
                                            }
                                            var PreValGate2 = parseFloat(data["fedcap_pwin_phase1_score"]);
                                            var PostValGate2 = parseFloat($scope.pwintabs[1]["score"]);
                                            if (PreValGate2 !== PostValGate2) {
                                                objArry.fedcap_pwin_phase1_score = parseFloat($scope.pwintabs[1]["score"]);
                                                objArryTrue = true;
                                            }
                                            var PreValGate3 = parseFloat(data["fedcap_gate3preliminarybidscore"]);
                                            var PostValGate3 = parseFloat($scope.pwintabs[2]["score"]);
                                            if (PreValGate3 !== PostValGate3) {
                                                objArry.fedcap_gate3preliminarybidscore = parseFloat($scope.pwintabs[2]["score"]);
                                                objArryTrue = true;
                                            }
                                            var PreValGate4 = parseFloat(data["fedcap_gate4bidvalidationscore"]);
                                            var PostValGate4 = parseFloat($scope.pwintabs[3]["score"]);
                                            if (PreValGate4 !== PostValGate4) {
                                                objArry.fedcap_gate4bidvalidationscore = parseFloat($scope.pwintabs[3]["score"]);
                                                objArryTrue = true;
                                            }
                                            if (objArryTrue) {
                                                //objArry.fedcap_pwin_phase0_score = parseFloat($scope.pwintabs[0]["score"]);
                                                //objArry.fedcap_pwin_phase1_score = parseFloat($scope.pwintabs[1]["score"]);
                                                //objArry.fedcap_gate3preliminarybidscore = parseFloat($scope.pwintabs[2]["score"]);
                                                //objArry.fedcap_gate4bidvalidationscore = parseFloat($scope.pwintabs[3]["score"]);
                                                Xrm.WebApi.updateRecord("opportunity", OID, objArry).then(
                                                function success(result) {
                                                    GetFieldOpportunityData($scope.tabs[tab].sections[section]["fedcap_customizesectionid"], tab, section);
                                                },
                                                function (error) {
                                                }
                                            );
                                            }

                                        }, function (error) {
                                        });

                    } catch (e) {
                    }

                })
                //.fail(function (error) {
                //});
            } catch (e) {
            }
        }
        //**********************PWin End**************************************************

        //****************************PGo*************************************************
        $scope.pgoquestions = [];
        //****************************PGo Without stage*************************************************
        function GetPGoQuestion(tab, section) {
            try {
                GetPGoQuestionWebAPI(tab, section);
            } catch (e) {
            }
        }
        function GetPGoQuestionWebAPI(tab, section) {
            try {
                Xrm.WebApi.retrieveMultipleRecords("fedcap_pgoquestion", "?$orderby=fedcap_sequence asc")
                .then(function (response) {
                    $scope.tabs[tab].pgoquestions = response.entities;
                    $scope.tabs[tab].sections[section].pgoquestions = response.entities;
                    GetPGoAnswerWebAPI(tab, section);
                })
                //.fail(function (error) {
                //});
            } catch (e) {
            }
        }
        function GetPGoAnswerWebAPI(tab, section) {
            try {
                Xrm.WebApi.retrieveMultipleRecords("fedcap_pgoanswer")
                .then(function (response) {
                    var AllPGoAnswer = response.entities;
                    var sum = 0.00;
                    for (var QueIndex = 0; QueIndex < $scope.tabs[tab].sections[section].pgoquestions.length; QueIndex++) {
                        var filteredData = $scope.tabs[tab].sections[section].pgogivenans.filter(
                                        function (response) {
                                            var id = response["_fedcap_pgoquestion_value"];
                                            if (id === $scope.tabs[tab].sections[section].pgoquestions[QueIndex]["fedcap_pgoquestionid"]) {
                                                sum += (parseFloat(response["fedcap_pgoanswerweighting"]) / 5) * parseFloat($scope.tabs[tab].sections[section].pgoquestions[QueIndex]["fedcap_weighting"]);
                                                $scope.tabs[tab].sections[section].pgoquestions.score = sum.toFixed(2);
                                                try {
                                                    $scope.tabs[tab].sections[section].fieldValue["fedcap_pgo_score@OData.Community.Display.V1.FormattedValue"] = $scope.tabs[tab].sections[section].pgoquestions.score;
                                                } catch (e) {
                                                }
                                                $("#fedcap_pgo_score").val(sum.toFixed(2));
                                                $scope.tabs[tab].sections[section].pgoquestions[QueIndex]["fedcap_answerid"] = response["_fedcap_pgogivenanswer_value"];
                                            }
                                            return id === $scope.tabs[tab].sections[section].pgoquestions["fedcap_pgoquestionid"];
                                        });
                        var filteredAns = AllPGoAnswer.filter(
                                        function (response) {
                                            var id = response["_fedcap_pgo_question_value"];
                                            return id === $scope.tabs[tab].sections[section].pgoquestions[QueIndex]["fedcap_pgoquestionid"];
                                        });
                        $scope.tabs[tab].sections[section].pgoquestions[QueIndex].pgoanswers = filteredAns;
                    }
                    try {
                        var selQryPGoFld = "fedcap_pgo_score";
                        Xrm.WebApi.retrieveRecord("opportunity", OID, "?$select=" + selQryPGoFld)
                                        .then(function (data) {
                                            //debugger;
                                            var objArry = {};
                                            var objArryTrue = false;
                                            var PreValGate1 = parseFloat(data["fedcap_pgo_score"]);
                                            var PostValGate1 = parseFloat($scope.tabs[tab].sections[section].pgoquestions.score);
                                            if (data["fedcap_pgo_score"] !== null || $scope.tabs[tab].sections[section].pgoquestions.score !== null) {
                                                if (PreValGate1 !== PostValGate1) {
                                                    objArry.fedcap_pgo_score = parseFloat($scope.tabs[tab].sections[section].pgoquestions.score);
                                                    objArryTrue = true;
                                                }
                                            }
                                            if (objArryTrue) {
                                                Xrm.WebApi.updateRecord("opportunity", OID, objArry).then(
                                                function success(result) {
                                                    GetFieldOpportunityData($scope.tabs[tab].sections[section]["fedcap_customizesectionid"], tab, section);
                                                },
                                                function (error) {
                                                }
                                            );
                                            }

                                        }, function (error) {
                                        });

                    } catch (e) {
                    }
                    //    var objArry = {};
                    //    objArry.fedcap_pgo_score = parseFloat($scope.tabs[tab].sections[section].pgoquestions.score);
                    //    Xrm.WebApi.updateRecord("opportunity", OID, objArry).then(
                    //    function success(result) {
                    //        GetFieldOpportunityData($scope.tabs[tab].sections[section]["fedcap_customizesectionid"], tab, section);
                    //    },
                    //    function (error) {
                    //    }
                    //);
                    $scope.$apply();
                })
                //.fail(function (error) {
                //});
            } catch (e) {
            }
        }
        //****************************PGo Without stage*************************************************

        function GetPGoOpportunityGivenQuestionAnswer(tab, section) {
            try {
                Xrm.WebApi.retrieveMultipleRecords("fedcap_opportunitypgoanswer", "?$filter=_fedcap_opportunityid_value eq " + OID + "")
                   .then(function (response) {
                       $scope.tabs[tab].sections[section].pgogivenans = response.entities;
                   })
                //.fail(function (error) {
                //});
            } catch (e) {
            }
        }

        function GetPGoQuestionWebAPI_Stage(tab, section, sum) {
            try {
                Xrm.WebApi.retrieveMultipleRecords("fedcap_pgoquestion", "?$orderby=fedcap_sequence asc")
                    .then(function (response) {

                        GetPGoAnswerWebAPI_Stage(tab, section, response.entities, sum);
                    })
                //.fail(function (error) {
                //});

            } catch (e) {
            }
        }
        function GetPGoAnswerWebAPI_Stage(tab, section, AllPGoQuestion, sum) {
            try {

                Xrm.WebApi.retrieveMultipleRecords("fedcap_pgoanswer")
                .then(function (AllPGoAnswerResponse) {

                    var AllPGoAnswer = AllPGoAnswerResponse.entities;
                    for (var StageIndex = 0; StageIndex < $scope.pgotabs.length; StageIndex++) {
                        sum = 0.00;
                        var filteredStageQuestion = AllPGoQuestion.filter(
                                       function (filteredResponse) {
                                           return filteredResponse["fedcap_pgo_stage"] === $scope.pgotabs[StageIndex]["id"];
                                       });
                        $scope.pgotabs[StageIndex].questions = filteredStageQuestion;
                        for (var QueIndex = 0; QueIndex < filteredStageQuestion.length; QueIndex++) {

                            if ($scope.tabs[tab].sections[section].pgogivenans.length > 0) {
                                var filteredData = $scope.tabs[tab].sections[section].pgogivenans.filter(
                                    function (responseAns) {
                                        var id = responseAns["_fedcap_pgoquestion_value"];
                                        if (id === filteredStageQuestion[QueIndex]["fedcap_pgoquestionid"]) {
                                            sum += (parseFloat(responseAns["fedcap_pgoanswerweighting"]) / 5) * parseFloat($scope.pgotabs[StageIndex].questions[QueIndex]["fedcap_weighting"]);
                                            $scope.pgotabs[StageIndex]["score"] = sum.toFixed(2);

                                            if (StageIndex === 0) {
                                                $("#fedcap_pgo_score").val(sum.toFixed(2));
                                                try {
                                                    $scope.tabs[tab].sections[section].fieldValue["fedcap_pgo_score@OData.Community.Display.V1.FormattedValue"] = sum.toFixed(2);
                                                } catch (e) {
                                                }
                                            }
                                            if (StageIndex === 1) {
                                                try {
                                                    $scope.tabs[tab].sections[section].fieldValue["fedcap_sgisfsscore@OData.Community.Display.V1.FormattedValue"] = sum.toFixed(2);
                                                } catch (e) {
                                                }
                                                $("#fedcap_sgisfsscore").val(sum.toFixed(2));
                                            }

                                            $scope.pgotabs[StageIndex].questions[QueIndex]["fedcap_answerid"] = responseAns["_fedcap_pgogivenanswer_value"];
                                        }
                                        return id === filteredStageQuestion[QueIndex]["fedcap_pgoquestionid"];
                                    })
                            }


                            var filteredAns = AllPGoAnswer.filter(
                                        function (response) {
                                            return response["_fedcap_pgo_question_value"] === filteredStageQuestion[QueIndex]["fedcap_pgoquestionid"];
                                        });
                            $scope.pgotabs[StageIndex].questions[QueIndex].answers = filteredAns;
                        }
                    }
                    $scope.$apply();
                    var objArry = {};
                    objArry.fedcap_pgo_score = parseFloat($scope.pgotabs[0]["score"]);
                    objArry.fedcap_sgisfsscore = parseFloat($scope.pgotabs[1]["score"]);
                    Xrm.WebApi.updateRecord("opportunity", OID, objArry).then(
                    function success(result) {
                        GetFieldOpportunityData($scope.tabs[tab].sections[section]["fedcap_customizesectionid"], tab, section);
                    },
                    function (error) {
                    }
                );
                })
                //.fail(function (error) {
                //});
            } catch (e) {
            }
        }
        //**************************PGo End******************************************************
        function GetCurrency() {
            var currencysymbol = '';
            var currencyid = '';
            try {
                Xrm.WebApi.retrieveRecord("opportunity", OID, "?$select=_transactioncurrencyid_value")
                                .then(function (data) {
                                    currencyid = data["_transactioncurrencyid_value"];
                                    Xrm.WebApi.retrieveRecord("transactioncurrency", currencyid, "?$select=currencysymbol")
                                                       .then(function (dataCurr) {
                                                           currencysymbol = dataCurr["currencysymbol"];
                                                           $scope.currencysymbol = currencysymbol;
                                                       })
                                    //.fail(function (error) {
                                    //});
                                })
                //.fail(function (error) {
                //});

            } catch (e) {
            }
            return currencysymbol;
        }
        //*********Calender*********************
        function FormatDateUserPersonalSetting(passedDate, dateformat, dateseparator) {
            var dateformatSplit = dateformat.split(dateseparator);
            //var passedDate = new Date(passedDate);
            var passedDateSplit = passedDate.split("/");
            var month = passedDateSplit[0];
            var day = passedDateSplit[1];
            var year = passedDateSplit[2];
            var convertDate = '';
            for (var i = 0; i < dateformatSplit.length; i++) {
                if (dateformatSplit[i].includes("y")) {
                    if (i === 2) {
                        convertDate = convertDate + year;
                    }
                    else {
                        convertDate = convertDate + year + dateseparator;
                    }
                }
                else if (dateformatSplit[i].includes("M") || dateformatSplit[i].includes("m")) {
                    if (i === 2) {
                        convertDate = convertDate + month;
                    }
                    else {
                        convertDate = convertDate + month + dateseparator;
                    }
                }
                else if (dateformatSplit[i].includes("d")) {
                    if (i === 2) {
                        convertDate = convertDate + day;
                    }
                    else {
                        convertDate = convertDate + day + dateseparator;
                    }
                }
            }
            return convertDate;
        }
        function GetUserSettingsCollection(UserId) {
            var serverUrl = location.protocol + "//" + location.host;
            var req = new XMLHttpRequest(); // the name of custom entity is = new_trialentity
            req.open("GET", serverUrl + "/api/data/v9.0/usersettingscollection(" + UserId + ")?$select=dateformatstring,dateseparator", false);
            req.setRequestHeader("Accept", "application/json");
            req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
            req.setRequestHeader("Prefer", "odata.include-annotations=*");
            req.setRequestHeader("OData-MaxVersion", "4.0");
            req.setRequestHeader("OData-Version", "4.0");
            req.onreadystatechange = function () {
                if (this.readyState === 4 /* complete */) {
                    req.onreadystatechange = null;
                    if (this.status === 200) {
                        var data = JSON.parse(this.response);
                        $scope.dateseparator = data["dateseparator"];
                        $scope.dateformat = data["dateformatstring"].replace("/", data["dateseparator"]).replace("/", data["dateseparator"]).replace("/", data["dateseparator"]);
                        $scope.dateOptions = {
                            changeYear: true,
                            changeMonth: true,
                            startingDay: 0
                        };
                    }
                }
            };
            req.send();
        }
    }
})(document, angular);
