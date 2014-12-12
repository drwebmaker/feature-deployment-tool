angular.module('ui')
  .directive('popupModalOpener', function(PopupService) {
    'use strict';

    return {
      restrict: 'A',
      controller: function($scope, $element, $attrs) {
        $element.on('click', function() {
          PopupService.show($attrs.popupModalOpener, true);
          $scope.$apply();
        });
      }
    };
  });