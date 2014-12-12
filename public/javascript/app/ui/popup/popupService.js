angular.module('ui')
  .service('PopupService', function() {
    'use strict';

    var self = this,
      container = {
        popups: {},
        hasModal: false
      };

    this.getPopupContainer = function() {
      return container;
    };

    this.get = function(name) {
      return container.popups[name];
    };

    this.show = function(name, modal) {
      check(name);

      container.popups[name].visible = true;

      if (modal) {
        container.popups[name].modal = true;
        container.hasModal = true;
      } else {
        container.popups[name].justOpened = true;
      }
    };

    this.hide = function(name) {
      check(name);

      container.popups[name].visible = false;
      container.popups[name].justOpened = false;

      if (container.popups[name].modal) {
        container.popups[name].modal = false;
        container.hasModal = false;
      }
    };

    this.hideAll = function() {
      angular.forEach(container.popups, function(status, name) {
        self.hide(name);
      });
    };

    this.toggle = function(name) {
      check(name);

      if (container.popups[name].visible) {
        self.hide(name);
      } else {
        self.show(name);
      }
    };

    this.createPopup = function(name, element) {
      container.popups[name] = {
        element: element,
        justOpened: false,
        visible: false
      };
    };

    function check(name) {
      if (!container.popups[name]) {
        throw new Error(name + ' popup does not exist!');
      }
    }
  });