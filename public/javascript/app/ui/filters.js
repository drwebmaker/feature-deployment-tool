angular.module('ui')
  .filter('fromNow', function() {
    return function(timestamp) {
      return moment(timestamp).fromNow();
    };
  })
  .filter('html', function($sce) {
    return function(text) {
      return $sce.trustAsHtml(text);
    };
  })
  .filter('truncate', function() {
    return function(text, length, suffix) {
      if (text.length > length) {
        return text.slice(0, length - suffix.length) + suffix;
      }

      return text;
    };
  });