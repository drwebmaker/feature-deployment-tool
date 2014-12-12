angular.module('ui')
  .directive('popupOpener', function(PopupService) {
    'use strict';

    return {
      restrict: 'A',
      controller: function($scope, $element, $attrs) {
        $element.on('click', function() {
          PopupService.show($attrs.popupOpener);
          $scope.$apply();
        });
      }
    };
  });