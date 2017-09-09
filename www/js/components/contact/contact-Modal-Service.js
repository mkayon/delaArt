(function () {
    'use strict';

    angular.module('contact').factory('contactModalService',
        [
            '$scope', 
            '$ionicModal',

            function ($scope, $ionicModal) {

                $ionicModal.fromTemplateUrl('js/components/contact/contact-modal.html', {
                    scope: $scope
                }).then(function (modal) {
                    $scope.contactModal = modal;
                });


                function closeContact() {
                    $scope.contactModal.hide();
                };

                function showContact () {
                    $scope.contactModal.show();
                }

                return {
                    closeContact: closeContact,
                    showContact: showContact
                }

                //function success(message) {
                //    toastr.success(message);
                //}

                //function info(message) {
                //    toastr.info(message);
                //}

                //function warning(message) {
                //    toastr.warning(message);
                //}

                //function error(message) {
                //    toastr.error(message);
                //}

                //return {
                //    success: success,
                //    info: info,
                //    warning: warning,
                //    error: error
                //}
            }
        ]
    );

})();