DashboardController.$inject = ['$scope', 'dashboardService', 'socket']
function DashboardController($scope, dashboardService, socket){
    $scope.log = [];

    let promises = [];
    promises.push(dashboardService.getMessageLog())

    Promise.all(promises)
    .then(results => {
        $scope.log = results[0];

    })

    socket.on('log:message', function(msg){
        console.log(msg);
        $scope.log.push(dashboardService.createMessage(msg))
    });
}
app.controller('DashboardController',DashboardController);
