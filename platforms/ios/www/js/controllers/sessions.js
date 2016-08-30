app.controller('sessionsCtrl', function ($scope, $stateParams, ionicMaterialMotion, $http, $state) {

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
        $scope.showList = true;
        $scope.blinds();
    });

    $scope.doRefresh = function() {
      var eventId = localStorage.getItem("event_id");
      $http.get('http://84.200.53.77/sessions/'+eventId).success(function(data){
          var sessionsData = angular.fromJson(data);
          console.log($scope.sessionsData);
          $scope.events = sessionsData.data;
          console.log($scope.events);
          $scope.showList = true;
          $scope.blinds();
      }).finally(function() {
       // Stop the ion-refresher from spinning
       $scope.$broadcast('scroll.refreshComplete');
     });
    };

});
