angular.module('ui')
  .directive('popupToggler', function(PopupService) {
    'use strict';

    return {
      restrict: 'A',
      controller: function($scope, $element, $attrs) {
        $element.on('click', function() {
          PopupService.toggle($attrs.popupToggler);
          $scope.$apply();
        });
      }
    };
  });