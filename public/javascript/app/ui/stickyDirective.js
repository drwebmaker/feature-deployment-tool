angular.module('ui')
  .directive('sticky', function($window) {
    'use strict';

    return function($scope, element) {
      var  elementPos,
           $win = angular.element($window);

      $win.bind('scroll', function() {
        var windowPos = $win.scrollTop();
        elementPos = elementPos || element.offset().top;

        if (windowPos > elementPos) {
          element.addClass('is-stuck');
        } else {
          element.removeClass('is-stuck');
        }
      });

      recheckPositions();
      $win.bind('resize', recheckPositions);

      function recheckPositions() {
        element.width( element.parent().width() );
      }
    };
  });