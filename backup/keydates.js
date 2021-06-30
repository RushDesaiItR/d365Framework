// JavaScript source code
(function (document, angular) {
    "use strict";
    var app = angular.module("KeyDatesMyApp", ["ngAnimate", "ui.bootstrap", "textAngular", "ngMaterial", "ngMessages", "angularjs-datetime-picker"]); //ngInputModified
    console.log("Into MyAppDynamic");
    app.controller("KeyDatesDynamicController", DynamicController);
    function DynamicController($scope, $http) {
        debugger;
        $scope.callStatus = "OUTGOING";
        var Xrm = parent.Xrm;
        var selectQryfinal;
        var EntityName = parent.Xrm.Page.data.entity.getEntityName();
        var FormID = parent.Xrm.Page.ui.formSelector.getCurrentItem().getId();
        var tabsdata = parent.Xrm.Page.ui.tabs.get();
        var selectedTab = tabsdata.filter(item => item.getDisplayState() == 'expanded');
        var UserId = Xrm.Page.context.getUserId();
        var entityID = Xrm.Page.data.entity.getId();
        var OID = entityID.substring(1, 37);
        var serverUrl = location.protocol + "//" + location.host;
        GetCurrency();
        GetFormName();
        GetUserSettingsCollection(UserId.substring(1, 37));
        $scope.AllSections;
        $scope.HeaderFields;
        $scope.HeaderFieldsValue;
        $scope.tabs = {};
        $scope.fieldCollection = null;
        $scope.booleanArray = [
            { value: "? boolean:true ?", label: "Yes" },
            { value: "? boolean:false ?", name: "No" },
        ];
        function GetFormName(executionContext) {
            //debugger;
            try {
                $http({
                    method: "GET",
                    async: false,
                    url: serverUrl + "/api/data/v9.0/tm_customizetabs?$filter=tm_entityname eq '" + EntityName + "' and tm_formname eq '" + FormID + "'",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json: charset=utf-8",
                        Prefer: "odata.include-annotations=*",
                        "OData-MaxVersion": "4.0",
                        "OData-Version": "4.0",
                    },
                }).then(
                    (response) => {
                        // this callback will be called asynchronously
                        // when the response is available
                        //debugger;
                        var result = response.data.value;
                        if (result.length > 0) {
                            try {
                                for (var i = 0; i < result.length; i++) {
                                    if (selectedTab[0].getName().toLowerCase() === result[i].tm_tabid.toLowerCase()) {
                                        //Editable
                                        if (result[i].tm_tabtype === "Editable") {
                                            $scope.tabs["tm_tabid"] = result[i].tm_tabid.toLowerCase();
                                            $scope.tabs["tm_columnsratio"] = result[i].tm_columnsratio.toLowerCase();
                                            var tm_customizetabid = result[i].tm_customizetabid;
                                            GetSections(tm_customizetabid, function (sectiondata) {
                                                $scope.tabs.sections = sectiondata;
                                                GetFields(EntityName, function (fieldsdata) {
                                                    for (var sectionObject in sectiondata) {
                                                        //debugger;
                                                        console.log(sectionObject);
                                                        $scope.tabs.tabAllFields = "";
                                                        var tm_customizesectionid = sectiondata[sectionObject].tm_customizesectionid;
                                                        var data = fieldsdata.filter(function (field) {
                                                            return field._tm_section_value === tm_customizesectionid;
                                                        });
                                                        $scope.tabs.sections[sectionObject].fields = data;
                                                        LoadOptionSetAndGetTabFieldsInQuery(0, sectionObject);
                                                        if (data.length > 0) {
                                                            GetFieldEntityData(tm_customizesectionid, 0, sectionObject);
                                                        } else {
                                                            $scope.tabs.sections[sectionObject].display = "none"; // if fields not available
                                                        }
                                                        if ($scope.fieldCollection === null) {
                                                            $scope.fieldCollection = $scope.tabs.tabAllFields;
                                                        } else {
                                                            $scope.fieldCollection = $scope.fieldCollection + "," + $scope.tabs.tabAllFields;
                                                        }
                                                    }
                                                    // $scope.fieldCollection = $scope.tabs.tabAllFields;
                                                });
                                            });
                                            // GetTabData(result);
                                        }
                                        //Grid
                                        if (result[i].tm_tabtype === "Grid") {
                                            // alert();
                                        }
                                        //TimeLine
                                        if (result[i].tm_tabtype === "Timeline") {
                                            // alert();
                                        }
                                    }
                                }
                            } catch (e) {
                                alert("Error");
                            }
                        }
                        console.log("Response" + response.data.value);
                    },
                    (error) => {
                        // called asynchronously if an error occurs
                        // or server returns response with an error status.
                        console.log("Error" + error);
                    }
                );
            } catch (e) {
                Xrm.Utility.alertDialog(e.message);
            }
        }
        function GetSections(tm_customizetabid, callback) {
            $scope.AllSections = null;
            $http({
                method: "GET",
                async: false,
                url:
                    serverUrl +
                    "/api/data/v9.0/tm_customizesections?$filter=tm_ishidesection ne true and _tm_tab_value eq " +
                    tm_customizetabid + " and tm_order ne null &$orderby=tm_order asc&$select=tm_sectioncolumn,tm_name,tm_ishidesectionlabel,tm_sectionlabelfontsize,tm_sectionlabelcolor",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json: charset=utf-8",
                    Prefer: "odata.include-annotations=*",
                    "OData-MaxVersion": "4.0",
                    "OData-Version": "4.0",
                },
            }).then(
                (response) => {
                    // this callback will be called asynchronously
                    // when the response is available
                    //   ////debugger;
                    var result = response.data.value;
                    callback(result);
                    console.log("Returning promise with data");
                },
                (error) => {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                    console.log("Error" + error);
                }
            );
        }
        function GetFields(EntityName, callback) {
            //   $scope.AllFeilds = null;
            //  var serverUrl = location.protocol + "//" + location.host;
            $http({
                method: "GET",
                async: false,
                url: serverUrl + "/api/data/v9.0/tm_customizefields?$filter=tm_entityname eq '" + EntityName + "'&$orderby=tm_order asc",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json: charset=utf-8",
                    Prefer: "odata.include-annotations=*",
                    "OData-MaxVersion": "4.0",
                    "OData-Version": "4.0",
                },
            }).then(
                (response) => {
                    // this callback will be called asynchronously
                    // when the response is available
                    //    ////debugger;
                    var result = response.data.value;
                    //Add code for header value
                    //debugger;
                    $scope.HeaderFields = result.filter(function (fieldsdata) {
                        return fieldsdata.tm_isheaderfield === true;
                    });
                    if ($scope.HeaderFields.length > 0) {
                        var selectQry = "";

                        for (var i = 0; i < $scope.HeaderFields.length; i++) {
                            if (selectQry === "") {
                                selectQry = $scope.HeaderFields[i].tm_fieldapiname;
                            } else {
                                selectQry = selectQry + "," + $scope.HeaderFields[i].tm_fieldapiname;
                            }
                        }
                        getEntityAllFields(selectQry);
                    }
                    //$scope.AllFields = result;
                    callback(result);
                    // console.log("Response" + response.data.value);
                },
                (error) => {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                    console.log("Error" + error);
                }
            );
        }
        function LoadOptionSetAndGetTabFieldsInQuery(tab, section) {
            //*******************************************************************************************
            var selectQry = "";
            var selectQryforMultiPickList = "";
            var isMultiPickListExist = false;
            var fieldIds = [];
            for (var i = 0; i < $scope.tabs.sections[section].fields.length; i++) {
                if ($scope.tabs.sections[section].fields[i]["tm_fieldtype"] === "Picklist") {
                    if ($scope.tabs.sections[section].fields[i]["tm_isdependentpicklist"] === false) {
                        GetOptionSetLabel(tab, section, i, EntityName, $scope.tabs.sections[section].fields[i]["tm_fieldapiname"]);

                    }
                    if ($scope.tabs.sections[section].fields[i]["tm_isdependentpicklist"] === true) {
                        LoadDependentPicklistOptionSetLabel($scope.tabs.sections[section].fields[i]["tm_parentpicklist"], $scope.tabs.sections[section].fields[i]["tm_fieldapiname"]);
                        // SetDependentChildPicklist();
                    }
                }

                if ($scope.tabs.sections[section].fields[i]["tm_fieldtype"] === "MultiSelectPicklistType") {
                    isMultiPickListExist = true;
                    fieldIds.push({ id: i });
                    if (selectQryforMultiPickList === "") {
                        selectQryforMultiPickList = $scope.tabs.sections[section].fields[i]["tm_fieldapiname"];
                    } else {
                        selectQryforMultiPickList = selectQryforMultiPickList + "," + $scope.tabs.sections[section].fields[i]["tm_fieldapiname"];
                    }
                    GetOptionSetLabelMulti(tab, section, i, EntityName, $scope.tabs.sections[section].fields[i]['tm_fieldapiname']);
                }
                if ($scope.tabs.sections[section].fields[i]["tm_fieldtype"] !== "spacer") {
                    if ($scope.tabs.sections[section].fields[i]["tm_fieldtype"] !== "header") {
                        if (selectQry === "") {
                            selectQry = $scope.tabs.sections[section].fields[i]["tm_fieldapiname"];
                        } else {
                            selectQry = selectQry + "," + $scope.tabs.sections[section].fields[i]["tm_fieldapiname"];
                        }
                    }
                }
            }
            if (selectQry !== "") {
                if ($scope.tabs.tabAllFields === "") {
                    $scope.tabs.tabAllFields = selectQry;
                } else $scope.tabs.tabAllFields = $scope.tabs.tabAllFields + "," + selectQry;
                //////debugger;
                //if ($scope.fieldCollection === null) {
                //    $scope.fieldCollection = $scope.tabs.tabAllFields;
                //}
                //else {
                //    $scope.fieldCollection = fieldCollection + ',' + $scope.tabs.tabAllFields;
                //}
                //$scope.tabs.tabAllMPLFields = $scope.tabs.tabAllMPLFields + ',' + selectQryforMultiPickList;
            }
            //************************************************************************************************
            console.log($scope.tabs.sections)
        }
        // Added by Nitin A :: To get Dependant Child option label from Parent Picklist option label 
        function LoadDependentPicklistOptionSetLabel(parentPicklist, childPicklistName) {
            debugger
            var parentPicklistLogicalName = parentPicklist;
            try {

                Xrm.WebApi.retrieveRecord(EntityName, OID, "?$select=" + parentPicklistLogicalName + "").then(
                    function success(result) {
                        //debugger
                        var attributeLogical = parentPicklistLogicalName + "@OData.Community.Display.V1.FormattedValue";
                        var parentOption = result[attributeLogical];
                        SetDependentPicklistOptionSetLabel(result, parentPicklist, childPicklistName, parentOption);
                        // SetDependentChildPicklist();

                    },
                    function fail(respose) {
                        ////debugger
                        console.log(respose);
                    }
                );




            } catch (e) {
                console.log(e.message.toString());
            }

        }


        $scope.GetDependentPicklistOptionSetLabel = function (section, isDependentPicklist, parentPicklist) {
            //debugger
            var ParentPicklistLogicalName = parentPicklist;
            $http({
                method: "GET",
                async: false,
                url:
                    serverUrl + "/api/data/v9.0/tm_customizefields?$filter=tm_isdependentpicklist eq true and  tm_parentpicklist eq '" + parentPicklist + "'",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json: charset=utf-8",
                    Prefer: "odata.include-annotations=*",
                    "OData-MaxVersion": "4.0",
                    "OData-Version": "4.0",
                },
            }).then(
                (response) => {
                    var result = response.data.value;
                    if (result.length > 0) {
                        var childPicklistLogicalName = result[0]["tm_fieldapiname"];
                        var Selectedindex = document.getElementById(ParentPicklistLogicalName).options.selectedIndex
                        var Selectedlabel = document.getElementById(ParentPicklistLogicalName).options[Selectedindex].label
                        // var parentOption = "Agriculture and Non-petrol Natural Resource Extraction:undefined";

                        for (var k = 0; k < $scope.tabs.sections.length; k++) {
                            var fieldLength = $scope.tabs.sections[k].fields.length;
                            for (var j = 0; j < fieldLength; j++) {
                                if ($scope.tabs.sections[k].fields[j].tm_fieldapiname === childPicklistLogicalName) {

                                    var sectionIndx = k;
                                    var fieldIndex = j;

                                    $scope.tabs.sections[sectionIndx].fields[fieldIndex].DependentPicklist = [];


                                }
                            }
                        }
                        if (Selectedlabel !== '' && Selectedlabel !== null) {

                            SetDependentPicklistOptionSetLabel(section, parentPicklist, childPicklistLogicalName, Selectedlabel);
                        }

                    }

                },
                (error) => {
                    console.log("Error" + error);
                }
            );



        };


        function SetDependentPicklistOptionSetLabel(section, parentPicklist, childPicklistLogicalName, parentOption) {
            debugger;
            $http({
                method: "GET",
                async: false,
                url:
                    serverUrl + "/api/data/v9.0/tm_dependentpicklistrelationships?$filter=tm_childpicklistfieldlogicalname eq '" + childPicklistLogicalName + "' and  tm_parentpicklistfieldlogicalname eq '" + parentPicklist + "' and  tm_entityname eq '" + EntityName + "' and  tm_parentpicklistoption eq '" + parentOption + "'",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json: charset=utf-8",
                    Prefer: "odata.include-annotations=*",
                    "OData-MaxVersion": "4.0",
                    "OData-Version": "4.0",
                },
            }).then(
                (response) => {

                    var result = response.data.value;
                    if (result.length > 0) {
                        var selectedIndex;
                        var childPicklistOptions = result[0]["tm_childpicklistoptions"];
                        var childOptionset = childPicklistOptions.split(";", 5000);
                        // $scope[childPicklistLogicalName] = 0;
                        for (var k = 0; k < $scope.tabs.sections.length; k++) {
                            var fieldLength = $scope.tabs.sections[k].fields.length;
                            for (var j = 0; j < fieldLength; j++) {
                                if ($scope.tabs.sections[k].fields[j].tm_fieldapiname === childPicklistLogicalName) {

                                    var sectionIndx = k;
                                    var fieldIndex = j;

                                    $scope.tabs.sections[sectionIndx].fields[fieldIndex].DependentPicklist = [];

                                    for (var i = 0; i < childOptionset.length; i++) {

                                        var childoptionsetLabel = childPicklistOptions.split(";", 5000)[i].split(":", 2)[0];
                                        var childoptionsetValue = childPicklistOptions.split(";", 5000)[i].split(":", 2)[1];
                                        if ($scope.tabs.sections[k].fieldValue[childPicklistLogicalName] === parseInt(childoptionsetValue)) {
                                            selectedIndex = i + 1;
                                        }
                                        var optionsetValue = parseInt(childoptionsetValue);
                                        $scope.tabs.sections[sectionIndx].fields[fieldIndex].DependentPicklist.push({ id: optionsetValue, value: childoptionsetLabel });
                                    }
                                    var childPicklistName = childPicklistLogicalName + "@OData.Community.Display.V1.FormattedValue";
                                    //var parentOption = result[attributeLogical];
                                    if ($scope.tabs.sections[k].fieldValue[childPicklistLogicalName] !== null && $scope.tabs.sections[k].fieldValue[childPicklistLogicalName] !== undefined) {
                                        //   document.getElementById(childPicklistLogicalName).options.selectedIndex = selectedIndex;
                                        $scope[childPicklistLogicalName] = $scope.tabs.sections[k].fieldValue[childPicklistName];
                                        if ($scope.tabs.sections[k].fieldValue[childPicklistLogicalName] !== null && $scope.tabs.sections[k].fieldValue[childPicklistLogicalName] !== undefined) {
                                            // document.getElementById(childPicklistLogicalName).options.selectedIndex = selectedIndex;
                                            debugger;
                                            var picklistArraylength = $scope.tabs.sections[sectionIndx].fields[fieldIndex].DependentPicklist.length;
                                            for (var z = 0; z < picklistArraylength; z++) {
                                                if ($scope.tabs.sections[k].fieldValue[childPicklistLogicalName] === $scope.tabs.sections[sectionIndx].fields[fieldIndex].DependentPicklist[z].id) {
                                                    $scope[childPicklistLogicalName] = $scope.tabs.sections[sectionIndx].fields[fieldIndex].DependentPicklist[z];
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }

                    }
                    // $scope.$apply();
                },
                (error) => {
                    console.log("Error" + error);
                }
            );

        }


        $scope.ClearDependentPicklistArray = function (fieldApiname) {
            //debugger
            var ChildName = fieldApiname;
            var req = new XMLHttpRequest();
            req.open("GET", Xrm.Page.context.getClientUrl() + "/api/data/v9.1/tm_customizefields?$filter=tm_fieldapiname eq '" + fieldApiname + "' and tm_parentpicklist ne null", true);
            req.setRequestHeader("OData-MaxVersion", "4.0");
            req.setRequestHeader("OData-Version", "4.0");
            req.setRequestHeader("Accept", "application/json");
            req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
            req.setRequestHeader("Prefer", "odata.include-annotations=\"*\"");
            req.onreadystatechange = function () {
                if (this.readyState === 4) {
                    req.onreadystatechange = null;
                    if (this.status === 200) {
                        var results = JSON.parse(this.response);
                        for (var i = 0; i < results.value.length; i++) {
                            var tm_customizefieldid = results.value[i]["tm_customizefieldid"];
                            var ParentName = results.value[i]["tm_parentpicklist"];

                            var Selectedindex = document.getElementById(ParentName).options.selectedIndex
                            var Selectedlabel = document.getElementById(ParentName).options[Selectedindex].label
                            if (Selectedindex != undefined && Selectedindex != null && Selectedindex != "") {

                                var dependentPicklistRElationship = GetPicklistRelationship(Selectedlabel, ParentName);
                                if (dependentPicklistRElationship === 0) {
                                    for (var k = 0; k < $scope.tabs.sections.length; k++) {
                                        var fieldLength = $scope.tabs.sections[k].fields.length;
                                        for (var j = 0; j < fieldLength; j++) {
                                            if ($scope.tabs.sections[k].fields[j].tm_fieldapiname === ChildName) {

                                                var sectionIndx = k;
                                                var fieldIndex = j;

                                                $scope.tabs.sections[sectionIndx].fields[fieldIndex].DependentPicklist = [];


                                            }
                                        }
                                    }
                                }

                            }

                        }
                    } else {
                        Xrm.Utility.alertDialog(this.statusText);
                    }
                }
            };
            req.send();




        };


        function GetPicklistRelationship(Selectedlabel, ParentName) {
            var resultLength;
            var req = new XMLHttpRequest();
            req.open("GET", Xrm.Page.context.getClientUrl() + "/api/data/v9.1/tm_dependentpicklistrelationships?$filter=tm_parentpicklistoption eq '" + Selectedlabel + "' and tm_parentpicklistfieldlogicalname eq '" + ParentName + "'", true);
            req.setRequestHeader("OData-MaxVersion", "4.0");
            req.setRequestHeader("OData-Version", "4.0");
            req.setRequestHeader("Accept", "application/json");
            req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
            req.setRequestHeader("Prefer", "odata.include-annotations=\"*\"");
            req.onreadystatechange = function () {
                if (this.readyState === 4) {
                    req.onreadystatechange = null;
                    if (this.status === 200) {
                        var results = JSON.parse(this.response);
                        resultLength = results.value.length;

                    } else {
                        Xrm.Utility.alertDialog(this.statusText);
                    }
                }
            };
            req.send();
            return resultLength;
        }
        function setCharAt(str, index, chr) {
            if (index > str.length - 1) return str;
            return str.substr(0, index) + chr + str.substr(index + 1);
        }
        function FormatDate(passedDate) {
            var day = "";
            var month = "";
            var year = "";
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
            var day = "";
            var month = "";
            var year = "";
            var passedDateSplit = passedDate.split($scope.dateseparator);
            var convertDate = null;
            for (var i = 0; i < dateformatSplit.length; i++) {
                if (dateformatSplit[i].indexOf("y") !== -1) {
                    year = passedDateSplit[i];
                    if (year.length === 2) {
                        year = "20" + year;
                    }
                } else if (dateformatSplit[i].indexOf("M") !== -1 || dateformatSplit[i].indexOf("m") !== -1) {
                    month = passedDateSplit[i];
                    if (month === "Jan") {
                        month = "01";
                    } else if (month === "Feb") {
                        month = "02";
                    } else if (month === "Mar") {
                        month = "03";
                    } else if (month === "Apr") {
                        month = "04";
                    } else if (month === "May") {
                        month = "05";
                    } else if (month === "Jun") {
                        month = "06";
                    } else if (month === "Jul") {
                        month = "07";
                    } else if (month === "Aug") {
                        month = "08";
                    } else if (month === "Sep") {
                        month = "09";
                    } else if (month === "Oct") {
                        month = "10";
                    } else if (month === "Nov") {
                        month = "11";
                    } else if (month === "Dec") {
                        month = "12";
                    }
                } else if (dateformatSplit[i].indexOf("d") !== -1) {
                    day = passedDateSplit[i];
                    if (day.length === 1) {
                        day = "0" + day;
                    }
                }
            }
            var convertDate = year + "-" + month + "-" + day;
            return convertDate;
        }
        function GetFieldEntityData(sectionGUID, tab, section) {
            ////debugger;           
            var selectQry = $scope.tabs.tabAllFields;

            selectQryfinal = selectQry;
            if (selectQry.includes("_from_value") || selectQry.includes("_to_value") || selectQry.includes("_cc_value") || selectQry.includes("_bcc_value")) {
                selectQry = selectQry.replace(",_from_value", "");
                selectQry = selectQry.replace("_from_value", "");
                selectQry = selectQry.replace(",_to_value", "");
                selectQry = selectQry.replace("_to_value", "");
                selectQry = selectQry.replace(",_cc_value", "");
                selectQry = selectQry.replace("_cc_value", "");
                selectQry = selectQry.replace(",_bcc_value", "");
                selectQry = selectQry.replace("_bcc_value", "");
                if (EntityName.toLowerCase() === "email") {
                    selectQry = selectQry + "&$expand=email_activity_parties";
                }
                if (EntityName.toLowerCase() === "phonecall") {
                    selectQry = selectQry + "&$expand=phonecall_activity_parties";
                }

            }
            if (selectQry.includes("_requiredattendees_value") || selectQry.includes("_optionalattendees_value") || selectQry.includes("_organizer_value")) {
                selectQry = selectQry.replace(",_requiredattendees_value", "");
                selectQry = selectQry.replace("_requiredattendees_value", "");
                selectQry = selectQry.replace(",_optionalattendees_value", "");
                selectQry = selectQry.replace("_optionalattendees_value", "");
                selectQry = selectQry.replace(",_organizer_value", "");
                selectQry = selectQry.replace("_organizer_value", "");
                selectQry = selectQry + "&$expand=appointment_activity_parties";
            }
            var isMultiPickListExist = false;
            var selectQryforMultiPickList = "";
            var fieldIds = [];
            var fieldsArr = selectQry.split(",");
            if (fieldsArr[0] === "") {
                selectQry = setCharAt(selectQry, 0, "");
            }
            //for (var i = 0; i < $scope.tabs.sections[section].fields.length; i++) {
            //    if ($scope.tabs.sections[section].fields[i]["tm_fieldtype"] === "MultiSelectPicklistType") {
            //        var selectedValues = Xrm.Page.getAttribute($scope.tabs.sections[section].fields[i]["tm_fieldapiname"]).getValue();
            //        $scope.tabs.sections[section].fields[i].MultiPickList = [];
            //        $scope.tabs.sections[section].fields[i].MultiPickList = selectedValues;
            //        isMultiPickListExist = true;
            //        fieldIds.push({ id: i });
            //        if (selectQryforMultiPickList === "") {
            //            selectQryforMultiPickList = $scope.tabs.sections[section].fields[i]["tm_fieldapiname"];
            //        } else {
            //            selectQryforMultiPickList = selectQryforMultiPickList + "," + $scope.tabs.sections[section].fields[i]["tm_fieldapiname"];
            //        }
            //    }
            //}

            try {
                Xrm.WebApi.retrieveRecord(EntityName, OID, "?$select=" + selectQry + "").then(
                    function success(opportunity) {
                        //debugger;
                        var partyListlength;
                        var partylistmaskValue;
                        var entitylogicalName;
                        var activityId;
                        var partylistData; var i;
                        $scope.tabs.sections[section].fieldValue = opportunity;

                        for (i = 0; i < $scope.tabs.sections[section].fields.length; i++) {
                            if ($scope.tabs.sections[section].fields[i]["tm_fieldtype"] === "MultiSelectPicklistType") {
                                //var formattedvalue = $scope.tabs.sections[section].fields[i]["tm_fieldapiname"] + "@OData.Community.Display.V1.FormattedValue";
                                //var selectedValues = opportunity[formattedvalue].split(";", 1000);
                                var selectedValues = [];
                                var fieldname = $scope.tabs.sections[section].fields[i]["tm_fieldapiname"];
                                var selectedarrLength = opportunity[fieldname].split(",", 1000).length;
                                for (var indx = 0; indx < selectedarrLength; indx++) {
                                    selectedValues[indx] = parseInt(opportunity[fieldname].split(",", 1000)[indx]);
                                }

                                $scope.tabs.sections[section].fields[i].MultiPickList = [];
                                $scope.tabs.sections[section].fields[i].MultiPickList = selectedValues;
                                isMultiPickListExist = true;
                                fieldIds.push({ id: i });
                                if (selectQryforMultiPickList === "") {
                                    selectQryforMultiPickList = $scope.tabs.sections[section].fields[i]["tm_fieldapiname"];
                                } else {
                                    selectQryforMultiPickList = selectQryforMultiPickList + "," + $scope.tabs.sections[section].fields[i]["tm_fieldapiname"];
                                }
                            }
                        }
                        if ($scope.tabs.sections[section].fieldValue["directioncode@OData.Community.Display.V1.FormattedValue"] !== undefined && $scope.tabs.sections[section].fieldValue["directioncode@OData.Community.Display.V1.FormattedValue"] !== '') {
                            $scope.callStatus = $scope.tabs.sections[section].fieldValue["directioncode@OData.Community.Display.V1.FormattedValue"].toUpperCase();
                        }
                        if ($scope.tabs.sections[section].fieldValue["_regardingobjectid_value@Microsoft.Dynamics.CRM.lookuplogicalname"] !== undefined && $scope.tabs.sections[section].fieldValue["_regardingobjectid_value@Microsoft.Dynamics.CRM.lookuplogicalname"] !== '') {
                            document.getElementById("_regardingobjectid_value_entityname").value = $scope.tabs.sections[section].fieldValue["_regardingobjectid_value@Microsoft.Dynamics.CRM.lookuplogicalname"];
                        }
                        if (EntityName.toLowerCase() === "email") {
                            if ($scope.tabs.sections[section].fieldValue.email_activity_parties !== undefined && $scope.tabs.sections[section].fieldValue.email_activity_parties !== null) {
                                partyListlength = $scope.tabs.sections[section].fieldValue.email_activity_parties.length;
                                for (i = 0; i < partyListlength; i++) {
                                    partylistmaskValue = $scope.tabs.sections[section].fieldValue.email_activity_parties[i].participationtypemask.toString();
                                    entitylogicalName = $scope.tabs.sections[section].fieldValue.email_activity_parties[i]["_partyid_value@Microsoft.Dynamics.CRM.lookuplogicalname"];
                                    activityId = $scope.tabs.sections[section].fieldValue.email_activity_parties[i]["_partyid_value"];
                                    partylistData = $scope.tabs.sections[section].fieldValue.email_activity_parties[i]["_partyid_value@OData.Community.Display.V1.FormattedValue"];
                                    if (partylistmaskValue === '1' && selectQryfinal.includes("_from_value")) {
                                        document.getElementById("_from_value").value = partylistData;
                                        document.getElementById("_from_value_id").value = activityId;
                                        document.getElementById("_from_value_entityname").value = entitylogicalName;

                                    }
                                    if (partylistmaskValue === '2' && selectQryfinal.includes("_to_value")) {
                                        document.getElementById("_to_value").value = partylistData;
                                        document.getElementById("_to_value_id").value = activityId;
                                        document.getElementById("_to_value_entityname").value = entitylogicalName;
                                    }
                                    if (partylistmaskValue === '3' && selectQryfinal.includes("_cc_value")) {
                                        document.getElementById("_cc_value").value = partylistData;
                                        document.getElementById("_cc_value_id").value = activityId;
                                        document.getElementById("_cc_value_entityname").value = entitylogicalName;

                                    }
                                    if (partylistmaskValue === '4' && selectQryfinal.includes("_bcc_value")) {
                                        document.getElementById("_bcc_value").value = partylistData;
                                        document.getElementById("_bcc_value_id").value = activityId;
                                        document.getElementById("_bcc_value_entityname").value = entitylogicalName;
                                    }

                                }
                            }
                        }
                        if (EntityName.toLowerCase() === "appointment") {
                            if ($scope.tabs.sections[section].fieldValue.appointment_activity_parties !== undefined && $scope.tabs.sections[section].fieldValue.appointment_activity_parties !== null) {
                                partyListlength = $scope.tabs.sections[section].fieldValue.appointment_activity_parties.length;
                                for (i = 0; i < partyListlength; i++) {

                                    partylistmaskValue = $scope.tabs.sections[section].fieldValue.appointment_activity_parties[i].participationtypemask.toString();
                                    entitylogicalName = $scope.tabs.sections[section].fieldValue.appointment_activity_parties[i]["_partyid_value@Microsoft.Dynamics.CRM.lookuplogicalname"];
                                    activityId = $scope.tabs.sections[section].fieldValue.appointment_activity_parties[i]["_partyid_value"];
                                    partylistData = $scope.tabs.sections[section].fieldValue.appointment_activity_parties[i]["_partyid_value@OData.Community.Display.V1.FormattedValue"];
                                    if (partylistmaskValue === '5' && selectQryfinal.includes("_requiredattendees_value")) {
                                        document.getElementById("_requiredattendees_value").value = partylistData;
                                        document.getElementById("_requiredattendees_value_id").value = activityId;
                                        document.getElementById("_requiredattendees_value_entityname").value = entitylogicalName;

                                    }
                                    if (partylistmaskValue === '6' && selectQryfinal.includes("_optionalattendees_value")) {
                                        document.getElementById("_optionalattendees_value").value = partylistData;
                                        document.getElementById("_optionalattendees_value_id").value = activityId;
                                        document.getElementById("_optionalattendees_value_entityname").value = entitylogicalName;
                                    }
                                    if (partylistmaskValue === '7' && selectQryfinal.includes("_organizer_value")) {
                                        document.getElementById("_organizer_value").value = partylistData;
                                        document.getElementById("_organizer_value_id").value = activityId;
                                        document.getElementById("_organizer_value_entityname").value = entitylogicalName;
                                    }
                                }
                            }
                            if (opportunity.scheduledend !== undefined) {
                                document.getElementById("scheduledend").value = opportunity.scheduledend;
                            }
                            if (opportunity.scheduledstart !== undefined) {
                                document.getElementById("scheduledstart").value = opportunity.scheduledstart;
                            }
                        }
                        if (EntityName.toLowerCase() === "phonecall") {
                            if ($scope.tabs.sections[section].fieldValue.phonecall_activity_parties !== undefined && $scope.tabs.sections[section].fieldValue.phonecall_activity_parties !== null) {
                                partyListlength = $scope.tabs.sections[section].fieldValue.phonecall_activity_parties.length;
                                for (i = 0; i < partyListlength; i++) {
                                    partylistmaskValue = $scope.tabs.sections[section].fieldValue.phonecall_activity_parties[i].participationtypemask.toString();
                                    entitylogicalName = $scope.tabs.sections[section].fieldValue.phonecall_activity_parties[i]["_partyid_value@Microsoft.Dynamics.CRM.lookuplogicalname"];
                                    activityId = $scope.tabs.sections[section].fieldValue.phonecall_activity_parties[i]["_partyid_value"];
                                    partylistData = $scope.tabs.sections[section].fieldValue.phonecall_activity_parties[i]["_partyid_value@OData.Community.Display.V1.FormattedValue"];
                                    if (partylistmaskValue === '1') {
                                        document.getElementById("_from_value").value = partylistData;
                                        document.getElementById("_from_value_id").value = activityId;
                                        document.getElementById("_from_value_entityname").value = entitylogicalName;

                                    }
                                    if (partylistmaskValue === '2') {
                                        document.getElementById("_to_value").value = partylistData;
                                        document.getElementById("_to_value_id").value = activityId;
                                        document.getElementById("_to_value_entityname").value = entitylogicalName;
                                    }
                                }
                            }
                        }


                        var filteredfieldValue = $scope.tabs.sections[section].fields.filter(function (response) {
                            ////debugger;
                            if ("DateTime" === response["tm_fieldtype"] && EntityName.toLowerCase() !== "appointment") {
                                var fieldApiName = response["tm_fieldapiname"];
                                if ($scope.tabs.sections[section].fieldValue[fieldApiName] != null) {
                                    var dateFormat = new Date($scope.tabs.sections[section].fieldValue[fieldApiName]);
                                    var formatedValue = fieldApiName + "@OData.Community.Display.V1.FormattedValue";
                                    $scope.tabs.sections[section].fieldValue[formatedValue] = localDateToUTC(dateFormat);
                                }
                            }
                            return "DateTime" === response["tm_fieldtype"];
                        });
                        //************************************Start field level security*************************************************************************************
                        var filteredfieldLevelSecuValue = $scope.tabs.sections[section].fields.filter(function (response, index) {
                            var fieldApiName = response["tm_fieldapiname"];
                            try {
                                //if (fieldApiName === "tm_ftes") {
                                if (Xrm.Page.getAttribute(fieldApiName) != null) {
                                    ////debugger;
                                    var fldLvlSec = Xrm.Page.getAttribute(fieldApiName).getUserPrivilege();
                                    var canRead = fldLvlSec.canRead;
                                    var canCreate = fldLvlSec.canCreate;
                                    var canUpdate = fldLvlSec.canUpdate;
                                    if (!fldLvlSec.canRead) {
                                        if (
                                            response["tm_fieldtype"] === "Money" ||
                                            response["tm_fieldtype"] === "Decimal" ||
                                            response["tm_fieldtype"] === "Integer" ||
                                            response["tm_fieldtype"] === "BigInt" ||
                                            response["tm_fieldtype"] === "DateTime" ||
                                            response["tm_fieldtype"] === "Lookup" ||
                                            response["tm_fieldtype"] === "Customer"
                                        ) {
                                            var formatedValue = fieldApiName + "@OData.Community.Display.V1.FormattedValue";
                                            $scope.tabs.sections[section].fieldValue[formatedValue] = "*****";
                                        } else {
                                            $scope.tabs.sections[section].fieldValue[fieldApiName] = "*****";
                                        }
                                        $scope.tabs.sections[section].fields[index].canRead = false;
                                        $("#" + fieldApiName).attr("disabled", true);
                                    }
                                    if (!fldLvlSec.canUpdate) {
                                        $("#" + fieldApiName).attr("disabled", true);
                                    }
                                    if (!fldLvlSec.canCreate) {
                                        $("#" + fieldApiName).attr("disabled", true);
                                    }
                                }
                                //}
                                $scope.tabs.sections[section].fields[index].canRead = true;
                            } catch (e) { }
                            return;
                        });
                        if (isMultiPickListExist) {
                            //MultiPickListBind(selectQryforMultiPickList, tab, section, fieldIds);
                        }
                        $scope.$apply();
                    },
                    function fail(respose) {
                        ////debugger;
                        console.log(respose);
                    }
                );
            } catch (e) {
                console.log(e.message.toString());
            }
        }
        function BindCalenderIE(sectionId) {
            var datefield = document.createElement("input");
            datefield.id = sectionId;
            datefield.setAttribute("type", "date");
            if (datefield.type !== "date") {
                //if browser doesn't support input type="date", initialize date picker widget:
                jQuery(function ($) {
                    //on
                    $("input[type=date]").datepicker({ dateFormat: "yy-mm-dd" }).val();
                    $("input[type=date]").attr("placeholder", "yyyy-mm-dd");
                });
            }
        }
        function localDateToUTC(localDate) {
            return new Date(
                localDate.getUTCFullYear(),
                localDate.getUTCMonth(),
                localDate.getUTCDate(),
                localDate.getUTCHours(),
                localDate.getUTCMinutes(),
                localDate.getUTCSeconds()
            );
        }
        function GetOptionSetLabel(tab, section, field, EntityLogicalName, AttributeLogicalName) {
            $http({
                method: "GET",
                async: false,
                url:
                    serverUrl +
                    "/api/data/v9.0/EntityDefinitions(LogicalName='" +
                    EntityName +
                    "')/Attributes/Microsoft.Dynamics.CRM.PicklistAttributeMetadata?$select=LogicalName&$filter=LogicalName eq '" +
                    AttributeLogicalName +
                    "'&$expand=OptionSet",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json: charset=utf-8",
                    Prefer: "odata.include-annotations=*",
                    "OData-MaxVersion": "4.0",
                    "OData-Version": "4.0",
                },
            }).then(
                (response) => {
                    // this callback will be called asynchronously
                    // when the response is available
                    //debugger;
                    var result = response.data.value;
                    $scope.tabs.sections[section].fields[field].PickList = [];
                    var optionSet = result[0].OptionSet.Options;
                    for (var i = 0; i < result[0].OptionSet.Options.length; i++) {
                        $scope.tabs.sections[section].fields[field].PickList.push({
                            id: result[0].OptionSet.Options[i].Value,
                            value: result[0].OptionSet.Options[i].Label.LocalizedLabels[0].Label,
                        });
                        //$scope.tabs.sections[section].fields[field].PickList.push({ "id": result.OptionSet.Options[i].Value, "value": result.OptionSet.Options[i].Label.LocalizedLabels[0].Label, "color": result.OptionSet.Options[i].Color, "title": result.OptionSet.Options[i].Description.LocalizedLabels[0].Label })
                    }
                    $scope.$apply();
                },
                (error) => {
                    console.log("Error" + error);
                }
            );
            //SDK.Metadata.RetrieveAttribute(EntityLogicalName, AttributeLogicalName, "00000000-0000-0000-0000-000000000000", true,
            //    function (result) {
            //        $scope.tabs.sections[section].fields[field].PickList = [];
            //        var optionSet = result.OptionSet.Options;
            //        for (var i = 0; i < result.OptionSet.Options.length; i++) {
            //            $scope.tabs.sections[section].fields[field].PickList.push({ "id": result.OptionSet.Options[i].Value, "value": result.OptionSet.Options[i].Label.LocalizedLabels[0].Label })
            //            //$scope.tabs.sections[section].fields[field].PickList.push({ "id": result.OptionSet.Options[i].Value, "value": result.OptionSet.Options[i].Label.LocalizedLabels[0].Label, "color": result.OptionSet.Options[i].Color, "title": result.OptionSet.Options[i].Description.LocalizedLabels[0].Label })
            //        }
            //        $scope.$apply();
            //    },
            //    function (error) {
            //        alert(error);
            //    }
            //);
        }
        function GetOptionSetLabelMulti(tab, section, field, EntityLogicalName, AttributeLogicalName) {
            $http({
                method: "GET",
                async: false,
                url:
                    serverUrl +
                    "/api/data/v9.0/EntityDefinitions(LogicalName='" +
                    EntityName +
                    "')/Attributes/Microsoft.Dynamics.CRM.MultiSelectPicklistAttributeMetadata?$select=LogicalName&$filter=LogicalName eq '" +
                    AttributeLogicalName +
                    "'&$expand=OptionSet",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json: charset=utf-8",
                    Prefer: "odata.include-annotations=*",
                    "OData-MaxVersion": "4.0",
                    "OData-Version": "4.0",
                },
            }).then(
                (response) => {
                    // this callback will be called asynchronously
                    // when the response is available
                    //debugger;
                    var result = response.data.value;
                    $scope.tabs.sections[section].fields[field].PickList = [];
                    var optionSet = result[0].OptionSet.Options;
                    for (var i = 0; i < result[0].OptionSet.Options.length; i++) {
                        $scope.tabs.sections[section].fields[field].PickList.push({
                            id: result[0].OptionSet.Options[i].Value,
                            value: result[0].OptionSet.Options[i].Label.LocalizedLabels[0].Label,
                        });
                        //$scope.tabs.sections[section].fields[field].PickList.push({ "id": result.OptionSet.Options[i].Value, "value": result.OptionSet.Options[i].Label.LocalizedLabels[0].Label, "color": result.OptionSet.Options[i].Color, "title": result.OptionSet.Options[i].Description.LocalizedLabels[0].Label })
                    }
                    $scope.$apply();
                },
                (error) => {
                    console.log("Error" + error);
                }
            );

        }
        $scope.OpenLookupRecord = function (entityName, lookupRecordId, fieldApiname, fieldType) {
            try {
                if (fieldType === "PartyList" || fieldApiname === "_regardingobjectid_value") {
                    if (fieldApiname !== "") {
                        var Xrm = parent.Xrm;
                        lookupRecordId = document.getElementById(fieldApiname + "_id").value;
                        entityName = document.getElementById(fieldApiname + "_entityname").value;
                        var windowOptions = { openInNewWindow: false };
                        if (Xrm.Utility != null) {
                            Xrm.Utility.openEntityForm(entityName, lookupRecordId, null, windowOptions);
                        }
                    }
                }
                else {
                    Xrm = parent.Xrm;
                    windowOptions = { openInNewWindow: false };
                    if (Xrm.Utility !== null) {
                        Xrm.Utility.openEntityForm(entityName, lookupRecordId, null, windowOptions);
                    }
                }

            }
            catch (e) { }
        };
        var controlId, control_Id, controlentityname;
        $scope.OpenLookup = function (entityName, cntrlId, fieldtype) {
            controlId = cntrlId + "_id";
            controlentityname = cntrlId + "_entityname";
            control_Id = cntrlId;
            var lookupObjectParams = {};
            if (fieldtype === "PartyList" || cntrlId === "_regardingobjectid_value") {
                lookupObjectParams.entityTypes = entityName.split(",", 20);
                lookupObjectParams.defaultEntityType = "account";
            }
            else if (fieldtype === "PartyList" && cntrlId === "_from_value") {
                lookupObjectParams.entityTypes = entityName.split(",", 20);
                lookupObjectParams.defaultEntityType = "systemuser";
            }
            else if (fieldtype !== "PartyList") {
                lookupObjectParams.entityTypes = [entityName];
                lookupObjectParams.defaultEntityType = entityName;
            }
            //lookupObjectParams.defaultViewId = "3B24E1B8-438C-4B49-8A68-8748D5291688";
            lookupObjectParams.allowMultiSelect = false;
            lookupObjectParams.disableMru = true;
            //**********************Start Dependent Country-State*************************
            if (cntrlId === "_tm_project_stateprovince_value") {
                lookupObjectParams.filters = [
                    {
                        filterXml:
                            "<filter type='and'><condition attribute='tm_countryname' operator='eq' value='{" +
                            $("#_tm_project_country_value_id").val() +
                            "}' /></filter>",
                        entityLogicalName: entityName,
                    },
                ];
            }
            //**********************End Dependent Country-State*************************

            Xrm.Utility.lookupObjects(lookupObjectParams).then(CallbackFunctionLookup, LookupCancelCallback);
        };
        function CallbackFunctionLookup(selectedItems) {
            if (selectedItems != null && selectedItems.length > 0) {
                var lookup = [{ id: selectedItems[0].id, entityType: selectedItems[0].entityType, name: selectedItems[0].name }];
                $("#" + control_Id).val(lookup[0].name);
                $("#" + controlId).val(lookup[0].id.substring(1, 37));
                $("#" + controlentityname).val(lookup[0].entityType);
                $("#" + control_Id)
                    .removeClass("ng-pristine")
                    .addClass("ng-dirty");
                //**********************Start Dependent Country-State*************************
                if (control_Id === "_tm_project_country_value") {
                    $("#_tm_project_country_value").removeClass("ng-pristine").addClass("ng-dirty");
                    $("#_tm_project_stateprovince_value_id").val("");
                    $("#_tm_project_stateprovince_value").val("");
                }
                //**********************End Dependent Country-State*************************
            }
        }
        function LookupCancelCallback() { }
        function GetCurrency() {
            ////debugger;
            var currencysymbol = "";
            var currencyid = "";
            try {
                Xrm.WebApi.retrieveRecord(EntityName, OID, "?$select=_transactioncurrencyid_value").then(function (data) {
                    currencyid = data["_transactioncurrencyid_value"];
                    Xrm.WebApi.retrieveRecord("transactioncurrency", currencyid, "?$select=currencysymbol").then(function (dataCurr) {
                        currencysymbol = dataCurr["currencysymbol"];
                        $scope.currencysymbol = currencysymbol;
                    });
                    //.fail(function (error) {
                    //});
                });
                //.fail(function (error) {
                //});
            } catch (e) { }
            return currencysymbol;
        }
        function getEntityAllFields(selectQry) {
            try {
                Xrm.WebApi.retrieveRecord(EntityName, OID, "?$select=" + selectQry + "").then(
                    function success(entitydata) {
                        //debugger;
                        $scope.HeaderFieldsValue = entitydata;
                        var filteredfieldValue = $scope.HeaderFields.filter(function (response) {
                            ////debugger;
                            if (response["tm_formattedvalue"] != null) {
                                if (response["tm_formattedvalue"].includes("@OData.Community.Display.V1.FormattedValue")) {
                                    var fieldApiName = response["tm_fieldapiname"];
                                    $scope.HeaderFieldsValue[fieldApiName] = $scope.HeaderFieldsValue[fieldApiName + "@OData.Community.Display.V1.FormattedValue"];
                                }
                            }
                            else if (response["tm_fieldtype"] == "Picklist") {
                                var fieldApiName = response["tm_fieldapiname"];
                                if ($scope.HeaderFieldsValue[fieldApiName + "@OData.Community.Display.V1.FormattedValue"] != null) {
                                    $scope.HeaderFieldsValue[fieldApiName] = $scope.HeaderFieldsValue[fieldApiName + "@OData.Community.Display.V1.FormattedValue"];
                                }
                            }
                            return;
                        });
                        if ($scope.HeaderFieldsValue["clm_duedate"] != null) {
                            //debugger;
                            var duedate = new Date($scope.HeaderFieldsValue["clm_duedate"]);
                            var today = new Date();
                            const diffTime = Math.abs(duedate - today);
                            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                            // var array = { 'tm_name': '| Within ' + diffDays + ' days', 'tm_alignment': 'right' };
                            if (diffDays > 0) {
                                $scope.HeaderFields["clm_duedate"] = "| Within " + diffDays + " days";
                            } else {
                                $scope.HeaderFields["clm_duedate"] = "";
                            }
                            // $scope.HeaderFields[$scope.HeaderFields.length] = array;
                        }
                        $scope.$apply();
                    },
                    function fail(respose) {
                        ////debugger;
                        console.log(respose);
                    }
                );
            } catch (e) {
                console.log(e.message.toString());
            }
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
                        $scope.dateformat = data["dateformatstring"]
                            .replace("/", data["dateseparator"])
                            .replace("/", data["dateseparator"])
                            .replace("/", data["dateseparator"]);
                        $scope.dateOptions = {
                            changeYear: true,
                            changeMonth: true,
                            startingDay: 0,
                        };
                    }
                }
            };
            req.send();
        }
        $scope.changeFieldOrder = function () {
            document.getElementById("infomessage").style.visibility = "hidden";
            //debugger;
            if (EntityName.toLowerCase() === 'phonecall') {
                if (document.getElementById("_from_value") !== null && document.getElementById("_to_value") !== null) {
                    var req = new XMLHttpRequest();
                    req.open("GET", Xrm.Page.context.getClientUrl() + "/api/data/v9.1/tm_customizefields?$filter=tm_entityname eq 'phonecall'", true);
                    req.setRequestHeader("OData-MaxVersion", "4.0");
                    req.setRequestHeader("OData-Version", "4.0");
                    req.setRequestHeader("Accept", "application/json");
                    req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
                    req.setRequestHeader("Prefer", "odata.include-annotations=\"*\"");
                    req.onreadystatechange = function () {
                        if (this.readyState === 4) {
                            req.onreadystatechange = null;
                            if (this.status === 200) {
                                var results = JSON.parse(this.response);
                                for (var i = 0; i < results.value.length; i++) {
                                    var tm_customizefieldid = results.value[i]["tm_customizefieldid"];
                                    var tm_name = results.value[i]["tm_name"];
                                    var objfields = {};
                                    if (document.getElementById("directioncode").title === "OUTGOING") {
                                        if (tm_name === "To" || tm_name === "Call To") {
                                            objfields.tm_order = "2";
                                            Xrm.WebApi.updateRecord("tm_customizefield", tm_customizefieldid, objfields).then(function (result) {
                                            });
                                        }
                                        else if (tm_name === "From" || tm_name === "Call From") {
                                            objfields.tm_order = "4";
                                            Xrm.WebApi.updateRecord("tm_customizefield", tm_customizefieldid, objfields).then(function (result) {
                                            });
                                        }

                                    }
                                    else {
                                        if (tm_name === "To" || tm_name === "Call To") {
                                            objfields.tm_order = "4";
                                            Xrm.WebApi.updateRecord("tm_customizefield", tm_customizefieldid, objfields).then(function (result) {
                                            });
                                        }
                                        else if (tm_name === "From" || tm_name === "Call From") {
                                            objfields.tm_order = "2";
                                            Xrm.WebApi.updateRecord("tm_customizefield", tm_customizefieldid, objfields).then(function (result) {
                                            });
                                        }
                                    }
                                }
                                // Xrm.Page.getControl("WebResource_UICustomization_Phonecall").getObject().contentWindow.location.reload();
                                document.getElementById("infomessage").style.visibility = "visible";

                            } else {
                                Xrm.Utility.alertDialog(this.statusText);
                            }
                        }
                    };
                    req.send();
                }
            };
        }
    }
})(document, angular);
