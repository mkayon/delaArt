(function () {
    'use strict';

    angular.module('forms').controller("formsController", [

        '$scope',
        function ($scope) {

            
            $scope.registrationFormShow = function (){
              var ref = cordova.InAppBrowser.open('http://delaartsplace.com/student-registration.pdf', '_system', 'location=yes');
            };

            
            $scope.medicalAndAllergyFormShow= function (){
                var ref = cordova.InAppBrowser.open('http://delaartsplace.com/medical-and-allergy-form.pdf', '_system', 'location=yes');
            };

            $scope.danceAndChildrensHandbookYearlyShow = function (){
                var ref = cordova.InAppBrowser.open('http://delaartsplace.com/2015-2016-student-childrens.pdf', '_system', 'location=yes');
            };

            $scope.academyHandbookShow= function (){
                var ref = cordova.InAppBrowser.open('http://delaartsplace.com/2015-2016-student-handbook.pdf', '_system', 'location=yes');
            };


            $scope.photoReleaseFormShow = function () {
                var ref = cordova.InAppBrowser.open('http://delaartsplace.com/2015-2016-student-handbook.pdf', '_system', 'location=yes');
            };

            function init() {
                console.log("formsController init");
            }

            init();
        }
    ]);

})();

