'use strict';

/**
 * @ngdoc overview
 * @name vividSeatsTestApp
 * @description
 * # vividSeatsTestApp
 *
 * Main module of the application.
 */
angular
    .module('vividSeatsTestApp', [
        'ngResource',
        'ngRoute'
    ])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/all.html',
                controller: 'AllCtrl'
            })
            .when('/upcoming', {
                templateUrl: 'views/upcoming.html',
                controller: 'UpcomingCtrl'
            })
            .when('/local', {
                templateUrl: 'views/local.html',
                controller: 'LocalCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    });
