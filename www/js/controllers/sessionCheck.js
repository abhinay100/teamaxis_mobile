app.controller('sessionCheck', function ($scope, $stateParams, ionicMaterialMotion, $http, $state,  $ionicPopup) {

    $scope.showList = false;

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

    $scope.fadeSlideInRight = function() {
        reset();
        document.getElementsByTagName('ion-list')[0].className += ' animate-fade-slide-in-right';
        setTimeout(function() {
            ionicMaterialMotion.fadeSlideInRight();
        }, 500);
    };

    $scope.fadeSlideIn = function() {
        reset();
        document.getElementsByTagName('ion-list')[0].className += ' animate-fade-slide-in';
        setTimeout(function() {
            ionicMaterialMotion.fadeSlideIn();
        }, 500);
    };

    $scope.blinds = function() {
        reset();
        document.getElementsByTagName('ion-list')[0].className += ' animate-blinds';
        setTimeout(function() {
            ionicMaterialMotion.blinds(); // ionic.material.motion.blinds(); //ionicMaterialMotion
        }, 500);
    };



    var eventId = localStorage.getItem("event_id");
    $http.get('http://84.200.53.77/sessions/'+eventId).success(function(data){
        var sessionsData = angular.fromJson(data);
        $scope.events = sessionsData.data;
        console.log($scope.events);

        // $scope.showList = true;
        // $scope.blinds();
    });



    $scope.joinEvent = function($notification_id, $eventId) {

      var responseText = "";
      angular.forEach($scope.events, function(value, key){
        if(value.checked == true) {
          if(responseText != "") {
            responseText = responseText+", " +value.session_no;
          } else {
            responseText = value.session_no;
          }
        }
      });

      var notificaitonId = localStorage.getItem("notification_id");
      var eventId = localStorage.getItem("event_id");
      var response = responseText;

      var trainerId = localStorage.getItem("trainer_id");
      $http.get('http://84.200.53.77/api/v1/join/?notification_id='+notificaitonId+'&trainer_id='+trainerId+'&&response='+response).success(function(data){
        var joinE = angular.fromJson(data);
        console.log($scope.joinE);
        $scope.eve = joinE.data;
        // console.log("Hi" + $scope.eve[0].event_location);
        var alertPopup = $ionicPopup.alert({
            title: 'Joined for event',
            template: 'Your interest for the event was posted successfully. You will receive a confirmation if you have been assigned the job. '
        });
      // $("#card_id_"+eventId).parent().fadeOut();
        $state.go("app.notifications");
        // $scope.pastDeny();
        // $scope.reload();

      });
    };


//     $scope.pastDeny = function() {
//     var trainerId = localStorage.getItem("trainer_id");
//     $http.get('http://84.200.53.77/api/v1/past_notifications/?trainer_id='+trainerId).success(function(data){
//         var pastData = angular.fromJson(data);
//         $scope.pastEvents = pastData.data;
//         console.log($scope.pastEvents);
//
//     });
// };

// $scope.reload = function () {
//   var trainerId = localStorage.getItem("trainer_id");
//   $http.get('http://84.200.53.77/api/v1/notifications/?trainer_id='+trainerId).success(function(data){
//       var eventsData = angular.fromJson(data);
//       $scope.events = eventsData.data;
//       console.log($scope.events);
//
//   });
//
//  };
//  $scope.reload();





});
