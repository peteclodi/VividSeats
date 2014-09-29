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
        $scope.localEvents = {};

        function retrieveEvents() {
            var scope = $scope;
            scope.localEvents = {};
            api.all(
                function(events) {
                    events.sort(function(a, b) {
                        return (new Date(a.date)).valueOf() - (new Date(b.date)).valueOf();
                    });
                    angular.forEach(events, function(event) {
                        if(angular.isUndefined(scope.localEvents[event.venue.city])) {
                            scope.localEvents[event.venue.city] = [];
                        }
                        scope.localEvents[event.venue.city].push(event);
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
