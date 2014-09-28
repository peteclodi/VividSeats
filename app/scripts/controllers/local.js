'use strict';

/**
 * @ngdoc function
 * @name vividSeatsTestApp.controller:LocalCtrl
 * @description
 * # LocalCtrl
 * Controller of the vividSeatsTestApp
 */
angular.module('vividSeatsTestApp')
    .controller('LocalCtrl', function ($scope, AlertModal, EventActions) {
        var api = VividSeats.eventService;
        $scope.events = {};

        function retrieveEvents() {
            var scope = $scope;
            scope.events = {};
            api.all(
                function(events) {
                    events.sort(function(a, b) {
                        return (new Date(a.date)).valueOf() - (new Date(b.date)).valueOf();
                    });
                    angular.forEach(events, function(event) {
                        if(angular.isUndefined(scope.events[event.venue.city])) {
                            scope.events[event.venue.city] = [];
                        }
                        scope.events[event.venue.city].push(event);
                    });
                    scope.$apply();
                },
                function(errorMsg) {
                    AlertModal.open(errorMsg);
                }
            );
        }

        $scope.removeEvent = function(event) {
            EventActions.remove(event, function() { retrieveEvents(); });
        };

        $scope.editEvent = function(event) {
            EventActions.edit(event, function() { retrieveEvents(); });
        };

        retrieveEvents();
    });
