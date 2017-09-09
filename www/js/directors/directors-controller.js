(function () {
    'use strict';

    angular.module('directors').controller("directorsController", [

        '$scope',
        function ($scope) {

            function init() {
             console.log("directors init");
            }

            init();
        }
    ]);

})();