angular.module('ui')
  .directive('popupContainer', function($document, PopupService) {
    'use strict';

    return {
      restrict: 'A',
      controller: function($scope, $element) {
        $scope.popupContainer = PopupService.getPopupContainer();

        $scope.isPopupVisible = function(name) {
          var popup = PopupService.get(name);

          return popup && popup.visible;
        };

        $element.on('click', function(event) {
          angular.forEach($scope.popupContainer.popups, function(popup) {
            if (!popup.visible) {
              return;
            }

            if (popup.modal) {
              return;
            }

            if (popup.justOpened) {
              popup.justOpened = false;

              return;
            }

            if (contain(popup.element[0], event.target)) {
              return;
            }

            popup.visible = false;
          });

          $scope.$apply();
        });

        $document.on('keydown', function(event) {
          if (event.keyCode === 27) {
            PopupService.hideAll();
            $scope.$apply();
          }
        });
      }
    };

    function contain(container, element) {
      while (element) {
        if (element === container) {
          return true;
        }

        element = element.parentNode;
      }
    }
  });