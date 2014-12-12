(function() {
  'use strict';

  angular.module('admin').config(function(RestangularProvider) {
    RestangularProvider
      .setBaseUrl('https://api.studytube.nl/admin-api/')
      .setMethodOverriders(['put', 'patch', 'delete']);
  });

  angular.module('admin')
    .constant('URLS', {
      openAcademy: 'https://www.studytube.nl'
    });

  angular.module('auth')
    .constant('DOMAIN', 'studytube.nl')
    .constant('AUTH_URLS', {
      api: 'https://api.studytube.nl/sessions',
      login: 'https://www.studytube.nl/login',
      logout: 'https://www.studytube.nl/logout'
    });

  angular.module('course')
    .constant('MANAGE_COURSE_URL', 'https://academy.studytube.nl/backend/course/{id}#/create')
    .constant('ACADEMY_COURSE_URL', 'https://www.studytube.nl/courses/{id}');

})();

