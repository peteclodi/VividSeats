'use strict';

/**
 * @ngdoc function
 * @name vividSeatsTestApp.controller:AllCtrl
 * @description
 * # AllCtrl
 * Controller of the vividSeatsTestApp
 */
angular.module('vividSeatsTestApp')
    .controller('AllCtrl', function ($scope, $rootScope, $modal, AlertModal, EventActions) {
        var api = VividSeats.eventService;
        $scope.events = [];
        $scope.dateFormat = $rootScope.dateFormat;

        function retrieveEvents() {
            var scope = $scope;
            scope.events = [];
            api.all(
                function(events) {
                    angular.forEach(events, function(event) {
                        scope.events.push(event);
                    });
                    scope.events.sort(function(a, b) {
                        return (new Date(a.date)).valueOf() - (new Date(b.date)).valueOf();
                    });
                    scope.$apply();
                },
                function(errorMsg) {
                    AlertModal.open('Error Retrieving Events', errorMsg);
                }
            );
        }

        $scope.removeEvent = function(event) {
            EventActions.remove(event, function() { retrieveEvents(); });
        };

        $scope.editEvent = function(event) {
            EventActions.edit(event, function() { retrieveEvents(); });
        };

        $scope.addEvent = function() {
            var modalInstance = $modal.open({
                templateUrl: 'views/add-modal.html',
                controller: 'AddModalInstanceCtrl',
                resolve: {
                    event: function() {
                        return { date: (new Date()).valueOf(), venue: {} };
                    }
                }
            });

            modalInstance.result.then(function (newEvent) {
                api.add(newEvent,
                    function() {
                        retrieveEvents();
                    },
                    function(errorMsg) {
                        AlertModal.open('Error Adding Event', errorMsg);
                    }
                );
            }, function() {});
        };

        retrieveEvents();
    });
