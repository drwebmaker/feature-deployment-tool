(function() {
  'use strict';

  angular.module('admin').config(function (RestangularProvider) {
    RestangularProvider
      .setBaseUrl('https://api.studytube-staging.nl/admin-api/')
      .setMethodOverriders(['put', 'patch', 'delete']);
  });

  angular.module('admin')
    .constant('URLS', {
      openAcademy: 'https://www.studytube-staging.nl'
    });

  angular.module('auth')
    .constant('DOMAIN', 'studytube-staging.nl')
    .constant('AUTH_URLS', {
      api: 'https://api.studytube-staging.nl/sessions',
      login: 'https://www.studytube-staging.nl/login',
      logout: 'https://www.studytube-staging.nl/logout'
    });

  angular.module('course')
    .constant('MANAGE_COURSE_URL', 'https://academy.studytube-staging.nl/backend/course/{id}#/create')
    .constant('ACADEMY_COURSE_URL', 'https://www.studytube-staging.nl/courses/{id}');

})();