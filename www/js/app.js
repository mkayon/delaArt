+
// Ionic De la Arst Place App

(function () {
    'use strict';

var app = angular.module('dela', [
    'ionic',
    'firebase',
        
    //'ngOpenFB',
    

    'home',
    'directors',
    'teachers',
    'calendar',
    'forms',
    'gallery',
    'cms',
    'mapWithGoogleMaps',
    'firebasedata',
    'firebaseAuthentication'

]);


app.run(
    function ($rootScope, $ionicPlatform, $ionicLoading /*, $ionicModal, localStorageService ,ngFB*/) {

        console.log('app "De la Arts Place" is running!');

        $rootScope.$on('loading:show', function () {
            $ionicLoading.show({
                template: '<ion-spinner icon="dots"></ion-spinner>',
                hideOnStageChange: true
            });
        });

        $rootScope.$on('loading:hide', function () {
            $ionicLoading.hide();
        });


        //ngFB.init({ appId: '1610811159179641' });


        // localStorageService.set('name', 'Max');
        // console.log($localstorage.get('name'));
        // localStorageService.setObject('post', {
        // name: 'Thoughts',
        // text: 'Today was a good day'
        // });

        // var post = localStorageService.getObject('post');
        // console.log(post);


        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
    });

app.config(function ($stateProvider, $urlRouterProvider, $httpProvider, $compileProvider) {

    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|ghttps?|ms-appx|x-wmapp0):/);

    $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|file|ms-appx|x-wmapp0):|data:image\//);

    $httpProvider.interceptors.push(function ($rootScope) {
        return {
            request: function (config) {
                $rootScope.$broadcast('loading:show');
                return config;
            },
            response: function (response) {
                $rootScope.$broadcast('loading:hide');
                return response;
            }
        }
    });


    $stateProvider
      .state('app', {
          url: '/app',
          abstract: true,
          templateUrl: 'js/components/navigation/menu.html',
          controller: 'appController'
      })
          


        .state('app.home', {
            url: '/home',
            views: {
                'menuContent': {
                    templateUrl: 'js/home/home.html',
                    controller: 'homeController'
                }
            }
        })
        .state('app.directors', {
            url: '/directors',
            views: {
                'menuContent': {
                    templateUrl: 'js/directors/directors.html',
                    controller: 'directorsController'
                }
            }
        })
        .state('app.teachers', {
            url: '/teachers',
            views: {
                'menuContent': {
                    templateUrl: 'js/teachers/teachers.html',
                    controller: 'teachersController'
                }
            }
        })


        .state('app.calendar', {
            url: '/calendar',
            views: {
                'menuContent': {
                    templateUrl: 'js/calendar/calendar.html',
                    controller: 'calendarController'
                }
            }
        })

        .state('app.forms', {
            url: '/forms',
            views: {
                'menuContent': {
                    templateUrl: 'js/forms/forms.html',
                    controller: 'formsController'
                }
            }
        })


        .state('app.gallery', {
            url: '/gallery',
            views: {
                'menuContent': {
                    templateUrl: 'js/gallery/gallery.html',
                    controller: 'galleryController'
                }
            }
        })

        .state('app.cms', {
            url: '/cms',
            views: {
                'menuContent': {
                    templateUrl: 'js/cms/cms.html',
                    controller: 'cmsController'
                }
            }
        })

        .state('app.editcms', {
            url: "/cms/:contentId",
            views: {
                'menuContent': {
                    templateUrl: 'js/cms/cmsEdit.html',
                    controller: 'cmsEditController'
                }
            }
        })


        .state('app.map', {
            url: '/map',
            views: {
                'menuContent': {
                    templateUrl: 'js/components/map/map.html',
                    controller: 'mapController'
                }
            }
        });

    // .state('app.playlists', {
    // url: '/playlists',
    // views: {
    // 'menuContent': {
    // templateUrl: 'templates/playlists.html',
    // controller: 'PlaylistsCtrl'
    // }
    // }
    // })

    // .state('app.single', {
    // url: '/playlists/:playlistId',
    // views: {
    // 'menuContent': {
    // templateUrl: 'templates/playlist.html',
    // controller: 'PlaylistCtrl'
    // }
    // }
    // });

    // if none of the above states are matched, use this as the fallback
    //$urlRouterProvider.otherwise('/app/playlists');
    //$urlRouterProvider.otherwise('/app/sessions');
    $urlRouterProvider.otherwise('/app/home');
 });
})();