// JavaScript source code
(function (document, angular) {
    var ngApp = angular.module('PwinApp', []);
    ngApp.controller('PwinDynamicController', function ($scope, $window, $http) {
        debugger;
        var Xrm = parent.Xrm;
        var oppguid = 'D65AA1D2-FD9A-4594-BEB3-630ABC3BDE1C';
        var OID = oppguid;
        var UserId = Xrm.Page.context.getUserId();
        var entityName = Xrm.Page.data.entity.getEntityName();
        var serverUrl = location.protocol + "//" + location.host;
        $scope.pwingivenans = {};
        $scope.pwintabs = [];
        setTimeout(function GetOppData() {
            GetTabData();
        }, 650);

        function GetTabData() {
            try {
                $http({
                    method: "GET",
                    async: false,
                    url: serverUrl + "/api/data/v9.0/fedcap_opportunitypwinanswers?$filter=_fedcap_opportunityid_value eq " + OID + "",
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
                               debugger;
                               var result = response.data.value;
                               $scope.pwingivenans = response.data.value;
                               GetOptionSetLabelValue(0, 0, "fedcap_pwinquestion", "fedcap_stage");
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
        function GetSections(callback) {

            //callback(result);
        }

        function GetOptionSetLabelValue(tab, section, EntityLogicalName, AttributeLogicalName) {
            try {

                $http({
                    method: "GET",
                    async: false,
                    url:
                        serverUrl +
                        "/api/data/v9.0/EntityDefinitions(LogicalName='" +
                        EntityLogicalName +
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
                    debugger;
                    var result = response.data.value;
                    $scope.pwintabs = [];
                    for (var i = 0; i < result[0].OptionSet.Options.length; i++) {
                        var sum = 0.00;
                        var value = result[0].OptionSet.Options[i].Label.LocalizedLabels[0].Label;
                        $scope.pwintabs.push({ "id": result[0].OptionSet.Options[i].Value, "value": result[0].OptionSet.Options[i].Label.LocalizedLabels[0].Label, "score": 0.00, "selectedpwintab": false })
                    }
                    $scope.pwintabs[0].selectedpwintab = true;
                    GetPWinQuestionWebAPI(tab, section, 0.00);
                    $scope.$apply();
                },
                (error) => {
                    console.log("Error" + error);
                }
            );                
            }
            catch (e) {
                Xrm.Utility.alertDialog(e.message);
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

                            if ($scope.pwingivenans.length > 0) {
                                var filteredData = $scope.pwingivenans.filter(
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
        $window.onload = function (e) {
            $scope.activeQuestions(0)
        }
        var questionData;
        $scope.screenId = 0;
        $scope.width = $window.innerWidth;
        $scope.setScreen = function (i) {
            if ($window.innerWidth > 1024) {
                $scope.screenId = i;
                $scope.activeQuestions(i)
            }
            else {
                for (let k = 0; k < $scope.pwintabs.length; k++) {
                    if (k != i) {
                        $scope.pwintabs[k].collapse = false;
                    }
                    else {
                        $scope.pwintabs[i].collapse = !$scope.pwintabs[i].collapse;
                    }
                }

                $scope.activeQuestions(i)
            }
        }
        $scope.activeQuestions = function (i) {
            console.log($scope.pwintabs)
            $scope.activeQuestionsArray = $scope.pwintabs.filter(item => {
                if (item.id == i) {
                    return item
                }
            })
            $scope.$apply();
            console.log($scope.activeQuestionsArray)
        }       
    });
})(document, angular);