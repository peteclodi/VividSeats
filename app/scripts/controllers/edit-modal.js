'use strict';

/**
 * @ngdoc function
 * @name vividSeatsTestApp.controller:EditModalInstanceCtrl
 * @description
 * # EditModalInstanceCtrl
 * Controller of the vividSeatsTestApp
 */
angular.module('vividSeatsTestApp')
    .controller('EditModalInstanceCtrl', function ($scope, $rootScope, $modalInstance, $filter, event) {
        $scope.event = event;
        $scope.editingEvent = angular.copy(event);
        $scope.format = $rootScope.dateFormat;
        $scope.states = $rootScope.states;

        $scope.open = function($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.opened = true;
        };

        $scope.ok = function() {
            $scope.editingEvent.date = $filter('date')($scope.editingEvent.date, $scope.format);
            $modalInstance.close($scope.editingEvent);
        };
        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };
    });