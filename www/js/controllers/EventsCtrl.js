app.controller('EventsCtrl', function($scope, $stateParams, ionicMaterialMotion, $http, $state, $rootScope) {

	$scope.showList = false;
//monthNames
	var monthNames = ["January", "February", "March", "April", "May", "June",
	  "July", "August", "September", "October", "November", "December"
	];

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


	$scope.ripple = function() {
		reset();
		document.getElementsByTagName('ion-list')[0].className += ' animate-ripple';
		setTimeout(function() {
			ionicMaterialMotion.ripple();
		}, 500);
	};
//blinds
	$scope.blinds = function() {
		reset();
		document.getElementsByTagName('ion-list')[0].className += ' animate-blinds';
		setTimeout(function() {
			ionicMaterialMotion.blinds(); // ionic.material.motion.blinds(); //ionicMaterialMotion
		}, 500);
	};

	'use strict';
	$scope.calendar = {};
	$scope.changeMode = function(mode) {
		$scope.calendar.mode = mode;
	};

	$scope.loadEvents = function() {
		//  $scope.calendar.eventSource = createRandomEvents();
	};

	$scope.onEventSelected = function(event) {
		console.log('Event selected:' + event.startTime + '-' + event.endTime + ',' + event.title);
	};

	$scope.onViewTitleChanged = function(title) {
		$scope.viewTitle = title;
	};

	$scope.today = function() {
		$scope.calendar.currentDate = new Date();
	};

	// $scope.getHighlightClass = function (event) {
	// 		var className = '';
	//
	// 		if (date.hasEvent) {
	// 				if (date.secondary) {
	// 						className = 'monthview-secondary-with-event';
	// 				} else {
	// 						className = 'monthview-primary-with-event';
	// 				}
	// 		}
	//
	// 		if (date.selected) {
	// 				if (className) {
	// 						className += ' ';
	// 				}
	// 				className += 'monthview-selected';
	// 		}
	//
	// 		if (date.current) {
	// 				if (className) {
	// 						className += ' ';
	// 				}
	// 				className += 'monthview-current';
	// 		}
	//
	// 		if (date.secondary) {
	// 				if (className) {
	// 						className += ' ';
	// 				}
	// 				className += 'text-muted';
	// 		}
	// 		return className;
	// };




	$scope.isToday = function() {
		var today = new Date(),
			currentCalendarDate = new Date($scope.calendar.currentDate);

		today.setHours(0, 0, 0, 0);
		currentCalendarDate.setHours(0, 0, 0, 0);
		return today.getTime() === currentCalendarDate.getTime();
	};

	$scope.onTimeSelected = function(selectedTime) {
		getDateBasedSessionDetail(selectedTime);
	};


	// $scope.loadEvents = function () {
	//   $scope.calendar.eventSource = createRandomEvents();
	//         };
	// if (window.cordova) {
	//     cordova.plugins.diagnostic.isLocationEnabled(function(enabled) {
	//         alert("Location is " + (enabled ? "enabled" : "disabled"));
	//     }, function(error) {
	//         alert("The following error occurred: " + error);
	//     });
	// }


// 	cordova.plugins.diagnostic.isLocationAuthorized(function(enabled){
//     console.log("Location authorization is " + (enabled ? "enabled" : "disabled"));
// }, function(error){
//     console.error("The following error occurred: "+error);
// });


	//Displaying events based on date



	function getDateBasedSessionDetail(selectedTime) {
		$scope.calEvents = [];
    var trainerId = localStorage.getItem("trainer_id");
		var selected_date = selectedTime.getFullYear() + '-' + (selectedTime.getMonth() + 1) + '-' + selectedTime.getDate();
		$http.get('http://84.200.53.77/getDateBasedSessionDetail?session_date=' + selected_date+'&trainer_id='+trainerId ).success(function(data) {
      $(".event-detail-container table").hide();
			var calendarEvent = angular.fromJson(data);
			$scope.calEvents = calendarEvent.data;
			console.log($scope.calEvents);
			$scope.showList = true;
			$scope.blinds();
		});
		$http.get('http://84.200.53.77/getAllSessionDetailForPersonDatewise?trainer_id='+trainerId ).success(function(data) {

	     var calendarEvent = angular.fromJson(data).data;
	     $scope.calendar.eventSource = populateIndicatorOnTHeEventDates(calendarEvent);
			 });

	}

	

	function populateIndicatorOnTHeEventDates(calendarEvent) {
	      var events = [];
	        for (var i = 0; i < calendarEvent.length; i += 1) {
	          var date = new Date(calendarEvent[i].date);
	          var startDay = 0;//Math.floor(Math.random() * 90) - 45;
	          var endDay = 0;//zMath.floor(Math.random() * 2) + startDay;
	          var startTime;
	          var endTime;
	            startTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + startDay));
	           if (endDay === startDay) {
	              endDay += 1;
	            }
	            endTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + endDay));
	            events.push({
	              startTime: startTime,
	              endTime: endTime,
	              allDay: true
	            });
	        }
	        return events;


	    }









	function LoadTodaysDateBasedSessionDetails() {
		$(".event-detail-container table").hide();
		var today_date = new Date(),
			currentCalendarDate = new Date($scope.calendar.currentDate);
			$scope.viewTitle = monthNames[today_date.getMonth()] + ' ' + today_date.getFullYear();
		getDateBasedSessionDetail(today_date);
	}

	LoadTodaysDateBasedSessionDetails();

});
