// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic', 'ionic-material', 'ui.rCalendar','ngCordova','ngFileUpload']).constant('API_URL', 'http://84.200.53.77/api/v1');

app.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)

    // var push = new Ionic.Push({
    //   "debug": true
    // });
    //
    // push.register(function(token) {
    // //  console.log("My Device token:",token.token);
    //   localStorage.setItem("Device_token", token.token);
    //   var device = localStorage.getItem("Device_token");
    //   console.log("kkk: ", device);
    //   //alert("id"  + token.token);
    //   push.saveToken(token);  // persist the token in the Ionic Platform
    // });



        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
})


// app.constant('calendarConfig', { formatMonthTitle: 'MMMM yyyy'});

//app.constant('calendarConfig',{formatDay: 'dd'})

// app.config(['$compileProvider', function($compileProvider){
//     $compileProvider.aHrefSanitizationWhitelist(/^\s*(geo|mailto|tel|maps):/);
// }]);


app.config(['$stateProvider','$urlRouterProvider','$ionicConfigProvider',function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    $ionicConfigProvider.tabs.position('top');
    $ionicConfigProvider.navBar.alignTitle('center');
  //  $compileProvider.aHrefSanitizationWhitelist(/^\s*(geo|mailto|tel|maps):/);
    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'templates/login.html'
    });

    $stateProvider

    .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
    })

    .state('app.notifications', {
        url: '/notifications',
        views: {
            'menuContent': {
                templateUrl: 'templates/notifications.html',
                controller: 'notificationsCtrl'
            }
        }
    })

    .state('app.About', {
        url: '/About',
        views: {
            'menuContent': {
                templateUrl: 'templates/About.html',
                controller: 'AboutCtrl'
            }
        }
    })

    .state('app.Settings', {
        url: '/Settings',
        views: {
            'menuContent': {
                templateUrl: 'templates/Settings.html',
                controller: 'SettingsCtrl'
            }
        }
    })

    .state('app.Home', {
        url: '/Home',
        views: {
            'menuContent': {
                templateUrl: 'templates/Home.html',
                controller: 'HomeCtrl'
            }
        }
    })
      .state('app.sessions', {
        url: '/sessions',
        views: {
            'menuContent': {
                templateUrl: 'templates/sessions.html',
                controller: 'sessionsCtrl'
            }
        }
    })

    .state('app.EditProfile', {
      url: '/EditProfile',
      views: {
          'menuContent': {
              templateUrl: 'templates/EditProfile.html',
              controller: 'EditCtrl'
          }
      }
  })



    .state('app.pastSession', {
      url: '/pastSession',
      views: {
          'menuContent': {
              templateUrl: 'templates/pastSession.html',
              controller: 'notificationsCtrl'
          }
      }
  })


    .state('app.SignInEvent', {
      url: '/SignInEvent',
      views: {
          'menuContent': {
              templateUrl: 'templates/SignInEvent.html',
              controller: 'SignInCtrl'
          }
      }
  })


  .state('app.SignOutEvent', {
    url: '/SignOutEvent',
    views: {
        'menuContent': {
            templateUrl: 'templates/SignOutEvent.html',
            controller: 'SignInCtrl'
        }
    }
})

  .state('app.AttendenceEvent', {
      url: '/AttendenceEvent',
      views: {
          'menuContent': {
              templateUrl: 'templates/AttendenceEvent.html',
              controller: 'AttendenceCtrl'
          }
      }
  })


  .state('app.AssignedEvents', {
      url: '/AssignedEvents',
      views: {
          'menuContent': {
              templateUrl: 'templates/AssignedEvents.html',
              controller: 'SignInCtrl'
          }
      }
  })

  .state('app.Agreement', {
      url: '/Agreement',
      views: {
          'menuContent': {
              templateUrl: 'templates/Agreement.html',
              controller: 'notificationsCtrl'
          }
      }
  })

  .state('app.login', {
      url: '/login',
      views: {
          'menuContent': {
              templateUrl: 'templates/login.html',
              controller: 'viewLogout'
          }
      }


  })



    .state('app.Events', {
        url: '/Events',
        views: {
            'menuContent': {
                templateUrl: 'templates/Events.html',
                controller: 'EventsCtrl'
            }
        }
    })

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/login');

}]);




app.controller('LoginController',['$scope','$http','$ionicPopup', '$state', '$ionicLoading', '$rootScope', 'API_URL' , 'Upload', '$timeout',function($scope, $http, $ionicPopup, $state, $ionicLoading, $rootScope, API_URL, Upload, $timeout) {

    $scope.data = {};

    // $scope.isLoggedIn = false;

    $scope.showLoader = function () {

        $ionicLoading.show({
            content: 'Loading',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
        });

    };

    $scope.hideLoader = function () {

        $ionicLoading.hide();

    };


  //Device token registration


  if(localStorage.getItem("Device_token")==null)  {


        var push = new Ionic.Push({
          "debug": true,
          "onNotification": function(notification) {
           var payload = notification.payload;
           console.log(notification, payload);
         },


         "pluginConfig": {
   "ios": {
     "badge": true,
     "sound": true,
     "gcmSandbox": true

    },
    "android": {
      "icon": "ic_crown"
    }
 }


        });

        push.register(function(token) {
          console.log("My Device token:",token.token);
          localStorage.setItem("Device_token", token.token);
          // var device = localStorage.getItem("Device_token");
          // console.log("kkk: ", device);
          //alert("id"  + token.token);
          push.saveToken(token);  // persist the token in the Ionic Platform
        });

  }

$scope.deviceToken= function () {

      //  var notification_id = localStorage.getItem("notification_id");
      //  console.log(notification_id);
      var device = localStorage.getItem("Device_token");
      console.log("ggg: ", device);
      var trainerId = localStorage.getItem("trainer_id");

      $http.get('http://84.200.53.77/check_registered_mobile_users?trainer_id='+trainerId+'&&device_token='+ device).success(function(data){
      console.log("device" + data);

      });
};

//$scope.deviceToken();



    //check if userloggedin or notificationsCtrl

    if(localStorage.getItem("trainer_id")!=null)
    {
        $state.go("app.Home");
        $scope.showLoader();
        console.log("LOGIN user: " + localStorage.getItem("nric_no") + " - PW: " + localStorage.getItem("password"));
        var req = {
            method: 'GET',
            url: API_URL+'/login?nrcicno='+localStorage.getItem("nric_no")+'&password='+localStorage.getItem("password"),
            headers: {
                'Content-Type': 'application/json'
            },
        }
        $http(req).then(function (resp) {
            if (resp.data != 0) {
                $scope.hideLoader();
                $rootScope.proPic = 'http://84.200.53.77/uploads/'+resp.data.avatar;
                $rootScope.firstName = resp.data.first_name;
                $rootScope.profileName = resp.data.last_name;
                $state.go("app.Home");
                $scope.data = {};
            } else  {
                var alertPopup = $ionicPopup.alert({
                    title: 'Sign In Error!',
                    template: 'Incorrect NRIC number or Password'
                });
                $scope.hideLoader();
            }
        }, function (err) {
            console.error('ERR', err);
            $scope.hideLoader();
            var alertPopup = $ionicPopup.alert({
                title: 'Server Error!',
                template: 'Unable to fetch details from server'
            });
        });
    }
    else
    $state.go("login");


    //end checked inlogin

    $scope.isLoggedIn = false;

       $scope.loginUser = function () {

         if( ( typeof($scope.data.username) == typeof(undefined) ) || ( typeof($scope.data.password) == typeof(undefined) ) ){
             var alertPopup = $ionicPopup.alert({
                 title: 'All fields are mandatory!',
                 template: 'Please fill NRIC number and Password'
             });
         }
         else {
        $scope.showLoader();
        console.log("LOGIN user: " + $scope.data.username + " - PW: " + $scope.data.password);
        var req = {
            method: 'GET',
            url: API_URL+'/login?nrcicno='+$scope.data.username+'&password='+$scope.data.password,
            headers: {
                'Content-Type': 'application/json'
            },
        }
        $http(req).then(function (resp) {
            if (resp.data != 0) {
                $scope.hideLoader();
                $rootScope.proPic = 'http://84.200.53.77/uploads/'+resp.data.avatar;
                $rootScope.firstName = resp.data.first_name;
                $rootScope.profileName = resp.data.last_name;
                localStorage.setItem("trainer_id", resp.data.id);
                localStorage.setItem("category_id", resp.data.category_id);
                localStorage.setItem("nric_no", resp.data.nric_no);
                localStorage.setItem("password", resp.data.password);
                $scope.deviceToken();
		            $state.go("app.Home");
                $scope.data = {};
            } else  {
                var alertPopup = $ionicPopup.alert({
                    title: 'Sign In Error!',
                    template: 'Incorrect NRIC number or Password'
                });
                $scope.hideLoader();
            }
        }, function (err) {
            console.error('ERR', err);
			      $scope.hideLoader();
            var alertPopup = $ionicPopup.alert({
                title: 'Server Error!',
                template: 'Unable to fetch details from server'
            });
        });


      }


       };

  //      if (!$scope.isLoggedIn) {
  //       if ($localStorage.nric_no  !== undefined and $localStorage.password !== undefined) {
  //           $scope.loginUser();
  //       }
  //  }


 }]);

 app.controller('viewctrl',function($scope, $http, $ionicPopup, $state, $ionicLoading, $rootScope, API_URL,$ionicHistory,$ionicPopup) {

   $scope.openPastSession = function (notification_id) {
     localStorage.setItem("notification_id", notification_id);
     console.log(notification_id);
     $state.go("app.Agreement");
   };



   $scope.openSignin = function () {

          var notification_id = localStorage.getItem("notification_id");
          console.log(notification_id);

         $http.get('http://84.200.53.77/api/v1/viewedTermsCondition?notification_id='+notification_id).success(function(data){
         console.log(data);
         });
         var alertPopup = $ionicPopup.alert({
             title: 'Assigned successfully',
             template: 'Congratulations! This Job has been assigned to you'
         });


         $ionicHistory.nextViewOptions({
        disableBack: true
      });
 $state.go("app.Home");
 $scope.refresh();
   };

   $scope.refresh = function () {

     var trainerId = localStorage.getItem("trainer_id");
    	$http.get('http://84.200.53.77/getSessionCurrentDate?trainer_id='+trainerId).success(function(data){
    		  //console.log("ad" + data.date);
    			var currentEvent = angular.fromJson(data);
    			$scope.todayEvents = currentEvent.data;
    			console.log($scope.todayEvents);

 });
 };
 });

 app.controller('viewLogout',function($scope, $http, $window,$ionicHistory,$ionicPopup, $state, $ionicLoading, $rootScope, API_URL) {

   $scope.showAlert = function() {
     var confirmPopup = $ionicPopup.confirm({
         title: 'Log Out',
         template: 'Are You sure You want to Log Out?',
         okText: 'Yes'
     });

     confirmPopup.then(function(res) {

    if (res) {
      //$window.localStorage.clear();
      localStorage.removeItem("trainer_id");
      localStorage.removeItem("category_id");
      localStorage.removeItem("nric_no");
      localStorage.removeItem("password");
         $ionicHistory.clearCache();
         $ionicHistory.clearHistory();
       $state.go("login");

    } else {

       console.log('You clicked on "Cancel" button');

    }

 });

 };


 });
