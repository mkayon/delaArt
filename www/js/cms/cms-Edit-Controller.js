(function () {
    'use strict';

    angular.module('cms').controller("cmsEditController", [
        "$scope",
        "$stateParams",
        "$window",
        "$ionicPopup",
        "homepageDataService",

        function ($scope, $stateParams, $window, $ionicPopup, homepageDataService) {

            var contentId = $stateParams.contentId;


            $scope.cancelCmsDataEdit = function () {

                $window.history.back();
            }


            $scope.saveCmsData = function () {

                var editedData = { show: $scope.smcData.show, text: $scope.smcData.text };

                homepageDataService.saveData(contentId, editedData)
                    .then(function (serverData) {
                        console.log(serverData);
                        if (serverData){
                                                    
                            var alertPopup = $ionicPopup.alert({
                                title: serverData.statusText,
                                template: (serverData.status == 200) ? "Your data successfuly saved" : "Error saving data"
                            });

                            alertPopup.then(function (res) {
                                $window.history.back();
                            });
                        }
                    }
                )
                .catch(function (error) {
                    alert(error);
                });
            };

            function initEditData(serverData) {
                switch (contentId) {
                    case "emergency":
                        $scope.smcData.show = serverData.data.messages.emergency.show;
                        $scope.smcData.text = serverData.data.messages.emergency.text;

                        break;
                    case "currentSession":
                        $scope.smcData.show = serverData.data.messages.currentSession.show;
                        $scope.smcData.text = serverData.data.messages.currentSession.text;
                        break;
                    case "callAboutClasses":

                        $scope.smcData.show = serverData.data.messages.callAboutClasses.show;
                        $scope.smcData.text = serverData.data.messages.callAboutClasses.text;

                        break;
                }
            }


            function getData() {
                homepageDataService.getData().then(
                     function (serverData) {
                         if (serverData) {
                             initEditData(serverData);
                             // Refersh
                             $scope.$digest();
                         }
                     });
            }


            function init() {

                console.log("init cmsEditController");

                $scope.smcData = {};

            }


            // Initialize
            init();
            getData();
        }
    ]);
})();