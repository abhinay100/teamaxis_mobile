
app.controller('AppCtrl', function($scope, $ionicModal, $ionicPopover, $timeout) {
	// Form data for the login modal
	$scope.loginData = {};
	$scope.isExpanded = false;
	$scope.hasHeaderFabLeft = false;
	$scope.hasHeaderFabRight = false;

	var navIcons = document.getElementsByClassName('ion-navicon');
	for (var i = 0; i < navIcons.length; i++) {
		navIcons.addEventListener('click', function() {
			this.classList.toggle('active');
		});
	}



	//  Fab button - Twitter button in bottom right
	var fabs = document.getElementsByClassName('button-fab');
	if (fabs.length && fabs.length > 1) {
		var fab = document.getElementById('fab');
		fab.addEventListener('click', function() {
			//location.href = 'https://twitter.com/satish_vr2011';
			window.open('https://twitter.com/satish_vr2011', '_blank');
		});
	}


	var template = '<ion-popover-view>' +
		'   <ion-header-bar>' +
		'       <h1 class="title">My Popover Title</h1>' +
		'   </ion-header-bar>' +
		'   <ion-content class="padding">' +
		'       My Popover Contents' +
		'   </ion-content>' +
		'</ion-popover-view>';

	$scope.popover = $ionicPopover.fromTemplate(template, {
		scope: $scope
	});
	$scope.closePopover = function() {
		$scope.popover.hide();
	};
	//Cleanup the popover when we're done with it!
	$scope.$on('$destroy', function() {
		$scope.popover.remove();
	});



	////////////////////////////////////////
	// Layout Methods
	////////////////////////////////////////

	$scope.hideNavBar = function() {
		document.getElementsByTagName('ion-nav-bar')[0].style.display = 'none';
	};

	$scope.showNavBar = function() {
		document.getElementsByTagName('ion-nav-bar')[0].style.display = 'block';
	};

	$scope.noHeader = function() {
		var content = document.getElementsByTagName('ion-content');
		for (var i = 0; i < content.length; i++) {
			if (content[i].classList.contains('has-header')) {
				content[i].classList.toggle('has-header');
			}
		}
	};

	$scope.setExpanded = function(bool) {
		$scope.isExpanded = bool;
	};

	$scope.setHeaderFab = function(location) {
		var hasHeaderFabLeft = false;
		var hasHeaderFabRight = false;

		switch (location) {
			case 'left':
				hasHeaderFabLeft = true;
				break;
			case 'right':
				hasHeaderFabRight = true;
				break;
		}

		$scope.hasHeaderFabLeft = hasHeaderFabLeft;
		$scope.hasHeaderFabRight = hasHeaderFabRight;
	};

	$scope.hasHeader = function() {
		var content = document.getElementsByTagName('ion-content');
		for (var i = 0; i < content.length; i++) {
			if (!content[i].classList.contains('has-header')) {
				content[i].classList.toggle('has-header');
			}
		}

	};

	$scope.hideHeader = function() {
		$scope.hideNavBar();
		$scope.noHeader();
	};

	$scope.showHeader = function() {
		$scope.showNavBar();
		$scope.hasHeader();
	};

	$scope.clearFabs = function() {
		var fabs = document.getElementsByClassName('button-fab');
		if (fabs.length && fabs.length > 1) {
			fabs[0].remove();
		}
	};



});
