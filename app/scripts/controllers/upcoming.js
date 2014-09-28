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
        $scope.events = [];

        function retrieveEvents() {
            var scope = $scope;
            scope.events = [];
            api.all(
                function(events) {
                    var now = new Date();
                    angular.forEach(events, function(event) {
                        if(new Date(event.date).valueOf() >= now.valueOf()){
                            scope.events.push(event);
                        }
                    });
                    scope.events.sort(function(a, b) {
                        return (new Date(a.date)).valueOf() - (new Date(b.date)).valueOf();
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
