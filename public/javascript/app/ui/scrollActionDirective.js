angular.module('ui')
  .directive('scrollAction', function($window) {
    'use strict';

    return {
      restrict: 'A',
      scope: {
        action: '&scrollAction',
        isBusy: '=scrollActionIsBusy'
      },

      link: function(scope, elem, attrs) {
        var $win = angular.element($window);

        scope.stopped = false;

        $win.on('scroll', onScrollCallback);

        function onScrollCallback() {
          if (checkPosition() && !scope.isBusy) {
            scope.action();
          }
        }

        // Check if we should paginate
        function checkPosition() {
          var containerBottom,
            elementBottom,
            remaining;

          containerBottom = $win.height() + $win.scrollTop();
          elementBottom = elem.offset().top + elem.height();
          remaining = elementBottom - containerBottom;

          return remaining <= 0;
        }
      }
    };
  });