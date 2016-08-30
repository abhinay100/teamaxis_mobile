app.controller('SignInCtrl', function($scope, $controller,$ionicPopup, $stateParams, ionicMaterialMotion, $http, $state, $rootScope, $ionicPopup, API_URL,$filter) {


var locationAddress="";
var action_item="";
$scope.data = {};
//cordova.plugins.diagnostic.switchToLocationSettings();
	var trainerId = localStorage.getItem("trainer_id");
	var eventId   = localStorage.getItem("event_id");
	var sessionId = localStorage.getItem("session_id");
			var onSuccess = function(position) {


// Will display time in 10:30:23 format
// var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
				var fecthedLatitude=position.coords.latitude;
				var fecthedLongitude=position.coords.longitude;
				var timeStamp=position.timestamp;
				currentLocationSigningIn(fecthedLatitude,fecthedLongitude,timeStamp)
			};
    function onError(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    }



	$http.get('http://84.200.53.77/getEventsBasedOnTenses?status_time_period=current_events').success(function(data) {
		var currentEvent = angular.fromJson(data);


		$scope.signinEvents = currentEvent.data;



		//  $scope.showList = true;
		//  $scope.blinds();
	});


	$scope.LoginStatus = function(action) {
		action_item=action;
		navigator.geolocation.getCurrentPosition(onSuccess, onError);

	};

	function currentLocationSigningIn(fecthedLatitude,fecthedLongitude,timeStamp)
	{
		locationAddress="https://maps.googleapis.com/maps/api/geocode/json?latlng="+fecthedLatitude+","+fecthedLongitude+"&key=AIzaSyB0HddSjdAk88Ddi07uQMRVeTvlkl0lZNs";
				$http.get(locationAddress).success(function(data){

							if(action_item =='sign_in')
							{
									var title_action='You are signing in from the current location';
							}
							else
							{
									var title_action='You are signing out from the current location';
							}
							var confirmPopup = $ionicPopup.confirm({
								title: title_action,
								template: data.results[0].formatted_address
							});

							confirmPopup.then(function(res) {
										if (res)
										{
  												var session_event_person_id = localStorage.getItem("session_event_person_id");
													switch(action_item)
													{
															  case 'sign_in' :
															//	var session_event_person_id = localStorage.getItem("session_event_person_id");
																$http.get('http://84.200.53.77/api/v1/insertSignInDetails?trainer_id='+trainerId+'&&session_id='+sessionId+'&&event_id='+eventId+'&&signed_in_latitude='+fecthedLatitude+'&&signed_in_longitude='+fecthedLongitude+'&&signed_in_timestamp='+timeStamp+'&&session_event_person_id='+session_event_person_id).success(function(data) {
																console.log(data);

															//	localStorage.setItem("session_event_person_id", data.session_event_person_id);
										            //$state.go("app.SignOutEvent");

																$state.go("app.Home");
																});
																break;

																case 'sign_out' :
															//	var session_event_person_id = localStorage.getItem("session_event_person_id");
																$http.get('http://84.200.53.77/api/v1/insertSignOutDetails?session_event_person_id='+session_event_person_id+'&&session_id='+sessionId+'&&signed_out_latitude='+fecthedLatitude+'&&signed_out_longitude='+fecthedLongitude+'&&signed_out_timestamp='+timeStamp).success(function(data) {
															  $scope.Atendencelog ();
																$state.go("app.Home");//$state.go("app.AttendenceEvent");
																});
																break;
													}

										}
										else
										{
												console.log('You are not sure');
										}
							});
				});


	}



	$scope.EventSignIn = function() {
//	alert(sessionId);
	$http.get('http://84.200.53.77/getSessionDetailOnSessionID/'+sessionId).success(function(data){
	   console.log(data);

	    var pastData = angular.fromJson(data);
			console.log("User = " + JSON.stringify(data));
	    $scope.AttendenceEvents = pastData.data;
			var day = pastData.data[0].date;
			$scope.eventDate = day;
			console.log("today = " + $scope.eventDate);
			$scope.result = $filter('date')(new Date(), 'yyyy-MM-dd');
			console.log("value = " + $scope.result);
			$scope.value = angular.equals($scope.eventDate, $scope.result);
			console.log("result = " + $scope.value);

	});
	};

	$scope.Atendencelog = function() {
var feedback = $scope.data.feedback ;
  console.log("feedback user: "+feedback);
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







	$scope.EventSignIn();



// 	function onRequestSuccess(success){
//     console.log("Successfully requested accuracy: "+success.message);
// }
//
// function onRequestFailure(error){
//     console.error("Accuracy request failed: error code="+error.code+"; error message="+error.message);
//     if(error.code !== cordova.plugins.locationAccuracy.ERROR_USER_DISAGREED){
//         if(window.confirm("Failed to automatically set Location Mode to 'High Accuracy'. Would you like to switch to the Location Settings page and do this manually?")){
//             cordova.plugins.diagnostic.switchToLocationSettings();
//         }
//     }
// }
//
// cordova.plugins.locationAccuracy.request(onRequestSuccess, onRequestFailure, cordova.plugins.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY);

// if (window.cordova) {
//     cordova.plugins.diagnostic.isLocationEnabled(function(enabled) {
//         alert("Location is " + (enabled ? "enabled" : "disabled"));
//     }, function(error) {
//         alert("The following error occurred: " + error);
//     });
// }
//
// if (window.cordova) {
//     cordova.plugins.diagnostic.switchToLocationSettings();
// }






});
