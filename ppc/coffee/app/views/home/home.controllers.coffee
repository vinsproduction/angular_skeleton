
app.controller('homeViewCtrl', ['APP','Api','$rootScope','$scope','$timeout', (APP,Api,$rootScope,$scope,$timeout) -> 

	$scope.test = 'home'

	popup.open('example',{scope: {title:'Hello',body: 'World', test:2, homeScope: $scope} })


])
