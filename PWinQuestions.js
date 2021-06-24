(function (document, angular) {
    "use strict";
    var app = angular.module('MyApp', ['ngAnimate', 'ui.bootstrap']);//ngInputModified
    console.log("Into MyAppDynamic");
    app.controller('DynamicController', DynamicController);
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
            GetCurrency();
            GetSections();
            GetFields();
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

})(document, angular);
