app.controller('HomeCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, $http, $state, ionicMaterialInk, $rootScope, $ionicPopup, API_URL) {

	// Set Header
	$scope.$parent.showHeader();
	$scope.$parent.clearFabs();
	$scope.hasFab = false;
	$scope.isExpanded = false;
	$scope.$parent.setExpanded(false);
	$scope.$parent.setHeaderFab(false);

	var reset = function() {
		var inClass = document.querySelectorAll('.in');
		for (var i = 0; i < inClass.length; i++) {
			inClass[i].classList.remove('in');
			inClass[i].removeAttribute('style');
		}
		var done = document.querySelectorAll('.done');
		for (var i = 0; i < done.length; i++) {
			done[i].classList.remove('done');
			done[i].removeAttribute('style');
		}
		var ionList = document.getElementsByTagName('ion-list');
		for (var i = 0; i < ionList.length; i++) {
			var toRemove = ionList[i].className;
			if (/animate-/.test(toRemove)) {
				ionList[i].className = ionList[i].className.replace(/(?:^|\s)animate-\S*(?:$|\s)/, '');
			}
		}
	};

	$scope.blinds = function() {
		reset();
		document.getElementsByTagName('ion-list')[0].className += ' animate-blinds';
		setTimeout(function() {
			ionicMaterialMotion.blinds(); // ionic.material.motion.blinds(); //ionicMaterialMotion
		}, 500);
	};

	// $scope.doRefresh = function() {
	// 	//  var trainerId = localStorage.getItem("trainer_id");
	// 	$http.get('http://84.200.53.77/getEventsBasedOnTenses?status_time_period=current_events').success(function(data) {
	// 		var currentEvent = angular.fromJson(data);
	// 		$scope.todayEvents = currentEvent.data;
	// 		console.log($scope.todayEvents);
	// 		$scope.showList = true;
	// 		$scope.blinds();
	// 	}).finally(function() {
	// 		// Stop the ion-refresher from spinning
	// 		$scope.$broadcast('scroll.refreshComplete');
	// 	});
	// };
	//
	// //  var trainerId = localStorage.getItem("trainer_id");
	// $http.get('http://84.200.53.77/getEventsBasedOnTenses?status_time_period=current_events').success(function(data) {
	// 	var currentEvent = angular.fromJson(data);
	// 	$scope.todayEvents = currentEvent.data;
	// 	console.log($scope.todayEvents);
	// 	$scope.showList = true;
	// 	$scope.blinds();
	// });
	//
	// $scope.openSignin = function($eventId) {
	// 	localStorage.setItem("event_id", $eventId);
	// 	$state.go("app.SignInEvent");
	// };

	$scope.doRefresh = function() {
	  var trainerId = localStorage.getItem("trainer_id");
		$http.get('http://84.200.53.77/getSessionCurrentDate?trainer_id='+trainerId).success(function(data){
	     var currentEvent = angular.fromJson(data);
				$scope.todayEvents = currentEvent.data;
				console.log($scope.todayEvents);
				$scope.showList = true;
				$scope.blinds();
		}).finally(function() {
		 // Stop the ion-refresher from spinning
		 $scope.$broadcast('scroll.refreshComplete');
	 });
	};

 var trainerId = localStorage.getItem("trainer_id");
	$http.get('http://84.200.53.77/getSessionCurrentDate?trainer_id='+trainerId).success(function(data){
		  //console.log("ad" + data.date);
			var currentEvent = angular.fromJson(data);
			$scope.todayEvents = currentEvent.data;
			console.log($scope.todayEvents);
			$scope.date = new Date();
			// $scope.date = $moment().format('yyyy-MM-dd');
			$scope.showList = true;
			$scope.blinds();
	});



	$scope.openSignin = function ($eventId,$sessionId,status,$session_event_person_id) {
		localStorage.setItem("event_id", $eventId);
		//localStorage.setItem("trainer_id", $trainerId);
		localStorage.setItem("session_id", $sessionId);
		localStorage.setItem("session_event_person_id", $session_event_person_id);

		if(status == "S") $state.go("app.SignOutEvent");
		else if (status == "Y") $state.go("app.AssignedEvents");
		else	$state.go("app.SignInEvent");

	};


// 	function goToFunction(item){
//    if(item.condition == disable){
//       return false;
//    }
//    else {
//
//
//        }
// }



// $scope.Ctrl = function () {
// 	$scope.datee = new Date();
// }




});
