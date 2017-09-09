(function () {
    'use strict';

    angular.module('carousel').controller("carouselController", [

        '$scope',
			'$window',
        function ($scope) {

            
            

            $scope.onReadySwiper = function (swiper) {

                swiper.on('slideChangeStart', function () {
                    console.log('slide start');
                });

                swiper.on('onSlideChangeEnd', function () {
                    console.log('slide end');
                });
            };


            function init() {
                initScope();
            }


            //---------------------------------------------------------------------------------
            // iniScope
            //---------------------------------------------------------------------------------
            function initScope() {
                $scope.swiper = {};
            }

            init();
        }
    ]);

})();