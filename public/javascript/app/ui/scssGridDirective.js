angular.module('ui')
  .directive('scssGrid', function(settings){
    'use strict';

    return {
      restrict: 'E',
      template: '<div class="dev-grid" ng-show="grid"></div>',
      replace: true,
      link: function($scope) {
        $scope.grid = settings.debug.grid;
      }
    };
  });