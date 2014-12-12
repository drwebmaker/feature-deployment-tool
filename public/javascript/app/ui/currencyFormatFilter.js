angular.module('ui')
  .filter('currencyFormat', function(numberFilter) {
    return function(price, fractionSize, currencySymbol) {
      var currencyStr,
        fraction = fractionSize || 0,
        currency = currencySymbol || '€';

      currencyStr = currency + numberFilter(price, fraction);

      return currencyStr;
    };
  });