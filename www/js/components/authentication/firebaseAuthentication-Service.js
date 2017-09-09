
/** 
 * Firebase User Authentication by user name and password
 * 
 * Type: Service
 * 
 * ID: firebaseAuthenticationService
 * 
 */
(function () {
    'use strict';

    angular.module('firebaseAuthentication').factory('firebaseAuthenticationService',
        [
          "$firebaseAuth",  
    
    function ($firebaseAuth) {
        /*
        
        uid 	A unique user ID, intended as the user's unique key across all providers. 	String
        provider 	The authentication method used, in this case: password. 	String
        token 	The Firebase authentication token for this session. 	String
        auth 	The contents of the authentication token, which will be available as the auth variable within your Security and Firebase Rules. 	Object
        expires 	A timestamp, in seconds since the UNIX epoch, indicating when the authentication token expires. 	Number
        password 	An object containing provider-specific data. 	Object
        password.email 	The user's email address. 	String
        password.isTemporaryPassword 	Whether or not the user authenticated using a temporary password, as used in password reset flows. 	Boolean
        password.profileImageURL 	The URL to the user's Gravatar profile image, which is retrieved from hashing the user's email. If the user does not have a Gravatar profile, then a pixelated face is used. 
        */
        
        
        
        var ref = new Firebase("https://delaartsplace.firebaseio.com");
        var auth = $firebaseAuth(ref);
        
        function getAuthenticationData() {
           return ref.getAuth();           
        }

        function getIsAuthenticated (){
         return getAuthenticationData() != null;
        }

        function getToken() {
            var authData = getAuthenticationData();
            return (authData) ? authData.token : "";
        }
        function getUserId() {
        var authData = getAuthenticationData();            
            return (authData) ? authData.uid : "";
        }


        

        // Perform the login action when the user submits the login form
        function loginWithUserNameAndPassword(loginData) {
            console.log('Doing loginWithUserNameAndPassword', loginData);
            
            return auth.$authWithPassword({ email: loginData.username, password: loginData.password });

            //ref.authWithPassword({ email: loginData.username, password: loginData.password },
            //    function (error, authData) {
            //        if (error) {
            //            isAuthenticated = false;
            //            authenticationError = error;
            //            console.log("Login Failed!", error);

            //        } else {
            //            console.log("Authenticated successfully with payload:", authData);
            //            isAuthenticated = true;
            //            authenticationData = authData;
            //        }
            //    }, {
            //        remember: "sessionOnly"
            //    }
            // );

            // ref.onAuth(function(authData) {
            //  if (authData === null) {
            //    console.log("Not logged in yet");
            //  } else {
            //    console.log("Logged in as", authData.uid);
            //  }
            //  $scope.authData = authData; // This will display the user's name in our view
            //});

            

        };

        return {
            loginWithUserNameAndPassword: loginWithUserNameAndPassword,
            getIsAuthenticated : getIsAuthenticated,
            getToken: getToken,
            getUserId :getUserId,
            getAuthenticationData: getAuthenticationData,
            
        }
        
    }])

})();