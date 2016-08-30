app.controller('EditCtrl', function ($scope, $stateParams, ionicMaterialMotion, $http, $state, Upload, $timeout, $ionicPopup,$ionicHistory) {

  var trainerId = localStorage.getItem("trainer_id");
  $http.get('http://84.200.53.77/trainers/'+trainerId).success(function(data){
      var eventsData = angular.fromJson(data);
      console.log(eventsData);
      $scope.line1 = eventsData.line1;
      $scope.line2 = eventsData.line2;
      $scope.tshirt_size = eventsData.tshirt_size;
      $scope.city = eventsData.city;
      $scope.postal_code = eventsData.postal_code;
      $scope.phone_no = eventsData.phone_no;
      $scope.email = eventsData.email;
      $scope.bank = eventsData.bank;
      $scope.account_type = eventsData.account_type;
      $scope.name_as_bank_account = eventsData.name_as_bank_account;
      $scope.account_no = eventsData.account_no

});


  $scope.uploadPic = function(file) {


    var alertPopup = $ionicPopup.alert({
        title: 'Updated successfully',
        template: 'Your profile has been successfully updated'
    });

  $ionicHistory.nextViewOptions({
   disableBack: true
 });
    $state.go("app.Home");




  file.upload = Upload.upload({
 url: 'http://84.200.53.77/api/v1/changeTrainerProfileExternalSource/',
 data: {avatar: file, trainer_id:trainerId, city : $scope.city, line1:$scope.line1, line2:$scope.line2, tshirt_size:$scope.tshirt_size, city:$scope.city, postal_code:$scope.postal_code, phone_no:$scope.phone_no, email:$scope.email, bank:$scope.bank, account_type:$scope.account_type, name_as_bank_account:$scope.name_as_bank_account, account_no:$scope.account_no },



});

file.upload.then(function (response) {
 $timeout(function () {



   file.result = response.data;
   console.log(response);


 });
}, function (response) {
 if (response.status > 0)
   $scope.errorMsg = response.status + ': ' + response.data;
}, function (evt) {
 // Math.min is to fix IE which reports 200% sometimes
 file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
});




}




  });


  app.directive('myMaxlength', ['$compile', '$log', function($compile, $log) {
  		return {
  			restrict: 'A',
  			require: 'ngModel',
  			link: function (scope, elem, attrs, ctrl) {
  				attrs.$set("ngTrim", "false");
                  var maxlength = parseInt(attrs.myMaxlength, 10);
                  ctrl.$parsers.push(function (value) {
                      $log.info("In parser function value = [" + value + "].");
                      if (value.length > maxlength)
                      {
                          $log.info("The value [" + value + "] is too long!");
                          value = value.substr(0, maxlength);
                          ctrl.$setViewValue(value);
                          ctrl.$render();
                          $log.info("The value is now truncated as [" + value + "].");
                      }
                      return value;
                  });
  			}
  		};
  	}]);


    app.directive('numbersOnly', function () {
      return {
          require: 'ngModel',
          link: function (scope, element, attr, ngModelCtrl) {
              function fromUser(text) {
                  if (text) {
                      var transformedInput = text.replace(/[^0-9]/g, '');

                      if (transformedInput !== text) {
                          ngModelCtrl.$setViewValue(transformedInput);
                          ngModelCtrl.$render();
                      }
                      return transformedInput;
                  }
                  return undefined;
              }
              ngModelCtrl.$parsers.push(fromUser);
          }
      };
  });  
