DashboardController.$inject = ['$scope', 'dashboardService', 'socket']
function DashboardController($scope, dashboardService, socket){
    $scope.log = [];
    $scope.chart = {};

    let promises = [];
    promises.push(dashboardService.getMessages())

    Promise.all(promises)
    .then(results => {
        $scope.log = dashboardService.createLogFromMessages(results[0]);
        $scope.chart = dashboardService.createChartFromMessages(results[0]);
    })

    socket.on('log:message', function(msg){
        $scope.log.push(dashboardService.createMessage(msg))
        dashboardService.updateChart($scope.chart, msg)
    });
}
app.controller('DashboardController',DashboardController);
