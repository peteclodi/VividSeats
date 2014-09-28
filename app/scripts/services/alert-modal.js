'use strict';

/**
 * @ngdoc function
 * @name vividSeatsTestApp.service:AlertModal
 * @description
 * # AlertModal
 * Service of the vividSeatsTestApp
 */
angular.module('vividSeatsTestApp')
    .factory('AlertModal', function ($modal) {
        var alertModal = {
            open: function(alertTitle, alertMessage) {
                alertModal.alertModalInstance = $modal.open({
                    templateUrl: 'views/alert-modal.html',
                    controller: 'AlertModalInstanceCtrl',
                    resolve: {
                        alertTitle: function() {
                            return alertTitle;
                        },
                        alertMessage: function() {
                            return alertMessage;
                        }
                    }
                });
            }
        };

        return alertModal;
    });