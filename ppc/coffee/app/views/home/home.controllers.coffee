
app.controller('homeViewCtrl', ['APP','Api','$rootScope','$scope', (APP,Api,$rootScope,$scope) -> 

	$scope.test = 'home'

	popup.open('example',{scope: {title:'Hello',body: 'World', test:2, homeScope: $scope} })


])
