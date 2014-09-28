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
        'ngRoute',
        'ngSanitize',
        'ui.bootstrap'
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
    })
    .run(function($rootScope, $route, $location) {
        $rootScope.activeTab = 'all';
        $rootScope.dateFormat = 'MMM d ha';
        $rootScope.states = [
            { name: ''}, { name: 'AL' }, { name: 'AK' }, { name: 'AZ' }, { name: 'AR' }, { name: 'CA' },
            { name: 'CO' }, { name: 'CT' }, { name: 'DE' }, { name: 'FL' }, { name: 'GA' }, { name: 'HI' },
            { name: 'ID' }, { name: 'IL' }, { name: 'IN' }, { name: 'IA' }, { name: 'KS' }, { name: 'KY' },
            { name: 'LA' }, { name: 'ME' }, { name: 'MD' }, { name: 'MA' }, { name: 'MI' }, { name: 'MN' },
            { name: 'MS' }, { name: 'MO' }, { name: 'MT' }, { name: 'NE' }, { name: 'NV' }, { name: 'NH' },
            { name: 'NJ' }, { name: 'NM' }, { name: 'NY' }, { name: 'NC' }, { name: 'ND' }, { name: 'OH' },
            { name: 'OK' }, { name: 'OR' }, { name: 'PA' }, { name: 'RI' }, { name: 'SC' }, { name: 'SD' },
            { name: 'TN' }, { name: 'TX' }, { name: 'UT' }, { name: 'VT' }, { name: 'VA' }, { name: 'WA' },
            { name: 'WV' }, { name: 'WI' }, { name: 'WY' }
        ];

        $rootScope.$on('$routeChangeSuccess', function() {
            $rootScope.activeTab = $location.url();
        });
    });
