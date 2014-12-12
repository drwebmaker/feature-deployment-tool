angular.module('ui')
  .directive('collapse', function() {
    'use strict';

    return {
      scope: {
        isCollapsed: '=collapse'
      },
      link: function($scope, element) {
        var initialHeight = element.height();

        $scope.$watch('isCollapsed', function() {
          if ($scope.isCollapsed) {
            element.height(0);
          } else {
            element.height(initialHeight);
          }
        });

        $scope.isCollapsed = true;
      }
    };
  });