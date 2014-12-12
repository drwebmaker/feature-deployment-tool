angular.module('ui')
  .directive('popupWindow', function(PopupService) {
    'use strict';

    return {
      restrict: 'A',
      controller: function($scope, $element, $attrs) {
        PopupService.createPopup($attrs.popupWindow, $element);
      }
    };
  });