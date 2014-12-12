angular.module('ui')
  .directive('popupAutohideOpener', function(PopupService, $timeout) {
    'use strict';

    return {
      restrict: 'A',
      controller: function($scope, $element, $attrs) {
        var active = false,
          name = $attrs.popupAutohideOpener,
          closingTimer;

        $element.on('click', function() {
          var popup = PopupService.get(name);

          PopupService.show(name);

          if (!active) {
            active = true;

            popup.element.on('mouseleave', startCountdown);
            popup.element.on('mouseenter', stopCountdown);
          }

          $scope.$apply();
        });

        function startCountdown() {
          closingTimer = $timeout(function() {
            PopupService.hide(name);
          }, 2000);
        }

        function stopCountdown() {
          $timeout.cancel(closingTimer);
        }
      }
    };
  });