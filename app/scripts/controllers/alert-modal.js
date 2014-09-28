'use strict';

/**
 * @ngdoc function
 * @name vividSeatsTestApp.controller:AlertModalInstanceCtrl
 * @description
 * # AlertModalInstanceCtrl
 * Controller of the vividSeatsTestApp
 */
angular.module('vividSeatsTestApp')
    .controller('AlertModalInstanceCtrl', function ($scope, $modalInstance, alertTitle, alertMessage) {
        $scope.alertTitle = alertTitle;
        $scope.alertMessage = alertMessage;

        $scope.ok = function() {
            $modalInstance.close();
        };
    });