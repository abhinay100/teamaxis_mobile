app.controller('AttendenceCtrl', function($scope, $ionicPopup, $stateParams, ionicMaterialMotion, $http, $state, $rootScope, $ionicPopup, API_URL) {

//$scope.data = {};

  $scope.Atendencelog = function() {

 // var feedback = $scope.data.feedback ;
 // console.log("feedback user: " + feedback );
 var sessionId=localStorage.getItem("session_id");
 var session_event_person_id = localStorage.getItem("session_event_person_id");
 $ionicPopup.alert({
     title: 'Attendance successful',
     template: 'Your attendance successfully updated'
 });
  $http.get('http://84.200.53.77/api/v1/insert_attendance?session_event_person_id='+session_event_person_id+'&&session_id='+sessionId+'&&feed_back='+feedback).success(function(data){

    console.log("feedback user: " + data);

   $state.go("app.Home");
      // $scope.showList = true;
      // $scope.blinds();
  });
};

$scope.AttendenceEvent = function() {

var sessionId=localStorage.getItem("session_id");
$http.get('http://84.200.53.77/getSessionDetailOnSessionID/'+sessionId).success(function(data){
   console.log(data);
    var pastData = angular.fromJson(data);
    $scope.AttendenceEvents = pastData.data;
    console.log($scope.AttendenceEvents);

});
};
$scope.AttendenceEvent();
});
