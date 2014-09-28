'use strict';

/**
 * @ngdoc function
 * @name vividSeatsTestApp.controller:AddModalInstanceCtrl
 * @description
 * # AddModalInstanceCtrl
 * Controller of the vividSeatsTestApp
 */
angular.module('vividSeatsTestApp')
    .controller('AddModalInstanceCtrl', function ($scope, $rootScope, $modalInstance, $filter, event) {
        $scope.event = event;
        $scope.format = $rootScope.dateFormat;
        $scope.states = $rootScope.states;

        $scope.open = function($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.opened = true;
        };

        $scope.save = function() {
            $scope.event.date = $filter('date')($scope.event.date, $scope.format);
            $modalInstance.close($scope.event);
        };
        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };
    });