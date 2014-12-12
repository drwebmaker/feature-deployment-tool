angular.module('ui')
  .directive('onEnter', function() {
    return {
      restrict: 'A',
      scope: {
        onEnterCallback: '&onEnter'
      },
      link: function(scope, element) {
        element.on('keydown', function(event) {
          if (event.which === 13) {
            scope.onEnterCallback();
          }
        });
      }
    };
  });