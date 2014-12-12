angular.module('ui').
  directive('filePreview', function(FileReader) {
    return {
      restrict: 'A',
      link: function($scope) {
        $scope.$watch('newImage', function(filePreview) {
          if (filePreview && Object.keys(filePreview).length !== 0) {
            FileReader.readAsDataUrl(filePreview).then(function(result) {
              $scope.imagePreview = result;
            });
          }
        });
      }
    };
  });