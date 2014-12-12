angular.module('selectifier')
  .directive('selectifier', function($q, SelectifierService) {
    'use strict';

    return {
      scope: {
        config: '='
      },
      restrict: 'E',
      replace: true,
      templateUrl: 'selectifier/views/selectifier.html',

      controller: function($scope, $timeout) {
// initialization
        var MIN_LENGTH = 1;

        $scope.query = '';
        $scope.selectedItems = $scope.config.results;

        hideSuggestions();

        angular.forEach(SelectifierService.getPreselectedItems($scope.config), function(item) {
          $scope.selectedItems.push(item);
        });

// event handlers

        $scope.handleChangeEvent = function() {
          if (MIN_LENGTH > $scope.query.length) {
            hideSuggestions();

            return;
          }

          SelectifierService.findSuggestions($scope.query, $scope.config)
            .then(function(suggestions) {
              $scope.suggestions = suggestions.filter(function(suggestion) {
                return !isInSelected(suggestion.value, suggestion.type);
              });

              if ($scope.suggestions.length) {
                showSuggestions();
              } else {
                hideSuggestions();
              }
            });
        };

        $scope.handlePasteEvent = function() {
          if ($scope.config.options.email) {
            $timeout(takeEmailsFromQuery);
          }
        };

        $scope.handleBlurEvent = function() {
          $timeout(hideSuggestions, 200);
        };

        $scope.handleKeyDown = function($event) {
          switch ($event.keyCode) {
            case 8: // backspase
              handleBackspaceKey();
              break;

            case 9: // tab
            case 13: // enter
              $event.preventDefault();
              handleEnterKey();
              break;

            case 27: // esc
              handleEscKey();
              break;

            case 38: // up
              handleUpKey();
              break;

            case 40: // down
              handleDownKey();
              break;
          }
        };

// keyboard handlers

        function handleUpKey() {
          if ($scope.suggestionsAreVisible) {
            highlightPrevious();
          }
        }

        function handleDownKey() {
          if ($scope.suggestionsAreVisible) {
            highlightNext();
          }
        }

        function handleEscKey() {
          hideSuggestions();
        }

        function handleBackspaceKey() {
          if (0 === $scope.query.length) {
            removeFromSelected($scope.selectedItems[$scope.selectedItems.length - 1]);
          }
        }

        function handleEnterKey() {
          if ($scope.currentSuggestion) {
            addToSelected($scope.currentSuggestion.value, $scope.currentSuggestion.type);

            hideSuggestions();

            $scope.query = '';
          } else if ($scope.config.options.email) {
            takeEmailsFromQuery();
          }
        }

        function takeEmailsFromQuery() {
          var emails = SelectifierService.parseForEmails($scope.query);

          if (!emails.length) {
            return;
          }

          angular.forEach(emails, function(email) {
            if ($scope.config.options.validateEmail) {
              $scope.config.options.validateEmail(email)
                .then(function() {
                  addToSelected(email, 'email');
                });
            } else {
              addToSelected(email, 'email');
            }
          });

          $scope.query = '';
        }

// template functions

        $scope.getSuggestionTemplate = function(item) {
          return $scope.config.suggestions[item.type].templates.suggestion;
        };

        $scope.getSelectionTemplate = function() {
          return $scope.config.templates.selection;
        };

        $scope.getItemTemplate = function(item) {
          if ('email' === item.type) {
            return $scope.config.templates.email;
          }

          return $scope.config.suggestions[item.type].templates.selection;
        };

// scope methods

        $scope.highlightSuggestion = function(item) {
          $scope.currentSuggestion = item;
        };

        $scope.selectSuggestion = function(suggestion) {
          addToSelected(suggestion.value, suggestion.type);

          $scope.query = '';

          hideSuggestions();
        };

        $scope.removeItem = function(item) {
          removeFromSelected(item);
        };

        $scope.addEmail = function() {
          handleEnterKey();
        };

        $scope.isValidEmail = function(query) {
          return SelectifierService.validateEmail(query);
        };

// suggestion functions

        function showSuggestions() {
          $scope.suggestionsAreVisible = true;
          $scope.currentSuggestion = $scope.suggestions[0];
        }

        function hideSuggestions() {
          $scope.suggestions = [];
          $scope.currentSuggestion = null;
          $scope.suggestionsAreVisible = false;
        }

        function highlightNext() {
          var index = $scope.suggestions.indexOf($scope.currentSuggestion);

          if (index === $scope.suggestions.length - 1) {
            return;
          }

          $scope.currentSuggestion = $scope.suggestions[index + 1];
        }

        function highlightPrevious() {
          var index = $scope.suggestions.indexOf($scope.currentSuggestion);

          if (index === 0) {
            return;
          }

          $scope.currentSuggestion = $scope.suggestions[index - 1];
        }

// selectedItems functions

        function addToSelected(value, type) {
          if (!isInSelected(value, type)) {
            $scope.selectedItems.push(SelectifierService.createSelectedItem(value, type));
          }
        }

        function removeFromSelected(item) {
          var index = $scope.selectedItems.indexOf(item);

          if (-1 !== index) {
            $scope.selectedItems.splice(index, 1);
          }
        }

        function isInSelected(value, type) {
          return $scope.selectedItems.some(function(item) {
            return item.value === value && item.type === type;
          });
        }
      }
    };
  });