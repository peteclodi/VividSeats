'use strict';

/**
 * @ngdoc function
 * @name vividSeatsTestApp.controller:AllCtrl
 * @description
 * # AllCtrl
 * Controller of the vividSeatsTestApp
 */
angular.module('vividSeatsTestApp')
    .controller('AllCtrl', function ($scope) {
        var api = VividSeats.eventService;
        $scope.allEvents = [];

        function retrieveEvents() {
            var scope = $scope;
            scope.allEvents = [];
            api.all(
                function(events) {
                    angular.forEach(events, function(event) {
                        scope.allEvents.push(event);
                    });
                    scope.$apply();
                },
                function(errorMsg) {
                    console.log(errorMsg)
                }
            );
        }

        $scope.removeEvent = function(event) {
            api.remove(event,
                function() {
                    retrieveEvents();
                },
                function(errorMsg) {
                    console.log(errorMsg)
                }
            );
        };

        $scope.editEvent = function(event) {

        };

        $scope.addEvent = function() {

        };

        retrieveEvents();
    });
