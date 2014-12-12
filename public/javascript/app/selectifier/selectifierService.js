angular.module('selectifier')
  .service('SelectifierService', function($q) {
    var self = this,
      BASE_EMAIL_PATTERN = /(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;

    this.createSelectedItem = function(value, type) {
      return new SelectedItem(value, type);
    };

    this.createSuggestionConfig = function(collection, preselectedItems, filterFields, templates) {
      var templateObject = templates,
        collectionPromise = $q.when(collection);

      if ('string' === typeof templates) {
        templateObject = {
          suggestion: templates,
          selection: templates
        };
      }

      return new SuggestionConfig(collectionPromise, preselectedItems, filterFields, templateObject);
    };

    this.createSelectifierConfig = function(suggestions, results, sentOptions, emailTemplate, selectionTemplate) {
      var options = sentOptions || {},
        templates = {
          email: emailTemplate || 'selectifier/views/selected-email.html',
          selection: selectionTemplate || 'selectifier/views/selection.html'
        };

      options.email = options.email || false;
      options.validateEmail = options.validateEmail || false;
      options.placeholder = options.placeholder || '';

      return new SelectifierConfig(suggestions, results, options, templates);
    };

    this.getPreselectedItems = function(selectifierConfig) {
      var selectedItems = [];

      angular.forEach(selectifierConfig.suggestions, function(suggestionConfig, type) {
        angular.forEach(suggestionConfig.preselectedItems, function(item) {
          selectedItems.push(new SelectedItem(item, type));
        });
      });

      return selectedItems;
    };

    this.getAllSuggestions = function(selectifierConfig) {
      var collections = {};

      angular.forEach(selectifierConfig.suggestions, function(suggestionConfig, type) {
        collections[type] = suggestionConfig.collection;
      });

      return $q.all(collections).then(function(results) {
        var suggestions = [];

        angular.forEach(results, function(collection, type) {
          angular.forEach(collection, function(item) {
            suggestions.push(new Suggestion(item, type));
          });
        });

        return suggestions;
      });
    };

    this.findSuggestions = function(query, selectifierConfig) {
      var pattern = query.toLowerCase();

      return this.getAllSuggestions(selectifierConfig).then(function(suggestions) {
        return suggestions.filter(function(suggestion) {
          return self.testItem(suggestion.value, selectifierConfig.suggestions[suggestion.type].filterFields, pattern);
        });
      });
    };

    this.testItem = function(item, filterFields, pattern) {
      var valueToSearch = '';

      angular.forEach(filterFields, function(field) {
        valueToSearch += item[field] + '\n';
      });

      return -1 !== valueToSearch.toLowerCase().indexOf(pattern);
    };

    this.validateEmail = function(email) {
      var emailPattern = new RegExp('^' + BASE_EMAIL_PATTERN.source + '$');

      return emailPattern.test(email);
    };

    this.parseForEmails = function(query) {
      var matches = [],
        emailPattern = new RegExp(BASE_EMAIL_PATTERN.source, 'g');

      query.replace(emailPattern, function(match) {
        matches.push(match);

        return '';
      });

      return matches;
    };

    // Constructors

    function Suggestion(value, type) {
      this.value = value;
      this.type = type;
    }

    function SelectedItem(value, type) {
      this.value = value;
      this.type = type;
    }

    function SuggestionConfig(collection, preselectedItems, filterFields, templates) {
      this.collection = collection;
      this.preselectedItems = preselectedItems;
      this.filterFields = filterFields;
      this.templates = templates;
    }

    function SelectifierConfig(suggestions, results, options, templates) {
      this.suggestions = suggestions;
      this.results = results;
      this.options = options;
      this.templates = templates;
    }
  });