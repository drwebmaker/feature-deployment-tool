angular.module('ui')
  .directive('popupCloser', function(PopupService) {
    'use strict';

    return {
      restrict: 'A',
      controller: function($scope, $element, $attrs) {
        $element.on('click', function() {
          PopupService.hide($attrs.popupCloser);
          $scope.$apply();
        });
      }
    };
  });