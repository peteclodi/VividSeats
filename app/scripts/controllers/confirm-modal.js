'use strict';

/**
 * @ngdoc function
 * @name vividSeatsTestApp.controller:ConfirmationModalInstanceCtrl
 * @description
 * # ConfirmationModalInstanceCtrl
 * Controller of the vividSeatsTestApp
 */
angular.module('vividSeatsTestApp')
    .controller('ConfirmationModalInstanceCtrl', function ($scope, $modalInstance, confirmationTitle, confirmationQuestion) {
        $scope.confirmationTitle = confirmationTitle;
        $scope.confirmationQuestion = confirmationQuestion;

        $scope.yes = function() {
            $modalInstance.close();
        };
        $scope.no = function() {
            $modalInstance.dismiss('cancel');
        };
    });