(function(window){
  'use strict';

  var app = angular.module('admin', ['ui.router', 'ngAnimate', 'ngSanitize', 'ngBiscuit', 'mgcrea.ngStrap', 'app-templates', 'restangular', 'angular-growl', 'ui', 'selectifier']);

  app.config(function($locationProvider, $stateProvider, $tooltipProvider, $typeaheadProvider, $urlRouterProvider, growlProvider, RestangularProvider) {
    RestangularProvider.setDefaultHeaders({ 'X-Academy-ID': 1 });

    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('');
    growlProvider.globalTimeToLive(3000);

    angular.extend($tooltipProvider.defaults, {
      container: 'body',
      trigger: 'hover',
      placement: 'bottom',
      delay: {
        show: 500,
        hide: 100
      }
    });

    angular.extend($typeaheadProvider.defaults, {
      minLength: 2,
      limit: 5,
      html: 1
    });

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'admin/views/private-layout.html'
      });
  });

  app.value('settings', {
    debug: {
      grid: false
    }
  });

  app.run(function(cookieStore, settings) {
    settings.debug.grid = cookieStore.get('LndGrid');
  });

  window.app = app;
})(window);