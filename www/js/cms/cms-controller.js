(function () {
    'use strict';

    angular.module('cms').controller("cmsController", [
        '$scope',
        
        function ($scope) {

            var emergencyRef;

            //$scope.saveCmsData = function () {
            //    alert('saveCmsData()');
            //};

            function init() {

                $scope.smcData = {};                

                //emergencyRef = homepageDataService.getEmergencyRef();
                
               }

            init();

        }
    ]);

})();