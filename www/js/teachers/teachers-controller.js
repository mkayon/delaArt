(function () {
    'use strict';

    angular.module('teachers').controller("teachersController", [

        '$scope',
        function ($scope) {

            function init() {

                $scope.teachers = [
                    { id: 1, image: "img/Meridith.jpg", name: "Meredith Benson", text: "Meridith Benson began her professional career ..." },
                    { id: 2, image: "img/MeryCamp.jpg", name: "Mery Camp", text: "Mery Camp..." },
                    { id: 3, image: "img/Beverly.jpg", name: "Beverly Strelau", text: "Beverly Strelau..." },
                    { id: 4, image: "img/Amy_Harold.jpg", name: "Amy Harold", text: "Amy Harold..." },
                    { id: 5, image: "img/Alexandra_Brannon.jpg", name: "Alexandra Brannon", text: "Alexandra Brannon..." },
                    { id: 6, image: "img/Cathryn_Lacy.jpg", name: "Cathryn Lacy", text: "Cathryn Lacy..." }
                ];

                console.log($scope.teachers);
            }

            init();
        }
    ]);

})();