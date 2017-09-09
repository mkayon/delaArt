(function () {
    'use strict';

    angular.module("firebasedata").factory("homepageDataService",
    [

        "$firebaseObject",
        "$firebaseArray",
        "$http",
        "$ionicLoading",
        "firebaseAuthenticationService",
        function ($firebaseObject, $firebaseArray, $http, $ionicLoading, firebaseAuthenticationService) {

            function getEmergencyRef() {
                var url = "https://delaartsplace.firebaseio.com/data/messages/emergency";
                return new Firebase(url);
            }


            //data.emergency
            //    "emergency":{
            //        "show": true,
            //        "text": "Schoool is closed today!"
            //    },
            //    "callAboutClasses": {
            //        "show": true,
            //        "text":  "(513) 871-0914 to inquire about classes and to register"
            //    },
            //"currentSession": {
            //    "show": true,
            //    "text": "9 Week Sessions Beginning Oct 26th"
            //}

            function getData() {
                var url = "https://delaartsplace.firebaseio.com/data.json";
                return $http.get(url);
            }

            function saveData(contentId, data) {
                console.log("going to save " + contentId + " " + data.text + " " + data.show);

                var token = firebaseAuthenticationService.getToken();
                if (token) {

                    var url = "";
                    var baseUrl = "https://delaartsplace.firebaseio.com/data/messages/";
                    switch (contentId) {
                        case "emergency":
                            url = baseUrl + "emergency.json?auth=" + token;
                            break;
                        case "currentSession":
                            url = baseUrl + "currentSession.json?auth=" + token;
                            break;
                        case "callAboutClasses":
                            url = baseUrl + "callAboutClasses.json?auth=" + token;
                            break;

                    }
                    return $http.put(url, data );
                }
                else {
                    return null;
                }
            }


            function getNotificationData() {

                var url = "https://delaartsplace.firebaseio.com/data/Notification";
                var ref = new Firebase(url);

                return $firebaseArray(ref);
                //return ref.orderByChild("show"); //$firebaseObject(ref);
                //ref.once("value", function(snap) {
                //    //console.log("initial data loaded!", Object.keys(snap.val()).length === count);
                //    return snap;
                //});
            }

            function getRegistrationData() {

                var url = "https://delaartsplace.firebaseio.com/data/Registration";
                var ref = new Firebase(url);

                return $firebaseArray(ref);
                //return ref.orderByChild("show"); //$firebaseObject(ref);
                //ref.once("value", function(snap) {
                //    //console.log("initial data loaded!", Object.keys(snap.val()).length === count);
                //    return snap;
                //});
            }

            return {
                getData: getData,
                saveData: saveData,
                getNotificationData: getNotificationData,
                getRegistrationData: getRegistrationData,
                getEmergencyRef: getEmergencyRef
            }
        }
    ]);

}
)();

