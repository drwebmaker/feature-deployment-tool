angular.module('ui')
  .factory('PaginationService', function() {
    'use strict';

    var Paginator = function() {
      this.paginationBusy = false;
      this.nextPage = 1;
      this.itemsPerPage = 3;
      this.collection = [];
      this.cachedItems = [];
      this.customRequestParams = {};
      this.paginationFinished = false;
      this.dataService = null;
      this.prePushAction = null;

      this.stopAtNthPage = null;
      this.stopped = false;

      this.setPrePushAction = function(fn) {
        if (typeof fn === 'function') {
          this.prePushAction = fn;
        }

        return this;
      };

      this.setCollection = function(newCollection) {
        this.collection = newCollection;

        return this;
      };

      this.setDataService = function(service) {
        this.dataService = service;

        return this;
      };

      this.setNthPageToStop = function(nthPage) {
        this.stopAtNthPage = nthPage;

        return this;
      };

      this.setItemsPerPage = function(perPage) {
        this.itemsPerPage = perPage;

        return this;
      };
    };

    Paginator.prototype.loadNextPage = function() {
      var self = this,
        requestParams;

      if (!self.paginationFinished && !self.stopped) {
        self.paginationBusy = true;

        // Compose request params
        requestParams = {
          page: self.nextPage,
          perPage: self.itemsPerPage
        };

        angular.forEach(self.customRequestParams, function(param, key) {
          if (param) {
            requestParams[key] = param;
          }
        });

        self.dataService.getAll(requestParams)
          .then(function(items) {
            if (items.length === 0) {
              self.paginationFinished = true;

              return;
            }

            if (self.prePushAction) {
              self.prePushAction(items);
            }

            if (self.stopAtNthPage && self.nextPage % self.stopAtNthPage === 0) {
              self.cachedItems = items;
              self.stopped = true;
            } else {
              angular.forEach(items, function(fetchedItem) {
                self.collection.push(fetchedItem);
              });
            }

            self.nextPage += 1;
          })
          .then(function() {
            self.paginationBusy = false;
          });
      }
    };

    Paginator.prototype.resetPagination = function(params) {
      var self = this;

      this.collection.splice(0, this.collection.length);
      this.nextPage = 1;
      params = params || {};
      self.customRequestParams = {};

      angular.forEach(params, function(param, key) {
        self.customRequestParams[key] = param;
      });

      this.paginationFinished = false;
      this.stopped = false;

      this.loadNextPage();
    };

    Paginator.prototype.continuePagination = function() {
      var self = this;

      angular.forEach(self.cachedItems, function(cachedItem) {
        self.collection.push(cachedItem);
      });
      self.stopped = false;
    };

    return Paginator;
  });
