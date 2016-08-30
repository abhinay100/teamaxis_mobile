app.controller('notificationsCtrl',   function ($scope,$ionicHistory, $stateParams, ionicMaterialMotion, $http,$state, $rootScope, $ionicPopup, API_URL) {



    $scope.showList = false;
    var response="";

    // $scope.pastList = false;
    // $scope.AssignedList = false;

    // $scope.showAssignedList = false;
    // $scope.showPastList = false;

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

//current refresh
    $scope.doRefresh = function() {
      var trainerId = localStorage.getItem("trainer_id");
      $http.get('http://84.200.53.77/api/v1/notifications/?trainer_id='+trainerId).success(function(data){
          var eventsData = angular.fromJson(data);
          $scope.events = eventsData.data;
          console.log($scope.events);
          $scope.showList = true;
          $scope.blinds();
      }).finally(function() {
       // Stop the ion-refresher from spinning
       $scope.$broadcast('scroll.refreshComplete');
     });
    };


  $scope.reloadRoute = function() {
   $route.reload();
};

//current tab
    var trainerId = localStorage.getItem("trainer_id");
    $http.get('http://84.200.53.77/api/v1/notifications/?trainer_id='+trainerId).success(function(data){
        var eventsData = angular.fromJson(data);
        $scope.events = eventsData.data;
        console.log($scope.events);
        $scope.showList = true;
        $scope.blinds();
    });


//past tab review

    $scope.doPastRefresh = function() {
      var trainerId = localStorage.getItem("trainer_id");
      $http.get('http://84.200.53.77/api/v1/past_notifications/?trainer_id='+trainerId).success(function(data){
          var pastData = angular.fromJson(data);
          $scope.pastEvents = pastData.data;
          console.log($scope.pastEvents);
        //  $scope.pastList = true;
        //  $scope.blinds();
      }).finally(function() {
       // Stop the ion-refresher from spinning
       $scope.$broadcast('scroll.refreshComplete');
     });
    };




//past tab

    var trainerId = localStorage.getItem("trainer_id");
    $http.get('http://84.200.53.77/api/v1/past_notifications/?trainer_id='+trainerId).success(function(data){
        var pastData = angular.fromJson(data);
        $scope.pastEvents = pastData.data;
        console.log($scope.pastEvents);
        // $scope.pastList = true;
        // $scope.blinds();
    });




    $scope.openSessions = function ($eventId) {
      localStorage.setItem("event_id", $eventId);
  //    $ionicHistory.clearCache().then(function(){ $state.go('app.session') })

     $state.go("app.sessions", {}, {cache:false})
  //    $state.go("app.sessions");
    };


    $scope.pastSessions = function ($eventId) {
     localStorage.setItem("event_id", $eventId);
     $state.go("app.sessions", {}, {cache:false})

    };


//joining event

    $scope.joinEvent = function($notification_id, $eventId) {

      var notificaitonId = $notification_id;
      var eventId = $eventId;

      var trainerId = localStorage.getItem("trainer_id");
      $http.get(API_URL+'/join?notification_id='+notificaitonId+'&trainer_id='+trainerId).success(function(data){
        var alertPopup = $ionicPopup.alert({
            title: 'Joined for event',
            template: 'Your interest for the event was posted successfully. You will receive a confirmation if you have been assigned the job. '
        });
      $("#card_id_"+eventId).parent().fadeOut();
        $scope.pastDeny();
        $scope.reload();

      });
    };

  //denying event

    $scope.denyEvent = function($notification_id, $eventId) {

      var notificaitonId = $notification_id;
      var eventId = $eventId;

      $scope.showPrompt = function() {

      var promptPopup = $ionicPopup.prompt({

         title: 'Reason for rejecting',
         cancelText:'Cancel',
         okText:'Save',


        //  template: 'This is prompt popup'

      });

      promptPopup.then(function(res) {

         if (res) {

            var response = res ;
            console.log('Your input is ', response);

            var trainerId = localStorage.getItem("trainer_id");
            $http.get(API_URL+'/deny?notification_id='+notificaitonId+'&trainer_id='+trainerId+'&&response='+response).success(function(data){

          $("#card_id_"+eventId).parent().fadeOut();
            $scope.pastDeny();
            $scope.showAlert();
            $scope.reload();

            });

         } else {
            console.log('Please enter input');
         }

      });

      };


      //$scope.showAlert();
      $scope.showPrompt();

    };



  $scope.showAlert = function() {
    var alertPopup = $ionicPopup.alert({
        title: 'Rejecting event',
        template: 'Your rejection for the event was recorded successfully !'
    });
};
    // var alertPopup = $ionicPopup.alert({
    //     title: 'Denied for event',
    //     template: 'Your denial for the event was recorded successfully !'
    // });


    $scope.pastDeny = function() {
    var trainerId = localStorage.getItem("trainer_id");
    $http.get('http://84.200.53.77/api/v1/past_notifications/?trainer_id='+trainerId).success(function(data){
        var pastData = angular.fromJson(data);
        $scope.pastEvents = pastData.data;
        console.log($scope.pastEvents);
        // $scope.pastList = true;
        // $scope.blinds();
    });
};



//assigned

$scope.doAssignRefresh = function() {
  var trainerId = localStorage.getItem("trainer_id");
  $http.get('http://84.200.53.77/api/v1/getAssignedEventsPersonBased?trainer_id='+trainerId).success(function(data){
    var assignData = angular.fromJson(data);
    $scope.assignEvents = assignData.data;
  //  $scope.showList = true;
    //  $scope.blinds();
  }).finally(function() {
   // Stop the ion-refresher from spinning
   $scope.$broadcast('scroll.refreshComplete');
 });
};
$scope.doAssignRefresh();


    var trainerId = localStorage.getItem("trainer_id");
    $http.get('http://84.200.53.77/api/v1/getAssignedEventsPersonBased?trainer_id='+trainerId).success(function(data){
    console.log(data);
    var assignData = angular.fromJson(data);
    console.log(assignData);
    $scope.assignEvents = assignData.data;
  //  $scope.showList = true;
  //  $scope.blinds();
});


  // $scope.openSignin = function (notification_id) {
  //
  //       // $http.get('http://84.200.53.77/api/v1/viewedTermsCondition?notification_id='+notification_id).success(function(data){
  //       // console.log(data);
  //       // });
  //   $state.go("app.Agreement");
  // };





// $scope.openSignin = function (notification_id) {
//
//       $http.get('http://84.200.53.77/api/v1/viewedTermsCondition?notification_id='+notification_id).success(function(data){
//       console.log(data);
//       });
//   $state.go("app.Agreement");
// };

//auto refresh current page
$scope.reload = function () {
  var trainerId = localStorage.getItem("trainer_id");
  $http.get('http://84.200.53.77/api/v1/notifications/?trainer_id='+trainerId).success(function(data){
      var eventsData = angular.fromJson(data);
      $scope.events = eventsData.data;
      console.log($scope.events);
      $scope.showList = true;
      $scope.blinds();
  });

 };
 $scope.reload();

 $scope.reassign = function () {

   var trainerId = localStorage.getItem("trainer_id");
   $http.get('http://84.200.53.77/api/v1/getAssignedEventsPersonBased?trainer_id='+trainerId).success(function(data){
   console.log(data);
   var assignData = angular.fromJson(data);
   console.log(assignData);
   $scope.assignEvents = assignData.data;
 //  $scope.showList = true;
 //  $scope.blinds();
});
 };
$scope.reassign();








});
