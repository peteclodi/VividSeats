'use strict';

/**
 * @ngdoc function
 * @name vividSeatsTestApp.controller:UpcomingCtrl
 * @description
 * # UpcomingCtrl
 * Controller of the vividSeatsTestApp
 */
angular.module('vividSeatsTestApp')
    .controller('UpcomingCtrl', function ($scope, $modal, AlertModal, EventActions) {
        var api = VividSeats.eventService;
        $scope.upcomingEvents = {};

        function retrieveEvents() {
            var scope = $scope;
            scope.upcomingEvents = {};
            api.all(
                function(events) {
                    var now = new Date();
                    events.sort(function(a, b) {
                        return (new Date(a.date)).valueOf() - (new Date(b.date)).valueOf();
                    });
                    angular.forEach(events, function(event) {
                        var currentDateTimeVal = new Date(event.date).valueOf();
                        if(currentDateTimeVal >= now.valueOf()){
                            if(angular.isUndefined(scope.upcomingEvents[currentDateTimeVal])) {
                                scope.upcomingEvents[currentDateTimeVal] = [];
                            }
                            scope.upcomingEvents[currentDateTimeVal].push(event);
                        }
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
