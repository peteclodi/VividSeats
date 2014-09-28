'use strict';

/**
 * @ngdoc function
 * @name vividSeatsTestApp.service:EventActions
 * @description
 * # EventActions
 * Service of the vividSeatsTestApp
 */
angular.module('vividSeatsTestApp')
    .factory('EventActions', function ($modal, AlertModal) {
        var eventActions = {
            edit: function(eventToEdit, successCallback) {
                var modalInstance = $modal.open({
                    templateUrl: 'views/edit-modal.html',
                    controller: 'EditModalInstanceCtrl',
                    resolve: {
                        event: function() {
                            return eventToEdit;
                        }
                    }
                });

                modalInstance.result.then(function (updatedEvent) {
                    VividSeats.eventService.update(updatedEvent,
                        function() {
                            if(angular.isDefined(successCallback)) {
                                successCallback();
                            }
                        },
                        function(errorMsg) {
                            AlertModal.open('Error Updating Event', errorMsg);
                        }
                    );
                }, function() {});
            },
            remove: function(eventToRemove, successCallback) {
                var modalInstance = $modal.open({
                    templateUrl: 'views/confirm-modal.html',
                    controller: 'ConfirmationModalInstanceCtrl',
                    resolve: {
                        confirmationTitle: function() {
                            return 'Remove Event';
                        },
                        confirmationQuestion: function() {
                            return '<span class="text-center">Are you sure that you want to remove the event:<br><b>' + eventToRemove.name + '</b>?</span>';
                        }
                    }
                });

                modalInstance.result.then(function () {
                    VividSeats.eventService.remove(eventToRemove,
                        function() {
                            if(angular.isDefined(successCallback)) {
                                successCallback();
                            }
                        },
                        function(errorMsg) {
                            AlertModal.open('Error Removing Event', errorMsg);
                        }
                    );
                }, function() {});
            }
        };

        return eventActions;
    });