angular.module('ui')
  .filter('percentage', function() {
    return function(decimal) {
      return Math.round(decimal * 100) + '%';
    };
  });