(function() {
  'use strict';

  //we need to use extra function to work with cookies
  //because at that moment we don't have Angular cookie service ready
  function getCookie(name) {
    var matches = window.document.cookie.match(new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'));

    return matches ? decodeURIComponent(matches[1]) : undefined;
  }

  angular.module('admin').config(function(RestangularProvider) {
    var endPoint = 'https://api.studytube-staging.nl/admin-api/';

    if (getCookie('debug-mock-api') === 'localhost') {
      endPoint = 'http://studieplan.lvh.me:3000/api';
    }

    RestangularProvider
      .setBaseUrl(endPoint)
      .setMethodOverriders(['put', 'patch', 'delete']);
  });

  angular.module('admin')
    .constant('URLS', {
      openAcademy: 'https://www.studytube-staging.nl'
    });

  angular.module('admin')
    .constant('DOMAIN', 'lvh.me')
    .constant('AUTH_URLS', {
      api: 'https://api.studytube-staging.nl/sessions',
      login: 'http://academy.lvh.me:3001/login',
      logout: 'http://academy.lvh.me:3001/logout'
    });

  angular.module('admin')
    .constant('MANAGE_COURSE_URL', 'https://academy.studytube-staging.nl/backend/course/{id}#/create')
    .constant('ACADEMY_COURSE_URL', 'https://www.studytube-staging.nl/courses/{id}');

})();